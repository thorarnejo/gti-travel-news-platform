-- ============================================================
-- GTI News Platform - Initial Schema Migration
-- ============================================================
-- Version: 1.0.0
-- Date: 2026-03-19
-- Description: Complete database schema for GTI Travel News Platform
-- ============================================================

BEGIN;

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE article_status AS ENUM (
  'disruption',
  'warning',
  'update',
  'new',
  'price_change'
);

CREATE TYPE severity_level AS ENUM (
  'low',
  'medium',
  'high',
  'critical'
);

-- ============================================================
-- TABLES
-- ============================================================

-- Countries (top-level geographic hierarchy)
CREATE TABLE IF NOT EXISTS countries (
  id            BIGSERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  slug          VARCHAR(100) NOT NULL UNIQUE,
  iso_code      CHAR(2)      NOT NULL UNIQUE,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_countries_slug ON countries (slug);
CREATE INDEX IF NOT EXISTS idx_countries_name ON countries USING gin (to_tsvector('english', name));

-- Cities (belongs to a country)
CREATE TABLE IF NOT EXISTS cities (
  id            BIGSERIAL PRIMARY KEY,
  country_id    BIGINT       NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  name          VARCHAR(100) NOT NULL,
  slug          VARCHAR(100) NOT NULL,
  latitude      DECIMAL(9,6),
  longitude     DECIMAL(9,6),
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  UNIQUE (country_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_cities_slug ON cities (slug);
CREATE INDEX IF NOT EXISTS idx_cities_country_id ON cities (country_id);
CREATE INDEX IF NOT EXISTS idx_cities_name ON cities USING gin (to_tsvector('english', name));

-- Locations (polymorphic geographic references: city or country)
CREATE TABLE IF NOT EXISTS locations (
  id            BIGSERIAL PRIMARY KEY,
  location_type VARCHAR(20)  NOT NULL CHECK (location_type IN ('country', 'city')),
  country_id    BIGINT REFERENCES countries(id) ON DELETE CASCADE,
  city_id       BIGINT       REFERENCES cities(id) ON DELETE CASCADE,
  name          VARCHAR(150) NOT NULL,
  slug          VARCHAR(150) NOT NULL,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  CONSTRAINT location_fk CHECK (
    (location_type = 'country' AND country_id IS NOT NULL AND city_id IS NULL) OR
    (location_type = 'city'    AND city_id    IS NOT NULL AND country_id IS NOT NULL)
  ),
  UNIQUE (location_type, country_id, city_id)
);

CREATE INDEX IF NOT EXISTS idx_locations_slug        ON locations (slug);
CREATE INDEX IF NOT EXISTS idx_locations_type        ON locations (location_type);
CREATE INDEX IF NOT EXISTS idx_locations_country_id  ON locations (country_id) WHERE country_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_locations_city_id     ON locations (city_id)    WHERE city_id    IS NOT NULL;

-- Categories (hierarchical via parent_id)
CREATE TABLE IF NOT EXISTS categories (
  id            BIGSERIAL PRIMARY KEY,
  parent_id     BIGINT       REFERENCES categories(id) ON DELETE SET NULL,
  name          VARCHAR(80)  NOT NULL,
  slug          VARCHAR(80)  NOT NULL UNIQUE,
  description   TEXT,
  icon          VARCHAR(50),
  sort_order    SMALLINT     NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug     ON categories (slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories (parent_id);

-- Sources (news feeds, agencies, owned properties)
CREATE TABLE IF NOT EXISTS sources (
  id            BIGSERIAL PRIMARY KEY,
  name          VARCHAR(120) NOT NULL,
  slug          VARCHAR(120) NOT NULL UNIQUE,
  feed_url      TEXT,
  website_url   TEXT,
  logo_url      TEXT,
  is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
  priority      SMALLINT     NOT NULL DEFAULT 5,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sources_slug      ON sources (slug);
CREATE INDEX IF NOT EXISTS idx_sources_is_active ON sources (is_active);

-- Articles (core content table)
CREATE TABLE IF NOT EXISTS articles (
  id              BIGSERIAL PRIMARY KEY,
  slug            VARCHAR(200) NOT NULL UNIQUE,

  -- Status & severity
  status          article_status NOT NULL DEFAULT 'new',
  severity        severity_level NOT NULL DEFAULT 'medium',

  -- Core content
  headline        VARCHAR(300)  NOT NULL,
  summary         TEXT          NOT NULL,
  body            TEXT          NOT NULL,

  -- Structured TLDR fields
  tldr            TEXT[]        NOT NULL DEFAULT '{}',
  what_changed    TEXT,
  who_is_affected TEXT,
  what_to_do      TEXT,

  -- Meta
  image_url       TEXT,
  original_url    TEXT,
  is_published    BOOLEAN        NOT NULL DEFAULT FALSE,
  published_at    TIMESTAMPTZ,

  -- Relations
  category_id     BIGINT         NOT NULL REFERENCES categories(id),

  -- Timestamps
  created_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),

  -- Search
  search_vector   TSVECTOR       NOT NULL DEFAULT to_tsvector('english', '')
);

CREATE INDEX IF NOT EXISTS idx_articles_slug         ON articles (slug);
CREATE INDEX IF NOT EXISTS idx_articles_status        ON articles (status);
CREATE INDEX IF NOT EXISTS idx_articles_severity     ON articles (severity);
CREATE INDEX IF NOT EXISTS idx_articles_category_id  ON articles (category_id);
CREATE INDEX IF NOT EXISTS idx_articles_is_published ON articles (is_published);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_created_at   ON articles (created_at DESC);

-- Composite index for common filter combos
CREATE INDEX IF NOT EXISTS idx_articles_published_severity ON articles (is_published, published_at DESC, severity);
CREATE INDEX IF NOT EXISTS idx_articles_category_published ON articles (category_id, is_published, published_at DESC);

-- GIN index for full-text search
CREATE INDEX IF NOT EXISTS idx_articles_search ON articles USING gin (search_vector);

-- ============================================================
-- JOIN TABLES
-- ============================================================

-- Article ↔ Location (many-to-many)
CREATE TABLE IF NOT EXISTS article_locations (
  article_id   BIGINT       NOT NULL REFERENCES articles(id)     ON DELETE CASCADE,
  location_id  BIGINT       NOT NULL REFERENCES locations(id)   ON DELETE CASCADE,
  is_primary   BOOLEAN      NOT NULL DEFAULT FALSE,
  PRIMARY KEY (article_id, location_id)
);

CREATE INDEX IF NOT EXISTS idx_al_article_id  ON article_locations (article_id);
CREATE INDEX IF NOT EXISTS idx_al_location_id ON article_locations (location_id);

-- Article ↔ Source (many-to-many)
CREATE TABLE IF NOT EXISTS article_sources (
  article_id   BIGINT       NOT NULL REFERENCES articles(id)   ON DELETE CASCADE,
  source_id    BIGINT       NOT NULL REFERENCES sources(id)   ON DELETE CASCADE,
  PRIMARY KEY (article_id, source_id)
);

CREATE INDEX IF NOT EXISTS idx_as_article_id ON article_sources (article_id);
CREATE INDEX IF NOT EXISTS idx_as_source_id  ON article_sources (source_id);

-- ============================================================
-- ARTICLE UPDATE HISTORY (version log)
-- ============================================================

CREATE TABLE IF NOT EXISTS article_updates (
  id              BIGSERIAL PRIMARY KEY,
  article_id      BIGINT       NOT NULL REFERENCES articles(id) ON DELETE CASCADE,

  version_number  SMALLINT     NOT NULL,
  slug            VARCHAR(200) NOT NULL,
  status          article_status NOT NULL,
  severity        severity_level NOT NULL,
  headline        VARCHAR(300)  NOT NULL,
  summary         TEXT          NOT NULL,
  body            TEXT          NOT NULL,
  tldr            TEXT[]        NOT NULL DEFAULT '{}',
  what_changed    TEXT,
  who_is_affected TEXT,
  what_to_do      TEXT,

  changed_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  change_summary  TEXT,
  changed_by      VARCHAR(100)
);

CREATE INDEX IF NOT EXISTS idx_au_article_id    ON article_updates (article_id);
CREATE INDEX IF NOT EXISTS idx_au_changed_at   ON article_updates (changed_at DESC);
CREATE INDEX IF NOT EXISTS idx_au_article_ver  ON article_updates (article_id, version_number DESC);

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Trigger to keep search_vector in sync
CREATE OR REPLACE FUNCTION articles_search_update() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.headline, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.summary,  '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.body,     '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_articles_search_update ON articles;
CREATE TRIGGER trg_articles_search_update
  BEFORE INSERT OR UPDATE OF headline, summary, body ON articles
  FOR EACH ROW EXECUTE FUNCTION articles_search_update();

-- Trigger to create update snapshot on article change
CREATE OR REPLACE FUNCTION create_article_update() RETURNS TRIGGER AS $$
DECLARE
  next_ver SMALLINT;
BEGIN
  SELECT COALESCE(MAX(version_number), 0) + 1 INTO next_ver
  FROM article_updates WHERE article_id = NEW.id;

  INSERT INTO article_updates (
    article_id, version_number, slug, status, severity,
    headline, summary, body, tldr, what_changed, who_is_affected, what_to_do,
    change_summary, changed_by
  ) VALUES (
    NEW.id, next_ver, NEW.slug, NEW.status, NEW.severity,
    NEW.headline, NEW.summary, NEW.body, NEW.tldr,
    NEW.what_changed, NEW.who_is_affected, NEW.what_to_do,
    CASE WHEN TG_OP = 'INSERT' THEN 'Initial version'
         ELSE build_change_summary(OLD, NEW)
    END,
    'system'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_article_update ON articles;
CREATE TRIGGER trg_article_update
  AFTER UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION create_article_update();

-- build_change_summary function
CREATE OR REPLACE FUNCTION build_change_summary(OLD anyelement, NEW anyelement) RETURNS TEXT AS $$
DECLARE
  parts TEXT[] := '{}';
BEGIN
  IF OLD.headline     != NEW.headline     THEN parts := array_append(parts, 'headline');    END IF;
  IF OLD.status       != NEW.status       THEN parts := array_append(parts, 'status');      END IF;
  IF OLD.severity     != NEW.severity     THEN parts := array_append(parts, 'severity');    END IF;
  IF OLD.summary      != NEW.summary      THEN parts := array_append(parts, 'summary');    END IF;
  IF OLD.body         != NEW.body         THEN parts := array_append(parts, 'body');        END IF;
  IF OLD.tldr         != NEW.tldr         THEN parts := array_append(parts, 'tldr');        END IF;
  IF OLD.what_changed != NEW.what_changed THEN parts := array_append(parts, 'what_changed'); END IF;
  RETURN 'Changed: ' || array_to_string(parts, ', ');
END;
$$ LANGUAGE plpgsql;

-- updated_at helper trigger
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers to all tables
DROP TRIGGER IF EXISTS trg_countries_updated_at ON countries;
CREATE TRIGGER trg_countries_updated_at   BEFORE UPDATE ON countries   FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_cities_updated_at ON cities;
CREATE TRIGGER trg_cities_updated_at      BEFORE UPDATE ON cities      FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_locations_updated_at ON locations;
CREATE TRIGGER trg_locations_updated_at   BEFORE UPDATE ON locations   FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_categories_updated_at ON categories;
CREATE TRIGGER trg_categories_updated_at   BEFORE UPDATE ON categories   FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_sources_updated_at ON sources;
CREATE TRIGGER trg_sources_updated_at     BEFORE UPDATE ON sources     FOR EACH ROW EXECUTE FUNCTION set_updated_at();

COMMIT;

-- ============================================================
-- MIGRATION COMPLETE
-- ============================================================

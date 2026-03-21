-- ============================================================
-- GTI News Platform - Subscribers Schema Migration
-- ============================================================
-- Version: 1.0.0
-- Date: 2026-03-21
-- Description: Add newsletter subscription system
-- ============================================================

BEGIN;

-- ============================================================
-- SUBSCRIBERS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS subscribers (
  id              BIGSERIAL PRIMARY KEY,
  email           VARCHAR(255) NOT NULL UNIQUE,
  first_name      VARCHAR(100),
  last_name       VARCHAR(100),
  
  -- Preferences
  preferences     JSONB NOT NULL DEFAULT '{}',
  
  -- Status
  status          VARCHAR(20) NOT NULL DEFAULT 'active' 
                    CHECK (status IN ('active', 'unsubscribed', 'bounced', 'complained')),
  
  -- Brevo integration
  brevo_contact_id VARCHAR(100),  -- External ID from Brevo
  
  -- Tracking
  source          VARCHAR(100) DEFAULT 'website',
  subscribed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  last_engagement_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers (email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers (status);
CREATE INDEX IF NOT EXISTS idx_subscribers_subscribed_at ON subscribers (subscribed_at DESC);
CREATE INDEX IF NOT EXISTS idx_subscribers_brevo_id ON subscribers (brevo_contact_id);

-- ============================================================
-- SUBSCRIPTION LOG (for audit trail)
-- ============================================================

CREATE TABLE IF NOT EXISTS subscription_logs (
  id              BIGSERIAL PRIMARY KEY,
  subscriber_id   BIGINT REFERENCES subscribers(id) ON DELETE CASCADE,
  action          VARCHAR(50) NOT NULL,  -- 'subscribed', 'unsubscribed', 'updated', 'brevo_sync'
  details         JSONB,
  ip_address      INET,
  user_agent      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscription_logs_subscriber_id ON subscription_logs (subscriber_id);
CREATE INDEX IF NOT EXISTS idx_subscription_logs_action ON subscription_logs (action);
CREATE INDEX IF NOT EXISTS idx_subscription_logs_created_at ON subscription_logs (created_at DESC);

-- ============================================================
-- TRIGGERS
-- ============================================================

-- updated_at trigger for subscribers
DROP TRIGGER IF EXISTS trg_subscribers_updated_at ON subscribers;
CREATE TRIGGER trg_subscribers_updated_at
  BEFORE UPDATE ON subscribers
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Log subscription events
CREATE OR REPLACE FUNCTION log_subscription_event() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO subscription_logs (subscriber_id, action, details)
    VALUES (NEW.id, 'subscribed', jsonb_build_object('email', NEW.email, 'source', NEW.source));
  ELSIF TG_OP = 'UPDATE' AND OLD.status != 'unsubscribed' AND NEW.status = 'unsubscribed' THEN
    INSERT INTO subscription_logs (subscriber_id, action, details)
    VALUES (NEW.id, 'unsubscribed', jsonb_build_object('email', NEW.email));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_subscription_log ON subscribers;
CREATE TRIGGER trg_subscription_log
  AFTER INSERT OR UPDATE ON subscribers
  FOR EACH ROW EXECUTE FUNCTION log_subscription_event();

COMMIT;

-- ============================================================
-- MIGRATION COMPLETE
-- ============================================================

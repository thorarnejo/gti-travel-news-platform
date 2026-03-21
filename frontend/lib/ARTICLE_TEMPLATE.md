# GTI News Article Template Standard

Denne malen er standard for alle nye artikler i GTI News Platform.
Referanseartikkel: **London Heathrow Ground Staff Strike (Mar 15-17)**.

---

## 1) Required Object Structure (`frontend/lib/data.ts`)

```ts
{
  id: 'unique-string',
  slug: 'kebab-case-slug',
  title: 'Clear headline with location + impact',
  summary: 'ACTION REQUIRED: One-sentence operational takeaway',
  category: 'flights|hotels|destinations|visa|safety|weather',
  location: { country: 'Country', city?: 'City', countryCode: 'ISO2' },
  severity: 'low|medium|high|critical',
  status: 'new|update|warning|disruption|price-change',
  articleStatus: 'active|ongoing|resolved',
  publishedAt: 'ISO8601',
  updatedAt: 'ISO8601',

  tl_dr: [
    'Bullet 1 (MUST start with location name)',
    'Bullet 2',
    'Bullet 3',
    'Bullet 4 (optional, max 4 total)'
  ],

  body: [
    'Paragraph 1: what happened, who announced, timeline, scope.',
    'Paragraph 2: operational impact and planning consequences.',
    'FAQ:\n\n**Q1: ...**\nA: ...\n\n**Q2: ...**\nA: ...\n\n**Q3: ...**\nA: ...'
  ],

  whatThisMeans: 'Short practical paragraph.',
  whatChanged: 'Brief update delta (newest development).',
  whoIsAffected: 'Demographic + ticket/fare class + geography.',
  whatToDo: '1) ...\n2) ...\n3) ...\n\nACTION REQUIRED: ...',

  sources: [
    { name: 'Source Name', url: 'https://...', isOfficial: true|false }
  ],

  impactRegions: ['Region 1', 'Region 2'],
  relatedArticles: ['slug-a', 'slug-b']
}
```

---

## 2) Content Guardrails Per Section

### `title`
- Skal være spesifikk: **lokasjon + hendelse + konsekvens**.
- Unngå clickbait.
- 70–110 tegn foretrukket.

### `summary`
- Én setning.
- Start med **ACTION REQUIRED:** for `high|critical` severity.
- Må si hva bruker må gjøre nå.

### `tl_dr`
- Maks 4 bullets.
- Første bullet må starte med sted (`London Heathrow: ...`).
- Hver bullet må være operasjonell, ikke generisk.

### `whatThisMeans`
- Kort, praktisk konsekvens (2–4 setninger).
- Svar på: “Hva betyr dette for reisen min i praksis?”

### `whatChanged`
- Kun nyeste endring siden forrige oppdatering.
- 1–2 setninger, uten bakgrunnshistorie.

### `whoIsAffected`
- Må inneholde:
  - Hvilke reisende (f.eks. leisure/business/families)
  - Hvilke billetter/fare classes (f.eks. basic economy, separate tickets)
  - Hvilke geografier/ruter

### `whatToDo`
- Nummerert liste (minst 4 punkter for disruptive events).
- Skal være utførbar steg-for-steg.
- Må avsluttes med linjen: **ACTION REQUIRED: ...**

### `body`
- Full narrativ i 2 hovedavsnitt + FAQ-del.
- FAQ-format er obligatorisk:
  - `**Q1:** ...`
  - `A: ...` på ny linje
- Unngå spekulasjon; skill fakta fra risikovurdering.

### `sources`
- Array med objekt: `{name, url, isOfficial}`.
- Minst 2 offisielle kilder for høy-severity saker.
- URL må være direkte og gyldig.

---

## 3) London Heathrow Reference Example (Short)

- `tl_dr`: beskriver terminals, delay windows, waiver status
- `whatThisMeans`: konkret risiko for missed connections og kost
- `whatChanged`: siste update på streikevindu/kapasitet
- `whoIsAffected`: T2/T3, checked bag, same-day transfer passengers
- `whatToDo`: recheck status, secure fallback, keep receipts
- `body`: 2 narrative avsnitt + 3 FAQ
- `sources`: Heathrow, Unite, NATS (official)

Dette er “gold standard” for tone: operasjonell, konkret, handlingsorientert.

---

## 4) Workflow for New Articles

1. Opprett nytt article-objekt i `sampleArticles` i `frontend/lib/data.ts`.
2. Fyll alle required fields i denne malen.
3. Valider guardrails (særlig `tl_dr`, FAQ-format, og `ACTION REQUIRED`).
4. Legg til hero image i `articleHeroImages` med samme slug.
5. (Valgfritt) Legg inline media i `articleInlineMedia`.
6. Kjør build/lint før commit.
7. Commit med melding: `feat(news): add/update <slug> using GTI template`.

---

## 5) Quick Quality Checklist (Before Merge)

- [ ] 10/10 required fields er fylt
- [ ] `tl_dr` <= 4 bullets
- [ ] `whatToDo` er nummerert + slutter med ACTION REQUIRED
- [ ] `body` har FAQ med `**Q1:**` + `A:` på ny linje
- [ ] `sources` har `{name, url, isOfficial}`
- [ ] Slug matcher hero/inline media keys
- [ ] Build passerer

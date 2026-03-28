# GTI Travel News Platform — Workflow for Crosby

**Agent:** Crosby (coding agent)  
**Repo:** https://github.com/thorarnejo/gti-travel-news-platform  
**Live:** https://news-platform-thorarnejo-8868s-projects.vercel.app  
**Stable Version:** v1.0-stable-2026-03-28

---

## 📋 Før du starter

### Les alltid først:
1. `DEPLOYMENT_NOTES.md` — deployment config og lessons learned
2. `frontend/package.json` — sjekk dependencies før du legger til nye
3. GitHub Issues — se om det er åpne oppgaver

### Sjekk status:
```bash
gh repo view thorarnejo/gti-travel-news-platform
gh pr list --repo thorarnejo/gti-travel-news-platform
gh run list --repo thorarnejo/gti-travel-news-platform --limit 5
```

---

## 🌿 Branch Strategy

| Branch | Bruk | Deploy |
|--------|------|--------|
| `master` | Production-ready | ✅ Production |
| `develop` | Aktiv utvikling | ⚠️ Preview |
| `feature/*` | Nye funksjoner | ❌ Ingen (før PR) |

**Workflow:**
```bash
# Start ny feature
git checkout develop
git pull
git checkout -b feature/navn-på-funksjon

# Etter arbeid:
git push origin feature/navn-på-funksjon
# Lag PR på GitHub: develop ← feature/navn-på-funksjon
```

---

## ⚠️ VIKTIG — Husk Dette!

### ❌ ALDRI gjør dette:
1. **Ikke endre `vercel.json` med `rootDirectory`** — det er satt i Vercel Dashboard
2. **Ikke push direkte til `master`** — bruk PR fra `develop`
3. **Ikke legg til dependencies uten å teste** — `npm run build` lokalt først
4. **Ikke slett `DEPLOYMENT_NOTES.md`** — dette er vår hukommelse

### ✅ ALLTID gjør dette:
1. **Test build lokalt:** `cd frontend && npm run build`
2. **Sjekk at alle dependencies er i `package.json`**
3. **Skriv descriptive commit messages**
4. **Oppdater `DEPLOYMENT_NOTES.md` hvis du lærer noe nytt**

---

## 🚀 Deployment Checklist

Før du pusher til `master`:

- [ ] Build testes lokalt: `npm run build`
- [ ] Alle nye packages er i `package.json`
- [ ] Ingen `vercel.json` endringer (med mindre absolutt nødvendig)
- [ ] PR er reviewet og godkjent
- [ ] Merge til `master` via GitHub (ikke force push)

**Vercel deployer automatisk** når `master` oppdateres.

---

## 🐛 Troubleshooting

### Build feiler i Vercel
```bash
# Sjekk logs
npx vercel inspect <deployment-id> --logs

# Test lokalt
cd frontend
npm install
npm run build
```

### Manglende module
```bash
# Legg til i frontend/package.json
npm install <package-name>
git add frontend/package.json frontend/package-lock.json
```

### Site viser 401
- Dette er Vercel SSO Protection, ikke en deployment-feil
- Deployment er suksessfull
- For å deaktivere: Vercel Dashboard → Settings → Authentication

### Site viser 404
- Sjekk Vercel deployment logs
- Verify `rootDirectory: frontend` i Vercel Dashboard
- Sjekk at `dist/` eksisterer etter build

---

## 📁 Prosjektstruktur

```
gti-travel-news-platform/
├── frontend/              # All React/Next.js kode
│   ├── package.json      # Dependencies (ALLTID oppdater denne!)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── dist/             # Build output (ikke commit)
├── DEPLOYMENT_NOTES.md   # Denne filen + deployment info
├── README.md
└── (ingen vercel.json!)  # Vercel config er i Dashboard
```

---

## 🔧 Vercel Config (Dashboard)

Disse settingene er **allerede konfigurert** i Vercel Dashboard:

| Setting | Verdi |
|---------|-------|
| Root Directory | `frontend` |
| Build Command | `npm install && npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

**Ikke prøv å overstyre disse med `vercel.json`!**

---

## 📝 Huskeliste for Crosby

### Før hver økt:
1. [ ] Sjekk `git status` — er du på riktig branch?
2. [ ] `git pull` — har du latest code?
3. [ ] Les `DEPLOYMENT_NOTES.md` hvis det er lenge siden sist

### Etter hver feature:
1. [ ] Test build: `npm run build`
2. [ ] Commit med god message
3. [ ] Push til feature branch
4. [ ] Lag PR på GitHub
5. [ ] Oppdater `DEPLOYMENT_NOTES.md` hvis du lærte noe nytt

### Før production:
1. [ ] PR er mergeet til `develop`
2. [ ] Testet i Preview deployment
3. [ ] Lag PR: `develop` → `master`
4. [ ] Merge via GitHub UI
5. [ ] Verifiser at Vercel deployment suksess

---

## 🎯 Neste Oppgaver (Eksempel)

Hvis du trenger inspirasjon:

- [ ] Legge til ny seksjon i artikler
- [ ] Oppdatere styling/components
- [ ] Fix bugs fra Issues
- [ ] Forbedre performance
- [ ] Legge til nye features

**Alltid spør Thor før du starter større endringer.**

---

## 📞 Kontakt

- **GitHub:** https://github.com/thorarnejo/gti-travel-news-platform
- **Vercel:** https://vercel.com/thorarnejo-8868s-projects
- **Live Site:** https://news-platform-thorarnejo-8868s-projects.vercel.app

---

*Denne filen er vår kollektive hukommelse. Oppdater den når du lærer noe nytt.*

**Sist oppdatert:** 2026-03-28  
**Versjon:** 1.0

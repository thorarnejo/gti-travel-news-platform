# Deployment Notes

**Last Updated:** 2026-03-28  
**Stable Version:** v1.0-stable-2026-03-28

---

## Vercel Setup

| Setting | Value | Location |
|---------|-------|----------|
| **Root Directory** | `frontend` | Vercel Dashboard (NOT in vercel.json) |
| **Build Command** | `npm install && npm run build` | Vercel Dashboard |
| **Output Directory** | `dist` | Vercel Dashboard |
| **Install Command** | `npm install` | Vercel Dashboard |

⚠️ **IMPORTANT:** Do NOT add `vercel.json` with `rootDirectory` — it conflicts with dashboard settings.

---

## Known Issues (Fixed)

### ❌ vercel.json Conflict
**Problem:** `vercel.json` with `rootDirectory` conflicts with Vercel dashboard configuration.  
**Error:** `sh: line 1: cd: frontend: No such file or directory`  
**Solution:** Removed `vercel.json` — use Vercel Dashboard settings instead.

### ❌ Missing Dependency
**Problem:** `@radix-ui/react-slot` was used in `Button.tsx` but not in `package.json`.  
**Error:** Build failed with module not found.  
**Solution:** Added to `frontend/package.json` dependencies.

---

## Checklist Before Push

Before pushing to `master` (production):

- [ ] Test build locally: `cd frontend && npm run build`
- [ ] All new dependencies added to `package.json`
- [ ] No `vercel.json` changes unless absolutely necessary
- [ ] Commit message is descriptive

---

## Branch Strategy

| Branch | Purpose | Auto-deploy |
|--------|---------|-------------|
| `master` | Production-ready code | ✅ Yes (Production) |
| `develop` | Active development | ⚠️ Preview only |

**Workflow:**
1. Create feature branch from `develop`
2. Work on feature
3. Merge to `develop` when ready
4. Merge `develop` → `master` when ready for production

---

## Deployment URLs

- **Production:** https://news-platform-thorarnejo-8868s-projects.vercel.app
- **Alias:** https://news-platform-five.vercel.app

---

## Troubleshooting

### Build Fails
1. Check Vercel deployment logs
2. Run `npm run build` locally to reproduce
3. Verify all dependencies are in `package.json`

### Site Shows 401/Authentication Required
- This is Vercel SSO Protection (not a deployment error)
- Deployment is successful
- To disable: Vercel Dashboard → Project Settings → Authentication → Deployment Protection

### Site Shows 404
- Check if deployment completed successfully
- Verify `rootDirectory` is set to `frontend` in Vercel Dashboard
- Check that `dist` folder exists after build

---

## Contact

For deployment issues, check:
- Vercel Dashboard: https://vercel.com/thorarnejo-8868s-projects
- GitHub Actions: https://github.com/thorarnejo/gti-travel-news-platform/actions

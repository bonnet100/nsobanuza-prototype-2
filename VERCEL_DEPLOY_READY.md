# ✅ Vercel Deployment Ready Checklist

## Configuration Fixed ✅

- [x] **backend/vercel.json** - Updated to Node.js serverless config
- [x] **vercel.json** (root) - Monorepo configuration with proper builds & routes

---

## What Vercel Will Do On Deploy

### Build Phase
```
1. Run: npm run build
   → Creates /dist/ with your React app
   
2. Run: npm install in backend/
   → Installs express, cors, fuse.js, axios
```

### Runtime
```
- Frontend served from /dist/
- /api/* routes → backend/server.js
- /health endpoint → backend/server.js
- SPA fallback: /* → /dist/index.html
```

---

## Pre-Deploy Checklist

### ✅ Local Verification (Run These)

```bash
# 1. Build frontend
npm run build

# 2. Check dist/ was created
ls dist/index.html

# 3. Start backend locally
cd backend
npm install
npm start
# Should see: "Server running on port 5000"

# 4. In another terminal, test API
curl http://localhost:5000/health
# Should see: {"status":"ok"}
```

---

## Deploy Steps

### 1. Connect to Vercel (if not already)
```bash
npm install -g vercel
vercel login
vercel
```

### 2. Or Push to GitHub & Auto-Deploy
```bash
git add .
git commit -m "Fixed Vercel deployment configuration"
git push
```
→ Vercel will auto-deploy if connected to your repo

### 3. Set Environment Variables in Vercel Dashboard
- Go to **Project Settings** → **Environment Variables**
- Add:
  ```
  NODE_ENV = production
  ```

---

## After Deployment

### Test Your Live App
```bash
# Health check
curl https://your-vercel-domain.vercel.app/health

# Test API
curl -X POST https://your-vercel-domain.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "language": "en"}'
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check backend/package.json has all dependencies |
| API 404 | Verify vercel.json routes point to `/api/*` |
| Frontend 404 | Ensure dist/index.html exists after `npm run build` |
| Backend timeout | Increase maxDuration in function config |

---

## Files Modified

- ✅ `/vercel.json` - Static + Node.js builds + routing
- ✅ `/backend/vercel.json` - Node.js serverless config
- ✅ `/backend/server.js` - CORS + health check (already done)
- ✅ `/src/app/services/api.ts` - API integration (already done)
- ✅ `/src/app/pages/Chatbot.tsx` - Real API calls (already done)

---

## Ready? 🚀

```bash
git add .
git commit -m "Vercel deployment configuration complete"
git push
```

**Your deployment is now configured correctly!**

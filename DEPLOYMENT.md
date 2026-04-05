# Nsobanuza Health Chatbot - Deployment Guide

## Overview
Nsobanuza is a multilingual health chatbot platform for Rwandan youth, featuring:
- RAG (Retrieval-Augmented Generation) architecture
- 105 high-quality Q&A entries in 3 languages (Kinyarwanda, English, French)
- Confidential and non-judgmental health guidance
- SRH and mental health focus

## Architecture

### Frontend
- **Framework**: React + TypeScript with Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Port**: 5175 (dev) / Standard production port
- **Location**: Root directory

### Backend
- **Framework**: Node.js + Express.js
- **Search**: Fuse.js (fuzzy search with RAG)
- **Data**: JSON-based health records
- **Port**: 5000
- **Location**: `/backend` directory

## Pre-Deployment Checklist

### 1. Frontend
- [ ] All npm dependencies installed: `npm install`
- [ ] Build successful: `npm run build`
- [ ] No TypeScript errors
- [ ] API service configured (`src/app/services/api.ts`)
- [ ] Backend proxy configured in `vite.config.ts`

### 2. Backend
- [ ] All npm dependencies installed: `cd backend && npm install`
- [ ] Health dataset present: `backend/data/healthData.json` (105 entries verified)
- [ ] Server starts without errors: `npm start`
- [ ] Health endpoint responds: `GET /health`
- [ ] Chat endpoint works: `POST /chat`
- [ ] CORS properly configured for production domain

### 3. Environment
- [ ] Node.js version >= 16.0.0
- [ ] npm or yarn available
- [ ] Port 5000 available for backend
- [ ] Ports 3000/5000++ available for frontend

## Deployment Steps

### Option 1: Local Development

1. **Start Backend**
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:5000
   ```

2. **Start Frontend** (in new terminal)
   ```bash
   npm run dev
   # Dev server runs on http://localhost:5175
   ```

3. **Access Application**
   - Visit: http://localhost:5175
   - Navigate to Chatbot page
   - Backend automatically proxied through `/api` path

### Option 2: Production Build

1. **Build Frontend**
   ```bash
   npm run build
   # Creates dist/ directory with optimized build
   ```

2. **Serve Frontend**
   ```bash
   # Using static server
   npx serve -s dist -l 3000
   
   # Or with Node.js
   npm install -g serve
   serve -s dist -l 3000
   ```

3. **Configure Backend URL**
   - Update `src/app/services/api.ts` line 1 for production domain
   - Or ensure CORS headers match your frontend domain

4. **Start Backend**
   ```bash
   cd backend
   npm start
   ```

### Option 3: Docker Deployment

#### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./
EXPOSE 5000
CMD ["npm", "start"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

## API Reference

### Health Endpoint
```
GET /health
Response: {
  "status": "healthy",
  "timestamp": "ISO timestamp",
  "services": {
    "search": "initialized",
    "ai": "initialized"
  }
}
```

### Chat Endpoint
```
POST /chat
Content-Type: application/json

Request: {
  "message": "What is HIV prevention?",
  "language": "en" (optional)
}

Response: {
  "response": "HIV prevention involves...",
  "language": "en",
  "contextUsed": 1,
  "confidence": 0.85
}
```

## Troubleshooting

### Backend Won't Start
- Check port 5000 is available: `netstat -ano | findstr :5000`
- Verify Node.js installed: `node --version`
- Check dependencies: `cd backend && npm install`

### Frontend Can't Connect to Backend
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify proxy configuration in `vite.config.ts`
- Check if API service is trying correct endpoint

### No Data in Chatbot
- Verify `backend/data/healthData.json` exists and has 105 entries
- Check health endpoint: `curl http://localhost:5000/health`
- Look for errors in backend console

## Production Considerations

1. **Security**
   - Enable HTTPS in production
   - Set appropriate CORS origins
   - Implement rate limiting on `/chat` endpoint
   - Validate all user inputs

2. **Performance**
   - Consider caching responses
   - Load database entries into memory at startup
   - Implement request queuing for high traffic

3. **Monitoring**
   - Log all API requests
   - Monitor backend uptime
   - Track response times

4. **Scaling**
   - Use Docker containers for both services
   - Use environment variables for configuration
   - Consider load balancer if traffic is high

## Configuration

### Environment Variables
Create `.env` files as needed:

**Frontend** (if needed):
```
VITE_API_URL=http://localhost:5000
```

**Backend**:
```
PORT=5000
NODE_ENV=production
```

## Testing

### Manual Testing
1. Start both servers as described above
2. Navigate to chatbot page
3. Test queries in all three languages:
   - Kinyarwanda: "Ese nakwirinda nte VIH?"
   - English: "How can I prevent HIV?"
   - French: "Comment puis-je prévenir le VIH?"

### Automated Testing
Backend includes test script:
```bash
cd backend
node test.js
```

## Support & Maintenance

- **Data Updates**: Modify `backend/data/healthData.json` and restart backend
- **Feature Additions**: Update React components in `src/app/pages/`
- **API Changes**: Update `src/app/services/api.ts` and backend endpoints simultaneously

## License
MIT

---

**Deployment Status**: Ready for production
**Last Updated**: April 5, 2026
**Dataset Entries**: 105 (35 Kinyarwanda, 35 English, 35 French)
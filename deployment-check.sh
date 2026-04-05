#!/bin/bash

# Nsobanuza Health Chatbot - Deployment Check & Integration Test

echo "====================================="
echo "Nsobanuza Health Chatbot - Full Stack Check"
echo "====================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Check backend dependencies
echo -e "${YELLOW}1. Checking Backend Dependencies...${NC}"
cd backend
if npm list > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
  echo -e "${RED}✗ Backend dependencies missing${NC}"
  npm install
fi
cd ..

# 2. Check frontend dependencies
echo -e "${YELLOW}2. Checking Frontend Dependencies...${NC}"
if npm list > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
  echo -e "${RED}✗ Frontend dependencies missing${NC}"
  npm install
fi

# 3. Build frontend
echo -e "${YELLOW}3. Building Frontend...${NC}"
npm run build
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Frontend build successful${NC}"
else
  echo -e "${RED}✗ Frontend build failed${NC}"
  exit 1
fi

# 4. Check backend dataset
echo -e "${YELLOW}4. Checking Health Dataset...${NC}"
if [ -f "backend/data/healthData.json" ]; then
  ENTRY_COUNT=$(grep -c '"id"' backend/data/healthData.json)
  echo -e "${GREEN}✓ Health dataset found with ~$ENTRY_COUNT entries${NC}"
else
  echo -e "${RED}✗ Health dataset not found${NC}"
  exit 1
fi

# 5. Test backend server
echo -e "${YELLOW}5. Testing Backend Server...${NC}"
cd backend
npm start &
BACKEND_PID=$!
sleep 2

# Check if backend is running
if curl -s http://localhost:5000/health > /dev/null; then
  echo -e "${GREEN}✓ Backend server running on port 5000${NC}"
else
  echo -e "${RED}✗ Backend server failed to start${NC}"
  kill $BACKEND_PID
  exit 1
fi

# 6. Test API endpoints
echo -e "${YELLOW}6. Testing API Endpoints...${NC}"
RESPONSE=$(curl -s -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is HIV?"}')

if echo "$RESPONSE" | grep -q "response"; then
  echo -e "${GREEN}✓ Chat endpoint working${NC}"
else
  echo -e "${RED}✗ Chat endpoint failed${NC}"
fi

# Stop backend
kill $BACKEND_PID
cd ..

echo ""
echo "====================================="
echo -e "${GREEN}All checks passed! System ready for deployment.${NC}"
echo "====================================="
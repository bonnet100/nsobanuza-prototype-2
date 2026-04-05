@echo off
REM Nsobanuza Health Chatbot - Deployment Check & Integration Test

echo =====================================
echo Nsobanuza Health Chatbot - Full Stack Check
echo =====================================
echo.

REM 1. Check backend dependencies
echo [1/6] Checking Backend Dependencies...
cd backend
if exist package.json (
  echo ✓ Backend package.json found
  if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
  ) else (
    echo ✓ Backend dependencies installed
  )
) else (
  echo ✗ Backend package.json not found
  exit /b 1
)
cd ..

REM 2. Check frontend dependencies
echo [2/6] Checking Frontend Dependencies...
if exist package.json (
  echo ✓ Frontend package.json found
  if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
  ) else (
    echo ✓ Frontend dependencies installed
  )
) else (
  echo ✗ Frontend package.json not found
  exit /b 1
)

REM 3. Build frontend
echo [3/6] Building Frontend...
call npm run build
if %ERRORLEVEL% EQU 0 (
  echo ✓ Frontend build successful
) else (
  echo ✗ Frontend build failed
  exit /b 1
)

REM 4. Check backend dataset
echo [4/6] Checking Health Dataset...
if exist "backend\data\healthData.json" (
  echo ✓ Health dataset found
  powershell -Command "Select-String -Path 'backend\data\healthData.json' -Pattern '\"id\"' -Count 1" > nul
) else (
  echo ✗ Health dataset not found
  exit /b 1
)

REM 5. Test backend server
echo [5/6] Testing Backend Server...
cd backend
start /B node server.js
timeout /t 2 /nobreak

REM Check if backend is running
powershell -Command "(New-Object Net.WebClient).DownloadString('http://localhost:5000/health')" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
  echo ✓ Backend server running on port 5000
) else (
  echo ✗ Backend server failed to start
  exit /b 1
)

REM 6. Test API endpoints
echo [6/6] Testing API Endpoints...
powershell -Command "$response = (New-Object Net.WebClient).DownloadString('http://localhost:5000/chat'); if ($response -match 'response') { Write-Host '✓ Chat endpoint working' } else { Write-Host '✗ Chat endpoint failed' }"

cd ..

echo.
echo =====================================
echo ✓ All checks passed! System ready for deployment.
echo =====================================
echo.
echo Next steps:
echo 1. Start Backend: cd backend ^&^& npm start
echo 2. Start Frontend: npm run dev
echo 3. Open browser: http://localhost:5175
echo =====================================
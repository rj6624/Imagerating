@echo off
echo ========================================
echo   VERCEL DEPLOYMENT HELPER
echo ========================================
echo.

echo Step 1: Installing Vercel CLI (if needed)
call npm list -g vercel >nul 2>&1
if errorlevel 1 (
    echo Installing Vercel CLI...
    call npm install -g vercel
) else (
    echo Vercel CLI already installed.
)

echo.
echo Step 2: Login to Vercel
call vercel login

echo.
echo ========================================
echo Choose what to deploy:
echo 1. Backend only
echo 2. Frontend only
echo 3. Both (Backend first, then Frontend)
echo ========================================
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" goto backend
if "%choice%"=="2" goto frontend
if "%choice%"=="3" goto both
goto end

:backend
echo.
echo Deploying Backend...
call vercel --prod
echo.
echo Backend deployed! Note the URL for frontend configuration.
goto end

:frontend
echo.
echo Deploying Frontend...
cd client
call vercel --prod
cd ..
echo.
echo Frontend deployed!
goto end

:both
echo.
echo Deploying Backend first...
call vercel --prod
echo.
echo Backend URL noted. Now update REACT_APP_API_URL in Vercel dashboard.
echo.
pause
echo.
echo Deploying Frontend...
cd client
call vercel --prod
cd ..
echo.
echo Both deployed!
goto end

:end
echo.
echo ========================================
echo Deployment Complete!
echo.
echo Next steps:
echo 1. Set environment variables in Vercel dashboard
echo 2. Update Google OAuth redirect URIs
echo 3. Test your live application
echo.
echo See DEPLOYMENT.md for detailed instructions.
echo ========================================
pause

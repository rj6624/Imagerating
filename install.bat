@echo off
echo Installing Backend Dependencies...
call npm install

echo.
echo Installing Frontend Dependencies...
cd client
call npm install
cd ..

echo.
echo Installation Complete!
echo.
echo Next steps:
echo 1. Copy .env.example to .env and configure your environment variables
echo 2. Copy client/.env.example to client/.env and configure frontend URL
echo 3. Set up MongoDB database
echo 4. Configure Google OAuth credentials
echo.
pause

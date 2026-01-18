@echo off
echo Starting Image Rating Application...
echo.

start cmd /k "cd /d %~dp0 && echo Starting Backend Server... && npm start"
timeout /t 3 /nobreak >nul
start cmd /k "cd /d %~dp0client && echo Starting Frontend Server... && npm start"

echo.
echo Application is starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.

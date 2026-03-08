@echo off
chcp 65001 >nul
title AIRIMPULS CMS - Content Management

echo.
echo   ╔══════════════════════════════════════════════════╗
echo   ║           AIRIMPULS Content Management           ║
echo   ║                                                  ║
echo   ║   CMS-Editor:    http://localhost:3001/admin     ║
echo   ║   Vorschau:      http://localhost:3000           ║
echo   ╚══════════════════════════════════════════════════╝
echo.
echo   Starte Webseite und CMS...
echo.

:: Start frontend dev server in background
cd /d "%~dp0"
start "AIRIMPULS Webseite (Vorschau)" /min cmd /c "npm run dev"

:: Wait a moment for frontend to start
timeout /t 3 /nobreak >nul

:: Start CMS
cd /d "%~dp0cms"
echo   [OK] Webseite wird gestartet auf http://localhost:3000
echo   [OK] CMS wird gestartet auf http://localhost:3001
echo.
echo   Warte auf CMS-Start...
echo.

call npm run dev

:: If CMS exits, close frontend too
taskkill /fi "WindowTitle eq AIRIMPULS Webseite (Vorschau)" /f >nul 2>&1

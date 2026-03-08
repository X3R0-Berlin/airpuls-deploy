# AIRIMPULS CMS - Startskript fuer Marketer
# Startet CMS + Frontend-Vorschau mit einem Klick

$ErrorActionPreference = "SilentlyContinue"
$ProjectDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "  ║           AIRIMPULS Content Management           ║" -ForegroundColor Cyan
Write-Host "  ║                                                  ║" -ForegroundColor Cyan
Write-Host "  ║   CMS-Editor:    http://localhost:3001/admin     ║" -ForegroundColor Cyan
Write-Host "  ║   Vorschau:      http://localhost:3000           ║" -ForegroundColor Cyan
Write-Host "  ╚══════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Start frontend dev server in background
Write-Host "  [1/2] Starte Webseiten-Vorschau..." -ForegroundColor Yellow
$frontendJob = Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory $ProjectDir -WindowStyle Minimized -PassThru

Start-Sleep -Seconds 3

# Start CMS
Write-Host "  [2/2] Starte CMS..." -ForegroundColor Yellow
Write-Host ""
Write-Host "  Beide Server laufen! Oeffne den Browser:" -ForegroundColor Green
Write-Host "    -> http://localhost:3001/admin" -ForegroundColor White
Write-Host ""

# Open browser automatically
Start-Process "http://localhost:3001/admin"

# Run CMS in foreground
Set-Location "$ProjectDir\cms"
& npm run dev

# Cleanup: stop frontend when CMS exits
if ($frontendJob -and !$frontendJob.HasExited) {
    Stop-Process -Id $frontendJob.Id -Force
}

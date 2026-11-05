@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js belum ditemukan. Instal Node.js LTS dari https://nodejs.org
  echo Setelah instalasi selesai, buka kembali file JALANKAN.bat ini.
  pause
  exit /b 1
)
node server.cjs --open
pause

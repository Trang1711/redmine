@echo off
cd /d %~dp0
if not exist node_modules (
  echo Dang cai dat thu vien lan dau...
  call npm install
)
call npm run dev
pause

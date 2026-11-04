@echo off
title Portfolio Live Server
echo Starting Vite Portfolio Server...
start "" "http://localhost:5173/"
npm run dev -- --host
pause

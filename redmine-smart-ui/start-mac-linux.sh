#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
if [ ! -d node_modules ]; then
  echo "Dang cai dat thu vien lan dau..."
  npm install
fi
npm run dev

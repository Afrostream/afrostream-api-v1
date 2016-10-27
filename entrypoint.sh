#!/bin/sh

APP_PATH="/usr/src/app"
NODE_MODULES_PATH="${APP_PATH}/node_modules"

cd "${APP_PATH}"
if [ ! -d "${NODE_MODULES_PATH}" ]
then
  echo "npm install all modules..."
  npm install
fi

echo "running npm run dev..."
npm run dev
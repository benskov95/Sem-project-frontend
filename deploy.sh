#!/usr/bin/env bash

DIRECTORY="borngag" # Directory name
DROPLET_URL="bencat.dk" # Your own URL

echo "##############################"
echo "Building the frontend project"
echo "##############################"
npm run build

echo "##############################"
echo "Deploying Frontend project..."
echo "##############################"

scp -r ./build/* root@$DROPLET_URL:/var/www/$DIRECTORY


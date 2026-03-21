#!/bin/bash
set -e

echo "Starting Portfolio deployment..."

cd ~/portfolio

if [ "$SKIP_PULL" != "true" ]; then
  echo "Pulling latest code from GitHub..."
  git pull origin main
fi

# Build new image while old container keeps serving traffic
echo "Building new image (old container still serving)..."
docker compose build

# Quick swap: stop old container, start new one (~2-3s downtime)
echo "Swapping to new container..."
docker compose up -d --wait --wait-timeout 120

echo "Cleaning up unused Docker images..."
docker image prune -f

echo "Deployment complete!"
echo ""
echo "Container status:"
docker compose ps

echo ""
echo "Recent logs:"
docker compose logs --tail=50

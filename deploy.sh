#!/bin/bash
set -e

echo "Starting Portfolio deployment..."

# Navigate to project directory
cd ~/portfolio

# Pull latest code from GitHub
if [ "$SKIP_PULL" != "true" ]; then
  echo "Pulling latest code from GitHub..."
  git pull origin main
fi

# Stop running containers
echo "Stopping running containers..."
docker compose down

# Rebuild and start containers
echo "Building and starting containers..."
docker compose build
docker compose up -d --wait --wait-timeout 120

# Clean up unused Docker images to free disk space
echo "Cleaning up unused Docker images..."
docker image prune -f

# Show container status
echo "Deployment complete!"
echo ""
echo "Container status:"
docker compose ps

# Show logs
echo ""
echo "Recent logs:"
docker compose logs --tail=50

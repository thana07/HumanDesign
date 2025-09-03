#!/bin/bash

echo "🚀 Checking Railway deployment status..."
echo "========================================="

# Check if site is up
URL="https://humandesign-production-f3d0.up.railway.app"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $URL)

if [ $HTTP_STATUS -eq 200 ]; then
    echo "✅ Site is LIVE at $URL"
    echo "HTTP Status: $HTTP_STATUS"
    
    # Check build info
    BUILD_TIME=$(curl -s $URL | grep -o 'Built:.*' | head -1 || echo "Build time not found")
    echo "$BUILD_TIME"
else
    echo "⚠️  Site returned HTTP $HTTP_STATUS"
    echo "Deployment might still be in progress..."
fi

echo ""
echo "📦 Latest commit:"
git log --oneline -1

echo ""
echo "⏰ Current time: $(date)"
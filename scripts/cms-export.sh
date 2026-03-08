#!/bin/bash
# Export CMS data to JSON and rebuild the static site
# Usage: ./scripts/cms-export.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
CMS_DIR="$PROJECT_DIR/cms"

echo "📦 Exporting CMS data to JSON..."
cd "$CMS_DIR"
npx tsx src/lib/exportJson.ts

echo ""
echo "🔨 Rebuilding static site..."
cd "$PROJECT_DIR"
npm run build

echo ""
echo "✅ Done! New static site built with CMS data."
echo ""
echo "To deploy: git add data/ && git commit -m 'Update content from CMS' && git push"

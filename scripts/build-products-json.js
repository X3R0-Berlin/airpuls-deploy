/**
 * Builds a combined products.json for PHP API from individual product JSON files.
 * Run during build: node scripts/build-products-json.js
 */
const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, '..', 'data', 'products');
const outputFile = path.join(__dirname, '..', 'php', 'api', 'products.json');

const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'));

const products = files.map(file => {
  const data = JSON.parse(fs.readFileSync(path.join(productsDir, file), 'utf-8'));
  return {
    slug: data.slug,
    name: data.name,
    subtitle: data.subtitle || '',
    price: data.price,
    description: (data.description || '').slice(0, 200),
    images: {
      basePath: data.images?.basePath || '',
      gallery: data.images?.gallery?.slice(0, 1) || [],
    },
  };
});

fs.writeFileSync(outputFile, JSON.stringify(products, null, 2));
console.log(`Built products.json with ${products.length} products`);

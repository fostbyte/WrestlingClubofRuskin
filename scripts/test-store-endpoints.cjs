const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

async function testStoreEndpoints() {
  const token = process.env.VITE_PRINTFUL_TOKEN;
  const storeId = 17704955;
  
  console.log(`🔍 Testing store endpoints for store ${storeId}...\n`);
  
  const endpoints = [
    { name: 'Store Info', url: `https://api.printful.com/stores/${storeId}` },
    { name: 'Store Products', url: `https://api.printful.com/stores/${storeId}/products` },
    { name: 'Store Orders', url: `https://api.printful.com/stores/${storeId}/orders` },
    { name: 'Catalog Products', url: `https://api.printful.com/catalog-products` },
    { name: 'Products (alternative)', url: `https://api.printful.com/products` }
  ];
  
  for (const endpoint of endpoints) {
    console.log(`📍 Testing ${endpoint.name}...`);
    try {
      const response = await fetch(endpoint.url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log(`   Status: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.result) {
          if (Array.isArray(data.result)) {
            console.log(`   ✅ Found ${data.result.length} items`);
            if (data.result.length > 0) {
              console.log(`   First item: ${JSON.stringify(data.result[0]).substring(0, 100)}...`);
            }
          } else {
            console.log('   ✅ Success!');
            console.log(`   Data: ${JSON.stringify(data.result).substring(0, 100)}...`);
          }
        } else {
          console.log('   ✅ Success (no result wrapper)');
        }
      } else {
        const errorText = await response.text();
        console.log(`   ❌ Error: ${errorText.substring(0, 100)}...`);
      }
    } catch (error) {
      console.log(`   ❌ Network error: ${error.message}`);
    }
    console.log('');
  }
}

testStoreEndpoints();

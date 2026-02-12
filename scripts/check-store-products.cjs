const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

async function checkStoreProducts() {
  const token = process.env.VITE_PRINTFUL_TOKEN;
  
  console.log('🔍 Checking your Printful store setup...\n');
  
  try {
    // Check all available endpoints that might have products
    const endpoints = [
      'https://api.printful.com/products',
      'https://api.printful.com/sync/products',
      'https://api.printful.com/orders'
    ];
    
    for (const url of endpoints) {
      console.log(`📍 Checking ${url.split('/').pop()}...`);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log(`   Status: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.result && Array.isArray(data.result)) {
          console.log(`   ✅ Found ${data.result.length} items`);
          
          // Look for products that might be yours
          const yourProducts = data.result.filter(item => 
            item.name && (
              item.name.toLowerCase().includes('wrestling') ||
              item.name.toLowerCase().includes('ruskin') ||
              item.name.toLowerCase().includes('wcr')
            )
          );
          
          if (yourProducts.length > 0) {
            console.log(`   🎯 Found ${yourProducts.length} products that might be yours:`);
            yourProducts.forEach((product, index) => {
              console.log(`     ${index + 1}. ${product.name} (ID: ${product.id})`);
            });
          } else if (data.result.length > 0) {
            console.log(`   📋 First few items:`);
            data.result.slice(0, 3).forEach((item, index) => {
              console.log(`     ${index + 1}. ${item.name || item.id || 'Unknown'} (ID: ${item.id})`);
            });
          }
        }
      } else {
        const errorText = await response.text();
        console.log(`   ❌ Error: ${errorText.substring(0, 100)}...`);
      }
      console.log('');
    }
    
    console.log('💡 If you don\'t see your products, you need to:');
    console.log('   1. Go to Printful Dashboard');
    console.log('   2. Click "Add Product"');
    console.log('   3. Choose a product type (t-shirt, hoodie, etc.)');
    console.log('   4. Upload your design');
    console.log('   5. Set your pricing');
    console.log('   6. Click "Submit to store"');
    console.log('   7. Make sure the product is "Synced" and "Available"');
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

checkStoreProducts();

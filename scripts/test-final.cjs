const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

async function testFinalIntegration() {
  const token = process.env.PRINTFUL_TOKEN;
  
  console.log('🎯 Testing final Printful integration...\n');
  
  try {
    // Test the exact endpoint our service will use
    const response = await fetch('https://api.printful.com/sync/products', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.result && Array.isArray(data.result)) {
        console.log(`✅ Found ${data.result.length} products:\n`);
        
        data.result.forEach((product, index) => {
          console.log(`${index + 1}. ${product.name}`);
          console.log(`   ID: ${product.id}`);
          console.log(`   Price: $${product.retail_price || 'N/A'}`);
          console.log(`   Image: ${product.image_url || 'No image'}`);
          console.log(`   Description: ${product.description?.substring(0, 100) || 'No description'}...`);
          console.log(`   Status: ${product.status || 'Unknown'}`);
          console.log('');
        });
        
        console.log('🎉 SUCCESS! Your products should now appear on the website.');
        console.log('💡 Make sure to:');
        console.log('   1. Restart your dev server (npm run dev)');
        console.log('   2. Check the browser console for any errors');
        console.log('   3. Navigate to your merchandise section');
        
      } else {
        console.log('❌ Unexpected response format:');
        console.log(JSON.stringify(data, null, 2));
      }
    } else {
      const error = await response.text();
      console.log('❌ Error:', error);
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
}

testFinalIntegration();

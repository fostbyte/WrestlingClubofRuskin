const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

async function testProducts() {
  const token = process.env.PRINTFUL_TOKEN;
  const storeId = 17704955; // Your store ID
  
  console.log(`🛍️ Testing products for store ${storeId}...\n`);
  
  try {
    const response = await fetch(`https://api.printful.com/stores/${storeId}/products`, {
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
        
        if (data.result.length === 0) {
          console.log('⚠️  No products found in your store.');
          console.log('\nTo add products:');
          console.log('1. Go to Printful Dashboard');
          console.log('2. Click "Add Product"');
          console.log('3. Choose a product type (t-shirt, hoodie, etc.)');
          console.log('4. Upload your design');
          console.log('5. Set pricing and publish');
        } else {
          data.result.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name}`);
            console.log(`   ID: ${product.id}`);
            console.log(`   Price: $${product.retail_price || 'N/A'}`);
            console.log(`   Image: ${product.image_url || 'No image'}`);
            console.log(`   Status: ${product.status || 'Unknown'}`);
            console.log('');
          });
        }
      } else {
        console.log('Unexpected response format:');
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

testProducts();

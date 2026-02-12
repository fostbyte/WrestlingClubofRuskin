const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

async function testUpdatedService() {
  console.log('🧪 Testing Updated Printful Service...\n');
  
  const token = process.env.PRINTFUL_TOKEN;
  const storeId = 17704955;
  
  try {
    // Test the exact endpoint your service will use
    console.log(`🛍️ Testing sync products for store ${storeId}...`);
    const response = await fetch(`https://api.printful.com/sync/products?store_id=${storeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API call successful!');
      
      if (data.result && Array.isArray(data.result)) {
        console.log(`📦 Found ${data.result.length} product(s):`);
        
        data.result.forEach((product, index) => {
          console.log(`\n   ${index + 1}. 🎯 ${product.name}`);
          console.log(`      🆔 ID: ${product.id}`);
          console.log(`      ✅ Synced: ${product.synced ? 'YES' : 'NO'}`);
          console.log(`      📸 Has thumbnail: ${product.thumbnail_url ? 'YES' : 'NO'}`);
        });
        
        // Test product details
        if (data.result.length > 0) {
          const firstProduct = data.result[0];
          console.log(`\n🔍 Testing product details for ${firstProduct.name}...`);
          
          const detailResponse = await fetch(`https://api.printful.com/sync/products/${firstProduct.id}?store_id=${storeId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (detailResponse.ok) {
            const detailData = await detailResponse.json();
            const syncProduct = detailData.sync_product || {};
            const syncVariants = detailData.sync_variants || [];
            
            console.log(`✅ Product details retrieved!`);
            console.log(`   💰 Price: $${syncVariants[0]?.retail_price || 'N/A'}`);
            console.log(`   📝 Description: ${syncProduct.description?.substring(0, 100) || 'No description'}...`);
            console.log(`   🖼️  Images: ${syncProduct.image_count || 0}`);
            console.log(`   📄 Variants: ${syncVariants.length}`);
          } else {
            console.log(`❌ Product details error: ${detailResponse.status}`);
          }
        }
        
        console.log('\n🎉 Your service should now work correctly!');
        console.log('🌐 Check your website at http://localhost:5173');
        
      } else {
        console.log('❌ Unexpected response format');
      }
    } else {
      console.log(`❌ API error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.log('Error:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testUpdatedService();

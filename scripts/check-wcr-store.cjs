const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

async function checkWCRStore() {
  const token = process.env.PRINTFUL_TOKEN;
  const storeId = 17704955; // Wrestling Club of Ruskin
  
  console.log('🏪 Checking Wrestling Club of Ruskin Store...\n');
  console.log(`🆔 Store ID: ${storeId}\n`);
  
  try {
    // Check sync products
    console.log('🛍️  Checking sync products...');
    const syncResponse = await fetch(`https://api.printful.com/sync/products?store_id=${storeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (syncResponse.ok) {
      const syncData = await syncResponse.json();
      console.log(`✅ Sync products response received`);
      
      if (syncData.result && Array.isArray(syncData.result)) {
        console.log(`📦 Found ${syncData.result.length} synced product(s):`);
        
        if (syncData.result.length === 0) {
          console.log('   No synced products found');
        } else {
          syncData.result.forEach((product, index) => {
            console.log(`\n   ${index + 1}. 🎯 ${product.name}`);
            console.log(`      🆔 ID: ${product.id}`);
            console.log(`      ✅ Synced: ${product.synced ? 'YES' : 'NO'}`);
            console.log(`      📸 Thumbnail: ${product.thumbnail_url ? 'YES' : 'NO'}`);
            console.log(`      📄 Variants: ${product.variants || 0}`);
            
            // Get detailed product info
            getProductDetails(product.id, token, storeId);
          });
        }
      } else {
        console.log('❌ Unexpected sync products format');
        console.log(JSON.stringify(syncData, null, 2));
      }
    } else {
      const errorText = await syncResponse.text();
      console.log(`❌ Sync products error: ${errorText}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function getProductDetails(productId, token, storeId) {
  try {
    const response = await fetch(`https://api.printful.com/sync/products/${productId}?store_id=${storeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      const syncProduct = data.sync_product || {};
      const syncVariants = data.sync_variants || [];
      
      console.log(`      💰 Price: $${syncVariants[0]?.retail_price || 'N/A'}`);
      console.log(`      📝 Description: ${syncProduct.description?.substring(0, 80) || 'No description'}...`);
      console.log(`      🖼️  Images: ${syncProduct.image_count || 0}`);
    } else {
      console.log(`      ❌ Details error: ${response.status}`);
    }
  } catch (error) {
    console.log(`      ❌ Details network error`);
  }
}

checkWCRStore();

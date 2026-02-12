import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const PRINTIFY_TOKEN = process.env.VITE_PRINTIFY_TOKEN;
const SHOP_ID = process.env.VITE_PRINTIFY_SHOP_ID;

async function publishProducts() {
  try {
    console.log('🚀 Publishing your products...\n');
    
    // First get all products
    const productsResponse = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products.json`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!productsResponse.ok) {
      throw new Error(`API Error: ${productsResponse.status} ${productsResponse.statusText}`);
    }

    const productsData = await productsResponse.json();
    const products = productsData.data || [];

    console.log(`📦 Found ${products.length} products to check:\n`);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`${i + 1}. 🎯 ${product.title}`);
      console.log(`   🆔 ID: ${product.id}`);
      console.log(`   📊 Current Status: ${product.published ? '✅ PUBLISHED' : '❌ DRAFT'}`);
      
      if (!product.published) {
        console.log(`   🚀 Publishing product...`);
        
        // Get available sales channels first
        const shopsResponse = await fetch(`https://api.printify.com/v1/shops.json`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });

        if (shopsResponse.ok) {
          const shopsData = await shopsResponse.json();
          const currentShop = shopsData.find(shop => shop.id === parseInt(SHOP_ID));
          
          if (currentShop && currentShop.sales_channels && currentShop.sales_channels.length > 0) {
            // Publish to the first available sales channel
            const salesChannel = currentShop.sales_channels[0];
            
            const publishResponse = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products/${product.id}/publish.json`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                sales_channels: [salesChannel.id]
              })
            });

            if (publishResponse.ok) {
              const publishResult = await publishResponse.json();
              console.log(`   ✅ Successfully published!`);
              console.log(`   📱 Published to: ${salesChannel.title || salesChannel.id}`);
            } else {
              const errorData = await publishResponse.json();
              console.log(`   ❌ Failed to publish: ${publishResponse.status}`);
              console.log(`   📄 Error: ${JSON.stringify(errorData, null, 2)}`);
            }
          } else {
            console.log(`   ⚠️  No sales channels available for this shop`);
          }
        } else {
          console.log(`   ⚠️  Could not fetch sales channels`);
        }
      } else {
        console.log(`   ✅ Already published`);
      }
      
      console.log('---');
    }

    // Verify publish status after attempts
    console.log('\n🔍 Verifying publish status...\n');
    await checkPublishStatus();

  } catch (error) {
    console.error('❌ Error publishing products:', error.message);
  }
}

async function checkPublishStatus() {
  try {
    const productsResponse = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products.json`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (productsResponse.ok) {
      const productsData = await productsResponse.json();
      const products = productsData.data || [];

      console.log('📊 Final Publish Status:');
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.title}`);
        console.log(`   Status: ${product.published ? '✅ PUBLISHED' : '❌ DRAFT'}`);
        console.log('');
      });
    }
  } catch (error) {
    console.error('Error checking final status:', error.message);
  }
}

publishProducts();

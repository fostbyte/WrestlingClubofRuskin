import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const PRINTIFY_TOKEN = process.env.VITE_PRINTIFY_TOKEN;
const SHOP_ID = process.env.VITE_PRINTIFY_SHOP_ID;

async function publishCurrentProducts() {
  try {
    console.log('🚀 Publishing current products...\n');
    
    // Get current products
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

    console.log(`📦 Found ${products.length} products to publish:\n`);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`${i + 1}. 🎯 ${product.title}`);
      console.log(`   🆔 ID: ${product.id}`);
      console.log(`   📊 Status: ${product.published ? 'PUBLISHED' : 'DRAFT'}`);
      
      if (!product.published) {
        console.log(`   🚀 Publishing...`);
        
        // Try to publish without sales channel (some accounts allow this)
        const publishResponse = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products/${product.id}/publish.json`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        });

        if (publishResponse.ok) {
          const result = await publishResponse.json();
          console.log(`   ✅ Published successfully!`);
          console.log(`   📱 Result: ${JSON.stringify(result)}`);
        } else {
          const error = await publishResponse.json();
          console.log(`   ❌ Failed to publish: ${publishResponse.status}`);
          console.log(`   📄 Error: ${JSON.stringify(error, null, 2)}`);
          
          // Try alternative method - just mark as published
          console.log(`   🔄 Trying alternative method...`);
          const updateResponse = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products/${product.id}.json`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              published: true,
              visible: true
            })
          });

          if (updateResponse.ok) {
            console.log(`   ✅ Updated successfully!`);
          } else {
            console.log(`   ❌ Alternative method failed`);
          }
        }
      } else {
        console.log(`   ✅ Already published`);
      }
      
      console.log('---');
    }

    // Check final status
    console.log('\n🔍 Checking final status...\n');
    await checkFinalStatus();

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function checkFinalStatus() {
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

      console.log('📊 Final Status:');
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.title}`);
        console.log(`   Published: ${product.published ? '✅ YES' : '❌ NO'}`);
        console.log('');
      });
      
      const publishedCount = products.filter(p => p.published).length;
      console.log(`🎯 Website should now show ${publishedCount} product(s)`);
    }
  } catch (error) {
    console.error('Error checking final status:', error.message);
  }
}

publishCurrentProducts();

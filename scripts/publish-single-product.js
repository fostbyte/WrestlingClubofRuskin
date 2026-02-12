import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const PRINTIFY_TOKEN = process.env.VITE_PRINTIFY_TOKEN;
const SHOP_ID = process.env.VITE_PRINTIFY_SHOP_ID;

async function publishSingleProduct() {
  try {
    console.log('🚀 Publishing your draft product...\n');
    
    // Get the current product
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
    
    if (products.length === 0) {
      console.log('❌ No products found');
      return;
    }

    const product = products[0];
    console.log(`📦 Found: ${product.title}`);
    console.log(`   🆔 ID: ${product.id}`);
    console.log(`   📊 Status: ${product.published ? 'PUBLISHED' : 'DRAFT'}`);
    
    // Method 1: Try to publish with empty sales channels array
    console.log('\n🔄 Method 1: Publishing with empty sales channels...');
    const publishResponse1 = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products/${product.id}/publish.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sales_channels: []
      })
    });

    if (publishResponse1.ok) {
      console.log('   ✅ Method 1 successful!');
      const result = await publishResponse1.json();
      console.log(`   📱 Result: ${JSON.stringify(result, null, 2)}`);
    } else {
      console.log(`   ❌ Method 1 failed: ${publishResponse1.status}`);
      const error = await publishResponse1.json();
      console.log(`   📄 Error: ${JSON.stringify(error)}`);
      
      // Method 2: Try to update the product to published status directly
      console.log('\n🔄 Method 2: Updating product status...');
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
        console.log('   ✅ Method 2 successful!');
        const result = await updateResponse.json();
        console.log(`   📱 Result: ${JSON.stringify(result, null, 2)}`);
      } else {
        console.log(`   ❌ Method 2 failed: ${updateResponse.status}`);
        const error = await updateResponse.json();
        console.log(`   📄 Error: ${JSON.stringify(error)}`);
        
        // Method 3: Try with minimal publish data
        console.log('\n🔄 Method 3: Minimal publish attempt...');
        const publishResponse3 = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products/${product.id}/publish.json`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        });

        if (publishResponse3.ok) {
          console.log('   ✅ Method 3 successful!');
          const result = await publishResponse3.json();
          console.log(`   📱 Result: ${JSON.stringify(result, null, 2)}`);
        } else {
          console.log(`   ❌ Method 3 failed: ${publishResponse3.status}`);
          const error = await publishResponse3.json();
          console.log(`   📄 Error: ${JSON.stringify(error)}`);
        }
      }
    }

    // Check final status
    console.log('\n🔍 Checking final status...');
    await checkFinalStatus(product.id);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function checkFinalStatus(productId) {
  try {
    const detailResponse = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products/${productId}.json`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (detailResponse.ok) {
      const detail = await detailResponse.json();
      console.log('\n📊 Final Product Status:');
      console.log(`   Title: ${detail.title}`);
      console.log(`   Published: ${detail.published ? '✅ YES' : '❌ NO'}`);
      console.log(`   Visible: ${detail.visible ? '✅ YES' : '❌ NO'}`);
      console.log(`   Publish Status: ${detail.publish_status || 'Not published'}`);
      
      if (detail.published) {
        console.log('\n🎉 SUCCESS! Product is now published and should appear on your website!');
      } else {
        console.log('\n⚠️  Product still not published. You may need to:');
        console.log('   1. Set up a sales channel in Printify dashboard');
        console.log('   2. Publish manually through the web interface');
      }
    }
  } catch (error) {
    console.error('Error checking final status:', error.message);
  }
}

publishSingleProduct();

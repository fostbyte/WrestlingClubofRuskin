import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const PRINTIFY_TOKEN = process.env.VITE_PRINTIFY_TOKEN;
const SHOP_ID = process.env.VITE_PRINTIFY_SHOP_ID;

async function checkPublishStatus() {
  try {
    console.log('🔍 Checking publish status of your products...\n');
    
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

    console.log(`📦 Found ${products.length} products in your store:\n`);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`${i + 1}. 🎯 ${product.title}`);
      console.log(`   🆔 ID: ${product.id}`);
      console.log(`   📊 Status: ${product.published ? '✅ PUBLISHED' : '❌ DRAFT'}`);
      console.log(`   🛍️  Visible: ${product.visible ? '✅ VISIBLE' : '❌ HIDDEN'}`);
      
      // Get detailed product info including publish status
      const detailResponse = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products/${product.id}.json`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (detailResponse.ok) {
        const detail = await detailResponse.json();
        console.log(`   📱 Published to: ${detail.publish_status ? detail.publish_status : 'Not published'}`);
        
        if (detail.sales_channels && detail.sales_channels.length > 0) {
          console.log(`   🛒 Sales channels: ${detail.sales_channels.join(', ')}`);
        }
      }
      
      console.log('---');
    }

    // Check for any unpublished products
    const unpublishedProducts = products.filter(p => !p.published);
    if (unpublishedProducts.length > 0) {
      console.log(`\n⚠️  Found ${unpublishedProducts.length} unpublished products:`);
      unpublishedProducts.forEach(product => {
        console.log(`   - ${product.title} (ID: ${product.id})`);
      });
      
      console.log('\n💡 To publish a product, you can:');
      console.log('   1. Go to your Printify dashboard');
      console.log('   2. Find the product');
      console.log('   3. Click "Publish" and select your sales channel');
    } else {
      console.log('\n✅ All products are published!');
    }

  } catch (error) {
    console.error('❌ Error checking publish status:', error.message);
  }
}

checkPublishStatus();

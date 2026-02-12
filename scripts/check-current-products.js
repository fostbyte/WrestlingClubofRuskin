import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const PRINTIFY_TOKEN = process.env.VITE_PRINTIFY_TOKEN;
const SHOP_ID = process.env.VITE_PRINTIFY_SHOP_ID;

async function checkCurrentProducts() {
  try {
    console.log('🔍 Checking current products and their status...\n');
    
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

    console.log(`📦 Found ${products.length} products:\n`);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`${i + 1}. 🎯 ${product.title}`);
      console.log(`   🆔 ID: ${product.id}`);
      console.log(`   📊 Published: ${product.published ? '✅ YES' : '❌ NO'}`);
      console.log(`   🛍️  Visible: ${product.visible ? '✅ YES' : '❌ NO'}`);
      console.log(`   💰 Price: $${(product.variants[0]?.price || 0) / 100}`);
      console.log(`   📸 Images: ${product.images?.length || 0}`);
      
      // Check detailed status
      const detailResponse = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products/${product.id}.json`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (detailResponse.ok) {
        const detail = await detailResponse.json();
        console.log(`   📱 Publish Status: ${detail.publish_status || 'Not published'}`);
        console.log(`   🛒 Sales Channels: ${detail.sales_channels?.length || 0}`);
        
        if (detail.sales_channels && detail.sales_channels.length > 0) {
          detail.sales_channels.forEach((channel, idx) => {
            console.log(`      ${idx + 1}. ${channel.title || channel.id} (${channel.id})`);
          });
        }
      }
      
      console.log('---');
    }

    // Check if website should see these products
    const publishedProducts = products.filter(p => p.published);
    console.log(`\n📊 Summary:`);
    console.log(`   Total products: ${products.length}`);
    console.log(`   Published products: ${publishedProducts.length}`);
    console.log(`   Draft products: ${products.length - publishedProducts.length}`);
    
    if (publishedProducts.length === 0) {
      console.log(`\n❌ Website shows "no products" because there are no published products!`);
    } else {
      console.log(`\n✅ Website should show ${publishedProducts.length} product(s)`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkCurrentProducts();

import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const PRINTIFY_TOKEN = process.env.VITE_PRINTIFY_TOKEN;
const SHOP_ID = process.env.VITE_PRINTIFY_SHOP_ID;

async function forceRefreshCheck() {
  try {
    console.log('🔄 Force refreshing product data...\n');
    
    // Add cache-busting headers
    const headers = {
      'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'If-Modified-Since': new Date(0).toUTCString()
    };

    // Check products with cache busting
    const productsResponse = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products.json?_t=${Date.now()}`, {
      method: 'GET',
      headers
    });

    console.log(`📊 API Response Status: ${productsResponse.status}`);
    console.log(`📊 Cache Headers:`, productsResponse.headers.get('cache-control'));

    if (!productsResponse.ok) {
      throw new Error(`API Error: ${productsResponse.status} ${productsResponse.statusText}`);
    }

    const productsData = await productsResponse.json();
    const products = productsData.data || [];

    console.log(`\n📦 Found ${products.length} products:\n`);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`${i + 1}. 🎯 ${product.title}`);
      console.log(`   🆔 ID: ${product.id}`);
      console.log(`   📊 Published: ${product.published ? '✅ YES' : '❌ NO'}`);
      console.log(`   🛍️  Visible: ${product.visible ? '✅ YES' : '❌ NO'}`);
      console.log(`   📅 Created: ${product.created_at || 'Unknown'}`);
      console.log(`   📅 Updated: ${product.updated_at || 'Unknown'}`);
      
      // Check detailed product info
      const detailResponse = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products/${product.id}.json?_t=${Date.now()}`, {
        method: 'GET',
        headers
      });

      if (detailResponse.ok) {
        const detail = await detailResponse.json();
        console.log(`   📱 Detailed Status: ${detail.published ? 'PUBLISHED' : 'DRAFT'}`);
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

    // Check if there's a different shop or if we're looking at wrong data
    console.log('\n🏪 Shop Verification:');
    const shopsResponse = await fetch(`https://api.printify.com/v1/shops.json?_t=${Date.now()}`, {
      method: 'GET',
      headers
    });

    if (shopsResponse.ok) {
      const shops = await shopsResponse.json();
      console.log(`📊 Available Shops: ${shops.length}`);
      
      shops.forEach((shop, index) => {
        console.log(`${index + 1}. ${shop.name || 'Unnamed'} (ID: ${shop.id})`);
        if (shop.id === parseInt(SHOP_ID)) {
          console.log(`   ✅ This is your current shop`);
        }
      });
    }

    // Test website integration
    console.log('\n🌐 Testing website integration...');
    const websiteResponse = await fetch(`http://localhost:5173`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (websiteResponse.ok) {
      console.log('✅ Website is running locally');
    } else {
      console.log('❌ Website not accessible locally');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

forceRefreshCheck();

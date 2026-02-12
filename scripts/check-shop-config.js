import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const PRINTIFY_TOKEN = process.env.VITE_PRINTIFY_TOKEN;
const SHOP_ID = process.env.VITE_PRINTIFY_SHOP_ID;

async function checkShopConfiguration() {
  try {
    console.log('🏪 Checking your shop configuration...\n');
    
    // Get all shops
    const shopsResponse = await fetch(`https://api.printify.com/v1/shops.json`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!shopsResponse.ok) {
      throw new Error(`API Error: ${shopsResponse.status} ${shopsResponse.statusText}`);
    }

    const shops = await shopsResponse.json();
    
    console.log(`📊 Found ${shops.length} shop(s):\n`);

    for (const shop of shops) {
      console.log(`🏪 Shop: ${shop.name || 'Unnamed Shop'}`);
      console.log(`   🆔 ID: ${shop.id}`);
      console.log(`   📧 Email: ${shop.email || 'Not set'}`);
      console.log(`   🌐 Domain: ${shop.domain || 'Not set'}`);
      console.log(`   📱 Sales Channels: ${shop.sales_channels?.length || 0}`);
      
      if (shop.sales_channels && shop.sales_channels.length > 0) {
        console.log('   Available Sales Channels:');
        shop.sales_channels.forEach((channel, index) => {
          console.log(`     ${index + 1}. ${channel.title || channel.id} (${channel.id})`);
          console.log(`        Type: ${channel.type || 'Unknown'}`);
          console.log(`        Status: ${channel.enabled ? '✅ Enabled' : '❌ Disabled'}`);
        });
      } else {
        console.log('   ⚠️  No sales channels configured');
        console.log('   💡 You need to set up a sales channel (like Etsy, eBay, or Printify API) to publish products');
      }
      
      console.log('---');
    }

    // Check current shop details
    const currentShop = shops.find(shop => shop.id === parseInt(SHOP_ID));
    if (currentShop) {
      console.log(`\n🎯 Current Shop Details (ID: ${SHOP_ID}):`);
      console.log(`   Name: ${currentShop.name || 'Not set'}`);
      console.log(`   Sales Channels: ${currentShop.sales_channels?.length || 0}`);
      
      if (!currentShop.sales_channels || currentShop.sales_channels.length === 0) {
        console.log('\n❌ Cannot publish products - no sales channels available');
        console.log('\n🔧 To fix this:');
        console.log('1. Go to your Printify dashboard');
        console.log('2. Navigate to Settings → Sales Channels');
        console.log('3. Add a sales channel (e.g., Printify API, Etsy, eBay, etc.)');
        console.log('4. Enable the sales channel');
        console.log('5. Try publishing again');
      }
    } else {
      console.log(`\n❌ Shop ID ${SHOP_ID} not found in your account`);
    }

  } catch (error) {
    console.error('❌ Error checking shop configuration:', error.message);
  }
}

checkShopConfiguration();

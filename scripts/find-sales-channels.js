import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const PRINTIFY_TOKEN = process.env.VITE_PRINTIFY_TOKEN;
const SHOP_ID = process.env.VITE_PRINTIFY_SHOP_ID;

async function findAndCreateSalesChannel() {
  try {
    console.log('🔍 Looking for sales channel options...\n');
    
    // Check what sales channel types are available
    const catalogResponse = await fetch(`https://api.printify.com/v1/catalog/sales-channels.json`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (catalogResponse.ok) {
      const channels = await catalogResponse.json();
      console.log('📱 Available Sales Channel Types:');
      channels.forEach((channel, index) => {
        console.log(`${index + 1}. ${channel.title || channel.name} (${channel.id})`);
        console.log(`   Description: ${channel.description || 'No description'}`);
        console.log('');
      });
    }

    // Try to create a Printify API sales channel
    console.log('🚀 Attempting to create Printify API sales channel...\n');
    
    const createChannelResponse = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/sales-channels.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'WCR Website',
        type: 'api'
      })
    });

    if (createChannelResponse.ok) {
      const newChannel = await createChannelResponse.json();
      console.log('✅ Successfully created sales channel!');
      console.log(`   Title: ${newChannel.title}`);
      console.log(`   ID: ${newChannel.id}`);
      console.log(`   Type: ${newChannel.type}`);
      
      // Now try to publish products
      console.log('\n🚀 Publishing products to new channel...\n');
      await publishToChannel(newChannel.id);
      
    } else {
      const error = await createChannelResponse.json();
      console.log('❌ Failed to create sales channel:');
      console.log(`   Status: ${createChannelResponse.status}`);
      console.log(`   Error: ${JSON.stringify(error, null, 2)}`);
      
      console.log('\n🔧 Manual Setup Required:');
      console.log('1. Go to https://printify.com/app/dashboard');
      console.log('2. Click on "My Stores" or "Stores" in the left menu');
      console.log('3. Click on your store');
      console.log('4. Look for "Sales Channels" or "Integrations"');
      console.log('5. Click "Add Sales Channel"');
      console.log('6. Select "Printify API" or "Custom API"');
      console.log('7. Give it a name like "WCR Website"');
      console.log('8. Enable the channel');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function publishToChannel(channelId) {
  try {
    // Get products
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

      for (const product of products) {
        if (!product.published) {
          console.log(`📦 Publishing: ${product.title}`);
          
          const publishResponse = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products/${product.id}/publish.json`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              sales_channels: [channelId]
            })
          });

          if (publishResponse.ok) {
            console.log(`   ✅ Published successfully!`);
          } else {
            const error = await publishResponse.json();
            console.log(`   ❌ Failed: ${JSON.stringify(error)}`);
          }
        }
      }
    }
  } catch (error) {
    console.error('❌ Error publishing:', error.message);
  }
}

findAndCreateSalesChannel();

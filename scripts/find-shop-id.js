const fetch = require('node-fetch');

const PRINTIFY_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImE5YzM0MTRmYmQxMmRiNzRlOWYwNTdkZWIxYWM3NTk1Mzc1YzRlMzJiYzhiMDM0NTRjZWIxZDdjM2YxMzdkNjNlZGUwZmY1NzZkMmRkNTAzIiwiaWF0IjoxNzcwNzQ5NjU0LjM0OTIzNywibmJmIjoxNzcwNzQ5NjU0LjM0OTIzOSwiZXhwIjoxODAyMjg1NjU0LjMzODYxNSwic3ViIjoiMjMzODQ5OTgiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIiwidXNlci5pbmZvIl19.Bd32Vg654v_G2vTSHTpQjmsoY1MPHPkSXGd2OERDahL6_B2l-AOtsDNGahxBcp7F9Z7Eti8YGPNR-exvi4sNbVeTpp9w4bOO2ARaexKLjzDOSip48ikMUxMFDD5saWu06Jm-HKjpEMu66QyO7OI_6kkIlZsGMVzwLuB-FNx-cuz282b4A-wMV6R_TkbqUUL2DpqUJxDNvuqDvrqCQ7vuA1ei0uulGOlWXFH3Koune_KEKDcrFHL5akWRUFC2fRQnCFPJydE99KjYiN-fBMAEY_OT9uYUvNAr4qTmkz2dv_35bJ_yQV5Z2obEvQJta4tmdg8X7jwmJG_6WcHtqGfzY2fMu4yBY3hNvHurVm76k65Oo3PTOEKJ0n8gnS2QoLZGbvLpGr0MN5rUCAf8eRUtx8o2eGfIIlLF1bQSEtpBjt8nhq1OmrW_jMYsoGIcQtVJnEEh16leKTAGoFtf9WGpTpz65lsqrtilFbrzlkHMaSdm1d6_j2KZoVfr-iBxM1FRBtsQd08kEfcnfyU3yzFtJJEq9KkgoRKIkBNAoIoh4Oncz9sx8OEB7K0W4RFECjx5c9W-XMU4fXwGGHoWfV9Gzb8MnNUggJ6sgyTUqrFeg5j4Q99KbhFdAa982_r-BBoyoEA0fdNowjZFf5F-EI2PoVraIDDY1VicKIEgxoLKFm';

async function findShopId() {
  try {
    console.log('🔍 Finding your Printify Shop ID...\n');

    // Fetch shops from Printify API
    const response = await fetch('https://api.printify.com/v1/shops.json', {
      headers: {
        'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const shops = await response.json();
    
    console.log('✅ Success! Found your shops:\n');
    
    shops.forEach((shop, index) => {
      console.log(`🏪 Shop ${index + 1}:`);
      console.log(`   ID: ${shop.id}`);
      console.log(`   Name: ${shop.title}`);
      console.log(`   URL: ${shop.sales_channel_id ? `https://${shop.sales_channel_id}.printify.store` : 'No custom domain'}`);
      console.log('');
    });

    if (shops.length === 0) {
      console.log('❌ No shops found. Make sure your token has the correct permissions.');
    } else {
      console.log('🎯 Use the Shop ID above in your .env file:');
      console.log(`   VITE_PRINTIFY_SHOP_ID=${shops[0].id}`);
    }

  } catch (error) {
    console.error('❌ Error fetching shops:', error.message);
    
    if (error.message.includes('401')) {
      console.log('\n💡 Token appears to be invalid or expired.');
      console.log('   Please check your Printify dashboard for a new API token.');
    } else if (error.message.includes('403')) {
      console.log('\n💡 Token lacks required permissions.');
      console.log('   Please ensure your token has "shops.read" scope.');
    }
  }
}

findShopId();

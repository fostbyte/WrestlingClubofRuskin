const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function testPrintfulAPI() {
  console.log('🧪 Testing Printful API Connection...\n');
  
  // Check if token is set
  const token = process.env.PRINTFUL_TOKEN;
  
  if (!token || token === 'your_printful_token_here') {
    console.error('❌ PRINTFUL_TOKEN not found or not set!');
    console.log('Please set PRINTFUL_TOKEN in your .env file with your actual Printful API token.');
    return false;
  }
  
  console.log(`✅ Token found: ${token.substring(0, 10)}...`);
  console.log(`📏 Token length: ${token.length} characters\n`);
  
  try {
    // Test 1: Check API connection with different endpoints
    console.log('📦 Testing API connection...');
    
    // Try the stores endpoint first
    let storeResponse = await fetch('https://api.printful.com/stores', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    let storeData;
    let storeId = null;
    
    if (storeResponse.ok) {
      storeData = await storeResponse.json();
      console.log('✅ API connection successful');
      console.log(`📊 Found ${storeData.length || 0} store(s)`);
      
      if (storeData.length > 0) {
        storeId = storeData[0].id;
        console.log(`✅ Using store ID: ${storeId}`);
      }
    } else {
      console.log(`⚠️  Stores endpoint returned ${storeResponse.status}, trying alternative...`);
    }
    
    // If no stores found, try to get store info from account
    if (!storeId) {
      console.log('\n🏪 Trying to get store from account info...');
      const accountResponse = await fetch('https://api.printful.com/store', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (accountResponse.ok) {
        const accountData = await accountResponse.json();
        console.log('✅ Account info retrieved');
        console.log('Account data:', JSON.stringify(accountData, null, 2));
        
        // Try to extract store ID from account data
        if (accountData.id) {
          storeId = accountData.id;
          console.log(`✅ Found store ID: ${storeId}`);
        }
      } else {
        console.log(`⚠️  Account endpoint returned ${accountResponse.status}`);
      }
    }
    
    if (!storeId) {
      console.log('\n⚠️  Could not determine store ID. Trying sync products without store ID...');
    }
    
    // Test 3: Check sync products with or without store ID
    console.log('\n🛍️ Testing sync products endpoint...');
    let syncUrl = 'https://api.printful.com/sync/products';
    if (storeId) {
      syncUrl += `?store_id=${storeId}`;
    }
    
    const syncResponse = await fetch(syncUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!syncResponse.ok) {
      console.error(`❌ Sync products API error: ${syncResponse.status} ${syncResponse.statusText}`);
      const errorText = await syncResponse.text();
      console.error('Error details:', errorText);
      return false;
    }
    
    const syncData = await syncResponse.json();
    console.log('✅ Sync products endpoint working');
    
    if (syncData.result && Array.isArray(syncData.result)) {
      const products = syncData.result;
      console.log(`📦 Found ${products.length} synced products`);
      
      if (products.length === 0) {
        console.log('\n⚠️  No products found. This could mean:');
        console.log('   - No products are published in your Printful store');
        console.log('   - Products haven\'t been synced yet');
        console.log('   - Store is not properly configured');
        return true; // API works, just no products
      }
      
      // Test 3: Get details for first product
      console.log('\n🔍 Testing product details...');
      const firstProduct = products[0];
      console.log(`📋 First product: ${firstProduct.name}`);
      console.log(`🆔 Product ID: ${firstProduct.id}`);
      
      const detailResponse = await fetch(`https://api.printful.com/sync/products/${firstProduct.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!detailResponse.ok) {
        console.error(`❌ Product details API error: ${detailResponse.status} ${detailResponse.statusText}`);
        return false;
      }
      
      const detailData = await detailResponse.json();
      console.log('✅ Product details retrieved successfully');
      
      // Display product summary
      const syncProduct = detailData.sync_product || {};
      const syncVariants = detailData.sync_variants || [];
      
      console.log('\n📊 Product Summary:');
      console.log(`   📝 Name: ${syncProduct.name}`);
      console.log(`   🆔 ID: ${syncProduct.id}`);
      console.log(`   📄 Description: ${syncProduct.description?.substring(0, 100) || 'No description'}...`);
      console.log(`   🎯 Variants: ${syncVariants.length}`);
      console.log(`   💰 Price: $${syncVariants[0]?.retail_price || 'N/A'}`);
      console.log(`   📸 Thumbnail: ${syncProduct.thumbnail_url ? '✅ Available' : '❌ None'}`);
      console.log(`   ✅ Published: ${firstProduct.synced ? 'YES' : 'NO'}`);
      
      console.log('\n🎉 All tests passed! Your Printful API is working correctly.');
      return true;
      
    } else {
      console.error('❌ Unexpected response format from sync products');
      console.log('Response:', JSON.stringify(syncData, null, 2));
      return false;
    }
    
  } catch (error) {
    console.error('❌ Network error:', error.message);
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 This usually means a network connectivity issue.');
    } else if (error.message.includes('ETIMEDOUT')) {
      console.log('\n💡 The request timed out. Try again in a moment.');
    }
    
    return false;
  }
}

// Run the test
testPrintfulAPI().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});

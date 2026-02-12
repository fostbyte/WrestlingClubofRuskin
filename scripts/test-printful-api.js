const fetch = require('node-fetch');

// Test Printful API connection
async function testPrintfulAPI() {
  console.log('🧪 Testing Printful API connection...\n');
  
  // Check if token is set
  const token = process.env.VITE_PRINTFUL_TOKEN || process.env.PRINTFUL_TOKEN;
  
  if (!token || token === 'your_printful_token_here') {
    console.error('❌ Printful API token not found or not set!');
    console.log('Please set VITE_PRINTFUL_TOKEN in your .env file with your actual Printful API token.');
    return;
  }
  
  console.log(`✅ Token found: ${token.substring(0, 10)}...`);
  
  try {
    // Test store info
    console.log('\n📦 Fetching store information...');
    const storeResponse = await fetch('https://api.printful.com/store', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!storeResponse.ok) {
      throw new Error(`Store API error: ${storeResponse.status} ${storeResponse.statusText}`);
    }
    
    const storeData = await storeResponse.json();
    console.log('✅ Store connected successfully');
    console.log('Store info:', JSON.stringify(storeData, null, 2));
    
    // Test products
    console.log('\n🛍️  Fetching products...');
    const productsResponse = await fetch('https://api.printful.com/store/products', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!productsResponse.ok) {
      throw new Error(`Products API error: ${productsResponse.status} ${productsResponse.statusText}`);
    }
    
    const productsData = await productsResponse.json();
    console.log('✅ Products API response received');
    
    if (Array.isArray(productsData)) {
      console.log(`📊 Found ${productsData.length} products:`);
      
      if (productsData.length === 0) {
        console.log('⚠️  No products found. Make sure you:');
        console.log('   1. Have published products in your Printful store');
        console.log('   2. Products are synced and available');
        console.log('   3. Your store is properly connected');
      } else {
        productsData.forEach((product, index) => {
          console.log(`\n${index + 1}. ${product.name}`);
          console.log(`   ID: ${product.id}`);
          console.log(`   Price: $${product.retail_price || 'N/A'}`);
          console.log(`   Image: ${product.image_url || 'No image'}`);
          console.log(`   Description: ${product.description?.substring(0, 100) || 'No description'}...`);
        });
      }
    } else {
      console.log('❌ Unexpected response format:');
      console.log(JSON.stringify(productsData, null, 2));
    }
    
  } catch (error) {
    console.error('❌ API Error:', error.message);
    
    if (error.message.includes('401')) {
      console.log('\n💡 This usually means:');
      console.log('   - Your API token is invalid');
      console.log('   - The token has expired');
      console.log('   - The token doesn\'t have the right permissions');
    } else if (error.message.includes('404')) {
      console.log('\n💡 This usually means:');
      console.log('   - The store is not properly set up');
      console.log('   - The API endpoint has changed');
    }
  }
}

// Load environment variables
require('dotenv').config();

// Run the test
testPrintfulAPI();

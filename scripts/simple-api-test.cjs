const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function testPrintfulKey() {
  console.log('🔑 Testing Printful API Key...\n');
  
  const token = process.env.PRINTFUL_TOKEN;
  
  if (!token || token === 'your_printful_token_here') {
    console.error('❌ PRINTFUL_TOKEN not found or not set!');
    console.log('Please set PRINTFUL_TOKEN in your .env file with your actual Printful API token.');
    return false;
  }
  
  console.log(`✅ Token found: ${token.substring(0, 10)}...`);
  console.log(`📏 Token length: ${token.length} characters\n`);
  
  try {
    // Test basic API connection
    console.log('🔍 Testing API authentication...');
    const response = await fetch('https://api.printful.com/orders', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 401) {
      console.error('❌ Authentication failed - Invalid API token');
      console.log('\n💡 To fix this:');
      console.log('1. Go to https://www.printful.com/dashboard/api');
      console.log('2. Generate a new API token');
      console.log('3. Update your .env file with the new token');
      return false;
    }
    
    if (response.ok) {
      console.log('✅ API token is valid and working!');
      
      const data = await response.json();
      console.log(`📊 API response received successfully`);
      console.log(`📦 Orders endpoint accessible (found ${data.length || 0} orders)`);
      
      console.log('\n🎯 Next steps:');
      console.log('1. Make sure you have a store set up in Printful');
      console.log('2. Publish at least one product in your store');
      console.log('3. Your website should then be able to fetch products');
      
      return true;
    } else {
      console.log(`⚠️  API returned status: ${response.status}`);
      const errorText = await response.text();
      console.log('Response:', errorText);
      
      if (response.status === 403) {
        console.log('\n💡 This might mean:');
        console.log('- Your token doesn\'t have the right permissions');
        console.log('- You need to set up a store first');
      }
      
      return false;
    }
    
  } catch (error) {
    console.error('❌ Network error:', error.message);
    return false;
  }
}

// Test the API key
testPrintfulKey().then(success => {
  if (success) {
    console.log('\n✅ Your Printful API key is working correctly!');
    console.log('📝 If you\'re not seeing products, make sure:');
    console.log('   - You have a store set up in Printful');
    console.log('   - Products are published and synced');
    console.log('   - Your store is properly configured');
  } else {
    console.log('\n❌ There are issues with your Printful API setup.');
  }
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});

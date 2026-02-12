const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function debugPrintful() {
  console.log('🔍 Debugging Printful API...\n');
  
  const token = process.env.VITE_PRINTFUL_TOKEN || process.env.PRINTFUL_TOKEN;
  
  if (!token || token === 'YOUR_ACTUAL_PRINTFUL_TOKEN_HERE') {
    console.error('❌ Please set your actual Printful token in .env file');
    return;
  }
  
  console.log(`✅ Token: ${token.substring(0, 10)}... (length: ${token.length})`);
  
  // Test different endpoints
  const endpoints = [
    { name: 'Account Info', url: 'https://api.printful.com' },
    { name: 'Stores', url: 'https://api.printful.com/stores' },
    { name: 'Store (legacy)', url: 'https://api.printful.com/store' },
    { name: 'Orders', url: 'https://api.printful.com/orders' }
  ];
  
  for (const endpoint of endpoints) {
    console.log(`\n📍 Testing ${endpoint.name}...`);
    try {
      const response = await fetch(endpoint.url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log(`   Status: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('   ✅ Success!');
        if (Array.isArray(data)) {
          console.log(`   Found ${data.length} items`);
        } else {
          console.log('   Response:', JSON.stringify(data, null, 2).substring(0, 200) + '...');
        }
      } else {
        const errorText = await response.text();
        console.log(`   ❌ Error: ${errorText.substring(0, 200)}...`);
      }
    } catch (error) {
      console.log(`   ❌ Network error: ${error.message}`);
    }
  }
  
  console.log('\n💡 If you see 403 errors, this usually means:');
  console.log('   1. The token is for a different account');
  console.log('   2. The token doesn\'t have API access');
  console.log('   3. You need to create a new API token in Printful');
  console.log('   4. The store isn\'t properly connected to your account');
  
  console.log('\n🔧 To fix this:');
  console.log('   1. Go to Printful Dashboard → Settings → Store');
  console.log('   2. Go to API tab');
  console.log('   3. Generate a new API token');
  console.log('   4. Make sure your store is active and has products');
}

debugPrintful();

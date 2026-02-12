const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function listStores() {
  console.log('🏪 Listing Your Printful Stores...\n');
  
  const token = process.env.PRINTFUL_TOKEN;
  
  if (!token || token === 'your_printful_token_here') {
    console.error('❌ PRINTFUL_TOKEN not found or not set!');
    return false;
  }
  
  console.log(`🔑 Using token: ${token.substring(0, 10)}...\n`);
  
  try {
    // Try different endpoints to find stores
    const endpoints = [
      { name: 'Stores API', url: 'https://api.printful.com/stores' },
      { name: 'Store Info', url: 'https://api.printful.com/store' },
      { name: 'Account Info', url: 'https://api.printful.com/account' }
    ];
    
    for (const endpoint of endpoints) {
      console.log(`🔍 Checking ${endpoint.name}...`);
      
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
          console.log(`   ✅ Success!`);
          
          if (Array.isArray(data)) {
            if (data.length === 0) {
              console.log('   📭 No stores found');
            } else {
              console.log(`   📊 Found ${data.length} store(s):`);
              data.forEach((store, index) => {
                console.log(`\n   ${index + 1}. 🏪 Store:`);
                console.log(`      🆔 ID: ${store.id}`);
                console.log(`      📝 Name: ${store.name || 'Unnamed Store'}`);
                console.log(`      📧 Email: ${store.email || 'N/A'}`);
                console.log(`      🌐 Website: ${store.website || 'N/A'}`);
                console.log(`      📊 Status: ${store.status || 'N/A'}`);
                console.log(`      💰 Currency: ${store.currency || 'N/A'}`);
                console.log(`      📅 Created: ${store.created || 'N/A'}`);
              });
            }
          } else if (data && typeof data === 'object') {
            console.log(`   📊 Store details:`);
            console.log(`      🆔 ID: ${data.id || 'N/A'}`);
            console.log(`      📝 Name: ${data.name || 'N/A'}`);
            console.log(`      📧 Email: ${data.email || 'N/A'}`);
            console.log(`      🌐 Website: ${data.website || 'N/A'}`);
            console.log(`      📊 Status: ${data.status || 'N/A'}`);
            console.log(`      💰 Currency: ${data.currency || 'N/A'}`);
            
            // If we have a store ID, try to get products
            if (data.id) {
              console.log(`\n   🛍️  Checking products for store ${data.id}...`);
              await checkStoreProducts(data.id, token);
            }
          }
          
          console.log('\n' + '='.repeat(60) + '\n');
          
        } else {
          const errorText = await response.text();
          console.log(`   ❌ Error: ${errorText}`);
        }
        
      } catch (error) {
        console.log(`   ❌ Network error: ${error.message}`);
      }
      
      console.log('');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    return false;
  }
}

async function checkStoreProducts(storeId, token) {
  try {
    const response = await fetch(`https://api.printful.com/sync/products?store_id=${storeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.result && Array.isArray(data.result)) {
        console.log(`      📦 Found ${data.result.length} synced product(s)`);
        data.result.forEach((product, index) => {
          console.log(`         ${index + 1}. ${product.name} (ID: ${product.id})`);
        });
      } else {
        console.log('      📦 No synced products found');
      }
    } else {
      const errorText = await response.text();
      console.log(`      ❌ Products error: ${errorText}`);
    }
  } catch (error) {
    console.log(`      ❌ Products network error: ${error.message}`);
  }
}

// Run the store listing
listStores().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});

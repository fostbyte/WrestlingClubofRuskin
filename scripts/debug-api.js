import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const PRINTIFY_TOKEN = process.env.VITE_PRINTIFY_TOKEN;
const SHOP_ID = process.env.VITE_PRINTIFY_SHOP_ID;

async function debugAPI() {
  try {
    console.log('🔍 Debugging API response...\n');
    
    const response = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products.json`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log('\n📊 Response structure:');
    console.log('Type:', typeof data);
    console.log('Is Array:', Array.isArray(data));
    console.log('Keys:', Object.keys(data));
    console.log('Length:', data.length);
    
    if (data.data && Array.isArray(data.data)) {
      console.log('\n✅ Found products in data.data array');
      console.log(`📦 Found ${data.data.length} products:\n`);
      
      data.data.forEach((product, index) => {
        console.log(`${index + 1}. 🎯 ${product.title}`);
        console.log(`   🆔 ID: ${product.id}`);
        console.log(`   💰 Price: $${product.variants?.[0]?.price || 'N/A'}`);
        console.log(`   📸 ${product.images?.length || 0} image(s)`);
        console.log(`   🎨 ${product.variants?.length || 0} variant(s)`);
        console.log('');
      });
    } else {
      console.log('\n❌ No products array found');
      console.log('Sample response:', JSON.stringify(data, null, 2).substring(0, 500) + '...');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugAPI();

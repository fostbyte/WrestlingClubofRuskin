import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const PRINTIFY_TOKEN = process.env.VITE_PRINTIFY_TOKEN;
const SHOP_ID = process.env.VITE_PRINTIFY_SHOP_ID;

async function getStoreSummary() {
  try {
    console.log('🏪 Fetching your Printify store items...\n');
    
    const response = await fetch(`https://api.printify.com/v1/shops/${SHOP_ID}/products.json`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PRINTIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const products = await response.json();
    
    if (!Array.isArray(products)) {
      console.log('❌ No products found or unexpected response format');
      return;
    }
    
    console.log(`📦 Found ${products.length} products in your store:\n`);
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. 🎯 ${product.title}`);
      console.log(`   🆔 ID: ${product.id}`);
      console.log(`   💰 Price: $${product.variants[0]?.price || 'N/A'}`);
      console.log(`   📸 ${product.images?.length || 0} image(s)`);
      console.log(`   🎨 ${product.variants?.length || 0} variant(s)`);
      console.log('');
    });

    console.log(`\n✅ Total: ${products.length} products`);
    console.log(`🛒 Shop ID: ${SHOP_ID}`);
    
  } catch (error) {
    console.error('❌ Error fetching store items:', error.message);
  }
}

getStoreSummary();

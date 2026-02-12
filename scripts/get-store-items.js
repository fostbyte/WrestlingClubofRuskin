import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const PRINTIFY_TOKEN = process.env.VITE_PRINTIFY_TOKEN;
const SHOP_ID = process.env.VITE_PRINTIFY_SHOP_ID;

async function getStoreItems() {
  try {
    console.log('Fetching store items...');
    console.log(`Shop ID: ${SHOP_ID}`);
    
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
    
    console.log('API Response:', JSON.stringify(products, null, 2));
    
    if (!Array.isArray(products)) {
      console.log('Response is not an array. Checking for data property...');
      if (products.data && Array.isArray(products.data)) {
        const productList = products.data;
        console.log(`\nFound ${productList.length} products in your store:\n`);
        
        productList.forEach((product, index) => {
          console.log(`${index + 1}. ${product.title}`);
          console.log(`   ID: ${product.id}`);
          console.log(`   Price: $${product.variants[0]?.price || 'N/A'}`);
          console.log(`   Description: ${product.description || 'No description'}`);
          console.log(`   Images: ${product.images?.length || 0} image(s)`);
          console.log(`   Variants: ${product.variants?.length || 0} variant(s)`);
          console.log('---');
        });
        return productList;
      } else {
        console.log('No products array found in response');
        return [];
      }
    }
    
    console.log(`\nFound ${products.length} products in your store:\n`);
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Price: $${product.variants[0]?.price || 'N/A'}`);
      console.log(`   Description: ${product.description || 'No description'}`);
      console.log(`   Images: ${product.images?.length || 0} image(s)`);
      console.log(`   Variants: ${product.variants?.length || 0} variant(s)`);
      console.log('---');
    });

    return products;
  } catch (error) {
    console.error('Error fetching store items:', error.message);
    return null;
  }
}

// Run the function
getStoreItems();

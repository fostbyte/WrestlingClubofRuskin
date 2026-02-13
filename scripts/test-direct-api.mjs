import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.PRINTFUL_TOKEN;
const storeId = 17704955;

console.log('🧪 Direct API Test...\n');

async function testDirectAPI() {
  try {
    const response = await fetch(`https://api.printful.com/sync/products?store_id=${storeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Direct API call successful!');
      console.log('Products found:', data.result?.length || 0);
      
      if (data.result && data.result.length > 0) {
        console.log('First product:', data.result[0].name);
      }
    } else {
      console.log('❌ API error:', response.status);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testDirectAPI();

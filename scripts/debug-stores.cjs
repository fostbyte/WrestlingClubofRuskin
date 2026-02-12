const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

async function debugStores() {
  const token = process.env.PRINTFUL_TOKEN;
  
  console.log('🔍 Debugging Printful Stores Response...\n');
  
  try {
    const response = await fetch('https://api.printful.com/stores', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('\nRaw Response:');
      console.log(JSON.stringify(data, null, 2));
      
      console.log('\nResponse Analysis:');
      console.log(`Type: ${typeof data}`);
      console.log(`Is Array: ${Array.isArray(data)}`);
      console.log(`Keys: ${Object.keys(data)}`);
      
      if (Array.isArray(data)) {
        console.log(`Array length: ${data.length}`);
        if (data.length > 0) {
          console.log('First store keys:', Object.keys(data[0]));
        }
      }
    } else {
      const errorText = await response.text();
      console.log('Error:', errorText);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

debugStores();

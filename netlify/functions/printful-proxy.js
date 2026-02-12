const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { path, httpMethod } = event;
  
  // Detailed logging for debugging
  console.log('=== PRINTFUL PROXY DEBUG ===');
  console.log('Path:', path);
  console.log('HTTP Method:', httpMethod);
  console.log('PRINTFUL_TOKEN exists:', !!process.env.PRINTFUL_TOKEN);
  console.log('PRINTFUL_TOKEN length:', process.env.PRINTFUL_TOKEN?.length || 0);
  
  // Allow specific endpoints for sync products
  if (!path.includes('/sync/products')) {
    console.log('❌ Forbidden endpoint - path does not include /sync/products');
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Forbidden endpoint', path })
    };
  }

  try {
    const url = `https://api.printful.com${path}`;
    console.log('🔗 Making request to:', url);
    
    const response = await fetch(url, {
      method: httpMethod,
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📡 Printful API Response Status:', response.status);
    console.log('📡 Printful API Response StatusText:', response.statusText);
    
    const data = await response.json();
    console.log('📦 Printful API Response Keys:', Object.keys(data));
    console.log('📦 Printful API Result Length:', data.result?.length || 0);
    
    const result = {
      statusCode: response.status,
      body: JSON.stringify(data)
    };
    
    console.log('✅ Proxy response status:', result.statusCode);
    console.log('=== END DEBUG ===');
    
    return result;
  } catch (error) {
    console.log('❌ Proxy error:', error.message);
    console.log('=== END DEBUG ===');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', details: error.message })
    };
  }
};

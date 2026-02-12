const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  const { path, httpMethod, queryStringParameters } = event;
  
  console.log('=== PRINTFUL PROXY DEBUG ===');
  console.log('Path:', path);
  console.log('HTTP Method:', httpMethod);
  console.log('Query Parameters:', queryStringParameters);
  console.log('PRINTFUL_TOKEN exists:', !!process.env.PRINTFUL_TOKEN);
  
  // Allow specific endpoints for sync products
  if (!path || !path.includes('/sync/products')) {
    console.log('❌ Forbidden endpoint - path does not include /sync/products');
    return {
      statusCode: 403,
      headers,
      body: JSON.stringify({ error: 'Forbidden endpoint', path })
    };
  }

  try {
    let url = `https://api.printful.com${path}`;
    
    // Add query parameters if they exist
    if (queryStringParameters) {
      const params = new URLSearchParams(queryStringParameters);
      url += `?${params.toString()}`;
    }
    
    console.log('🔗 Making request to:', url);
    
    const response = await fetch(url, {
      method: httpMethod,
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📡 Printful API Response Status:', response.status);
    
    const data = await response.json();
    console.log('📦 Printful API Result Length:', data.result?.length || 0);
    
    const result = {
      statusCode: response.status,
      headers,
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
      headers,
      body: JSON.stringify({ error: 'Internal server error', details: error.message })
    };
  }
};

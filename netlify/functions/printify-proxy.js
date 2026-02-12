const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { path } = event;
  
  // Only allow specific endpoints
  if (!path.includes('/shops/') || (!path.includes('/products.json') && !path.includes('/products/'))) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Forbidden endpoint' })
    };
  }

  try {
    const response = await fetch(`https://api.printify.com/v1${path}`, {
      method: event.httpMethod,
      headers: {
        'Authorization': `Bearer ${process.env.PRINTIFY_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

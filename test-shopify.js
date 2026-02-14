// Test script to check Shopify API connection
console.log('Testing Shopify API connection...');

// Check environment variables
const storeUrl = process.env.SHOPIFY_STORE_URL || 'your-store.myshopify.com';
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'your-storefront-access-token';

console.log('Store URL:', storeUrl);
console.log('Access Token:', accessToken ? 'Set' : 'Not set');
console.log('Token length:', accessToken.length);

// Test API endpoint
const graphqlEndpoint = `https://${storeUrl}/api/2024-01/graphql.json`;
console.log('GraphQL Endpoint:', graphqlEndpoint);

// Simple test query
const testQuery = `
query {
  shop {
    name
  }
}
`;

fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
    },
    body: JSON.stringify({ query: testQuery })
})
.then(response => {
    console.log('Response status:', response.status);
    return response.json();
})
.then(data => {
    console.log('Response data:', data);
    if (data.errors) {
        console.error('API Errors:', data.errors);
    } else {
        console.log('✅ Shopify API connection successful!');
        console.log('Shop name:', data.data.shop.name);
    }
})
.catch(error => {
    console.error('❌ API Error:', error);
});

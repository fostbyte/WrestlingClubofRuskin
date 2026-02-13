const fetch = require('node-fetch');

exports.handler = async (event) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        // Get Printful API key from environment variables
        const apiKey = process.env.PRINTFUL_API_KEY;
        
        if (!apiKey) {
            console.error('PRINTFUL_API_KEY environment variable not set');
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    error: 'Printful API key not configured',
                    message: 'Please set PRINTFUL_API_KEY environment variable in Netlify'
                })
            };
        }

        // Fetch products from Printful API using your store ID
        const storeId = 17704955;
        console.log('Using store ID:', storeId);
        
        const response = await fetch('https://api.printful.com/store/products', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'X-PF-Store-Id': storeId.toString()
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Printful API error:', response.status, errorText);
            
            return {
                statusCode: response.status,
                headers,
                body: JSON.stringify({ 
                    error: 'Failed to fetch products from Printful',
                    status: response.status,
                    message: errorText
                })
            };
        }

        const data = await response.json();
        
        // Extract relevant product information
        const products = data.result || [];
        
        // Transform the data to match our frontend expectations
        const transformedProducts = products.map(product => ({
            id: product.id,
            name: product.name,
            thumbnail_url: product.thumbnail_url || product.image || null,
            variants: product.variants || [],
            description: product.description || '',
            created: product.created,
            updated: product.updated
        }));

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(transformedProducts)
        };

    } catch (error) {
        console.error('Error in printful-products function:', error);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Internal server error',
                message: error.message
            })
        };
    }
};

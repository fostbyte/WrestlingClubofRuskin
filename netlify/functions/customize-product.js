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

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Parse request body
        const { productId, productName, name, weightClass } = JSON.parse(event.body);

        // Validate required fields
        if (!productId || !productName || !name || !weightClass) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    error: 'Missing required fields: productId, productName, name, weightClass' 
                })
            };
        }

        // Get Printful API key from environment variables
        const apiKey = process.env.PRINTFUL_API_KEY;
        const storeId = 17704955; // Your store ID
        
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

        // Create a new order with the customized product
        const orderData = {
            external_id: `custom_${Date.now()}_${productId}`,
            shipping: 'STANDARD',
            recipient: {
                name: name,
                company: '',
                address1: 'Custom Order',
                address2: '',
                city: 'Ruskin',
                state_code: 'FL',
                country_code: 'US',
                zip: '33570',
                phone: '0000000000',
                email: 'customer@wrestlingclub.com'
            },
            items: [{
                external_id: `item_${Date.now()}`,
                quantity: 1,
                variant_id: productId, // This would need to be the actual variant ID
                files: [{
                    type: 'back',
                    url: null, // We'll create a text-based design
                    options: {
                        text: `${name}\n${weightClass} lbs`,
                        font_family: 'Arial',
                        font_size: 24,
                        text_color: '#FFFFFF',
                        text_align: 'center'
                    }
                }],
                options: {
                    custom_text: `${name} - ${weightClass} lbs`
                }
            }]
        };

        // For now, we'll simulate the customization by logging it
        // In a real implementation, you would:
        // 1. Create a print file with the custom text
        // 2. Create a new order with the customized variant
        // 3. Return the order confirmation
        
        console.log('Customization request:', {
            productId,
            productName,
            name,
            weightClass,
            timestamp: new Date().toISOString()
        });

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Return success response
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Customization applied successfully',
                orderDetails: {
                    customerName: name,
                    weightClass: weightClass,
                    product: productName,
                    customization: `${name} - ${weightClass} lbs`,
                    timestamp: new Date().toISOString()
                }
            })
        };

    } catch (error) {
        console.error('Error in customize-product function:', error);
        
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

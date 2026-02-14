// Shopify Storefront API Integration
class ShopifyAPI {
    constructor() {
        this.storeUrl = process.env.SHOPIFY_STORE_URL || 'your-store.myshopify.com';
        this.accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'your-storefront-access-token';
        this.apiVersion = process.env.SHOPIFY_API_VERSION || '2024-01';
        this.graphqlEndpoint = `https://${this.storeUrl}/api/${this.apiVersion}/graphql.json`;
    }

    // Fetch products from Shopify
    async fetchProducts() {
        const query = `
            query getProducts {
                products(first: 20) {
                    edges {
                        node {
                            id
                            title
                            description
                            handle
                            vendor
                            productType
                            tags
                            variants(first: 10) {
                                edges {
                                    node {
                                        id
                                        title
                                        sku
                                        price {
                                            amount
                                            currencyCode
                                        }
                                        availableForSale
                                        selectedOptions {
                                            name
                                            value
                                        }
                                    }
                                }
                            }
                            images(first: 5) {
                                edges {
                                    node {
                                        url
                                        altText
                                    }
                                }
                            }
                            priceRange {
                                minVariantPrice {
                                    amount
                                    currencyCode
                                }
                                maxVariantPrice {
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                }
            }
        `;

        try {
            const response = await fetch(this.graphqlEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': this.accessToken,
                },
                body: JSON.stringify({ query })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.data.products.edges.map(edge => edge.node);
        } catch (error) {
            console.error('Error fetching Shopify products:', error);
            return null;
        }
    }

    // Create a checkout with custom attributes for Ninjaprint
    async createCheckout(variantId, customizations = {}) {
        const mutation = `
            mutation checkoutCreate($input: CheckoutCreateInput!) {
                checkoutCreate(input: $input) {
                    checkout {
                        id
                        webUrl
                        customAttributes {
                            key
                            value
                        }
                    }
                    checkoutUserErrors {
                        field
                        message
                    }
                }
            }
        `;

        const customAttributes = [
            { key: '_customizer_name', value: customizations.name || '' },
            { key: '_customizer_weight_class', value: customizations.weightClass || '' },
            { key: '_ninjaprint_customization', value: 'true' }
        ];

        const variables = {
            input: {
                lineItems: [{
                    variantId: variantId,
                    quantity: 1,
                    customAttributes: customAttributes
                }],
                customAttributes: customAttributes
            }
        };

        try {
            const response = await fetch(this.graphqlEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': this.accessToken,
                },
                body: JSON.stringify({ query: mutation, variables })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.data.checkoutCreate.checkoutUserErrors.length > 0) {
                throw new Error(data.data.checkoutCreate.checkoutUserErrors[0].message);
            }

            return data.data.checkoutCreate.checkout;
        } catch (error) {
            console.error('Error creating Shopify checkout:', error);
            return null;
        }
    }

    // Convert Shopify product to our format
    formatProduct(product) {
        const firstImage = product.images.edges[0]?.node.url || 'https://via.placeholder.com/300x200?text=Product+Image';
        const firstVariant = product.variants.edges[0]?.node;
        const price = firstVariant ? `$${parseFloat(firstVariant.price.amount).toFixed(2)}` : 'Price TBD';
        
        return {
            id: product.id.split('/').pop(),
            name: product.title,
            description: product.description,
            thumbnail_url: firstImage,
            price: price,
            variants: product.variants.edges.map(edge => ({
                id: edge.node.id,
                title: edge.node.title,
                price: edge.node.price.amount,
                currency: edge.node.price.currencyCode,
                available: edge.node.availableForSale,
                checkout_url: null // Will be set when creating checkout
            })),
            tags: product.tags,
            vendor: product.vendor,
            handle: product.handle
        };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShopifyAPI;
} else {
    window.ShopifyAPI = ShopifyAPI;
}

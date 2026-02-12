interface PrintfulProduct {
  id: string
  name: string
  description: string
  price: number
  images: Array<{
    url: string
    thumbnail_url?: string
  }>
  variants: Array<{
    id: string
    name: string
    price: number
  }>
  retail_price: number
}

class PrintfulService {
  private baseUrl = import.meta.env.DEV ? 'https://api.printful.com' : '/.netlify/functions/printful-proxy'

  constructor() {}

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    let url: string
    let headers: HeadersInit
    
    if (import.meta.env.DEV) {
      url = `${this.baseUrl}${endpoint}`
      headers = {
        'Authorization': `Bearer ${import.meta.env.PRINTFUL_TOKEN}`,
        'Content-Type': 'application/json',
        ...options.headers,
      }
    } else {
      // Try different URL patterns for production
      const patterns = [
        `${this.baseUrl}${endpoint}`,
        `/.netlify/functions/printful-proxy${endpoint}`,
        `/api/printful-proxy${endpoint}`
      ]
      
      // Try the first pattern, but we could cycle through them if needed
      url = patterns[0]
      headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      }
    }
    
    console.log('🔍 Frontend Service Debug:');
    console.log('- Environment:', import.meta.env.DEV ? 'DEV' : 'PROD');
    console.log('- Base URL:', this.baseUrl);
    console.log('- Endpoint:', endpoint);
    console.log('- Full URL:', url);
    console.log('- Headers:', headers);

    const response = await fetch(url, {
      headers,
      ...options,
    })

    console.log('📡 Response Status:', response.status);
    console.log('📡 Response StatusText:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ Error Response Body:', errorText);
      throw new Error(`Printful API error: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('📦 Response Data:', data);
    
    // Handle Printful's response structure
    if (data.result) {
      console.log('✅ Returning data.result');
      return data.result
    }
    
    console.log('✅ Returning data directly');
    return data
  }

  async getShopProducts(): Promise<PrintfulProduct[]> {
    try {
      // Use the sync/products endpoint which shows your store's products
      const data = await this.makeRequest('/sync/products');
      
      if (!Array.isArray(data)) {
        console.log('Printful API response:', data);
        return [];
      }
      
      // Fetch detailed information for each product to get prices
      const productsWithDetails = await Promise.all(
        data.map(async (product: any) => {
          try {
            const productDetails = await this.getSingleProduct(product.id.toString());
            return productDetails || {
              id: product.id.toString(),
              name: product.name,
              description: `Product with ${product.variants || 0} variants`,
              price: 0,
              images: product.thumbnail_url ? [{
                url: product.thumbnail_url,
                thumbnail_url: product.thumbnail_url
              }] : [],
              variants: [],
              retail_price: 0
            };
          } catch (error) {
            console.error(`Error fetching details for product ${product.id}:`, error);
            return {
              id: product.id.toString(),
              name: product.name,
              description: `Product with ${product.variants || 0} variants`,
              price: 0,
              images: product.thumbnail_url ? [{
                url: product.thumbnail_url,
                thumbnail_url: product.thumbnail_url
              }] : [],
              variants: [],
              retail_price: 0
            };
          }
        })
      );
      
      return productsWithDetails;
    } catch (error) {
      console.error('Error fetching Printful products:', error);
      return [];
    }
  }

  async getSingleProduct(productId: string): Promise<PrintfulProduct | null> {
    try {
      const data = await this.makeRequest(`/sync/products/${productId}`)
      
      // Printful returns sync_product and sync_variants
      const syncProduct = data.sync_product || {};
      const syncVariants = data.sync_variants || [];
      
      // Get price from the first variant
      const price = syncVariants.length > 0 ? parseFloat(syncVariants[0].retail_price) || 0 : 0;
      
      return {
        id: syncProduct.id.toString(),
        name: syncProduct.name,
        description: `Product with ${syncProduct.variants || 0} variants`,
        price: price,
        images: syncProduct.thumbnail_url ? [{
          url: syncProduct.thumbnail_url,
          thumbnail_url: syncProduct.thumbnail_url
        }] : [],
        variants: syncVariants.map((variant: any) => ({
          id: variant.id.toString(),
          name: variant.name,
          price: parseFloat(variant.retail_price) || 0
        })),
        retail_price: price
      }
    } catch (error) {
      console.error('Error fetching Printful product:', error)
      return null
    }
  }
}

export const printfulService = new PrintfulService()

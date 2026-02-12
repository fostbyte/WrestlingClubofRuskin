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
    const url = import.meta.env.DEV 
      ? `${this.baseUrl}${endpoint}`
      : `${this.baseUrl}${endpoint}`
    
    const headers = import.meta.env.DEV
      ? {
          'Authorization': `Bearer ${import.meta.env.VITE_PRINTFUL_TOKEN}`,
          'Content-Type': 'application/json',
          ...options.headers,
        }
      : {
          'Content-Type': 'application/json',
          ...options.headers,
        }

    const response = await fetch(url, {
      headers,
      ...options,
    })

    if (!response.ok) {
      throw new Error(`Printful API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Handle Printful's response structure
    if (data.result) {
      return data.result
    }
    
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
      
      return data.map((product: any) => ({
        id: product.id.toString(),
        name: product.name,
        description: product.description?.substring(0, 200) + '...' || 'No description available',
        price: product.retail_price || 0,
        images: product.image_url ? [{
          url: product.image_url,
          thumbnail_url: product.thumbnail_url
        }] : product.files?.filter((file: any) => file.type === 'preview').map((file: any) => ({
          url: file.preview_url,
          thumbnail_url: file.thumbnail_url
        })) || [],
        variants: product.variants || [],
        retail_price: product.retail_price || 0
      }));
    } catch (error) {
      console.error('Error fetching Printful products:', error);
      return [];
    }
  }

  async getSingleProduct(productId: string): Promise<PrintfulProduct | null> {
    try {
      const data = await this.makeRequest(`/store/products/${productId}`)
      return {
        id: data.id.toString(),
        name: data.name,
        description: data.description?.substring(0, 200) + '...' || 'No description available',
        price: data.retail_price || 0,
        images: data.image_url ? [{
          url: data.image_url,
          thumbnail_url: data.thumbnail_url
        }] : [],
        variants: data.variants || [],
        retail_price: data.retail_price || 0
      }
    } catch (error) {
      console.error('Error fetching Printful product:', error)
      return null
    }
  }
}

export const printfulService = new PrintfulService()

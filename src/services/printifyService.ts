interface PrintifyProduct {
  id: string
  title: string
  description: string
  price: number
  images: Array<{
    src: string
    alt: string
  }>
  variants: Array<{
    id: string
    title: string
    price: number
  }>
  shop_url: string
}

class PrintifyService {
  private baseUrl = import.meta.env.DEV ? 'https://api.printify.com/v1' : '/.netlify/functions/printify-proxy'

  constructor() {}

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = import.meta.env.DEV 
      ? `${this.baseUrl}${endpoint}`
      : `${this.baseUrl}${endpoint}`
    
    const headers = import.meta.env.DEV
      ? {
          'Authorization': `Bearer ${import.meta.env.VITE_PRINTIFY_TOKEN}`,
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
      throw new Error(`Printify API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Handle the paginated response structure from Printify API
    if (data.data && Array.isArray(data.data)) {
      return data.data
    }
    
    return data
  }

  async getShopProducts(): Promise<PrintifyProduct[]> {
    try {
      const shopId = import.meta.env.VITE_PRINTIFY_SHOP_ID || ''
      const data = await this.makeRequest(`/shops/${shopId}/products.json`)
      return data.map((product: any) => ({
        id: product.id,
        title: product.title,
        description: product.description?.substring(0, 200) + '...' || 'No description available',
        price: (product.variants[0]?.price || 0) / 100, // Convert from cents to dollars
        images: product.images.map((img: any) => ({
          src: img.src,
          alt: img.alt || product.title,
        })),
        variants: product.variants,
        shop_url: `https://printify.com/products/${product.id}`,
      }))
    } catch (error) {
      console.error('Error fetching Printify products:', error)
      return []
    }
  }

  async getSingleProduct(productId: string): Promise<PrintifyProduct | null> {
    try {
      const shopId = import.meta.env.VITE_PRINTIFY_SHOP_ID || ''
      const data = await this.makeRequest(`/shops/${shopId}/products/${productId}.json`)
      return {
        id: data.id,
        title: data.title,
        description: data.description?.substring(0, 200) + '...' || 'No description available',
        price: (data.variants[0]?.price || 0) / 100, // Convert from cents to dollars
        images: data.images.map((img: any) => ({
          src: img.src,
          alt: img.alt || data.title,
        })),
        variants: data.variants,
        shop_url: `https://printify.com/products/${data.id}`,
      }
    } catch (error) {
      console.error('Error fetching Printify product:', error)
      return null
    }
  }
}

export const printifyService = new PrintifyService()

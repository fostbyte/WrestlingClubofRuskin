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
  private baseUrl = '/.netlify/functions/printify-proxy'

  constructor() {}

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`Printify API error: ${response.statusText}`)
    }

    return response.json()
  }

  async getShopProducts(): Promise<PrintifyProduct[]> {
    try {
      const shopId = import.meta.env.VITE_PRINTIFY_SHOP_ID || ''
      const data = await this.makeRequest(`/shops/${shopId}/products.json`)
      return data.map((product: any) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.variants[0]?.price || 0,
        images: product.images.map((img: any) => ({
          src: img.src,
          alt: img.alt || product.title,
        })),
        variants: product.variants,
        shop_url: product.shop_url,
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
        description: data.description,
        price: data.variants[0]?.price || 0,
        images: data.images.map((img: any) => ({
          src: img.src,
          alt: img.alt || data.title,
        })),
        variants: data.variants,
        shop_url: data.shop_url,
      }
    } catch (error) {
      console.error('Error fetching Printify product:', error)
      return null
    }
  }
}

export const printifyService = new PrintifyService()

import React, { useState, useEffect } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { ShoppingCartIcon, StarIcon, TrophyIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { printifyService } from '../services/printifyService'

interface PrintifyProduct {
  id: string
  title: string
  price: number
  images: Array<{ src: string; alt: string }>
  description: string
  shop_url: string
}

const PrintifyShop: React.FC = () => {
  const [products, setProducts] = useState<PrintifyProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const fetchedProducts = await printifyService.getShopProducts()
        
        if (fetchedProducts.length === 0) {
          // Fallback to mock data if no products found
          const mockProducts: PrintifyProduct[] = [
            {
              id: '1',
              title: 'WCR Championship Tee',
              price: 24.99,
              images: [{ src: 'https://via.placeholder.com/400x500/4A1D96/FFFFFF?text=WCR+Champ+Tee', alt: 'WCR Championship Tee' }],
              description: 'Premium cotton t-shirt with championship design',
              shop_url: 'https://your-printify-store.com/product/1'
            },
            {
              id: '2',
              title: 'WCR Elite Hoodie',
              price: 44.99,
              images: [{ src: 'https://via.placeholder.com/400x500/6B46C1/FFFFFF?text=WCR+Elite+Hoodie', alt: 'WCR Elite Hoodie' }],
              description: 'Comfortable hoodie with elite wrestler branding',
              shop_url: 'https://your-printify-store.com/product/2'
            },
            {
              id: '3',
              title: 'WCR Gold Medal Singlet',
              price: 34.99,
              images: [{ src: 'https://via.placeholder.com/400x500/FFD700/000000?text=WCR+Singlet', alt: 'WCR Gold Medal Singlet' }],
              description: 'Competition-grade wrestling singlet',
              shop_url: 'https://your-printify-store.com/product/3'
            }
          ]
          setProducts(mockProducts)
        } else {
          setProducts(fetchedProducts)
        }
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  }

  const renderStars = (rating: number = 4.8) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIconSolid key={i} className="w-4 h-4 text-wcr-gold" />)
    }
    if (hasHalfStar) {
      stars.push(<StarIconSolid key="half" className="w-4 h-4 text-wcr-gold" />)
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<StarIcon key={i} className="w-4 h-4 text-wcr-gold" />)
    }
    return stars
  }

  const handleAddToCart = (product: PrintifyProduct) => {
    // Open Printify product page in new tab
    window.open(product.shop_url, '_blank')
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-wcr-black to-wcr-purple/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center mb-6">
              <TrophyIcon className="w-12 h-12 text-wcr-gold mr-3" />
              <h2 className="text-4xl md:text-5xl font-black text-white">WCR Merchandise</h2>
            </div>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wcr-gold"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-wcr-black to-wcr-purple/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center mb-6">
              <TrophyIcon className="w-12 h-12 text-wcr-gold mr-3" />
              <h2 className="text-4xl md:text-5xl font-black text-white">WCR Merchandise</h2>
            </div>
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-wcr-black to-wcr-purple/20 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 215, 0, 0.1) 35px, rgba(255, 215, 0, 0.1) 70px)`
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <TrophyIcon className="w-12 h-12 text-wcr-gold mr-3" />
            <h2 className="text-4xl md:text-5xl font-black text-white">WCR Merchandise</h2>
          </div>
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-wcr-gold w-20"></div>
            <div className="w-3 h-3 bg-wcr-gold rounded-full mx-4"></div>
            <div className="h-px bg-wcr-gold w-20"></div>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto font-medium leading-relaxed">
            Support the club by purchasing our official <span className="text-wcr-gold font-bold">championship apparel</span>. 
            All items are processed through Printify with secure payment handling worldwide.
          </p>
        </div>

        <div className="relative">
          <Slider {...sliderSettings}>
            {products.map((product) => (
              <div key={product.id} className="px-4">
                <div className="bg-wcr-black/80 backdrop-blur-sm border border-wcr-gold/30 rounded-xl overflow-hidden hover:border-wcr-gold transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-wcr-gold/20">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-wcr-purple/10">
                    <img
                      src={product.images[0]?.src || 'https://via.placeholder.com/400x500/4A1D96/FFFFFF?text=WCR+Product'}
                      alt={product.images[0]?.alt || product.title}
                      className="w-full h-80 object-cover object-center hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black text-white mb-2">{product.title}</h3>
                    <p className="text-sm text-gray-300 mb-4">{product.description}</p>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {renderStars()}
                      </div>
                      <span className="ml-2 text-sm text-gray-400">
                        (127 reviews)
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-black text-wcr-gold">${product.price}</span>
                      <div className="bg-wcr-gold/20 px-3 py-1 rounded-full">
                        <span className="text-xs text-wcr-gold font-bold">OFFICIAL GEAR</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-wcr-gold text-wcr-black py-3 px-4 rounded-full font-black hover:bg-yellow-400 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-wcr-gold/25 transform hover:scale-105"
                    >
                      <ShoppingCartIcon className="w-5 h-5" />
                      VIEW & PURCHASE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="text-center mt-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-wcr-gold w-20"></div>
            <div className="w-3 h-3 bg-wcr-gold rounded-full mx-4"></div>
            <div className="h-px bg-wcr-gold w-20"></div>
          </div>
          <p className="text-sm text-gray-400 mb-6 font-medium">
            Powered by Printify - Secure payment processing worldwide
          </p>
          <button
            onClick={() => window.open('https://your-printify-store.com', '_blank')}
            className="btn btn-outline border-2 border-wcr-gold text-wcr-gold hover:bg-wcr-gold hover:text-wcr-black px-8 py-3 font-bold rounded-full transition-all duration-300 transform hover:scale-105"
          >
            VIEW FULL STORE →
          </button>
        </div>
      </div>
    </section>
  )
}

export default PrintifyShop

import { useRef } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaInstagram } from 'react-icons/fa';

// Sample images - in a real app, these would be fetched from Instagram API
const instagramImages = [
  { id: 1, url: 'https://source.unsplash.com/random/800x800/?wrestling,1', alt: 'Wrestling practice' },
  { id: 2, url: 'https://source.unsplash.com/random/800x800/?wrestling,2', alt: 'Team huddle' },
  { id: 3, url: 'https://source.unsplash.com/random/800x800/?wrestling,3', alt: 'Match action' },
  { id: 4, url: 'https://source.unsplash.com/random/800x800/?wrestling,4', alt: 'Training session' },
  { id: 5, url: 'https://source.unsplash.com/random/800x800/?wrestling,5', alt: 'Team celebration' },
  { id: 6, url: 'https://source.unsplash.com/random/800x800/?wrestling,6', alt: 'Wrestling tournament' },
];

export default function Gallery() {
  const sliderRef = useRef<Slider>(null);

  const settings = {
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
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check out the latest moments from our wrestling club. Follow us on Instagram for more updates!
          </p>
          <a 
            href="https://www.instagram.com/lennardwrestlin/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 text-primary font-medium hover:underline"
          >
            <FaInstagram className="mr-2" /> @lennardwrestlin
          </a>
        </motion.div>

        <div className="relative">
          <button 
            onClick={() => sliderRef.current?.slickPrev()}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-primary hover:bg-gray-100 transition-colors"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          
          <Slider ref={sliderRef} {...settings} className="px-4">
            {instagramImages.map((image) => (
              <div key={image.id} className="px-2">
                <div className="relative group overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a 
                      href={image.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white p-3 bg-primary rounded-full hover:bg-primary-light transition-colors"
                      aria-label="View full size"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          
          <button 
            onClick={() => sliderRef.current?.slickNext()}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-primary hover:bg-gray-100 transition-colors"
            aria-label="Next slide"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://www.instagram.com/lennardwrestlin/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FaInstagram className="mr-2" /> Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

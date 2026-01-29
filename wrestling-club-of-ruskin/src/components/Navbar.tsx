import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">Littlehorns</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="#about" className="text-white hover:text-gray-200 transition-colors">
              About Us
            </Link>
            <Link to="#gallery" className="text-white hover:text-gray-200 transition-colors">
              Gallery
            </Link>
            <Link to="#donate" className="text-white hover:text-gray-200 transition-colors">
              Donate
            </Link>
            <Link to="#contact" className="text-white hover:text-gray-200 transition-colors">
              Contact
            </Link>
            
            <div className="flex space-x-4 ml-4">
              <a 
                href="https://www.instagram.com/lennardwrestlin/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61554099817849" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
            </div>
            
            <a 
              href="#donate" 
              className="ml-4 px-6 py-2 bg-white text-primary rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Donate Now
            </a>
          </div>
          
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

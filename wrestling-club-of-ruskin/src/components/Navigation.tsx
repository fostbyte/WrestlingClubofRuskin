import React from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

interface NavigationProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

const Navigation: React.FC<NavigationProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <nav className="fixed top-0 w-full bg-wcr-black/95 backdrop-blur-md z-50 shadow-xl border-b border-wcr-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-wcr-gold rounded-full flex items-center justify-center">
                <span className="text-wcr-black font-bold text-sm">WCR</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">WCR</h1>
                <p className="text-xs text-wcr-gold">Wrestling Club of Ruskin</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <a href="#home" className="text-gray-300 hover:text-wcr-gold hover:bg-wcr-purple/20 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200">Home</a>
              <a href="#about" className="text-gray-300 hover:text-wcr-gold hover:bg-wcr-purple/20 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200">About</a>
              <a href="#shop" className="text-wcr-gold bg-wcr-purple/30 px-4 py-2 rounded-lg text-sm font-semibold border border-wcr-gold/30">Shop</a>
              <a href="#programs" className="text-gray-300 hover:text-wcr-gold hover:bg-wcr-purple/20 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200">Programs</a>
              <a href="#schedule" className="text-gray-300 hover:text-wcr-gold hover:bg-wcr-purple/20 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200">Schedule</a>
              <a href="#contact" className="text-gray-300 hover:text-wcr-gold hover:bg-wcr-purple/20 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200">Contact</a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-wcr-gold p-2 rounded-lg hover:bg-wcr-purple/20 transition-all duration-200"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-wcr-black border-t border-wcr-gold/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="text-gray-300 hover:text-wcr-gold hover:bg-wcr-purple/20 block px-3 py-2 rounded-lg text-base font-semibold transition-all duration-200">Home</a>
            <a href="#about" className="text-gray-300 hover:text-wcr-gold hover:bg-wcr-purple/20 block px-3 py-2 rounded-lg text-base font-semibold transition-all duration-200">About</a>
            <a href="#shop" className="text-wcr-gold bg-wcr-purple/30 block px-3 py-2 rounded-lg text-base font-semibold border border-wcr-gold/30">Shop</a>
            <a href="#programs" className="text-gray-300 hover:text-wcr-gold hover:bg-wcr-purple/20 block px-3 py-2 rounded-lg text-base font-semibold transition-all duration-200">Programs</a>
            <a href="#schedule" className="text-gray-300 hover:text-wcr-gold hover:bg-wcr-purple/20 block px-3 py-2 rounded-lg text-base font-semibold transition-all duration-200">Schedule</a>
            <a href="#contact" className="text-gray-300 hover:text-wcr-gold hover:bg-wcr-purple/20 block px-3 py-2 rounded-lg text-base font-semibold transition-all duration-200">Contact</a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation

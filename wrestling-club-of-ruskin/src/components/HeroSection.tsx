import React from 'react'
import { ChevronDownIcon, FireIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-wcr-black via-wcr-purple to-wcr-black overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 215, 0, 0.1) 35px, rgba(255, 215, 0, 0.1) 70px)`
        }}></div>
      </div>
      
      {/* Wrestling mat effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-wcr-purple/20 via-transparent to-wcr-purple/20"></div>
      
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Champion badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-wcr-gold text-wcr-black px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
            <StarIcon className="w-5 h-5" />
            <span className="font-bold text-sm">CHAMPION WRESTLING CLUB</span>
            <StarIcon className="w-5 h-5" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
          <span className="block text-white">Wrestling</span>
          <span className="block text-wcr-gold">Club of Ruskin</span>
        </h1>
        
        <div className="flex items-center justify-center mb-8 space-x-4">
          <div className="h-px bg-wcr-gold w-20"></div>
          <FireIcon className="w-8 h-8 text-wcr-gold" />
          <div className="h-px bg-wcr-gold w-20"></div>
        </div>
        
        <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-4xl mx-auto text-gray-200 font-medium leading-relaxed">
          Building <span className="text-wcr-gold font-bold">champions</span> on and off the mat. 
          Join our elite youth wrestling program with <span className="text-wcr-gold font-bold">championship-level coaching</span> 
          and a tradition of excellence.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <button className="btn btn-primary bg-wcr-gold text-wcr-black hover:bg-yellow-400 px-10 py-4 text-lg font-black rounded-full shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105 border-2 border-wcr-gold">
            JOIN THE TEAM
          </button>
          <button className="btn btn-outline border-2 border-wcr-gold text-wcr-gold hover:bg-wcr-gold hover:text-wcr-black px-10 py-4 text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-105">
            LEARN MORE
          </button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-wcr-gold mb-2">50+</div>
            <div className="text-sm text-gray-300 font-semibold">CHAMPIONSHIP WINS</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-wcr-gold mb-2">15+</div>
            <div className="text-sm text-gray-300 font-semibold">YEARS EXCELLENCE</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-wcr-gold mb-2">100+</div>
            <div className="text-sm text-gray-300 font-semibold">YOUTH ATHLETES</div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-wcr-gold animate-bounce">
        <ChevronDownIcon className="w-8 h-8" />
      </div>
    </section>
  )
}

export default HeroSection

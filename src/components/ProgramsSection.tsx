import React from 'react'
import { SparklesIcon, FireIcon, TrophyIcon } from '@heroicons/react/24/outline'

const ProgramsSection: React.FC = () => {
  return (
    <section id="programs" className="py-20 bg-gradient-to-br from-wcr-black to-wcr-purple/10 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 215, 0, 0.1) 35px, rgba(255, 215, 0, 0.1) 70px)`
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Our Programs</h2>
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-wcr-gold w-20"></div>
            <div className="w-3 h-3 bg-wcr-gold rounded-full mx-4"></div>
            <div className="h-px bg-wcr-gold w-20"></div>
          </div>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto font-medium leading-relaxed">
            We offer <span className="text-wcr-gold font-bold">championship-level programs</span> for all ages and skill levels, 
            from beginners to advanced competitors.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-wcr-black/80 backdrop-blur-sm p-8 rounded-2xl border border-wcr-gold/30 hover:border-wcr-gold transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-wcr-gold/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-wcr-gold rounded-full flex items-center justify-center mr-4">
                <SparklesIcon className="w-6 h-6 text-wcr-black" />
              </div>
              <h3 className="text-2xl font-black text-wcr-gold">Youth Wrestling</h3>
            </div>
            <p className="text-gray-200 mb-6 font-medium">Ages 6-12. Focus on fundamentals, fun, and character development.</p>
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-wcr-gold rounded-full mr-3"></div>
                Basic techniques & positions
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-wcr-gold rounded-full mr-3"></div>
                Physical fitness & coordination
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-wcr-gold rounded-full mr-3"></div>
                Sportsmanship & teamwork
              </li>
            </ul>
          </div>
          
          <div className="bg-wcr-purple/90 backdrop-blur-sm p-8 rounded-2xl border border-wcr-gold/30 hover:border-wcr-gold transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-wcr-purple/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-wcr-gold rounded-full flex items-center justify-center mr-4">
                <FireIcon className="w-6 h-6 text-wcr-black" />
              </div>
              <h3 className="text-2xl font-black text-wcr-gold">Middle School</h3>
            </div>
            <p className="text-gray-100 mb-6 font-medium">Ages 12-14. Advanced techniques and competition preparation.</p>
            <ul className="text-gray-200 space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-wcr-gold rounded-full mr-3"></div>
                Advanced moves & combinations
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-wcr-gold rounded-full mr-3"></div>
                Competition strategy & mental prep
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-wcr-gold rounded-full mr-3"></div>
                Strength & conditioning
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-wcr-gold to-yellow-400 p-8 rounded-2xl border border-wcr-black/20 hover:border-wcr-black transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-wcr-gold/25">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-wcr-black rounded-full flex items-center justify-center mr-4">
                <TrophyIcon className="w-6 h-6 text-wcr-gold" />
              </div>
              <h3 className="text-2xl font-black text-wcr-black">High School</h3>
            </div>
            <p className="text-wcr-black/90 mb-6 font-medium">Ages 14-18. Elite training for serious competitors.</p>
            <ul className="text-wcr-black/80 space-y-3">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-wcr-black rounded-full mr-3"></div>
                Elite techniques & counter-attacks
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-wcr-black rounded-full mr-3"></div>
                Tournament preparation & travel
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-wcr-black rounded-full mr-3"></div>
                College recruitment guidance
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProgramsSection

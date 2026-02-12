import React from 'react'
import { UserGroupIcon, TrophyIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(74, 29, 150, 0.1) 35px, rgba(74, 29, 150, 0.1) 70px)`
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-wcr-black mb-6">About Our Club</h2>
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-wcr-purple w-20"></div>
            <div className="w-3 h-3 bg-wcr-gold rounded-full mx-4"></div>
            <div className="h-px bg-wcr-purple w-20"></div>
          </div>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
            We're committed to developing <span className="text-wcr-purple font-bold">champions</span> of all ages and skill levels 
            in a supportive, competitive environment that builds <span className="text-wcr-gold font-bold">character</span> on and off the mat.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center group">
            <div className="w-24 h-24 bg-wcr-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-wcr-purple-dark transition-all duration-300 transform group-hover:scale-110 shadow-lg group-hover:shadow-wcr-purple/25">
              <AcademicCapIcon className="w-12 h-12 text-wcr-gold" />
            </div>
            <h3 className="text-2xl font-black text-wcr-black mb-3">15+ Years</h3>
            <p className="text-gray-600 font-medium leading-relaxed">Serving the Ruskin community with championship-level wrestling programs and expert coaching</p>
          </div>
          
          <div className="text-center group">
            <div className="w-24 h-24 bg-wcr-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-400 transition-all duration-300 transform group-hover:scale-110 shadow-lg group-hover:shadow-wcr-gold/25">
              <UserGroupIcon className="w-12 h-12 text-wcr-black" />
            </div>
            <h3 className="text-2xl font-black text-wcr-black mb-3">100+ Athletes</h3>
            <p className="text-gray-600 font-medium leading-relaxed">Building character, discipline, and mental toughness through the sport of wrestling</p>
          </div>
          
          <div className="text-center group">
            <div className="w-24 h-24 bg-wcr-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-800 transition-all duration-300 transform group-hover:scale-110 shadow-lg group-hover:shadow-wcr-black/25">
              <TrophyIcon className="w-12 h-12 text-wcr-gold" />
            </div>
            <h3 className="text-2xl font-black text-wcr-black mb-3">Expert Coaches</h3>
            <p className="text-gray-600 font-medium leading-relaxed">Dedicated coaches with years of competitive wrestling and coaching experience</p>
          </div>
        </div>
        
        {/* Mission statement */}
        <div className="bg-gradient-to-r from-wcr-purple to-wcr-purple-dark rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 215, 0, 0.2) 35px, rgba(255, 215, 0, 0.2) 70px)`
            }}></div>
          </div>
          <div className="relative z-10 text-center">
            <h3 className="text-3xl md:text-4xl font-black mb-6 text-wcr-gold">Our Mission</h3>
            <p className="text-lg md:text-xl font-medium leading-relaxed max-w-4xl mx-auto text-gray-100">
              To empower young athletes through the discipline of wrestling, fostering <span className="text-wcr-gold font-bold">leadership</span>, 
              <span className="text-wcr-gold font-bold"> resilience</span>, and <span className="text-wcr-gold font-bold">sportsmanship</span> that extends beyond the mat into all aspects of life.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

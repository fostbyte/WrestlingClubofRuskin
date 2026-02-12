import { useState } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import PrintifyShop from './components/PrintifyShop'
import ProgramsSection from './components/ProgramsSection'
import ContactSection from './components/ContactSection'
import FooterSection from './components/FooterSection'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <HeroSection />
      <AboutSection />
      <section id="shop">
        <PrintifyShop />
      </section>
      <ProgramsSection />
      <ContactSection />
      <FooterSection />
    </div>
  )
}

export default App

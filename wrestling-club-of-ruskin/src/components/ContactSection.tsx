import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Ready to join the Wrestling Club of Ruskin? Contact us today to learn more about our programs.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <PhoneIcon className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p>(555) 123-4567</p>
          </div>
          <div className="text-center">
            <EnvelopeIcon className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p>info@ruskinwrestling.com</p>
          </div>
          <div className="text-center">
            <MapPinIcon className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p>123 Main St, Ruskin, FL 33570</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

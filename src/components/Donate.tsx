import { motion } from 'framer-motion';
import { FaDonate, FaTshirt, FaMedal, FaDumbbell } from 'react-icons/fa';

export default function Donate() {
  return (
    <section id="donate" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Support Our Club</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your generous donations help us provide quality training, equipment, and opportunities for our young wrestlers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10"
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaDonate className="text-2xl text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">One-Time Donation</h3>
            <p className="text-white/80 mb-6">
              Make a one-time contribution to support our wrestling program and help us continue our mission.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[25, 50, 100, 250].map((amount) => (
                <button 
                  key={amount}
                  className="py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors"
                >
                  ${amount}
                </button>
              ))}
              <input 
                type="number" 
                placeholder="Other" 
                className="py-2 px-4 bg-white/10 rounded-lg placeholder-white/50 text-center"
              />
            </div>
            <button className="w-full py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Donate Now
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 relative overflow-hidden"
          >
            <div className="absolute -top-3 right-4 bg-yellow-400 text-primary text-xs font-bold px-3 py-1 rounded-full">
              POPULAR
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaTshirt className="text-2xl text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Sponsor an Athlete</h3>
            <p className="text-white/80 mb-6">
              Cover the costs for a wrestler's equipment, uniforms, and tournament fees for a full season.
            </p>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/80">Cost per athlete:</span>
                <span className="text-xl font-bold">$500</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2.5 mb-4">
                <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-sm text-white/60">
                13 of 20 athlete sponsorships filled this season
              </p>
            </div>
            <button className="w-full py-3 bg-yellow-400 text-primary font-semibold rounded-lg hover:bg-yellow-300 transition-colors">
              Sponsor an Athlete
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10"
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaDumbbell className="text-2xl text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Equipment Donation</h3>
            <p className="text-white/80 mb-6">
              Donate new or gently used wrestling equipment to help our athletes train and compete.
            </p>
            <ul className="text-left mb-6 space-y-2 text-white/80">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Wrestling shoes
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Headgear
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Singlets
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Knee pads
              </li>
            </ul>
            <button className="w-full py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors">
              Contact About Donations
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-white/10 backdrop-blur-sm p-8 rounded-xl max-w-4xl mx-auto text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Become a Corporate Sponsor</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Join local businesses that support youth wrestling in our community. Corporate sponsors receive recognition on our website, social media, and at events.
          </p>
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-primary bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
            <FaMedal className="mr-2" /> Learn About Sponsorship
          </button>
        </motion.div>
      </div>
    </section>
  );
}

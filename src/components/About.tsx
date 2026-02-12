import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            About the Wrestling Club of Ruskin
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 space-y-6"
          >
            <p>
              Welcome to the Wrestling Club of Ruskin, home of the <span className="text-primary font-semibold">Littlehorns</span>! 
              We are a non-profit organization dedicated to fostering the growth and development of young athletes in Ruskin, Florida 
              through the sport of wrestling.
            </p>
            
            <p>
              Our mission is to provide a safe, supportive, and competitive environment where student-athletes can learn the fundamentals 
              of wrestling while developing important life skills such as discipline, perseverance, and teamwork.
            </p>
            
            <p>
              Whether you're new to the sport or an experienced wrestler, our club offers programs for all skill levels. 
              Our experienced coaches are committed to helping each athlete reach their full potential both on and off the mat.
            </p>
            
            <div className="mt-10 grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-gray-600">Active Members</div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-gray-600">Certified Coaches</div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
            </div>
            
            <div className="mt-12">
              <a 
                href="#contact" 
                className="inline-block bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-light transition-colors"
              >
                Join Our Club Today
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

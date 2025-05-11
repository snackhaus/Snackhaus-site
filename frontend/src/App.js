import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./App.css";

// Import Hero Icons
import { ArrowRightIcon, ArrowSmallDownIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

// Logo import - we'll use it as a component
const SnackhausLogo = () => (
  <div className="flex items-center">
    <div className="flex items-center">
      <svg width="44" height="44" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
        <path d="M60 20L20 45V95L60 120L100 95V45L60 20Z" fill="none" stroke="#F3CC6D" strokeWidth="5"/>
        <path d="M45 55V85L60 95L75 85V55L60 45L45 55Z" fill="none" stroke="#F3CC6D" strokeWidth="5"/>
      </svg>
      <span className="text-primary font-display text-2xl md:text-3xl font-bold ml-2">snackhaus</span>
    </div>
  </div>
);

// Animated Section Component
const AnimatedSection = ({ children, id, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// Step Card Component
const StepCard = ({ number, title, description, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      className="glass-card p-6 md:p-8 flex flex-col items-start"
    >
      <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-secondary-dark font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl md:text-2xl mb-3">{title}</h3>
      <p className="text-neutral-800">{description}</p>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      className="p-4"
    >
      <div className="bg-secondary-light p-3 rounded-lg inline-flex mb-4">
        {icon}
      </div>
      <h3 className="text-xl mb-2">{title}</h3>
      <p className="text-neutral-800">{description}</p>
    </motion.div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ quote, name, position, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      className="glass-card p-6 rounded-xl"
    >
      <div className="text-primary text-4xl mb-4">"</div>
      <p className="text-neutral-800 mb-4">{quote}</p>
      <div className="font-bold">{name}</div>
      <div className="text-neutral-800 text-sm">{position}</div>
    </motion.div>
  );
};

// Main App Component
function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    businessName: "",
    email: "",
    location: "",
    spaceType: "",
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    
    if (!formData.businessName.trim()) {
      errors.businessName = "Business name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    
    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }
    
    if (!formData.spaceType.trim()) {
      errors.spaceType = "Space type is required";
    }
    
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        console.log("Form submitted:", formData);
        setIsSubmitting(false);
        setFormSuccess(true);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setFormSuccess(false);
          setFormData({
            firstName: "",
            businessName: "",
            email: "",
            location: "",
            spaceType: "",
          });
        }, 5000);
      }, 1500);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="App text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent py-6">
        <div className="container-custom flex justify-between items-center">
          <SnackhausLogo />
          <div className="hidden md:flex gap-8">
            <a href="#how-it-works" className="text-white hover:text-primary transition-colors font-medium">
              How It Works
            </a>
            <a href="#why-snackhaus" className="text-white hover:text-primary transition-colors font-medium">
              Our Coolers
            </a>
            <a href="#" className="text-white hover:text-primary transition-colors font-medium">
              FAQ
            </a>
            <a href="#get-started" className="text-white hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </div>
          <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Full-screen background image */}
        <div className="absolute inset-0">
          <img 
            src="https://iili.io/3vMYhBI.jpg" 
            alt="Snackhaus Smart Cooler" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        
        {/* Content overlay */}
        <div className="relative h-full container-custom flex items-center pt-20 md:pt-0">
          <div className="md:grid md:grid-cols-12 w-full">
            <div className="md:col-span-7"></div> {/* Increased empty space to push content further right */}
            <div className="md:col-span-5 text-white px-4 md:px-0">
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Fuel better
                <br />
                wherever you are
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl mb-8 text-white/90 max-w-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Premium smart coolers stocked with functional snacks and drinks. We handle everything—you just host.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <a href="#get-started" className="btn-primary rounded-md px-6 py-3 flex items-center">
                  Get a Cooler <ArrowRightIcon className="w-5 h-5 ml-2" />
                </a>
                <a href="#how-it-works" className="btn-secondary rounded-md px-6 py-3 flex items-center">
                  How It Works <ArrowSmallDownIcon className="w-5 h-5 ml-2" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <AnimatedSection id="how-it-works" className="section-padding bg-neutral-100 text-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">How It Works</h2>
            <p className="text-xl text-neutral-800 max-w-2xl mx-auto">
              Three simple steps to boost your revenue with zero hassle
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number="1" 
              title="We Place It" 
              description="You get a sleek, branded smart fridge delivered, stocked, and ready to go."
              delay={0.2}
            />
            <StepCard 
              number="2" 
              title="We Stock It" 
              description="Curated protein shakes, bars, coconut waters and more—always fresh, always premium."
              delay={0.4}
            />
            <StepCard 
              number="3" 
              title="You Earn" 
              description="You get a share of the revenue. Zero upfront costs, zero effort."
              delay={0.6}
            />
          </div>
          
          <div className="mt-16 text-center">
            <a href="#get-started" className="btn-primary">
              Get Started Now <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* Why Snackhaus Section */}
      <AnimatedSection id="why-snackhaus" className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">Why Snackhaus</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Smart coolers, premium snacks, and a hassle-free experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="relative">
              <motion.div
                className="relative rounded-2xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src="https://iili.io/3vMYhBI.jpg" 
                  alt="Premium healthy snacks" 
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </motion.div>
            </div>
            
            <div>
              <h3 className="text-3xl mb-6">Smart Coolers, Smarter Snacks</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-lg">AI-powered, contactless checkout</p>
                    <p className="text-white/70">Our smart technology means seamless transactions for customers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-lg">No staffing needed</p>
                    <p className="text-white/70">The coolers run autonomously with our automated monitoring system.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-lg">Weight sensors and cameras track every sale</p>
                    <p className="text-white/70">Advanced tracking ensures accurate inventory and revenue sharing.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1 mr-3" />
                  <div>
                    <p className="font-semibold text-lg">Clean design that fits any premium space</p>
                    <p className="text-white/70">Our coolers complement high-end environments with sleek aesthetics.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 flex-row-reverse">
            <div>
              <motion.div
                className="relative rounded-2xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src="https://iili.io/3vMYhBI.jpg" 
                  alt="Modern gym interior" 
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </motion.div>
            </div>
            
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl mb-6">Better Brands, Better Experience</h3>
              <p className="text-xl mb-6 text-white/80">
                We stock products your customers actually want. Think Smart Protein Bars, Remedy, and cold-pressed essentials.
              </p>
              <p className="text-white/70 mb-6">
                Our premium selection of health-focused snacks and drinks keeps your customers energized and satisfied.
              </p>
              <p className="text-white/70">
                Regular product rotation and seasonal specials keep your offering fresh and exciting.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="section-padding bg-neutral-100 text-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">What Our Partners Say</h2>
            <p className="text-xl text-neutral-800 max-w-2xl mx-auto">
              Join these satisfied venue owners who are earning passive revenue
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Since installing Snackhaus in our gym, we've seen a 15% increase in monthly revenue with zero additional work."
              name="Alex Chen"
              position="Owner, Elevate Fitness"
              delay={0.2}
            />
            <TestimonialCard
              quote="Our members love the premium snack options. It's a perfect fit for our studio's health-focused approach."
              name="Sarah Johnson"
              position="Director, Flow Yoga Studio"
              delay={0.4}
            />
            <TestimonialCard
              quote="The sleek design and quality products align perfectly with our brand. Plus, the passive income is a nice bonus."
              name="Michael Torres"
              position="Manager, Pulse Athletics"
              delay={0.6}
            />
          </div>
          
          <div className="mt-16 flex justify-center">
            <img 
              src="https://iili.io/3vMYhBI.jpg" 
              alt="Business revenue growth" 
              className="w-full max-w-lg h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Form Section */}
      <AnimatedSection id="get-started" className="section-padding bg-secondary-dark">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl mb-6">Let's place your cooler.</h2>
              <p className="text-xl text-white/80 mb-8">
                Fill out the form and we'll reach out within 48 hours to discuss placing a Snackhaus cooler in your space.
              </p>
              
              <div className="mb-8">
                <motion.div
                  className="relative rounded-2xl overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <img 
                    src="https://iili.io/3vMYhBI.jpg" 
                    alt="Person grabbing drink from cooler" 
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                </motion.div>
              </div>
            </div>
            
            <div className="glass-card p-8 bg-white/10">
              <AnimatePresence>
                {formSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-8"
                  >
                    <div className="bg-primary/20 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                      <CheckCircleIcon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                    <p className="text-white/80 mb-4">
                      Thank you for your interest in Snackhaus. Our team will contact you within 48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                  >
                    <div className="grid gap-6">
                      <div>
                        <label htmlFor="firstName" className="block mb-2 text-white/80">
                          First Name*
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                            formErrors.firstName ? "border-red-500" : "border-white/10"
                          } text-white focus:outline-none focus:border-primary transition-colors`}
                          placeholder="Your first name"
                        />
                        {formErrors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="businessName" className="block mb-2 text-white/80">
                          Business Name*
                        </label>
                        <input
                          type="text"
                          id="businessName"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                            formErrors.businessName ? "border-red-500" : "border-white/10"
                          } text-white focus:outline-none focus:border-primary transition-colors`}
                          placeholder="Your business name"
                        />
                        {formErrors.businessName && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.businessName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block mb-2 text-white/80">
                          Email*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                            formErrors.email ? "border-red-500" : "border-white/10"
                          } text-white focus:outline-none focus:border-primary transition-colors`}
                          placeholder="your@email.com"
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="location" className="block mb-2 text-white/80">
                          Location*
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                            formErrors.location ? "border-red-500" : "border-white/10"
                          } text-white focus:outline-none focus:border-primary transition-colors`}
                          placeholder="City, State"
                        />
                        {formErrors.location && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="spaceType" className="block mb-2 text-white/80">
                          Type of Space*
                        </label>
                        <select
                          id="spaceType"
                          name="spaceType"
                          value={formData.spaceType}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                            formErrors.spaceType ? "border-red-500" : "border-white/10"
                          } text-white focus:outline-none focus:border-primary transition-colors`}
                        >
                          <option value="" className="bg-secondary-dark">Select type of space</option>
                          <option value="gym" className="bg-secondary-dark">Gym</option>
                          <option value="studio" className="bg-secondary-dark">Fitness Studio</option>
                          <option value="office" className="bg-secondary-dark">Office</option>
                          <option value="retail" className="bg-secondary-dark">Retail Space</option>
                          <option value="other" className="bg-secondary-dark">Other</option>
                        </select>
                        {formErrors.spaceType && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.spaceType}</p>
                        )}
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary py-4 relative overflow-hidden group"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-secondary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            Get a Cooler <ArrowRightIcon className="w-5 h-5 ml-2" />
                          </span>
                        )}
                      </button>
                    </div>
                    
                    <p className="text-white/60 text-sm mt-4 text-center">
                      We'll reach out within 48 hours. No spam, ever.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-secondary-dark pt-16 pb-8 border-t border-primary/10">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 pb-8">
            <div>
              <SnackhausLogo />
              <p className="text-white/70 mt-4">
                Smart coolers with premium wellness snacks for high-traffic spaces.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="text-white/70 hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#why-snackhaus" className="text-white/70 hover:text-primary transition-colors">Why Snackhaus</a></li>
                <li><a href="#get-started" className="text-white/70 hover:text-primary transition-colors">Get a Cooler</a></li>
                <li><a href="#" className="text-white/70 hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-white/70">info@snackhaus.com</li>
                <li className="text-white/70">1-800-SNACK-HAUS</li>
                <li className="flex space-x-4 mt-4">
                  <a href="#" className="text-white/70 hover:text-primary transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-white/70 hover:text-primary transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-white/70 hover:text-primary transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t border-white/10 text-center text-white/60 text-sm">
            <p>Snackhaus is a Loopshift Ventures company</p>
            <div className="flex justify-center mt-4 space-x-6">
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
            <p className="mt-4">© {new Date().getFullYear()} Snackhaus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

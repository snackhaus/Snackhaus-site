import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./App.css";

// Import Hero Icons
import { ArrowRightIcon, ArrowSmallDownIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

// Logo import - we'll use it as a component
const SnackhausLogo = () => (
  <div className="flex items-center">
    <img 
      src="https://iili.io/3857L2s.png" 
      alt="Snackhaus Logo" 
      className="h-8 md:h-8"
    />
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary-dark border-b border-primary/20 shadow-md">
        <div className="container-custom py-1.5 flex justify-between items-center">
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
      <section className="pt-64 md:pt-60 relative h-screen overflow-hidden">
        {/* Full-screen background image */}
        <div className="absolute inset-0">
          <img 
            src="https://iili.io/3vMYhBI.jpg" 
            alt="Snackhaus Smart Cooler" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
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
                Fuel better.
                <br />
                <span className="text-primary">Earn more.</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl mb-8 text-white/90 max-w-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                We place and operate our AI-powered snackhaus cooler in your gym so your members stay fuelled - and you earn passively
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <a href="#get-started" className="bg-primary text-secondary-dark px-6 py-3 rounded-md font-semibold hover:bg-primary-dark transition-all">
                  Get a Cooler
                </a>
                <a href="#how-it-works" className="text-white hover:text-primary transition-colors px-2 py-3 flex items-center">
                  How It Works
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
            <h2 className="text-4xl md:text-5xl mb-6">Meet snackhaus, Your Gym's Smart Cooler</h2>
            <p className="text-xl text-neutral-800 max-w-3xl mx-auto mb-4">
              snackhaus is a next-gen, AI-powered fridge designed for modern fitness spaces.
            </p>
            <p className="text-xl text-neutral-800 max-w-3xl mx-auto mb-4">
              It uses smart sensors and cameras to let your members tap, grab, and go - no buttons,
              no queues, no staff required.
            </p>
            <p className="text-xl text-neutral-800 max-w-3xl mx-auto">
              We handle everything: installation, stocking, payments, tracking and restocks. You just provide the space.
            </p>
          </div>
          
          <div className="mt-20">
            <h3 className="text-3xl text-center mb-12">How it works</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-6 overflow-hidden rounded-lg shadow-lg border border-primary/20">
                  <img 
                    src="https://iili.io/3g5ZT3Q.webp" 
                    alt="Tap to unlock the cooler" 
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <h4 className="text-2xl font-bold mb-3">Tap</h4>
                <p className="text-neutral-700">
                  Unlock the snackhaus cooler instantly with your phone or card — a pre-auth is taken, just like rideshare.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-6 overflow-hidden rounded-lg shadow-lg border border-primary/20">
                  <img 
                    src="https://iili.io/3g5t3iJ.webp" 
                    alt="Grab your snacks" 
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <h4 className="text-2xl font-bold mb-3">Grab</h4>
                <p className="text-neutral-700">
                  Grab snacks that support performance, energy, and recovery — curated with care.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mb-6 overflow-hidden rounded-lg shadow-lg border border-primary/20">
                  <img 
                    src="https://iili.io/3g5tmqG.webp" 
                    alt="Go - just close the door" 
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <h4 className="text-2xl font-bold mb-3">Go</h4>
                <p className="text-neutral-700">
                  Just close the door and walk away — we'll charge you automatically.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-24">
            <h3 className="text-3xl text-center mb-12">Feature Highlights</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-primary/20 hover:border-primary/40 transition-all shadow-lg">
                <div className="flex justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-primary">
                    <path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">100% autonomous</h4>
              </div>
              
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-primary/20 hover:border-primary/40 transition-all shadow-lg">
                <div className="flex justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-primary">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">24/7 operation</h4>
              </div>
              
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-primary/20 hover:border-primary/40 transition-all shadow-lg">
                <div className="flex justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-primary">
                    <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Remote tracking & real-time alerts</h4>
              </div>
              
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-primary/20 hover:border-primary/40 transition-all shadow-lg">
                <div className="flex justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-primary">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Zero admin required</h4>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Why Snackhaus Section */}
      <AnimatedSection id="why-snackhaus" className="section-padding bg-secondary-dark">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-white">More Revenue. Better Snacks. Zero Maintenance.</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xl text-white/90 mb-8">
                Snackhaus smart coolers are built to outperform traditional vending — without the headaches.
                Smarter tech, real-time data, and a curated product mix help Snackhaus generate 2–3x more revenue than typical vending machines.
              </p>
              
              <h3 className="text-2xl text-primary mb-6">Why it works:</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1 mr-3" />
                  <p className="text-white/90 text-lg">
                    Smart sensors, cameras, and weight tracking monitor every product in real time — with precision
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1 mr-3" />
                  <p className="text-white/90 text-lg">
                    Frictionless, touch-free UX — no buttons, no jams, works 24/7
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1 mr-3" />
                  <p className="text-white/90 text-lg">
                    Built-in screen for advertising = optional second income stream
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1 mr-3" />
                  <p className="text-white/90 text-lg">
                    LED halo + premium design attracts attention and elevates your space
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1 mr-3" />
                  <p className="text-white/90 text-lg">
                    We handle everything — install, stock, monitor, and maintain
                  </p>
                </li>
              </ul>
              
              <p className="text-xl text-white/90 mt-8">
                Snackhaus looks better, works smarter, and earns more — with zero effort from you.
              </p>
            </div>
            
            <div className="relative order-first md:order-last">
              <motion.div
                className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src="https://iili.io/3LN2mTQ.webp" 
                  alt="Snackhaus Smart Cooler" 
                  className="w-full h-auto object-cover rounded-2xl"
                />
                
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* No Junk. All Function. Section */}
      <AnimatedSection className="section-padding bg-neutral-100 text-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6">No Junk. All Function.</h2>
            <p className="text-xl text-neutral-800 max-w-3xl mx-auto mb-6">
              This isn't vending with a health label slapped on.
              Snackhaus is a fully curated selection of functional snacks, designed by nutrition experts — not distributors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 mb-16 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-4">Every product supports energy, recovery, or hydration.</h3>
              <p className="text-lg text-neutral-700 mb-4">
                We label everything with clear, color-coded tags so you can make better snack decisions in seconds.
                Whether you want clean protein after a workout or low-sugar fuel between meetings, it's easy to grab what's right for you.
              </p>
              <p className="text-lg text-neutral-700 mb-6">
                Snack tags appear directly on the smart cooler's LED shelf display, beneath each product — helping users instantly identify what suits their needs.
              </p>
              
              <p className="text-xl font-semibold text-secondary mt-6">
                Curated for performance. Stocked to sell.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md border border-primary/20 transition-all hover:shadow-lg"
              style={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.05)' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold inline-block relative group">
                    Snack Tag Key
                    <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white p-2 rounded shadow-md text-xs text-neutral-700 w-64 -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
                      Snack tags are shown on the cooler LED screen under each product.
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline-block ml-1 text-neutral-500">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v.5a.5.5 0 01-.5.5.5.5 0 01-.5-.5V7a1 1 0 012 0v.5a.5.5 0 01-.5.5.5.5 0 01-.5-.5V7zm-1 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <div className="flex items-center">
                    <span className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-medium mr-3 flex-shrink-0 w-28 text-center">High-Protein</span>
                    <div className="text-sm text-neutral-600 font-light leading-snug">Builds and repairs muscle – ideal post-workout</div>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-orange-400 text-white px-3 py-1.5 rounded-full text-sm font-medium mr-3 flex-shrink-0 w-28 text-center">Keto Options</span>
                    <div className="text-sm text-neutral-600 font-light leading-snug">Low-carb snacks for fat-adapted diets</div>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-yellow-300 text-secondary-dark px-3 py-1.5 rounded-full text-sm font-medium mr-3 flex-shrink-0 w-28 text-center flex flex-col leading-tight">
                      <span>Low Artificial</span>
                      <span>Sweeteners</span>
                    </span>
                    <div className="text-sm text-neutral-600 font-light leading-snug">Clean taste without the weird stuff</div>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-green-400 text-white px-3 py-1.5 rounded-full text-sm font-medium mr-3 flex-shrink-0 w-28 text-center">Vegan-Friendly</span>
                    <div className="text-sm text-neutral-600 font-light leading-snug">100% plant-based fuel</div>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-purple-400 text-white px-3 py-1.5 rounded-full text-sm font-medium mr-3 flex-shrink-0 w-28 text-center">Low-Sugar</span>
                    <div className="text-sm text-neutral-600 font-light leading-snug">Keeps energy stable without the crash</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="mt-20">
            <h3 className="text-2xl text-center mb-8">Some of the brands we stock:</h3>
            
            <div className="relative overflow-hidden">
              <div className="flex animate-carousel space-x-6 py-6">
                {/* First set of logos */}
                <div className="flex space-x-6 items-center">
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxisyb.webp" alt="Smart Diet Solutions" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-40 flex items-center justify-center">
                    <img src="https://iili.io/3pxiX4t.webp" alt="Macro Mike" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-40 flex items-center justify-center">
                    <img src="https://iili.io/3pxizTx.webp" alt="Remedy" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-40 flex items-center justify-center">
                    <img src="https://iili.io/3pxidhl.webp" alt="YoPro" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-40 flex items-center justify-center">
                    <img src="https://iili.io/3px6uAx.webp" alt="Cocobella" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-40 flex items-center justify-center">
                    <img src="https://iili.io/3px4syv.webp" alt="Chief" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-40 flex items-center justify-center">
                    <img src="https://iili.io/3px6gDl.webp" alt="Fibre-Boost" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-40 flex items-center justify-center">
                    <img src="https://iili.io/3pxPOXV.webp" alt="Prana On" className="max-h-full max-w-full object-contain" />
                  </div>
                </div>
                
                {/* Duplicate set for continuous loop */}
                <div className="flex space-x-6 items-center">
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxisyb.webp" alt="Smart Diet Solutions" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-40 flex items-center justify-center">
                    <img src="https://iili.io/3pxiX4t.webp" alt="Macro Mike" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-40 flex items-center justify-center">
                    <img src="https://iili.io/3pxizTx.webp" alt="Remedy" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-40 flex items-center justify-center">
                    <img src="https://iili.io/3pxidhl.webp" alt="YoPro" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-40 flex items-center justify-center">
                    <img src="https://iili.io/3px6uAx.webp" alt="Cocobella" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-40 flex items-center justify-center">
                    <img src="https://iili.io/3px4syv.webp" alt="Chief" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-40 flex items-center justify-center">
                    <img src="https://iili.io/3px6gDl.webp" alt="Fibre-Boost" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-40 flex items-center justify-center">
                    <img src="https://iili.io/3pxPOXV.webp" alt="Prana On" className="max-h-full max-w-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
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

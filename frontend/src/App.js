import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./App.css";

// Import Hero Icons
import { ArrowRightIcon, ArrowSmallDownIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary-dark border-b border-primary/10 h-32">
        <div className="container-custom h-full flex justify-between items-center px-4">
          {/* Logo on the left */}
          <div className="flex items-center -ml-8">
            <img 
              src="https://iili.io/3ps6JMF.png" 
              alt="Snackhaus Logo" 
              className="h-40 md:h-48"
            />
          </div>
          
          {/* Navigation links on the right */}
          <div className="flex gap-6">
            <a href="#how-it-works" className="text-white hover:text-primary transition-colors text-base">
              How It Works
            </a>
            <a href="#why-snackhaus" className="text-white hover:text-primary transition-colors text-base">
              Our Coolers
            </a>
            <a href="#food-difference" className="text-white hover:text-primary transition-colors text-base">
              The Food Difference
            </a>
            <a href="#get-started" className="text-white hover:text-primary transition-colors text-base">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 relative h-screen overflow-hidden">
        {/* Full-screen background image */}
        <div className="absolute inset-0">
          <img 
            src="https://iili.io/3vMYhBI.jpg" 
            alt="Snackhaus Smart Cooler" 
            className="w-full h-full object-cover object-[70%_10%] brightness-125 contrast-110 transform translate-y-16"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        </div>
        
        {/* Content overlay */}
        <div className="relative h-full container-custom flex items-center pt-20 md:pt-0">
          <div className="md:grid md:grid-cols-12 w-full">
            {/* Increased empty space to push content further right and avoid covering cooler */}
            <div className="md:col-span-8"></div>
            <div className="md:col-span-4 text-white px-4 md:px-0">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Fuel better. <br />
                <span className="text-primary">Earn more.</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl mb-8 text-white/90 max-w-lg"
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
                <a href="#how-it-works" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white transition-colors px-6 py-3 rounded-md flex items-center">
                  How It Works
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <AnimatedSection id="how-it-works" className="section-padding bg-neutral-100 text-secondary scroll-mt-32">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6">Meet snackhaus: Your Gym's Smart Cooler</h2>
            <p className="text-xl text-neutral-800 max-w-3xl mx-auto mb-4">
              snackhaus is a next-gen, AI-powered fridge built for modern fitness spaces.
            </p>
            <p className="text-xl text-neutral-800 max-w-3xl mx-auto mb-4">
              Using smart sensors, cameras, and precision weight tracking, it lets your members tap, grab, and go. No buttons. No queues. No staff required.
            </p>
            <p className="text-xl text-neutral-800 max-w-3xl mx-auto">
              We handle everything behind the scenes: install, restocks, payments, tracking, and maintenance. You simply provide the space.
            </p>
          </div>
          
          <div className="mt-20">
            <h3 className="text-3xl text-center mb-12">How It Works</h3>
            
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
                  Unlock the cooler with your phone or card. Just like rideshare, we take a pre-auth.
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
                  Choose high-performance snacks curated by nutrition experts for energy, recovery, and clean fuel.
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
                  Close the door and walk away. We'll charge you automatically.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-24">
            <h3 className="text-3xl text-center mb-12">Feature Highlights</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-primary/40 hover:border-primary/60 transition-all shadow-lg">
                <div className="flex justify-center mb-4">
                  <span className="text-4xl">💸</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-secondary-dark">Earn Passive Income From Sales and Advertising</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Profit from every snack sold and from digital in-fridge advertising. No upfront costs. Just passive income from space you already have.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-primary/40 hover:border-primary/60 transition-all shadow-lg">
                <div className="flex justify-center mb-4">
                  <span className="text-4xl">🚚</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-secondary-dark">Fully Managed With Zero Operational Load</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We install, stock, monitor, and maintain the cooler. No admin, no training, no inventory headaches. You just provide the space.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-primary/40 hover:border-primary/60 transition-all shadow-lg">
                <div className="flex justify-center mb-4">
                  <span className="text-4xl">🤖</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-secondary-dark">Not Vending: A Frictionless Member Experience</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Forget clunky machines, breakdowns, and queues. snackhaus delivers a seamless, self-serve experience your members will love. Reliable, always stocked, and hassle-free.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-primary/40 hover:border-primary/60 transition-all shadow-lg">
                <div className="flex justify-center mb-4">
                  <span className="text-4xl">🧃</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-secondary-dark">Curated Products That Align With Your Brand</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Every item is handpicked by nutrition experts to suit premium fitness spaces. Clean ingredients and functional benefits. No junk, no compromises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Why Snackhaus Section */}
      <AnimatedSection id="why-snackhaus" className="section-padding bg-secondary-dark scroll-mt-32">
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
      <AnimatedSection id="food-difference" className="section-padding bg-neutral-100 text-secondary scroll-mt-32">
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
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxiX4t.webp" alt="Macro Mike" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxizTx.webp" alt="Remedy" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxidhl.webp" alt="YoPro" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3px6uAx.webp" alt="Cocobella" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3px4syv.webp" alt="Chief" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3px6gDl.webp" alt="Fibre-Boost" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxPOXV.webp" alt="Prana On" className="max-h-full max-w-full object-contain" />
                  </div>
                </div>
                
                {/* Duplicate set for continuous loop */}
                <div className="flex space-x-6 items-center">
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxisyb.webp" alt="Smart Diet Solutions" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxiX4t.webp" alt="Macro Mike" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxizTx.webp" alt="Remedy" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxidhl.webp" alt="YoPro" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3px6uAx.webp" alt="Cocobella" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3px4syv.webp" alt="Chief" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3px6gDl.webp" alt="Fibre-Boost" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxPOXV.webp" alt="Prana On" className="max-h-full max-w-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Form Section */}
      <AnimatedSection id="get-started" className="section-padding bg-secondary-dark scroll-mt-32">
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
              <img 
                src="https://iili.io/3857L2s.png" 
                alt="Snackhaus Logo" 
                className="h-12 mb-4"
              />
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
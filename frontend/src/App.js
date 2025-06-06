import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./App.css";
import emailjs from '@emailjs/browser';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
      
      // Create email content
      const emailBody = `
New Snackhaus Cooler Request:

Name: ${formData.firstName}
Business: ${formData.businessName}
Email: ${formData.email}
Location: ${formData.location}
Message: ${formData.message}
      `.trim();
      
      // Create mailto link
      const subject = encodeURIComponent("New Snackhaus Cooler Request");
      const body = encodeURIComponent(emailBody);
      const mailtoLink = `mailto:tommy@snackhaus.com.au?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
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
            message: ""
          });
        }, 5000);
      }, 1000);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="App text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary-dark border-b border-primary/10 h-24 md:h-32">
        <div className="container-custom h-full flex justify-between items-center px-4">
          {/* Logo on the left */}
          <div className="flex items-center flex-shrink-0">
            <img 
              src="https://iili.io/3ps6JMF.png" 
              alt="Snackhaus Logo" 
              className="h-32 md:h-48"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 text-base">
            <a href="#how-it-works" className="text-white hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#why-snackhaus" className="text-white hover:text-primary transition-colors">
              Our Coolers
            </a>
            <a href="#food-difference" className="text-white hover:text-primary transition-colors">
              Our Food Difference
            </a>
            <a href="#get-started" className="text-white hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-primary transition-colors p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-secondary-dark border-t border-primary/10">
            <div className="px-4 py-2 space-y-2">
              <a 
                href="#how-it-works" 
                className="block py-2 text-white hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#why-snackhaus" 
                className="block py-2 text-white hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Coolers
              </a>
              <a 
                href="#food-difference" 
                className="block py-2 text-white hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Food Difference
              </a>
              <a 
                href="#get-started" 
                className="block py-2 text-white hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 md:pt-32 relative h-screen overflow-hidden">
        {/* Mobile background image */}
        <div className="absolute inset-0 block md:hidden">
          <img 
            src="https://iili.io/F9zHUJa.md.jpg" 
            alt="Snackhaus Smart Cooler" 
            className="w-full h-full object-cover object-center transform translate-y-20"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        </div>
        
        {/* Desktop background image */}
        <div className="absolute inset-0 hidden md:block">
          <img 
            src="https://iili.io/3vMYhBI.jpg" 
            alt="Snackhaus Smart Cooler" 
            className="w-full h-full object-cover object-[70%_10%] brightness-125 contrast-110 transform translate-y-20"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        </div>
        
        {/* Content overlay */}
        <div className="relative h-full container-custom flex items-center md:items-center">
          <div className="w-full flex">
            {/* Mobile: Text positioned on right side of cooler */}
            <div className="w-1/2 md:w-2/3"></div>
            <div className="w-1/2 md:w-1/3 text-white pr-1 pl-8 md:pr-0 md:pl-0 -mt-24 md:mt-0">
              <motion.h1 
                className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 leading-tight whitespace-nowrap"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Fuel better.<br />
                <span className="text-primary">Earn more.</span>
              </motion.h1>
              
              <motion.p 
                className="text-base md:text-xl mb-3 md:mb-8 text-white/90 leading-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                We place and operate our AI-powered snackhaus cooler in your gym so your members stay fuelled - and you earn passively
              </motion.p>
              
              <motion.div 
                className="flex flex-col gap-2 md:gap-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <a href="#get-started" className="bg-primary text-secondary-dark px-3 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all text-center text-base md:text-base shadow-lg">
                  Get a Cooler
                </a>
                <a href="#how-it-works" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white transition-colors px-3 py-2 md:px-6 md:py-3 rounded-lg flex items-center justify-center text-base md:text-base border border-white/30">
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
                  Unlock the cooler with your phone or card. No app downloads, no logins. Just a quick tap — like rideshare, we take a pre-auth.
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
            <h3 className="text-3xl text-center mb-12">Why Snackhaus Works</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-primary/40 hover:border-primary/60 transition-all shadow-lg">
                <div className="flex justify-center mb-4">
                  <span className="text-4xl">💸</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-secondary-dark">Earn Without Effort</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Get paid from snack sales and built-in digital advertising. No upfront cost. Just passive income from space you already have.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-primary/40 hover:border-primary/60 transition-all shadow-lg">
                <div className="flex justify-center mb-4">
                  <span className="text-4xl">🚚</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-secondary-dark">Fully Hands-Off</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We install, stock, monitor, and maintain. No admin, training, or inventory stress. You do nothing. We do everything.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-primary/40 hover:border-primary/60 transition-all shadow-lg">
                <div className="flex justify-center mb-4">
                  <span className="text-4xl">🤖</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-secondary-dark">Built for the Modern Gym</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  No clunky machines. No jams. No queues. Just frictionless, 24/7 access and a premium member experience.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-primary/40 hover:border-primary/60 transition-all shadow-lg">
                <div className="flex justify-center mb-4">
                  <span className="text-4xl">🧃</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-secondary-dark">Curated by Experts</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Every product is selected by nutritionists to meet the standards of high-performance spaces. Clean labels. No junk. Just functional fuel.
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
            <h2 className="text-4xl md:text-5xl mb-6 text-white">More Revenue. Better Snacks. Zero Effort.</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xl text-white/90 mb-8">
                Snackhaus smart coolers generate up to 3x more revenue than traditional vending, and in some cases, even more.
                It's not just the snacks. It's the tech, the experience, and the seamless backend.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1 mr-3" />
                  <p className="text-white/90 text-lg">
                    AI sensors and weight tracking = real-time accuracy
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1 mr-3" />
                  <p className="text-white/90 text-lg">
                    Touch-free UX = always on, always smooth
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1 mr-3" />
                  <p className="text-white/90 text-lg">
                    Built-in ad screen = optional second income stream
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1 mr-3" />
                  <p className="text-white/90 text-lg">
                    LED halo and sleek design = attention-grabbing presence
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1 mr-3" />
                  <p className="text-white/90 text-lg">
                    Zero effort required from you
                  </p>
                </li>
              </ul>
              
              <p className="text-xl text-primary mt-8 font-semibold">
                Snackhaus looks better, runs smarter, and earns more.
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
                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
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
            <motion.h2 
              className="text-4xl md:text-5xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              No Junk. All Function.
            </motion.h2>
            <div className="max-w-[600px] mx-auto">
              <motion.p 
                className="text-lg font-normal text-neutral-800 leading-relaxed text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ fontSize: '1.1rem', fontWeight: 400 }}
              >
                Snackhaus isn't just vending. It's a curated mix of snacks that fuel performance, chosen by experts, not distributors.<br />
                Color-coded tags on the cooler make it easy to choose what fits your goals, whether it's protein, plant-based, low sugar or high fiber.<br />
                Stocked smart. Labeled clearly. Chosen fast.
              </motion.p>
            </div>
          </div>
          
          {/* Tag Buttons Grid */}
          <div className="max-w-[700px] mx-auto mb-16">
            <motion.div 
              className="grid grid-cols-3 gap-4 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="bg-red-500 text-white px-4 py-3 rounded-full text-base font-medium text-center flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-red-600">High Protein</span>
              <span className="bg-blue-500 text-white px-4 py-3 rounded-full text-base font-medium text-center flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-blue-600">Organic</span>
              <span className="bg-purple-500 text-white px-4 py-3 rounded-full text-base font-medium text-center flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-purple-600">Gluten Free</span>
              <span className="bg-green-500 text-white px-4 py-3 rounded-full text-base font-medium text-center flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-green-600">Vegan</span>
              <span className="bg-orange-500 text-white px-4 py-3 rounded-full text-base font-medium text-center flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-orange-600">Low Sugar</span>
              <span className="bg-yellow-500 text-white px-4 py-3 rounded-full text-base font-medium text-center flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-yellow-600">High Fiber</span>
            </motion.div>
          </div>
          
          {/* Trusted Brands Section */}
          <div className="text-center pt-8">
            <motion.h3 
              className="text-3xl font-bold text-secondary-dark mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Trusted Brands Include
            </motion.h3>
            
            <div className="relative overflow-hidden">
              <div className="flex animate-carousel space-x-6 py-6">
                {/* First set of logos */}
                <div className="flex space-x-6 items-center">
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxiX4t.webp" alt="Smart Diet Solutions" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxizTx.webp" alt="Remedy" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/F2cowRj.png" alt="YoPro" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3px6uAx.webp" alt="Cocobella" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/F2cd7hg.md.png" alt="Chief" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxPOXV.webp" alt="Prana On" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3ylW42f.md.webp" alt="Brand Logo" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3yl84MQ.md.webp" alt="Brand Logo" className="max-h-full max-w-full object-contain" />
                  </div>
                </div>
                
                {/* Duplicate set for continuous loop */}
                <div className="flex space-x-6 items-center">
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxiX4t.webp" alt="Smart Diet Solutions" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxizTx.webp" alt="Remedy" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/F2cowRj.png" alt="YoPro" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3px6uAx.webp" alt="Cocobella" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/F2cd7hg.md.png" alt="Chief" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3pxPOXV.webp" alt="Prana On" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3ylW42f.md.webp" alt="Brand Logo" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center">
                    <img src="https://iili.io/3yl84MQ.md.webp" alt="Brand Logo" className="max-h-full max-w-full object-contain" />
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
                Fill out the form and we'll reach out within 24 hours to discuss placing a snackhaus cooler in your space.
              </p>
              
              <div className="mb-8">
                <motion.div
                  className="relative rounded-2xl overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <img 
                    src="https://iili.io/F9ThcAl.md.png" 
                    alt="Person grabbing drink from cooler" 
                    className="w-full h-auto max-h-96 object-contain rounded-2xl"
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
                      Thank you for your interest in snackhaus. Our team will contact you within 24 hours.
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
                        <select
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                            formErrors.location ? "border-red-500" : "border-white/10"
                          } text-white focus:outline-none focus:border-primary transition-colors`}
                        >
                          <option value="" className="bg-secondary-dark">Select state</option>
                          <option value="NSW" className="bg-secondary-dark">New South Wales (NSW)</option>
                          <option value="VIC" className="bg-secondary-dark">Victoria (VIC)</option>
                          <option value="QLD" className="bg-secondary-dark">Queensland (QLD)</option>
                          <option value="WA" className="bg-secondary-dark">Western Australia (WA)</option>
                          <option value="SA" className="bg-secondary-dark">South Australia (SA)</option>
                          <option value="TAS" className="bg-secondary-dark">Tasmania (TAS)</option>
                          <option value="ACT" className="bg-secondary-dark">Australian Capital Territory (ACT)</option>
                          <option value="NT" className="bg-secondary-dark">Northern Territory (NT)</option>
                        </select>
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
                      We'll reach out within 24 hours. No spam, ever.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-secondary-dark pt-12 pb-6 border-t border-primary/10">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 pb-6">
            <div>
              <img 
                src="https://iili.io/3ps6JMF.png" 
                alt="Snackhaus Logo" 
                className="h-40 md:h-48"
              />
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="text-white/70 hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#why-snackhaus" className="text-white/70 hover:text-primary transition-colors">Our Coolers</a></li>
                <li><a href="#food-difference" className="text-white/70 hover:text-primary transition-colors">Our Food Difference</a></li>
                <li><a href="#get-started" className="text-white/70 hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-white/70">hello@snackhaus.com.au</li>

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
                </li>
              </ul>
            </div>
          </div>
          
          {/* Full-width tagline */}
          <div className="border-t border-primary/10 pt-6">
            <p className="text-white/70 text-center">
              Fuel better wherever you are.
            </p>
          </div>
          
          <div className="pt-8 mt-8 border-t border-white/10 text-center text-white/60 text-sm">
            <p>Snackhaus is a wholly owned subsidiary of Loopshift Ventures Pty Ltd (ABN 41 686 385 526).</p>
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
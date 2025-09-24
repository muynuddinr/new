"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FiChevronDown, FiChevronUp, FiPlay, FiCheck, FiShield, FiCalendar, FiFileText, FiGrid, FiClipboard, FiStar } from 'react-icons/fi';

const GlassGlazing = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let particles: any[] = [];
    let animationFrameId: number;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.7 - 0.35;
        this.speedY = Math.random() * 0.7 - 0.35;
        this.color = `rgba(255, 165, 0, ${Math.random() * 0.5 + 0.1})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas!.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas!.height || this.y < 0) this.speedY *= -1;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    createParticles();
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const features = [
    {
      icon: <FiClipboard className="text-amber-500" />,
      title: "Install Project Management",
      description: "Streamline window, glass, and storefront installation projects"
    },
    {
      icon: <FiGrid className="text-amber-500" />,
      title: "Measurement & Cut Sheets",
      description: "Precision measurement tracking and cut sheet generation"
    },
    {
      icon: <FiShield className="text-amber-500" />,
      title: "Safety & Compliance",
      description: "Ensure adherence to safety standards and regulatory requirements"
    },
    {
      icon: <FiCheck className="text-amber-500" />,
      title: "Quality Inspections",
      description: "Comprehensive quality control processes and documentation"
    },
    {
      icon: <FiCalendar className="text-amber-500" />,
      title: "Customer Scheduling",
      description: "Efficient appointment booking and management system"
    },
    {
      icon: <FiFileText className="text-amber-500" />,
      title: "Warranty Records",
      description: "Complete warranty tracking and management system"
    }
  ];

  const benefits = [
    {
      title: "Precision Installs",
      description: "Ensure accurate measurements and perfect installations every time",
      icon: <FiGrid />
    },
    {
      title: "Safety Compliance",
      description: "Meet all industry safety standards and regulations with ease",
      icon: <FiShield />
    },
    {
      title: "Consistent Quality",
      description: "Maintain high standards across all projects and teams",
      icon: <FiStar />
    },
    {
      title: "Reliable Scheduling",
      description: "Keep projects on track with efficient scheduling and dispatch",
      icon: <FiCalendar />
    }
  ];

  const demoItems = [
    "Scheduling & dispatch walkthrough",
    "Technician mobile flows",
    "Reports & compliance",
    "Q & A with our experts"
  ];

  const faqs = [
    {
      question: "What features does Fielduo offer for Glass & Glazing?",
      answer: "Fielduo provides comprehensive project management, measurement tracking, safety compliance tools, quality inspections, customer scheduling, and warranty record management specifically designed for glass and glazing professionals."
    },
    {
      question: "How can Glass & Glazing businesses improve efficiency with field service management software?",
      answer: "Our software streamlines operations by automating scheduling, tracking measurements, managing compliance, and providing real-time communication between field technicians and office staff."
    },
    {
      question: "How does the software help with regulatory compliance for Glass & Glazing?",
      answer: "Fielduo includes built-in compliance checklists, documentation tools, and reporting features that ensure your operations meet all industry safety standards and regulatory requirements."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Glass & Glazing?",
      answer: "Yes, our platform includes emergency scheduling capabilities with priority dispatching and real-time notifications to handle urgent glass repair and replacement needs."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Glass & Glazing?",
      answer: "Our system provides complete inventory management with real-time tracking of glass panels, hardware, tools, and equipment to ensure you have the right materials for every job."
    },
    {
      question: "How does the software enhance customer communication for Glass & Glazing?",
      answer: "Fielduo offers automated notifications, appointment reminders, real-time status updates, and digital documentation sharing to keep customers informed throughout the service process."
    },
    {
      question: "What benefits do Glass & Glazing clients see after implementing Fielduo?",
      answer: "Clients typically experience 30% reduction in scheduling conflicts, 25% improvement in first-time fix rates, 40% faster billing cycles, and significant improvements in customer satisfaction scores."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-neutral-900 to-black"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-900/10 via-orange-800/5 to-transparent pointer-events-none"></div>
          
          {/* Floating Glass Icons */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl opacity-10 select-none"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -Math.random() * 80 - 30, 0],
                  x: [0, Math.random() * 60 - 30, 0],
                  rotate: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.05, 0.2, 0.05],
                }}
                transition={{
                  duration: Math.random() * 10 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              >
                {i % 5 === 0 ? "🔲" : i % 5 === 1 ? "🪟" : i % 5 === 2 ? "📐" : i % 5 === 3 ? "🛡️" : "🔍"}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Centered Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.div
              className="inline-block px-4 py-1 mb-6 bg-amber-900/30 border border-amber-700/50 rounded-full text-amber-400 text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              INDUSTRY-SPECIFIC SOLUTION
            </motion.div>
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Glass & Glazing
              <span className="block text-amber-500 mt-2">Management Platform</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Streamline window, glass, and storefront installations with our comprehensive field service management solution
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-amber-600 hover:bg-amber-700 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FiPlay className="text-xl" />
                Watch Demo
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-transparent border-2 border-white/20 rounded-xl font-bold text-white hover:border-white/40 transition-all duration-300"
              >
                Explore Features
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div>
      </section>
      
      {/* Key Features Section */}
      <section className="py-24 px-4 md:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-neutral-900 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Comprehensive <span className="text-amber-500">Features</span> for Glass Professionals
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Everything you need to manage installations, measurements, compliance, and customer relationships
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gradient-to-br from-neutral-800 to-black rounded-2xl p-8 border border-neutral-700/50 hover:border-amber-500/30 transition-all duration-300 h-full flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -15, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
                  borderColor: "rgba(245, 158, 11, 0.5)"
                }}
              >
                <div className="mb-6 p-3 bg-amber-900/20 rounded-xl w-fit">
                  <div className="text-2xl">{feature.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 flex-grow">{feature.description}</p>
                <div className="mt-6 pt-4 border-t border-neutral-700">
                  <span className="text-amber-500 text-sm font-medium flex items-center">
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Business Benefits Section */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-neutral-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200')] bg-cover bg-center opacity-5"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Transform Your <span className="text-amber-500">Business</span> with Proven Results
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              See how Fielduo delivers measurable improvements for glass and glazing companies
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-gradient-to-br from-black to-neutral-800 rounded-2xl p-8 border border-neutral-700/50 h-full flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
                  borderColor: "rgba(245, 158, 11, 0.5)"
                }}
              >
                <div className="mb-6 p-3 bg-amber-900/20 rounded-xl w-fit">
                  <div className="text-2xl text-amber-500">{benefit.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-400 flex-grow">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-20 bg-gradient-to-r from-amber-900/30 to-amber-800/20 rounded-3xl p-8 md:p-12 border border-amber-700/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h3 className="text-3xl font-bold mb-4">Ready to see Fielduo in action?</h3>
                <p className="text-gray-300 text-lg">
                  Schedule a personalized demo with our experts to see how Fielduo can address your specific business challenges.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-amber-600 hover:bg-amber-700 rounded-xl font-bold text-white shadow-lg transition-all duration-300 whitespace-nowrap"
              >
                Schedule Your Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* What You'll See Section */}
      <section className="py-24 px-4 md:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-neutral-900 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              What You'll See in the <span className="text-amber-500">Demo</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Experience our platform through a comprehensive demonstration tailored to your business
            </motion.p>
          </motion.div>
          
          <div className="bg-gradient-to-br from-neutral-800 to-black rounded-3xl border border-neutral-700/50 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-8 lg:p-12">
                <div className="mb-8">
                  <div className="flex border-b border-neutral-700">
                    {demoItems.map((item, index) => (
                      <motion.button
                        key={index}
                        className={`px-6 py-4 font-medium text-lg relative ${activeTab === index ? 'text-amber-500' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setActiveTab(index)}
                        whileHover={{ y: -2 }}
                      >
                        {item}
                        {activeTab === index && (
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
                            layoutId="activeTab"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-black/40 rounded-2xl p-8 border border-neutral-700 min-h-[300px] flex flex-col justify-center"
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-amber-900/20 flex items-center justify-center mr-4">
                        <FiPlay className="text-amber-500 text-2xl" />
                      </div>
                      <h3 className="text-2xl font-bold">{demoItems[activeTab]}</h3>
                    </div>
                    <p className="text-gray-300 mb-6">
                      {activeTab === 0 && "See how our intelligent scheduling system optimizes technician routes and reduces travel time."}
                      {activeTab === 1 && "Experience the mobile interface technicians use in the field to access job details, capture photos, and update status."}
                      {activeTab === 2 && "Explore our comprehensive reporting tools that help you track compliance, performance, and business metrics."}
                      {activeTab === 3 && "Get answers to your specific questions from our industry experts who understand glass and glazing operations."}
                    </p>
                    <div className="flex items-center text-amber-500 font-medium">
                      <span>Watch demo video</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="lg:w-1/2 bg-gradient-to-br from-amber-900/10 to-black p-8 lg:p-12 flex items-center">
                <div className="w-full">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-3xl font-bold mb-6">Schedule Your Personalized Demo</h3>
                    <p className="text-gray-300 mb-8 text-lg">
                      Our experts will tailor the demonstration to your specific business needs and show you exactly how Fielduo can transform your operations.
                    </p>
                    
                    <div className="space-y-6 mb-8">
                      <div className="flex items-start">
                        <div className="mt-1 mr-4 text-amber-500">
                          <FiCheck className="text-xl" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">Industry-Specific Walkthrough</h4>
                          <p className="text-gray-400">See features specifically designed for glass and glazing businesses</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mt-1 mr-4 text-amber-500">
                          <FiCheck className="text-xl" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">Q&A Session</h4>
                          <p className="text-gray-400">Get answers to your specific questions from our experts</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mt-1 mr-4 text-amber-500">
                          <FiCheck className="text-xl" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">Customized Proposal</h4>
                          <p className="text-gray-400">Receive a tailored plan based on your business requirements</p>
                        </div>
                      </div>
                    </div>
                    
                    <motion.button 
                      className="w-full px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Request Your Demo
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Fielduo Section */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-neutral-900 to-black relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200')] bg-cover bg-center opacity-5"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Why Choose <span className="text-amber-500">Fielduo</span> for Your Glass Business
            </motion.h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              className="bg-gradient-to-br from-black to-neutral-800 rounded-3xl p-10 border border-neutral-700/50"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
                borderColor: "rgba(245, 158, 11, 0.5)"
              }}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-amber-900/20 flex items-center justify-center mr-5">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-3xl font-bold">Rapid Implementation</h3>
              </div>
              <p className="text-gray-300 text-lg mb-6">
                We help you start quickly by importing your data, checklists, and assets with minimal disruption to your operations.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FiCheck className="text-amber-500 mr-3" />
                  <span>Quick setup in days, not weeks</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-amber-500 mr-3" />
                  <span>Seamless data migration</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-amber-500 mr-3" />
                  <span>Personalized onboarding</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-black to-neutral-800 rounded-3xl p-10 border border-neutral-700/50"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
                borderColor: "rgba(245, 158, 11, 0.5)"
              }}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-amber-900/20 flex items-center justify-center mr-5">
                  <span className="text-3xl">🔒</span>
                </div>
                <h3 className="text-3xl font-bold">Enterprise-Grade Security</h3>
              </div>
              <p className="text-gray-300 text-lg mb-6">
                Security is built-in with role-based permissions and full audit logs to protect your business data.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FiCheck className="text-amber-500 mr-3" />
                  <span>Role-based access control</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-amber-500 mr-3" />
                  <span>Complete audit trails</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-amber-500 mr-3" />
                  <span>SOC 2 compliant infrastructure</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24 px-4 md:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-neutral-900 z-0"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Frequently Asked <span className="text-amber-500">Questions</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Find answers to common questions about our Glass & Glazing solution
            </motion.p>
          </motion.div>
          
          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-gradient-to-br from-neutral-800 to-black rounded-2xl border border-neutral-700/50 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <motion.div 
                  className="p-6 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                  whileHover={{ backgroundColor: "rgba(30, 30, 30, 0.5)" }}
                >
                  <h3 className="text-xl font-semibold">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeFaq === index ? <FiChevronUp className="text-2xl text-amber-500" /> : <FiChevronDown className="text-2xl text-gray-400" />}
                  </motion.div>
                </motion.div>
                
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div 
                      className="px-6 pb-6 text-gray-300"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-amber-900/20 to-orange-900/10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200')] bg-cover bg-center opacity-10"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block px-4 py-1 mb-6 bg-amber-900/30 border border-amber-700/50 rounded-full text-amber-400 text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              READY TO GET STARTED?
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Transform Your Glass & Glazing Business Today</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Join leading glass and glazing professionals who trust Fielduo for their field service management
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button 
                className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                <FiPlay className="text-xl" />
                Start Free Trial
              </motion.button>
              
              <motion.button 
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white rounded-xl font-bold text-lg transition-all duration-300 border-2 border-white/20 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                Contact Sales
              </motion.button>
            </div>
            
            <motion.p 
              className="mt-8 text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              No credit card required • 14-day free trial • Cancel anytime
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GlassGlazing;
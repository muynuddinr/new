"use client";

// pages/pharmacy-services.tsx
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const PharmacyServices = () => {
  const [activeTab, setActiveTab] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let particles: any[] = [];
    let animationFrameId: number;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle class representing pharmacy elements
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color!: string;
      type: string;
      angle: number;
      spin: number;
      
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.05;
        
        // Assign type and color
        const types = ['pill', 'cross', 'bottle', 'heart'];
        this.type = types[Math.floor(Math.random() * types.length)];
        
        switch(this.type) {
          case 'pill':
            this.color = `rgba(59, 130, 246, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'cross':
            this.color = `rgba(220, 38, 38, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'bottle':
            this.color = `rgba(16, 185, 129, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'heart':
            this.color = `rgba(239, 68, 68, ${Math.random() * 0.6 + 0.2})`;
            break;
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.spin;
        
        // Add movement based on type
        if (this.type === 'pill') {
          this.speedX += (Math.random() - 0.5) * 0.02;
          this.speedY += (Math.random() - 0.5) * 0.02;
        } else if (this.type === 'cross') {
          this.speedX += Math.sin(this.angle) * 0.02;
          this.speedY += Math.cos(this.angle) * 0.02;
        } else if (this.type === 'bottle') {
          this.speedX += Math.cos(this.angle) * 0.02;
          this.speedY += Math.sin(this.angle) * 0.02;
        } else if (this.type === 'heart') {
          this.speedY -= 0.02; // Hearts float upward
          this.speedX += (Math.random() - 0.5) * 0.02;
        }
        
        // Limit speed
        const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        if (speed > 1) {
          this.speedX = (this.speedX / speed) * 1;
          this.speedY = (this.speedY / speed) * 1;
        }
        
        if (this.x > canvas!.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas!.height || this.y < 0) {
          this.speedY *= -1;
          // Reset hearts at top when they reach bottom
          if (this.type === 'heart' && this.y > canvas!.height) {
            this.y = 0;
            this.x = Math.random() * canvas!.width;
          }
        }
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        switch(this.type) {
          case 'pill':
            // Draw pill
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size * 2, this.size, 0, 0, Math.PI * 2);
            ctx.fill();
            // Pill line
            ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1})`;
            ctx.fillRect(-this.size * 0.2, -this.size * 0.1, this.size * 0.4, this.size * 0.2);
            break;
          case 'cross':
            // Draw medical cross
            ctx.fillRect(-this.size * 0.3, -this.size * 2, this.size * 0.6, this.size * 4);
            ctx.fillRect(-this.size * 2, -this.size * 0.3, this.size * 4, this.size * 0.6);
            break;
          case 'bottle':
            // Draw medicine bottle
            ctx.fillRect(-this.size * 0.8, -this.size * 2.5, this.size * 1.6, this.size * 2.5);
            // Bottle cap
            ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1})`;
            ctx.fillRect(-this.size * 1, -this.size * 2.8, this.size * 2, this.size * 0.3);
            // Bottle label
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
            ctx.fillRect(-this.size * 0.6, -this.size * 0.5, this.size * 1.2, this.size * 0.8);
            break;
          case 'heart':
            // Draw heart
            ctx.beginPath();
            ctx.moveTo(0, -this.size * 0.7);
            ctx.bezierCurveTo(-this.size * 1.5, -this.size * 1.7, -this.size * 1.5, this.size * 0.3, 0, this.size * 1.5);
            ctx.bezierCurveTo(this.size * 1.5, this.size * 0.3, this.size * 1.5, -this.size * 1.7, 0, -this.size * 0.7);
            ctx.fill();
            break;
        }
        
        ctx.restore();
      }
    }
    
    // Create particles
    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    createParticles();
    
    // Animation loop
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
      icon: "📦",
      title: "Rx Processing & Delivery",
      description: "Efficient prescription processing and secure medication delivery"
    },
    {
      icon: "💊",
      title: "Medication Inventory",
      description: "Comprehensive tracking and management of medication stock"
    },
    {
      icon: "📅",
      title: "Delivery Scheduling",
      description: "Intelligent scheduling for timely medication deliveries"
    },
    {
      icon: "🔔",
      title: "Patient Notifications",
      description: "Automated reminders and updates for patients"
    },
    {
      icon: "📋",
      title: "Regulatory Compliance",
      description: "Built-in compliance with healthcare regulations"
    },
    {
      icon: "🔒",
      title: "Secure Handling Controls",
      description: "Secure protocols for medication handling and delivery"
    }
  ];

  const benefits = [
    {
      title: "Better Access",
      description: "Expand your reach with mobile pharmacy services"
    },
    {
      title: "Medication Safety",
      description: "Ensure safe handling and delivery of medications"
    },
    {
      title: "Compliance Intact",
      description: "Maintain regulatory compliance with automated systems"
    },
    {
      title: "Great Patient Service",
      description: "Enhance patient experience with timely deliveries and communication"
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
      question: "What features does Fielduo offer for Pharmacy Services?",
      answer: "Fielduo provides prescription processing and delivery, medication inventory management, delivery scheduling, patient notifications, regulatory compliance tools, and secure handling controls specifically designed for pharmacy service providers."
    },
    {
      question: "How can Pharmacy Services businesses improve efficiency with field service management software?",
      answer: "Our software streamlines operations by automating prescription processing, tracking medication inventory in real-time, optimizing delivery routes, managing regulatory compliance, and providing real-time communication between pharmacy staff and patients."
    },
    {
      question: "How does the software help with regulatory compliance for Pharmacy Services?",
      answer: "Fielduo includes built-in compliance checklists, documentation management, temperature monitoring, audit trails, and reporting tools to ensure your pharmacy operations meet all healthcare regulations and industry standards."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Pharmacy Services?",
      answer: "Yes, our platform features emergency scheduling capabilities with priority dispatching, real-time notifications, and rapid mobilization tools to handle urgent medication delivery needs and time-sensitive prescriptions."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Pharmacy Services?",
      answer: "Our system provides complete inventory management with real-time tracking of medications, temperature-controlled storage monitoring, equipment maintenance schedules, and asset utilization for optimal pharmacy operations."
    },
    {
      question: "How does the software enhance customer communication for Pharmacy Services?",
      answer: "Fielduo offers automated prescription reminders, delivery notifications, medication alerts, refill reminders, and direct messaging channels to keep patients informed throughout their treatment process."
    },
    {
      question: "What benefits do Pharmacy Services clients see after implementing Fielduo?",
      answer: "Clients typically experience 40% reduction in prescription processing time, 30% improvement in medication inventory accuracy, 35% increase in on-time deliveries, and significant improvements in patient satisfaction scores."
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-teal-900/20 to-green-900/30"></div>
          
          {/* Pharmacy Elements */}
          {/* Mobile Pharmacy Van */}
          <motion.div 
            className="absolute bottom-0 left-1/4 w-96 h-64"
            animate={{ 
              x: [0, 30, 0],
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            <div className="absolute bottom-24 left-1/4 w-48 h-24 bg-blue-600 rounded-t-lg"></div>
            <div className="absolute bottom-24 left-1/4 w-48 h-4 bg-blue-700"></div>
            <div className="absolute bottom-28 left-1/4 w-8 h-8 bg-gray-700 rounded-full"></div>
            
            {/* Cross Symbol */}
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-8 h-2 bg-white rounded"></div>
              <div className="w-2 h-8 bg-white rounded"></div>
            </div>
            
            {/* Van Door */}
            <div className="absolute bottom-24 right-1/4 w-12 h-20 bg-gray-700"></div>
            
            {/* Wheels */}
            <div className="absolute bottom-0 left-1/4 w-12 h-12 bg-gray-700 rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-12 h-12 bg-gray-700 rounded-full"></div>
            
            {/* Medical Supplies in Van */}
            <div className="absolute bottom-32 left-1/4 w-6 h-6 bg-blue-400/50 rounded"></div>
            <div className="absolute bottom-40 left-1/3 w-8 h-8 bg-blue-400/50 rounded"></div>
            <div className="absolute bottom-32 left-2/5 w-6 h-6 bg-blue-400/50 rounded"></div>
          </motion.div>
          
          {/* Pharmacy Building */}
          <motion.div 
            className="absolute bottom-0 right-1/4 w-80 h-80"
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            <div className="absolute bottom-64 left-1/2 transform -translate-x-1/2 w-64 h-16 bg-gray-700 rounded-t-lg"></div>
            
            {/* Pharmacy Windows */}
            <div className="absolute bottom-72 left-1/3 w-10 h-10 bg-gray-900 rounded"></div>
            <div className="absolute bottom-72 right-1/3 w-10 h-10 bg-gray-900 rounded"></div>
            
            {/* Door */}
            <div className="absolute bottom-64 left-1/2 transform -translate-x-1/2 w-16 h-24 bg-gray-800"></div>
            
            {/* Pharmacy Sign */}
            <div className="absolute bottom-80 left-1/2 transform -translate-x-1/2 w-48 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">PHARMACY</span>
            </div>
            
            {/* Medical Cross Symbol */}
            <div className="absolute bottom-88 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-8 h-2 bg-white rounded"></div>
              <div className="w-2 h-8 bg-white rounded"></div>
            </div>
          </motion.div>
          
          {/* Medicine Cabinet */}
          <motion.div 
            className="absolute top-1/3 left-1/3 w-40 h-48"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-0 w-full h-4 bg-gray-600"></div>
            <div className="absolute bottom-4 left-0 w-full h-40 bg-gray-700/50 backdrop-blur-sm rounded-t-lg"></div>
            
            {/* Shelves */}
            <div className="absolute bottom-8 left-0 w-full h-1 bg-gray-600"></div>
            <div className="absolute bottom-16 left-0 w-full h-1 bg-gray-600"></div>
            <div className="absolute bottom-24 left-0 w-full h-1 bg-gray-600"></div>
            <div className="absolute bottom-32 left-0 w-full h-1 bg-gray-600"></div>
            
            {/* Medicine Bottles */}
            <div className="absolute bottom-6 left-1/4 w-4 h-8 bg-blue-400/50 rounded"></div>
            <div className="absolute bottom-6 left-2/4 w-4 h-8 bg-green-400/50 rounded"></div>
            <div className="absolute bottom-6 left-3/4 w-4 h-8 bg-red-400/50 rounded"></div>
            <div className="absolute bottom-14 left-1/4 w-4 h-8 bg-blue-400/50 rounded"></div>
            <div className="absolute bottom-14 left-2/4 w-4 h-8 bg-green-400/50 rounded"></div>
            <div className="absolute bottom-14 left-3/4 w-4 h-8 bg-red-400/50 rounded"></div>
            <div className="absolute bottom-22 left-1/4 w-4 h-8 bg-blue-400/50 rounded"></div>
            <div className="absolute bottom-22 left-2/4 w-4 h-8 bg-green-400/50 rounded"></div>
            <div className="absolute bottom-22 left-3/4 w-4 h-8 bg-red-400/50 rounded"></div>
          </motion.div>
          
          {/* Prescription with Pills */}
          <motion.div 
            className="absolute top-1/2 right-1/3 w-48 h-32"
            animate={{ 
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-white/10 backdrop-blur-sm rounded-lg"></div>
            
            {/* Prescription Paper */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-24 bg-white/20 backdrop-blur-sm rounded-lg p-2">
              <div className="w-full h-1 bg-blue-500/50 rounded mb-1"></div>
              <div className="w-full h-1 bg-blue-500/50 rounded mb-1"></div>
              <div className="w-3/4 h-1 bg-blue-500/50 rounded mb-1"></div>
              <div className="w-1/2 h-1 bg-blue-500/50 rounded"></div>
              
              {/* Rx Symbol */}
              <div className="absolute top-2 right-2 w-6 h-6 border-2 border-blue-500 rounded-full flex items-center justify-center">
                <span className="text-blue-500 text-xs font-bold">Rx</span>
              </div>
            </div>
            
            {/* Pills */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-x-16 w-6 h-3 bg-blue-400/50 rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-x-8 w-6 h-3 bg-red-400/50 rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-x-24 w-6 h-3 bg-green-400/50 rounded-full"></div>
            
            {/* Animated Signature */}
            <motion.div 
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-400/20 rounded-full"
              animate={{ 
                scaleX: [0.8, 1, 0.8],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
          
          {/* Medical Cross with Heartbeat */}
          <motion.div 
            className="absolute top-1/4 right-1/4 w-32 h-32"
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-2 bg-red-500 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-12 bg-red-500 rounded-full"></div>
            
            {/* Heartbeat Animation */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        </div>
        
        {/* Hero Content - No Box, Professional & Animated */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-start">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 tracking-wide text-left text-white drop-shadow-lg"
            initial={{ opacity: 0, x: -120, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 12, duration: 1 }}
            style={{ textShadow: '0 0 16px #fff, 0 0 32px #2563eb' }}
          >
            Pharmacy Services
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-10 max-w-2xl text-left text-white/90"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Mobile pharmacy & medication delivery solutions
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-start"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.button 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Features
            </motion.button>
            <motion.button 
              className="px-8 py-3 bg-transparent hover:bg-white/10 text-white rounded-lg transition-all duration-300 border border-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Demo
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for pharmacy service providers
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Business Benefits Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Business Benefits</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Enhance your pharmacy services and patient care
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <span className="text-blue-500">✓</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* What You'll See Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll See</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Experience our platform through a comprehensive demonstration
            </p>
          </motion.div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="mb-6">
                  <div className="flex border-b border-gray-800">
                    {demoItems.map((item, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 font-medium ${activeTab === index ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setActiveTab(index)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-black/30 rounded-xl p-6 border border-gray-800 h-64 flex items-center justify-center">
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={activeTab}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-5xl mb-4">💊</div>
                    <h3 className="text-xl font-semibold mb-2">{demoItems[activeTab]}</h3>
                    <p className="text-gray-400">Live demonstration of our platform capabilities</p>
                  </motion.div>
                </div>
              </div>
              
              <div className="md:w-1/2 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold mb-4">Schedule a Demo</h3>
                  <p className="text-gray-300 mb-6">
                    See how Fielduo can transform your pharmacy services with a personalized demonstration tailored to your specific needs.
                  </p>
                  <motion.button 
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 w-full"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Request Demo
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Fielduo Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Fielduo</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Rapid Implementation</h3>
              <p className="text-gray-300">
                We help you start quickly by importing your data, checklists, and assets with minimal disruption to your operations.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h3>
              <p className="text-gray-300">
                Security is built-in with role-based permissions and full audit logs to protect your pharmacy data and patient information.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-300">
              Find answers to common questions about our Pharmacy Services solution
            </p>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="p-6 cursor-pointer">
                  <h3 className="text-xl font-semibold">{faq.question}</h3>
                </div>
                <div className="px-6 pb-6 text-gray-300">
                  <p>{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-blue-900/20 to-teal-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Pharmacy Services?</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join leading pharmacy providers who trust Fielduo for their medication delivery management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
              </motion.button>
              <motion.button 
                className="px-8 py-3 bg-transparent hover:bg-white/10 text-white rounded-lg transition-all duration-300 border border-white/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PharmacyServices;
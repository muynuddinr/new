"use client";

// pages/real-estate-services.tsx
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const RealEstateServices = () => {
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
    
    // Particle class representing real estate elements
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
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.05;
        
        // Assign type and color
        const types = ['house', 'key', 'document', 'magnifying-glass'];
        this.type = types[Math.floor(Math.random() * types.length)];
        
        switch(this.type) {
          case 'house':
            this.color = `rgba(59, 130, 246, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'key':
            this.color = `rgba(251, 191, 36, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'document':
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'magnifying-glass':
            this.color = `rgba(16, 185, 129, ${Math.random() * 0.6 + 0.2})`;
            break;
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.spin;
        
        // Add movement based on type
        if (this.type === 'house') {
          this.speedX += (Math.random() - 0.5) * 0.02;
          this.speedY += (Math.random() - 0.5) * 0.02;
        } else if (this.type === 'key') {
          this.speedX += Math.sin(this.angle) * 0.03;
          this.speedY += Math.cos(this.angle) * 0.03;
        } else if (this.type === 'document') {
          this.speedY -= 0.02; // Documents float upward
          this.speedX += (Math.random() - 0.5) * 0.02;
        } else if (this.type === 'magnifying-glass') {
          this.speedX += Math.cos(this.angle) * 0.02;
          this.speedY += Math.sin(this.angle) * 0.02;
        }
        
        // Limit speed
        const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        if (speed > 1) {
          this.speedX = (this.speedX / speed) * 1;
          this.speedY = (this.speedY / speed) * 1;
        }
        
        if (this.x > canvas!.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas!.height || this.y < 0) this.speedY *= -1;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        switch(this.type) {
          case 'house':
            // Draw house
            ctx.fillRect(-this.size * 1.5, -this.size, this.size * 3, this.size * 2);
            ctx.beginPath();
            ctx.moveTo(-this.size * 2, -this.size);
            ctx.lineTo(0, -this.size * 2.5);
            ctx.lineTo(this.size * 2, -this.size);
            ctx.closePath();
            ctx.fill();
            // Door
            ctx.fillRect(-this.size * 0.3, this.size * 0.5, this.size * 0.6, this.size * 0.5);
            // Window
            ctx.fillRect(-this.size * 1.2, -this.size * 0.3, this.size * 0.6, this.size * 0.6);
            ctx.fillRect(this.size * 0.6, -this.size * 0.3, this.size * 0.6, this.size * 0.6);
            break;
          case 'key':
            // Draw key
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(0, 0, this.size * 3, this.size * 0.5);
            // Key teeth
            ctx.fillRect(this.size * 2, -this.size * 0.5, this.size * 0.5, this.size * 0.5);
            ctx.fillRect(this.size * 2.5, 0, this.size * 0.5, this.size * 0.5);
            break;
          case 'document':
            // Draw document
            ctx.fillRect(-this.size * 1.5, -this.size * 2, this.size * 3, this.size * 4);
            ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1})`;
            // Lines on document
            for (let i = 0; i < 5; i++) {
              ctx.fillRect(-this.size * 1.2, -this.size * 1.5 + i * this.size * 0.8, this.size * 2.4, this.size * 0.2);
            }
            break;
          case 'magnifying-glass':
            // Draw magnifying glass
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(this.size * 1.2, this.size * 1.2);
            ctx.lineTo(this.size * 2.5, this.size * 2.5);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.size * 0.5;
            ctx.stroke();
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
      icon: "📅",
      title: "Inspection Appointment Management",
      description: "Efficiently schedule and manage property inspection appointments with automated reminders"
    },
    {
      icon: "📸",
      title: "Condition Documentation",
      description: "Comprehensive visual and written documentation of property conditions with timestamped evidence"
    },
    {
      icon: "🏢",
      title: "Client & Property Tracking",
      description: "Centralized database for all client information and property details with easy search and filtering"
    },
    {
      icon: "📋",
      title: "Professional Inspection Reports",
      description: "Generate detailed, customizable inspection reports with automated formatting and branding"
    },
    {
      icon: "✅",
      title: "Industry Compliance",
      description: "Stay compliant with real estate regulations with built-in compliance checks and documentation"
    },
    {
      icon: "💬",
      title: "Client Communications",
      description: "Streamlined communication tools with clients including automated updates and status notifications"
    }
  ];

  const benefits = [
    {
      title: "Professional Inspections",
      description: "Deliver consistent, thorough property inspections with standardized processes"
    },
    {
      title: "Detailed Reporting",
      description: "Create comprehensive reports with photos, notes, and recommendations"
    },
    {
      title: "Great Client Service",
      description: "Enhance client satisfaction with timely updates and professional documentation"
    },
    {
      title: "Standards Alignment",
      description: "Ensure all inspections meet industry standards and regulatory requirements"
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
      question: "What features does Fielduo offer for Real Estate Services?",
      answer: "Fielduo provides inspection appointment management, condition documentation tools, client and property tracking, professional inspection reports, industry compliance features, and client communication tools specifically designed for real estate service providers."
    },
    {
      question: "How can Real Estate businesses improve efficiency with field service management software?",
      answer: "Our software streamlines operations by automating appointment scheduling, standardizing inspection processes, managing client and property data, generating professional reports, and providing real-time communication between inspectors and clients."
    },
    {
      question: "How does the software help with regulatory compliance for Real Estate Services?",
      answer: "Fielduo includes built-in compliance checklists, documentation management, audit trails, and reporting tools to ensure your real estate inspections meet all regulatory requirements and industry standards."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Real Estate Services?",
      answer: "Yes, our platform features emergency scheduling capabilities with priority dispatching, real-time notifications, and rapid mobilization tools to handle urgent inspection needs and time-sensitive property assessments."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Real Estate Services?",
      answer: "Our system provides complete equipment management with real-time tracking of inspection tools, maintenance schedules, calibration records, and inventory levels for inspection supplies and materials."
    },
    {
      question: "How does the software enhance customer communication for Real Estate Services?",
      answer: "Fielduo offers automated appointment reminders, inspection updates, report delivery notifications, status alerts, and direct messaging channels to keep clients informed throughout the inspection process."
    },
    {
      question: "What benefits do Real Estate clients see after implementing Fielduo?",
      answer: "Clients typically experience 50% reduction in scheduling conflicts, 40% improvement in report generation time, 35% increase in client satisfaction scores, and significant improvements in compliance audit outcomes."
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-indigo-900/20 to-purple-900/30"></div>
          
          {/* Real Estate Silhouettes */}
          {/* City Skyline */}
          <div className="absolute bottom-0 left-0 w-full h-64">
            <div className="absolute bottom-0 left-1/12 w-16 h-40 bg-gradient-to-t from-gray-800 to-gray-900"></div>
            <div className="absolute bottom-0 left-4/12 w-20 h-48 bg-gradient-to-t from-gray-800 to-gray-900"></div>
            <div className="absolute bottom-0 left-7/12 w-24 h-56 bg-gradient-to-t from-gray-800 to-gray-900"></div>
            <div className="absolute bottom-0 left-10/12 w-18 h-44 bg-gradient-to-t from-gray-800 to-gray-900"></div>
            
            {/* Building Windows */}
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-yellow-400/20 rounded-sm"
                style={{
                  width: '4px',
                  height: '6px',
                  bottom: `${20 + (i % 4) * 30}%`,
                  left: `${8 + (i % 5) * 18}%`,
                }}
              />
            ))}
          </div>
          
          {/* For Sale Sign */}
          <motion.div 
            className="absolute bottom-64 right-1/4 w-32 h-40"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Sign Post */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-24 bg-gray-600"></div>
            {/* Sign */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-28 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg"></div>
            {/* Sign Text */}
            <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold text-center">
              FOR SALE
            </div>
          </motion.div>
          
          {/* Animated Key */}
          <motion.div 
            className="absolute top-1/3 left-1/4 w-16 h-16"
            animate={{ 
              rotate: [0, 15, 0, -15, 0],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-500 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-2 bg-yellow-500"></div>
            <div className="absolute top-1/2 left-1/2 transform translate-x-6 -translate-y-1/2 w-2 h-4 bg-yellow-500"></div>
            <div className="absolute top-1/2 left-1/2 transform translate-x-8 -translate-y-1/2 w-2 h-2 bg-yellow-500"></div>
          </motion.div>
          
          {/* Magnifying Glass */}
          <motion.div 
            className="absolute top-1/2 right-1/3 w-20 h-20"
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-green-500 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform translate-x-6 translate-y-6 w-2 h-8 bg-green-500 rotate-45"></div>
          </motion.div>
        </div>
        
  <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Real Estate Services
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Property inspections & field services
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
              See Demo
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
              Comprehensive tools designed specifically for real estate service providers
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
              Drive operational excellence and client satisfaction
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
                    <div className="text-5xl mb-4">🏢</div>
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
                    See how Fielduo can transform your real estate services with a personalized demonstration tailored to your specific needs.
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
                Security is built-in with role-based permissions and full audit logs to protect your business data.
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
              Find answers to common questions about our Real Estate Services solution
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
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-blue-900/20 to-indigo-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Real Estate Services?</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join leading real estate professionals who trust Fielduo for their field service management
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

export default RealEstateServices;
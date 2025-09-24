"use client";

// pages/legal-services.tsx
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const LegalServices = () => {
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
    
    // Particle class representing legal elements
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
        const types = ['scale', 'gavel', 'document', 'balance'];
        this.type = types[Math.floor(Math.random() * types.length)];
        
        switch(this.type) {
          case 'scale':
            this.color = `rgba(124, 58, 237, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'gavel':
            this.color = `rgba(139, 69, 19, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'document':
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'balance':
            this.color = `rgba(220, 38, 38, ${Math.random() * 0.6 + 0.2})`;
            break;
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.spin;
        
        // Add movement based on type
        if (this.type === 'scale') {
          this.speedX += Math.sin(this.angle) * 0.02;
          this.speedY += Math.cos(this.angle) * 0.02;
        } else if (this.type === 'gavel') {
          this.speedX += (Math.random() - 0.5) * 0.02;
          this.speedY += (Math.random() - 0.5) * 0.02;
        } else if (this.type === 'document') {
          this.speedY -= 0.02; // Documents float upward
          this.speedX += (Math.random() - 0.5) * 0.02;
        } else if (this.type === 'balance') {
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
          case 'scale':
            // Draw scale of justice
            ctx.beginPath();
            ctx.moveTo(0, -this.size * 1.5);
            ctx.lineTo(-this.size * 1.5, this.size * 1.5);
            ctx.lineTo(this.size * 1.5, this.size * 1.5);
            ctx.closePath();
            ctx.fill();
            // Scale pans
            ctx.beginPath();
            ctx.ellipse(-this.size * 1.5, this.size * 1.5, this.size * 0.8, this.size * 0.4, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(this.size * 1.5, this.size * 1.5, this.size * 0.8, this.size * 0.4, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'gavel':
            // Draw gavel
            ctx.fillRect(-this.size * 0.5, -this.size * 2, this.size, this.size * 3);
            ctx.fillRect(-this.size * 1.2, -this.size * 2.5, this.size * 2.4, this.size * 0.8);
            break;
          case 'document':
            // Draw document
            ctx.fillRect(-this.size * 1.5, -this.size * 2, this.size * 3, this.size * 4);
            ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1})`;
            // Lines on document
            for (let i = 0; i < 5; i++) {
              ctx.fillRect(-this.size * 1.2, -this.size * 1.5 + i * this.size * 0.8, this.size * 2.4, this.size * 0.2);
            }
            // Seal
            ctx.beginPath();
            ctx.arc(this.size * 0.8, -this.size * 1.2, this.size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(220, 38, 38, ${Math.random() * 0.5 + 0.2})`;
            ctx.fill();
            break;
          case 'balance':
            // Draw balance
            ctx.fillRect(-this.size * 0.2, -this.size * 2, this.size * 0.4, this.size * 4);
            // Balance beam
            ctx.fillRect(-this.size * 2, -this.size * 2, this.size * 4, this.size * 0.3);
            // Balance pans
            ctx.beginPath();
            ctx.arc(-this.size * 2, -this.size * 1.5, this.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.size * 2, -this.size * 1.5, this.size * 0.7, 0, Math.PI * 2);
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
      icon: "📅",
      title: "Serve Scheduling",
      description: "Efficiently schedule and manage process serving appointments"
    },
    {
      icon: "📝",
      title: "Document Tracking & Proof",
      description: "Complete digital tracking with proof of service documentation"
    },
    {
      icon: "📍",
      title: "GPS/Location Verification",
      description: "Real-time location verification with GPS tracking"
    },
    {
      icon: "⚖️",
      title: "Court Filing Workflows",
      description: "Streamlined workflows for court document filing"
    },
    {
      icon: "📞",
      title: "Attorney Communications",
      description: "Seamless communication channels with legal professionals"
    },
    {
      icon: "📋",
      title: "Regulatory Requirements",
      description: "Compliance with all legal service regulations"
    }
  ];

  const benefits = [
    {
      title: "Reliable Service",
      description: "Consistent and dependable process serving with verified results"
    },
    {
      title: "Verified Delivery",
      description: "Proof of service with detailed documentation and tracking"
    },
    {
      title: "Professional Standards",
      description: "Maintain the highest professional standards in all services"
    },
    {
      title: "Transparent Updates",
      description: "Real-time updates and status notifications for all parties"
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
      question: "What features does Fielduo offer for Legal Services?",
      answer: "Fielduo provides serve scheduling, document tracking with proof of service, GPS location verification, court filing workflows, attorney communication tools, and regulatory compliance features specifically designed for legal service providers."
    },
    {
      question: "How can Legal Services businesses improve efficiency with field service management software?",
      answer: "Our software streamlines operations by automating scheduling, tracking document delivery, verifying service locations, managing court filing deadlines, and providing real-time communication between process servers and legal professionals."
    },
    {
      question: "How does the software help with regulatory compliance for Legal Services?",
      answer: "Fielduo includes built-in compliance checklists, documentation management, audit trails, and reporting tools to ensure your legal services meet all regulatory requirements and industry standards."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Legal Services?",
      answer: "Yes, our platform features emergency scheduling capabilities with priority dispatching, real-time notifications, and rapid mobilization tools to handle urgent legal document delivery and time-sensitive court filings."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Legal Services?",
      answer: "Our system provides complete equipment management with real-time tracking of service vehicles, mobile devices, document supplies, and other assets essential for legal service operations."
    },
    {
      question: "How does the software enhance customer communication for Legal Services?",
      answer: "Fielduo offers automated service notifications, delivery confirmations, status updates, proof of service documentation, and direct messaging channels to keep attorneys and clients informed throughout the legal process."
    },
    {
      question: "What benefits do Legal Services clients see after implementing Fielduo?",
      answer: "Clients typically experience 50% reduction in failed service attempts, 40% improvement in document processing time, 35% increase in on-time court filings, and significant improvements in attorney satisfaction scores."
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
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-indigo-900/20 to-blue-900/30"></div>
          
          {/* Legal Elements */}
          {/* Scales of Justice */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-40 h-40"
            animate={{ 
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-24 bg-gray-300"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-gray-300"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-x-12 w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-12 w-8 h-8 bg-gray-300 rounded-full"></div>
          </motion.div>
          
          {/* Gavel */}
          <motion.div 
            className="absolute top-1/3 right-1/4 w-32 h-32"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-16 bg-yellow-800"></div>
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-yellow-900 rounded"></div>
          </motion.div>
          
          {/* Legal Documents */}
          <motion.div 
            className="absolute bottom-1/4 left-1/3 w-24 h-32 bg-white/10 backdrop-blur-sm rounded-lg p-2"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 3, 0, -3, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-1 bg-purple-500 rounded mb-2"></div>
            <div className="w-full h-1 bg-purple-500 rounded mb-2"></div>
            <div className="w-3/4 h-1 bg-purple-500 rounded mb-2"></div>
            <div className="w-5/6 h-1 bg-purple-500 rounded"></div>
            
            {/* Document Seal */}
            <div className="absolute bottom-4 right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">SEAL</span>
            </div>
          </motion.div>
          
          {/* Courthouse Columns */}
          <div className="absolute bottom-0 right-1/4 w-64 h-80">
            <div className="absolute bottom-0 left-0 w-16 h-64 bg-gradient-to-t from-gray-700 to-gray-800"></div>
            <div className="absolute bottom-0 right-0 w-16 h-64 bg-gradient-to-t from-gray-700 to-gray-800"></div>
            <div className="absolute bottom-64 left-0 w-64 h-16 bg-gradient-to-t from-gray-800 to-gray-900"></div>
            
            {/* Courthouse Doors */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-24 h-48 bg-gray-800">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-gray-700"></div>
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-gray-700 rounded-full"></div>
            </div>
          </div>
          
          {/* Animated Balance Beam */}
          <motion.div 
            className="absolute bottom-1/3 right-1/3 w-48 h-8"
            animate={{ 
              rotate: [-5, 5, -5]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-2 bg-gray-400"></div>
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 bg-gray-500 rounded-full"></div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 bg-gray-500 rounded-full"></div>
          </motion.div>
        </div>
        
  <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Legal Services
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Process serving & legal support logistics
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button 
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300"
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
              Comprehensive tools designed specifically for legal service providers
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
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
              Enhance your legal service delivery with proven advantages
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                  <span className="text-purple-500">✓</span>
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
                        className={`px-4 py-2 font-medium ${activeTab === index ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
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
                    <div className="text-5xl mb-4">⚖️</div>
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
                    See how Fielduo can transform your legal services with a personalized demonstration tailored to your specific needs.
                  </p>
                  <motion.button 
                    className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 w-full"
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
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
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
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h3>
              <p className="text-gray-300">
                Security is built-in with role-based permissions and full audit logs to protect your sensitive legal data.
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
              Find answers to common questions about our Legal Services solution
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
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Streamline Your Legal Services?</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join leading legal service providers who trust Fielduo for their process serving and legal support logistics
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300"
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

export default LegalServices;
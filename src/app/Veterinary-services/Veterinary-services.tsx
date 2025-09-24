"use client";

// pages/veterinary-services.tsx
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const VeterinaryServices = () => {
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
    
    // Particle class representing veterinary elements
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
        const types = ['paw', 'heart', 'bone', 'syringe'];
        this.type = types[Math.floor(Math.random() * types.length)];
        
        switch(this.type) {
          case 'paw':
            this.color = `rgba(20, 184, 166, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'heart':
            this.color = `rgba(236, 72, 153, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'bone':
            this.color = `rgba(251, 191, 36, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'syringe':
            this.color = `rgba(59, 130, 246, ${Math.random() * 0.6 + 0.2})`;
            break;
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.spin;
        
        // Add movement based on type
        if (this.type === 'paw') {
          this.speedX += Math.sin(this.angle) * 0.02;
          this.speedY += Math.cos(this.angle) * 0.02;
        } else if (this.type === 'heart') {
          this.speedY -= 0.05; // Hearts float upward
          this.speedX += (Math.random() - 0.5) * 0.02;
        } else if (this.type === 'bone') {
          this.speedX += (Math.random() - 0.5) * 0.03;
          this.speedY += (Math.random() - 0.5) * 0.03;
        } else if (this.type === 'syringe') {
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
          case 'paw':
            // Draw paw print
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(-this.size * 1.2, -this.size * 1.2, this.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.size * 1.2, -this.size * 1.2, this.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(-this.size * 1.2, this.size * 1.2, this.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.size * 1.2, this.size * 1.2, this.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'heart':
            // Draw heart
            ctx.beginPath();
            ctx.moveTo(0, this.size * 0.7);
            ctx.bezierCurveTo(-this.size * 1.5, -this.size * 0.7, -this.size * 1.5, this.size * 0.3, 0, this.size * 1.7);
            ctx.bezierCurveTo(this.size * 1.5, this.size * 0.3, this.size * 1.5, -this.size * 0.7, 0, this.size * 0.7);
            ctx.fill();
            break;
          case 'bone':
            // Draw bone
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size * 2, this.size * 0.7, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(-this.size * 2, 0, this.size * 0.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.size * 2, 0, this.size * 0.8, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'syringe':
            // Draw syringe
            ctx.fillRect(-this.size * 0.3, -this.size * 2, this.size * 0.6, this.size * 4);
            ctx.beginPath();
            ctx.moveTo(0, -this.size * 2);
            ctx.lineTo(-this.size * 0.8, -this.size * 2.8);
            ctx.lineTo(this.size * 0.8, -this.size * 2.8);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, this.size * 2, this.size * 0.8, 0, Math.PI * 2);
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
      title: "Appointment Scheduling",
      description: "Efficiently schedule and manage veterinary appointments"
    },
    {
      icon: "🐾",
      title: "Animal Medical Records",
      description: "Maintain comprehensive digital health records for all patients"
    },
    {
      icon: "💊",
      title: "Medication Inventory",
      description: "Track and manage medication stock levels and expiration dates"
    },
    {
      icon: "🚑",
      title: "Emergency Response",
      description: "Quickly coordinate and dispatch emergency veterinary care"
    },
    {
      icon: "📱",
      title: "Owner Communications",
      description: "Keep pet owners informed with automated updates and reminders"
    },
    {
      icon: "📋",
      title: "Standards Compliance",
      description: "Ensure adherence to veterinary regulations and best practices"
    }
  ];

  const benefits = [
    {
      title: "Accessible Care",
      description: "Bring veterinary services directly to pet owners through mobile clinics"
    },
    {
      title: "Medical Excellence",
      description: "Maintain high standards of care with comprehensive record-keeping"
    },
    {
      title: "Fast Emergencies",
      description: "Reduce response times with optimized emergency dispatch workflows"
    },
    {
      title: "Convenient Service",
      description: "Offer pet owners flexible scheduling and reduced wait times"
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
      question: "What features does Fielduo offer for Veterinary Services?",
      answer: "Fielduo provides appointment scheduling, animal medical records management, medication inventory tracking, emergency response coordination, owner communication tools, and standards compliance features specifically designed for veterinary service providers."
    },
    {
      question: "How can Veterinary businesses improve efficiency with field service management software?",
      answer: "Our software streamlines operations by automating appointment scheduling, tracking medical histories, managing medication inventory, optimizing emergency dispatch, and providing real-time communication between veterinarians and pet owners."
    },
    {
      question: "How does the software help with regulatory compliance for Veterinary Services?",
      answer: "Fielduo includes built-in compliance checklists, documentation management, audit trails, and reporting tools to ensure your veterinary practice meets all regulatory requirements and industry best practices."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Veterinary Services?",
      answer: "Yes, our platform features emergency response capabilities with priority dispatching, real-time notifications, and rapid mobilization tools to handle urgent veterinary situations and provide immediate care when needed."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Veterinary Services?",
      answer: "Our system provides complete inventory management with real-time tracking of medications, medical supplies, equipment maintenance schedules, and mobile clinic assets to ensure optimal resource allocation."
    },
    {
      question: "How does the software enhance customer communication for Veterinary Services?",
      answer: "Fielduo offers automated appointment reminders, treatment updates, medication alerts, vaccination notifications, and direct messaging channels to keep pet owners informed and engaged throughout the care process."
    },
    {
      question: "What benefits do Veterinary clients see after implementing Fielduo?",
      answer: "Clients typically experience 40% reduction in no-show appointments, 30% improvement in medication management efficiency, 35% faster emergency response times, and significant improvements in pet owner satisfaction scores."
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
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 via-emerald-900/20 to-cyan-900/30"></div>
          
          {/* Mobile Veterinary Clinic */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-64">
            {/* Vehicle Body */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            
            {/* Wheels */}
            <div className="absolute bottom-0 left-1/4 w-12 h-12 bg-gray-700 rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-12 h-12 bg-gray-700 rounded-full"></div>
            
            {/* Cabin */}
            <div className="absolute bottom-32 left-1/4 w-1/2 h-16 bg-gray-700 rounded-t-lg"></div>
            
            {/* Windows */}
            <div className="absolute bottom-36 left-1/3 w-1/3 h-8 bg-blue-900/50 rounded-t-lg"></div>
            
            {/* Cross Symbol */}
            <motion.div 
              className="absolute bottom-48 left-1/2 transform -translate-x-1/2 w-8 h-8"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-2 bg-teal-500 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-8 bg-teal-500 rounded-full"></div>
            </motion.div>
            
            {/* Door */}
            <div className="absolute bottom-32 right-1/4 w-8 h-16 bg-gray-600"></div>
            
            {/* Animated Light */}
            <motion.div 
              className="absolute bottom-48 right-1/4 w-4 h-4 bg-teal-500 rounded-full"
              animate={{ 
                opacity: [0.3, 1, 0.3],
                boxShadow: [
                  "0 0 5px rgba(20, 184, 166, 0.5)",
                  "0 0 20px rgba(20, 184, 166, 0.8)",
                  "0 0 5px rgba(20, 184, 166, 0.5)"
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
          
          {/* Animal Silhouettes */}
          {/* Dog */}
          <motion.div 
            className="absolute bottom-0 left-1/4 w-24 h-24"
            animate={{ 
              x: [0, 20, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gray-700 rounded-t-full"></div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-gray-700"></div>
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-700 rounded-full"></div>
            <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-gray-700 rounded-full"></div>
            <div className="absolute bottom-20 right-1/4 w-4 h-4 bg-gray-700 rounded-full"></div>
            <div className="absolute bottom-12 left-1/4 w-2 h-8 bg-gray-700"></div>
            <div className="absolute bottom-12 right-1/4 w-2 h-8 bg-gray-700"></div>
          </motion.div>
          
          {/* Cat */}
          <motion.div 
            className="absolute bottom-0 right-1/4 w-20 h-20"
            animate={{ 
              x: [0, -15, 0],
              y: [0, -5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-gray-700 rounded-t-full"></div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gray-700"></div>
            <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-700 rounded-full"></div>
            <div className="absolute bottom-14 left-1/3 w-3 h-6 bg-gray-700 transform -rotate-12"></div>
            <div className="absolute bottom-14 right-1/3 w-3 h-6 bg-gray-700 transform rotate-12"></div>
            <div className="absolute bottom-10 left-1/4 w-2 h-6 bg-gray-700"></div>
            <div className="absolute bottom-10 right-1/4 w-2 h-6 bg-gray-700"></div>
          </motion.div>
          
          {/* Paw Prints Trail */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div 
              key={i}
              className="absolute w-4 h-4"
              style={{
                bottom: `${5 + i * 8}%`,
                left: `${40 + i * 3}%`,
              }}
              animate={{ 
                opacity: [0, 0.7, 0]
              }}
              transition={{ 
                duration: 4, 
                delay: i * 0.5,
                repeat: Infinity
              }}
            >
              <div className="w-4 h-4 bg-teal-500/30 rounded-full"></div>
              <div className="absolute top-0 left-0 w-2 h-2 bg-teal-500/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-teal-500/30 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-teal-500/30 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-teal-500/30 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
            </motion.div>
          ))}
        </div>
        
  <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Veterinary Services
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Mobile veterinary care coordination
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button 
              className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-all duration-300"
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
              Comprehensive tools designed specifically for veterinary service providers
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-teal-500/50 transition-all duration-300"
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
              Deliver exceptional care and service to your patients and their owners
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-teal-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mb-4">
                  <span className="text-teal-500">✓</span>
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
                        className={`px-4 py-2 font-medium ${activeTab === index ? 'text-teal-500 border-b-2 border-teal-500' : 'text-gray-400 hover:text-white'}`}
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
                    <div className="text-5xl mb-4">🐾</div>
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
                    See how Fielduo can transform your veterinary services with a personalized demonstration tailored to your specific needs.
                  </p>
                  <motion.button 
                    className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-all duration-300 w-full"
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
              <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center mb-6">
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
              <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center mb-6">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h3>
              <p className="text-gray-300">
                Security is built-in with role-based permissions and full audit logs to protect your business and patient data.
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
              Find answers to common questions about our Veterinary Services solution
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
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-teal-900/20 to-emerald-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Veterinary Services?</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join leading veterinary service providers who trust Fielduo for their mobile care coordination
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-all duration-300"
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

export default VeterinaryServices;
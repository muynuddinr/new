"use client";

// pages/catering-services.tsx
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const CateringServices = () => {
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
    
    // Particle class representing food and catering elements
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
        const types = ['utensil', 'plate', 'food', 'drink'];
        this.type = types[Math.floor(Math.random() * types.length)];
        
        switch(this.type) {
          case 'utensil':
            this.color = `rgba(220, 38, 38, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'plate':
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'food':
            this.color = `rgba(251, 146, 60, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'drink':
            this.color = `rgba(14, 165, 233, ${Math.random() * 0.6 + 0.2})`;
            break;
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.spin;
        
        // Add movement based on type
        if (this.type === 'utensil') {
          this.speedX += Math.sin(this.angle) * 0.02;
          this.speedY += Math.cos(this.angle) * 0.02;
        } else if (this.type === 'plate') {
          this.speedX += (Math.random() - 0.5) * 0.02;
          this.speedY += (Math.random() - 0.5) * 0.02;
        } else if (this.type === 'food') {
          this.speedY -= 0.02; // Food floats upward (steam effect)
          this.speedX += (Math.random() - 0.5) * 0.02;
        } else if (this.type === 'drink') {
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
          case 'utensil':
            // Draw fork
            ctx.fillRect(-this.size * 0.2, -this.size * 2, this.size * 0.4, this.size * 3);
            // Fork tines
            for (let i = 0; i < 3; i++) {
              ctx.fillRect(-this.size * 0.6 + i * this.size * 0.3, -this.size * 2, this.size * 0.2, this.size * 0.5);
            }
            break;
          case 'plate':
            // Draw plate
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.5, 0, Math.PI * 2);
            ctx.fill();
            // Plate rim
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.2, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(220, 38, 38, ${Math.random() * 0.5 + 0.2})`;
            ctx.lineWidth = this.size * 0.2;
            ctx.stroke();
            break;
          case 'food':
            // Draw food (represented as a circle with details)
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.2, 0, Math.PI * 2);
            ctx.fill();
            // Food details
            ctx.beginPath();
            ctx.arc(-this.size * 0.4, -this.size * 0.2, this.size * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(220, 38, 38, ${Math.random() * 0.5 + 0.2})`;
            ctx.fill();
            break;
          case 'drink':
            // Draw drink glass
            ctx.fillRect(-this.size * 0.8, -this.size * 2, this.size * 1.6, this.size * 2.5);
            // Glass top
            ctx.beginPath();
            ctx.moveTo(-this.size * 0.8, -this.size * 2);
            ctx.lineTo(this.size * 0.8, -this.size * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`;
            ctx.lineWidth = this.size * 0.2;
            ctx.stroke();
            // Drink level
            ctx.fillRect(-this.size * 0.7, -this.size * 0.5, this.size * 1.4, this.size * 0.8);
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
      title: "Event Scheduling",
      description: "Efficiently schedule and manage catering events and appointments"
    },
    {
      icon: "📋",
      title: "Menu & Ingredient Management",
      description: "Complete menu planning and ingredient inventory tracking"
    },
    {
      icon: "🍽️",
      title: "Equipment & Supply Control",
      description: "Track and manage all catering equipment and supplies"
    },
    {
      icon: "👨‍🍳",
      title: "Staff Rostering",
      description: "Optimize staff scheduling and assignment for events"
    },
    {
      icon: "📞",
      title: "Client Communications",
      description: "Seamless communication channels with clients and team members"
    },
    {
      icon: "✅",
      title: "Food Safety Tracking",
      description: "Compliance tracking and food safety monitoring"
    }
  ];

  const benefits = [
    {
      title: "Event Excellence",
      description: "Deliver exceptional catering experiences for every event"
    },
    {
      title: "Food Safety",
      description: "Maintain the highest standards of food safety and compliance"
    },
    {
      title: "Great Client Service",
      description: "Exceed client expectations with professional service"
    },
    {
      title: "Operational Efficiency",
      description: "Streamline operations to maximize productivity and reduce costs"
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
      question: "What features does Fielduo offer for Catering Services?",
      answer: "Fielduo provides event scheduling, menu and ingredient management, equipment and supply control, staff rostering, client communication tools, and food safety tracking features specifically designed for catering service providers."
    },
    {
      question: "How can Catering Services businesses improve efficiency with field service management software?",
      answer: "Our software streamlines operations by automating event scheduling, tracking ingredient inventory, managing equipment maintenance, optimizing staff assignments, and providing real-time communication between field teams and office staff."
    },
    {
      question: "How does the software help with regulatory compliance for Catering Services?",
      answer: "Fielduo includes built-in compliance checklists, food safety monitoring, temperature tracking, documentation management, and reporting tools to ensure your catering operations meet all regulatory requirements and industry standards."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Catering Services?",
      answer: "Yes, our platform features emergency scheduling capabilities with priority dispatching, real-time notifications, and rapid mobilization tools to handle urgent catering needs and last-minute event changes."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Catering Services?",
      answer: "Our system provides complete inventory management with real-time tracking of ingredients, equipment maintenance schedules, supply levels, and asset utilization for optimal resource allocation."
    },
    {
      question: "How does the software enhance customer communication for Catering Services?",
      answer: "Fielduo offers automated event reminders, menu updates, delivery notifications, status alerts, and direct messaging channels to keep clients informed throughout the catering process."
    },
    {
      question: "What benefits do Catering Services clients see after implementing Fielduo?",
      answer: "Clients typically experience 45% reduction in food waste, 30% improvement in staff utilization, 40% faster event setup times, and significant improvements in client satisfaction scores."
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
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-orange-900/20 to-yellow-900/30"></div>
          
          {/* Catering Elements */}
          {/* Food Truck */}
          <motion.div 
            className="absolute bottom-0 left-1/4 w-80 h-64"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            <div className="absolute bottom-32 left-1/4 w-32 h-24 bg-red-600 rounded-t-lg"></div>
            <div className="absolute bottom-32 left-1/4 w-32 h-4 bg-red-700"></div>
            <div className="absolute bottom-36 left-1/4 w-8 h-8 bg-gray-700 rounded-full"></div>
            
            {/* Serving Window */}
            <div className="absolute bottom-40 left-1/4 w-16 h-12 bg-gray-700"></div>
            
            {/* Wheels */}
            <div className="absolute bottom-0 left-1/4 w-12 h-12 bg-gray-700 rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-12 h-12 bg-gray-700 rounded-full"></div>
          </motion.div>
          
          {/* Buffet Table */}
          <motion.div 
            className="absolute bottom-0 right-1/4 w-96 h-40"
            animate={{ 
              x: [0, 15, 0],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            <div className="absolute bottom-8 left-0 w-full h-32 bg-white/10 backdrop-blur-sm"></div>
            
            {/* Food Dishes */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute bottom-12 w-12 h-12 bg-orange-500/30 rounded-full"
                style={{
                  left: `${15 + i * 12}%`,
                }}
              />
            ))}
            
            {/* Table Legs */}
            <div className="absolute bottom-0 left-1/6 w-4 h-12 bg-gray-700"></div>
            <div className="absolute bottom-0 left-1/2 w-4 h-12 bg-gray-700"></div>
            <div className="absolute bottom-0 right-1/6 w-4 h-12 bg-gray-700"></div>
          </motion.div>
          
          {/* Chef Hat */}
          <motion.div 
            className="absolute top-1/3 left-1/3 w-32 h-40"
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white rounded-full"></div>
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-28 h-16 bg-white rounded-t-full"></div>
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-white rounded-t-full"></div>
          </motion.div>
          
          {/* Serving Tray */}
          <motion.div 
            className="absolute top-1/2 right-1/3 w-40 h-40"
            animate={{ 
              rotate: [0, 10, 0, -10, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-4 bg-gray-400 rounded-full"></div>
            
            {/* Food Items on Tray */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-x-8 w-8 h-8 bg-red-500/50 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-8 w-8 h-8 bg-yellow-500/50 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-y-12 w-8 h-8 bg-green-500/50 rounded-full"></div>
            
            {/* Steam Animation */}
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-white/30 rounded-full"
                style={{
                  left: `${50 + (i - 1) * 10}%`,
                }}
                animate={{ 
                  y: [0, -10, -20],
                  opacity: [0.7, 0.4, 0]
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.3,
                  repeat: Infinity
                }}
              />
            ))}
          </motion.div>
        </div>
        
  <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-start">
    <motion.h1
      className="text-4xl md:text-6xl font-bold mb-6 tracking-wide text-left text-white drop-shadow-lg"
      initial={{ opacity: 0, x: -120, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 12, duration: 1 }}
      style={{ textShadow: '0 0 16px #fff, 0 0 32px #ff9800' }}
    >
      Catering Services
    </motion.h1>
    <motion.p
      className="text-lg md:text-xl mb-10 max-w-2xl text-left text-white/90"
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      Mobile catering and food service coordination
    </motion.p>
    <motion.div
      className="flex flex-col sm:flex-row gap-4 justify-start"
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.button 
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
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
              Comprehensive tools designed specifically for catering service providers
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-red-500/50 transition-all duration-300"
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
              Enhance your catering service delivery with proven advantages
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-red-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                  <span className="text-red-500">✓</span>
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
                        className={`px-4 py-2 font-medium ${activeTab === index ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
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
                    <div className="text-5xl mb-4">🍽️</div>
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
                    See how Fielduo can transform your catering services with a personalized demonstration tailored to your specific needs.
                  </p>
                  <motion.button 
                    className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 w-full"
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
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
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
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
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
              Find answers to common questions about our Catering Services solution
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
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-red-900/20 to-orange-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Catering Services?</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join leading catering service providers who trust Fielduo for their field service management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
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

export default CateringServices;
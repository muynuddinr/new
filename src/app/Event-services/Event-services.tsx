"use client";

// pages/event-services.tsx
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const EventServices = () => {
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
    
    // Particle class representing event elements
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
        const types = ['light', 'speaker', 'confetti', 'microphone'];
        this.type = types[Math.floor(Math.random() * types.length)];
        
        switch(this.type) {
          case 'light':
            this.color = `rgba(253, 224, 71, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'speaker':
            this.color = `rgba(99, 102, 241, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'confetti':
            this.color = `rgba(236, 72, 153, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'microphone':
            this.color = `rgba(14, 165, 233, ${Math.random() * 0.6 + 0.2})`;
            break;
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.spin;
        
        // Add movement based on type
        if (this.type === 'light') {
          this.speedX += Math.sin(this.angle) * 0.02;
          this.speedY += Math.cos(this.angle) * 0.02;
        } else if (this.type === 'speaker') {
          this.speedX += (Math.random() - 0.5) * 0.02;
          this.speedY += (Math.random() - 0.5) * 0.02;
        } else if (this.type === 'confetti') {
          this.speedY += 0.1; // Confetti falls
          this.speedX += (Math.random() - 0.5) * 0.05;
        } else if (this.type === 'microphone') {
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
        if (this.y > canvas!.height || this.y < 0) {
          this.speedY *= -1;
          // Reset confetti at top when it reaches bottom
          if (this.type === 'confetti' && this.y > canvas!.height) {
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
          case 'light':
            // Draw stage light
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-this.size * 1.5, this.size * 3);
            ctx.lineTo(this.size * 1.5, this.size * 3);
            ctx.closePath();
            ctx.fill();
            // Light rays
            for (let i = 0; i < 8; i++) {
              ctx.save();
              ctx.rotate(i * Math.PI / 4);
              ctx.beginPath();
              ctx.moveTo(0, this.size * 3);
              ctx.lineTo(0, this.size * 5);
              ctx.strokeStyle = this.color;
              ctx.lineWidth = this.size * 0.3;
              ctx.stroke();
              ctx.restore();
            }
            break;
          case 'speaker':
            // Draw speaker
            ctx.fillRect(-this.size * 1.5, -this.size * 2, this.size * 3, this.size * 4);
            // Speaker cone
            ctx.beginPath();
            ctx.moveTo(this.size * 1.5, -this.size * 2);
            ctx.lineTo(this.size * 3, -this.size * 3);
            ctx.lineTo(this.size * 3, this.size * 2);
            ctx.lineTo(this.size * 1.5, this.size * 2);
            ctx.closePath();
            ctx.fill();
            // Sound waves
            for (let i = 1; i <= 3; i++) {
              ctx.beginPath();
              ctx.arc(this.size * 3, 0, this.size * i, -Math.PI / 4, Math.PI / 4);
              ctx.strokeStyle = this.color;
              ctx.lineWidth = this.size * 0.2;
              ctx.stroke();
            }
            break;
          case 'confetti':
            // Draw confetti
            ctx.fillRect(-this.size * 0.2, -this.size * 1.5, this.size * 0.4, this.size * 3);
            break;
          case 'microphone':
            // Draw microphone
            ctx.fillRect(-this.size * 0.5, -this.size * 2, this.size, this.size * 3);
            // Microphone head
            ctx.beginPath();
            ctx.arc(0, -this.size * 2, this.size * 0.8, 0, Math.PI * 2);
            ctx.fill();
            // Microphone grille
            for (let i = 0; i < 5; i++) {
              ctx.fillRect(-this.size * 0.4, -this.size * 1.5 + i * this.size * 0.3, this.size * 0.8, this.size * 0.1);
            }
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
      icon: "📋",
      title: "Event Plan & Resources",
      description: "Comprehensive event planning with resource allocation and management"
    },
    {
      icon: "📊",
      title: "Equipment Tracking",
      description: "Real-time tracking of all event equipment and assets"
    },
    {
      icon: "👥",
      title: "Staff Scheduling",
      description: "Efficient scheduling and management of event staff"
    },
    {
      icon: "🏟️",
      title: "Venue Logistics",
      description: "Complete venue management and logistical coordination"
    },
    {
      icon: "📱",
      title: "Client Updates",
      description: "Automated client communication and real-time updates"
    },
    {
      icon: "⏱️",
      title: "Timeline Management",
      description: "Detailed timeline planning and execution tracking"
    }
  ];

  const benefits = [
    {
      title: "Smooth Execution",
      description: "Ensure flawless event execution with detailed planning and coordination"
    },
    {
      title: "Resource Efficiency",
      description: "Optimize resource allocation and reduce waste"
    },
    {
      title: "Client Satisfaction",
      description: "Exceed client expectations with professional service delivery"
    },
    {
      title: "Operational Success",
      description: "Streamline operations for consistent successful events"
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
      question: "What features does Fielduo offer for Event Services?",
      answer: "Fielduo provides event planning and resource management, equipment tracking, staff scheduling, venue logistics, client communication tools, and timeline management features specifically designed for event service providers."
    },
    {
      question: "How can Event Services businesses improve efficiency with field service management software?",
      answer: "Our software streamlines operations by automating event planning, tracking equipment and staff, managing venue logistics, coordinating timelines, and providing real-time communication between field teams and office staff."
    },
    {
      question: "How does the software help with regulatory compliance for Event Services?",
      answer: "Fielduo includes built-in compliance checklists, safety monitoring, documentation management, and reporting tools to ensure your event operations meet all regulatory requirements and industry standards."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Event Services?",
      answer: "Yes, our platform features emergency scheduling capabilities with priority dispatching, real-time notifications, and rapid mobilization tools to handle urgent event needs and last-minute changes."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Event Services?",
      answer: "Our system provides complete equipment management with real-time tracking of event assets, maintenance schedules, utilization rates, and inventory levels for optimal resource allocation."
    },
    {
      question: "How does the software enhance customer communication for Event Services?",
      answer: "Fielduo offers automated event updates, timeline notifications, status alerts, post-event feedback collection, and direct messaging channels to keep clients informed throughout the event process."
    },
    {
      question: "What benefits do Event Services clients see after implementing Fielduo?",
      answer: "Clients typically experience 50% reduction in planning time, 40% improvement in equipment utilization, 35% increase in staff productivity, and significant improvements in client satisfaction scores."
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
          
          {/* Event Elements */}
          {/* Stage */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-48">
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            <div className="absolute bottom-16 left-0 w-full h-32 bg-gray-700/50 backdrop-blur-sm"></div>
            
            {/* Stage Lights */}
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute bottom-32 w-4 h-8 bg-yellow-400/20 rounded-t-full"
                style={{
                  left: `${10 + i * 20}%`,
                }}
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  boxShadow: [
                    "0 0 5px rgba(253, 224, 71, 0.3)",
                    "0 0 20px rgba(253, 224, 71, 0.6)",
                    "0 0 5px rgba(253, 224, 71, 0.3)"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>
          
          {/* Speakers */}
          <motion.div 
            className="absolute bottom-0 left-1/4 w-32 h-48"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gray-800 rounded-t-lg"></div>
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-gray-700 rounded-t-lg"></div>
            
            {/* Sound Waves */}
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-purple-500/30 rounded-full"
                style={{
                  width: `${40 + i * 20}px`,
                  height: `${40 + i * 20}px`,
                }}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0]
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.3,
                  repeat: Infinity
                }}
              />
            ))}
          </motion.div>
          
          {/* Event Staff */}
          <motion.div 
            className="absolute bottom-0 right-1/4 w-24 h-64"
            animate={{ 
              x: [0, 20, 0],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-16 bg-gray-700 rounded-t-lg"></div>
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-16 h-24 bg-gray-600 rounded-t-lg"></div>
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-500 rounded-full"></div>
            
            {/* Animated Clipboard */}
            <motion.div 
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-10 h-14 bg-white/10 backdrop-blur-sm"
              animate={{ 
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-1 bg-purple-500/50 rounded mt-2"></div>
              <div className="w-full h-1 bg-purple-500/50 rounded mt-1"></div>
              <div className="w-3/4 h-1 bg-purple-500/50 rounded mt-1"></div>
            </motion.div>
          </motion.div>
          
          {/* Confetti Cannon */}
          <motion.div 
            className="absolute top-1/3 right-1/3 w-16 h-32"
            animate={{ 
              rotate: [-15, -5, -15]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-24 bg-gradient-to-t from-gray-700 to-gray-800 rounded-t-lg"></div>
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gray-600 rounded-t-lg"></div>
            
            {/* Animated Confetti */}
            {[...Array(15)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute w-1 h-4 rounded-full"
                style={{
                  bottom: '24px',
                  left: '50%',
                  backgroundColor: i % 3 === 0 ? 'rgba(236, 72, 153, 0.7)' : 
                                 i % 3 === 1 ? 'rgba(253, 224, 71, 0.7)' : 
                                 'rgba(99, 102, 241, 0.7)'
                }}
                animate={{ 
                  y: [0, -100, -200],
                  x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                  opacity: [0.8, 0.6, 0]
                }}
                transition={{ 
                  duration: 3, 
                  delay: i * 0.1,
                  repeat: Infinity
                }}
              />
            ))}
          </motion.div>
          
          {/* VIP Entrance */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-40">
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            <div className="absolute bottom-8 left-0 w-full h-32 bg-red-600/20 backdrop-blur-sm"></div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-2 h-32 bg-gray-700"></div>
            
            {/* Velvet Rope */}
            <div className="absolute bottom-16 left-1/4 w-1 h-16 bg-red-600"></div>
            <div className="absolute bottom-16 right-1/4 w-1 h-16 bg-red-600"></div>
            
            {/* Animated Spotlight */}
            <motion.div 
              className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-400/20 rounded-full"
              animate={{ 
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
        </div>
        
        {/* Hero Content - No Box, Professional & Animated */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-start">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 tracking-wide text-left text-white drop-shadow-lg"
            initial={{ opacity: 0, x: -120, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 12, duration: 1 }}
            style={{ textShadow: '0 0 16px #fff, 0 0 32px #a78bfa' }}
          >
            Event Services
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-10 max-w-2xl text-left text-white/90"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Setup, staffing, and on-site coordination for flawless events
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-start"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
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
              Comprehensive tools designed specifically for event service providers
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
              Drive operational excellence and client satisfaction
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
                    <div className="text-5xl mb-4">🎪</div>
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
                    See how Fielduo can transform your event services with a personalized demonstration tailored to your specific needs.
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
              Find answers to common questions about our Event Services solution
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Event Services?</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join leading event service providers who trust Fielduo for their field service management
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

export default EventServices;
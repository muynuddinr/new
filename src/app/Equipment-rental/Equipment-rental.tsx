"use client";

// pages/equipment-rental.tsx
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const EquipmentRental = () => {
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
    
    // Particle class representing equipment elements
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
        const types = ['gear', 'wrench', 'truck', 'crane'];
        this.type = types[Math.floor(Math.random() * types.length)];
        
        switch(this.type) {
          case 'gear':
            this.color = `rgba(245, 158, 11, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'wrench':
            this.color = `rgba(217, 119, 6, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'truck':
            this.color = `rgba(180, 83, 9, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'crane':
            this.color = `rgba(251, 146, 60, ${Math.random() * 0.6 + 0.2})`;
            break;
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.spin;
        
        // Add movement based on type
        if (this.type === 'gear') {
          this.speedX += Math.sin(this.angle) * 0.02;
          this.speedY += Math.cos(this.angle) * 0.02;
        } else if (this.type === 'wrench') {
          this.speedX += (Math.random() - 0.5) * 0.02;
          this.speedY += (Math.random() - 0.5) * 0.02;
        } else if (this.type === 'truck') {
          this.speedX += Math.cos(this.angle) * 0.02;
          this.speedY += Math.sin(this.angle) * 0.02;
        } else if (this.type === 'crane') {
          this.speedY -= 0.02; // Cranes lift upward
          this.speedX += (Math.random() - 0.5) * 0.02;
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
          case 'gear':
            // Draw gear
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.5, 0, Math.PI * 2);
            ctx.fill();
            // Gear teeth
            for (let i = 0; i < 8; i++) {
              ctx.save();
              ctx.rotate(i * Math.PI / 4);
              ctx.fillRect(this.size * 1.2, -this.size * 0.4, this.size * 0.6, this.size * 0.8);
              ctx.restore();
            }
            // Center hole
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1})`;
            ctx.fill();
            break;
          case 'wrench':
            // Draw wrench
            ctx.fillRect(-this.size * 0.3, -this.size * 2, this.size * 0.6, this.size * 3);
            // Wrench head
            ctx.beginPath();
            ctx.moveTo(-this.size * 1.2, -this.size * 2);
            ctx.lineTo(-this.size * 0.3, -this.size * 2.5);
            ctx.lineTo(this.size * 0.3, -this.size * 2.5);
            ctx.lineTo(this.size * 1.2, -this.size * 2);
            ctx.lineTo(this.size * 1.2, -this.size * 1);
            ctx.lineTo(-this.size * 1.2, -this.size * 1);
            ctx.closePath();
            ctx.fill();
            break;
          case 'truck':
            // Draw truck
            ctx.fillRect(-this.size * 2, -this.size, this.size * 4, this.size * 2);
            // Truck cab
            ctx.fillRect(this.size * 1.5, -this.size * 1.8, this.size * 1.5, this.size * 1.8);
            // Wheels
            ctx.beginPath();
            ctx.arc(-this.size * 1.2, this.size, this.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.size * 1.2, this.size, this.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'crane':
            // Draw crane
            ctx.fillRect(-this.size * 0.3, -this.size * 3, this.size * 0.6, this.size * 4);
            // Crane arm
            ctx.fillRect(0, -this.size * 3, this.size * 3, this.size * 0.4);
            // Crane hook
            ctx.beginPath();
            ctx.moveTo(this.size * 3, -this.size * 2.6);
            ctx.lineTo(this.size * 3.5, -this.size * 1.8);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.size * 0.3;
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
      icon: "📊",
      title: "Asset Tracking & Availability",
      description: "Real-time tracking of equipment location and availability status"
    },
    {
      icon: "🚚",
      title: "Delivery/Pickup Scheduling",
      description: "Efficient scheduling of equipment delivery and pickup operations"
    },
    {
      icon: "🛠️",
      title: "Service & Maintenance Logs",
      description: "Comprehensive maintenance history and service scheduling"
    },
    {
      icon: "💳",
      title: "Customer Accounts & Billing",
      description: "Integrated customer management and billing systems"
    },
    {
      icon: "📈",
      title: "Utilization Dashboards",
      description: "Visual analytics for equipment usage and performance metrics"
    },
    {
      icon: "📦",
      title: "Inventory Control",
      description: "Complete inventory management with real-time stock tracking"
    }
  ];

  const benefits = [
    {
      title: "Higher Utilization",
      description: "Maximize equipment usage and reduce idle time"
    },
    {
      title: "Reliable Service",
      description: "Ensure consistent and dependable equipment availability"
    },
    {
      title: "Satisfied Customers",
      description: "Deliver exceptional service that keeps clients coming back"
    },
    {
      title: "Streamlined Operations",
      description: "Optimize workflows for maximum efficiency and reduced costs"
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
      question: "What features does Fielduo offer for Equipment Rental?",
      answer: "Fielduo provides asset tracking and availability, delivery/pickup scheduling, service and maintenance logs, customer accounts and billing, utilization dashboards, and inventory control features specifically designed for equipment rental providers."
    },
    {
      question: "How can Equipment Rental businesses improve efficiency with field service management software?",
      answer: "Our software streamlines operations by automating equipment tracking, optimizing delivery schedules, managing maintenance workflows, integrating billing systems, and providing real-time communication between field technicians and office staff."
    },
    {
      question: "How does the software help with regulatory compliance for Equipment Rental?",
      answer: "Fielduo includes built-in compliance checklists, documentation management, audit trails, and reporting tools to ensure your equipment rental operations meet all regulatory requirements and industry standards."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Equipment Rental?",
      answer: "Yes, our platform features emergency scheduling capabilities with priority dispatching, real-time notifications, and rapid mobilization tools to handle urgent equipment delivery and pickup needs."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Equipment Rental?",
      answer: "Our system provides complete equipment management with real-time tracking of rental assets, maintenance schedules, utilization rates, and inventory levels for optimal resource allocation."
    },
    {
      question: "How does the software enhance customer communication for Equipment Rental?",
      answer: "Fielduo offers automated delivery notifications, pickup reminders, maintenance alerts, billing updates, and direct messaging channels to keep customers informed throughout the rental process."
    },
    {
      question: "What benefits do Equipment Rental clients see after implementing Fielduo?",
      answer: "Clients typically experience 40% improvement in equipment utilization rates, 35% reduction in maintenance costs, 30% faster delivery times, and significant improvements in customer satisfaction scores."
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
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-yellow-900/30"></div>
          
          {/* Equipment Silhouettes */}
          {/* Excavator */}
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
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            <div className="absolute bottom-24 left-1/4 w-16 h-32 bg-gray-700"></div>
            <div className="absolute bottom-24 left-1/4 w-40 h-8 bg-gray-700"></div>
            <div className="absolute bottom-32 left-1/4 w-8 h-16 bg-gray-700"></div>
            <div className="absolute bottom-32 left-1/4 w-24 h-4 bg-gray-700"></div>
            <div className="absolute bottom-36 left-1/4 w-32 h-4 bg-gray-700"></div>
            
            {/* Animated Arm */}
            <motion.div 
              className="absolute bottom-32 left-1/4 w-8 h-16 bg-gray-700 origin-bottom"
              animate={{ 
                rotate: [-10, 10, -10]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          {/* Forklift */}
          <motion.div 
            className="absolute bottom-0 right-1/4 w-64 h-48"
            animate={{ 
              x: [0, 15, 0],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-12 h-24 bg-gray-700"></div>
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-gray-700"></div>
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-gray-700"></div>
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 -translate-x-12 w-4 h-16 bg-gray-700"></div>
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 translate-x-12 w-4 h-16 bg-gray-700"></div>
            
            {/* Wheels */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-x-8 w-8 h-8 bg-gray-700 rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-x-8 w-8 h-8 bg-gray-700 rounded-full"></div>
          </motion.div>
          
          {/* Construction Crane */}
          <motion.div 
            className="absolute top-1/4 left-1/3 w-32 h-64"
            animate={{ 
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-48 bg-gray-700"></div>
            <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-gray-700"></div>
            <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-gray-700 origin-top"
              style={{ transform: 'translateX(-50%) rotate(30deg)' }}
            />
            
            {/* Hook */}
            <motion.div 
              className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gray-600"
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          {/* Delivery Truck */}
          <motion.div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-40"
            animate={{ 
              x: [0, 20, 0],
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            <div className="absolute bottom-16 left-1/4 w-16 h-20 bg-gray-700"></div>
            <div className="absolute bottom-16 right-1/4 w-32 h-24 bg-gray-700"></div>
            
            {/* Wheels */}
            <div className="absolute bottom-0 left-1/4 w-8 h-8 bg-gray-700 rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-8 h-8 bg-gray-700 rounded-full"></div>
            
            {/* Animated Loading Ramp */}
            <motion.div 
              className="absolute bottom-16 right-1/4 w-24 h-2 bg-gray-600 origin-right"
              animate={{ 
                rotate: [0, -30, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
        
  <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Equipment Rental
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Delivery, availability, and maintenance for rental fleets
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button 
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all duration-300"
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
              Comprehensive tools designed specifically for equipment rental providers
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-amber-500/50 transition-all duration-300"
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
              Enhance your equipment rental operations with proven advantages
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-amber-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                  <span className="text-amber-500">✓</span>
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
                        className={`px-4 py-2 font-medium ${activeTab === index ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-400 hover:text-white'}`}
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
                    <div className="text-5xl mb-4">🚚</div>
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
                    See how Fielduo can transform your equipment rental business with a personalized demonstration tailored to your specific needs.
                  </p>
                  <motion.button 
                    className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all duration-300 w-full"
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
              <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mb-6">
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
              <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mb-6">
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
              Find answers to common questions about our Equipment Rental solution
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
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-amber-900/20 to-orange-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Optimize Your Equipment Rental Business?</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join leading equipment rental providers who trust Fielduo for their field service management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all duration-300"
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

export default EquipmentRental;
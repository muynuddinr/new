"use client";

// pages/courier-services.tsx
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const CourierServices = () => {
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
    
    // Particle class representing courier elements
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
        const types = ['package', 'truck', 'arrow', 'location'];
        this.type = types[Math.floor(Math.random() * types.length)];
        
        switch(this.type) {
          case 'package':
            this.color = `rgba(59, 130, 246, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'truck':
            this.color = `rgba(16, 185, 129, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'arrow':
            this.color = `rgba(245, 158, 11, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'location':
            this.color = `rgba(139, 92, 246, ${Math.random() * 0.6 + 0.2})`;
            break;
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.spin;
        
        // Add movement based on type
        if (this.type === 'package') {
          this.speedX += (Math.random() - 0.5) * 0.02;
          this.speedY += (Math.random() - 0.5) * 0.02;
        } else if (this.type === 'truck') {
          this.speedX += Math.cos(this.angle) * 0.02;
          this.speedY += Math.sin(this.angle) * 0.02;
        } else if (this.type === 'arrow') {
          this.speedY -= 0.02; // Arrows point upward
          this.speedX += (Math.random() - 0.5) * 0.02;
        } else if (this.type === 'location') {
          this.speedX += Math.sin(this.angle) * 0.02;
          this.speedY += Math.cos(this.angle) * 0.02;
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
          case 'package':
            // Draw package
            ctx.fillRect(-this.size * 1.5, -this.size * 1.5, this.size * 3, this.size * 3);
            // Package ribbon
            ctx.fillStyle = `rgba(220, 38, 38, ${Math.random() * 0.5 + 0.2})`;
            ctx.fillRect(-this.size * 1.5, -this.size * 1.5, this.size * 3, this.size * 0.5);
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
          case 'arrow':
            // Draw arrow
            ctx.beginPath();
            ctx.moveTo(0, this.size * 1.5);
            ctx.lineTo(0, -this.size * 1.5);
            ctx.lineTo(-this.size * 0.8, -this.size * 0.7);
            ctx.lineTo(0, -this.size * 1.2);
            ctx.lineTo(this.size * 0.8, -this.size * 0.7);
            ctx.closePath();
            ctx.fill();
            break;
          case 'location':
            // Draw location pin
            ctx.beginPath();
            ctx.moveTo(0, -this.size * 2);
            ctx.lineTo(-this.size * 1.2, this.size * 0.5);
            ctx.lineTo(this.size * 1.2, this.size * 0.5);
            ctx.closePath();
            ctx.fill();
            // Pin base
            ctx.fillRect(-this.size * 0.3, this.size * 0.5, this.size * 0.6, this.size * 1);
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
      title: "Delivery Scheduling & Tracking",
      description: "Efficiently schedule deliveries and track packages in real-time"
    },
    {
      icon: "🗺️",
      title: "Route Optimization",
      description: "Automatically calculate the most efficient delivery routes"
    },
    {
      icon: "👨‍💼",
      title: "Driver Management",
      description: "Manage your delivery team with performance tracking and assignment tools"
    },
    {
      icon: "📦",
      title: "Real-time Package Tracking",
      description: "Provide customers with live updates on their package location"
    },
    {
      icon: "🔔",
      title: "Customer Notifications",
      description: "Automated alerts for delivery status, delays, and completions"
    },
    {
      icon: "✅",
      title: "Proof of Delivery",
      description: "Digital signatures and photo confirmation for completed deliveries"
    }
  ];

  const benefits = [
    {
      title: "Reliable Delivery",
      description: "Ensure timely and accurate deliveries with our advanced tracking system"
    },
    {
      title: "Route Efficiency",
      description: "Reduce fuel costs and delivery times with optimized routing algorithms"
    },
    {
      title: "Customer Transparency",
      description: "Build trust with real-time updates and delivery confirmations"
    },
    {
      title: "Streamlined Operations",
      description: "Simplify logistics management with integrated tools and workflows"
    }
  ];

  const demoItems = [
    "Scheduling & dispatch walkthrough",
    "Driver mobile app flows",
    "Reports & compliance dashboards",
    "Q & A with our logistics experts"
  ];

  const faqs = [
    {
      question: "What features does Fielduo offer for Courier Services?",
      answer: "Fielduo provides delivery scheduling and tracking, route optimization, driver management tools, real-time package tracking, customer notifications, and proof of delivery features specifically designed for courier and delivery services."
    },
    {
      question: "How can Courier Services businesses improve efficiency with field service management software?",
      answer: "Our software streamlines operations by automating scheduling, optimizing routes in real-time, tracking driver performance, monitoring package locations, and providing real-time communication between drivers and customers."
    },
    {
      question: "How does the software help with regulatory compliance for Courier Services?",
      answer: "Fielduo includes built-in compliance checklists, documentation management, audit trails, and reporting tools to ensure your delivery operations meet all regulatory requirements and industry standards."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Courier Services?",
      answer: "Yes, our platform features emergency scheduling capabilities with priority dispatching, real-time notifications, and rapid mobilization tools to handle urgent delivery needs and time-sensitive shipments."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Courier Services?",
      answer: "Our system provides complete asset management with real-time tracking of delivery vehicles, equipment maintenance schedules, package inventory levels, and resource allocation for optimal fleet management."
    },
    {
      question: "How does the software enhance customer communication for Courier Services?",
      answer: "Fielduo offers automated delivery notifications, real-time tracking updates, delay alerts, delivery confirmations, and direct messaging channels to keep customers informed throughout the delivery process."
    },
    {
      question: "What benefits do Courier Services clients see after implementing Fielduo?",
      answer: "Clients typically experience 35% reduction in delivery times, 25% improvement in fuel efficiency, 40% increase in on-time deliveries, and significant improvements in customer satisfaction scores."
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
          
          {/* Courier Elements */}
          {/* Delivery Truck */}
          <motion.div 
            className="absolute bottom-0 left-1/4 w-96 h-64"
            animate={{ 
              x: [0, 40, 0],
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            <div className="absolute bottom-24 left-1/4 w-48 h-24 bg-green-600 rounded-t-lg"></div>
            <div className="absolute bottom-24 left-1/4 w-48 h-4 bg-green-700"></div>
            <div className="absolute bottom-28 left-1/4 w-8 h-8 bg-gray-700 rounded-full"></div>
            
            {/* Truck Door */}
            <div className="absolute bottom-24 right-1/4 w-12 h-20 bg-gray-700"></div>
            
            {/* Wheels */}
            <div className="absolute bottom-0 left-1/4 w-12 h-12 bg-gray-700 rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-12 h-12 bg-gray-700 rounded-full"></div>
            
            {/* Packages in Truck */}
            <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-blue-400/50 rounded"></div>
            <div className="absolute bottom-40 left-1/3 w-10 h-10 bg-blue-400/50 rounded"></div>
            <div className="absolute bottom-32 left-2/5 w-8 h-8 bg-blue-400/50 rounded"></div>
          </motion.div>
          
          {/* Delivery Hub/Warehouse */}
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
            
            {/* Warehouse Doors */}
            <div className="absolute bottom-64 left-1/4 w-16 h-16 bg-gray-600"></div>
            <div className="absolute bottom-64 right-1/4 w-16 h-16 bg-gray-600"></div>
            
            {/* Packages in Warehouse */}
            <div className="absolute bottom-16 left-1/4 w-8 h-8 bg-blue-400/50 rounded"></div>
            <div className="absolute bottom-16 right-1/4 w-10 h-10 bg-blue-400/50 rounded"></div>
            <div className="absolute bottom-28 left-1/3 w-8 h-8 bg-blue-400/50 rounded"></div>
            
            {/* Loading Dock */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gray-600"></div>
          </motion.div>
          
          {/* Delivery Person with Package */}
          <motion.div 
            className="absolute top-1/3 left-1/3 w-24 h-48"
            animate={{ 
              x: [0, 20, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-16 bg-gray-600"></div>
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-12 h-24 bg-blue-600 rounded-t-lg"></div>
            
            {/* Package in Hand */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 translate-x-10 w-8 h-8 bg-blue-400/50 rounded"></div>
            
            {/* Animated Movement */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-gray-400/50 rounded-full"
              animate={{ 
                scaleX: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
          
          {/* Route Optimization Visualization */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64">
            {/* Map Background */}
            <div className="absolute inset-0 w-full h-full bg-gray-800/20 backdrop-blur-sm rounded-lg"></div>
            
            {/* Route Lines */}
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1 bg-green-500/50 rounded-full"></div>
            <div className="absolute top-1/4 left-1/4 w-1 h-1/2 bg-green-500/50 rounded-full"></div>
            <div className="absolute top-1/4 left-3/4 w-1/2 h-1 bg-green-500/50 rounded-full"></div>
            <div className="absolute top-3/4 left-3/4 w-1 h-1/2 bg-green-500/50 rounded-full"></div>
            
            {/* Location Points */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-500 rounded-full"></div>
            <div className="absolute top-1/4 left-3/4 w-4 h-4 bg-green-500 rounded-full"></div>
            <div className="absolute top-3/4 left-3/4 w-4 h-4 bg-green-500 rounded-full"></div>
            
            {/* Animated Truck on Route */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-6 h-4 bg-blue-500 rounded-full"
              animate={{ 
                left: ['25%', '75%', '75%'],
                top: ['25%', '25%', '75%']
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Animated Package Tracking */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/70 rounded-full"
              animate={{ 
                left: ['25%', '50%', '75%'],
                top: ['25%', '40%', '75%']
              }}
              transition={{ 
                duration: 8, 
                delay: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          {/* Floating Packages */}
          {[...Array(8)].map((_, i) => (
            <motion.div 
              key={i}
              className="absolute w-8 h-8 bg-blue-400/30 rounded"
              style={{
                top: `${20 + (i % 3) * 30}%`,
                left: `${10 + (i % 4) * 20}%`,
              }}
              animate={{ 
                y: [0, -15, 0],
                x: [0, (i % 2 === 0 ? 10 : -10), 0],
                rotate: [0, (i % 2 === 0 ? 5 : -5), 0]
              }}
              transition={{ 
                duration: 5 + i * 0.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Hero Content - No Box, Professional & Animated */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-start">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 tracking-wide text-left text-white drop-shadow-lg"
            initial={{ opacity: 0, x: -120, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 12, duration: 1 }}
            style={{ textShadow: '0 0 16px #fff, 0 0 32px #22c55e' }}
          >
            Courier Services
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-10 max-w-2xl text-left text-white/90"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Package delivery management & logistics solutions
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-start"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.button 
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300"
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
              Comprehensive tools designed specifically for courier and delivery services
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-green-500/50 transition-all duration-300"
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
              Transform your delivery operations and exceed customer expectations
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-green-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <span className="text-green-500">✓</span>
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
                        className={`px-4 py-2 font-medium ${activeTab === index ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400 hover:text-white'}`}
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
                    <div className="text-5xl mb-4">📦</div>
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
                    See how Fielduo can transform your courier services with a personalized demonstration tailored to your specific needs.
                  </p>
                  <motion.button 
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 w-full"
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
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
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
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
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
              Find answers to common questions about our Courier Services solution
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
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-green-900/20 to-teal-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Optimize Your Delivery Operations?</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join leading courier services who trust Fielduo for their logistics management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300"
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

export default CourierServices;
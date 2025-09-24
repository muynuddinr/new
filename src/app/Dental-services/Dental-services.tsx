"use client";

// pages/dental-services.tsx
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const DentalServices = () => {
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
    
    // Particle class representing dental elements
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
        const types = ['tooth', 'toothbrush', 'floss', 'sparkle'];
        this.type = types[Math.floor(Math.random() * types.length)];
        
        switch(this.type) {
          case 'tooth':
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'toothbrush':
            this.color = `rgba(14, 165, 233, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'floss':
            this.color = `rgba(103, 232, 249, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'sparkle':
            this.color = `rgba(254, 240, 138, ${Math.random() * 0.6 + 0.2})`;
            break;
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.spin;
        
        // Add movement based on type
        if (this.type === 'tooth') {
          this.speedX += (Math.random() - 0.5) * 0.02;
          this.speedY += (Math.random() - 0.5) * 0.02;
        } else if (this.type === 'toothbrush') {
          this.speedX += Math.sin(this.angle) * 0.03;
          this.speedY += Math.cos(this.angle) * 0.03;
        } else if (this.type === 'floss') {
          this.speedX += (Math.random() - 0.5) * 0.04;
          this.speedY += (Math.random() - 0.5) * 0.04;
        } else if (this.type === 'sparkle') {
          this.speedY -= 0.05; // Sparkles float upward
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
          case 'tooth':
            // Draw tooth
            ctx.beginPath();
            ctx.moveTo(0, -this.size * 1.5);
            ctx.bezierCurveTo(-this.size * 1.2, -this.size * 1.5, -this.size * 1.2, this.size * 0.5, 0, this.size * 1.5);
            ctx.bezierCurveTo(this.size * 1.2, this.size * 0.5, this.size * 1.2, -this.size * 1.5, 0, -this.size * 1.5);
            ctx.fill();
            break;
          case 'toothbrush':
            // Draw toothbrush
            ctx.fillRect(-this.size * 0.3, -this.size * 2, this.size * 0.6, this.size * 4);
            ctx.beginPath();
            ctx.moveTo(0, -this.size * 2);
            ctx.lineTo(-this.size * 0.8, -this.size * 2.8);
            ctx.lineTo(this.size * 0.8, -this.size * 2.8);
            ctx.closePath();
            ctx.fill();
            // Bristles
            for (let i = 0; i < 5; i++) {
              ctx.fillRect(-this.size * 0.6 + i * this.size * 0.3, -this.size * 2.2, this.size * 0.2, this.size * 0.5);
            }
            break;
          case 'floss':
            // Draw floss
            ctx.beginPath();
            ctx.moveTo(-this.size * 2, 0);
            ctx.lineTo(this.size * 2, 0);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.size * 0.3;
            ctx.stroke();
            break;
          case 'sparkle':
            // Draw sparkle
            ctx.beginPath();
            ctx.moveTo(0, -this.size * 1.5);
            ctx.lineTo(0, this.size * 1.5);
            ctx.moveTo(-this.size * 1.5, 0);
            ctx.lineTo(this.size * 1.5, 0);
            ctx.moveTo(-this.size * 1.1, -this.size * 1.1);
            ctx.lineTo(this.size * 1.1, this.size * 1.1);
            ctx.moveTo(-this.size * 1.1, this.size * 1.1);
            ctx.lineTo(this.size * 1.1, -this.size * 1.1);
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
      icon: "📅",
      title: "Patient Scheduling",
      description: "Efficiently manage appointments and optimize your dental practice schedule"
    },
    {
      icon: "📋",
      title: "Comprehensive Dental Records",
      description: "Maintain complete digital patient records with treatment history and notes"
    },
    {
      icon: "🛠️",
      title: "Equipment Maintenance",
      description: "Track and schedule maintenance for all dental equipment and tools"
    },
    {
      icon: "💼",
      title: "Insurance Claim Handling",
      description: "Streamline insurance processing and claims management"
    },
    {
      icon: "🦷",
      title: "Treatment Planning",
      description: "Create and track detailed treatment plans for each patient"
    },
    {
      icon: "✅",
      title: "Practice Compliance",
      description: "Ensure regulatory compliance with built-in tracking and reporting"
    }
  ];

  const benefits = [
    {
      title: "Accessible Care",
      description: "Extend your dental services to patients through mobile care options"
    },
    {
      title: "Comprehensive Records",
      description: "Maintain complete patient histories for better treatment outcomes"
    },
    {
      title: "Professional Delivery",
      description: "Enhance your practice with streamlined, professional service delivery"
    },
    {
      title: "Regulatory Compliance",
      description: "Stay compliant with dental industry regulations and requirements"
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
      question: "What features does Fielduo offer for Dental Services?",
      answer: "Fielduo provides patient scheduling, comprehensive dental records management, equipment maintenance tracking, insurance claim handling, treatment planning tools, and practice compliance features specifically designed for dental service providers."
    },
    {
      question: "How can Dental businesses improve efficiency with field service management software?",
      answer: "Our software streamlines operations by automating appointment scheduling, tracking patient records, managing equipment maintenance, optimizing insurance claims, and providing real-time communication between dental professionals and patients."
    },
    {
      question: "How does the software help with regulatory compliance for Dental Services?",
      answer: "Fielduo includes built-in compliance checklists, documentation management, audit trails, and reporting tools to ensure your dental practice meets all regulatory requirements and industry standards."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Dental Services?",
      answer: "Yes, our platform features emergency scheduling capabilities with priority dispatching, real-time notifications, and rapid mobilization tools to handle urgent dental situations and provide immediate care when needed."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Dental Services?",
      answer: "Our system provides complete equipment management with real-time tracking of dental instruments, maintenance schedules, sterilization records, and inventory levels for dental supplies and materials."
    },
    {
      question: "How does the software enhance customer communication for Dental Services?",
      answer: "Fielduo offers automated appointment reminders, treatment updates, insurance claim notifications, post-care instructions, and direct messaging channels to keep patients informed throughout their dental care journey."
    },
    {
      question: "What benefits do Dental clients see after implementing Fielduo?",
      answer: "Clients typically experience 45% reduction in no-show appointments, 30% improvement in equipment utilization, 40% faster insurance claim processing, and significant improvements in patient satisfaction scores."
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-cyan-900/20 to-teal-900/30"></div>
          
          {/* Mobile Dental Clinic */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-64">
            {/* Vehicle Body */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            
            {/* Wheels */}
            <div className="absolute bottom-0 left-1/4 w-12 h-12 bg-gray-700 rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-12 h-12 bg-gray-700 rounded-full"></div>
            
            {/* Cabin */}
            <div className="absolute bottom-32 left-1/4 w-1/2 h-16 bg-gray-700 rounded-t-lg"></div>
            
            {/* Windows */}
            <div className="absolute bottom-36 left-1/3 w-1/3 h-8 bg-blue-900/50 rounded-t-lg"></div>
            
            {/* Dental Cross Symbol */}
            <motion.div 
              className="absolute bottom-48 left-1/2 transform -translate-x-1/2 w-10 h-10"
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
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-2 bg-cyan-500 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-10 bg-cyan-500 rounded-full"></div>
            </motion.div>
            
            {/* Door */}
            <div className="absolute bottom-32 right-1/4 w-8 h-16 bg-gray-600"></div>
            
            {/* Animated Light */}
            <motion.div 
              className="absolute bottom-48 right-1/4 w-4 h-4 bg-cyan-500 rounded-full"
              animate={{ 
                opacity: [0.3, 1, 0.3],
                boxShadow: [
                  "0 0 5px rgba(6, 182, 212, 0.5)",
                  "0 0 20px rgba(6, 182, 212, 0.8)",
                  "0 0 5px rgba(6, 182, 212, 0.5)"
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
          
          {/* Animated Tooth with Sparkles */}
          <motion.div 
            className="absolute top-1/3 right-1/4 w-32 h-40"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Tooth */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-24 bg-white rounded-t-full"></div>
            
            {/* Sparkles around tooth */}
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                style={{
                  top: `${20 + (i % 2) * 20}%`,
                  left: `${(i % 3) * 50}%`,
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.3,
                  repeat: Infinity
                }}
              />
            ))}
          </motion.div>
          
          {/* Dental Tools */}
          <div className="absolute bottom-0 left-1/4 w-48 h-32">
            {/* Dental Mirror */}
            <div className="absolute bottom-16 left-1/4 w-2 h-16 bg-gray-400 rounded-t-full"></div>
            <div className="absolute bottom-16 left-1/4 w-8 h-8 bg-gray-500 rounded-full"></div>
            
            {/* Dental Probe */}
            <div className="absolute bottom-16 right-1/4 w-1 h-16 bg-gray-400"></div>
            <div className="absolute bottom-16 right-1/4 w-3 h-3 bg-gray-500 rounded-full"></div>
            
            {/* Animated Tool Movement */}
            <motion.div 
              className="absolute bottom-16 left-1/2 w-1 h-16 bg-gray-400"
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
        
  <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Dental Services
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Mobile dental care & oral health delivery
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button 
              className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-all duration-300"
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
              Comprehensive tools designed specifically for dental service providers
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300"
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
              Enhance patient care and practice efficiency
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                  <span className="text-cyan-500">✓</span>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Book a Live Demo</h2>
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
                        className={`px-4 py-2 font-medium ${activeTab === index ? 'text-cyan-500 border-b-2 border-cyan-500' : 'text-gray-400 hover:text-white'}`}
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
                    <div className="text-5xl mb-4">🦷</div>
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
                    See how Fielduo can transform your dental practice with a personalized demonstration tailored to your specific needs.
                  </p>
                  <motion.button 
                    className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-all duration-300 w-full"
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
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mb-6">
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
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mb-6">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h3>
              <p className="text-gray-300">
                Security is built-in with role-based permissions and full audit logs to protect your patient data and practice information.
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
              Find answers to common questions about our Dental Services solution
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
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Dental Practice?</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join leading dental service providers who trust Fielduo for their practice management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-all duration-300"
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

export default DentalServices;
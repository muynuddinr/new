"use client";
// pages/laboratory-services.tsx
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const LaboratoryServices = () => {
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
    
    // Particle class representing laboratory elements
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
        const types = ['molecule', 'cell', 'bacteria', 'chemical'];
        this.type = types[Math.floor(Math.random() * types.length)];
        
        switch(this.type) {
          case 'molecule':
            this.color = `rgba(139, 92, 246, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'cell':
            this.color = `rgba(59, 130, 246, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'bacteria':
            this.color = `rgba(236, 72, 153, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'chemical':
            this.color = `rgba(14, 165, 233, ${Math.random() * 0.6 + 0.2})`;
            break;
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.spin;
        
        // Add movement based on type
        if (this.type === 'molecule') {
          this.speedX += (Math.random() - 0.5) * 0.05;
          this.speedY += (Math.random() - 0.5) * 0.05;
        } else if (this.type === 'cell') {
          this.speedX += Math.sin(this.angle) * 0.05;
          this.speedY += Math.cos(this.angle) * 0.05;
        } else if (this.type === 'bacteria') {
          this.speedX += (Math.random() - 0.5) * 0.03;
          this.speedY += (Math.random() - 0.5) * 0.03;
        } else if (this.type === 'chemical') {
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
          case 'molecule':
            // Draw molecule
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.size * 1.5, 0, this.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(-this.size * 1.5, 0, this.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, this.size * 1.5, this.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, -this.size * 1.5, this.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'cell':
            // Draw cell
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
            ctx.fill();
            break;
          case 'bacteria':
            // Draw bacteria
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size * 1.5, this.size, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(-this.size * 1.5, 0);
            ctx.lineTo(-this.size * 2.5, 0);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 1;
            ctx.stroke();
            break;
          case 'chemical':
            // Draw chemical
            ctx.beginPath();
            ctx.moveTo(-this.size, 0);
            ctx.lineTo(this.size, 0);
            ctx.moveTo(0, -this.size);
            ctx.lineTo(0, this.size);
            ctx.moveTo(-this.size * 0.7, -this.size * 0.7);
            ctx.lineTo(this.size * 0.7, this.size * 0.7);
            ctx.moveTo(-this.size * 0.7, this.size * 0.7);
            ctx.lineTo(this.size * 0.7, -this.size * 0.7);
            ctx.stroke();
            break;
        }
        
        ctx.restore();
      }
    }
    
    // Create particles
    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000);
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
      icon: "🧪",
      title: "Sample Collection & Tracking",
      description: "Efficiently manage and track samples from collection to analysis"
    },
    {
      icon: "📋",
      title: "Standardized Protocols",
      description: "Ensure consistency with predefined testing protocols and procedures"
    },
    {
      icon: "🔗",
      title: "Chain of Custody Logs",
      description: "Maintain complete audit trails for sample handling and transfers"
    },
    {
      icon: "📊",
      title: "Results Management",
      description: "Organize, analyze, and securely store test results"
    },
    {
      icon: "🔬",
      title: "Equipment Tracking",
      description: "Monitor equipment usage, maintenance, and calibration schedules"
    },
    {
      icon: "✅",
      title: "Accreditation Compliance",
      description: "Stay compliant with industry standards and accreditation requirements"
    }
  ];

  const benefits = [
    {
      title: "Testing Accuracy",
      description: "Ensure precise and reliable test results with standardized processes"
    },
    {
      title: "Sample Integrity",
      description: "Maintain sample quality and prevent contamination throughout the process"
    },
    {
      title: "Regulatory Compliance",
      description: "Meet all regulatory requirements with automated compliance tracking"
    },
    {
      title: "Rapid Results Delivery",
      description: "Accelerate turnaround times with streamlined workflows"
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
      question: "What features does Fielduo offer for Laboratory Services?",
      answer: "Fielduo provides sample collection and tracking, standardized protocols, chain of custody logs, results management, equipment tracking, and accreditation compliance tools specifically designed for laboratory service providers."
    },
    {
      question: "How can Laboratory businesses improve efficiency with field service management software?",
      answer: "Our software streamlines operations by automating sample tracking, standardizing testing protocols, managing equipment maintenance, and providing real-time communication between field technicians and laboratory staff."
    },
    {
      question: "How does the software help with regulatory compliance for Laboratory Services?",
      answer: "Fielduo includes built-in compliance checklists, automated documentation, audit trails, and reporting tools to ensure your laboratory operations meet all regulatory and accreditation requirements."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Laboratory Services?",
      answer: "Yes, our platform features emergency scheduling capabilities with priority dispatching, real-time notifications, and rapid mobilization tools to handle urgent testing needs and time-sensitive samples."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Laboratory Services?",
      answer: "Our system provides complete equipment management with real-time tracking of laboratory instruments, calibration schedules, maintenance records, and inventory levels for testing supplies and reagents."
    },
    {
      question: "How does the software enhance customer communication for Laboratory Services?",
      answer: "Fielduo offers automated result notifications, sample status updates, digital report delivery, and secure communication channels to keep clients informed throughout the testing process."
    },
    {
      question: "What benefits do Laboratory clients see after implementing Fielduo?",
      answer: "Clients typically experience 50% reduction in sample tracking errors, 35% improvement in equipment utilization, 40% faster result delivery times, and significant improvements in compliance audit outcomes."
    }
  ];


  // Animation utility functions
  const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0) => ({
    animate: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  });

  const fadeIn = (
    direction: 'up' | 'down' | 'left' | 'right',
    type: 'tween' | 'spring' | 'keyframes' | 'inertia',
    delay: number,
    duration: number
  ) => {
    return {
      initial: {
        opacity: 0,
        y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
        x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      },
      animate: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          type,
          delay,
          duration,
        },
      },
    };
  };

  const textVariant = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } },
  });

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
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-indigo-900/30"></div>
          
          {/* Laboratory Equipment */}
          {/* Microscope */}
          <div className="absolute bottom-0 left-1/4 w-64 h-80">
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-8 h-40 bg-gray-700"></div>
            <div className="absolute bottom-72 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-gray-600"></div>
            <div className="absolute bottom-72 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-gray-600"></div>
            <div className="absolute bottom-88 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gray-600"></div>
            
            {/* Animated Light */}
            <motion.div 
              className="absolute bottom-88 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full"
              animate={{ 
                opacity: [0.3, 1, 0.3],
                boxShadow: [
                  "0 0 5px rgba(139, 92, 246, 0.5)",
                  "0 0 20px rgba(139, 92, 246, 0.8)",
                  "0 0 5px rgba(139, 92, 246, 0.5)"
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
          
          {/* Test Tubes */}
          <div className="absolute bottom-0 right-1/4 w-48 h-64">
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            
            {/* Test Tube 1 */}
            <div className="absolute bottom-16 left-1/4 w-6 h-32 bg-gray-700 rounded-t-full">
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-1/2 bg-blue-500/50 rounded-t-full"
                animate={{ 
                  height: ["50%", "70%", "50%"],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
            
            {/* Test Tube 2 */}
            <div className="absolute bottom-16 left-1/2 w-6 h-32 bg-gray-700 rounded-t-full">
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-1/3 bg-purple-500/50 rounded-t-full"
                animate={{ 
                  height: ["33%", "60%", "33%"],
                }}
                transition={{ 
                  duration: 3.5, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
            
            {/* Test Tube 3 */}
            <div className="absolute bottom-16 right-1/4 w-6 h-32 bg-gray-700 rounded-t-full">
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-2/3 bg-pink-500/50 rounded-t-full"
                animate={{ 
                  height: ["66%", "40%", "66%"],
                }}
                transition={{ 
                  duration: 4.5, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
          </div>
          
          {/* DNA Helix */}
          <motion.div 
            className="absolute top-1/3 left-1/3 w-32 h-64"
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-8 bg-purple-500/50 rounded-full"
                style={{
                  left: '50%',
                  top: `${i * 8}%`,
                  transform: `translateX(-50%) rotate(${i * 18}deg)`,
                  transformOrigin: 'center bottom'
                }}
              />
            ))}
          </motion.div>
        </div>
        
        {/* Glassmorphism Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer(0.1, 0.25)}
          >
            <motion.div variants={fadeIn('up', 'tween', 0.2, 0.75)} className="mb-6">
              <span className="text-blue-400 font-semibold inline-block px-3 py-1 bg-blue-900/30 rounded-full backdrop-blur-sm">Service Solutions</span>
            </motion.div>
            <motion.h1 variants={textVariant(0.3)} className="text-4xl md:text-6xl font-bold mb-6">
              Laboratory Services
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Mobile lab testing & on‑site analysis
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
              Comprehensive tools designed specifically for laboratory service providers
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
              Drive operational excellence and testing accuracy
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
                    <div className="text-5xl mb-4">🔬</div>
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
                    See how Fielduo can transform your laboratory services with a personalized demonstration tailored to your specific needs.
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
                Security is built-in with role-based permissions and full audit logs to protect your sensitive laboratory data.
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
              Find answers to common questions about our Laboratory Services solution
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
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Laboratory Services?</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join leading laboratory service providers who trust Fielduo for their field service management
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

export default LaboratoryServices;
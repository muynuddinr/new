"use client";

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Animation utility functions
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

const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0) => ({
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

const RestorationServices = () => {
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
    
    // Particle class representing water, fire, and mold
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color!: string;
      type: string;
      
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        
        // Assign type and color
        const types = ['water', 'fire', 'mold'];
        this.type = types[Math.floor(Math.random() * types.length)];
        
        switch(this.type) {
          case 'water':
            this.color = `rgba(59, 130, 246, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'fire':
            this.color = `rgba(239, 68, 68, ${Math.random() * 0.6 + 0.2})`;
            break;
          case 'mold':
            this.color = `rgba(16, 185, 129, ${Math.random() * 0.6 + 0.2})`;
            break;
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Add some movement based on type
        if (this.type === 'fire') {
          this.y -= 0.5; // Fire rises
          this.speedX += (Math.random() - 0.5) * 0.1;
        } else if (this.type === 'water') {
          this.y += 0.3; // Water falls
        } else if (this.type === 'mold') {
          this.speedX += (Math.random() - 0.5) * 0.05; // Mold spreads
        }
        
        if (this.x > canvas!.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas!.height || this.y < 0) this.speedY *= -1;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
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
      icon: "🚨",
      title: "24/7 Emergency Dispatch",
      description: "Round-the-clock emergency response for immediate disaster mitigation"
    },
    {
      icon: "📊",
      title: "Damage Assessment Tools",
      description: "Advanced tools for accurate damage evaluation and estimation"
    },
    {
      icon: "📱",
      title: "Equipment Tracking",
      description: "Real-time monitoring of restoration equipment and resources"
    },
    {
      icon: "📑",
      title: "Insurance Documentation",
      description: "Streamlined documentation for insurance claims and compliance"
    },
    {
      icon: "🔄",
      title: "Multi-phase Project Management",
      description: "Comprehensive management of complex restoration projects"
    },
    {
      icon: "💬",
      title: "Progress Communications",
      description: "Automated updates and communication throughout the restoration process"
    }
  ];

  const benefits = [
    {
      title: "Rapid Response",
      description: "Immediate dispatch to mitigate damage and reduce recovery time"
    },
    {
      title: "Thorough Documentation",
      description: "Comprehensive records for insurance claims and compliance"
    },
    {
      title: "Faster Claims",
      description: "Streamlined processes to accelerate insurance claim approvals"
    },
    {
      title: "Coordinated Delivery",
      description: "Seamless coordination between teams for efficient service delivery"
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
      question: "What features does Fielduo offer for Restoration Services?",
      answer: "Fielduo provides 24/7 emergency dispatch, damage assessment tools, equipment tracking, insurance documentation, multi-phase project management, and progress communications specifically designed for restoration service providers."
    },
    {
      question: "How can Restoration businesses improve efficiency with field service management software?",
      answer: "Our software streamlines operations by automating emergency dispatch, tracking equipment in real-time, managing complex multi-phase projects, and providing seamless communication between field teams and office staff."
    },
    {
      question: "How does the software help with regulatory compliance for Restoration Services?",
      answer: "Fielduo includes built-in compliance checklists for safety standards, environmental regulations, and documentation requirements to ensure your restoration projects meet all industry and government standards."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Restoration Services?",
      answer: "Yes, our platform features 24/7 emergency dispatch capabilities with priority routing, real-time technician tracking, and automated notifications to handle urgent restoration needs immediately."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Restoration Services?",
      answer: "Our system provides complete equipment management with real-time tracking of dehumidifiers, air movers, generators, and other restoration equipment to ensure optimal resource allocation."
    },
    {
      question: "How does the software enhance customer communication for Restoration Services?",
      answer: "Fielduo offers automated progress updates, photo documentation sharing, real-time timeline tracking, and direct communication channels to keep customers informed during stressful restoration situations."
    },
    {
      question: "What benefits do Restoration clients see after implementing Fielduo?",
      answer: "Clients typically experience 40% faster emergency response times, 35% improvement in equipment utilization, 50% reduction in documentation errors, and significant improvements in customer satisfaction during critical situations."
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-red-900/20 to-green-900/30"></div>
          
          {/* Disaster Elements */}
          {/* Water Effect */}
          <motion.div 
            className="absolute bottom-0 left-1/4 w-80 h-40 bg-gradient-to-t from-blue-500/30 to-transparent rounded-t-full"
            animate={{ 
              height: ["160px", "180px", "160px"],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Fire Effect */}
          <motion.div 
            className="absolute bottom-0 right-1/4 w-60 h-60 bg-gradient-to-t from-red-500/30 via-orange-500/20 to-yellow-500/10 rounded-t-full"
            animate={{ 
              height: ["240px", "280px", "240px"],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Mold Effect */}
          <motion.div 
            className="absolute top-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Damaged Building Silhouette */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-80">
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            <div className="absolute top-0 left-1/4 w-8 h-48 bg-gray-700"></div>
            <div className="absolute top-0 left-1/2 w-8 h-56 bg-gray-700"></div>
            <div className="absolute top-0 right-1/4 w-8 h-40 bg-gray-700"></div>
            
            {/* Broken Windows */}
            <div className="absolute top-10 left-1/4 w-6 h-8 bg-gray-900"></div>
            <div className="absolute top-10 left-1/2 w-6 h-8 bg-gray-900"></div>
            <div className="absolute top-10 right-1/4 w-6 h-8 bg-gray-900"></div>
            
            {/* Emergency Lights */}
            <motion.div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full"
              animate={{ 
                opacity: [0.3, 1, 0.3],
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
        </div>
        
        {/* Glassmorphism Content */}
         <motion.div 
          className="max-w-4xl mx-auto relative z-10 text-center px-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerContainer(0.1, 0.25)}
        >
          <motion.div variants={fadeIn('up', 'tween', 0.2, 0.75)} className="mb-6">
            <span className="text-blue-400 font-semibold inline-block px-3 py-1 bg-blue-900/30 rounded-full backdrop-blur-sm">Service Solutions</span>
          </motion.div>
          
          <motion.h1 variants={textVariant(0.3)} className="text-4xl md:text-6xl font-bold mb-6">
            Restoration Services
          </motion.h1>
          
          <motion.p 
            variants={fadeIn('up', 'tween', 0.4, 0.75)}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
          >
            Disaster restoration for water, fire, and mold
         </motion.p>
          
          <motion.div 
            variants={fadeIn('up', 'tween', 0.5, 0.75)}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg shadow-blue-500/20"
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
              Comprehensive tools designed specifically for restoration service providers
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
              Drive operational excellence in disaster recovery and restoration
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
                    <div className="text-5xl mb-4">🚨</div>
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
                    See how Fielduo can transform your restoration business with a personalized demonstration tailored to your specific needs.
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
              Find answers to common questions about our Restoration Services solution
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Restoration Services?</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join leading restoration service providers who trust Fielduo for their field service management
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

export default RestorationServices;
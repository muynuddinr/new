"use client";

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Animation helpers
const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

const EnvironmentalServices = () => {
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
    
    // Particle class representing environmental elements
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
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        
        // Assign type and color
        const types = ['water', 'air', 'soil'];
        this.type = types[Math.floor(Math.random() * types.length)];
        
        switch(this.type) {
          case 'water':
            this.color = `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2})`;
            break;
          case 'air':
            this.color = `rgba(165, 243, 252, ${Math.random() * 0.5 + 0.2})`;
            break;
          case 'soil':
            this.color = `rgba(120, 85, 72, ${Math.random() * 0.5 + 0.2})`;
            break;
        }
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Add movement based on type
        if (this.type === 'air') {
          this.y -= 0.3; // Air rises
          this.speedX += (Math.random() - 0.5) * 0.1;
        } else if (this.type === 'water') {
          this.y += 0.2; // Water flows down
        } else if (this.type === 'soil') {
          this.speedX += (Math.random() - 0.5) * 0.05; // Soil moves slowly
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
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000);
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
      title: "Testing Schedule & Results",
      description: "Plan, track, and document all environmental testing with automated scheduling and result tracking"
    },
    {
      icon: "📋",
      title: "Regulatory Compliance",
      description: "Stay up-to-date with changing regulations and ensure all operations meet compliance standards"
    },
    {
      icon: "🔄",
      title: "Remediation Projects",
      description: "Manage environmental cleanup projects from planning to completion with detailed tracking"
    },
    {
      icon: "🔗",
      title: "Sample Chain of Custody",
      description: "Maintain secure, auditable records of sample handling from collection to analysis"
    },
    {
      icon: "📊",
      title: "Compliance Reporting",
      description: "Generate comprehensive compliance reports for regulators with automated data collection"
    },
    {
      icon: "🚨",
      title: "Emergency Cleanup Plans",
      description: "Develop, access, and execute emergency response plans for environmental incidents"
    }
  ];

  const benefits = [
    {
      title: "Regulatory Alignment",
      description: "Ensure all operations meet current environmental regulations and standards"
    },
    {
      title: "Accurate Testing",
      description: "Improve data accuracy with standardized testing protocols and documentation"
    },
    {
      title: "Effective Remediation",
      description: "Streamline remediation projects with better planning and execution tracking"
    },
    {
      title: "Fast Emergency Action",
      description: "Respond quickly to environmental incidents with prepared plans and rapid mobilization"
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
      question: "What features does Fielduo offer for Environmental Services?",
      answer: "Fielduo provides testing schedule management, regulatory compliance tools, remediation project tracking, sample chain of custody documentation, compliance reporting, and emergency cleanup plans specifically designed for environmental service providers."
    },
    {
      question: "How can Environmental businesses improve efficiency with field service management software?",
      answer: "Our software streamlines operations by automating testing schedules, tracking compliance requirements, managing remediation projects, and providing real-time communication between field technicians and regulatory teams."
    },
    {
      question: "How does the software help with regulatory compliance for Environmental Services?",
      answer: "Fielduo includes built-in regulatory updates, automated compliance checklists, documentation management, and reporting tools to ensure your operations meet all environmental regulations and standards."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Environmental Services?",
      answer: "Yes, our platform features emergency cleanup plans with rapid mobilization capabilities, priority dispatching, and real-time notifications to handle environmental incidents immediately."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Environmental Services?",
      answer: "Our system provides complete equipment management with real-time tracking of testing equipment, remediation tools, and safety gear to ensure optimal resource allocation for environmental projects."
    },
    {
      question: "How does the software enhance customer communication for Environmental Services?",
      answer: "Fielduo offers automated compliance updates, testing result notifications, remediation progress reports, and direct communication channels to keep clients and regulators informed throughout the environmental service process."
    },
    {
      question: "What benefits do Environmental clients see after implementing Fielduo?",
      answer: "Clients typically experience 45% improvement in compliance rates, 30% reduction in testing documentation time, 40% faster remediation project completion, and significant improvements in regulatory relationships."
    }
  ];


  // Animation utility functions (copied from Restoration-services for consistency)
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-teal-900/20 to-emerald-900/30"></div>
          
          {/* Environmental Elements */}
          {/* Water Effect */}
          <motion.div 
            className="absolute bottom-0 left-1/4 w-80 h-32 bg-gradient-to-t from-blue-500/30 to-transparent rounded-t-full"
            animate={{ 
              height: ["128px", "160px", "128px"],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Air Effect */}
          <motion.div 
            className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-sky-300/10 to-cyan-200/5 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Soil Effect */}
          <motion.div 
            className="absolute bottom-0 right-1/3 w-96 h-40 bg-gradient-to-t from-amber-800/20 to-transparent rounded-t-full"
            animate={{ 
              height: ["160px", "180px", "160px"],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Environmental Testing Silhouette */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-64">
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            <div className="absolute top-0 left-1/4 w-6 h-48 bg-gray-700"></div>
            <div className="absolute top-0 left-1/2 w-6 h-56 bg-gray-700"></div>
            <div className="absolute top-0 right-1/4 w-6 h-40 bg-gray-700"></div>
            
            {/* Testing Equipment */}
            <div className="absolute top-10 left-1/4 w-8 h-6 bg-gray-600"></div>
            <div className="absolute top-10 left-1/2 w-8 h-6 bg-gray-600"></div>
            <div className="absolute top-10 right-1/4 w-8 h-6 bg-gray-600"></div>
            
            {/* Environmental Indicator Lights */}
            <motion.div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full"
              animate={{ 
                opacity: [0.3, 1, 0.3],
              }}
              transition={{ 
                duration: 2, 
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
            Environmental Services
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Testing, remediation, and compliance tracking
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
              Comprehensive tools designed specifically for environmental service providers
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
              Achieve regulatory compliance and operational excellence
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
                    <div className="text-5xl mb-4">🌿</div>
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
                    See how Fielduo can transform your environmental services with a personalized demonstration tailored to your specific needs.
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
                Security is built-in with role-based permissions and full audit logs to protect your sensitive environmental data.
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
              Find answers to common questions about our Environmental Services solution
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Enhance Your Environmental Services?</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join leading environmental service providers who trust Fielduo for their compliance and field service management
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

export default EnvironmentalServices;
"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, Variants } from 'framer-motion';

const ITServicePage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Animation variants defined directly in the component
  const fadeIn = (
    direction: 'up' | 'down' | 'left' | 'right',
    type: 'tween' | 'spring',
    delay: number,
    duration: number
  ): Variants => {
    return {
      hidden: {
        x: direction === 'left' || direction === 'right' ? (direction === 'left' ? -100 : 100) : 0,
        y: direction === 'up' || direction === 'down' ? (direction === 'up' ? -100 : 100) : 0,
        opacity: 0,
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type,
          delay,
          duration,
          ease: 'easeOut',
        },
      },
    };
  };

  const staggerContainer = (
    staggerChildren?: number,
    delayChildren?: number
  ): Variants => {
    return {
      hidden: {},
      show: {
        transition: {
          staggerChildren,
          delayChildren,
        },
      },
    };
  };

  const textVariant = (delay?: number): Variants => {
    return {
      hidden: {
        y: 50,
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          damping: 12,
          stiffness: 100,
          delay: delay || 0,
        },
      },
    };
  };

  const slideIn = (
    direction: 'up' | 'down' | 'left' | 'right',
    type: 'tween' | 'spring',
    delay: number,
    duration: number
  ): Variants => {
    return {
      hidden: {
        x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
        y: direction === 'up' ? '-100%' : direction === 'down' ? '100%' : 0,
      },
      show: {
        x: 0,
        y: 0,
        transition: {
          type,
          delay,
          duration,
          ease: 'easeOut',
        },
      },
    };
  };

  const features = [
    {
      title: "Help desk integration",
      description: "Seamlessly connect with your help desk systems for unified ticket management",
      icon: "💻"
    },
    {
      title: "IT asset CMDB tracking",
      description: "Maintain accurate configuration management databases for all IT assets",
      icon: "📊"
    },
    {
      title: "Remote diagnostics",
      description: "Diagnose issues remotely to reduce on-site visits and resolve problems faster",
      icon: "🔍"
    },
    {
      title: "Detailed service history",
      description: "Keep comprehensive records of all service activities for each client and asset",
      icon: "📝"
    },
    {
      title: "Parts & spares inventory",
      description: "Manage your inventory of parts and spares with real-time tracking",
      icon: "📦"
    },
    {
      title: "Security & compliance logs",
      description: "Maintain detailed security and compliance logs for auditing and reporting",
      icon: "🔒"
    }
  ];

  const benefits = [
    {
      title: "Faster resolution",
      description: "Reduce downtime with quicker diagnosis and resolution of IT issues",
      icon: "⚡"
    },
    {
      title: "Complete traceability",
      description: "Track every action from ticket creation to resolution with full audit trails",
      icon: "🔎"
    },
    {
      title: "Efficient dispatching",
      description: "Optimize technician assignments based on skills, location, and workload",
      icon: "🚀"
    },
    {
      title: "Security assurance",
      description: "Ensure compliance with security protocols and industry regulations",
      icon: "🛡️"
    }
  ];

  const demoPoints = [
    {
      title: "Scheduling & dispatch walkthrough",
      description: "Efficient resource allocation and intelligent task management",
      icon: "📅"
    },
    {
      title: "Technician mobile flows",
      description: "Seamless field operations with mobile access to information",
      icon: "📱"
    },
    {
      title: "Reports & compliance",
      description: "Comprehensive analytics and regulatory documentation",
      icon: "📈"
    },
    {
      title: "Q & A with our experts",
      description: "Direct access to our IT service specialists",
      icon: "👨‍💼"
    }
  ];

  const faqs = [
    {
      question: "What features does Fielduo offer for IT Services?",
      answer: "Fielduo provides comprehensive IT service solutions including help desk integration, IT asset CMDB tracking, remote diagnostics, detailed service history, parts inventory management, and security compliance logs."
    },
    {
      question: "How can IT businesses improve efficiency with field service management software?",
      answer: "Our software optimizes technician dispatching, automates ticket management, provides remote diagnostics, and offers real-time inventory tracking to reduce operational costs and improve service quality."
    },
    {
      question: "How does the software help with regulatory compliance for IT Services?",
      answer: "Fielduo automates compliance reporting, maintains detailed audit trails, tracks security protocols, and ensures adherence to industry regulations and IT governance standards."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for IT Services?",
      answer: "Yes, our platform includes emergency response features with priority scheduling, real-time notifications, and specialized workflows for critical IT issues and system outages."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for IT Services?",
      answer: "We provide complete IT asset lifecycle management, CMDB integration, inventory tracking for parts and spares, and maintenance scheduling for all IT equipment and infrastructure."
    },
    {
      question: "How does the software enhance customer communication for IT Services?",
      answer: "Fielduo offers customer portals, automated service notifications, detailed service reports, and real-time updates to keep clients informed about ticket status and resolution progress."
    },
    {
      question: "What benefits do IT Services clients see after implementing Fielduo?",
      answer: "Clients typically see reduced downtime, faster resolution times, improved asset tracking, enhanced security compliance, and more efficient resource allocation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <Head>
        <title>IT Service Solutions | Fielduo</title>
        <meta name="description" content="Field IT support for devices, networks, and infrastructure" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/30 via-purple-800/20 to-blue-900/30"></div>
          
          {/* Animated Circuit Board Effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-sm bg-indigo-400/10"
                style={{
                  width: `${Math.random() * 100 + 20}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
                animate={{
                  opacity: [0.1, 0.5, 0.1],
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
            
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`node-${i}`}
                className="absolute rounded-full bg-indigo-500/20"
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.7, 0.2],
                }}
                transition={{
                  duration: Math.random() * 4 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Centered Content */}
        <motion.div 
          className="max-w-4xl mx-auto relative z-10 text-center px-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerContainer(0.1, 0.25)}
        >
          <motion.div variants={fadeIn('up', 'tween', 0.2, 0.75)} className="mb-6">
            <span className="text-indigo-400 font-semibold inline-block px-3 py-1 bg-indigo-900/30 rounded-full backdrop-blur-sm">Service Solutions</span>
          </motion.div>
          
          <motion.h1 variants={textVariant(0.3)} className="text-4xl md:text-6xl font-bold mb-6">
            IT Service Solutions
          </motion.h1>
          
          <motion.p 
            variants={fadeIn('up', 'tween', 0.4, 0.75)}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
          >
            Field IT support for devices, networks, and infrastructure.
          </motion.p>
          
          <motion.div 
            variants={fadeIn('up', 'tween', 0.5, 0.75)}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg shadow-indigo-500/20"
            >
              Request a Demo
            </motion.button>
          </motion.div>
          
          {/* IT Icon */}
          <motion.div 
            variants={fadeIn('up', 'tween', 0.6, 0.75)}
            className="mt-16 flex justify-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 md:px-8 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-r from-transparent to-purple-500/5 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <motion.div 
          className="max-w-6xl mx-auto relative z-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.1, 0.25)}
        >
          <motion.div variants={textVariant(0.1)}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-400 mb-12 max-w-3xl">
              Comprehensive tools designed specifically for IT service professionals
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeIn('up', 'tween', 0.2 + index * 0.1, 0.75)}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 backdrop-blur-sm h-full"
              >
                <div className="text-4xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Business Benefits Section */}
      <section className="py-20 px-4 md:px-8 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-0 w-1/3 h-1/3 bg-gradient-to-r from-indigo-500/10 to-transparent blur-3xl"></div>
        </div>
        
        <motion.div 
          className="max-w-6xl mx-auto relative z-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.1, 0.25)}
        >
          <motion.div variants={textVariant(0.1)}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Business Benefits</h2>
            <p className="text-gray-400 mb-12 max-w-3xl">
              How our specialized solution transforms your IT service operations
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                variants={slideIn('right', 'tween', 0.2 + index * 0.1, 0.75)}
                className="flex"
              >
                <div className="mr-6 flex-shrink-0">
                  <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-500 rounded-xl text-2xl">
                    {benefit.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* What You'll See Section */}
      <section className="py-20 px-4 md:px-8 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/10 to-transparent blur-3xl"></div>
        </div>
        
        <motion.div 
          className="max-w-6xl mx-auto relative z-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.1, 0.25)}
        >
          <motion.div variants={textVariant(0.1)}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll See</h2>
            <p className="text-gray-400 mb-12 max-w-3xl">
              During your personalized demo, we'll walk you through the key aspects of our IT service solution:
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {demoPoints.map((point, index) => (
              <motion.div 
                key={index}
                variants={fadeIn('up', 'tween', 0.2 + index * 0.1, 0.75)}
                className="flex items-start p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50"
              >
                <div className="mr-4 flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-500 rounded-full text-2xl">
                    {point.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                  <p className="text-gray-400">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            variants={fadeIn('up', 'tween', 0.6, 0.75)}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold mb-6">Schedule Your Demo</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg shadow-indigo-500/20"
            >
              Book a Demo Now
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Fielduo Section */}
      <section className="py-20 px-4 md:px-8 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-500/10 to-transparent blur-3xl"></div>
        </div>
        
        <motion.div 
          className="max-w-6xl mx-auto relative z-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.1, 0.25)}
        >
          <motion.div variants={textVariant(0.1)}>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Choose Fielduo</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              variants={fadeIn('up', 'tween', 0.2, 0.75)}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm"
            >
              <div className="text-indigo-400 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-indigo-900/20 rounded-xl backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Quick Implementation</h3>
              <p className="text-gray-400">
                We help you start quickly by importing your data, checklists, and assets
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn('up', 'tween', 0.4, 0.75)}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm"
            >
              <div className="text-indigo-400 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-indigo-900/20 rounded-xl backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure & Compliant</h3>
              <p className="text-gray-400">
                Security is built-in with role-based permissions and full audit logs
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn('up', 'tween', 0.6, 0.75)}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm"
            >
              <div className="text-indigo-400 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-indigo-900/20 rounded-xl backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Dedicated Support</h3>
              <p className="text-gray-400">
                Our team of experts is always ready to help you succeed
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-purple-500/5 to-transparent blur-3xl"></div>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto relative z-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.1, 0.25)}
        >
          <motion.div variants={textVariant(0.1)}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 mb-12">
              Get answers about our IT service solutions
            </p>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                variants={fadeIn('up', 'tween', 0.2 + index * 0.05, 0.75)}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700/50 backdrop-blur-sm"
              >
                <button
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-800/50 transition duration-300"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>
                
                {activeFaq === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-gray-400"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/20 to-purple-900/20"></div>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10 py-16 px-8 rounded-2xl backdrop-blur-sm border border-gray-700/50"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.1, 0.25)}
        >
          <motion.h2 variants={textVariant(0.1)} className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your IT Service Business?
          </motion.h2>
          
          <motion.p 
            variants={fadeIn('up', 'tween', 0.2, 0.75)}
            className="text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Schedule a personalized demo to see how Fielduo can help your business work smarter, safer, and more efficiently.
          </motion.p>
          
          <motion.div 
            variants={fadeIn('up', 'tween', 0.3, 0.75)}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg shadow-indigo-500/20"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          <p>© {new Date().getFullYear()} Fielduo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ITServicePage;
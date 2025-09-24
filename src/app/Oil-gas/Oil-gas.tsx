"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, Variants } from 'framer-motion';

const OilGasPage = () => {
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
      title: "Asset lifecycle tracking",
      description: "Comprehensive tracking of assets from acquisition through maintenance to retirement",
      icon: "📊"
    },
    {
      title: "Safety & permit controls",
      description: "Digital safety protocols and automated permit management for compliance",
      icon: "🛡️"
    },
    {
      title: "Environmental monitoring",
      description: "Real-time environmental impact tracking and reporting capabilities",
      icon: "🌍"
    },
    {
      title: "Emergency response",
      description: "Rapid response protocols and emergency management workflows",
      icon: "🚨"
    },
    {
      title: "Critical PM schedules",
      description: "Preventive maintenance scheduling for critical equipment and infrastructure",
      icon: "⏱️"
    },
    {
      title: "Regulatory workflows",
      description: "Streamlined compliance with industry regulations and standards",
      icon: "📝"
    }
  ];

  const benefits = [
    {
      title: "Safety assurance",
      description: "Enhanced safety protocols and incident reduction across all operations",
      icon: "🛡️"
    },
    {
      title: "Environmental stewardship",
      description: "Improved environmental monitoring and sustainability reporting",
      icon: "🌱"
    },
    {
      title: "Operational reliability",
      description: "Increased uptime and reliability of critical equipment and processes",
      icon: "⚙️"
    },
    {
      title: "Standards compliance",
      description: "Streamlined compliance with industry regulations and standards",
      icon: "✅"
    }
  ];

  const demoPoints = [
    "Scheduling & dispatch walkthrough",
    "Technician mobile flows",
    "Reports & compliance",
    "Q & A with our experts"
  ];

  const faqs = [
    {
      question: "What features does Fielduo offer for Oil & Gas?",
      answer: "Fielduo provides comprehensive oil and gas solutions including asset lifecycle tracking, safety controls, environmental monitoring, emergency response, critical PM schedules, and regulatory workflows."
    },
    {
      question: "How can Oil & Gas businesses improve efficiency with field service management software?",
      answer: "Our software optimizes resource allocation, automates compliance reporting, streamlines maintenance workflows, and provides real-time monitoring to reduce operational costs and improve safety."
    },
    {
      question: "How does the software help with regulatory compliance for Oil & Gas?",
      answer: "Fielduo automates compliance reporting, tracks regulatory requirements, maintains detailed audit trails, and ensures adherence to oil and gas industry regulations and safety standards."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Oil & Gas?",
      answer: "Yes, our platform includes emergency response features with priority scheduling, real-time notifications, and specialized workflows for critical incidents and emergency situations."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Oil & Gas?",
      answer: "We provide complete asset lifecycle management, inventory tracking for equipment and parts, maintenance scheduling, and performance monitoring for all oil and gas infrastructure."
    },
    {
      question: "How does the software enhance customer communication for Oil & Gas?",
      answer: "Fielduo offers stakeholder portals, automated incident notifications, status updates, and real-time communication tools to keep all parties informed about operations and compliance."
    },
    {
      question: "What benefits do Oil & Gas clients see after implementing Fielduo?",
      answer: "Clients typically see improved safety compliance, enhanced environmental monitoring, increased operational reliability, better regulatory adherence, and more efficient resource allocation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <Head>
        <title>Oil & Gas Solutions | Fielduo</title>
        <meta name="description" content="Field operations for exploration, production, and maintenance" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-900/30 via-orange-800/20 to-yellow-900/30"></div>
          
          {/* Oil Rig Silhouette */}
          <div className="absolute bottom-0 left-1/4 w-64 h-96">
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-64 bg-gray-700"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-gray-600"></div>
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-gray-600"></div>
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-40 h-4 bg-gray-600"></div>
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-gray-600"></div>
            
            {/* Animated Flame */}
            <motion.div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-16 bg-gradient-to-t from-red-500 to-yellow-300 rounded-t-full"
              animate={{ 
                height: ["64px", "80px", "64px"],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-yellow-200 rounded-full opacity-70"></div>
            </motion.div>
          </div>
          
          {/* Pipeline */}
          <div className="absolute bottom-0 left-0 w-full h-4 bg-gray-800">
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
          </div>
          
          {/* Floating Oil Droplets */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-amber-400/20"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -Math.random() * 100 - 30, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 8 + 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
          
          {/* Animated Pipeline Flow */}
          <motion.div
            className="absolute bottom-4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
            animate={{ 
              scaleX: [0.8, 1, 0.8],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Drilling Rig */}
          <motion.div
            className="absolute bottom-24 right-1/4 w-32 h-80"
            animate={{ 
              height: ["320px", "340px", "320px"]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gray-800 to-gray-900 rounded-t-lg"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-80 bg-gray-700"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-600"></div>
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-40 h-4 bg-gray-600"></div>
            
            {/* Animated Drill */}
            <motion.div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-20 bg-gray-500"
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
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
            <span className="text-amber-400 font-semibold inline-block px-3 py-1 bg-amber-900/30 rounded-full backdrop-blur-sm">Industry Solutions</span>
          </motion.div>
          
          <motion.h1 variants={textVariant(0.3)} className="text-4xl md:text-6xl font-bold mb-6">
            Oil & Gas Solutions
          </motion.h1>
          
          <motion.p 
            variants={fadeIn('up', 'tween', 0.4, 0.75)}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
          >
            Field operations for exploration, production, and maintenance.
          </motion.p>
          
          <motion.div 
            variants={fadeIn('up', 'tween', 0.5, 0.75)}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg shadow-amber-500/20"
            >
              Book a Live Demo
            </motion.button>
          </motion.div>
          
          {/* Oil & Gas Icon */}
          <motion.div 
            variants={fadeIn('up', 'tween', 0.6, 0.75)}
            className="mt-16 flex justify-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.757l-1.069 1.069a8 8 0 111.414 1.414l1.069-1.069zm-6.464-6.464a4 4 0 00-5.656 0l-1.069 1.069a4 4 0 005.656 0l1.069-1.069z" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 md:px-8 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-r from-transparent to-orange-500/5 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
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
              Comprehensive tools designed specifically for oil and gas operations
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeIn('up', 'tween', 0.2 + index * 0.1, 0.75)}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700/50 hover:border-amber-500/50 transition-all duration-300 backdrop-blur-sm h-full"
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
          <div className="absolute top-1/3 left-0 w-1/3 h-1/3 bg-gradient-to-r from-amber-500/10 to-transparent blur-3xl"></div>
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
              Drive operational excellence and industry compliance
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
                  <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-amber-600 to-orange-500 rounded-xl text-2xl">
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
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent blur-3xl"></div>
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
              Experience our platform through a comprehensive demonstration
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {demoPoints.map((point, index) => (
              <motion.div 
                key={index}
                variants={fadeIn('up', 'tween', 0.2 + index * 0.1, 0.75)}
                className="flex items-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50"
              >
                <div className="mr-4 flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-amber-600 to-orange-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl">{point}</h3>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            variants={fadeIn('up', 'tween', 0.6, 0.75)}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold mb-6">Schedule a Demo</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg shadow-amber-500/20"
            >
              Book a Demo Now
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Fielduo Section */}
      <section className="py-20 px-4 md:px-8 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-amber-500/10 to-transparent blur-3xl"></div>
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
              <div className="text-amber-400 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-amber-900/20 rounded-xl backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Quick Implementation</h3>
              <p className="text-gray-400">
                We help you start quickly by importing your data, checklists, and assets.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn('up', 'tween', 0.4, 0.75)}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm"
            >
              <div className="text-amber-400 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-amber-900/20 rounded-xl backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure & Compliant</h3>
              <p className="text-gray-400">
                Security is built-in with role-based permissions and full audit logs.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn('up', 'tween', 0.6, 0.75)}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm"
            >
              <div className="text-amber-400 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-amber-900/20 rounded-xl backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Dedicated Support</h3>
              <p className="text-gray-400">
                Our team of experts is always ready to help you succeed.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-orange-500/5 to-transparent blur-3xl"></div>
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
              Find answers to common questions about our Oil & Gas solution
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
                      className="h-6 w-6 text-amber-400"
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
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-900/20 to-orange-900/20"></div>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10 py-16 px-8 rounded-2xl backdrop-blur-sm border border-gray-700/50"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.1, 0.25)}
        >
          <motion.h2 variants={textVariant(0.1)} className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Oil & Gas Operations?
          </motion.h2>
          
          <motion.p 
            variants={fadeIn('up', 'tween', 0.2, 0.75)}
            className="text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Schedule a personalized demo to see how Fielduo can help your operations work smarter, safer, and more efficiently.
          </motion.p>
          
          <motion.div 
            variants={fadeIn('up', 'tween', 0.3, 0.75)}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg shadow-amber-500/20"
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

export default OilGasPage;
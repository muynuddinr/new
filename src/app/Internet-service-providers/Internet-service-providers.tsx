"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, Variants } from 'framer-motion';

const InternetServiceProviderPage = () => {
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
      title: "Network installation & config",
      description: "Complete management of network installation and configuration processes",
      icon: "📡"
    },
    {
      title: "Bandwidth & speed monitoring",
      description: "Real-time monitoring of network performance and bandwidth utilization",
      icon: "📊"
    },
    {
      title: "Troubleshooting playbooks",
      description: "Standardized troubleshooting procedures for common network issues",
      icon: "🔧"
    },
    {
      title: "Service activation flows",
      description: "Streamlined workflows for activating new services and customers",
      icon: "⚡"
    },
    {
      title: "Support ticketing",
      description: "Integrated ticketing system for customer support and issue resolution",
      icon: "🎫"
    },
    {
      title: "Infrastructure upgrades",
      description: "Planning and execution of network infrastructure upgrades and expansions",
      icon: "🔄"
    }
  ];

  const benefits = [
    {
      title: "Network reliability",
      description: "Enhanced network uptime and reliability through proactive monitoring",
      icon: "📶"
    },
    {
      title: "Install efficiency",
      description: "Faster installation times with optimized scheduling and workflows",
      icon: "⚡"
    },
    {
      title: "Faster support",
      description: "Reduced response times with streamlined support processes",
      icon: "🛠️"
    },
    {
      title: "Performance optimization",
      description: "Improved network performance through continuous monitoring and optimization",
      icon: "📈"
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
      question: "What features does Fielduo offer for Internet Service Providers?",
      answer: "Fielduo provides comprehensive ISP solutions including network installation, bandwidth monitoring, troubleshooting playbooks, service activation, support ticketing, and infrastructure upgrades."
    },
    {
      question: "How can ISPs improve efficiency with field service management software?",
      answer: "Our software optimizes technician dispatching, automates network monitoring, streamlines troubleshooting processes, and provides real-time performance data to reduce operational costs and improve service quality."
    },
    {
      question: "How does the software help with regulatory compliance for ISPs?",
      answer: "Fielduo automates compliance reporting, tracks regulatory requirements, maintains detailed audit trails, and ensures adherence to telecommunications industry standards and regulations."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for ISPs?",
      answer: "Yes, our platform includes emergency response features with priority scheduling, real-time notifications, and specialized workflows for network outages and critical infrastructure failures."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for ISPs?",
      answer: "We provide complete network equipment lifecycle management, inventory tracking for components, maintenance scheduling, and performance monitoring for all ISP infrastructure."
    },
    {
      question: "How does the software enhance customer communication for ISPs?",
      answer: "Fielduo offers customer portals, automated service notifications, support status updates, and real-time communication tools to keep customers informed about their service status and resolution progress."
    },
    {
      question: "What benefits do ISP clients see after implementing Fielduo?",
      answer: "Clients typically see improved network reliability, faster installation times, better customer support, enhanced performance monitoring, and more efficient resource allocation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <Head>
        <title>Internet Service Provider Solutions | Fielduo</title>
        <meta name="description" content="ISP field service for installs, support, and upgrades" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/30 via-indigo-800/20 to-purple-900/30"></div>
          
          {/* Animated Network Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Network Nodes */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-blue-400/20"
                style={{
                  width: `${Math.random() * 12 + 6}px`,
                  height: `${Math.random() * 12 + 6}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -Math.random() * 80 - 20, 0],
                  x: [0, Math.random() * 40 - 20, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: Math.random() * 8 + 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
            
            {/* Connection Lines */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
                animate={{
                  opacity: [0.1, 0.6, 0.1],
                }}
                transition={{
                  duration: Math.random() * 5 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
            
            {/* Signal Towers */}
            <div className="absolute bottom-0 left-1/4 w-16 h-40">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-32 bg-gray-600"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gray-500"></div>
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-400"
                  style={{ top: `${8 + i * 8}px` }}
                />
              ))}
              
              {/* Animated Signal Waves */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`wave-${i}`}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${-30 + i * 30}deg)`
                  }}
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                    scaleX: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
            
            <div className="absolute bottom-0 right-1/4 w-16 h-48">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-40 bg-gray-600"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-gray-500"></div>
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-400"
                  style={{ top: `${6 + i * 8}px` }}
                />
              ))}
              
              {/* Animated Signal Waves */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`wave2-${i}`}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${-30 + i * 30}deg)`
                  }}
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                    scaleX: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    duration: 2.5 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.4
                  }}
                />
              ))}
            </div>
            
            {/* Data Packets Flowing */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`packet-${i}`}
                className="absolute w-3 h-3 rounded-full bg-blue-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -Math.random() * 150 - 50, 0],
                  x: [0, Math.random() * 100 - 50, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 6 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-300"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: Math.random() * 1
                  }}
                />
              </motion.div>
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
            <span className="text-blue-400 font-semibold inline-block px-3 py-1 bg-blue-900/30 rounded-full backdrop-blur-sm">Connectivity Solutions</span>
          </motion.div>
          
          <motion.h1 variants={textVariant(0.3)} className="text-4xl md:text-6xl font-bold mb-6">
            Internet Service Provider Solutions
          </motion.h1>
          
          <motion.p 
            variants={fadeIn('up', 'tween', 0.4, 0.75)}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
          >
            Comprehensive field service management for ISPs, from network installation to customer support and infrastructure upgrades.
          </motion.p>
          
          <motion.div variants={fadeIn('up', 'tween', 0.5, 0.75)}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
              Request a Demo
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer(0.1, 0.25)}
            className="text-center mb-16"
          >
            <motion.h2 variants={textVariant(0.2)} className="text-3xl md:text-4xl font-bold mb-4">
              Key Features for ISPs
            </motion.h2>
            <motion.p variants={textVariant(0.3)} className="text-gray-400 max-w-2xl mx-auto">
              Our comprehensive solution addresses the unique challenges of Internet Service Providers
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer(0.1, 0.25)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 'tween', 0.2 * index, 0.5)}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer(0.1, 0.25)}
            className="text-center mb-16"
          >
            <motion.h2 variants={textVariant(0.2)} className="text-3xl md:text-4xl font-bold mb-4">
              Benefits for Your ISP
            </motion.h2>
            <motion.p variants={textVariant(0.3)} className="text-gray-400 max-w-2xl mx-auto">
              Transform your operations with our specialized field service management platform
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer(0.1, 0.25)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 'tween', 0.2 * index, 0.5)}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer(0.1, 0.25)}
            className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl p-8 md:p-12 border border-blue-800/30"
          >
            <motion.div variants={textVariant(0.2)} className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Schedule a Demo</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                See how Fielduo can transform your ISP operations with a personalized demonstration
              </p>
            </motion.div>

            <motion.div variants={staggerContainer(0.1, 0.25)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">What you'll see:</h3>
                <ul className="space-y-3">
                  {demoPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      variants={fadeIn('right', 'tween', 0.2 * index, 0.5)}
                      className="flex items-start"
                    >
                      <span className="text-blue-400 mr-2">✓</span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div variants={fadeIn('left', 'tween', 0.4, 0.75)}>
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Request Your Demo</h3>
                  <form className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Company Name"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                    >
                      Schedule Demo
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer(0.1, 0.25)}
            className="text-center mb-16"
          >
            <motion.h2 variants={textVariant(0.2)} className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={textVariant(0.3)} className="text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our ISP solutions
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer(0.1, 0.25)}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 'tween', 0.2 * index, 0.5)}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden"
              >
                <button
                  className="w-full text-left p-6 flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <span className="text-blue-400 text-xl">
                    {activeFaq === index ? '−' : '+'}
                  </span>
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
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InternetServiceProviderPage;
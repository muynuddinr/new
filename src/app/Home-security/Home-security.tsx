"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, Variants } from 'framer-motion';

const HomeSecurityPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Animation variants
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
      title: "System install management",
      description: "Streamlined process for planning and executing security system installations",
      icon: "🔧"
    },
    {
      title: "Monitoring integrations",
      description: "Seamless connections with monitoring centers and security systems",
      icon: "📡"
    },
    {
      title: "Maintenance & testing",
      description: "Scheduled maintenance and testing protocols for system reliability",
      icon: "🔍"
    },
    {
      title: "Customer training modules",
      description: "Comprehensive training resources for customers to use their security systems",
      icon: "👨‍🏫"
    },
    {
      title: "Alarm response routing",
      description: "Efficient routing of alarm responses to appropriate personnel",
      icon: "🚨"
    },
    {
      title: "Standards compliance",
      description: "Ensure all installations meet industry standards and regulations",
      icon: "✅"
    }
  ];

  const benefits = [
    {
      title: "Quality installations",
      description: "Consistent, high-quality security system installations",
      icon: "⭐"
    },
    {
      title: "System reliability",
      description: "Enhanced reliability through proper maintenance and monitoring",
      icon: "🛡️"
    },
    {
      title: "Customer safety",
      description: "Improved safety for customers with responsive security systems",
      icon: "🔒"
    },
    {
      title: "Industry compliance",
      description: "Adherence to security industry regulations and standards",
      icon: "📋"
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
      question: "What features does Fielduo offer for Home Security?",
      answer: "Fielduo provides comprehensive home security solutions including system install management, monitoring integrations, maintenance & testing, customer training modules, alarm response routing, and standards compliance."
    },
    {
      question: "How can Home Security businesses improve efficiency with field service management software?",
      answer: "Our software optimizes technician scheduling, streamlines installation processes, automates maintenance reminders, and provides real-time monitoring to improve operational efficiency and customer satisfaction."
    },
    {
      question: "How does the software help with regulatory compliance for Home Security?",
      answer: "Fielduo ensures compliance by tracking regulatory requirements, maintaining detailed installation records, automating compliance reporting, and providing audit trails for all security system activities."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Home Security?",
      answer: "Yes, our platform includes emergency response features with priority scheduling for alarm activations, rapid dispatch capabilities, and specialized workflows for urgent security situations."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Home Security?",
      answer: "We provide complete lifecycle management for security equipment, inventory tracking for components, maintenance scheduling, and performance monitoring for all security system assets."
    },
    {
      question: "How does the software enhance customer communication for Home Security?",
      answer: "Fielduo offers customer portals, automated security alerts, maintenance notifications, training resources, and real-time communication tools to keep customers informed about their security systems."
    },
    {
      question: "What benefits do Home Security clients see after implementing Fielduo?",
      answer: "Clients typically see improved installation quality, enhanced system reliability, better customer safety, ensured industry compliance, and more efficient resource allocation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <Head>
        <title>Home Security Solutions | Fielduo</title>
        <meta name="description" content="Residential security installs and monitoring service" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          
          {/* Animated Security Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Security Icons */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -Math.random() * 60 - 20, 0],
                  x: [0, Math.random() * 40 - 20, 0],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: Math.random() * 8 + 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              >
                {i % 4 === 0 ? "🔒" : i % 4 === 1 ? "🛡️" : i % 4 === 2 ? "🚨" : "📡"}
              </motion.div>
            ))}
            
            {/* Security Grid */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 20 }).map((_, row) => (
                Array.from({ length: 20 }).map((_, col) => (
                  <div
                    key={`${row}-${col}`}
                    className="absolute w-px h-px bg-green-500"
                    style={{
                      left: `${col * 5}%`,
                      top: `${row * 5}%`,
                    }}
                  />
                ))
              ))}
            </div>
            
            {/* Animated Security Camera */}
            <div className="absolute top-1/4 right-1/4 w-24 h-24">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-red-500 animate-pulse"></div>
                </div>
                <motion.div
                  className="absolute w-20 h-1 bg-gray-600"
                  style={{ transformOrigin: 'left center' }}
                  animate={{ rotate: [0, 45, 0, -45, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              </div>
            </div>
            
            {/* Security Shield */}
            <div className="absolute bottom-1/4 left-1/4 w-32 h-32">
              <motion.div
                className="w-full h-full flex items-center justify-center text-6xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                🛡️
              </motion.div>
            </div>
            
            {/* Scanning Lines */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`scan-${i}`}
                className="absolute h-0.5 bg-gradient-to-r from-transparent via-green-500/30 to-transparent"
                style={{
                  width: '100%',
                  top: `${i * 20}%`,
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  y: [0, 100, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 1.5,
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
            <span className="text-green-400 font-semibold inline-block px-3 py-1 bg-green-900/30 rounded-full backdrop-blur-sm">Security Solutions</span>
          </motion.div>
          
          <motion.h1 variants={textVariant(0.3)} className="text-4xl md:text-6xl font-bold mb-6">
            Home Security
          </motion.h1>
          
          <motion.p 
            variants={fadeIn('up', 'tween', 0.4, 0.75)}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
          >
            Residential security installs and monitoring service
          </motion.p>
          
          <motion.div variants={fadeIn('up', 'tween', 0.5, 0.75)}>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
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
              Key Features
            </motion.h2>
            <motion.p variants={textVariant(0.3)} className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive tools for managing home security installations and services
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
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all duration-300"
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
              Business Benefits
            </motion.h2>
            <motion.p variants={textVariant(0.3)} className="text-gray-400 max-w-2xl mx-auto">
              Transform your home security business with our specialized platform
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
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all duration-300"
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
            className="bg-gradient-to-br from-green-900/30 to-gray-900/30 rounded-2xl p-8 md:p-12 border border-green-800/30"
          >
            <motion.div variants={textVariant(0.2)} className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll See</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Experience a personalized demonstration of our home security solutions
              </p>
            </motion.div>

            <motion.div variants={staggerContainer(0.1, 0.25)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Demo Highlights:</h3>
                <ul className="space-y-3">
                  {demoPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      variants={fadeIn('right', 'tween', 0.2 * index, 0.5)}
                      className="flex items-start"
                    >
                      <span className="text-green-400 mr-2">✓</span>
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
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Company Name"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
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

      {/* Why Choose Fielduo Section */}
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
              Why Choose Fielduo
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer(0.1, 0.25)}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700"
          >
            <motion.div variants={textVariant(0.2)} className="text-lg text-gray-300 leading-relaxed">
              <p className="mb-4">
                We help you start quickly by importing your data, checklists, and assets. Security is built-in with role-based permissions and full audit logs.
              </p>
              <p>
                Our platform is designed specifically for home security providers, with features that address your unique challenges and help you deliver exceptional service to your customers.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn('up', 'tween', 0.4, 0.75)} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-semibold mb-1">Quick Setup</h3>
                  <p className="text-sm text-gray-400">Get started in days, not weeks</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl mb-2">🔒</div>
                  <h3 className="font-semibold mb-1">Enterprise Security</h3>
                  <p className="text-sm text-gray-400">Role-based permissions and audit logs</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl mb-2">📊</div>
                  <h3 className="font-semibold mb-1">Data Insights</h3>
                  <p className="text-sm text-gray-400">Make data-driven decisions</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer(0.1, 0.25)}
            className="text-center mb-16"
          >
            <motion.h2 variants={textVariant(0.2)} className="text-3xl md:text-4xl font-bold mb-4">
              Home Security — FAQs
            </motion.h2>
            <motion.p variants={textVariant(0.3)} className="text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our home security solutions
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
                  <span className="text-green-400 text-xl">
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

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold">Fielduo</div>
              <p className="text-gray-500 mt-2">Field Service Management for Home Security</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Fielduo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeSecurityPage;
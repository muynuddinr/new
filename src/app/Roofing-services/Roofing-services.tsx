"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, Variants } from 'framer-motion';

const RoofingServicesPage = () => {
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
      title: "Project Tracking",
      description: "Monitor all roofing projects in real-time with comprehensive tracking tools",
      icon: "📊"
    },
    {
      title: "Materials Management",
      description: "Efficiently manage roofing materials, inventory, and procurement",
      icon: "📦"
    },
    {
      title: "Weather Integration",
      description: "Plan projects around weather conditions with real-time forecasts",
      icon: "🌦️"
    },
    {
      title: "Quality Inspections",
      description: "Conduct thorough quality checks and document inspection results",
      icon: "✅"
    },
    {
      title: "Warranty Tracking",
      description: "Manage and track all warranty information for materials and workmanship",
      icon: "📑"
    },
    {
      title: "Customer Communication",
      description: "Streamlined communication tools to keep clients informed throughout projects",
      icon: "📞"
    }
  ];

  const benefits = [
    {
      title: "Efficient Projects",
      description: "Complete roofing projects faster with optimized workflows and resource allocation",
      icon: "⚡"
    },
    {
      title: "Quality Assurance",
      description: "Maintain high standards with systematic inspection and documentation processes",
      icon: "🔍"
    },
    {
      title: "Weather-Smart Plans",
      description: "Reduce delays and protect materials with intelligent weather-aware scheduling",
      icon: "🌤️"
    },
    {
      title: "Satisfied Clients",
      description: "Enhance customer experience with transparent communication and quality results",
      icon: "😊"
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
      question: "What features does Fielduo offer for Roofing Services?",
      answer: "Fielduo provides comprehensive roofing solutions including project tracking, materials management, weather integration, quality inspections, warranty tracking, and customer communication tools."
    },
    {
      question: "How can Roofing businesses improve efficiency with field service management software?",
      answer: "Our software optimizes project scheduling, streamlines material procurement, provides real-time weather updates, automates inspection processes, and enhances customer communication to improve operational efficiency."
    },
    {
      question: "How does the software help with regulatory compliance for Roofing Services?",
      answer: "Fielduo ensures compliance by tracking regulatory requirements, maintaining detailed inspection records, automating compliance reporting, and providing audit trails for all roofing project activities."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Roofing Services?",
      answer: "Yes, our platform includes emergency response features with priority scheduling for urgent roof repairs, rapid dispatch capabilities, and specialized workflows for weather-related emergencies."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Roofing Services?",
      answer: "We provide complete lifecycle management for roofing equipment, inventory tracking for materials, maintenance scheduling, and performance monitoring for all roofing assets."
    },
    {
      question: "How does the software enhance customer communication for Roofing Services?",
      answer: "Fielduo offers customer portals, automated project updates, weather notifications, inspection reports, and real-time communication tools to keep customers informed about their roofing projects."
    },
    {
      question: "What benefits do Roofing clients see after implementing Fielduo?",
      answer: "Clients typically see improved project completion times, better material management, reduced weather-related delays, enhanced quality control, and increased customer satisfaction."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <Head>
        <title>Roofing Services | Fielduo</title>
        <meta name="description" content="Roof install & repair project management" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          
          {/* Animated Roofing Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Roofing Icons */}
            {[...Array(15)].map((_, i) => (
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
                {i % 5 === 0 ? "🏠" : i % 5 === 1 ? "🔨" : i % 5 === 2 ? "🌧️" : i % 5 === 3 ? "📋" : "🛠️"}
              </motion.div>
            ))}
            
            {/* Raindrops */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`raindrop-${i}`}
                className="absolute w-1 h-4 bg-blue-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 100 + 50, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 1,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
            
            {/* House with Roof */}
            <div className="absolute top-1/3 left-1/4 w-32 h-32">
              <div className="absolute bottom-0 w-full h-16 bg-gray-800"></div>
              <div className="absolute bottom-16 left-0 w-0 h-0 border-l-[64px] border-l-transparent border-b-[32px] border-b-gray-700 border-r-[64px] border-r-transparent"></div>
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full"
                animate={{ 
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
            
            {/* Roofing Tools */}
            <div className="absolute bottom-1/3 right-1/4 w-32 h-32 flex items-center justify-center">
              <motion.div
                className="text-6xl"
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                🔨
              </motion.div>
            </div>
            
            {/* Weather Clouds */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`cloud-${i}`}
                className="absolute w-24 h-12 bg-gray-700/50 rounded-full"
                style={{
                  left: `${i * 30 + 10}%`,
                  top: `${10 + i * 15}%`,
                }}
                animate={{ 
                  x: [0, 20, 0],
                }}
                transition={{ 
                  duration: 15 + i * 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <div className="absolute -top-4 left-4 w-16 h-16 bg-gray-700/50 rounded-full"></div>
                <div className="absolute -top-2 right-4 w-12 h-12 bg-gray-700/50 rounded-full"></div>
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
            <span className="text-amber-500 font-semibold inline-block px-3 py-1 bg-amber-900/30 rounded-full backdrop-blur-sm">Construction Solutions</span>
          </motion.div>
          
          <motion.h1 variants={textVariant(0.3)} className="text-4xl md:text-6xl font-bold mb-6">
            Roofing Services
          </motion.h1>
          
          <motion.p 
            variants={fadeIn('up', 'tween', 0.4, 0.75)}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
          >
            Roof install & repair project management
          </motion.p>
          
          <motion.div variants={fadeIn('up', 'tween', 0.5, 0.75)} className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
              Explore Features
            </button>
            <button className="bg-transparent border-2 border-amber-600 hover:bg-amber-600/10 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              See Demo
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
              Comprehensive tools designed specifically for roofing contractors
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
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-amber-500 transition-all duration-300"
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
              Transform your roofing business operations and outcomes
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
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-amber-500 transition-all duration-300"
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
            className="bg-gradient-to-br from-amber-900/30 to-gray-900/30 rounded-2xl p-8 md:p-12 border border-amber-800/30"
          >
            <motion.div variants={textVariant(0.2)} className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll See</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Experience our platform through a comprehensive demonstration
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
                      <span className="text-amber-500 mr-2">✓</span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div variants={fadeIn('left', 'tween', 0.4, 0.75)}>
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">Schedule a Demo</h3>
                  <form className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Company Name"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
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
            className="space-y-8"
          >
            <motion.div variants={fadeIn('right', 'tween', 0.2, 0.75)} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <div className="flex items-start">
                <div className="text-3xl mr-4">⚡</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Rapid Implementation</h3>
                  <p className="text-gray-300">We help you start quickly by importing your data, checklists, and assets with minimal disruption to your operations.</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn('left', 'tween', 0.4, 0.75)} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <div className="flex items-start">
                <div className="text-3xl mr-4">🔒</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Enterprise-Grade Security</h3>
                  <p className="text-gray-300">Security is built-in with role-based permissions and full audit logs to protect your business data.</p>
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
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={textVariant(0.3)} className="text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our Roofing Services solution
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
                  <span className="text-amber-500 text-xl">
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

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-900/20 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerContainer(0.1, 0.25)}
          >
            <motion.h2 variants={textVariant(0.2)} className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Roofing Business?
            </motion.h2>
            <motion.p variants={textVariant(0.3)} className="text-gray-300 max-w-2xl mx-auto mb-10">
              Join leading roofing contractors who trust Fielduo for their field service management
            </motion.p>
            <motion.div variants={fadeIn('up', 'tween', 0.4, 0.75)} className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                Get Started Today
              </button>
              <button className="bg-transparent border-2 border-amber-600 hover:bg-amber-600/10 text-white font-bold py-3 px-8 rounded-full transition duration-300">
                Contact Sales
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RoofingServicesPage;
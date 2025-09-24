"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, Variants } from 'framer-motion';

const AutomotiveServicesPage = () => {
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
      title: "Mobile Dispatch & Booking",
      description: "Efficiently schedule and manage mobile service appointments",
      icon: "🚗"
    },
    {
      title: "OBD/Diagnostic Logging",
      description: "Capture and analyze vehicle diagnostic data in real-time",
      icon: "📊"
    },
    {
      title: "Parts Procurement",
      description: "Streamline parts ordering and inventory management",
      icon: "🔧"
    },
    {
      title: "Fleet Maintenance Plans",
      description: "Create and track customized maintenance schedules",
      icon: "🛠️"
    },
    {
      title: "Warranty Management",
      description: "Automate warranty claims and compliance tracking",
      icon: "📑"
    },
    {
      title: "Repair Documentation",
      description: "Complete digital repair history and documentation",
      icon: "📋"
    }
  ];

  const benefits = [
    {
      title: "On-site Convenience",
      description: "Bring professional automotive services directly to your customers",
      icon: "📍"
    },
    {
      title: "Rapid Turnaround",
      description: "Reduce service times with optimized workflows and mobile capabilities",
      icon: "⚡"
    },
    {
      title: "Fleet Uptime Gains",
      description: "Maximize vehicle availability with proactive maintenance scheduling",
      icon: "📈"
    },
    {
      title: "Cost-Controlled Operations",
      description: "Reduce overhead and improve resource allocation",
      icon: "💰"
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
      question: "What features does Fielduo offer for Automotive Services?",
      answer: "Fielduo provides comprehensive automotive service solutions including mobile dispatch, diagnostic logging, parts procurement, fleet maintenance, warranty management, and repair documentation."
    },
    {
      question: "How can Automotive businesses improve efficiency with field service management software?",
      answer: "Our software optimizes technician dispatching, automates diagnostic data collection, streamlines parts ordering, and provides real-time maintenance tracking to reduce operational costs and improve service quality."
    },
    {
      question: "How does the software help with regulatory compliance for Automotive Services?",
      answer: "Fielduo automates compliance reporting, tracks warranty requirements, maintains detailed audit trails, and ensures adherence to automotive industry regulations and safety standards."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Automotive Services?",
      answer: "Yes, our platform includes emergency response features with priority scheduling, real-time notifications, and specialized workflows for urgent vehicle repairs and roadside assistance."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Automotive Services?",
      answer: "We provide complete parts inventory management, vehicle lifecycle tracking, maintenance scheduling, and performance monitoring for all automotive assets and equipment."
    },
    {
      question: "How does the software enhance customer communication for Automotive Services?",
      answer: "Fielduo offers customer portals, automated service notifications, repair status updates, and real-time communication tools to keep customers informed about their vehicle service and repair progress."
    },
    {
      question: "What benefits do Automotive clients see after implementing Fielduo?",
      answer: "Clients typically see improved service efficiency, reduced vehicle downtime, better parts inventory management, enhanced customer satisfaction, and more cost-effective operations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <Head>
        <title>Automotive Services | Fielduo</title>
        <meta name="description" content="Mobile automotive repair and fleet maintenance" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900/30 via-orange-800/20 to-amber-900/30"></div>
          
          {/* Animated Road */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-800 to-gray-900">
            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400/30"></div>
            <div className="absolute top-4 left-0 w-full h-1 bg-yellow-400/20"></div>
            <div className="absolute top-8 left-0 w-full h-1 bg-yellow-400/10"></div>
          </div>
          
          {/* Moving Cars */}
          <motion.div
            className="absolute bottom-24 left-0 w-24 h-12 bg-red-600 rounded-lg"
            animate={{ x: ["-10%", "110%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-2 left-2 w-4 h-4 bg-red-400 rounded-full"></div>
            <div className="absolute top-2 right-2 w-4 h-4 bg-red-400 rounded-full"></div>
            <div className="absolute -top-2 left-6 w-8 h-4 bg-gray-300 rounded-t-lg"></div>
          </motion.div>
          
          <motion.div
            className="absolute bottom-32 left-0 w-20 h-10 bg-blue-600 rounded-lg"
            animate={{ x: ["-10%", "110%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 3 }}
          >
            <div className="absolute top-2 left-2 w-3 h-3 bg-blue-400 rounded-full"></div>
            <div className="absolute top-2 right-2 w-3 h-3 bg-blue-400 rounded-full"></div>
            <div className="absolute -top-2 left-5 w-6 h-3 bg-gray-300 rounded-t-lg"></div>
          </motion.div>
          
          <motion.div
            className="absolute bottom-28 left-0 w-16 h-8 bg-gray-600 rounded-lg"
            animate={{ x: ["-10%", "110%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 6 }}
          >
            <div className="absolute top-1 left-1 w-3 h-3 bg-gray-400 rounded-full"></div>
            <div className="absolute top-1 right-1 w-3 h-3 bg-gray-400 rounded-full"></div>
            <div className="absolute -top-1 left-4 w-5 h-2 bg-gray-300 rounded-t-lg"></div>
          </motion.div>
          
          {/* Floating Oil Drops */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-black/40"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 70}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 + 50, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 6 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Tool Icons */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`tool-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 80}%`,
              }}
              animate={{
                rotate: [0, 360],
                y: [0, -Math.random() * 30 - 10, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <div className="w-8 h-8 flex items-center justify-center text-2xl">
                {["🔧", "🛠️", "⚙️", "🔩", "🧰", "🪛", "🔑", "⛽"][i % 8]}
              </div>
            </motion.div>
          ))}
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
            <span className="text-red-400 font-semibold inline-block px-3 py-1 bg-red-900/30 rounded-full backdrop-blur-sm">Service Solutions</span>
          </motion.div>
          
          <motion.h1 variants={textVariant(0.3)} className="text-4xl md:text-6xl font-bold mb-6">
            Automotive Services
          </motion.h1>
          
          <motion.p 
            variants={fadeIn('up', 'tween', 0.4, 0.75)}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
          >
            Mobile automotive repair and fleet maintenance
          </motion.p>
          
          <motion.div 
            variants={fadeIn('up', 'tween', 0.5, 0.75)}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg shadow-red-500/20"
            >
              Explore Features
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-red-500 text-red-400 hover:bg-red-900/50 font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              See Demo
            </motion.button>
          </motion.div>
          
          {/* Automotive Icon */}
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
              Comprehensive tools designed specifically for automotive service providers
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeIn('up', 'tween', 0.2 + index * 0.1, 0.75)}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm h-full"
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
          <div className="absolute top-1/3 left-0 w-1/3 h-1/3 bg-gradient-to-r from-red-500/10 to-transparent blur-3xl"></div>
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
              Drive operational excellence and customer satisfaction
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
                  <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-red-600 to-orange-500 rounded-xl text-2xl">
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
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-red-600 to-orange-500 rounded-full">
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
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg shadow-red-500/20"
            >
              Book a Demo Now
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Fielduo Section */}
      <section className="py-20 px-4 md:px-8 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-red-500/10 to-transparent blur-3xl"></div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              variants={fadeIn('right', 'tween', 0.2, 0.75)}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm"
            >
              <div className="text-red-400 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-red-900/20 rounded-xl backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Rapid Implementation</h3>
              <p className="text-gray-400">
                We help you start quickly by importing your data, checklists, and assets with minimal disruption to your operations.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn('left', 'tween', 0.4, 0.75)}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm"
            >
              <div className="text-red-400 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-red-900/20 rounded-xl backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h3>
              <p className="text-gray-400">
                Security is built-in with role-based permissions and full audit logs to protect your business data.
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
              Find answers to common questions about our Automotive Services solution
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
                      className="h-6 w-6 text-red-400"
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
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900/20 to-orange-900/20"></div>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10 py-16 px-8 rounded-2xl backdrop-blur-sm border border-gray-700/50"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.1, 0.25)}
        >
          <motion.h2 variants={textVariant(0.1)} className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Automotive Services?
          </motion.h2>
          
          <motion.p 
            variants={fadeIn('up', 'tween', 0.2, 0.75)}
            className="text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Join leading automotive service providers who trust Fielduo for their field service management
          </motion.p>
          
          <motion.div 
            variants={fadeIn('up', 'tween', 0.3, 0.75)}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg shadow-red-500/20"
            >
              Get Started Today
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-red-500 text-red-400 hover:bg-red-900/50 font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Contact Sales
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

export default AutomotiveServicesPage;
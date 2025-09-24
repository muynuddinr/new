"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, Variants } from 'framer-motion';

const ConstructionPage = () => {
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
      title: "Multi-phase project tracking",
      description: "Comprehensive tracking of construction projects through all phases from planning to completion",
      icon: "📊"
    },
    {
      title: "Crew & equipment planning",
      description: "Efficient scheduling and allocation of crew members and equipment across job sites",
      icon: "👷"
    },
    {
      title: "Digital safety protocols",
      description: "Digital implementation and tracking of safety protocols and compliance requirements",
      icon: "🛡️"
    },
    {
      title: "Quality inspections",
      description: "Standardized quality inspection processes with digital checklists and reporting",
      icon: "✅"
    },
    {
      title: "Change order workflows",
      description: "Streamlined change order management with approval workflows and documentation",
      icon: "📝"
    },
    {
      title: "Live progress reporting",
      description: "Real-time progress updates and reporting from the field to management",
      icon: "📱"
    }
  ];

  const benefits = [
    {
      title: "Smoother coordination",
      description: "Enhanced coordination between office, field teams, and stakeholders",
      icon: "🔄"
    },
    {
      title: "Improved safety",
      description: "Reduced incidents with proactive safety management and compliance tracking",
      icon: "🛡️"
    },
    {
      title: "Consistent quality",
      description: "Standardized processes ensuring consistent quality across all projects",
      icon: "🏆"
    },
    {
      title: "Budget visibility",
      description: "Real-time budget tracking and cost control throughout project lifecycles",
      icon: "💰"
    }
  ];

  const demoPoints = [
    {
      title: "Scheduling & dispatch walkthrough",
      description: "Intelligent resource allocation and project task management",
      icon: "📅"
    },
    {
      title: "Technician mobile flows",
      description: "Mobile-optimized workflows for field construction teams",
      icon: "📱"
    },
    {
      title: "Reports & compliance",
      description: "Comprehensive reporting and regulatory documentation",
      icon: "📈"
    },
    {
      title: "Q & A with our experts",
      description: "Direct access to our construction industry specialists",
      icon: "👨‍💼"
    }
  ];

  const faqs = [
    {
      question: "What features does Fielduo offer for Construction?",
      answer: "Fielduo provides comprehensive construction solutions including multi-phase project tracking, crew & equipment planning, digital safety protocols, quality inspections, change order workflows, and live progress reporting."
    },
    {
      question: "How can Construction businesses improve efficiency with field service management software?",
      answer: "Our software optimizes resource allocation, streamlines project workflows, enhances safety compliance, and provides real-time progress tracking to reduce operational costs and improve project delivery."
    },
    {
      question: "How does the software help with regulatory compliance for Construction?",
      answer: "Fielduo automates compliance reporting, tracks safety protocols, maintains detailed audit trails, and ensures adherence to construction industry regulations and safety standards."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Construction?",
      answer: "Yes, our platform includes emergency response features with priority scheduling, real-time notifications, and specialized workflows for construction site incidents and urgent project changes."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Construction?",
      answer: "We provide complete equipment lifecycle management, inventory tracking for construction materials, maintenance scheduling, and performance monitoring for all construction assets and machinery."
    },
    {
      question: "How does the software enhance customer communication for Construction?",
      answer: "Fielduo offers customer portals, automated progress updates, digital documentation sharing, and real-time communication tools to keep clients informed about project status and milestones."
    },
    {
      question: "What benefits do Construction clients see after implementing Fielduo?",
      answer: "Clients typically see improved project coordination, enhanced safety compliance, consistent quality across projects, better budget control, and more efficient resource allocation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <Head>
        <title>Construction Solutions | Fielduo</title>
        <meta name="description" content="Project, safety, and on‑site service coordination" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-900/30 via-orange-800/20 to-yellow-900/30"></div>
          
          {/* Construction Skyline */}
          <div className="absolute bottom-0 left-0 w-full h-1/3">
            {/* Buildings */}
            <div className="absolute bottom-0 left-0 w-full flex items-end">
              {/* Building 1 */}
              <motion.div 
                className="relative h-40 w-16 bg-gradient-to-t from-amber-900 to-amber-700 mx-1"
                animate={{ height: ["160px", "170px", "160px"] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <div className="absolute top-0 left-0 w-full h-4 bg-amber-600"></div>
                <div className="absolute top-8 left-2 w-3 h-3 bg-yellow-300 rounded-full"></div>
                <div className="absolute top-8 right-2 w-3 h-3 bg-yellow-300 rounded-full"></div>
                <div className="absolute top-16 left-2 w-3 h-3 bg-yellow-300 rounded-full"></div>
                <div className="absolute top-16 right-2 w-3 h-3 bg-yellow-300 rounded-full"></div>
              </motion.div>
              
              {/* Building 2 */}
              <motion.div 
                className="relative h-52 w-20 bg-gradient-to-t from-gray-800 to-gray-600 mx-1"
                animate={{ height: ["208px", "218px", "208px"] }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              >
                <div className="absolute top-0 left-0 w-full h-4 bg-gray-700"></div>
                <div className="absolute top-10 left-3 w-4 h-4 bg-yellow-300 rounded"></div>
                <div className="absolute top-10 right-3 w-4 h-4 bg-yellow-300 rounded"></div>
                <div className="absolute top-20 left-3 w-4 h-4 bg-yellow-300 rounded"></div>
                <div className="absolute top-20 right-3 w-4 h-4 bg-yellow-300 rounded"></div>
                <div className="absolute top-30 left-3 w-4 h-4 bg-yellow-300 rounded"></div>
              </motion.div>
              
              {/* Building 3 */}
              <motion.div 
                className="relative h-44 w-24 bg-gradient-to-t from-amber-900 to-amber-700 mx-1"
                animate={{ height: ["176px", "186px", "176px"] }}
                transition={{ duration: 9, repeat: Infinity, delay: 2 }}
              >
                <div className="absolute top-0 left-0 w-full h-4 bg-amber-600"></div>
                <div className="absolute top-12 left-4 w-3 h-3 bg-yellow-300 rounded-full"></div>
                <div className="absolute top-12 right-4 w-3 h-3 bg-yellow-300 rounded-full"></div>
                <div className="absolute top-24 left-4 w-3 h-3 bg-yellow-300 rounded-full"></div>
                <div className="absolute top-24 right-4 w-3 h-3 bg-yellow-300 rounded-full"></div>
              </motion.div>
              
              {/* Building 4 - Crane */}
              <div className="relative h-64 w-8 mx-1">
                <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-800 to-gray-600"></div>
                <motion.div 
                  className="absolute top-0 left-4 w-1 h-40 bg-gray-400 origin-bottom"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 12, repeat: Infinity }}
                >
                  <div className="absolute top-0 left-0 w-16 h-1 bg-gray-400"></div>
                  <motion.div 
                    className="absolute top-1 left-16 w-1 h-8 bg-gray-500"
                    animate={{ height: ["32px", "40px", "32px"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>
              </div>
              
              {/* Building 5 */}
              <motion.div 
                className="relative h-36 w-20 bg-gradient-to-t from-amber-900 to-amber-700 mx-1"
                animate={{ height: ["144px", "154px", "144px"] }}
                transition={{ duration: 11, repeat: Infinity, delay: 1.5 }}
              >
                <div className="absolute top-0 left-0 w-full h-4 bg-amber-600"></div>
                <div className="absolute top-8 left-3 w-3 h-3 bg-yellow-300 rounded-full"></div>
                <div className="absolute top-8 right-3 w-3 h-3 bg-yellow-300 rounded-full"></div>
                <div className="absolute top-16 left-3 w-3 h-3 bg-yellow-300 rounded-full"></div>
                <div className="absolute top-16 right-3 w-3 h-3 bg-yellow-300 rounded-full"></div>
              </motion.div>
              
              {/* Building 6 */}
              <motion.div 
                className="relative h-56 w-16 bg-gradient-to-t from-gray-800 to-gray-600 mx-1"
                animate={{ height: ["224px", "234px", "224px"] }}
                transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
              >
                <div className="absolute top-0 left-0 w-full h-4 bg-gray-700"></div>
                <div className="absolute top-10 left-2 w-4 h-4 bg-yellow-300 rounded"></div>
                <div className="absolute top-10 right-2 w-4 h-4 bg-yellow-300 rounded"></div>
                <div className="absolute top-20 left-2 w-4 h-4 bg-yellow-300 rounded"></div>
                <div className="absolute top-20 right-2 w-4 h-4 bg-yellow-300 rounded"></div>
                <div className="absolute top-30 left-2 w-4 h-4 bg-yellow-300 rounded"></div>
                <div className="absolute top-30 right-2 w-4 h-4 bg-yellow-300 rounded"></div>
              </motion.div>
            </div>
            
            {/* Ground */}
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-amber-900 to-amber-800"></div>
          </div>
          
          {/* Moving Construction Vehicles */}
          <motion.div
            className="absolute bottom-16 left-0 w-16 h-8 bg-yellow-600 rounded-lg"
            animate={{ x: ["-5%", "105%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-2 w-4 h-4 bg-yellow-500 rounded-full"></div>
            <div className="absolute top-0 right-2 w-4 h-4 bg-yellow-500 rounded-full"></div>
          </motion.div>
          
          <motion.div
            className="absolute bottom-24 left-0 w-12 h-6 bg-red-600 rounded-lg"
            animate={{ x: ["-5%", "105%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
          >
            <div className="absolute top-0 left-1 w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="absolute top-0 right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </motion.div>
          
          {/* Floating Dust Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-amber-400/20"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 70}%`,
              }}
              animate={{
                y: [0, -Math.random() * 80 - 20, 0],
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
          
          {/* Construction Lines (like beams) */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`beam-${i}`}
              className="absolute h-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60 + 20}%`,
                transform: `rotate(${Math.random() * 60 - 30}deg)`,
              }}
              animate={{
                opacity: [0.1, 0.6, 0.1],
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
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
            <span className="text-amber-400 font-semibold inline-block px-3 py-1 bg-amber-900/30 rounded-full backdrop-blur-sm">Industry Solutions</span>
          </motion.div>
          
          <motion.h1 variants={textVariant(0.3)} className="text-4xl md:text-6xl font-bold mb-6">
            Construction Solutions
          </motion.h1>
          
          <motion.p 
            variants={fadeIn('up', 'tween', 0.4, 0.75)}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
          >
            Project, safety, and on‑site service coordination.
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
          
          {/* Construction Icon */}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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
              Comprehensive tools designed specifically for construction professionals
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
              How our specialized solution transforms your construction operations
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
              During your personalized demo, we'll walk you through the key aspects of our construction solution:
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
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-amber-600 to-orange-500 rounded-full text-2xl">
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
                We help you start quickly by importing your data, checklists, and assets
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
                Security is built-in with role-based permissions and full audit logs
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
                Our team of experts is always ready to help you succeed
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
              Get answers about our construction solutions
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
            Ready to Transform Your Construction Business?
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

export default ConstructionPage;
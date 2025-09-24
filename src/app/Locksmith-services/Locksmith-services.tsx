// pages/locksmith-services.js
'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function LocksmithServices() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [counters, setCounters] = useState({
    responseTime: 0,
    efficiency: 0,
    security: 0,
    jobsPerDay: 0
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('features');
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate counters
          const interval = setInterval(() => {
            setCounters(prev => {
              const newCounters = { ...prev };
              if (newCounters.responseTime < 40) newCounters.responseTime += 2;
              if (newCounters.efficiency < 35) newCounters.efficiency += 2;
              if (newCounters.security < 99) newCounters.security += 3;
              if (newCounters.jobsPerDay < 12) newCounters.jobsPerDay += 1;
              
              if (
                newCounters.responseTime >= 40 &&
                newCounters.efficiency >= 35 &&
                newCounters.security >= 99 &&
                newCounters.jobsPerDay >= 12
              ) {
                clearInterval(interval);
              }
              
              return newCounters;
            });
          }, 50);
          
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What features does Fielduo offer for Locksmith Services?",
      answer: "Fielduo offers a comprehensive suite of locksmith-specific features including 24/7 emergency dispatch, complete job and service history tracking, GPS and route optimization, lock hardware inventory management, real-time customer updates, and security documentation. Our platform also provides technician mobile apps with offline capabilities, digital signature capture, photo documentation of security installations, and compliance reporting tailored to locksmith business needs."
    },
    {
      question: "How can Locksmith businesses improve efficiency with field service management software?",
      answer: "Locksmith businesses can improve efficiency by up to 35% through intelligent scheduling that optimizes technician routes and reduces travel time. Our software automates administrative tasks, provides technicians with complete job information and customer history, enables real-time communication, and offers data-driven insights to optimize operations. The GPS routing alone can reduce travel time by up to 30%, allowing technicians to complete more jobs per day."
    },
    {
      question: "How does the software help with regulatory compliance for Locksmith Services?",
      answer: "Fielduo helps locksmith businesses maintain regulatory compliance through automated documentation, digital record-keeping, certification tracking, and compliance reporting. Our system ensures all security services are properly documented, technician certifications are up-to-date, and generates compliance reports for audits. We also support industry-specific regulations and can be customized to meet local licensing requirements and security standards."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Locksmith Services?",
      answer: "Yes, Fielduo includes a comprehensive emergency response system with 24/7 dispatch capabilities, priority routing for emergency calls, and real-time technician tracking. Our platform can automatically identify and prioritize emergency lockout situations, dispatch the nearest qualified technician, and provide customers with accurate ETAs. The system also maintains emergency service history and performance metrics to improve response times."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Locksmith Services?",
      answer: "Fielduo provides robust inventory and asset tracking specifically designed for locksmith businesses with comprehensive lock hardware catalogs, key tracking systems, and automated inventory management. Our system tracks lock types, key cutting records, security hardware inventory, and maintenance schedules. Technicians can access complete product information, compatibility guides, and pricing on their mobile devices, ensuring they always have the right materials for each job."
    },
    {
      question: "How does the software enhance customer communication for Locksmith Services?",
      answer: "Fielduo enhances customer communication through automated appointment reminders, real-time technician tracking with ETAs, digital service reports with before/after photos, and secure documentation sharing. Customers can view service history, schedule appointments, make payments, and access security documentation through a self-service portal. The system also facilitates secure communication for sensitive security information and maintains complete communication logs."
    },
    {
      question: "What benefits do Locksmith clients see after implementing Fielduo?",
      answer: "Locksmith clients typically see significant improvements including up to 40% faster emergency response times, 35% increase in operational efficiency, 99% improvement in security documentation compliance, and the ability to complete up to 12 jobs per day per technician. Additional benefits include reduced administrative overhead, improved first-time fix rates, better inventory management, enhanced customer trust through professional documentation, and data-driven business insights that support strategic decision-making."
    }
  ];

  const features = [
    {
      title: "24/7 Emergency Dispatch",
      description: "Round-the-clock emergency lockout service with intelligent dispatching",
      icon: "🚨",
      detail: "AI-powered emergency response with priority routing and real-time status updates"
    },
    {
      title: "Job & Service History Tracking",
      description: "Complete digital records of all services performed for each customer",
      icon: "📋",
      detail: "Comprehensive service histories with photos, notes, and security documentation"
    },
    {
      title: "GPS & Route Optimization",
      description: "AI-powered routing gets technicians to jobs faster, saving time and fuel",
      icon: "🗺️",
      detail: "Reduce travel time by up to 30% with intelligent route optimization"
    },
    {
      title: "Lock Hardware Inventory",
      description: "Track lock inventory, keys, and supplies with automated reordering",
      icon: "🔑",
      detail: "Complete inventory management with barcode scanning and reorder alerts"
    },
    {
      title: "Real-Time Customer Updates",
      description: "Keep customers informed with automated ETA and service updates",
      icon: "📱",
      detail: "Automated notifications and real-time technician tracking for customers"
    },
    {
      title: "Security Documentation",
      description: "Maintain detailed security audit trails and compliance documentation",
      icon: "🔒",
      detail: "Professional documentation for security installations and compliance reporting"
    }
  ];

  const benefits = [
    {
      title: "Rapid Response",
      description: "Reduce response times with optimized dispatching and routing",
      icon: "⚡",
      stat: "40%",
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Operational Efficiency",
      description: "Complete more jobs per day with streamlined operations",
      icon: "📈",
      stat: "35%",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Enhanced Security",
      description: "Professional documentation and audit trails for security-sensitive work",
      icon: "🛡️",
      stat: "99%",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Jobs Per Day",
      description: "Increase daily job capacity with optimized scheduling",
      icon: "🔧",
      stat: "12+",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const demoFeatures = [
    "Scheduling & dispatch walkthrough",
    "Technician mobile flows",
    "Reports & compliance",
    "Q & A with our experts"
  ];

  return (
    <>
      <Head>
        <title>Locksmith Services | Fielduo</title>
        <meta name="description" content="Mobile locksmith management for fast, secure service with Fielduo's specialized field service solution" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        {/* Mouse Follower Effect */}
        <div 
          className="fixed pointer-events-none z-50 transition-opacity duration-300"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            opacity: 0.5
          }}
        />

        {/* Hero Section with Security Theme */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-red-900/20 z-0"></div>
          
          {/* Animated Background Elements - Lock/Key themed */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Floating Lock Icons */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute text-4xl opacity-10"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              >
                🔒
              </div>
            ))}
            
            {/* Floating Key Icons */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute text-4xl opacity-10"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              >
                🔑
              </div>
            ))}
            
            {/* Security Pattern Background */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full" style={{ 
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(59, 130, 246, 0.05) 10px, rgba(59, 130, 246, 0.05) 20px)',
                backgroundSize: '20px 20px'
              }}></div>
            </div>
          </div>
          
          {/* Lock and Key Mockups */}
          <div className="absolute top-1/2 right-10 transform -translate-y-1/2 opacity-20">
            <div className="relative">
              <div className="w-16 h-24 bg-gray-800 rounded-lg border-2 border-gray-700 transform rotate-12"></div>
              <div className="absolute top-3 left-3 w-4 h-6 bg-gray-700 rounded"></div>
            </div>
          </div>
          <div className="absolute top-1/3 left-10 opacity-20">
            <div className="relative">
              <div className="w-6 h-10 bg-yellow-600 rounded-full transform -rotate-12"></div>
              <div className="absolute top-2 left-4 w-1 h-6 bg-yellow-700 rounded transform rotate-12"></div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-blue-900/30 backdrop-blur-sm rounded-full mb-6 border border-blue-500/30">
                <span className="text-blue-400 font-medium">Specialized Solution</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Locksmith</span> Services
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Mobile locksmith management for fast, secure service. Professional solutions for locksmith businesses to improve response times, enhance security, and streamline operations.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/20">
                  Watch Demo
                </button>
                <button className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-900/50 font-bold py-4 px-10 rounded-xl transition duration-300">
                  Request Consultation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Comprehensive tools designed specifically for locksmith professionals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8 transition-all duration-500 transform hover:-translate-y-2 ${
                    hoveredFeature === index ? 'border-blue-500 shadow-xl shadow-blue-500/20' : ''
                  }`}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-blue-400">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <p className="text-sm text-gray-500">{feature.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Business Benefits Section */}
        <div className="py-20 bg-gradient-to-b from-gray-900 to-black" ref={sectionRef}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Business Benefits</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                How our specialized solution transforms your locksmith operations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8 text-center hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`text-5xl mb-6 bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-400 mb-6">{benefit.description}</p>
                  <div className="text-4xl font-bold text-blue-400">
                    {benefit.stat}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What You'll See Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll See</h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  During your personalized demo, we'll walk you through the key aspects of our locksmith solution:
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-800 p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {demoFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-colors">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-10">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/20">
                    Schedule Your Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Fielduo Section */}
        <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Fielduo</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-500/30 p-8">
                  <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                    <span className="text-3xl mr-3">⚡</span>
                    Quick Implementation
                  </h3>
                  <p className="text-gray-300">
                    We help you start quickly by importing your data, checklists, and assets
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/30 p-8">
                  <h3 className="text-xl font-bold mb-4 text-purple-400 flex items-center">
                    <span className="text-3xl mr-3">🔒</span>
                    Enterprise Security
                  </h3>
                  <p className="text-gray-300">
                    Security is built-in with role-based permissions and full audit logs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Locksmith Services — FAQs</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Get answers about our locksmith solutions
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`mb-6 rounded-2xl overflow-hidden transition-all duration-300 ${
                    activeFaq === index 
                      ? 'bg-gradient-to-r from-gray-900 to-gray-800 border border-blue-500/30 shadow-xl shadow-blue-500/10' 
                      : 'bg-gray-900/50 border border-gray-800'
                  }`}
                >
                  <button
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-800/30 transition duration-300"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="text-lg font-medium flex items-center">
                      <span className="text-blue-400 mr-3">Q{index + 1}.</span>
                      {faq.question}
                    </span>
                    <svg
                      className={`w-6 h-6 transform transition-transform duration-300 ${
                        activeFaq === index ? 'rotate-180 text-blue-400' : 'text-gray-500'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeFaq === index && (
                    <div className="p-6 pt-0 text-gray-300 border-t border-gray-800">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-red-900/30 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Started Today</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Transform your locksmith business with Fielduo's specialized field service solution
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/20">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </>
  );
}
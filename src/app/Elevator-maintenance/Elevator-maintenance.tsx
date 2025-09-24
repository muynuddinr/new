// pages/elevator-maintenance.js
'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function ElevatorMaintenance() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [counters, setCounters] = useState({
    uptime: 0,
    safety: 0,
    efficiency: 0,
    compliance: 0
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
              if (newCounters.uptime < 95) newCounters.uptime += 2;
              if (newCounters.safety < 99) newCounters.safety += 2;
              if (newCounters.efficiency < 40) newCounters.efficiency += 2;
              if (newCounters.compliance < 100) newCounters.compliance += 3;
              
              if (
                newCounters.uptime >= 95 &&
                newCounters.safety >= 99 &&
                newCounters.efficiency >= 40 &&
                newCounters.compliance >= 100
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
      question: "How does Fielduo help with regulatory compliance?",
      answer: "Fielduo provides comprehensive regulatory compliance tools specifically designed for elevator maintenance. Our system automates documentation of safety inspections, maintenance activities, and test results. It generates compliance reports formatted to meet local and international regulations, tracks certification expiration dates, and maintains complete audit trails. The system also sends alerts for upcoming compliance deadlines and ensures all required documentation is properly stored and easily accessible for regulators."
    },
    {
      question: "Can I import my existing equipment data?",
      answer: "Yes, Fielduo offers robust data import capabilities for all your existing elevator and escalator assets. Our system supports importing from Excel, CSV, and other common formats, and we provide dedicated migration assistance to ensure a smooth transition. We can also integrate with your existing CMMS or ERP systems to synchronize data automatically. Our implementation team works with you to map your existing data structure and ensure all critical information is preserved."
    },
    {
      question: "How does the emergency dispatch system work?",
      answer: "Our emergency dispatch system provides 24/7 response capabilities with intelligent routing and prioritization. When an emergency call is received, the system automatically identifies the nearest qualified technician based on skills, location, and current availability. It provides real-time navigation with traffic considerations, sends automatic notifications to building managers, and tracks resolution status. The system also maintains detailed emergency response records for compliance and performance analysis."
    },
    {
      question: "What kind of performance monitoring is available?",
      answer: "Fielduo offers comprehensive performance monitoring for elevators and escalators through IoT sensors and connected equipment. Our system tracks key metrics including run times, door operations, energy consumption, vibration levels, and error codes. It provides real-time dashboards, trend analysis, predictive alerts for potential issues, and detailed performance reports. This data helps identify maintenance needs before they cause failures and optimizes maintenance schedules based on actual usage patterns."
    }
  ];

  const features = [
    {
      title: "Automated PM Schedules",
      description: "Never miss maintenance with automated preventive maintenance scheduling",
      icon: "📅",
      detail: "AI-powered scheduling that optimizes maintenance based on usage patterns and manufacturer recommendations"
    },
    {
      title: "Digital Safety Inspections",
      description: "Conduct and document safety inspections digitally with mobile devices",
      icon: "📱",
      detail: "Customizable digital checklists with photo capture, signature capture, and automatic report generation"
    },
    {
      title: "24/7 Emergency Dispatch",
      description: "Round-the-clock emergency response with intelligent dispatching",
      icon: "🚨",
      detail: "Priority-based dispatch system with real-time technician tracking and ETA notifications"
    },
    {
      title: "Asset & Component Tracking",
      description: "Track elevators, escalators and all components throughout their lifecycle",
      icon: "🔍",
      detail: "Complete asset registry with component-level tracking, warranty information, and maintenance history"
    },
    {
      title: "Performance Monitoring",
      description: "Monitor equipment performance and identify issues before they cause downtime",
      icon: "📊",
      detail: "Real-time performance metrics with predictive analytics and automated alerting"
    },
    {
      title: "Regulatory Compliance Tools",
      description: "Stay compliant with automated documentation and reporting",
      icon: "📋",
      detail: "Automated compliance reporting with customizable templates and audit trail documentation"
    }
  ];

  const benefits = [
    {
      title: "Maximize Uptime",
      description: "Reduce equipment downtime with proactive maintenance",
      icon: "⏱️",
      stat: "95%",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Ensure Rider Safety",
      description: "Maintain the highest safety standards with digital inspections",
      icon: "🛡️",
      stat: "99%",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Optimize Technician Routes",
      description: "AI-powered routing gets technicians to jobs faster",
      icon: "🗺️",
      stat: "40%",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Meet Code Requirements",
      description: "Automatically generate compliance reports for regulators",
      icon: "✅",
      stat: "100%",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const demoFeatures = [
    {
      title: "Scheduling & Dispatch Walkthrough",
      description: "See how our intelligent scheduling optimizes technician routes and prioritizes emergency calls"
    },
    {
      title: "Technician Mobile Flows",
      description: "Experience our mobile app from the technician's perspective with digital checklists and real-time updates"
    },
    {
      title: "Reports & Compliance",
      description: "Explore our comprehensive reporting capabilities and automated compliance documentation"
    },
    {
      title: "Q&A with Our Experts",
      description: "Get answers to your specific questions from our elevator maintenance specialists"
    }
  ];

  const whyChoose = [
    {
      title: "Quick Implementation",
      description: "We help you start quickly by importing your data, checklists, and assets",
      icon: "🚀"
    },
    {
      title: "Enterprise Security",
      description: "Security is built-in with role-based permissions and full audit logs",
      icon: "🔒"
    }
  ];

  return (
    <>
      <Head>
        <title>Elevator Maintenance | Fielduo</title>
        <meta name="description" content="Specialized elevator and escalator service management solution for uptime and safety" />
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

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 z-0"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm"
                style={{
                  width: `${Math.random() * 200 + 50}px`,
                  height: `${Math.random() * 200 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  filter: 'blur(40px)',
                  animation: `float ${Math.random() * 20 + 15}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Elevator Mockups */}
          <div className="absolute top-1/2 right-10 transform -translate-y-1/2 opacity-20">
            <div className="w-32 h-64 bg-gray-800 rounded-2xl border-4 border-gray-700 p-4 transform rotate-12">
              <div className="w-full h-6 bg-gray-700 rounded mb-4"></div>
              <div className="flex justify-between mb-4">
                <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
              </div>
              <div className="w-full h-32 bg-gradient-to-b from-gray-700 to-gray-800 rounded mb-4"></div>
              <div className="w-full h-2 bg-blue-500 rounded"></div>
            </div>
          </div>
          <div className="absolute top-1/3 left-10 opacity-20">
            <div className="w-32 h-64 bg-gray-800 rounded-2xl border-4 border-gray-700 p-4 transform -rotate-12">
              <div className="w-full h-6 bg-gray-700 rounded mb-4"></div>
              <div className="flex justify-between mb-4">
                <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
              </div>
              <div className="w-full h-32 bg-gradient-to-b from-gray-700 to-gray-800 rounded mb-4"></div>
              <div className="w-full h-2 bg-blue-500 rounded"></div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-blue-900/30 backdrop-blur-sm rounded-full mb-6 border border-blue-500/30">
                <span className="text-blue-400 font-medium">Specialized Solution</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                Elevator <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Maintenance</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Elevator & escalator service management for uptime and safety. Professional maintenance solutions that maximize equipment uptime and ensure passenger safety through innovative technology.
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
                Comprehensive tools designed specifically for elevator and escalator maintenance professionals
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
                How our specialized solution transforms your elevator maintenance operations
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
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll See</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                During your personalized demo, we'll walk you through the key aspects of our elevator maintenance solution:
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-800 p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {demoFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-blue-400">{feature.title}</h3>
                        <p className="text-gray-300">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 text-center">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/20">
                    Schedule Your Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Fielduo</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {whyChoose.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8 flex items-center hover:border-blue-500 transition-all duration-300">
                  <div className="text-5xl mr-6">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-blue-400">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Get answers about our elevator maintenance solutions
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
        <div className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Started Today</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Transform your elevator maintenance operations with Fielduo's specialized solution
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/20">
              Request Demo
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
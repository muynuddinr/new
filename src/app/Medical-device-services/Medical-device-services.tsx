// pages/medical-device-services.js
'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function MedicalDeviceServicesPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [counters, setCounters] = useState({
    uptime: 0,
    compliance: 0,
    efficiency: 0,
    costReduction: 0
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
              if (newCounters.uptime < 99) newCounters.uptime += 1;
              if (newCounters.compliance < 100) newCounters.compliance += 5;
              if (newCounters.efficiency < 40) newCounters.efficiency += 2;
              if (newCounters.costReduction < 25) newCounters.costReduction += 2;
              
              if (
                newCounters.uptime >= 99 &&
                newCounters.compliance >= 100 &&
                newCounters.efficiency >= 40 &&
                newCounters.costReduction >= 25
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
      question: "What features does Fielduo offer for Medical Device Services?",
      answer: "Fielduo provides a comprehensive suite of features specifically designed for medical device services including regulatory compliance tracking, automated preventive maintenance scheduling, certification management for technicians and equipment, emergency service prioritization, complete documentation and audit trails, and comprehensive asset management. Our platform also offers mobile capabilities for technicians, customer self-service portals, and advanced analytics tailored to healthcare equipment management needs."
    },
    {
      question: "How can Medical Device Services businesses improve efficiency with field service management software?",
      answer: "Medical device service businesses can improve efficiency by up to 40% through intelligent scheduling that considers technician certifications, equipment requirements, and healthcare facility priorities. Our software automates compliance documentation, provides technicians with complete equipment histories and manuals on mobile devices, enables real-time communication between healthcare staff and service teams, and offers data-driven insights to optimize resource allocation and maintenance schedules."
    },
    {
      question: "How does the software help with regulatory compliance for Medical Device Services?",
      answer: "Fielduo helps maintain regulatory compliance through comprehensive documentation of all service activities, automated tracking of FDA requirements and medical device regulations, certification management for both technicians and equipment, and detailed audit trails. Our system ensures all service activities meet healthcare standards, generates compliance reports for audits, and can be customized to meet specific regulatory requirements including FDA, ISO, and other healthcare regulations."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Medical Device Services?",
      answer: "Yes, Fielduo includes a specialized emergency response system for medical equipment with priority dispatch based on equipment criticality and patient impact. Our platform offers 24/7 emergency scheduling, real-time technician tracking, and immediate communication capabilities. The system can automatically identify and prioritize emergency calls, dispatch the nearest certified technician, and provide healthcare facilities with accurate ETAs and status updates throughout the service process."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Medical Device Services?",
      answer: "Fielduo provides robust medical device inventory and asset tracking with comprehensive equipment databases, parts management specific to medical devices, and complete asset lifecycle management. Our system tracks equipment location, service history, warranty information, certification status, and performance metrics. Technicians can access complete equipment information including manuals, service history, and parts requirements on their mobile devices, even when offline."
    },
    {
      question: "How does the software enhance customer communication for Medical Device Services?",
      answer: "Fielduo enhances customer communication through automated service notifications, real-time technician tracking with ETAs, digital service reports with detailed findings, and a healthcare-specific customer portal. Healthcare facilities can view equipment status, service schedules, and compliance documentation. The system facilitates secure communication between service teams and healthcare staff, provides documentation for regulatory purposes, and ensures all stakeholders have access to critical equipment information."
    },
    {
      question: "What benefits do Medical Device Services clients see after implementing Fielduo?",
      answer: "Medical device service clients typically see significant improvements including 99%+ equipment uptime, 100% regulatory compliance, 40% increase in service efficiency, and 25% reduction in operational costs. Additional benefits include improved patient safety, reduced emergency response times, better resource utilization, enhanced audit readiness, and data-driven insights that support strategic decision-making for healthcare equipment management."
    }
  ];

  const features = [
    {
      title: "Regulatory Compliance",
      description: "FDA and medical device regulation compliance tracking",
      icon: "📋",
      detail: "Automated compliance documentation and audit trail management"
    },
    {
      title: "Preventive Maintenance",
      description: "Automated PM scheduling for critical medical equipment",
      icon: "🔧",
      detail: "Intelligent scheduling based on equipment criticality and usage patterns"
    },
    {
      title: "Certification Management",
      description: "Track technician certifications and equipment validations",
      icon: "📜",
      detail: "Ensure only certified technicians work on specific medical devices"
    },
    {
      title: "Emergency Service",
      description: "Priority response for critical medical equipment failures",
      icon: "🚨",
      detail: "Rapid dispatch system with real-time status updates"
    },
    {
      title: "Documentation Requirements",
      description: "Complete audit trails and regulatory documentation",
      icon: "📄",
      detail: "Comprehensive documentation for FDA and healthcare compliance"
    },
    {
      title: "Asset Management",
      description: "Comprehensive medical equipment tracking and history",
      icon: "🏥",
      detail: "Complete lifecycle tracking from installation to decommissioning"
    }
  ];

  const benefits = [
    {
      title: "Patient Safety",
      description: "Ensure medical equipment reliability and performance.",
      icon: "❤️",
      stat: "99%",
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Regulatory Compliance",
      description: "Maintain FDA and healthcare regulatory requirements.",
      icon: "✅",
      stat: "100%",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Minimize Downtime",
      description: "Rapid response and first-time fix capabilities.",
      icon: "⏱️",
      stat: "40%",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Cost Control",
      description: "Optimize maintenance schedules and resource allocation.",
      icon: "💰",
      stat: "25%",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <>
      <Head>
        <title>Medical Device Services Management | Fielduo</title>
        <meta name="description" content="Specialized field service management for medical equipment manufacturers and healthcare facilities" />
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
          
          {/* Medical Device Mockups */}
          <div className="absolute top-1/2 right-10 transform -translate-y-1/2 opacity-20">
            <div className="w-48 h-48 bg-gray-800 rounded-2xl border-4 border-gray-700 p-4 transform rotate-12">
              <div className="w-full h-8 bg-gray-700 rounded mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-700 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-700 rounded mb-4"></div>
              <div className="w-full h-6 bg-green-500 rounded"></div>
            </div>
          </div>
          <div className="absolute top-1/3 left-10 opacity-20">
            <div className="w-48 h-48 bg-gray-800 rounded-2xl border-4 border-gray-700 p-4 transform -rotate-12">
              <div className="w-full h-8 bg-gray-700 rounded mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-700 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-700 rounded mb-4"></div>
              <div className="w-full h-6 bg-green-500 rounded"></div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-blue-900/30 backdrop-blur-sm rounded-full mb-6 border border-blue-500/30">
                <span className="text-blue-400 font-medium">Healthcare Industry Solution</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                Medical Device <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Services</span> Management
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Specialized field service management for medical equipment manufacturers and healthcare facilities.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/20">
                  Schedule a Demonstration
                </button>
                <button className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-900/50 font-bold py-4 px-10 rounded-xl transition duration-300">
                  Speak with our healthcare solutions team
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Device Features Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Medical Device Features</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                End-to-end solutions tailored for healthcare equipment management
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

        {/* Healthcare Service Benefits Section */}
        <div className="py-20 bg-gradient-to-b from-gray-900 to-black" ref={sectionRef}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Healthcare Service Benefits</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Delivering measurable improvements in patient safety and operational efficiency
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

        {/* FAQ Section */}
        <div className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Medical Device Services — FAQs</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Common questions about our medical device management solutions
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Optimize Your Medical Device Service Operations</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Enhance patient safety, ensure compliance, and streamline your healthcare equipment management.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/20">
                Schedule a Demonstration
              </button>
              <button className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-900/50 font-bold py-4 px-10 rounded-xl transition duration-300">
                Speak with our healthcare solutions team
              </button>
            </div>
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
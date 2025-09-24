// pages/security-services.js
'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function SecurityServicesPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [counters, setCounters] = useState({
    response: 0,
    compliance: 0,
    reliability: 0,
    relationships: 0
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
              if (newCounters.response < 60) newCounters.response += 3;
              if (newCounters.compliance < 100) newCounters.compliance += 5;
              if (newCounters.reliability < 95) newCounters.reliability += 5;
              if (newCounters.relationships < 85) newCounters.relationships += 5;
              
              if (
                newCounters.response >= 60 &&
                newCounters.compliance >= 100 &&
                newCounters.reliability >= 95 &&
                newCounters.relationships >= 85
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
      question: "What specialized features does your platform offer for security service providers?",
      answer: "Our platform offers a comprehensive suite of security-specific features including installation management with detailed configuration tracking, real-time monitoring integration with security systems, automated preventive maintenance scheduling, compliance and certification tracking with audit trails, emergency response protocols with priority dispatch, granular access control for client security protocols, performance analytics for system uptime and response times, centralized asset management for all security equipment, and 24/7 technical support for mission-critical systems."
    },
    {
      question: "How can security service businesses improve operational efficiency with your software?",
      answer: "Security service businesses can significantly improve operational efficiency through our intelligent scheduling system that optimizes technician routes based on security clearance levels and equipment expertise, automated inventory management that ensures critical security components are always available, digital work orders that include detailed security system specifications and protocols, real-time communication between technicians and monitoring centers, and automated reporting that reduces administrative overhead by up to 60%."
    },
    {
      question: "How does the software assist with regulatory compliance for security services?",
      answer: "Our platform assists with regulatory compliance through comprehensive compliance management tools that track certifications, licenses, and training requirements for security personnel. The system maintains detailed audit trails of all security system activities, generates compliance reports for various regulatory bodies, automates the scheduling of compliance inspections and certifications, and provides alerts when certifications are approaching expiration. This ensures security providers maintain full compliance with industry regulations and standards."
    },
    {
      question: "Do you offer emergency response capabilities for critical security system failures?",
      answer: "Yes, our platform includes a robust emergency response system designed specifically for critical security system failures. When an emergency is detected, the system automatically prioritizes the dispatch of the nearest qualified technician with the necessary security clearances, provides real-time alerts to both the security provider and the client, maintains continuous communication during the emergency response, and generates detailed post-incident reports for analysis and improvement. This ensures rapid response to critical security situations."
    }
  ];

  const features = [
    {
      title: "Installation Management",
      description: "Complete oversight of security system deployments with detailed configuration tracking.",
      icon: "🛠️",
      detail: "Track every component, configuration setting, and installation parameter for complete system documentation"
    },
    {
      title: "Real-time Monitoring Integration",
      description: "Seamless connectivity with security monitoring systems and protocols.",
      icon: "📡",
      detail: "Integrate with leading monitoring platforms for real-time alerts and system status updates"
    },
    {
      title: "Preventive Maintenance Scheduling",
      description: "Automated maintenance scheduling to ensure optimal equipment performance.",
      icon: "🔧",
      detail: "AI-powered scheduling that prioritizes critical security infrastructure and compliance requirements"
    },
    {
      title: "Compliance & Certification Tracking",
      description: "Comprehensive regulatory compliance management with audit trails.",
      icon: "📋",
      detail: "Automated tracking of certifications, licenses, and compliance requirements with expiration alerts"
    },
    {
      title: "Emergency Response Protocol",
      description: "Priority dispatch system for critical security system failures.",
      icon: "🚨",
      detail: "Rapid response system with priority dispatch and real-time status updates"
    },
    {
      title: "Granular Access Control",
      description: "Advanced permission management for client security protocols.",
      icon: "🔐",
      detail: "Role-based access control with detailed permission management for security protocols"
    },
    {
      title: "Performance Analytics",
      description: "Detailed reporting on system uptime, response times, and service metrics.",
      icon: "📊",
      detail: "Comprehensive analytics on system performance, technician efficiency, and service quality"
    },
    {
      title: "Centralized Asset Management",
      description: "Complete inventory tracking for all security equipment and components.",
      icon: "📦",
      detail: "Track all security assets with detailed specifications, maintenance history, and lifecycle management"
    },
    {
      title: "Dedicated Support System",
      description: "24/7 technical support for mission-critical security systems.",
      icon: "🛟",
      detail: "Round-the-clock support with security-trained technicians and priority response for critical issues"
    }
  ];

  const advantages = [
    {
      title: "Enhanced Response Capabilities",
      description: "Reduce critical response times with optimized dispatch and real-time alerts for security emergencies.",
      icon: "⚡",
      stat: "60%",
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Regulatory Compliance Assurance",
      description: "Maintain full compliance with industry regulations through automated certification tracking and reporting.",
      icon: "✅",
      stat: "100%",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "System Reliability Improvement",
      description: "Increase equipment uptime through predictive maintenance and proactive system monitoring.",
      icon: "🔧",
      stat: "95%",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Client Relationship Enhancement",
      description: "Strengthen client trust with transparent communication and verifiable service level agreements.",
      icon: "🤝",
      stat: "85%",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <>
      <Head>
        <title>Enterprise-Grade Security System Management | Fielduo</title>
        <meta name="description" content="Streamline security service operations with specialized software for installation, monitoring, and maintenance of integrated security systems" />
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
          
          {/* Security System Mockups */}
          <div className="absolute top-1/2 right-10 transform -translate-y-1/2 opacity-20">
            <div className="w-48 h-48 bg-gray-800 rounded-2xl border-4 border-gray-700 p-4 transform rotate-12">
              <div className="w-full h-6 bg-red-500 rounded mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-700 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-700 rounded mb-4"></div>
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="absolute top-1/3 left-10 opacity-20">
            <div className="w-48 h-48 bg-gray-800 rounded-2xl border-4 border-gray-700 p-4 transform -rotate-12">
              <div className="w-full h-6 bg-red-500 rounded mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-700 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-700 rounded mb-4"></div>
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-blue-900/30 backdrop-blur-sm rounded-full mb-6 border border-blue-500/30">
                <span className="text-blue-400 font-medium">Mission-Critical Solutions</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                Enterprise-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Security</span> System Management
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Streamline security service operations with specialized software for installation, monitoring, and maintenance of integrated security systems.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/20">
                  Schedule Demo
                </button>
                <button className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-900/50 font-bold py-4 px-10 rounded-xl transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive Security Management Features Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Security Management Features</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Our platform provides end-to-end solutions tailored for security service providers
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

        {/* Strategic Advantages Section */}
        <div className="py-20 bg-gradient-to-b from-gray-900 to-black" ref={sectionRef}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Strategic Advantages for Security Providers</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Transform your security service delivery with measurable business outcomes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {advantages.map((advantage, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8 text-center hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`text-5xl mb-6 bg-gradient-to-r ${advantage.color} bg-clip-text text-transparent`}>
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{advantage.title}</h3>
                  <p className="text-gray-400 mb-6">{advantage.description}</p>
                  <div className="text-4xl font-bold text-blue-400">
                    {advantage.stat}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Security Services — FAQs</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Common questions about our security service management solutions
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Enhance Your Security Operations?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Discover how Fielduo can transform your security service delivery with our specialized management platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/20">
                Schedule Demo
              </button>
              <button className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-900/50 font-bold py-4 px-10 rounded-xl transition duration-300">
                Contact Sales
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
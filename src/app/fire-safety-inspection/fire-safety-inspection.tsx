// pages/fire-safety-inspection.js
'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function FireSafetyInspectionPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [counters, setCounters] = useState({
    compliance: 0,
    safety: 0,
    efficiency: 0,
    liability: 0
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
              if (newCounters.compliance < 100) newCounters.compliance += 5;
              if (newCounters.safety < 95) newCounters.safety += 5;
              if (newCounters.efficiency < 40) newCounters.efficiency += 5;
              if (newCounters.liability < 85) newCounters.liability += 5;
              
              if (
                newCounters.compliance >= 100 &&
                newCounters.safety >= 95 &&
                newCounters.efficiency >= 40 &&
                newCounters.liability >= 85
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
      question: "What features does Fielduo offer for Fire Safety & Inspection?",
      answer: "Fielduo provides comprehensive fire safety and inspection management features including inspection scheduling and tracking, fire code compliance management, certificate and documentation handling, emergency response coordination, suppression equipment testing logs, and comprehensive inspection reports. Our platform also offers mobile checklists with photo evidence capture, digital signature collection, automated compliance reporting, and integration with building management systems."
    },
    {
      question: "How can Fire Safety & Inspection businesses improve efficiency with field service management software?",
      answer: "Fire safety businesses can improve efficiency by up to 40% through optimized scheduling that reduces travel time between inspection sites, automated reporting that eliminates paperwork, digital checklists that ensure consistency, and real-time communication between field technicians and office staff. Our software also provides automated reminders for recurring inspections and maintenance, reducing missed appointments and improving resource utilization."
    },
    {
      question: "How does the software help with regulatory compliance for Fire Safety & Inspection?",
      answer: "Fielduo ensures regulatory compliance through automated documentation of all inspections and maintenance activities, digital certificate generation with expiration tracking, customizable checklists aligned with local fire codes, and comprehensive audit trails. The system maintains complete records of all fire safety activities, generates compliance reports for authorities, and provides alerts for upcoming inspection deadlines or certification renewals."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Fire Safety & Inspection?",
      answer: "Yes, Fielduo includes specialized emergency response features for fire safety with priority dispatch for emergency inspections, real-time technician tracking, and instant communication capabilities. Our system can immediately identify and dispatch the nearest qualified technician for emergency situations, provide them with complete building information and fire system details, and maintain real-time communication with emergency services when needed."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Fire Safety & Inspection?",
      answer: "Fielduo provides robust asset management for fire safety equipment including comprehensive fire suppression system databases, inspection history tracking, maintenance schedule automation, and equipment lifecycle management. Our system tracks every fire extinguisher, sprinkler system, alarm panel, and emergency light with complete service history, warranty information, and maintenance requirements, ensuring no equipment is overlooked or improperly maintained."
    },
    {
      question: "How does the software enhance customer communication for Fire Safety & Inspection?",
      answer: "Fielduo enhances customer communication through automated appointment reminders, real-time technician ETAs, digital inspection reports with photos and findings, instant certificate delivery, and a customer portal for viewing service history and documentation. Customers receive timely notifications about upcoming inspections, immediate results after service completion, and easy access to compliance certificates and documentation for their records or insurance purposes."
    },
    {
      question: "What benefits do Fire Safety & Inspection clients see after implementing Fielduo?",
      answer: "Fire safety clients typically see significant improvements including 100% inspection completion rates, 95% improvement in building safety metrics, 40% increase in operational efficiency, and 85% reduction in liability risks. Additional benefits include improved regulatory compliance scores, reduced paperwork and administrative overhead, better resource utilization, enhanced customer satisfaction, and comprehensive audit readiness that simplifies compliance verification."
    }
  ];

  const keyFeatures = [
    {
      title: "Inspection scheduling & tracking",
      description: "Streamline the entire inspection process from scheduling to completion",
      icon: "📅"
    },
    {
      title: "Fire code compliance management",
      description: "Stay ahead of regulations with automated compliance tracking",
      icon: "📋"
    },
    {
      title: "Certificate & documentation handling",
      description: "Generate, store, and manage certificates and inspection reports digitally",
      icon: "📄"
    },
    {
      title: "Emergency response coordination",
      description: "Coordinate emergency responses with real-time dispatch and tracking",
      icon: "🚨"
    },
    {
      title: "Suppression equipment testing logs",
      description: "Track all testing activities and results for fire suppression systems",
      icon: "🔥"
    },
    {
      title: "Comprehensive inspection reports",
      description: "Create detailed reports with photos, findings, and recommendations",
      icon: "📊"
    }
  ];

  const businessBenefits = [
    {
      title: "Ensure code compliance",
      description: "Track certificates, schedules, and corrective actions in one place.",
      icon: "✅"
    },
    {
      title: "Improve building safety",
      description: "Reduce risk with consistent testing and clear records.",
      icon: "🏢"
    },
    {
      title: "Streamline inspections",
      description: "Mobile checklists, templated reports, and dispatch tools.",
      icon: "📱"
    },
    {
      title: "Reduce liability",
      description: "Full audit trails and exportable reports simplify audits.",
      icon: "🛡️"
    }
  ];

  const whyChoose = [
    {
      title: "Fast import & setup",
      description: "Bring your checklists, assets and historical data into Fielduo quickly.",
      icon: "⚡"
    },
    {
      title: "Security & control",
      description: "Role-based access and detailed audit logs keep control tight.",
      icon: "🔒"
    },
    {
      title: "Support & training",
      description: "Onboarding, templates and expert Q&A to get teams productive fast.",
      icon: "👨‍🏫"
    }
  ];

  const experience = [
    {
      title: "Scheduling & Dispatch",
      description: "Visualize routes, assign priority jobs and automatically notify technicians.",
      icon: "🗺️"
    },
    {
      title: "Technician Mobile App",
      description: "Intuitive mobile checklists, photo evidence capture and signature collection on-site.",
      icon: "📱"
    },
    {
      title: "Reports & Compliance",
      description: "Exportable PDF certificates, overdue item tracking and audit reports.",
      icon: "📑"
    }
  ];

  return (
    <>
      <Head>
        <title>Fire Safety & Inspection Management | Fielduo</title>
        <meta name="description" content="Comprehensive fire protection service management for inspections and system maintenance with Fielduo's specialized platform" />
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
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20 z-0"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-sm"
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
          
          {/* Fire Safety Equipment Mockups */}
          <div className="absolute top-1/2 right-10 transform -translate-y-1/2 opacity-20">
            <div className="w-48 h-48 bg-gray-800 rounded-2xl border-4 border-gray-700 p-4 transform rotate-12">
              <div className="w-full h-8 bg-red-500 rounded mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-700 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-700 rounded mb-4"></div>
              <div className="w-full h-6 bg-orange-500 rounded"></div>
            </div>
          </div>
          <div className="absolute top-1/3 left-10 opacity-20">
            <div className="w-48 h-48 bg-gray-800 rounded-2xl border-4 border-gray-700 p-4 transform -rotate-12">
              <div className="w-full h-8 bg-red-500 rounded mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-700 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-700 rounded mb-4"></div>
              <div className="w-full h-6 bg-orange-500 rounded"></div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-red-900/30 backdrop-blur-sm rounded-full mb-6 border border-red-500/30">
                <span className="text-red-400 font-medium">Life-Saving Technology</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                Fire Safety & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Inspection</span> Management
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Comprehensive fire protection service management for inspections and system maintenance. Ensure faster scheduling, regulatory compliance, and safer buildings with our specialized platform.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-red-500/20">
                  Request a Demo
                </button>
                <button className="bg-transparent border-2 border-red-500 text-red-400 hover:bg-red-900/50 font-bold py-4 px-10 rounded-xl transition duration-300">
                  View FAQs
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
                Specialized tools designed to streamline fire safety inspections and ensure regulatory compliance
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {keyFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8 transition-all duration-500 transform hover:-translate-y-2 ${
                    hoveredFeature === index ? 'border-red-500 shadow-xl shadow-red-500/20' : ''
                  }`}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-red-400">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Business Benefits Section */}
        <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Business Benefits</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Deliver safer buildings, stay audit-ready, and streamline your inspection operations with a system built for field-first teams.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {businessBenefits.map((benefit, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8 text-center hover:border-red-500 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-5xl mb-6">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Fielduo</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                We help you start quickly by importing your data, checklists, and assets. Security is built-in with role-based permissions and full audit logs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {whyChoose.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8 text-center hover:border-red-500 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-red-400">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What You'll Experience Section */}
        <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Experience</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Streamlined workflows designed specifically for fire safety inspection teams
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {experience.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8 text-center hover:border-red-500 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-red-400">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* See Fielduo in Action Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">See Fielduo in Action</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Schedule a personalized demonstration to explore our scheduling tools, mobile workflows, and compliance reporting features with our industry experts.
            </p>
            
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-800 p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📅</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Scheduling Tools</h3>
                  <p className="text-gray-400 text-sm">Visual scheduling with drag-and-drop functionality</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Mobile Workflows</h3>
                  <p className="text-gray-400 text-sm">Intuitive checklists and photo capture</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📑</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Compliance Reports</h3>
                  <p className="text-gray-400 text-sm">Exportable certificates and audit trails</p>
                </div>
              </div>
              
              <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-red-500/20">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Get answers to common questions about our fire safety and inspection management solutions
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`mb-6 rounded-2xl overflow-hidden transition-all duration-300 ${
                    activeFaq === index 
                      ? 'bg-gradient-to-r from-gray-900 to-gray-800 border border-red-500/30 shadow-xl shadow-red-500/10' 
                      : 'bg-gray-900/50 border border-gray-800'
                  }`}
                >
                  <button
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-800/30 transition duration-300"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="text-lg font-medium flex items-center">
                      <span className="text-red-400 mr-3">Q{index + 1}.</span>
                      {faq.question}
                    </span>
                    <svg
                      className={`w-6 h-6 transform transition-transform duration-300 ${
                        activeFaq === index ? 'rotate-180 text-red-400' : 'text-gray-500'
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
        <div className="bg-gradient-to-r from-red-900/30 via-orange-900/30 to-yellow-900/30 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Enhance Your Fire Safety Operations?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Join the growing community of fire safety professionals who trust Fielduo to streamline their operations and ensure regulatory compliance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-red-500/20">
                Start Free Trial
              </button>
              <button className="bg-transparent border-2 border-red-500 text-red-400 hover:bg-red-900/50 font-bold py-4 px-10 rounded-xl transition duration-300">
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
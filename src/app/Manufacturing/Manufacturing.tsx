// pages/manufacturing-equipment-service-management.js
'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function ManufacturingEquipmentServiceManagement() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [counters, setCounters] = useState({
    downtime: 0,
    savings: 0,
    compliance: 0,
    clients: 0
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
              if (newCounters.downtime < 45) newCounters.downtime += 3;
              if (newCounters.savings < 30) newCounters.savings += 2;
              if (newCounters.compliance < 98) newCounters.compliance += 4;
              if (newCounters.clients < 250) newCounters.clients += 10;
              
              if (
                newCounters.downtime >= 45 &&
                newCounters.savings >= 30 &&
                newCounters.compliance >= 98 &&
                newCounters.clients >= 250
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
      question: "What specialized features does Fielduo offer for Manufacturing operations?",
      answer: "Fielduo offers comprehensive manufacturing-specific features including predictive maintenance with IoT integration, full asset lifecycle management, digital safety protocols, emergency response systems, industrial inventory management, equipment performance analytics, preventive maintenance automation, IoT device connectivity, and equipment configuration management. Our platform is designed to handle the unique challenges of industrial environments including complex equipment hierarchies, stringent compliance requirements, and critical uptime needs."
    },
    {
      question: "How can Manufacturing businesses improve operational efficiency with field service management software?",
      answer: "Manufacturing businesses can significantly improve operational efficiency through predictive maintenance that prevents costly downtime, optimized technician scheduling that reduces travel time, automated compliance reporting that saves administrative work, and data-driven maintenance planning that extends equipment life. Our customers typically see 30-45% reduction in unplanned downtime and 20-30% maintenance cost savings through more efficient resource allocation and proactive maintenance strategies."
    },
    {
      question: "How does the software ensure regulatory compliance for Manufacturing operations?",
      answer: "Fielduo ensures regulatory compliance through digital safety procedures, automated compliance tracking, audit-ready documentation, and customizable compliance workflows. The system maintains complete service histories, safety protocol documentation, certification tracking, and generates compliance reports for audits. It supports industry-specific regulations including OSHA, ISO standards, and environmental regulations, with customizable checklists and automated compliance verification."
    },
    {
      question: "Does Fielduo support emergency response and priority scheduling for critical manufacturing equipment?",
      answer: "Yes, Fielduo includes robust emergency response capabilities with priority dispatch protocols for critical equipment failures. The system automatically identifies emergency situations, dispatches the nearest qualified technicians with required skills and parts, provides real-time status updates, and enables escalation workflows. Our platform ensures minimal downtime for critical equipment with SLA monitoring and performance tracking for emergency response scenarios."
    },
    {
      question: "How does Fielduo handle inventory, assets, and equipment tracking for Manufacturing?",
      answer: "Fielduo provides comprehensive manufacturing inventory and asset management with industrial equipment catalogs, hierarchical asset structures, complete lifecycle documentation, spare parts inventory with barcode/RFID support, automated reorder points, and supplier integration. The system tracks equipment performance metrics, maintenance history, warranty information, and depreciation schedules while optimizing inventory levels to balance availability and carrying costs."
    },
    {
      question: "How does the software enhance communication with manufacturing clients and stakeholders?",
      answer: "Fielduo enhances communication through real-time status updates, automated service notifications, digital service reports with photos and videos, customer portals for self-service, and integrated messaging systems. Stakeholders receive timely information about equipment status, maintenance activities, and potential issues. The system facilitates communication between technicians, supervisors, equipment operators, and management to ensure everyone has the information they need."
    },
    {
      question: "What measurable benefits do Manufacturing clients typically experience after implementing Fielduo?",
      answer: "Manufacturing clients typically experience significant measurable benefits including 40-50% reduction in unplanned downtime, 25-35% maintenance cost savings, 98%+ compliance accuracy, improved safety metrics, extended equipment lifespan, and better resource utilization. Customers also report improved technician productivity, better inventory management, enhanced decision-making through data insights, and increased overall operational efficiency."
    }
  ];

  const features = [
    {
      title: "Predictive Maintenance",
      description: "IoT-enabled equipment monitoring with predictive analytics to prevent failures before they occur",
      icon: "🔮",
      detail: "AI-powered failure prediction with real-time monitoring and automated maintenance scheduling"
    },
    {
      title: "Asset Management",
      description: "Comprehensive industrial equipment tracking with full lifecycle documentation and history",
      icon: "🏭",
      detail: "Complete asset lifecycle management from installation to decommissioning"
    },
    {
      title: "Safety & Compliance",
      description: "Digital safety procedures, compliance tracking, and audit-ready documentation",
      icon: "🛡️",
      detail: "Automated compliance workflows with digital safety protocols and audit trails"
    },
    {
      title: "Emergency Response",
      description: "Rapid dispatch protocols for critical equipment failures with priority escalation",
      icon: "🚨",
      detail: "Priority response system with SLA monitoring and escalation workflows"
    },
    {
      title: "Inventory Management",
      description: "Industrial spare parts inventory tracking with automated procurement alerts",
      icon: "📦",
      detail: "Optimized inventory levels with barcode scanning and automated reordering"
    },
    {
      title: "Performance Analytics",
      description: "Equipment performance monitoring with actionable insights for optimization",
      icon: "📊",
      detail: "Advanced analytics with KPI tracking and performance benchmarking"
    },
    {
      title: "Preventive Maintenance",
      description: "Scheduled maintenance programs with automated work order generation",
      icon: "🔧",
      detail: "Automated PM scheduling based on equipment usage and manufacturer recommendations"
    },
    {
      title: "IoT Integration",
      description: "Seamless connectivity with industrial IoT devices and monitoring systems",
      icon: "📡",
      detail: "Real-time data integration with industrial IoT sensors and monitoring equipment"
    },
    {
      title: "Equipment Configuration",
      description: "Centralized management of equipment specifications and service requirements",
      icon: "⚙️",
      detail: "Comprehensive equipment database with specifications and service requirements"
    }
  ];

  const advantages = [
    {
      title: "Minimize Production Downtime",
      description: "Predictive maintenance and rapid emergency response reduce equipment failures and maximize production uptime.",
      icon: "⏱️",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Enhance Workplace Safety",
      description: "Digital safety protocols and compliance tracking create safer work environments and reduce incidents.",
      icon: "👷",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Optimize Equipment Performance",
      description: "Data-driven maintenance strategies and performance analytics extend equipment lifespan and efficiency.",
      icon: "📈",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Reduce Operational Costs",
      description: "Efficient resource allocation, inventory optimization, and preventive maintenance lower total cost of ownership.",
      icon: "💰",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Ensure Regulatory Compliance",
      description: "Automated compliance tracking and audit-ready documentation minimize regulatory risks.",
      icon: "✅",
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Improve Decision Making",
      description: "Comprehensive analytics provide actionable insights for continuous operational improvement.",
      icon: "🧠",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  const testimonials = [
    {
      quote: "Fielduo has transformed our maintenance operations, reducing unplanned downtime by 45% and saving over $200,000 annually in maintenance costs.",
      author: "James Wilson",
      role: "Plant Manager",
      company: "Precision Manufacturing Inc."
    },
    {
      quote: "The compliance features have been invaluable for our multi-site operations. We've streamlined safety protocols and passed all regulatory audits with ease.",
      author: "Lisa Chen",
      role: "Operations Director",
      company: "Advanced Industrial Systems"
    }
  ];

  return (
    <>
      <Head>
        <title>Manufacturing Equipment Service Management | Fielduo</title>
        <meta name="description" content="Optimize manufacturing equipment maintenance, reduce downtime, and enhance operational efficiency with Fielduo's specialized industrial management platform" />
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
          
          {/* Manufacturing Equipment Mockups */}
          <div className="absolute top-1/2 right-10 transform -translate-y-1/2 opacity-20">
            <div className="w-56 h-56 bg-gray-800 rounded-2xl border-4 border-gray-700 p-4 transform rotate-12">
              <div className="w-full h-8 bg-gray-700 rounded mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-700 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-700 rounded mb-4"></div>
              <div className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
            </div>
          </div>
          <div className="absolute top-1/3 left-10 opacity-20">
            <div className="w-56 h-56 bg-gray-800 rounded-2xl border-4 border-gray-700 p-4 transform -rotate-12">
              <div className="w-full h-8 bg-gray-700 rounded mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-700 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-700 rounded mb-4"></div>
              <div className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
            </div>
          </div>
          
          {/* Stats Display */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 opacity-20">
            <div className="flex flex-col space-y-2">
              <div className="w-32 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
              <div className="text-xs text-gray-400">45% Downtime Reduction</div>
            </div>
          </div>
          
          <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 opacity-20">
            <div className="flex flex-col space-y-2">
              <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              <div className="text-xs text-gray-400">30% Cost Savings</div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-blue-900/30 backdrop-blur-sm rounded-full mb-6 border border-blue-500/30">
                <span className="text-blue-400 font-medium">Industrial Excellence</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                Manufacturing Equipment <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Service Management</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Optimize manufacturing equipment maintenance, reduce downtime, and enhance operational efficiency with our specialized industrial management platform.
              </p>
              
              {/* Stats Display */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                {[
                  { value: "45%", label: "Reduction in Downtime", icon: "⏱️" },
                  { value: "30%", label: "Maintenance Cost Savings", icon: "💰" },
                  { value: "98%", label: "Compliance Accuracy", icon: "✅" },
                  { value: "250+", label: "Manufacturing Clients", icon: "🏭" }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="text-3xl mr-3">{stat.icon}</div>
                    <div>
                      <div className="text-xl font-bold">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/20">
                  Request a Demo
                </button>
                <button className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-900/50 font-bold py-4 px-10 rounded-xl transition duration-300">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive Manufacturing Service Solutions Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Manufacturing Service Solutions</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Enterprise-grade tools designed specifically for industrial equipment management and maintenance
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

        {/* Strategic Manufacturing Advantages Section */}
        <div className="py-20 bg-gradient-to-b from-gray-900 to-black" ref={sectionRef}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Strategic Manufacturing Advantages</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Drive operational excellence with measurable business outcomes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {advantages.map((advantage, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8 text-center hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`text-5xl mb-6 bg-gradient-to-r ${advantage.color} bg-clip-text text-transparent`}>
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{advantage.title}</h3>
                  <p className="text-gray-400 mb-6">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Manufacturing Leaders</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Hear from industry leaders who have transformed their operations with Fielduo
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8">
                  <div className="text-blue-400 text-4xl mb-4">"</div>
                  <p className="text-gray-300 mb-6 italic">{testimonial.quote}</p>
                  <div>
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    <div className="text-gray-500 text-sm">{testimonial.company}</div>
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
                Common questions about our manufacturing service management solutions
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform Your Manufacturing Operations</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Reduce downtime, enhance safety, and optimize equipment performance with our specialized manufacturing management platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/20">
                Request a Demo
              </button>
              <button className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-900/50 font-bold py-4 px-10 rounded-xl transition duration-300">
                Contact Sales
              </button>
            </div>
            <p className="mt-8 text-gray-500">or explore our manufacturing solutions</p>
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
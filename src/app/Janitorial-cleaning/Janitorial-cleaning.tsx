// pages/janitorial-cleaning.js
'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function JanitorialCleaningPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [counters, setCounters] = useState({
    satisfaction: 0,
    reporting: 0,
    costReduction: 0,
    businesses: 0
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
              if (newCounters.satisfaction < 98) newCounters.satisfaction += 2;
              if (newCounters.reporting < 89) newCounters.reporting += 3;
              if (newCounters.costReduction < 42) newCounters.costReduction += 3;
              if (newCounters.businesses < 500) newCounters.businesses += 25;
              
              if (
                newCounters.satisfaction >= 98 &&
                newCounters.reporting >= 89 &&
                newCounters.costReduction >= 42 &&
                newCounters.businesses >= 500
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
      question: "What features does Fielduo offer for Janitorial & Cleaning?",
      answer: "Fielduo offers a comprehensive suite of janitorial-specific features including quality assurance tools with digital inspection forms, supply inventory management with automated reordering, multi-location coordination capabilities, employee time tracking with productivity monitoring, real-time client communication systems, and health/safety compliance documentation. Our platform also includes specialized reporting for cleaning businesses, client portals for service requests, and mobile apps for technicians with offline capabilities."
    },
    {
      question: "How can Janitorial & Cleaning businesses improve efficiency with field service management software?",
      answer: "Janitorial businesses can improve efficiency by up to 40% through automated scheduling that optimizes technician routes and reduces travel time. Our software streamlines administrative tasks, provides real-time visibility into operations, automates quality control processes, and offers data-driven insights to optimize resource allocation. The system also eliminates paperwork, reduces errors, and enables faster response times to client needs."
    },
    {
      question: "How does the software help with regulatory compliance for Janitorial & Cleaning?",
      answer: "Fielduo helps janitorial businesses maintain regulatory compliance through digital documentation of cleaning protocols, automated health and safety checklists, certification tracking for employees, and compliance reporting. Our system ensures all cleaning activities meet industry standards and regulatory requirements, stores digital records for audits, and can be customized to meet specific regional or industry regulations. We also provide automated reminders for compliance renewals and training."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Janitorial & Cleaning?",
      answer: "Yes, Fielduo includes a comprehensive emergency response system with priority dispatch capabilities for urgent cleaning needs. Our platform supports 24/7 scheduling for emergency cleanups, spill responses, or other urgent situations. The system can automatically identify and prioritize emergency requests, dispatch the nearest qualified team, and provide clients with real-time updates. We also maintain emergency service history and performance metrics for continuous improvement."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Janitorial & Cleaning?",
      answer: "Fielduo provides specialized inventory management for cleaning supplies with barcode scanning, automated reorder alerts, and supplier integration. Our system tracks cleaning equipment maintenance schedules, monitors supply usage patterns, and optimizes inventory levels across multiple locations. Technicians can access inventory information on their mobile devices, report usage in real-time, and request supplies as needed, ensuring optimal stock levels without overstocking."
    },
    {
      question: "How does the software enhance customer communication for Janitorial & Cleaning?",
      answer: "Fielduo enhances customer communication through automated service confirmations, real-time cleaning progress updates, digital before/after photos, and a client portal for service requests and feedback. Customers receive notifications when cleaning teams arrive and complete services, can view detailed service reports, and easily communicate special requirements or issues. This transparency builds trust and improves customer satisfaction."
    },
    {
      question: "What benefits do Janitorial & Cleaning clients see after implementing Fielduo?",
      answer: "Janitorial clients typically see significant improvements including 98% client satisfaction rates, 89% faster reporting, 42% cost reduction in operations, and improved service consistency. Additional benefits include better resource utilization, reduced administrative overhead, improved compliance tracking, enhanced customer communication, and data-driven insights that support business growth and service quality improvements."
    }
  ];

  const features = [
    {
      title: "Quality Assurance",
      description: "Digital inspection forms and quality control protocols",
      icon: "✅",
      detail: "Standardized quality checks with photo documentation and client sign-off"
    },
    {
      title: "Supply Management",
      description: "Cleaning supply inventory and automated reordering",
      icon: "🧴",
      detail: "Track supply usage across locations with automated reordering and cost optimization"
    },
    {
      title: "Multi-Location",
      description: "Coordinate cleaning services across multiple facilities",
      icon: "🏢",
      detail: "Centralized management of multiple sites with consistent service standards"
    },
    {
      title: "Time Tracking",
      description: "Employee time tracking and productivity monitoring",
      icon: "⏱️",
      detail: "Monitor employee productivity and optimize scheduling for maximum efficiency"
    },
    {
      title: "Client Communication",
      description: "Real-time service updates and issue reporting",
      icon: "💬",
      detail: "Transparent communication with real-time updates and issue resolution tracking"
    },
    {
      title: "Compliance Docs",
      description: "Health and safety compliance tracking",
      icon: "📋",
      detail: "Digital compliance documentation with automated reminders and audit trails"
    }
  ];

  const advantages = [
    {
      title: "Maintain Standards",
      description: "Consistent cleaning protocols and quality assurance",
      icon: "🎯",
      stat: "98%",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Reduce Admin Work",
      description: "Automated reporting and invoice generation",
      icon: "📝",
      stat: "89%",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Improve Communication",
      description: "Real-time client updates and transparent service delivery",
      icon: "📱",
      stat: "95%",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Scale Operations",
      description: "Efficiently manage multiple locations and teams",
      icon: "📈",
      stat: "42%",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const testimonials = [
    {
      quote: "Fielduo has transformed how we manage our cleaning operations. The quality control features have helped us maintain consistent standards across all locations.",
      author: "Sarah Johnson",
      company: "CleanPro Services"
    },
    {
      quote: "The inventory management system has saved us countless hours and reduced our supply costs by 30%. The automated reordering feature is a game-changer.",
      author: "Michael Torres",
      company: "Sparkle Clean Co."
    },
    {
      quote: "Client communication has never been easier. The real-time updates and transparent service delivery have significantly improved our customer satisfaction scores.",
      author: "Emily Chen",
      company: "OfficeCare Cleaners"
    }
  ];

  return (
    <>
      <Head>
        <title>Janitorial & Cleaning Field Service Management | Fielduo</title>
        <meta name="description" content="Transform your cleaning business with Fielduo's specialized field service management software for janitorial companies" />
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
          
          {/* Cleaning Equipment Mockups */}
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
                <span className="text-blue-400 font-medium">Industry-Specific Solution</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Cleaning</span> Business
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Manage your commercial cleaning operations with specialized tools for quality control and client satisfaction.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                {[
                  { value: "98%", label: "Client Satisfaction", icon: "😊" },
                  { value: "89%", label: "Faster Reporting", icon: "📊" },
                  { value: "42%", label: "Cost Reduction", icon: "💰" },
                  { value: "500+", label: "Businesses Using", icon: "🏢" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">
                      {stat.label === "Client Satisfaction" ? counters.satisfaction + stat.value : 
                       stat.label === "Faster Reporting" ? counters.reporting + stat.value :
                       stat.label === "Cost Reduction" ? counters.costReduction + stat.value :
                       counters.businesses + stat.value}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/20">
                  Watch Demo
                </button>
                <button className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-900/50 font-bold py-4 px-10 rounded-xl transition duration-300">
                  Book a Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Janitorial-Specific Features Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Janitorial-Specific Features</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Everything you need to manage your cleaning business efficiently
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

        {/* Cleaning Business Advantages Section */}
        <div className="py-20 bg-gradient-to-b from-gray-900 to-black" ref={sectionRef}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Cleaning Business Advantages</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Why thousands of cleaning companies choose Fielduo
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

        {/* Testimonials Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Join thousands of satisfied cleaning businesses
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8 hover:border-blue-500 transition-all duration-300">
                  <div className="text-blue-400 text-4xl mb-4">"</div>
                  <p className="text-gray-300 mb-6 italic">{testimonial.quote}</p>
                  <div>
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-gray-500">{testimonial.company}</div>
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
                Everything you need to know about Fielduo
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Cleaning Business?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Join thousands of janitorial companies that use Fielduo to streamline operations, improve quality, and grow their business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/20">
                Watch Demo
              </button>
              <button className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-900/50 font-bold py-4 px-10 rounded-xl transition duration-300">
                Book a Demo
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
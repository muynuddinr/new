// pages/landscaping.js
'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function LandscapingPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [counters, setCounters] = useState({
    routes: 0,
    seasonal: 0,
    compliance: 0,
    communication: 0
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
              if (newCounters.routes < 30) newCounters.routes += 2;
              if (newCounters.seasonal < 40) newCounters.seasonal += 3;
              if (newCounters.compliance < 95) newCounters.compliance += 4;
              if (newCounters.communication < 85) newCounters.communication += 4;
              
              if (
                newCounters.routes >= 30 &&
                newCounters.seasonal >= 40 &&
                newCounters.compliance >= 95 &&
                newCounters.communication >= 85
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
      question: "What features does Fielduo offer for Landscaping & Lawn Care?",
      answer: "Fielduo offers comprehensive landscaping-specific features including seasonal service automation, equipment tracking and maintenance scheduling, chemical usage and compliance tracking, property mapping with digital layouts, weather-based scheduling adjustments, and multi-crew management with route optimization. Our platform also provides mobile apps for field technicians, customer self-service portals, and detailed reporting tailored to landscaping business needs."
    },
    {
      question: "How can Landscaping & Lawn Care businesses improve efficiency with field service management software?",
      answer: "Landscaping businesses can improve efficiency by up to 30% through GPS-enabled route optimization that reduces travel time and fuel costs. Our software automates scheduling based on weather conditions and seasonal demands, tracks equipment to prevent downtime, and streamlines administrative tasks. Technicians spend more time on billable work and less on paperwork, while managers gain real-time visibility into operations."
    },
    {
      question: "How does the software help with regulatory compliance for Landscaping & Lawn Care?",
      answer: "Fielduo helps landscaping businesses maintain regulatory compliance through comprehensive chemical usage tracking, automated record-keeping, and compliance reporting. Our system tracks pesticide and fertilizer applications, maintains detailed application logs with weather conditions, generates required compliance reports, and ensures proper documentation for environmental regulations. We also support state-specific requirements and can be customized to meet local compliance needs."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Landscaping & Lawn Care?",
      answer: "Yes, Fielduo includes emergency response capabilities for landscaping businesses with priority dispatch for storm damage, irrigation failures, or other urgent landscaping needs. Our system can quickly identify available crews, optimize emergency routes, and provide real-time status updates. Weather integration helps anticipate and prepare for weather-related emergencies, while automated rescheduling ensures smooth operations during disruptions."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Landscaping & Lawn Care?",
      answer: "Fielduo provides robust equipment and inventory tracking specifically designed for landscaping businesses. Our system tracks equipment usage hours, maintenance schedules, and repair history to maximize equipment lifespan. For inventory, we manage chemicals, plants, materials, and supplies with automated reorder alerts and supplier integration. Asset tracking includes tools, vehicles, and other equipment with GPS location and utilization monitoring."
    },
    {
      question: "How does the software enhance customer communication for Landscaping & Lawn Care?",
      answer: "Fielduo enhances customer communication through automated service reminders, real-time technician tracking with ETAs, before/after photo documentation, and digital service reports. Customers receive notifications about scheduled services, weather-related delays, and completion alerts. Our customer portal allows clients to view service history, request additional services, make payments, and access property-specific recommendations and maintenance schedules."
    },
    {
      question: "What benefits do Landscaping & Lawn Care clients see after implementing Fielduo?",
      answer: "Landscaping clients typically see significant improvements including up to 30% reduction in fuel costs through route optimization, 40% better seasonal planning and resource allocation, 95% improved compliance with environmental regulations, and 85% enhanced customer satisfaction through better communication and service quality. Additional benefits include reduced administrative overhead, improved equipment utilization, better crew productivity, and data-driven business insights for strategic decision-making."
    }
  ];

  const features = [
    {
      title: "Seasonal Service",
      description: "Automated scheduling for seasonal landscaping tasks. Plan and execute spring cleanups, summer maintenance, fall leaf removal, and winter preparations with precision timing.",
      icon: "🌱",
      detail: "AI-powered seasonal planning with automated task generation and scheduling"
    },
    {
      title: "Equipment Tracking",
      description: "Monitor lawn care equipment maintenance and utilization. Track usage hours, schedule maintenance, and manage your equipment fleet to maximize productivity and lifespan.",
      icon: "🚜",
      detail: "Comprehensive equipment lifecycle management with predictive maintenance"
    },
    {
      title: "Chemical Tracking",
      description: "Record and monitor pesticide and fertilizer usage. Maintain compliance logs, track inventory, and ensure proper application rates for environmental safety.",
      icon: "🧪",
      detail: "Regulatory compliance tracking with detailed application records and reporting"
    },
    {
      title: "Property Mapping",
      description: "Create digital property layouts and service area documentation. Visualize job sites, mark specific features, and provide detailed service documentation to clients.",
      icon: "🗺️",
      detail: "Interactive property maps with service zones and feature documentation"
    },
    {
      title: "Weather Integration",
      description: "Weather-based scheduling and service adjustments. Automatically reschedule work during inclement weather and optimize your calendar based on forecast conditions.",
      icon: "🌤️",
      detail: "Real-time weather integration with automated schedule adjustments"
    },
    {
      title: "Crew Management",
      description: "Multi-crew scheduling and route optimization. Assign the right team to each job, optimize travel routes, and track crew productivity in real-time.",
      icon: "👥",
      detail: "Multi-crew coordination with real-time productivity tracking"
    }
  ];

  const benefits = [
    {
      title: "Optimize Routes",
      description: "GPS-enabled routing for efficient service delivery. Reduce fuel costs, minimize travel time between jobs, and serve more customers each day.",
      icon: "🗺️",
      stat: "30%",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Seasonal Planning",
      description: "Automated scheduling for peak seasons and weather. Prepare for seasonal rushes with optimized staffing and resource allocation.",
      icon: "📅",
      stat: "40%",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Compliance",
      description: "Chemical usage tracking and environmental compliance. Maintain detailed records for regulatory requirements and demonstrate your commitment to safety.",
      icon: "📋",
      stat: "95%",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Customer Communication",
      description: "Automated service notifications and photo documentation. Keep clients informed with before/after photos and service completion alerts.",
      icon: "💬",
      stat: "85%",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const whyChoose = [
    {
      title: "Seasonal Scheduling",
      description: "Automate seasonal tasks and planning",
      icon: "📅"
    },
    {
      title: "Equipment Management",
      description: "Track and maintain your equipment fleet",
      icon: "🚜"
    },
    {
      title: "Compliance Tracking",
      description: "Maintain chemical usage records",
      icon: "📋"
    },
    {
      title: "Crew Optimization",
      description: "Manage multiple teams efficiently",
      icon: "👥"
    }
  ];

  return (
    <>
      <Head>
        <title>Landscaping & Lawn Care Management | Fielduo</title>
        <meta name="description" content="Streamline your landscaping operations with comprehensive software designed for outdoor service professionals" />
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
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 z-0"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm"
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
          
          {/* Landscaping Equipment Mockups */}
          <div className="absolute top-1/2 right-10 transform -translate-y-1/2 opacity-20">
            <div className="w-48 h-48 bg-gray-800 rounded-2xl border-4 border-gray-700 p-4 transform rotate-12">
              <div className="w-full h-12 bg-green-600 rounded mb-2"></div>
              <div className="w-3/4 h-3 bg-gray-700 rounded mb-2"></div>
              <div className="w-1/2 h-3 bg-gray-700 rounded mb-4"></div>
              <div className="flex space-x-1">
                <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="absolute top-1/3 left-10 opacity-20">
            <div className="w-48 h-48 bg-gray-800 rounded-2xl border-4 border-gray-700 p-4 transform -rotate-12">
              <div className="w-full h-12 bg-green-600 rounded mb-2"></div>
              <div className="w-3/4 h-3 bg-gray-700 rounded mb-2"></div>
              <div className="w-1/2 h-3 bg-gray-700 rounded mb-4"></div>
              <div className="flex space-x-1">
                <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-green-900/30 backdrop-blur-sm rounded-full mb-6 border border-green-500/30">
                <span className="text-green-400 font-medium">Outdoor Service Excellence</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                Landscaping & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Lawn Care</span> Management
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Streamline your landscaping operations with comprehensive software designed for outdoor service professionals. Optimize scheduling, track equipment, ensure compliance, and deliver exceptional service to your clients.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-green-500/20">
                  Get Started Today
                </button>
                <button className="bg-transparent border-2 border-green-500 text-green-400 hover:bg-green-900/50 font-bold py-4 px-10 rounded-xl transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Landscaping-Specific Features Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Landscaping-Specific Features</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Specialized tools designed for the unique needs of landscaping and lawn care professionals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8 transition-all duration-500 transform hover:-translate-y-2 ${
                    hoveredFeature === index ? 'border-green-500 shadow-xl shadow-green-500/20' : ''
                  }`}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-green-400">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <p className="text-sm text-gray-500">{feature.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Landscaping Business Benefits Section */}
        <div className="py-20 bg-gradient-to-b from-gray-900 to-black" ref={sectionRef}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Landscaping Business Benefits</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Drive growth and efficiency with tools designed for outdoor service businesses
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8 text-center hover:border-green-500 transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`text-5xl mb-6 bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-400 mb-6">{benefit.description}</p>
                  <div className="text-4xl font-bold text-green-400">
                    {benefit.stat}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transform Your Landscaping Business Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform Your Landscaping Business</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Join thousands of landscaping professionals who have streamlined their operations, improved customer satisfaction, and grown their business with Fielduo.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-green-500/20">
                Start Your Free Trial
              </button>
              <button className="bg-transparent border-2 border-green-500 text-green-400 hover:bg-green-900/50 font-bold py-4 px-10 rounded-xl transition duration-300">
                Request a Demo
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Landscaping & Lawn Care Field Service — FAQs</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Common questions about our landscaping and lawn care management solutions
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`mb-6 rounded-2xl overflow-hidden transition-all duration-300 ${
                    activeFaq === index 
                      ? 'bg-gradient-to-r from-gray-900 to-gray-800 border border-green-500/30 shadow-xl shadow-green-500/10' 
                      : 'bg-gray-900/50 border border-gray-800'
                  }`}
                >
                  <button
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-800/30 transition duration-300"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="text-lg font-medium flex items-center">
                      <span className="text-green-400 mr-3">Q{index + 1}.</span>
                      {faq.question}
                    </span>
                    <svg
                      className={`w-6 h-6 transform transition-transform duration-300 ${
                        activeFaq === index ? 'rotate-180 text-green-400' : 'text-gray-500'
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

        {/* Why Choose Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Fielduo for Your Landscaping Business?</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Comprehensive tools designed specifically for the unique challenges of landscaping and lawn care businesses
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {whyChoose.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8 text-center hover:border-green-500 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-green-400">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-green-900/30 via-blue-900/30 to-purple-900/30 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Landscaping Business?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Join thousands of landscaping professionals who trust Fielduo to streamline their operations and accelerate growth.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-green-500/20">
                Start Free Trial
              </button>
              <button className="bg-transparent border-2 border-green-500 text-green-400 hover:bg-green-900/50 font-bold py-4 px-10 rounded-xl transition duration-300">
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
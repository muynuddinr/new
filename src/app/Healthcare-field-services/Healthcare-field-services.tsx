// pages/healthcare-field-service.js
'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function HealthcareFieldService() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [counters, setCounters] = useState({
    adminTime: 0,
    compliance: 0,
    responseTime: 0,
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
              if (newCounters.adminTime < 40) newCounters.adminTime += 2;
              if (newCounters.compliance < 98) newCounters.compliance += 3;
              if (newCounters.responseTime < 35) newCounters.responseTime += 2;
              if (newCounters.clients < 500) newCounters.clients += 20;
              
              if (
                newCounters.adminTime >= 40 &&
                newCounters.compliance >= 98 &&
                newCounters.responseTime >= 35 &&
                newCounters.clients >= 500
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
      question: "What features does Fielduo offer for Healthcare Field Services?",
      answer: "Fielduo offers comprehensive healthcare-specific features including HIPAA-compliant patient scheduling, medical records integration, compliance management, equipment tracking, care coordination, emergency response, patient care plans, privacy protection, and performance analytics. Our platform is designed to support home health services, mobile clinics, and specialized patient care with enterprise-grade security and healthcare-specific workflows."
    },
    {
      question: "How can Healthcare Field Services businesses improve efficiency with field service management software?",
      answer: "Healthcare field service businesses can improve efficiency by up to 40% through automated scheduling that optimizes routes for home visits and mobile clinics. Our software reduces administrative burden, ensures proper equipment and supplies are available, provides healthcare professionals with complete patient information, and enables real-time communication and coordination between care teams."
    },
    {
      question: "How does the software help with regulatory compliance for Healthcare Field Services?",
      answer: "Fielduo helps healthcare organizations maintain regulatory compliance through automated HIPAA compliance tracking, audit trails, documentation management, and staff certification tracking. Our system ensures all patient interactions are properly documented, privacy safeguards are maintained, and generates compliance reports for regulatory audits. We stay current with healthcare regulations and update our platform accordingly."
    },
    {
      question: "Does Fielduo offer emergency response or scheduling for Healthcare Field Services?",
      answer: "Yes, Fielduo includes a comprehensive emergency response system with priority dispatch for urgent healthcare needs. Our platform can identify and prioritize emergency calls, dispatch the nearest qualified healthcare provider, and provide real-time status updates. The system maintains emergency response protocols, tracks response times, and ensures proper documentation for emergency situations."
    },
    {
      question: "How does Fielduo support inventory, assets, or equipment tracking for Healthcare Field Services?",
      answer: "Fielduo provides robust inventory and equipment management specifically designed for healthcare operations. Our system tracks medical equipment, supplies, and medications with barcode scanning, expiration date monitoring, and automated reorder alerts. We maintain equipment service histories, calibration schedules, and ensure healthcare providers have the necessary resources for each patient visit."
    },
    {
      question: "How does the software enhance customer communication for Healthcare Field Services?",
      answer: "Fielduo enhances healthcare communication through secure messaging, appointment reminders, real-time provider tracking with ETAs, and a patient portal for accessing care information. Our system facilitates communication between care team members, patients, and family members while maintaining HIPAA compliance. Patients receive timely updates and can communicate securely with their healthcare providers."
    },
    {
      question: "What benefits do Healthcare Field Services clients see after implementing Fielduo?",
      answer: "Healthcare clients typically see significant improvements including 40% reduction in administrative time, 98% compliance accuracy, 35% faster response times, and enhanced patient satisfaction. Additional benefits include improved resource utilization, better care coordination, reduced emergency response times, comprehensive compliance management, and data-driven insights for continuous service improvement."
    }
  ];

  const features = [
    {
      title: "Patient Scheduling",
      description: "Optimize home visits and mobile healthcare appointments with intelligent routing.",
      icon: "📅",
      detail: "AI-powered scheduling that considers patient needs, provider qualifications, and travel optimization"
    },
    {
      title: "Medical Records Integration",
      description: "Secure, HIPAA-compliant access to patient information and medical histories.",
      icon: "📋",
      detail: "Seamless integration with EHR systems while maintaining strict privacy controls"
    },
    {
      title: "Compliance Management",
      description: "Automated tracking of HIPAA compliance and healthcare regulations.",
      icon: "✅",
      detail: "Comprehensive audit trails and automated compliance reporting for regulatory requirements"
    },
    {
      title: "Equipment Tracking",
      description: "Comprehensive management of mobile medical equipment and supplies.",
      icon: "🔧",
      detail: "Real-time tracking of medical equipment with maintenance schedules and calibration alerts"
    },
    {
      title: "Care Coordination",
      description: "Seamless multi-provider service coordination and communication.",
      icon: "👥",
      detail: "Integrated care team communication with shared patient information and treatment plans"
    },
    {
      title: "Emergency Response",
      description: "Priority scheduling and rapid response for urgent healthcare needs.",
      icon: "🚨",
      detail: "Rapid deployment system with priority dispatch and real-time status updates"
    },
    {
      title: "Patient Care Plans",
      description: "Customizable care plans and treatment tracking for improved outcomes.",
      icon: "🏥",
      detail: "Personalized care plan management with progress tracking and outcome measurement"
    },
    {
      title: "Privacy Protection",
      description: "End-to-end data encryption and privacy safeguards for patient information.",
      icon: "🔒",
      detail: "Enterprise-grade security with end-to-end encryption and strict access controls"
    },
    {
      title: "Performance Analytics",
      description: "Comprehensive reporting on service delivery and patient outcomes.",
      icon: "📊",
      detail: "Advanced analytics on care quality, response times, and operational efficiency"
    }
  ];

  const advantages = [
    {
      title: "Enhanced Patient Access",
      description: "Expand healthcare services to underserved areas with optimized routing and scheduling.",
      icon: "🌍"
    },
    {
      title: "Superior Care Quality",
      description: "Comprehensive patient information and coordinated care leads to better health outcomes.",
      icon: "❤️"
    },
    {
      title: "Regulatory Compliance",
      description: "Maintain healthcare privacy and safety regulations with automated compliance tracking.",
      icon: "📜"
    },
    {
      title: "Optimized Resource Allocation",
      description: "Efficient scheduling and resource management reduces costs and improves service delivery.",
      icon: "⚖️"
    },
    {
      title: "Improved Response Times",
      description: "Rapid deployment for emergency situations with priority scheduling capabilities.",
      icon: "⏱️"
    },
    {
      title: "Data-Driven Decisions",
      description: "Comprehensive analytics provide insights for continuous service improvement.",
      icon: "📈"
    }
  ];

  const testimonials = [
    {
      quote: "Fielduo has transformed our home healthcare operations, reducing administrative burden by 40% and improving patient satisfaction scores.",
      author: "Sarah Johnson",
      role: "Director of Nursing",
      organization: "Home Health Services Inc."
    },
    {
      quote: "The compliance features have been invaluable for our mobile clinic network. We've passed every audit with flying colors since implementation.",
      author: "Michael Chen",
      role: "COO",
      organization: "Community Health Outreach"
    }
  ];

  return (
    <>
      <Head>
        <title>Healthcare Field Service Management Solutions | Fielduo</title>
        <meta name="description" content="Streamline mobile healthcare operations with our enterprise platform designed for home health services, mobile clinics, and specialized patient care" />
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-teal-900/20 z-0"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur-sm"
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
          
          {/* Healthcare Equipment Mockups */}
          <div className="absolute top-1/2 right-10 transform -translate-y-1/2 opacity-20">
            <div className="w-48 h-48 bg-gray-800 rounded-2xl border-4 border-gray-700 p-4 transform rotate-12">
              <div className="w-full h-8 bg-blue-500 rounded mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-700 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-700 rounded mb-4"></div>
              <div className="flex justify-between">
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="absolute top-1/3 left-10 opacity-20">
            <div className="w-48 h-48 bg-gray-800 rounded-2xl border-4 border-gray-700 p-4 transform -rotate-12">
              <div className="w-full h-8 bg-teal-500 rounded mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-700 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-700 rounded mb-4"></div>
              <div className="flex justify-between">
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-blue-900/80 to-teal-900/80 backdrop-blur-sm p-4">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-8">
                {[
                  { value: "40%", label: "Reduction in Admin Time" },
                  { value: "98%", label: "Compliance Accuracy" },
                  { value: "35%", label: "Faster Response Times" },
                  { value: "500+", label: "Healthcare Clients" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-blue-900/30 backdrop-blur-sm rounded-full mb-6 border border-blue-500/30">
                <span className="text-blue-400 font-medium">Healthcare Excellence</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                Healthcare Field Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Management</span> Solutions
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Streamline mobile healthcare operations including home health services, mobile clinics, and specialized patient care with our enterprise platform.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/20">
                  Request a Demo
                </button>
                <button className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-900/50 font-bold py-4 px-10 rounded-xl transition duration-300">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive Healthcare Service Management Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Healthcare Service Management</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Enterprise-grade tools designed specifically for mobile healthcare delivery
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
        <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Strategic Advantages for Mobile Healthcare</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Delivering accessible, compliant, and high-quality healthcare in the field
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {advantages.map((advantage, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8 text-center hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-5xl mb-6">{advantage.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-blue-400">{advantage.title}</h3>
                  <p className="text-gray-400">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Healthcare Professionals</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Hear from healthcare leaders who have transformed their operations with Fielduo
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 p-8">
                  <div className="text-blue-400 text-4xl mb-4">"</div>
                  <p className="text-gray-300 mb-6 italic">{testimonial.quote}</p>
                  <div>
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-gray-400">{testimonial.role}</div>
                    <div className="text-gray-500 text-sm">{testimonial.organization}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-b from-gray-900 to-black" ref={sectionRef}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { value: counters.adminTime, label: "Reduction in Admin Time", suffix: "%" },
                { value: counters.compliance, label: "Compliance Accuracy", suffix: "%" },
                { value: counters.responseTime, label: "Faster Response Times", suffix: "%" },
                { value: counters.clients, label: "Healthcare Clients", suffix: "+" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
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
                Common questions about our healthcare service management solutions
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
        <div className="bg-gradient-to-r from-blue-900/30 via-teal-900/30 to-purple-900/30 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform Your Healthcare Field Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Enhance patient care, streamline operations, and ensure compliance with our specialized healthcare management platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/20">
                Request a Demo
              </button>
              <button className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-900/50 font-bold py-4 px-10 rounded-xl transition duration-300">
                Contact Sales
              </button>
            </div>
            <p className="mt-6 text-gray-400">or explore our healthcare solutions</p>
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
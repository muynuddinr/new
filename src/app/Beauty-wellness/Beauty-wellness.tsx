"use client";

// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function BeautyWellness() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Beauty & Wellness | Mobile Beauty Services</title>
        <meta name="description" content="Mobile beauty, wellness, and personal care services" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-purple-900 opacity-90"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          >
            <source src="https://player.vimeo.com/external/469275740.sd.mp4?s=1d1f1532b4c5d3d633b743c4b1b3d2b3d3d3d3d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          </video>
        </div>
        
        <div className={`relative z-10 text-center max-w-4xl px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            Beauty & Wellness
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            Mobile beauty, wellness, and personal care services
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              Explore Features
            </button>
            <button className="bg-transparent hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-full border border-purple-400 transition-all duration-300 transform hover:scale-105">
              See Demo
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Key Features</h2>
          <p className="text-center text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
            Comprehensive tools designed specifically for beauty and wellness providers
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Benefits Section */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Business Benefits</h2>
          <p className="text-center text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
            Enhance your service delivery and client satisfaction
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex flex-col md:flex-row items-start gap-6 p-6 bg-gray-900 rounded-xl transition-all duration-300 hover:shadow-xl"
              >
                <div className="bg-pink-700 p-4 rounded-full">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What You'll See</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Experience our platform through a comprehensive demonstration
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {demoItems.map((item, index) => (
              <div key={index} className="p-6 bg-gray-800 rounded-xl">
                <h3 className="text-xl font-bold mb-2">{item}</h3>
              </div>
            ))}
          </div>
          
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
            Schedule a Demo
          </button>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Fielduo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Rapid Implementation</h3>
              <p className="text-gray-300">
                We help you start quickly by importing your data, checklists, and assets with minimal disruption to your operations.
              </p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h3>
              <p className="text-gray-300">
                Security is built-in with role-based permissions and full audit logs to protect your business and client data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-pink-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Beauty & Wellness Business?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Join leading beauty and wellness providers who trust Fielduo for their field service management
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-white text-purple-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
            <button className="bg-transparent hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-full border border-white transition-all duration-300 transform hover:scale-105">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Fielduo. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Data
const features = [
  {
    icon: "📅",
    title: "Appointment Booking",
    description: "Streamlined booking system for mobile beauty and wellness services"
  },
  {
    icon: "📝",
    title: "Service History & Preferences",
    description: "Track client preferences and service history for personalized care"
  },
  {
    icon: "🧴",
    title: "Product Inventory",
    description: "Manage your beauty product inventory and track usage"
  },
  {
    icon: "🔔",
    title: "Reminders & Confirmations",
    description: "Automated appointment reminders and confirmations"
  },
  {
    icon: "👥",
    title: "Staff Scheduling",
    description: "Efficiently schedule and manage your beauty technicians"
  },
  {
    icon: "💳",
    title: "Payments & Invoices",
    description: "Seamless payment processing and professional invoicing"
  }
];

const benefits = [
  {
    title: "Convenient Service",
    description: "Bring professional beauty and wellness services directly to your clients"
  },
  {
    title: "Personalized Care",
    description: "Deliver tailored experiences based on client preferences and history"
  },
  {
    title: "Quality Standards",
    description: "Maintain consistent service quality across all appointments"
  },
  {
    title: "Happy Customers",
    description: "Increase client satisfaction with seamless booking and personalized service"
  }
];

const demoItems = [
  "Scheduling & dispatch walkthrough",
  "Technician mobile flows",
  "Reports & compliance",
  "Q & A with our experts"
];

const faqs = [
  { question: "What features does Fielduo offer for Beauty & Wellness?" },
  { question: "How can Beauty & Wellness businesses improve efficiency with field service management software?" },
  { question: "How does the software help with regulatory compliance for Beauty & Wellness?" },
  { question: "Does Fielduo offer emergency response or scheduling for Beauty & Wellness?" },
  { question: "How does Fielduo support inventory, assets, or equipment tracking for Beauty & Wellness?" },
  { question: "How does the software enhance customer communication for Beauty & Wellness?" },
  { question: "What benefits do Beauty & Wellness clients see after implementing Fielduo?" }
];
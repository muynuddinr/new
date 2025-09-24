'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const statsRef = useRef(null);
  const [animatedStats, setAnimatedStats] = useState({ satisfaction: 0, timeSaved: 0, businesses: 0 });

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });

    // Set current date
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(now.toLocaleDateString('en-US', options));

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setAnimatedStats(prev => ({
          satisfaction: prev.satisfaction < 98 ? prev.satisfaction + 1 : 98,
          timeSaved: prev.timeSaved < 70 ? prev.timeSaved + 1 : 70,
          businesses: prev.businesses < 500 ? prev.businesses + 10 : 500
        }));
      }, 30);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  const features = [
    {
      title: "Smart Scheduling",
      description: "Intelligent scheduling that automatically optimizes routes and assigns the best technician for the job",
      icon: "📅",
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "Real-time Tracking",
      description: "Live GPS tracking of your team with automated customer notifications",
      icon: "📍",
      color: "from-purple-500 to-pink-400"
    },
    {
      title: "Digital Invoicing",
      description: "Create professional invoices and get paid faster with integrated payments",
      icon: "📄",
      color: "from-green-500 to-emerald-400"
    },
    {
      title: "Customer Portal",
      description: "Self-service portal for booking services and tracking job progress",
      icon: "👥",
      color: "from-orange-500 to-amber-400"
    }
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "HVAC Business Owner", text: "Fielduo transformed our operations. We're 40% more efficient!" },
    { name: "Mike Chen", role: "Plumbing Company Manager", text: "The scheduling feature alone saved us 15 hours per week." },
    { name: "Emily Rodriguez", role: "Electrical Services Director", text: "Our customer satisfaction skyrocketed after implementing Fielduo." }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const createRipple = (e: React.MouseEvent) => {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Dynamic background that follows mouse */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 80%)`
        }}
      ></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-soft-light filter blur-3xl opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 500 + 300}px`,
              height: `${Math.random() * 500 + 300}px`,
              background: `linear-gradient(45deg, ${i % 2 === 0 ? '#6366f1' : '#8b5cf6'}, ${i % 2 === 0 ? '#3b82f6' : '#ec4899'})`,
              animation: `pulse${Math.floor(Math.random() * 3) + 1} ${Math.random() * 20 + 15}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content - Adjusted padding for better mobile view */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 sm:pt-20 sm:pb-12 md:pt-24 md:pb-16">
        {/* Hero Section - Adjusted margins and padding */}
        <div className="text-center mb-10 md:mb-16 lg:mb-20" data-aos="fade-down">
          <div className="inline-block mb-6 md:mb-12 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur-sm rounded-full border border-indigo-500/30 shadow-lg" data-aos="zoom-in" data-aos-delay="200">
            <span className="text-indigo-300 font-medium flex items-center justify-center gap-2 text-xs sm:text-sm">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              The Future of Field Service Management
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2" data-aos="fade-up" data-aos-delay="300">
            <span className="block mb-2 md:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
              AI-Powered Field Operations
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient">
              That Actually Work
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl sm:max-w-3xl mx-auto mb-6 md:mb-8 px-4" data-aos="fade-up" data-aos-delay="400">
            All-in-one platform for scheduling, dispatching, invoicing, and customer management
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 md:mb-12 px-4" data-aos="fade-up" data-aos-delay="500">
            <Link href="/Contact" passHref legacyBehavior>
              <button 
                className="group relative px-6 py-3 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-sm sm:text-base overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 transform hover:-translate-y-1 w-full sm:w-auto"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={createRipple}
              >
                <span className="relative z-10">Start Free Trial</span>
                <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}></div>
              </button>
            </Link>
            
          </div>
          
          {/* Trust indicators - Adjusted for mobile */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 text-gray-400 text-xs sm:text-sm px-4" data-aos="fade-up" data-aos-delay="600">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>15-day free trial</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* Current Date Display */}
          <div className="mt-4 text-center" data-aos="fade-up" data-aos-delay="700">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/30 backdrop-blur-sm rounded-full border border-gray-700/50">
              <span className="text-indigo-300 text-sm">📅</span>
              <span className="text-gray-300 text-sm font-medium">{currentDate}</span>
            </div>
          </div>
        </div>

        {/* Interactive Feature Showcase - Made more compact */}
        <div className="mb-8 md:mb-12 lg:mb-16 relative" data-aos="fade-up">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-900/20 to-purple-900/20 blur-3xl"></div>
          </div>
          
          <div className="text-center mb-4 md:mb-6 px-4">
            <div className="inline-block mb-2 md:mb-3 px-3 py-1 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur-sm rounded-full border border-indigo-500/30">
              <span className="text-indigo-300 font-medium text-xs sm:text-sm">POWERFUL FEATURES</span>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3">
              Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Succeed</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-xs sm:text-sm">
              Our comprehensive platform provides all the tools necessary to streamline your field service operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
            <div data-aos="fade-right">
              <div className="space-y-2 md:space-y-3 px-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden ${
                      activeFeature === index
                        ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-l-4 border-indigo-500 shadow-xl'
                        : 'bg-gray-800/30 hover:bg-gray-700/30'
                    }`}
                    data-aos="fade-up"
                    data-aos-delay={100 * index}
                  >
                    {/* Background glow effect for active item */}
                    {activeFeature === index && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl"></div>
                    )}
                    
                    <div className="flex items-start gap-2 md:gap-3 relative z-10">
                      <div className={`text-xl md:text-2xl p-1.5 md:p-2 rounded-lg bg-gradient-to-br ${feature.color} bg-opacity-20 shadow-lg flex items-center justify-center ${
                        activeFeature === index ? 'animate-pulse' : ''
                      }`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-bold mb-1">{feature.title}</h3>
                        <p className="text-gray-300 text-xs md:text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Feature Visualization - Made more compact */}
            <div className="relative h-48 md:h-64 lg:h-80 flex items-center justify-center mt-6 lg:mt-0" data-aos="fade-left" data-aos-delay="300">
              {/* Animated background circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border border-indigo-500/30 animate-pulse shadow-2xl"></div>
              </div>
              
              {/* Feature display */}
              <div className="relative z-10 text-center px-4">
                <div className="text-4xl md:text-6xl lg:text-8xl mb-2 md:mb-4 animate-bounce">{features[activeFeature].icon}</div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                  {features[activeFeature].title}
                </h3>
                <p className="text-gray-300 max-w-xs md:max-w-md mx-auto text-xs md:text-sm">{features[activeFeature].description}</p>
                
                {/* Interactive indicator */}
                <div className="mt-3 md:mt-4 flex justify-center">
                  <div className="flex space-x-1.5 md:space-x-2">
                    {features.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveFeature(idx)}
                        className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                          idx === activeFeature 
                            ? 'bg-indigo-500 w-4 md:w-6' 
                            : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Animated particles */}
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 animate-ping"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                    opacity: Math.random() * 0.5 + 0.2
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16 lg:mb-20 px-2">
          {[
            { value: `${animatedStats.satisfaction}%`, label: "Customer Satisfaction", icon: "😊" },
            { value: `${animatedStats.timeSaved}%`, label: "Time Saved", icon: "⏱️" },
            { value: `${animatedStats.businesses}+`, label: "Businesses Transformed", icon: "🚀" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="p-4 md:p-6 rounded-3xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700 text-center transition-all duration-300 hover:border-indigo-500 hover:shadow-xl transform hover:-translate-y-1"
              data-aos="zoom-in"
              data-aos-delay={100 * index}
            >
              <div className="text-3xl md:text-4xl mb-2 md:mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-400 mb-1 md:mb-2">{stat.value}</div>
              <div className="text-gray-300 text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-12 md:mb-16 lg:mb-20 px-4" data-aos="fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
            Loved by Service <span className="text-indigo-400">Professionals</span>
          </h2>
          
          <div className="max-w-4xl mx-auto relative" data-aos="fade-up" data-aos-delay="200">
            <div className="p-4 md:p-6 rounded-3xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700 transition-all duration-300 hover:border-indigo-500">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-lg md:text-xl font-bold mr-3 md:mr-4 shadow-lg">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-base md:text-lg">{testimonials[currentTestimonial].name}</div>
                  <div className="text-xs md:text-sm text-gray-400">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
              <p className="text-gray-300 italic text-sm md:text-base">"{testimonials[currentTestimonial].text}"</p>
            </div>
            
            <div className="flex justify-center mt-4 gap-4" data-aos="fade-up" data-aos-delay="300">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 transition-all duration-300 hover:border-indigo-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 transition-all duration-300 hover:border-indigo-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="flex justify-center mt-3 space-x-2" data-aos="fade-up" data-aos-delay="400">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full ${index === currentTestimonial ? 'bg-indigo-500' : 'bg-gray-600'}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes pulse1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(30px, -30px) scale(1.1); opacity: 0.3; }
        }
        @keyframes pulse2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(-40px, 20px) scale(1.05); opacity: 0.25; }
        }
        @keyframes pulse3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(20px, 40px) scale(1.15); opacity: 0.35; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: ripple-animation 0.6s linear;
        }
        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
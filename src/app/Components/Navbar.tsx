'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState('');
  
  // Refs for dropdown containers to detect outside clicks
  const productsDropdownRef = useRef(null);
  const solutionsDropdownRef = useRef(null);
  const industriesDropdownRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productsDropdownOpen && productsDropdownRef.current && !productsDropdownRef.current.contains(event.target)) {
        setProductsDropdownOpen(false);
        setActiveDropdown('');
      }
      if (solutionsDropdownOpen && solutionsDropdownRef.current && !solutionsDropdownRef.current.contains(event.target)) {
        setSolutionsDropdownOpen(false);
        setActiveDropdown('');
      }
      if (industriesDropdownOpen && industriesDropdownRef.current && !industriesDropdownRef.current.contains(event.target)) {
        setIndustriesDropdownOpen(false);
        setActiveDropdown('');
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [productsDropdownOpen, solutionsDropdownOpen, industriesDropdownOpen]);
  
  const navItems = [
    { 
      name: 'Products', 
      href: '/products',
      dropdown: [
        { name: 'Overview & Impact', href: '/Overview&Impact', description: 'Comprehensive product suite' },
        { name: 'Core Platform Capabilities', href: '/Core-platform-capabilities', description: 'Robust and scalable' },
        { name: 'Advanced Intelligence', href: '/Advanced-intelligence', description: 'AI-driven solutions' },
        { name: 'Mobile App Features', href: '/Mobile-app-features', description: 'On-the-go functionality' },
        { name: 'Measurable Results', href: '/Measurable-results', description: 'Data-driven insights' },
        { name: 'Implementation & Support', href: '/Implementation-support', description: 'Seamless onboarding' },
      ]
    },
    { 
      name: 'Solutions', 
      href: '/solutions',
      dropdown: [
        { name: 'B2B Field Service', href: '/B2B-field-services', description: 'Enterprise-grade solutions' },
        { name: 'B2C Self-Service Portal', href: '/B2C-Self-Service-Portal', description: 'Customer-centric design' },
        { name: 'Scheduling & Dispatching', href: '/Scheduling-Dispatching', description: 'Streamlined operations' },
        { name: 'Invoicing & Payments', href: '/Invoicing-Payments', description: 'End-to-end management' },
      ]
    },
    { 
      name: 'Industries', 
      href: '/industries',
      dropdown: [
        { name: 'HVAC', href: '/Hvac', description: 'Heating, Ventilation, and Air Conditioning' },
        { name: 'Plumbing', href: '/Plumbing', description: 'Expert plumbing solutions' },
        { name: 'Electrical', href: '/Electrical', description: 'Professional electrical services' },
        { name: 'Appliance Repair', href: '/Appliance-repair', description: 'Reliable appliance fixes' },
        { name: 'Facility Management', href: '/Facility-management', description: 'Comprehensive facility services' },
        { name: 'Pest Control', href: '/Pest-control', description: 'Effective pest solutions' },
        { name: 'More...', href: '/Industries/', description: 'See all industries' },
      ]
    },
    { name: 'Pricing', href: '/Pricing' },
    { name: 'Blogs', href: '/Blogs' },
    { name: 'About', href: '/About' },
  ];
  
  const toggleDropdown = (dropdownName) => {
    // Close all dropdowns first
    setProductsDropdownOpen(false);
    setSolutionsDropdownOpen(false);
    setIndustriesDropdownOpen(false);
    
    // Open the selected dropdown if it wasn't active
    if (activeDropdown !== dropdownName) {
      setActiveDropdown(dropdownName);
      if (dropdownName === 'Products') setProductsDropdownOpen(true);
      if (dropdownName === 'Solutions') setSolutionsDropdownOpen(true);
      if (dropdownName === 'Industries') setIndustriesDropdownOpen(true);
    } else {
      setActiveDropdown('');
    }
  };
  
  // Close mobile menu when resizing to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);
  
  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg py-2' : 'bg-transparent py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative mr-2 sm:mr-3 bg-white p-1.5 sm:p-2 rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-blue-500/20">
              <Image 
                src="/logo.png" 
                alt="Fielduo Logo" 
                width={60} 
                height={60}
                className="transition-transform duration-300 group-hover:rotate-12 w-10 h-10 sm:w-12 sm:h-12"
              />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
              Fielduo
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div ref={
                    item.name === 'Products' ? productsDropdownRef : 
                    item.name === 'Solutions' ? solutionsDropdownRef : 
                    industriesDropdownRef
                  }>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`relative px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center group ${
                        activeDropdown === item.name 
                          ? 'text-blue-400' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.name}
                      <svg className={`ml-1 h-3 w-3 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-200 ${
                        activeDropdown === item.name 
                          ? 'w-full bg-blue-500' 
                          : 'w-0 bg-blue-500 group-hover:w-full'
                      }`}></span>
                    </button>
                    
                    {/* Products Dropdown */}
                    {item.name === 'Products' && productsDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl z-50 overflow-hidden border border-gray-800 transition-all duration-300 transform origin-top">
                        <div className="p-4">
                          <h3 className="text-white font-bold text-lg mb-3">Products</h3>
                          <div className="grid gap-2">
                            {item.dropdown.map((product, index) => (
                              <Link
                                key={index}
                                href={product.href}
                                className="block p-3 rounded-md hover:bg-gray-800/50 transition-all duration-200 group"
                                onClick={() => {
                                  setProductsDropdownOpen(false);
                                  setActiveDropdown('');
                                }}
                              >
                                <h4 className="text-white font-medium group-hover:text-blue-300 transition-colors text-sm">{product.name}</h4>
                                <p className="text-gray-400 text-xs mt-1">{product.description}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Solutions Dropdown */}
                    {item.name === 'Solutions' && solutionsDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl z-50 overflow-hidden border border-gray-800 transition-all duration-300 transform origin-top">
                        <div className="p-4">
                          <h3 className="text-white font-bold text-lg mb-3">Solutions</h3>
                          <div className="grid gap-2">
                            {item.dropdown.map((solution, index) => (
                              <Link
                                key={index}
                                href={solution.href}
                                className="block p-3 rounded-md hover:bg-gray-800/50 transition-all duration-200 group"
                                onClick={() => {
                                  setSolutionsDropdownOpen(false);
                                  setActiveDropdown('');
                                }}
                              >
                                <h4 className="text-white font-medium group-hover:text-blue-300 transition-colors text-sm">{solution.name}</h4>
                                <p className="text-gray-400 text-xs mt-1">{solution.description}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Industries Dropdown */}
                    {item.name === 'Industries' && industriesDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-72 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl z-50 overflow-hidden border border-gray-800 transition-all duration-300 transform origin-top">
                        <div className="p-4">
                          <h3 className="text-white font-bold text-lg mb-3">Industries</h3>
                          <div className="grid gap-2">
                            {item.dropdown.map((industry, index) => (
                              <Link
                                key={index}
                                href={industry.href}
                                className="block p-3 rounded-md hover:bg-gray-800/50 transition-all duration-200 group"
                                onClick={() => {
                                  setIndustriesDropdownOpen(false);
                                  setActiveDropdown('');
                                }}
                              >
                                <h4 className="text-white font-medium group-hover:text-blue-300 transition-colors text-sm">{industry.name}</h4>
                                <p className="text-gray-400 text-xs mt-1">{industry.description}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="relative text-gray-300 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                )}
              </div>
            ))}
            {/* Desktop Contact Button */}
            <Link href="/Contact" className="ml-2 relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 overflow-hidden group">
              <span className="relative z-10">Contact</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50 focus:outline-none transition-all duration-200"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Menu</span>
              <div className="w-5 h-5 relative">
                <span className={`absolute left-0 top-1/2 w-5 h-0.5 bg-current transform -translate-y-1/2 transition-all duration-300 ${isOpen ? 'rotate-45' : ''}`}></span>
                <span className={`absolute left-0 top-1/2 w-5 h-0.5 bg-current transform -translate-y-1/2 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`absolute left-0 top-1/2 w-5 h-0.5 bg-current transform -translate-y-1/2 transition-all duration-300 ${isOpen ? '-rotate-45' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-3 pt-3 pb-4 space-y-1 bg-gray-900/95 backdrop-blur-lg rounded-b-lg border-t border-gray-800">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div className="py-1">
                    <button 
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex items-center justify-between w-full px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                        activeDropdown === item.name 
                          ? 'text-blue-400 bg-gray-800/50' 
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <span>{item.name}</span>
                      <svg className={`h-4 w-4 transform transition-transform duration-300 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <div className={`pl-3 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                      (item.name === 'Products' && productsDropdownOpen) || 
                      (item.name === 'Solutions' && solutionsDropdownOpen) || 
                      (item.name === 'Industries' && industriesDropdownOpen) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      {item.dropdown.map((subItem, index) => (
                        <Link
                          key={index}
                          href={subItem.href}
                          className="block text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-800/50"
                          onClick={() => {
                            setIsOpen(false);
                            setProductsDropdownOpen(false);
                            setSolutionsDropdownOpen(false);
                            setIndustriesDropdownOpen(false);
                            setActiveDropdown('');
                          }}
                        >
                          <div className="font-medium">{subItem.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{subItem.description}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 hover:bg-gray-800/50"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            {/* Mobile Contact Button */}
            <Link href="/Contact" className="w-full relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-md text-base font-medium transition-all duration-200 overflow-hidden group mt-3 inline-block text-center">
              <span className="relative z-10">Contact Us</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
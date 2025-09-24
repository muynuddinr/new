"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiCoffee, FiShield, FiGlobe, FiLock, FiMail, FiChevronDown, FiChevronUp, FiCalendar, FiInfo, FiCheck, FiSettings, FiEye, FiAlertTriangle, FiSmartphone, FiExternalLink, FiFileText } from 'react-icons/fi';

const CookiePolicy = () => {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    introduction: true,
    whatAreCookies: false,
    typesOfCookies: false,
    specificCookies: false,
    thirdPartyCookies: false,
    manageCookies: false,
    mobileApps: false,
    impactDisabling: false,
    updates: false,
    legalBasis: false,
    international: false,
    contact: false,
    resources: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const cookieTable = [
    {
      name: "_ga",
      type: "Analytics",
      purpose: "Google Analytics - distinguishes users",
      duration: "2 years",
      provider: "Google"
    },
    {
      name: "_gid",
      type: "Analytics",
      purpose: "Google Analytics - distinguishes users",
      duration: "24 hours",
      provider: "Google"
    },
    {
      name: "_gat",
      type: "Analytics",
      purpose: "Google Analytics - throttles request rate",
      duration: "1 minute",
      provider: "Google"
    },
    {
      name: "fielduo_session",
      type: "Necessary",
      purpose: "Maintains user session",
      duration: "Session",
      provider: "Fielduo"
    },
    {
      name: "fielduo_preferences",
      type: "Functional",
      purpose: "Stores user preferences",
      duration: "1 year",
      provider: "Fielduo"
    },
    {
      name: "fielduo_auth",
      type: "Necessary",
      purpose: "Authentication token",
      duration: "30 days",
      provider: "Fielduo"
    },
    {
      name: "_fbp",
      type: "Marketing",
      purpose: "Facebook pixel tracking",
      duration: "90 days",
      provider: "Facebook"
    },
    {
      name: "__hstc",
      type: "Marketing",
      purpose: "HubSpot tracking cookie",
      duration: "13 months",
      provider: "HubSpot"
    },
    {
      name: "__hssc",
      type: "Marketing",
      purpose: "HubSpot session cookie",
      duration: "30 minutes",
      provider: "HubSpot"
    },
    {
      name: "__hssrc",
      type: "Marketing",
      purpose: "HubSpot session identification",
      duration: "Session",
      provider: "HubSpot"
    }
  ];

  const thirdPartyProviders = [
    {
      name: "Google Analytics",
      purpose: "Helps us understand website traffic and user behavior",
      privacyUrl: "https://policies.google.com/privacy"
    },
    {
      name: "Google Ads",
      purpose: "Enables conversion tracking and remarketing",
      privacyUrl: "https://policies.google.com/privacy"
    },
    {
      name: "Facebook/Meta Pixel",
      purpose: "Tracks conversions and enables targeted advertising",
      privacyUrl: "https://www.facebook.com/privacy/policy/"
    },
    {
      name: "HubSpot",
      purpose: "Customer relationship management and marketing automation",
      privacyUrl: "https://legal.hubspot.com/privacy-policy"
    },
    {
      name: "Hotjar",
      purpose: "Website analytics and user feedback tools",
      privacyUrl: "https://www.hotjar.com/legal/policies/privacy/"
    }
  ];

  const browserInstructions = [
    {
      name: "Chrome",
      instructions: "Settings > Privacy and security > Cookies and other site data"
    },
    {
      name: "Firefox",
      instructions: "Settings > Privacy & Security > Cookies and Site Data"
    },
    {
      name: "Safari",
      instructions: "Preferences > Privacy > Manage Website Data"
    },
    {
      name: "Edge",
      instructions: "Settings > Cookies and site permissions > Cookies and site data"
    }
  ];

  const sections = [
    {
      id: 'introduction',
      icon: <FiCoffee className="text-blue-500" />,
      title: 'Introduction',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FiCalendar className="text-blue-500" />
            <span className="text-blue-500 font-medium">Effective Date: September 23, 2025</span>
          </div>
          <p>
            This Cookie Policy explains how Fielduo, Inc., a Delaware corporation ("Fielduo," "we," "us," or "our"), uses cookies and similar tracking technologies on our website www.fielduo.com (the "Site"). This policy should be read alongside our Privacy Policy, which provides additional information about how we collect, use, and protect your personal information.
          </p>
          <p>
            By continuing to use our website, you consent to our use of cookies as described in this policy, unless you have disabled them as explained below.
          </p>
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4 mt-4">
            <div className="flex items-start gap-3">
              <FiInfo className="text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-500 mb-1">What Are Cookies?</h3>
                <p>
                  Cookies are small text files that are stored on your device (computer, tablet, smartphone, or other electronic device) when you visit a website. They allow the website to recognize your device and remember certain information about your preferences or past actions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'typesOfCookies',
      icon: <FiSettings className="text-blue-500" />,
      title: 'Types of Cookies We Use',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Based on Lifespan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
                <h4 className="font-bold text-blue-500 mb-2">Session Cookies</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Temporary cookies that are deleted when you close your browser</li>
                  <li>Used to maintain your session and ensure website functionality during your visit</li>
                </ul>
              </div>
              <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
                <h4 className="font-bold text-blue-500 mb-2">Persistent Cookies</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Remain on your device for a set period or until you delete them</li>
                  <li>Used to remember your preferences and improve your experience on return visits</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Based on Purpose</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
                <h4 className="font-bold text-blue-500 mb-2">Strictly Necessary Cookies</h4>
                <p className="text-sm mb-2">These cookies are essential for the website to function properly and cannot be disabled.</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Authentication cookies to identify you when you log in</li>
                  <li>Security cookies to protect against fraud and abuse</li>
                  <li>Load balancing cookies to distribute traffic efficiently</li>
                  <li>Session management cookies to maintain your current session</li>
                </ul>
              </div>
              <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
                <h4 className="font-bold text-blue-500 mb-2">Functional Cookies</h4>
                <p className="text-sm mb-2">These cookies enhance website functionality and personalization.</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Language and region preferences</li>
                  <li>User interface customizations</li>
                  <li>Remember login credentials (if you choose this option)</li>
                  <li>Accessibility settings</li>
                </ul>
              </div>
              <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
                <h4 className="font-bold text-blue-500 mb-2">Analytics and Performance Cookies</h4>
                <p className="text-sm mb-2">These cookies help us understand how visitors interact with our website.</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Google Analytics cookies to track website usage and performance</li>
                  <li>Heat mapping tools to understand user behavior</li>
                  <li>Page load time and error tracking</li>
                  <li>A/B testing cookies for website optimization</li>
                </ul>
              </div>
              <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
                <h4 className="font-bold text-blue-500 mb-2">Marketing and Advertising Cookies</h4>
                <p className="text-sm mb-2">These cookies are used to deliver relevant advertisements and track campaign effectiveness.</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Retargeting cookies to show relevant ads on other websites</li>
                  <li>Social media tracking pixels</li>
                  <li>Conversion tracking for marketing campaigns</li>
                  <li>Interest-based advertising cookies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'specificCookies',
      icon: <FiAlertTriangle className="text-blue-500" />,
      title: 'Specific Cookies We Use',
      content: (
        <div className="space-y-4">
          <p>
            The following table provides details about the specific cookies we use on our website:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-black/30 border border-blue-900/50 rounded-lg">
              <thead>
                <tr className="border-b border-blue-900/50">
                  <th className="text-left p-3 font-bold">Cookie Name</th>
                  <th className="text-left p-3 font-bold">Type</th>
                  <th className="text-left p-3 font-bold">Purpose</th>
                  <th className="text-left p-3 font-bold">Duration</th>
                  <th className="text-left p-3 font-bold">Provider</th>
                </tr>
              </thead>
              <tbody>
                {cookieTable.map((cookie, index) => (
                  <tr key={index} className="border-b border-blue-900/50 last:border-0">
                    <td className="p-3 font-mono text-sm">{cookie.name}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        cookie.type === 'Necessary' ? 'bg-green-900/30 text-green-400' :
                        cookie.type === 'Functional' ? 'bg-blue-900/30 text-blue-400' :
                        cookie.type === 'Analytics' ? 'bg-purple-900/30 text-purple-400' :
                        'bg-blue-900/30 text-blue-400'
                      }`}>
                        {cookie.type}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{cookie.purpose}</td>
                    <td className="p-3 text-sm">{cookie.duration}</td>
                    <td className="p-3 text-sm">{cookie.provider}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <p className="text-sm text-gray-400 mt-4">
            Note: This table provides examples of common cookies. Actual cookies may vary based on your website's specific functionality and third-party integrations.
          </p>
        </div>
      )
    },
    {
      id: 'thirdPartyCookies',
      icon: <FiGlobe className="text-blue-500" />,
      title: 'Third-Party Cookies',
      content: (
        <div className="space-y-6">
          <p>
            We may allow certain third-party services to place cookies on your device through our website. These third parties include:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {thirdPartyProviders.map((provider, index) => (
              <div key={index} className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
                <h4 className="font-bold mb-2">{provider.name}</h4>
                <p className="text-sm text-gray-300 mb-3">{provider.purpose}</p>
                <a 
                  href={provider.privacyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm flex items-center hover:text-blue-400 transition-colors"
                >
                  Privacy Policy <FiExternalLink className="ml-1" />
                </a>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <FiAlertTriangle className="text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-500 mb-1">Important Note</h3>
                <p>
                  These third parties may use cookies to collect information about your online activities across different websites over time. We do not control these third-party cookies and their use is subject to their respective privacy policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'manageCookies',
      icon: <FiSettings className="text-blue-500" />,
      title: 'How to Manage Cookies',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Browser Settings</h3>
            <p className="mb-4">
              Most web browsers allow you to view, delete, and block cookies. Here's how to manage cookies in popular browsers:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {browserInstructions.map((browser, index) => (
                <div key={index} className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
                  <h4 className="font-bold mb-2">{browser.name}</h4>
                  <p className="text-sm text-gray-300">{browser.instructions}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Cookie Consent Management</h3>
            <p className="mb-4">
              When you first visit www.fielduo.com, you'll see a cookie consent banner allowing you to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiCheck className="text-blue-500 text-xl" />
                </div>
                <h4 className="font-bold mb-2">Accept All Cookies</h4>
                <p className="text-sm text-gray-300">Accept all cookie types for the best experience</p>
              </div>
              <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiShield className="text-blue-400 text-xl" />
                </div>
                <h4 className="font-bold mb-2">Accept Only Necessary</h4>
                <p className="text-sm text-gray-300">Accept only essential cookies for basic functionality</p>
              </div>
              <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiSettings className="text-blue-400 text-xl" />
                </div>
                <h4 className="font-bold mb-2">Customize Preferences</h4>
                <p className="text-sm text-gray-300">Choose which cookie categories to accept</p>
              </div>
            </div>
            <p className="mt-4">
              You can change your cookie preferences at any time by clicking the "Cookie Settings" link in our website footer.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Opt-Out Tools</h3>
            <p className="mb-4">
              For specific third-party cookies, you can opt out directly:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
                <h4 className="font-bold mb-2">Google Analytics</h4>
                <a 
                  href="https://tools.google.com/dlpage/gaoptout" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm flex items-center hover:text-blue-400 transition-colors"
                >
                  Opt out here <FiExternalLink className="ml-1" />
                </a>
              </div>
              <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
                <h4 className="font-bold mb-2">Google Ads</h4>
                <a 
                  href="https://adssettings.google.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm flex items-center hover:text-blue-400 transition-colors"
                >
                  Manage settings <FiExternalLink className="ml-1" />
                </a>
              </div>
              <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
                <h4 className="font-bold mb-2">Facebook Ads</h4>
                <a 
                  href="https://www.facebook.com/settings?tab=ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm flex items-center hover:text-blue-400 transition-colors"
                >
                  Ad preferences <FiExternalLink className="ml-1" />
                </a>
              </div>
              <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
                <h4 className="font-bold mb-2">Industry Opt-Out</h4>
                <a 
                  href="http://www.aboutads.info/choices/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm flex items-center hover:text-blue-400 transition-colors"
                >
                  Opt out nationally <FiExternalLink className="ml-1" />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Do Not Track Signals</h3>
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4">
              <p>
                Some browsers include a "Do Not Track" feature. Currently, there is no industry standard for how to respond to Do Not Track signals, so we do not respond to such signals at this time.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'mobileApps',
      icon: <FiSmartphone className="text-blue-500" />,
      title: 'Mobile Applications',
      content: (
        <div className="space-y-4">
          <p>
            If you use our mobile applications, they may also use cookie-like technologies such as:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold mb-2">Mobile Device Identifiers</h4>
              <p className="text-sm text-gray-300">Unique identifiers for your mobile device</p>
            </div>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold mb-2">SDK-Based Tracking</h4>
              <p className="text-sm text-gray-300">Software development kits for analytics and functionality</p>
            </div>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold mb-2">Local Storage</h4>
              <p className="text-sm text-gray-300">Data stored locally on your device for app functionality</p>
            </div>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold mb-2">Push Notification Tokens</h4>
              <p className="text-sm text-gray-300">Tokens used to send push notifications to your device</p>
            </div>
          </div>
          <p className="mt-4">
            Please refer to our mobile app privacy notices for specific information about mobile data collection.
          </p>
        </div>
      )
    },
    {
      id: 'impactDisabling',
      icon: <FiAlertTriangle className="text-blue-500" />,
      title: 'Impact of Disabling Cookies',
      content: (
        <div className="space-y-4">
          <p>
            While you can browse our website with cookies disabled, some features may not function properly:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
              <h4 className="font-bold mb-2">Potential Impacts</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>You may need to re-enter information more frequently</li>
                <li>Personalized content and preferences may not be saved</li>
                <li>Some interactive features may not work correctly</li>
                <li>We may not be able to provide certain services or recommendations</li>
              </ul>
            </div>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold mb-2">Essential Cookies</h4>
              <p>
                Strictly necessary cookies cannot be disabled as they are essential for website security and basic functionality. Disabling these cookies may prevent you from using our website.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'updates',
      icon: <FiCalendar className="text-blue-500" />,
      title: 'Updates to This Cookie Policy',
      content: (
        <div className="space-y-4">
          <p>
            We may update this Cookie Policy from time to time to reflect:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold mb-2">Changes in Cookie Usage</h4>
              <p className="text-sm text-gray-300">Updates to how we use cookies on our website</p>
            </div>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold mb-2">New Third-Party Integrations</h4>
              <p className="text-sm text-gray-300">Addition of new services that use cookies</p>
            </div>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold mb-2">Updates in Applicable Laws</h4>
              <p className="text-sm text-gray-300">Changes in privacy and cookie regulations</p>
            </div>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold mb-2">Improvements in Technology</h4>
              <p className="text-sm text-gray-300">Advances in cookie management and tracking</p>
            </div>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4 mt-4">
            <h4 className="font-bold text-blue-500 mb-2">How We Notify You</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Updating the "Last Updated" date at the top of this policy</li>
              <li>Posting prominent notices on our website</li>
              <li>Sending email notifications to registered users (when appropriate)</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'legalBasis',
      icon: <FiShield className="text-blue-500" />,
      title: 'Legal Basis for Cookie Usage',
      content: (
        <div className="space-y-4">
          <p>
            Under applicable privacy laws, our legal basis for using cookies includes:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold text-blue-500 mb-2">Consent</h4>
              <p>For marketing and non-essential cookies</p>
              <p className="text-sm text-gray-300 mt-2">We obtain your explicit consent before placing these cookies</p>
            </div>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold text-blue-500 mb-2">Legitimate Interest</h4>
              <p>For analytics and performance optimization</p>
              <p className="text-sm text-gray-300 mt-2">We have a legitimate business interest in understanding how users interact with our site</p>
            </div>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold text-blue-500 mb-2">Contractual Necessity</h4>
              <p>For cookies essential to providing our services</p>
              <p className="text-sm text-gray-300 mt-2">These cookies are necessary to deliver the services you've requested</p>
            </div>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold text-blue-500 mb-2">Legal Obligation</h4>
              <p>For cookies required for compliance purposes</p>
              <p className="text-sm text-gray-300 mt-2">Some cookies help us meet legal and regulatory requirements</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'international',
      icon: <FiGlobe className="text-blue-500" />,
      title: 'International Considerations',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">European Union (GDPR/ePrivacy)</h3>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <p>
                If you are located in the EU, we obtain your consent before placing non-essential cookies on your device, in compliance with the ePrivacy Directive and GDPR.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">California (CCPA/CPRA)</h3>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <p>
                California residents have the right to opt-out of the "sale" or "sharing" of personal information, which may include certain cookie-based tracking activities.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <FiInfo className="text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-500 mb-1">International Data Transfers</h3>
                <p>
                  We take appropriate measures to ensure that cookies and the data collected through them are handled in compliance with international data protection laws, including using standard contractual clauses when required.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'resources',
      icon: <FiExternalLink className="text-blue-500" />,
      title: 'Additional Resources',
      content: (
        <div className="space-y-4">
          <p>
            For more information about cookies and online privacy, visit these resources:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold mb-2">All About Cookies</h4>
              <a 
                href="https://www.allaboutcookies.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 text-sm flex items-center hover:text-blue-400 transition-colors"
              >
                Visit website <FiExternalLink className="ml-1" />
              </a>
            </div>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold mb-2">Network Advertising Initiative</h4>
              <a 
                href="https://www.networkadvertising.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 text-sm flex items-center hover:text-blue-400 transition-colors"
              >
                Visit website <FiExternalLink className="ml-1" />
              </a>
            </div>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold mb-2">Digital Advertising Alliance</h4>
              <a 
                href="https://digitaladvertisingalliance.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 text-sm flex items-center hover:text-blue-400 transition-colors"
              >
                Visit website <FiExternalLink className="ml-1" />
              </a>
            </div>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <h4 className="font-bold mb-2">European Interactive Digital Advertising Alliance</h4>
              <a 
                href="https://www.youronlinechoices.eu/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 text-sm flex items-center hover:text-blue-400 transition-colors"
              >
                Visit website <FiExternalLink className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'contact',
      icon: <FiMail className="text-blue-500" />,
      title: 'Contact Information',
      content: (
        <div className="space-y-6">
          <p>
            If you have questions about our use of cookies or this Cookie Policy, please contact us:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FiMail className="text-blue-500" /> Contact Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-medium">privacy@fielduo.com</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Website</p>
                  <p className="font-medium">www.fielduo.com</p>
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FiFileText className="text-blue-500" /> Corporate Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Legal Name</p>
                  <p className="font-medium">Fielduo, Inc.</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">State of Incorporation</p>
                  <p className="font-medium">Delaware</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Business Address</p>
                  <p className="font-medium">2261 Market Street STE 86773<br />San Francisco, CA 94114</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4">
            <p className="font-bold text-blue-500 mb-2">Related Policies</p>
            <p>
              This Cookie Policy is part of our overall privacy framework and should be read in conjunction with our Privacy Policy available at www.fielduo.com/privacy.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        {/* Page Title */}
        <div className="mb-12 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Cookie <span className="text-blue-500">Policy</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Last updated: September 23, 2025
          </motion.p>
        </div>

        {/* Introduction Box */}
        <motion.div 
          className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-900/50 rounded-2xl p-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 bg-blue-900/20 rounded-lg">
              <FiInfo className="text-blue-500 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Understanding Cookies</h2>
              <p className="text-gray-300">
                At Fielduo, we use cookies and similar technologies to enhance your experience on our website. This Cookie Policy explains what cookies are, how we use them, and your choices regarding cookie usage.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Table of Contents */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                className="flex items-center gap-3 p-3 bg-blue-900/20 hover:bg-blue-900/30 rounded-lg transition-colors text-left"
                whileHover={{ x: 5 }}
                onClick={() => {
                  const element = document.getElementById(section.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    toggleSection(section.id);
                  }
                }}
              >
                <div className="p-2 bg-blue-900/20 rounded-lg">
                  {section.icon}
                </div>
                <span className="font-medium">{section.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Cookie Policy Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              id={section.id}
              className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-900/50 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-900/20 rounded-lg">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <motion.div
                  animate={{ rotate: expandedSections[section.id] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {expandedSections[section.id] ? 
                    <FiChevronUp className="text-2xl text-blue-500" /> : 
                    <FiChevronDown className="text-2xl text-gray-400" />
                  }
                </motion.div>
              </button>
              
              <AnimatePresence>
                {expandedSections[section.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-blue-900/50"
                  >
                    <div className="p-6 pt-2 text-gray-300">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Acceptance Statement */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-blue-900/20 to-black border border-blue-700/30 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">Cookie Consent</h3>
          <p className="text-gray-300 mb-6">
            By using Fielduo's website, you acknowledge that you have read, understood, and agree to our Cookie Policy. 
            You can manage your cookie preferences at any time through our cookie consent banner or browser settings.
          </p>
          <div className="flex items-center">
            <div className="mr-4 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <FiCheck className="text-white" />
            </div>
            <span className="text-blue-400 font-medium">I understand and accept the Cookie Policy</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CookiePolicy;
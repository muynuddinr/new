"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiShield, FiUser, FiGlobe, FiLock, FiMail, FiChevronDown, FiChevronUp, FiCalendar, FiInfo, FiCheck, FiDatabase, FiEye, FiSettings, FiFileText, FiAlertTriangle } from 'react-icons/fi';

const PrivacyPolicy = () => {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    introduction: true,
    informationCollection: false,
    informationUse: false,
    informationSharing: false,
    dataSecurity: false,
    dataRetention: false,
    userRights: false,
    thirdPartyLinks: false,
    childrenPrivacy: false,
    internationalData: false,
    californiaRights: false,
    changes: false,
    contact: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: 'introduction',
      icon: <FiShield className="text-blue-500" />,
      title: 'Introduction',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FiCalendar className="text-blue-500" />
            <span className="text-blue-500 font-medium">Effective Date: September 23, 2025</span>
          </div>
          <p>
            Fielduo, Inc., a Delaware corporation ("Company," "we," "us," or "our"), respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.fielduo.com and use our services.
          </p>
          <p>
            By accessing or using our website and services, you agree to the collection and use of information in accordance with this Privacy Policy.
          </p>
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4 mt-4">
            <div className="flex items-start gap-3">
              <FiInfo className="text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-500 mb-1">Important Information</h3>
                <p>
                  This Privacy Policy applies to all information collected through our website, services, and applications. Please read this policy carefully to understand our practices regarding your personal information.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'informationCollection',
      icon: <FiDatabase className="text-blue-500" />,
      title: 'Information We Collect',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-3">2.1 Personal Information</h3>
            <p className="mb-4">
              We may collect personally identifiable information that you voluntarily provide, including but not limited to:
            </p>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 space-y-2">
                <li>Name and contact information (email address, phone number, mailing address)</li>
                <li>Account credentials (username, password)</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>Communication preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3">2.2 Non-Personal Information</h3>
            <p className="mb-4">
              We automatically collect certain non-personal information, including:
            </p>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4 mb-4">
              <ul className="list-disc pl-5 space-y-2">
                <li>IP address and device identifiers</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referral sources</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3">2.3 Cookies and Tracking Technologies</h3>
            <p>
              We use cookies, web beacons, and similar technologies to enhance your experience, analyze website usage, and deliver personalized content. You can control cookie preferences through your browser settings.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'informationUse',
      icon: <FiSettings className="text-blue-500" />,
      title: 'How We Use Your Information',
      content: (
        <div className="space-y-4">
          <p>
            We use collected information for the following purposes:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiCheck className="text-blue-500" />
                <h4 className="font-bold">Service Provision</h4>
              </div>
              <p>Provide, maintain, and improve our services</p>
            </div>
            
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiCheck className="text-blue-500" />
                <h4 className="font-bold">Transaction Processing</h4>
              </div>
              <p>Process transactions and fulfill orders</p>
            </div>
            
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiCheck className="text-blue-500" />
                <h4 className="font-bold">Communication</h4>
              </div>
              <p>Communicate with you about our services</p>
            </div>
            
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiCheck className="text-blue-500" />
                <h4 className="font-bold">Marketing</h4>
              </div>
              <p>Send marketing communications (with your consent)</p>
            </div>
            
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiCheck className="text-blue-500" />
                <h4 className="font-bold">Customer Support</h4>
              </div>
              <p>Respond to customer service requests</p>
            </div>
            
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiCheck className="text-blue-500" />
                <h4 className="font-bold">Legal Compliance</h4>
              </div>
              <p>Comply with legal obligations</p>
            </div>
            
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiCheck className="text-blue-500" />
                <h4 className="font-bold">Security</h4>
              </div>
              <p>Protect against fraud and security threats</p>
            </div>
            
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiCheck className="text-blue-500" />
                <h4 className="font-bold">Analytics</h4>
              </div>
              <p>Analyze website usage and performance</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'informationSharing',
      icon: <FiGlobe className="text-blue-500" />,
      title: 'Information Sharing and Disclosure',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-5">
            <p className="font-bold text-blue-500 mb-2">Our Commitment</p>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3">4.1 Service Providers</h3>
            <p>
              We may share information with trusted third-party service providers who assist us in operating our website and conducting business, provided they agree to keep information confidential.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3">4.2 Legal Requirements</h3>
            <p>
              We may disclose information when required by law, court order, or government request, or to protect our rights, property, or safety.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3">4.3 Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3">4.4 Consent</h3>
            <p>
              We may share information with your explicit consent for specific purposes not covered in this policy.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'dataSecurity',
      icon: <FiLock className="text-blue-500" />,
      title: 'Data Security',
      content: (
        <div className="space-y-4">
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>
          
          <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
            <h4 className="font-bold mb-2">Our Security Measures Include:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security assessments and vulnerability testing</li>
              <li>Employee training on data protection practices</li>
              <li>Incident response procedures for security breaches</li>
            </ul>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <FiAlertTriangle className="text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-500 mb-1">Important Note</h3>
                <p>
                  While we take reasonable precautions to protect your information, we cannot guarantee absolute security. By using our services, you acknowledge and accept these risks.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'dataRetention',
      icon: <FiDatabase className="text-blue-500" />,
      title: 'Data Retention',
      content: (
        <div>
          <p className="mb-4">
            We retain personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.
          </p>
          
          <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
            <h4 className="font-bold mb-2">Retention Criteria:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Duration needed to provide our services</li>
              <li>Legal and regulatory requirements</li>
              <li>Statute of limitations for potential legal claims</li>
              <li>Business needs for operational continuity</li>
              <li>Historical records for analytics and improvement</li>
            </ul>
          </div>
          
          <p className="mt-4">
            When we no longer need your information for these purposes, we will securely delete or anonymize it, except where we are required by law to keep certain information.
          </p>
        </div>
      )
    },
    {
      id: 'userRights',
      icon: <FiUser className="text-blue-500" />,
      title: 'Your Rights and Choices',
      content: (
        <div className="space-y-4">
          <p>
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiEye className="text-blue-500" />
                <h4 className="font-bold">Access</h4>
              </div>
              <p>Request access to your personal information</p>
            </div>
            
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiFileText className="text-blue-500" />
                <h4 className="font-bold">Correction</h4>
              </div>
              <p>Correct inaccurate information</p>
            </div>
            
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiDatabase className="text-blue-500" />
                <h4 className="font-bold">Deletion</h4>
              </div>
              <p>Request deletion of your personal information</p>
            </div>
            
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiShield className="text-blue-500" />
                <h4 className="font-bold">Objection</h4>
              </div>
              <p>Object to processing of your information</p>
            </div>
            
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiGlobe className="text-blue-500" />
                <h4 className="font-bold">Portability</h4>
              </div>
              <p>Request transfer of your data to another service</p>
            </div>
            
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <FiSettings className="text-blue-500" />
                <h4 className="font-bold">Consent Withdrawal</h4>
              </div>
              <p>Withdraw consent for processing where applicable</p>
            </div>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4 mt-6">
            <p className="font-bold text-blue-500 mb-2">How to Exercise Your Rights</p>
            <p>
              To exercise these rights, please contact us using the information provided in the Contact section below. We may require verification of your identity before processing your request.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'thirdPartyLinks',
      icon: <FiGlobe className="text-blue-500" />,
      title: 'Third-Party Links',
      content: (
        <div>
          <p className="mb-4">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies.
          </p>
          
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <FiAlertTriangle className="text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-500 mb-1">Important Notice</h3>
                <p>
                  When you click on links to third-party websites, you leave our site and are subject to the privacy policies of those sites. We recommend reviewing the privacy policies of any third-party sites you visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'childrenPrivacy',
      icon: <FiUser className="text-blue-500" />,
      title: "Children's Privacy",
      content: (
        <div>
          <p className="mb-4">
            Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
          </p>
          
          <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4 mb-4">
            <h4 className="font-bold mb-2">If We Collect Children's Information</h4>
            <p>
              If we become aware that we have collected personal information from children under 13 without verification of parental consent, we will take steps to delete that information as soon as possible.
            </p>
          </div>
          
          <p>
            If you believe we have collected information from a child under 13, please contact us immediately so we can take appropriate action.
          </p>
        </div>
      )
    },
    {
      id: 'internationalData',
      icon: <FiGlobe className="text-blue-500" />,
      title: 'International Data Transfers',
      content: (
        <div>
          <p className="mb-4">
            If you are located outside the United States, please note that your information may be transferred to and processed in the United States, where data protection laws may differ from your jurisdiction.
          </p>
          
          <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
            <h4 className="font-bold mb-2">Our Commitment</h4>
            <p>
              We take appropriate measures to ensure your personal information receives an adequate level of protection wherever it is processed, including using standard contractual clauses approved by European authorities when required.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'californiaRights',
      icon: <FiShield className="text-blue-500" />,
      title: 'California Privacy Rights',
      content: (
        <div>
          <p className="mb-4">
            If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, use, and disclose about you.
          </p>
          
          <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4 mb-4">
            <h4 className="font-bold mb-2">CCPA Rights Include:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Right to know what personal information is being collected</li>
              <li>Right to know whether your personal information is sold or disclosed</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of sale of personal information</li>
              <li>Right to non-discrimination for exercising CCPA rights</li>
            </ul>
          </div>
          
          <p>
            To exercise these rights, please contact us using the information provided in the Contact section below.
          </p>
        </div>
      )
    },
    {
      id: 'changes',
      icon: <FiCalendar className="text-blue-500" />,
      title: 'Changes to This Privacy Policy',
      content: (
        <div>
          <p className="mb-4">
            We may update this Privacy Policy periodically. We will notify you of material changes by posting the updated policy on our website with a revised effective date.
          </p>
          
          <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4 mb-4">
            <h4 className="font-bold mb-2">How We Notify You</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Posting a notice on our website</li>
              <li>Updating the "Effective Date" at the top of this policy</li>
              <li>For significant changes, we may send you an email notification</li>
            </ul>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4">
            <p className="font-bold text-blue-500 mb-2">Your Continued Use</p>
            <p>
              Your continued use of our services after changes constitutes acceptance of the updated Privacy Policy. We encourage you to review this policy periodically for any changes.
            </p>
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
            If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FiMail className="text-blue-500" /> Contact Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-medium">info@fielduo.com</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="font-medium">+1 415 200 5240</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Alternative Phone</p>
                  <p className="font-medium">+91 9629627092</p>
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FiFileText className="text-blue-500" /> Corporate Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Company Name</p>
                  <p className="font-medium">Fielduo, Inc.</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">State of Incorporation</p>
                  <p className="font-medium">Delaware</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Corporate Structure</p>
                  <p className="font-medium">C-Corporation</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Address</p>
                  <p className="font-medium">2261 Market Street STE 86773<br />San Francisco, CA 94114</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4">
            <p className="font-bold text-blue-500 mb-2">Privacy Concerns</p>
            <p>
              If you have specific privacy concerns or believe we have not complied with this Privacy Policy, please contact our privacy team at the email address above. We will investigate and respond to your inquiry as soon as possible.
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
            Privacy <span className="text-blue-500">Policy</span>
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
              <h2 className="text-xl font-bold mb-2">Our Privacy Commitment</h2>
              <p className="text-gray-300">
                At Fielduo, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our services.
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

        {/* Privacy Policy Sections */}
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
          <h3 className="text-2xl font-bold mb-4">Acknowledgment and Agreement</h3>
          <p className="text-gray-300 mb-6">
            By using Fielduo's services, you acknowledge that you have read, understood, and agree to our Privacy Policy. 
            If you do not agree to this policy, please do not use our services.
          </p>
          <div className="flex items-center">
            <div className="mr-4 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <FiCheck className="text-white" />
            </div>
            <span className="text-blue-400 font-medium">I agree to the Privacy Policy</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
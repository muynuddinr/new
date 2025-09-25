'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, ArrowRight, FileText } from 'lucide-react'

const ContactPage = () => {

  const contactDetails = [
    { icon: MapPin, title: "Production Office", lines: ["2261 Market Street STE 86773", "San Francisco, CA 94114"] },
    { icon: Mail, title: "Email Us", lines: ["sales@fielduo.com"] },
    { icon: Phone, title: "Sales", lines: ["US: +1 (415) 915 7065", "IND: +91 962 962 7092"] },
    { icon: Phone, title: "Support", lines: ["+1 (415) 200 5240"] },
  ];

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState<null | { ok: boolean; message: string }>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get('full-name') || ''),
      email: String(formData.get('email') || ''),
      subject: String(formData.get('subject') || ''),
      country: String(formData.get('country') || ''),
      phone: String(formData.get('phone') || ''),
      message: String(formData.get('message') || ''),
    }
    if (!payload.email || !payload.subject || !payload.phone || !payload.message) {
      setSubmitted({ ok: false, message: 'Email, subject, phone and message are required.' })
      return
    }
    try {
      setSubmitting(true)
      setSubmitted(null)
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || 'Failed to send message')
      }
      form.reset()
      setSubmitted({ ok: true, message: 'Thanks! Your message has been sent.' })
    } catch (err: any) {
      setSubmitted({ ok: false, message: err?.message || 'Something went wrong.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="bg-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative py-32 bg-gray-950 text-gray-100 border-b border-gray-800 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-gradient-to-br from-cyan-900/30 to-[#1479ae]/20 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <div>
                <motion.h1 
                    className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
                >
                    Get in Touch
                </motion.h1>
                <motion.p 
                    className="text-lg text-gray-300 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
                >
                    We're here to help and answer any question you might have. We look forward to hearing from you and discussing your next project.
                </motion.p>
            </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Contact Info */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <h2 className="text-3xl font-bold text-gray-100 mb-6">Contact Information</h2>
                <p className="text-gray-400 mb-8">
                    Reach out to us through any of the following channels. Our team is ready to assist you with all your industrial solution needs.
                </p>
                <div className="space-y-8">
                    {contactDetails.map((detail, index) => (
                        <div key={index} className="flex items-start gap-5 group">
                            <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center shadow-lg border border-gray-700 group-hover:bg-[#1479ae] transition-all duration-300 group-hover:scale-105">
                                <detail.icon className="w-8 h-8 text-[#1479ae] group-hover:text-white transition-colors duration-300" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-100 text-lg mb-1">{detail.title}</h3>
                                {detail.lines.map((line, i) => (
                                    <p key={i} className="text-gray-400">{line}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div 
              className="lg:col-span-7 bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-700"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h2 className="text-2xl font-bold text-gray-100 mb-2">Send us a Message</h2>
              <p className="text-gray-400 mb-8">Fill out the form and our team will get back to you within 24 hours.</p>
              {submitted && (
                <div className={`mb-4 rounded-md border px-4 py-3 text-sm ${submitted.ok ? 'border-green-700 bg-green-900/30 text-green-200' : 'border-red-700 bg-red-900/30 text-red-200'}`}>
                  {submitted.message}
                </div>
              )}

               <form onSubmit={onSubmit} className="space-y-6">
                 <div className="grid sm:grid-cols-2 gap-6">
                   <div>
                     <label htmlFor="full-name" className="block text-sm font-medium text-gray-300">Full Name</label>
                     <input type="text" name="full-name" id="full-name" autoComplete="name" className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-[#1479ae] focus:border-[#1479ae] transition text-white" />
                   </div>
                   <div>
                     <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                     <input id="email" name="email" type="email" autoComplete="email" required className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-[#1479ae] focus:border-[#1479ae] transition text-white" />
                   </div>
                   <div className="sm:col-span-2">
                     <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
                     <input id="subject" name="subject" type="text" required placeholder="What is this regarding?" className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-[#1479ae] focus:border-[#1479ae] transition text-white" />
                   </div>
                   <div>
                     <label htmlFor="country" className="block text-sm font-medium text-gray-300">Country</label>
                     <select id="country" name="country" defaultValue="US" className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-[#1479ae] focus:border-[#1479ae] transition text-white">
                       <option value="US">United States (+1)</option>
                       <option value="IN">India (+91)</option>
                       <option value="GB">United Kingdom (+44)</option>
                       <option value="AE">United Arab Emirates (+971)</option>
                       <option value="AU">Australia (+61)</option>
                       <option value="CA">Canada (+1)</option>
                       <option value="DE">Germany (+49)</option>
                       <option value="FR">France (+33)</option>
                       <option value="SG">Singapore (+65)</option>
                     </select>
                   </div>
                   <div>
                     <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone Number</label>
                     <input id="phone" name="phone" type="tel" inputMode="tel" required placeholder="e.g. (415) 200 5240" className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-[#1479ae] focus:border-[#1479ae] transition text-white" />
                   </div>
                 </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">How can we help?</label>
                  <textarea id="message" name="message" rows={5} required className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-[#1479ae] focus:border-[#1479ae] transition text-white"></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`group w-full inline-flex items-center justify-center px-8 py-4 rounded-lg text-lg font-semibold transform transition-all duration-300 shadow-lg ${submitting ? 'bg-gray-700 cursor-not-allowed text-gray-400' : 'bg-[#1479ae] text-white hover:bg-[#0d5d85] hover:scale-105 hover:shadow-[#1479ae]/40'}`}
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Our Location</h2>
          <div className="w-full h-[500px] rounded-xl overflow-hidden border-2 border-gray-800 shadow-2xl">
             <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019725714447!2d-122.42652868468162!3d37.77492997975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c5b63f5d7%3A0x6c0c7e5a4a4a4a4a!2s2261%20Market%20St%20%2386773%2C%20San%20Francisco%2C%20CA%2094114%2C%20USA!5e0!3m2!1sen!2sus!4v1628532135848!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="Google Map of our location in San Francisco"
              ></iframe>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactPage
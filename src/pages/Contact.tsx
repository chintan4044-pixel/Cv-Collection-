/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Phone, Mail, MapPin, CheckCircle2, MessageSquare, Clock, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function Contact() {
  const { showToast } = useShop();

  // Contact Form States
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "Boutique Collection Inquiry",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      showToast("Please provide your name, email, and message.", "info");
      return;
    }

    setIsSubmitting(true);
    // Simulate high-end backend dispatching
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      showToast("Thank you. A CV collection stylist will email you within 2-4 hours.", "success");
    }, 1200);
  };

  // WhatsApp Link parameters
  const whatsappUrl = `https://wa.me/917069870221?text=${encodeURIComponent(
    "Hello CV Collection Concierge, I would love tailored assistance regarding your premium bags and jewelry."
  )}`;

  return (
    <div className="bg-white text-neutral-900 font-sans" id="contact-page-viewport">
      
      {/* Banner */}
      <section className="bg-neutral-50 border-b border-neutral-100 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-bold">Personal Consultations</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-950 tracking-tight">Connect with Us</h1>
          <div className="h-0.5 w-12 bg-amber-400/40 mx-auto" />
          <p className="text-xs text-neutral-400 font-light max-w-md mx-auto">
            Receive premium guidance, inquire about customized catalog items, or request bridal styling support.
          </p>
        </div>
      </section>

      {/* Split details & forms */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Segment: Info cards (Spans 5) */}
        <div className="lg:col-span-5 space-y-8" id="contact-details-panel">
          <div>
            <h3 className="font-serif text-xl font-bold tracking-tight text-neutral-950">
              The Design Salon
            </h3>
            <p className="text-xs text-neutral-500 mt-2 font-light leading-relaxed">
              We look forward to welcome you to our physical workspace by appointment, or guiding your purchase digitally. Feel free to contact our round-the-clock concierge team.
            </p>
          </div>

          <div className="space-y-6">
            {/* Tel helpline */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-[#D4AF37] border border-amber-100 flex-shrink-0">
                <Phone size={16} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Luxe Helpline</p>
                <a href="tel:+917069870221" className="text-xs font-semibold text-neutral-900 hover:text-amber-600 font-mono">
                  +91 7069870221
                </a>
              </div>
            </div>

            {/* Email helpline */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-700 border border-pink-100 flex-shrink-0">
                <Mail size={16} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Email Stylist</p>
                <a href="mailto:chintan4044@gmail.com" className="text-xs font-semibold text-neutral-900 hover:text-amber-600 font-mono">
                  chintan4044@gmail.com
                </a>
              </div>
            </div>

            {/* Physical */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-850 border border-neutral-200 flex-shrink-0">
                <MapPin size={16} />
              </div>
              <div className="space-y-1 col-span-2">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Main Headquarters</p>
                <address className="not-italic text-xs text-neutral-700 leading-relaxed font-light">
                  CV Collection Salon, Ravapar Road,<br />Morbi, Gujarat - 363641, India
                </address>
              </div>
            </div>

            {/* Timing */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-500 border border-neutral-200 flex-shrink-0">
                <Clock size={16} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Hours of Assistance</p>
                <p className="text-xs text-neutral-700 font-light">
                  Monday - Sunday: 10:00 AM to 8:00 PM IST
                </p>
              </div>
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* Golden styled button WhatsApp */}
          <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200/50 space-y-4 text-center">
            <p className="text-xs font-serif italic text-neutral-600 leading-relaxed font-light">
              "Need immediate confirmation of purse layout or jewelry dimensions? Our WhatsApp personal concierge operates with real-time photographs."
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#111111] hover:bg-neutral-950 text-white font-bold text-xs tracking-widest uppercase py-3.5 px-6 rounded-xl border border-amber-300 transition-all shadow-md"
              id="whatsapp-contact-salon-btn"
            >
              <MessageSquare size={14} className="text-[#25D366]" /> Chat With Stylist Live
            </a>
          </div>
        </div>

        {/* Right Segment: Interactive Contact Form (Spans 7) */}
        <div className="lg:col-span-7 bg-neutral-50/50 p-8 sm:p-10 rounded-3xl border border-neutral-200/60" id="contact-form-panel">
          
          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-5"
            >
              <div className="w-16 h-16 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto border border-[#D4AF37]">
                <CheckCircle2 size={32} />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-neutral-950">Inquiry Securely Filed</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-neutral-900">{formData.fullName}</span>. A luxury stylist at CV Collection has received your parameters regarding "{formData.subject}". We will initiate response shortly.
                </p>
              </div>

              <div className="bg-white p-4 border border-dashed border-amber-300 rounded-xl inline-block max-w-xs font-mono text-left">
                <p className="text-[9px] text-[#D4AF37] tracking-widest font-bold uppercase">Assigned Ticket ID</p>
                <p className="text-xs font-bold text-neutral-800 mt-1">CV-INQ-{Math.floor(10000 + Math.random() * 90000)}</p>
                <div className="h-0.5 bg-neutral-100 my-2" />
                <p className="text-[9px] text-neutral-400">Response standard: Instant email dispatch</p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-bold uppercase tracking-widest text-amber-700 hover:text-neutral-950 hover:underline"
                >
                  Submit Alternative Inquiry
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-neutral-950">Direct Stylist Form</h3>
                <p className="text-xs text-neutral-400 font-light">
                  Please complete the form below. Fields marked with <span className="text-rose-500">*</span> are necessary.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#111111]" htmlFor="fullName">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="E.g., Radhika Sharma"
                    className="w-full bg-white border border-neutral-200 rounded-xl py-3 px-4 text-xs font-sans placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#111111]" htmlFor="email">
                    E-Mail <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E.g., radhika@gmail.com"
                    className="w-full bg-white border border-neutral-200 rounded-xl py-3 px-4 text-xs font-sans placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#111111]" htmlFor="phone">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="E.g., +91 99999 99999"
                    className="w-full bg-white border border-neutral-200 rounded-xl py-3 px-4 text-xs font-sans placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#111111]" htmlFor="subject">
                    Inquiry Area <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-neutral-200 rounded-xl py-3 px-4 text-xs font-sans text-neutral-850 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  >
                    <option value="Boutique Collection Inquiry">Boutique Collection Inquiry</option>
                    <option value="Handbag custom sizing request">Handbag Custom Sizing Request</option>
                    <option value="Bridal Jewelry assistance">Bridal Jewelry Coordination</option>
                    <option value="Bulk Order request">Bulk Gift / Corporate Order</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#111111]" htmlFor="message">
                  Your Stylist Parameter Details <span className="text-rose-500">*</span>
                  </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your choice of bag colors, accessory preferences, or the specific occasion you are styling for..."
                  className="w-full bg-white border border-neutral-200 rounded-xl py-3 px-4 text-xs font-sans placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] leading-relaxed resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neutral-950 hover:bg-neutral-900 disabled:bg-neutral-200 text-white font-bold text-xs tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all focus:outline-none"
                id="submit-contact-form-btn"
              >
                {isSubmitting ? "Transmitting Parameters..." : "Transmit Parameters"} 
                {!isSubmitting && <ArrowRight size={14} />}
              </button>
            </form>
          )}

        </div>
      </section>

      {/* Elegant Stylized Morbi Google Maps representation */}
      <section className="bg-neutral-50 border-t border-neutral-100 py-16" id="salon-map-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-bold text-neutral-950">Morbi Salon Address Layout</h4>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Visitor Map Placement</p>
          </div>

          <div className="w-full max-w-5xl mx-auto h-80 rounded-3xl overflow-hidden shadow-md relative bg-neutral-100 border border-neutral-200 p-1 flex items-center justify-center select-none">
            {/* Visual illustration map canvas elements using tailwind divs */}
            <div className="absolute inset-0 bg-neutral-200 flex flex-wrap gap-2 overflow-hidden opacity-60">
              {[...Array(60)].map((_, i) => (
                <div key={i} className="h-20 w-32 bg-neutral-150 border-r border-b border-white flex-shrink-0" />
              ))}
            </div>

            {/* Stylized Street Lines */}
            <div className="absolute top-24 left-0 right-0 h-8 bg-neutral-300 border-y border-white transform rotate-3" />
            <div className="absolute top-0 bottom-0 left-1/3 w-8 bg-neutral-300 border-x border-white transform -rotate-12" />
            <div className="absolute bottom-12 left-0 right-0 h-10 bg-neutral-300 border-y border-white" />
            <div className="absolute top-0 bottom-0 right-1/4 w-12 bg-neutral-300 border-x border-white" />

            {/* River aesthetic left bottom */}
            <div className="absolute bottom-0 left-0 w-44 h-24 bg-sky-200/50 rounded-tr-full border-t border-r border-white/50 flex items-center justify-center">
              <span className="text-[8px] tracking-widest text-sky-700/60 uppercase font-bold">Macchhu River Bank</span>
            </div>

            {/* Main Pins highlight */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-10 h-10 rounded-full bg-neutral-950 flex items-center justify-center border border-[#D4AF37] shadow-xl text-[#D4AF37]"
              >
                <MapPin size={18} className="fill-[#D4AF37]" />
              </motion.div>
              <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl text-center border-l-4 border-[#D4AF37] max-w-xs">
                <p className="font-serif text-xs font-bold text-neutral-950">CV Collection Salon</p>
                <p className="text-[9px] text-neutral-500 mt-0.5">Ravapar Road, Morbi - 363641</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] text-[#D4AF37] uppercase font-bold tracking-widest hover:underline mt-2 inline-block"
                >
                  Open External GPS Coordinates
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

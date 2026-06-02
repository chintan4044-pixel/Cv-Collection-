/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useShop } from "../context/ShopContext";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const { setPage, setSelectedCategory } = useShop();

  const handleCategoryClick = (cat: "purses" | "jewelry") => {
    setSelectedCategory(cat);
    setPage("shop");
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 font-sans border-t border-amber-950/20" id="boutique-footer">
      {/* Top visual divider with branding */}
      <div className="border-b border-neutral-900 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="font-serif text-lg text-white font-medium italic tracking-wider">The CV Collection Experience</h4>
            <p className="text-xs text-neutral-500 max-w-md">Our pieces are curated with passion to represent dignity. Discover our exquisite luxury handcrafted items.</p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setPage("shop");
            }}
            className="flex items-center gap-1 text-[11px] font-bold tracking-widest text-[#D4AF37] uppercase hover:text-white transition-colors"
            id="footer-catalog-btn"
          >
            Request New Lookbook <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Main Footer blocks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Story block */}
        <div className="space-y-6">
          <button
            onClick={() => setPage("home")}
            className="text-left flex items-baseline gap-1"
          >
            <span className="font-serif text-2xl font-bold tracking-tight text-white italic">
              CV
            </span>
            <span className="text-[10px] tracking-[0.3em] font-light text-neutral-400 uppercase">
              Collection
            </span>
          </button>
          
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            An premium destination for luxury women's accessories. We offer a curated collection of masterfully-crafted leather purses and elegant hand-finished jewelry that elevates your true prestige.
          </p>

          <div className="flex space-x-3">
            {["instagram", "pinterest", "facebook"].map((social) => (
              <a
                key={social}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-neutral-900 rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-neutral-950 transition-all text-neutral-400"
                aria-label={`Follow CV Collection on ${social}`}
              >
                <span className="text-[10px] uppercase font-bold tracking-widest">{social[0]}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h5 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-[#D4AF37] pl-3">
            Boutique Departments
          </h5>
          <ul className="space-y-3 text-xs font-light">
            <li>
              <button
                onClick={() => handleCategoryClick("purses")}
                className="hover:text-white hover:underline transition-all text-neutral-400"
              >
                Ladies Purses & Handbags
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick("jewelry")}
                className="hover:text-white hover:underline transition-all text-neutral-400"
              >
                Elegant Jewelry Collection
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setPage("shop");
                }}
                className="hover:text-white hover:underline transition-all text-neutral-400"
              >
                View Selected Arrivals
              </button>
            </li>
          </ul>
        </div>

        {/* Quick links navigation */}
        <div className="space-y-4">
          <h5 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-[#D4AF37] pl-3">
            Quick Navigation
          </h5>
          <ul className="space-y-3 text-xs font-light">
            <li>
              <button
                onClick={() => setPage("home")}
                className="hover:text-white hover:underline transition-all"
              >
                Home Portfolio
              </button>
            </li>
            <li>
              <button
                onClick={() => setPage("shop")}
                className="hover:text-white hover:underline transition-all"
              >
                The Shop Floor
              </button>
            </li>
            <li>
              <button
                onClick={() => setPage("about")}
                className="hover:text-white hover:underline transition-all"
              >
                CV Heritage & About
              </button>
            </li>
            <li>
              <button
                onClick={() => setPage("contact")}
                className="hover:text-white hover:underline transition-all"
              >
                Connect With Stylists
              </button>
            </li>
            <li>
              <button
                onClick={() => setPage("admin")}
                className="hover:text-white hover:underline transition-all text-[#c5a059] font-medium"
              >
                Catalog Studio (Admin Panel)
              </button>
            </li>
          </ul>
        </div>

        {/* Dynamic Contact support details */}
        <div className="space-y-4">
          <h5 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-[#D4AF37] pl-3">
            Direct Concierge
          </h5>
          <ul className="space-y-4 text-xs font-light">
            <li className="flex items-start gap-2.5">
              <Phone size={14} className="text-[#D4AF37] mt-0.5" />
              <div className="space-y-1">
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Phone Call & Support</p>
                <a href="tel:+917069870221" className="hover:text-white transition-colors block font-mono text-white">
                  +91 7069870221
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail size={14} className="text-[#D4AF37] mt-0.5" />
              <div className="space-y-1">
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Enquiries Email</p>
                <a href="mailto:contact@cvcollection.com" className="hover:text-white transition-colors block text-white font-mono">
                  concierge@cvcollection.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={14} className="text-[#D4AF37] mt-0.5" />
              <div className="space-y-1">
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Design Salon</p>
                <address className="not-italic text-neutral-400">
                  Morbi, Gujarat, India
                </address>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Extreme bottom copyrights */}
      <div className="bg-neutral-950 py-6 border-t border-neutral-900 text-center text-[10px] text-neutral-600 font-sans tracking-widest uppercase">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} CV Collection All Rights Reserved.</p>
          <p className="font-light text-neutral-700">Artistry Handcrafted for Luxury Lifestyles.</p>
        </div>
      </div>
    </footer>
  );
}

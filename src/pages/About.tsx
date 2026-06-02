/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, Heart, Award, ShieldCheck, HelpCircle } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function About() {
  const { setPage } = useShop();

  return (
    <div className="bg-white text-neutral-900 font-sans" id="about-brand-page">
      
      {/* Editorial Title Header */}
      <section className="bg-neutral-50/50 py-16 border-b border-neutral-100 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl px-4 space-y-4">
          <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold">The CV Heritage</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-950 tracking-tight leading-tight">
            Curating True Grace Since 2018
          </h1>
          <div className="h-0.5 w-16 bg-[#D4AF37]/40 mx-auto" />
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto leading-relaxed">
            Discover the legacy, craftsmanship philosophy, and ethical commitment that defines India's premium boutique experience.
          </p>
        </div>
      </section>

      {/* Narrative Section - Split Text and Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-950 tracking-tight">
              A Vision Born from Pure Passion
            </h2>
            
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              CV Collection was founded under a simple yet profound premise: <span className="font-semibold text-neutral-900">elegance should never be compromised for accessibility.</span> Recognizing a gap in the luxury market for handbags and fine jewelry that truly honors Indian artistry alongside modern sleek forms, our design studio launched its first hand-tailored catalog in Morbi, Gujarat.
            </p>
            
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              Every curve, stitching line, and metal bevel in our boutique is thoroughly calculated. We reject fast-fashion templates. Instead, we collaborate directly with generational leather artisans in Gujarat and certified gemstone smiths to build timeless accessories that elevate a woman's prestige and walk with her through life's finest milestones.
            </p>

            <blockquote className="border-l-4 border-[#D4AF37] pl-4 italic text-xs text-neutral-700 leading-relaxed py-1 bg-amber-50/40 rounded-r-lg max-w-lg">
              "Accessories are not secondary notes—they are the very structure of personal presentation. We craft them to carry the dignity of their owners."
              <cite className="block text-[10px] font-bold text-neutral-900 font-serif tracking-wider uppercase mt-2 not-italic">
                — Founders, CV Collection
              </cite>
            </blockquote>
          </div>

          {/* Decorative Atelier Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[380px] sm:h-[460px] border border-neutral-100">
            <img
              src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800"
              alt="Handbags crafting design desk"
              className="w-full h-full object-cover scale-102 hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            {/* Overlay gold seal representation */}
            <div className="absolute inset-0 bg-neutral-950/20" />
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-5 py-4 border-l-2 border-[#D4AF37] shadow-lg max-w-xs">
              <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">Atelier Standard</p>
              <p className="text-[11px] font-serif font-semibold text-neutral-900 mt-1">100% Inspected Fine Hides</p>
              <p className="text-[10px] text-neutral-500 mt-1 font-light leading-snug">Every purse goes through thirty-six quality checkpoints before final leather branding stamps are approved.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Mission & Vision Callout (Dual Cards Blocks) */}
      <section className="bg-neutral-55 bg-gradient-to-r from-neutral-50 to-pink-50/10 py-16 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="bg-white p-8 rounded-2xl border border-neutral-200/50 shadow-sm space-y-4">
            <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-[#D4AF37] border border-amber-100">
              <Sparkles size={18} />
            </div>
            <h3 className="font-serif text-lg font-bold text-neutral-950">Our Mission</h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              To design, manufacture, and distribute elite accessories that combine traditional Indian leather-smithing with futuristic, minimalist aesthetics. We seek to inspire confidence, letting luxury serve as a natural extension of a woman's professional achievements.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-neutral-200/50 shadow-sm space-y-4">
            <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center text-pink-700 border border-pink-100">
              <Heart size={18} />
            </div>
            <h3 className="font-serif text-lg font-bold text-neutral-950">Our Vision</h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              To position CV Collection as India's leading ethical digital fashion house, recognized internationally for its commitment to high-density materials, generational artisan empowerment, carbon-neutral logistics, and unparalleled direct customer satisfaction.
            </p>
          </div>

        </div>
      </section>

      {/* Our core commitments (Satisfactions index grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-12">
        <div className="space-y-3">
          <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-bold">The Promise</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-950 tracking-tight">Our Core Craft Guidelines</h2>
          <div className="h-0.5 w-16 bg-[#D4AF37]/30 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="space-y-3">
            <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center text-[#D4AF37] mx-auto border border-neutral-200">
              <Award size={20} className="stroke-[1.5]" />
            </div>
            <h4 className="font-serif text-sm font-bold text-neutral-950">Unrivaled Materials</h4>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed font-light">
              From our robust Italian-sourced brass zippers to triple-layer 18K vermeil plating, we build to endure.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center text-pink-500 mx-auto border border-neutral-200">
              <Heart size={20} className="stroke-[1.5]" />
            </div>
            <h4 className="font-serif text-sm font-bold text-neutral-950">Feminine Sophistication</h4>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed font-light">
              Every detail is chosen to celebrate modern grace and professional elegance with soft textures and golden contours.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto border border-neutral-200">
              <ShieldCheck size={20} className="stroke-[1.5]" />
            </div>
            <h4 className="font-serif text-sm font-bold text-neutral-950">Durable Heritage</h4>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed font-light">
              No peeling finishes or structural sag. We back our craftsmanship with dedicated repair options for our VIP patrons.
            </p>
          </div>

        </div>

        <div className="pt-8">
          <button
            onClick={() => setPage("shop")}
            className="bg-neutral-950 hover:bg-neutral-900 text-white text-[10px] tracking-widest font-bold uppercase py-4 px-12 shadow-xl"
            id="story-shop-btn"
          >
            Enter The Boutique Catalog Room
          </button>
        </div>
      </section>

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useShop } from "../context/ShopContext";
import { ArrowRight, Star, ShieldCheck, Award, ThumbsUp, Sparkles, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  const { setPage, viewProduct, setSelectedCategory, products } = useShop();

  // Get Featured products (isFeatured: true)
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  
  // Get Best Sellers (isBestSeller: true)
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  // Curated style reviews for branding
  const homeReviews = [
    {
      name: "Radhika Karkare",
      rating: 5,
      role: "Luxury Stylist, Morbi",
      comment: "CV Collection products are of absolute unmatched craft. The leather Saffiano Tote and the 18K Chain has redefined my daily aesthetic. Beautifully engineered locks and luxury packing.",
      date: "May 2026"
    },
    {
      name: "Tanya Sen",
      rating: 5,
      role: "Founder, House of Satin",
      comment: "I purchased the Aurelia Gold-Chain Handbag. The weight of the gold trim is marvelous, and the caliber of calfskin rivals international premium labels. Incredible value for this tier of luxury.",
      date: "April 2026"
    }
  ];

  const handleShopNow = () => {
    setSelectedCategory("all");
    setPage("shop");
  };

  const handleCategoryChoice = (cat: "purses" | "jewelry") => {
    setSelectedCategory(cat);
    setPage("shop");
  };

  return (
    <div className="bg-white text-neutral-900 font-sans" id="home-page-viewport">
      
      {/* 1. Immersive Hero Banner Section */}
      <section className="relative overflow-hidden bg-[#fdf2f2]/60 py-16 md:py-24 border-b border-neutral-100">
        {/* Soft background aesthetics */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-pink-100/30 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text Information */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/90 border border-amber-200/50 rounded-none px-4 py-1.5 text-[10px] uppercase font-bold tracking-[0.25em] text-[#c5a059]"
              >
                <Sparkles size={11} className="text-[#c5a059]" />
                Luxury Ladies Purses & Jewelry
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-neutral-950 tracking-tight leading-[0.95] italic"
                >
                  Elevate Your <br />Everyday Style.
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-base text-neutral-600 max-w-md mx-auto lg:mx-0 leading-relaxed font-light"
                >
                  Discover the CV Collection — a curated gallery of premium ladies purses and elegant jewelry designed for the modern woman who values timeless sophistication.
                </motion.p>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <button
                  onClick={handleShopNow}
                  className="w-full sm:w-auto bg-[#1a1a1a] hover:bg-neutral-800 text-white text-[11px] tracking-[0.2em] font-medium uppercase px-10 py-4.5 transition-all shadow-md flex items-center justify-center gap-2 group rounded-none"
                  id="hero-shop-now-btn"
                >
                  Shop New Arrivals
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-neutral-400" />
                </button>
                <button
                  onClick={() => setPage("about")}
                  className="w-full sm:w-auto border border-neutral-300 hover:border-neutral-900 bg-white hover:bg-neutral-50 text-neutral-900 text-[11px] tracking-[0.2em] font-medium uppercase px-10 py-4.5 transition-all rounded-none"
                  id="hero-story-btn"
                >
                  Our Heritage
                </button>
              </motion.div>

              {/* Little Stat bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="pt-6 border-t border-neutral-200/60 grid grid-cols-3 gap-6 text-center lg:text-left max-w-sm mx-auto lg:mx-0"
              >
                <div>
                  <p className="font-serif text-lg font-bold text-neutral-950">100%</p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">Calfskin Leather</p>
                </div>
                <div>
                  <p className="font-serif text-lg font-bold text-neutral-950">18K / 14K</p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">Certified Gold</p>
                </div>
                <div>
                  <p className="font-serif text-lg font-bold text-neutral-950">24/7</p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">Concierge Care</p>
                </div>
              </motion.div>
            </div>

            {/* Hero Images Stack (Double Split Collage) */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4 h-[350px] sm:h-[460px]">
                {/* Purse Image Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl group border border-neutral-100"
                >
                  <img
                    src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800"
                    alt="Handcrafted leather purse"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-4 text-white">
                    <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-semibold">Premium Couture</p>
                    <p className="font-serif text-base font-semibold tracking-wide">Fine Purses</p>
                    <button
                      onClick={() => handleCategoryChoice("purses")}
                      className="text-[9px] uppercase tracking-wider font-bold mt-1 text-neutral-200 hover:text-white flex items-center gap-0.5"
                    >
                      Browse <ArrowRight size={10} />
                    </button>
                  </div>
                </motion.div>

                {/* Jewelry Image Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl group mt-6 md:mt-12 border border-neutral-100"
                >
                  <img
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800"
                    alt="Premium luxury gold jewelry"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-4 text-white">
                    <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-semibold">Lustrous Accents</p>
                    <p className="font-serif text-base font-semibold tracking-wide">Elite Jewelry</p>
                    <button
                      onClick={() => handleCategoryChoice("jewelry")}
                      className="text-[9px] uppercase tracking-wider font-bold mt-1 text-neutral-200 hover:text-white flex items-center gap-0.5"
                    >
                      Browse <ArrowRight size={10} />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Luxury circular gold seal badge absolute */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md border border-[#D4AF37] h-16 w-16 sm:h-20 sm:w-20 rounded-full flex flex-col items-center justify-center text-center shadow-lg pointer-events-none p-1 shrink-0 hidden sm:flex">
                <p className="text-[6px] tracking-widest text-neutral-400 font-bold uppercase leading-none">Luxury</p>
                <p className="font-serif font-bold text-xs sm:text-sm text-amber-600 leading-tight">CV</p>
                <p className="text-[6px] tracking-widest text-[#D4AF37] font-medium uppercase leading-none">Collection</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Department Quick Filter Row Banner */}
      <section className="bg-neutral-50 border-y border-neutral-100 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-bold mb-6">Signature Categories</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            
            <button
              onClick={() => handleCategoryChoice("purses")}
              className="w-full sm:w-80 group relative overflow-hidden h-28 bg-white border border-neutral-200/80 p-6 flex items-center justify-between text-left transition-all hover:border-[#D4AF37] hover:shadow-lg rounded-xl focus:outline-none"
              id="cat-purse-btn"
            >
              <div>
                <h4 className="font-serif text-base font-bold text-neutral-950">Ladies Purses</h4>
                <p className="text-xs text-neutral-400 mt-1">Calfskin bags, evening clutches, & totes</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center text-amber-700 transition-colors">
                <ArrowRight size={16} />
              </div>
            </button>

            <button
              onClick={() => handleCategoryChoice("jewelry")}
              className="w-full sm:w-80 group relative overflow-hidden h-28 bg-white border border-neutral-200/80 p-6 flex items-center justify-between text-left transition-all hover:border-[#D4AF37] hover:shadow-lg rounded-xl focus:outline-none"
              id="cat-jewelry-btn"
            >
              <div>
                <h4 className="font-serif text-base font-bold text-neutral-950">Fine Jewelry</h4>
                <p className="text-xs text-neutral-400 mt-1">18K Solid Gold chains, earrings, & rings</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-pink-50 group-hover:bg-pink-100 flex items-center justify-center text-pink-700 transition-colors">
                <ArrowRight size={16} />
              </div>
            </button>

          </div>
        </div>
      </section>

      {/* 2. Featured Products Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-bold">The Royal Lineup</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-950 tracking-tight">Featured Masterpieces</h2>
          <div className="h-0.5 w-16 bg-[#D4AF37]/30 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => {
            const hasDiscount = product.originalPrice && product.originalPrice > product.price;
            return (
              <div
                key={product.id}
                className="bg-white border border-neutral-100 hover:border-neutral-200 shadow-sm rounded-2xl overflow-hidden group transition-all duration-300 relative flex flex-col h-full"
              >
                {/* Product Image & badges */}
                <div className="aspect-[4/5] bg-neutral-100 relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {hasDiscount && (
                    <div className="absolute top-4 left-4 bg-[#D4AF37] text-white text-[9px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full shadow-md">
                      Special Offer
                    </div>
                  )}
                  {product.stock <= 4 && (
                    <div className="absolute top-4 right-4 bg-red-650 text-white text-[8px] font-bold uppercase tracking-widest py-1 px-2">
                      Only {product.stock} Left
                    </div>
                  )}
                  {/* Hover Quick View Overlay Button */}
                  <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <button
                      onClick={() => viewProduct(product)}
                      className="bg-white hover:bg-neutral-950 hover:text-white text-neutral-950 text-[10px] uppercase tracking-widest font-bold py-3 px-6 transition-all shadow-md transform translate-y-3 group-hover:translate-y-0 duration-300"
                    >
                      Inspect Closely
                    </button>
                  </div>
                </div>

                {/* Info and labels */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <p className="text-[9px] text-[#D4AF37] uppercase font-bold tracking-widest">
                      {product.category === "purses" ? "Ladies Purses" : "Ladies Jewelry"}
                    </p>
                    <button
                      onClick={() => viewProduct(product)}
                      className="text-xs font-semibold text-neutral-900 hover:text-amber-600 transition-colors tracking-wide text-left block font-sans"
                    >
                      {product.name}
                    </button>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-amber-500 font-mono">
                    <Star size={11} className="fill-amber-400 text-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-neutral-350">({product.reviewCount} Reviews)</span>
                  </div>

                  <div className="pt-2 border-t border-neutral-50 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-neutral-950">₹{product.price.toLocaleString("en-IN")}</span>
                      {hasDiscount && (
                        <span className="text-[10px] font-light text-neutral-400 line-through">
                          ₹{product.originalPrice?.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => viewProduct(product)}
                      className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] hover:text-neutral-950 flex items-center gap-1 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="bg-neutral-50 py-20 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-bold">Uncompromising Quality</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-950 tracking-tight">The CV Signature Standards</h2>
            <div className="h-0.5 w-16 bg-[#D4AF37]/30 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Standard 1 */}
            <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-[#D4AF37] mx-auto border border-amber-100">
                <Award size={26} />
              </div>
              <h3 className="font-serif text-lg font-bold text-neutral-950">Couture Craftsmanship</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Every leather handbag is tailored with sturdy German heavy-gauge stitching, and each jewelry design is cast in Hallmarked gold overlays. No shortcuts, ever.
              </p>
            </div>

            {/* Standard 2 */}
            <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-pink-50 rounded-full flex items-center justify-center text-pink-700 mx-auto border border-pink-100">
                <ShieldCheck size={26} />
              </div>
              <h3 className="font-serif text-lg font-bold text-neutral-950">Ethically Curated Materials</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                We trace our supplier lines with moral precision. Our freshwater pearls, calfskin hides, and lab gemstones protect biodiversity and secure fair wages.
              </p>
            </div>

            {/* Standard 3 */}
            <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-800 mx-auto border border-neutral-200">
                <ThumbsUp size={24} />
              </div>
              <h3 className="font-serif text-lg font-bold text-neutral-950">Stylist Concierge Care</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Your satisfaction is our focus. From custom packaging to continuous updates via WhatsApp personal support, our luxury experts are ready at a moment's notice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Best Sellers Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-bold">Highly Coveted</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-950 tracking-tight">Best Sellers Boutique</h2>
          <div className="h-0.5 w-16 bg-[#D4AF37]/30 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product) => {
            const hasDiscount = product.originalPrice && product.originalPrice > product.price;
            return (
              <div
                key={product.id}
                className="bg-white border border-neutral-100 hover:border-neutral-200 shadow-sm rounded-2xl overflow-hidden group transition-all duration-300 relative flex flex-col h-full"
              >
                {/* Product Image & badges */}
                <div className="aspect-[4/5] bg-neutral-100 relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-[#111111] text-[#D4AF37] text-[9px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full shadow-md">
                    Bestseller
                  </div>
                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <button
                      onClick={() => viewProduct(product)}
                      className="bg-white hover:bg-neutral-950 hover:text-white text-neutral-950 text-[10px] uppercase tracking-widest font-bold py-3 px-6 transition-all shadow-md transform translate-y-3 group-hover:translate-y-0 duration-300"
                    >
                      Inspect Closely
                    </button>
                  </div>
                </div>

                {/* Info and labels */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <p className="text-[9px] text-[#D4AF37] uppercase font-bold tracking-widest">
                      {product.category === "purses" ? "Ladies Purses" : "Ladies Jewelry"}
                    </p>
                    <button
                      onClick={() => viewProduct(product)}
                      className="text-xs font-semibold text-neutral-900 hover:text-amber-600 transition-colors tracking-wide text-left block font-sans"
                    >
                      {product.name}
                    </button>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-amber-500 font-mono">
                    <Star size={11} className="fill-amber-400 text-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-neutral-350">({product.reviewCount} Reviews)</span>
                  </div>

                  <div className="pt-2 border-t border-neutral-50 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-neutral-950 font-mono">₹{product.price.toLocaleString("en-IN")}</span>
                      {hasDiscount && (
                        <span className="text-[10px] font-light text-neutral-400 line-through">
                          ₹{product.originalPrice?.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => viewProduct(product)}
                      className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] hover:text-neutral-950 flex items-center gap-1 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Customer Reviews Section */}
      <section className="bg-neutral-50 py-20 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-bold">Boutique Gossip</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-neutral-950 tracking-tight">Acclaimed by Modern Women</h2>
            <div className="h-0.5 w-16 bg-[#D4AF37]/30 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {homeReviews.map((rev, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-neutral-950">{rev.name}</h4>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-0.5">{rev.role}</p>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={13} className="fill-current text-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-xs text-neutral-650 italic leading-relaxed font-light">
                  "{rev.comment}"
                </p>
                
                <div className="text-[10px] font-mono text-neutral-400 text-right pt-2 border-t border-neutral-50">
                  Verified Purchase • {rev.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact CTA Section */}
      <section className="bg-[#111111] text-white py-20 relative overflow-hidden border-t-2 border-amber-500/30">
        {/* Abstract subtle line decorations to represent quality */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/3 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center px-4 space-y-8 relative z-10">
          <div className="w-12 h-12 rounded-full border border-amber-400 flex items-center justify-center text-[#D4AF37] mx-auto animate-pulse">
            <Star size={18} className="fill-amber-400" />
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-2xl sm:text-4xl font-light text-white tracking-wide">
              Desire Custom Personal Styling?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 uppercase tracking-widest max-w-xl mx-auto leading-relaxed">
              Our master consultants can help you find or coordinate the ideal purse and jewelry combination for your upcoming major gala or bridal event.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="tel:+917069870221"
              className="w-full sm:w-auto bg-[#D4AF37] text-neutral-950 hover:bg-white hover:text-neutral-950 text-xs tracking-widest font-bold uppercase py-4 px-10 transition-colors shadow-lg"
              id="cta-call-btn"
            >
              Call Us: +91 7069870221
            </a>
            <button
              onClick={() => setPage("contact")}
              className="w-full sm:w-auto border border-neutral-700 bg-transparent hover:bg-neutral-900 text-white text-xs tracking-widest font-bold uppercase py-4 px-10 transition-colors"
              id="cta-enquiry-btn"
            >
              Submit Bridal Enquiry
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

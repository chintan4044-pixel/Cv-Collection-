/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { Star, ShoppingBag, Heart, ArrowLeft, Shield, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function ProductDetail() {
  const {
    products,
    activeProduct,
    viewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setPage
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"features" | "specs" | "shipping">("features");

  // Reset indices on product switch
  useEffect(() => {
    setActiveImageIndex(0);
    setPurchaseQuantity(1);
  }, [activeProduct]);

  if (!activeProduct) {
    return (
      <div className="bg-white min-h-screen py-24 px-4 text-center space-y-4">
        <p className="font-serif text-lg text-neutral-800">No Product Inspected</p>
        <p className="text-xs text-neutral-450">Please select an elegant piece from our boutique shop collection.</p>
        <button
          onClick={() => setPage("shop")}
          className="border border-neutral-900 text-neutral-900 text-[10px] tracking-widest font-bold py-3.5 px-8 uppercase hover:bg-neutral-950 hover:text-white transition-all"
        >
          Explore Shop Room
        </button>
      </div>
    );
  }

  // Related products (same category, omit self, limit 3)
  const relatedProducts = products.filter(
    (p) => p.category === activeProduct.category && p.id !== activeProduct.id
  ).slice(0, 3);

  const incrementQuantity = () => {
    if (purchaseQuantity < activeProduct.stock) {
      setPurchaseQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (purchaseQuantity > 1) {
      setPurchaseQuantity(prev => prev - 1);
    }
  };

  const handleBuyNow = () => {
    addToCart(activeProduct, purchaseQuantity);
    setPage("checkout");
  };

  const handleRelatedClick = (p: any) => {
    viewProduct(p);
  };

  const hasDiscount = activeProduct.originalPrice && activeProduct.originalPrice > activeProduct.price;
  const favorited = isInWishlist(activeProduct.id);

  return (
    <div className="bg-white text-neutral-905 font-sans" id="product-detail-view">
      
      {/* Return Navigation Anchor */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => setPage("shop")}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-neutral-500 hover:text-neutral-950 transition-colors"
          id="back-to-shop-btn"
        >
          <ArrowLeft size={12} /> Return To Collection
        </button>
      </div>

      {/* Main Grid Structure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Gallery Segment (Column Span 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/5] bg-neutral-50 border border-neutral-150 rounded-2xl overflow-hidden relative shadow-sm">
            <motion.img
              key={activeImageIndex}
              initial={{ opacity: 0.85 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={activeProduct.images[activeImageIndex]}
              alt={activeProduct.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {hasDiscount && (
              <span className="absolute top-4 left-4 bg-[#D4AF37] text-white text-[9px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                Luxury Savings
              </span>
            )}
          </div>

          {/* Thumbnails selector list */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {activeProduct.images.map((img, index) => {
              const isActive = index === activeImageIndex;
              return (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 bg-neutral-50 flex-shrink-0 transition-all ${
                    isActive ? "border-[#D4AF37] shadow-md" : "border-neutral-100 hover:border-neutral-300"
                  }`}
                  id={`thumb-btn-${index}`}
                >
                  <img
                    src={img}
                    alt={`${activeProduct.name} View ${index + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Purchase Mechanics (Column Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
              {activeProduct.name}
            </h1>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-[#D4AF37] tracking-widest font-bold uppercase">
                {activeProduct.category === "purses" ? "Ladies Purses" : "Fine Jewelry"}
              </span>
              <span className="text-neutral-200">|</span>
              <div className="flex items-center gap-1 text-amber-500 font-mono font-medium">
                <Star size={12} className="fill-amber-400 text-amber-500" />
                <span>{activeProduct.rating}</span>
                <span className="text-neutral-400">({activeProduct.reviewCount} customer reviews)</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-neutral-950 font-mono">₹{activeProduct.price.toLocaleString("en-IN")}</span>
              {hasDiscount && (
                <span className="text-sm font-light text-neutral-400 line-through font-mono">
                  I₹{activeProduct.originalPrice?.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            {hasDiscount && (
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">
                You Save ₹{(activeProduct.originalPrice! - activeProduct.price).toLocaleString("en-IN")} In Exclusive Promotion
              </p>
            )}
          </div>

          <hr className="border-neutral-100" />

          {/* Extended Bio */}
          <p className="text-xs text-neutral-500 leading-relaxed font-light">
            {activeProduct.description}
          </p>

          <hr className="border-neutral-100" />

          {/* Interactive Quantity picker and Add/Buy buttons */}
          <div className="space-y-5">
            <div className="flex items-center gap-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#111111]">Quantity</span>
              
              <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={decrementQuantity}
                  className="p-2 px-3 text-neutral-500 hover:bg-neutral-50 active:bg-neutral-100 outline-none"
                  aria-label="Reduce count"
                  id="qty-decrement-btn"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold font-mono tracking-wide text-neutral-800">
                  {purchaseQuantity}
                </span>
                <button
                  type="button"
                  onClick={incrementQuantity}
                  className="p-2 px-3 text-neutral-500 hover:bg-neutral-50 active:bg-neutral-100 outline-none"
                  aria-label="Increase count"
                  id="qty-increment-btn"
                >
                  +
                </button>
              </div>

              {/* Stock count */}
              <span className="text-[11px] font-medium font-mono text-neutral-400">
                {activeProduct.stock > 0 ? `(${activeProduct.stock} pieces in boutique stock)` : "Sold out"}
              </span>
            </div>

            {/* Core Action buttons cta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => addToCart(activeProduct, purchaseQuantity)}
                disabled={activeProduct.stock <= 0}
                className="w-full bg-white hover:bg-neutral-50 border border-neutral-900 text-neutral-950 font-bold text-xs tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:border-neutral-200 disabled:bg-neutral-50 disabled:text-neutral-400 focus:outline-none"
                id="details-add-to-cart"
              >
                <ShoppingBag size={14} /> Add To Bag
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={activeProduct.stock <= 0}
                className="w-full bg-neutral-950 hover:bg-neutral-900 disabled:bg-neutral-200 text-white font-bold text-xs tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all focus:outline-none"
                id="details-buy-now"
              >
                Instant Buy Now
              </button>
            </div>

            {/* Wishlist toggle */}
            <button
              onClick={() => toggleWishlist(activeProduct)}
              type="button"
              className="w-full border border-pink-100 rounded-xl py-3 text-xs tracking-wider flex items-center justify-center gap-2 transition-all hover:bg-pink-50/50"
              id="details-toggle-wishlist"
            >
              <Heart size={14} className={favorited ? "fill-pink-500 text-pink-500" : "text-gray-400"} />
              <span className="font-semibold">{favorited ? "Saved in Wishlist" : "Save to Wishlist Lookup"}</span>
            </button>
          </div>

          {/* Tabbed Spec Details Accordion block */}
          <div className="border border-neutral-100 rounded-2xl overflow-hidden bg-neutral-50/50">
            <div className="flex border-b border-neutral-100 text-[10px] tracking-wider uppercase font-bold text-neutral-500">
              <button
                onClick={() => setActiveTab("features")}
                className={`w-1/3 py-3 text-center border-r border-neutral-100 transition-colors ${
                  activeTab === "features" ? "bg-white text-neutral-950" : "hover:text-neutral-900"
                }`}
                id="tab-features-btn"
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`w-1/3 py-3 text-center border-r border-[#ececec] transition-colors ${
                  activeTab === "specs" ? "bg-white text-neutral-950" : "hover:text-neutral-900"
                }`}
                id="tab-specs-btn"
              >
                Specs
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`w-1/3 py-3 text-center transition-colors ${
                  activeTab === "shipping" ? "bg-white text-neutral-950" : "hover:text-neutral-900"
                }`}
                id="tab-shipping-btn"
              >
                Care & Care
              </button>
            </div>

            <div className="p-5 text-xs text-neutral-500 leading-relaxed font-light">
              {activeTab === "features" && (
                <ul className="list-disc pl-4 space-y-2">
                  {activeProduct.features.map((feat, idx) => (
                    <li key={idx} className="marker:text-amber-500">{feat}</li>
                  ))}
                </ul>
              )}
              {activeTab === "specs" && (
                <div className="space-y-2">
                  {Object.entries(activeProduct.specifications).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-1 border-b border-neutral-100">
                      <span className="font-medium text-neutral-800">{key}</span>
                      <span className="font-mono text-neutral-500">{val}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "shipping" && (
                <div className="space-y-3">
                  <p className="font-medium text-neutral-800 flex items-center gap-1">
                    <Shield size={12} className="text-emerald-600" /> Complimentary Premium Packaging
                  </p>
                  <p>
                    Each item receives protective felt padding wrappers and rests inside a signature CV Collection slide-open cream cardboard box. Great for high-end gifting.
                  </p>
                  <p className="font-medium text-neutral-800">Direct Shipment Turnaround</p>
                  <p>
                    Express delivery across India (takes 3-5 business days). Fully insured shipping with digital coordinates provided on custom dispatch.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Customer Reviews feedback detail block */}
      <section className="bg-neutral-50 border-y border-neutral-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <h3 className="font-serif text-lg font-bold text-neutral-950">
              Customer Experiences ({activeProduct.reviews.length})
            </h3>

            <div className="space-y-4">
              {activeProduct.reviews.map((rev) => (
                <div key={rev.id} className="bg-white p-5 rounded-2xl border border-neutral-200/50 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 text-xs font-bold font-serif flex items-center justify-center">
                        {rev.author[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-neutral-900">{rev.author}</p>
                        <p className="text-[9px] text-neutral-400">Verified Purchase</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={11} className="fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">{rev.date}</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 italic font-light pl-10 leading-relaxed">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Related Products Column list */}
      {relatedProducts.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <h4 className="font-serif text-xl font-light text-neutral-950 tracking-tight">Complete the Look</h4>
            <div className="h-0.5 w-12 bg-amber-400/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p) => {
              const hasDiscount = p.originalPrice && p.originalPrice > p.price;
              return (
                <div
                  key={p.id}
                  onClick={() => handleRelatedClick(p)}
                  className="bg-white border border-neutral-100 hover:border-neutral-200 shadow-sm rounded-2xl overflow-hidden group transition-all duration-300 cursor-pointer relative"
                >
                  <div className="aspect-[4/5] bg-neutral-100 overflow-hidden relative">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="p-4 space-y-2">
                    <p className="text-[9px] text-[#D4AF37] uppercase font-bold tracking-widest">
                      {p.category === "purses" ? "Bags Boutique" : "Gold Accents"}
                    </p>
                    <h5 className="text-xs font-semibold text-neutral-900 group-hover:text-amber-600 transition-colors truncate">
                      {p.name}
                    </h5>
                    
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-bold text-neutral-950">₹{p.price.toLocaleString("en-IN")}</span>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-amber-600 flex items-center gap-0.5">
                        Inspect
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}

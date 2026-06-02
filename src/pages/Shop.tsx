/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { useShop } from "../context/ShopContext";
import { Search, Star, Filter, ArrowUpRight, Grid, LayoutList } from "lucide-react";

export default function Shop() {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    viewProduct,
    addToCart
  } = useShop();

  // Internal grid layouts
  const [isListView, setIsListView] = useState(false);

  // Filter and Sort calculation memo
  const processedProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== "all") {
      list = list.filter(p => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.features.some(f => f.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortOption === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "popularity") {
      list.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return list;
  }, [selectedCategory, searchQuery, sortOption]);

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSortOption("default");
  };

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans" id="shop-page-viewport">
      
      {/* Page Header */}
      <div className="bg-neutral-50 border-b border-neutral-100 py-12 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <p className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold">The Luxury Catalog</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-950 tracking-tight">Curated Boutique</h1>
          <p className="text-xs text-neutral-400 font-light max-w-lg mx-auto">
            Browse our meticulously hand-crafted collection of professional purses and fine jewelry plated in real gold.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* A. Search and Filter Sidebar (Desktop-focused side layout) */}
          <div className="lg:col-span-1 space-y-8" id="shop-filters-sidebar">
            
            {/* Search Block */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111]">Search Boutique</h4>
              <div className="relative border border-neutral-200 rounded-xl py-2.5 px-4 flex items-center bg-neutral-50/50">
                <input
                  type="text"
                  placeholder="E.g., Gold chain, Tote..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs text-neutral-800 bg-transparent placeholder-neutral-400 focus:outline-none pr-2"
                  id="search-input-field"
                />
                <Search size={14} className="text-neutral-400" />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-[10px] text-red-500 font-medium hover:underline flex items-center gap-0.5"
                >
                  Clear search term
                </button>
              )}
            </div>

            {/* Department Category Select Block */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111] border-b border-neutral-100 pb-2">Departments</h4>
              <div className="flex flex-col space-y-2">
                {[
                  { value: "all", label: "All Masterpieces" },
                  { value: "purses", label: "Ladies Purses" },
                  { value: "jewelry", label: "Fine Jewelry" }
                ].map((cat) => {
                  const isSelected = selectedCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value as any)}
                      className={`text-xs text-left py-2 px-3 rounded-lg transition-all flex items-center justify-between ${
                        isSelected 
                          ? "bg-amber-50 text-amber-900 font-bold border border-amber-200/50" 
                          : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                      }`}
                      id={`dept-${cat.value}`}
                    >
                      <span>{cat.label}</span>
                      {isSelected && <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort Options */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111] border-b border-neutral-100 pb-2">Sort Collection</h4>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl p-2.5 text-xs text-neutral-700 font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
                id="sorting-select-box"
              >
                <option value="default">Default / Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popularity">Popularity (Rating Count)</option>
                <option value="rating">Stars Rating</option>
              </select>
            </div>

            {/* Quality Note Graphic Card */}
            <div className="bg-neutral-950 text-white p-5 rounded-2xl space-y-3 shadow-md border-b-2 border-amber-400">
              <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">Quality Guarantee</p>
              <p className="text-[11px] font-serif font-light text-neutral-350 leading-relaxed font-light">
                All leather goods contain full-grain hide casing. All precious gold-layer items hold standard CV luxury stamps for authenticity representation.
              </p>
              <div className="text-[9px] font-mono text-neutral-500 text-right">CV Collection Concierge</div>
            </div>

          </div>

          {/* B. Products Grid & Display (Products layout) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Stat bar */}
            <div className="flex items-center justify-between bg-neutral-50 py-3.5 px-5 rounded-xl border border-neutral-200/40 text-xs text-neutral-500">
              <p className="font-light">
                Showing <span className="font-bold text-neutral-900">{processedProducts.length}</span> pieces
              </p>

              {/* Grid Toggle indicators (desktop-appropriate) */}
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  onClick={() => setIsListView(false)}
                  className={`p-1.5 rounded-lg transition-colors focus:outline-none ${!isListView ? "bg-white border border-neutral-200 shadow-sm text-amber-700" : "text-neutral-400 hover:text-neutral-900"}`}
                  aria-label="Grid format"
                  id="grid-layout-btn"
                >
                  <Grid size={14} />
                </button>
                <button
                  onClick={() => setIsListView(true)}
                  className={`p-1.5 rounded-lg transition-colors focus:outline-none ${isListView ? "bg-white border border-neutral-200 shadow-sm text-amber-700" : "text-neutral-400 hover:text-neutral-900"}`}
                  aria-label="List format"
                  id="list-layout-btn"
                >
                  <LayoutList size={14} />
                </button>
              </div>
            </div>

            {/* Actual Products listings */}
            {processedProducts.length === 0 ? (
              <div className="bg-neutral-50 border border-neutral-200/50 rounded-2xl py-20 px-4 text-center space-y-4">
                <p className="font-serif text-lg text-neutral-800">No Masterpieces Found</p>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                  We currently do not hold pieces matching "{searchQuery}". Please select alternative filters or clear active criteria.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-neutral-950 hover:bg-neutral-900 text-white text-[10px] uppercase font-bold tracking-widest py-3 px-6 transition-colors shadow-md"
                  id="clear-all-filters"
                >
                  Clear All Filters
                </button>
              </div>
            ) : isListView ? (
              /* Vertical List format layout */
              <div className="space-y-4" id="shop-list-view">
                {processedProducts.map((p) => {
                  const hasDiscount = p.originalPrice && p.originalPrice > p.price;
                  return (
                    <div
                      key={p.id}
                      className="bg-white border border-neutral-100 hover:border-neutral-200 shadow-sm p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-6 group transition-all duration-300"
                    >
                      <button
                        onClick={() => viewProduct(p)}
                        className="w-full sm:w-44 aspect-[4/5] sm:h-44 bg-neutral-50 rounded-xl overflow-hidden relative flex-shrink-0"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                      
                      <div className="flex-grow space-y-2 text-center sm:text-left min-w-0">
                        <div className="space-y-1">
                          <p className="text-[9px] text-[#D4AF37] uppercase font-bold tracking-widest">
                            {p.category === "purses" ? "Ladies Purses" : "Ladies Jewelry"}
                          </p>
                          <button
                            onClick={() => viewProduct(p)}
                            className="font-serif text-base font-bold text-neutral-950 hover:text-[#D4AF37] transition-all truncate block text-left w-full"
                          >
                            {p.name}
                          </button>
                        </div>

                        <p className="text-xs text-neutral-500 font-light line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>

                        <div className="flex items-center justify-center sm:justify-start gap-3 mt-1 text-[11px] text-amber-500 font-mono">
                          <div className="flex items-center gap-0.5">
                            <Star size={11} className="fill-amber-400 text-amber-500" />
                            <span>{p.rating}</span>
                          </div>
                          <span className="text-neutral-250">|</span>
                          <span className="text-neutral-400">({p.reviewCount} reviews)</span>
                          <span className="text-neutral-200">|</span>
                          <span className={p.stock > 0 ? "text-emerald-600" : "text-rose-600 font-bold"}>
                            {p.stock > 0 ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                      </div>

                      <div className="w-full sm:w-44 text-center sm:text-right flex flex-col items-center sm:items-end justify-center border-t sm:border-t-0 sm:border-l border-neutral-100 pt-4 sm:pt-0 sm:pl-6 gap-3 flex-shrink-0">
                        <div className="space-y-1">
                          <p className="text-base font-bold text-neutral-950 font-mono">₹{p.price.toLocaleString("en-IN")}</p>
                          {hasDiscount && (
                            <p className="text-[10px] text-neutral-400 line-through font-mono">
                              ₹{p.originalPrice?.toLocaleString("en-IN")}
                            </p>
                          )}
                        </div>
                        
                        <button
                          onClick={() => addToCart(p, 1)}
                          disabled={p.stock <= 0}
                          className="w-full bg-neutral-950 hover:bg-neutral-900 disabled:bg-neutral-200 text-white text-[10px] font-bold uppercase tracking-widest py-3 px-4 shadow transition-all duration-300"
                        >
                          {p.stock <= 0 ? "Sold Out" : "Add to Bag"}
                        </button>
                        <button
                          onClick={() => viewProduct(p)}
                          className="text-[9px] uppercase font-bold tracking-widest text-[#D4AF37] hover:text-neutral-950 flex items-center gap-0.5"
                        >
                          Details <ArrowUpRight size={10} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Grid format layout */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="shop-grid-view">
                {processedProducts.map((p) => {
                  const hasDiscount = p.originalPrice && p.originalPrice > p.price;
                  return (
                    <div
                      key={p.id}
                      className="bg-white border border-neutral-100 hover:border-neutral-200 shadow-sm rounded-2xl overflow-hidden group transition-all duration-300 relative flex flex-col h-full"
                    >
                      {/* Product Image & badges */}
                      <div className="aspect-[4/5] bg-neutral-100 relative overflow-hidden">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        {hasDiscount && (
                          <div className="absolute top-4 left-4 bg-[#D4AF37] text-white text-[9px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full shadow-md">
                            Offer
                          </div>
                        )}
                        {p.stock === 0 && (
                          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center text-neutral-950 text-xs font-bold uppercase tracking-widest">
                            Sold Out
                          </div>
                        )}
                        
                        {/* Hover Quick View Overlay */}
                        <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                          <button
                            onClick={() => viewProduct(p)}
                            className="bg-white hover:bg-neutral-950 hover:text-white text-neutral-950 text-[10px] uppercase tracking-widest font-bold py-3 px-6 transition-all shadow-md transform translate-y-3 group-hover:translate-y-0 duration-300"
                          >
                            Examine Details
                          </button>
                        </div>
                      </div>

                      {/* Info and labels */}
                      <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <p className="text-[9px] text-[#D4AF37] uppercase font-bold tracking-widest">
                            {p.category === "purses" ? "Ladies Purses" : "Ladies Jewelry"}
                          </p>
                          <button
                            onClick={() => viewProduct(p)}
                            className="text-xs font-semibold text-neutral-900 hover:text-amber-600 transition-colors tracking-wide text-left block w-full truncate font-sans"
                          >
                            {p.name}
                          </button>
                        </div>

                        <div className="flex items-center gap-1 text-[10px] text-amber-500 font-mono">
                          <Star size={11} className="fill-amber-400 text-amber-500" />
                          <span>{p.rating}</span>
                          <span className="text-neutral-300">({p.reviewCount} Reviews)</span>
                        </div>

                        <div className="pt-2.5 border-t border-neutral-50 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-neutral-950">₹{p.price.toLocaleString("en-IN")}</span>
                            {hasDiscount && (
                              <span className="text-[9px] font-light text-neutral-400 line-through">
                                ₹{p.originalPrice?.toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => {
                              if (p.stock > 0) addToCart(p, 1);
                            }}
                            disabled={p.stock <= 0}
                            className="text-[9px] bg-neutral-950 hover:bg-[#D4AF37] hover:text-neutral-950 disabled:bg-neutral-100 disabled:text-neutral-400 text-white uppercase tracking-widest font-bold py-2 px-3.5 transition-colors shadow duration-300"
                          >
                            {p.stock <= 0 ? "Out" : "Add"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { ShoppingBag, Heart, Search, Menu, X, ArrowRight, Trash2, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const logoImg = new URL("../assets/images/cv_luxury_logo_1780383867040.png", import.meta.url).href;
  const {
    page,
    setPage,
    cart,
    wishlist,
    toggleWishlist,
    addToCart,
    searchAndNavigate,
    viewProduct
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [inlineSearchOpen, setInlineSearchOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      searchAndNavigate(searchInput);
      setSearchInput("");
      setInlineSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", target: "home" as const },
    { label: "Shop", target: "shop" as const },
    { label: "Our Story", target: "about" as const },
    { label: "Contact Us", target: "contact" as const },
  ];

  return (
    <>
      {/* Top micro promotion bar */}
      <div className="bg-neutral-950 text-white text-[10px] tracking-[0.25em] font-medium py-2 px-4 text-center uppercase border-b border-amber-950/10">
        Complimentary Express Shipping Across India on Orders Above ₹5,000
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => setPage("home")}
            className="flex items-center gap-3 text-left focus:outline-none group"
            id="brand-logo-btn"
          >
            <img 
              src={logoImg} 
              alt="CV Collection Logo" 
              className="h-9 w-9 rounded-full object-cover border border-[#D4AF37]/40 shadow-sm transition-transform duration-350 group-hover:scale-105" 
              referrerPolicy="no-referrer"
            />
            <span className="font-serif text-2xl font-bold tracking-[2px] uppercase text-neutral-900 transition-colors group-hover:text-amber-500">
              CV Collection
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {navLinks.map((link) => {
              const isActive = page === link.target;
              return (
                <button
                  key={link.target}
                  onClick={() => setPage(link.target)}
                  className={`text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 relative py-1 focus:outline-none ${
                    isActive ? "text-amber-600" : "text-neutral-600 hover:text-neutral-950"
                  }`}
                  id={`nav-link-${link.target}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavHeaderLine"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-500"
                      transition={{ type: "smooth", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            
            {/* Direct Inline Search icon popup */}
            <div className="relative">
              <AnimatePresence>
                {inlineSearchOpen && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearchSubmit}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-neutral-200 rounded-full py-1.5 px-4 flex items-center shadow-lg"
                  >
                    <input
                      type="text"
                      placeholder="Search collection..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full text-xs font-sans text-neutral-800 bg-transparent placeholder-neutral-400 focus:outline-none pr-2"
                      autoFocus
                    />
                    <button type="submit">
                      <Search size={14} className="text-neutral-500 hover:text-amber-600" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {!inlineSearchOpen && (
                <button
                  onClick={() => setInlineSearchOpen(true)}
                  className="p-1.5 text-neutral-600 hover:text-amber-500 hover:bg-neutral-50 rounded-full transition-all duration-300 focus:outline-none"
                  aria-label="Search Collection"
                  id="search-trigger-btn"
                >
                  <Search size={18} />
                </button>
              )}
              {inlineSearchOpen && (
                <button
                  onClick={() => setInlineSearchOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-full transition-all duration-300 focus:outline-none z-10 relative ml-2"
                  id="search-cancel-btn"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={() => setWishlistOpen(true)}
              className="p-1.5 text-neutral-600 hover:text-pink-500 hover:bg-neutral-50 rounded-full transition-all duration-300 relative focus:outline-none"
              aria-label="Wishlist items"
              id="wishlist-drawer-open-btn"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-pink-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setPage("cart")}
              className="p-1.5 text-neutral-650 hover:text-amber-600 hover:bg-neutral-50 rounded-full transition-all duration-300 relative focus:outline-none"
              aria-label="Shopping bag"
              id="go-to-cart-header"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-neutral-950 text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-neutral-650 hover:text-neutral-900 hover:bg-neutral-50 rounded-full transition-all duration-300 md:hidden focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </div>
      </header>

      {/* Slide-out Wishlist Sidebar Panel overlay */}
      <AnimatePresence>
        {wishlistOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setWishlistOpen(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
              id="wishlist-backdrop"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 max-w-md w-full bg-white shadow-2xl z-50 flex flex-col pointer-events-auto border-l border-amber-950/10"
              id="wishlist-drawer"
            >
              <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart size={18} className="text-pink-500 fill-pink-500" />
                  <h3 className="font-serif text-lg text-neutral-900 tracking-wide font-medium">Your Wishlist</h3>
                  <span className="text-xs font-mono text-neutral-400">({wishlistCount})</span>
                </div>
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-900 transition-colors"
                  id="wishlist-close-btn"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Wishlist list body */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="h-96 flex flex-col items-center justify-center text-center px-4">
                    <Heart size={44} className="text-neutral-200 mb-4 stroke-[1.5]" />
                    <p className="text-sm font-medium tracking-wide text-neutral-800">Your dream collection awaits</p>
                    <p className="text-xs text-neutral-400 mt-2 max-w-[240px] leading-relaxed">
                      Collect elegance as you explore. Simply click the heart on any product to save it here.
                    </p>
                    <button
                      onClick={() => {
                        setWishlistOpen(false);
                        setPage("shop");
                      }}
                      className="mt-6 border border-neutral-900 hover:bg-neutral-950 hover:text-white transition-all text-neutral-900 text-[10px] tracking-widest font-semibold uppercase py-3 px-6"
                      id="wishlist-explore-btn"
                    >
                      Explore Shop
                    </button>
                  </div>
                ) : (
                  wishlist.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 bg-neutral-50 p-3 rounded-lg border border-neutral-100 group transition-all duration-300 hover:border-amber-200"
                    >
                      <button
                        onClick={() => {
                          viewProduct(product);
                          setWishlistOpen(false);
                        }}
                        className="w-16 h-20 flex-shrink-0 bg-white border border-neutral-200 overflow-hidden relative"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                      <div className="flex-grow min-w-0">
                        <button
                          onClick={() => {
                            viewProduct(product);
                            setWishlistOpen(false);
                          }}
                          className="text-xs font-semibold text-neutral-900 tracking-wide block hover:text-amber-600 transition-colors truncate text-left w-full"
                        >
                          {product.name}
                        </button>
                        <p className="text-xs font-mono text-neutral-500 mt-1">₹{product.price.toLocaleString("en-IN")}</p>
                        
                        <div className="flex gap-3 mt-2">
                          <button
                            onClick={() => {
                              addToCart(product, 1);
                              toggleWishlist(product); // Remove from wishlist on adding to cart
                            }}
                            className="text-[9px] uppercase tracking-wider font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1 transition-colors"
                          >
                            Add To Bag <ArrowRight size={10} />
                          </button>
                          <span className="text-neutral-200">|</span>
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="text-[9px] uppercase tracking-wider font-bold text-gray-400 hover:text-gray-600 flex items-center gap-0.5 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Wishlist bottom segment */}
              {wishlist.length > 0 && (
                <div className="p-6 border-t border-neutral-100 bg-neutral-50">
                  <button
                    onClick={() => {
                      setWishlistOpen(false);
                      setPage("shop");
                    }}
                    className="w-full bg-neutral-950 hover:bg-neutral-900 text-white text-[10px] tracking-widest font-bold py-3 uppercase flex items-center justify-center gap-2 transition-all transition-duration-300"
                    id="wishlist-shop-all-btn"
                  >
                    View Entire Boutique <ArrowUpRight size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-32 z-30 bg-white border-b border-neutral-200 shadow-xl py-6 px-6 md:hidden flex flex-col gap-6"
            id="mobile-drawer-menu"
          >
            {/* Search Input for Mobile */}
            <form onSubmit={handleSearchSubmit} className="relative w-full border border-neutral-200 rounded-full py-2 px-4 flex items-center">
              <input
                type="text"
                placeholder="Search premium bags & jewelry..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full text-xs font-sans text-neutral-800 bg-transparent placeholder-neutral-400 focus:outline-none"
              />
              <button type="submit">
                <Search size={15} className="text-neutral-500" />
              </button>
            </form>

            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => {
                    setPage(link.target);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs uppercase tracking-widest font-bold text-left py-2 border-b border-neutral-50 transition-colors ${
                    page === link.target ? "text-amber-600 pl-2" : "text-neutral-800 hover:text-amber-500"
                  }`}
                  id={`mobile-nav-${link.target}`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 bg-amber-50/50 p-3 rounded-lg border border-amber-100">
              <div className="text-amber-700 font-serif text-sm font-semibold italic">CV Collection</div>
              <div className="text-[10px] text-amber-800 tracking-wider">
                Luxury Curated for Modern Grace
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

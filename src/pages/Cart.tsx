/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Trash2, ShoppingBag, Plus, Minus, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export default function Cart() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    setPage,
    showToast
  } = useShop();

  // Promocode States
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [activeDiscountPercentage, setActiveDiscountPercentage] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Cart math
  const itemsSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  // Shipping logic (Complimentary above 5,000, else 350)
  const shippingFee = itemsSubtotal >= 5000 || itemsSubtotal === 0 ? 0 : 350;
  
  // Promo discount computation
  const promoDiscountVal = (itemsSubtotal * activeDiscountPercentage) / 100;
  
  const finalOrderTotal = itemsSubtotal + shippingFee - promoDiscountVal;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCodeInput.trim().toUpperCase();
    
    if (cleanCode === "LUXURY10") {
      setActiveDiscountPercentage(10);
      setPromoApplied(true);
      showToast("Coupon 'LUXURY10' applied! Saved 10% on your exquisite order.", "success");
    } else if (cleanCode === "LUXURY20" && itemsSubtotal >= 10000) {
      setActiveDiscountPercentage(20);
      setPromoApplied(true);
      showToast("VIP Coupon 'LUXURY20' applied! Saved 20% on your glorious order.", "success");
    } else {
      showToast("Invalid code or requirements not fulfilled.", "info");
    }
  };

  const handleCheckoutNav = () => {
    // If voucher was applied, we can store it in temporary session so that Checkout handles it!
    if (activeDiscountPercentage > 0) {
      localStorage.setItem("cv_applied_discount_percentage", activeDiscountPercentage.toString());
    } else {
      localStorage.removeItem("cv_applied_discount_percentage");
    }
    setPage("checkout");
  };

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans" id="cart-page-viewport">
      
      {/* Page Header */}
      <div className="bg-neutral-50/70 border-b border-neutral-100 py-10 text-center">
        <h1 className="font-serif text-2xl sm:text-3xl font-light text-neutral-950 tracking-tight">Your Styling Bag</h1>
        <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] mt-1 font-bold">
          {cart.length === 0 ? "Boutique collection empty" : `${cart.length} unique pieces selected`}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cart.length === 0 ? (
          /* Empty Carts Layout */
          <div className="py-20 text-center space-y-6 max-w-sm mx-auto" id="cart-empty-state">
            <div className="w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-300 border border-neutral-150 mx-auto">
              <ShoppingBag size={28} className="stroke-[1.2]" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-neutral-950">Your Bag is Empty</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Discover our luxurious purses and handcrafted fine jewelry designed to complete your premium wardrobe.
              </p>
            </div>

            <button
              onClick={() => setPage("shop")}
              className="w-full bg-neutral-950 hover:bg-neutral-900 text-white text-[10px] tracking-widest font-bold uppercase py-4 rounded-xl transition-colors shadow-lg"
              id="empty-cart-shop-btn"
            >
              Browse Boutique Catalog
            </button>
          </div>
        ) : (
          /* Populated Carts Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="cart-active-state">
            
            {/* 1. Left Grid Block: Cart Rows List (Spans 8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {cart.map((item) => {
                const p = item.product;
                const rowTotal = p.price * item.quantity;
                return (
                  <div
                    key={p.id}
                    className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white border border-neutral-150 rounded-2xl gap-6 group transition-all hover:border-amber-200/50 hover:shadow-sm"
                    id={`cart-row-${p.id}`}
                  >
                    {/* Visual Segment */}
                    <div className="flex items-center gap-5 w-full sm:w-auto">
                      <button
                        onClick={() => setPage("product")}
                        className="w-20 h-24 bg-neutral-50 rounded-xl overflow-hidden border border-neutral-100 flex-shrink-0"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                      
                      <div className="min-w-0">
                        <p className="text-[9px] text-[#D4AF37] uppercase tracking-wider font-bold">
                          {p.category === "purses" ? "Purse Collection" : "Gold Accent"}
                        </p>
                        <h4 className="text-xs font-semibold text-neutral-950 truncate max-w-[280px]">
                          {p.name}
                        </h4>
                        <p className="text-xs text-neutral-500 font-mono mt-1">₹{p.price.toLocaleString("en-IN")}</p>
                      </div>
                    </div>

                    {/* Quantity Selector Adjustment */}
                    <div className="flex items-center justify-between w-full sm:w-auto gap-8 border-t sm:border-y-0 border-neutral-50 pt-4 sm:pt-0">
                      <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(p.id, item.quantity - 1)}
                          className="p-1 px-2.5 text-neutral-400 hover:bg-neutral-50 active:bg-neutral-100 outline-none"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-3.5 text-xs font-bold font-mono text-neutral-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(p.id, item.quantity + 1)}
                          className="p-1 px-2.5 text-neutral-400 hover:bg-neutral-50 active:bg-neutral-100 outline-none"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Row price summation */}
                      <div className="text-right min-w-[100px]">
                        <p className="text-xs font-bold text-neutral-950 font-mono">₹{rowTotal.toLocaleString("en-IN")}</p>
                        <p className="text-[10px] text-neutral-400 font-light mt-0.5">₹{p.price.toLocaleString("en-IN")} each</p>
                      </div>

                      {/* Removal button */}
                      <button
                        onClick={() => removeFromCart(p.id)}
                        className="text-[#999] hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors focus:outline-none"
                        aria-label="Discard item"
                        id={`remove-btn-${p.id}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                  </div>
                );
              })}

              {/* Coupon Codes Promo Application Section */}
              <div className="p-6 bg-neutral-50/50 rounded-2xl border border-neutral-150 space-y-4">
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest text-neutral-900">
                  <Sparkles size={14} className="text-[#D4AF37]" /> Apply Elite Voucher
                </div>
                
                <form onSubmit={handleApplyPromo} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="E.g., LUXURY10 or LUXURY20"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    disabled={promoApplied}
                    className="flex-grow bg-white border border-neutral-200 rounded-xl py-3 px-4 text-xs font-sans placeholder-neutral-400 focus:outline-none uppercase tracking-wider"
                    id="promo-input-box"
                  />
                  <button
                    type="submit"
                    disabled={promoApplied}
                    className="bg-neutral-950 disabled:bg-neutral-200 text-white hover:bg-neutral-800 font-bold text-xs tracking-widest py-3 px-8 rounded-xl uppercase transition-colors"
                  >
                    {promoApplied ? "Applied" : "Apply Code"}
                  </button>
                </form>

                <div className="text-[10px] text-neutral-400 space-y-1">
                  <p>• Code <span className="font-bold text-neutral-800">LUXURY10</span> provides 10% discount on all active cart lists.</p>
                  <p>• Code <span className="font-bold text-neutral-800">LUXURY20</span> provides 20% discount on cart sub-totals above ₹10,000.</p>
                </div>
              </div>

            </div>

            {/* 2. Right Grid Block: Sticky Checkout Order Summary (Spans 4) */}
            <div className="lg:col-span-4 bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border-b-2 border-[#D4AF37] lg:sticky lg:top-24">
              <h3 className="font-serif text-lg font-bold tracking-wide border-b border-neutral-900 pb-3">Box Totals</h3>
              
              <div className="space-y-4 text-xs font-light">
                {/* Sub */}
                <div className="flex justify-between">
                  <span className="text-neutral-420">Subtotal</span>
                  <span className="font-mono text-neutral-200">₹{itemsSubtotal.toLocaleString("en-IN")}</span>
                </div>

                {/* Promo Applied discount */}
                {activeDiscountPercentage > 0 && (
                  <div className="flex justify-between text-[#D4AF37] font-medium">
                    <span>Discount Included ({activeDiscountPercentage}%)</span>
                    <span className="font-mono">-₹{promoDiscountVal.toLocaleString("en-IN")}</span>
                  </div>
                )}

                {/* Shipping */}
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span>Shipping Charges</span>
                    <p className="text-[9px] text-neutral-510 leading-none">
                      {shippingFee === 0 ? "Complimentary Express" : "Boutique standard logistics"}
                    </p>
                  </div>
                  <span className="font-mono text-neutral-200">
                    {shippingFee === 0 ? "Free" : `₹${shippingFee.toLocaleString("en-IN")}`}
                  </span>
                </div>

                <hr className="border-neutral-900" />

                {/* Grand Sum total */}
                <div className="flex justify-between items-baseline font-serif text-base font-bold text-white">
                  <span className="font-sans text-xs uppercase tracking-widest text-neutral-410">Grand total</span>
                  <span className="text-lg text-amber-400 font-mono">₹{finalOrderTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Security Shield */}
              <div className="flex items-start gap-2.5 bg-neutral-900 p-4 border border-neutral-800/60 rounded-xl leading-relaxed text-[11px] text-neutral-400">
                <ShieldCheck size={16} className="text-emerald-500 mt-0.5" />
                <p>
                  Payments protected using secure servers. CV Collection operates encrypted routing logic to preserve details.
                </p>
              </div>

              {/* Checkout route CTA */}
              <button
                type="button"
                onClick={handleCheckoutNav}
                className="w-full bg-[#D4AF37] hover:bg-white hover:text-neutral-950 text-neutral-950 text-xs tracking-widest font-bold py-4 uppercase rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 group focus:outline-none"
                id="cart-shipping-checkout-btn"
              >
                Proceed to Checkout <ArrowRight size={14} className="group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setPage("shop")}
                className="w-full text-center text-[10px] text-neutral-400 hover:text-white uppercase tracking-widest hover:underline"
              >
                Continue Designing Wardrobe
              </button>

            </div>

          </div>
        )}
      </div>

    </div>
  );
}

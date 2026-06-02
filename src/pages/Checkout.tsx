/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { CheckCircle2, CreditCard, Landmark, Truck, MessageSquare, ArrowLeft, Phone, ShieldCheck, Mail, Printer } from "lucide-react";
import { motion } from "motion/react";

export default function Checkout() {
  const {
    cart,
    placeOrder,
    lastOrder,
    setLastOrder,
    setPage,
    showToast
  } = useShop();

  // Load applied coupon discount if any
  const [appliedDiscountPercentage, setAppliedDiscountPercentage] = useState(0);

  useEffect(() => {
    const savedCodeAmt = localStorage.getItem("cv_applied_discount_percentage");
    if (savedCodeAmt) {
      setAppliedDiscountPercentage(parseInt(savedCodeAmt, 10));
    }
  }, []);

  // Shipping details state
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    zipCode: ""
  });

  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "upi" | "cod">("credit-card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: ""
  });
  const [upiId, setUpiId] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");

  // Subtotal estimations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  // Shipping logic (Complimentary above 5,000)
  const shippingFee = cartSubtotal >= 5000 || cartSubtotal === 0 ? 0 : 350;
  
  // Discount calculations
  const totalDiscountVal = (cartSubtotal * appliedDiscountPercentage) / 100;
  
  const finalOrderSum = cartSubtotal + shippingFee - totalDiscountVal;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validations
    if (!shippingAddress.fullName || !shippingAddress.email || !shippingAddress.phone || !shippingAddress.addressLine) {
      showToast("Please complete Shipping Details.", "info");
      return;
    }

    if (paymentMethod === "credit-card" && (!cardDetails.number || !cardDetails.cvv)) {
      showToast("Please fill in Credit Card credentials.", "info");
      return;
    }

    if (paymentMethod === "upi" && !upiId.includes("@")) {
      showToast("Please enter a valid UPI Identifier (e.g., vpa@ybl).", "info");
      return;
    }

    // Call context to record transaction
    const res = placeOrder(shippingAddress, paymentMethod);
    if (res) {
      setPlacedOrderId(res.orderId);
      setOrderComplete(true);
      localStorage.removeItem("cv_applied_discount_percentage");
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const clearOrderView = () => {
    setLastOrder(null);
    setOrderComplete(false);
    setPage("home");
  };

  // WhatsApp helper link for tracking
  const getWhatsAppTrackingUrl = () => {
    const defaultMsg = `Hello CV Collection, I have placed an order with Order ID ${placedOrderId || lastOrder?.id || 'CV-TEMP'}. Please share the current express delivery coordinates.`;
    return `https://wa.me/917069870221?text=${encodeURIComponent(defaultMsg)}`;
  };

  // Render receipt layout on complete
  if (orderComplete && (lastOrder || placedOrderId)) {
    const activeReceipt = lastOrder;
    return (
      <div className="bg-neutral-50 min-h-screen py-16 px-4 font-sans print:bg-white" id="receipt-viewport">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-2xl print:shadow-none print:border-none"
        >
          {/* Top visual logo block */}
          <div className="bg-neutral-950 text-white p-8 text-center space-y-3 relative print:text-neutral-950 print:bg-transparent print:border-b print:border-neutral-200">
            <div className="w-12 h-12 bg-neutral-900 border border-amber-400 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-2 print:hidden">
              <CheckCircle2 size={24} />
            </div>
            
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400 print:text-[#D4AF37]">
              Luxe Order Transmitted
            </p>
            <h1 className="font-serif text-3xl font-bold tracking-tight italic">CV Collection</h1>
            
            <div className="text-xs text-neutral-400 print:text-neutral-500 font-mono flex items-center justify-center gap-2">
              <span>Receipt Code:</span>
              <span className="text-white font-bold tracking-wider print:text-neutral-950">{placedOrderId || activeReceipt?.id}</span>
              <span className="text-neutral-700">|</span>
              <span>{activeReceipt?.date}</span>
            </div>
          </div>

          <div className="p-8 space-y-6">
            
            {/* success summary */}
            <div className="text-center space-y-2 max-w-md mx-auto print:hidden">
              <h3 className="font-serif text-lg font-bold text-neutral-950">Thank you for your patronage</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                An artisan packaging box is being tailored for your chosen products. An official dispatch receipt with tracker links has been dispatched to <span className="font-semibold text-neutral-800">{activeReceipt?.address?.email}</span>.
              </p>
            </div>

            <hr className="border-neutral-100" />

            {/* Line Items purchased */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Order Manifest</h4>
              <div className="space-y-3">
                {activeReceipt?.items?.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-neutral-50 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-10 bg-neutral-50 border rounded overflow-hidden print:hidden flex-shrink-0">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-950">{item.product.name}</p>
                        <p className="text-[10px] text-neutral-400 font-mono">Qty: {item.quantity} x ₹{item.product.price.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-neutral-950 font-mono">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs bg-neutral-50 p-5 rounded-2xl border border-neutral-150 font-light leading-relaxed">
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Couture Shipments To</p>
                <p className="font-semibold text-neutral-900">{activeReceipt?.address?.fullName}</p>
                <p>{activeReceipt?.address?.addressLine}</p>
                <p>{activeReceipt?.address?.city}, {activeReceipt?.address?.state} - {activeReceipt?.address?.zipCode}</p>
                <p className="font-mono pt-1 text-neutral-500">Call: {activeReceipt?.address?.phone}</p>
              </div>

              <div className="space-y-1.5 sm:border-l sm:border-neutral-200 sm:pl-6">
                <p className="text-[9px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Concierge Invoicing</p>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{activeReceipt?.items?.reduce((sum: number, it: any) => sum + (it.product.price * it.quantity), 0).toLocaleString("en-IN")}</span>
                </div>
                {appliedDiscountPercentage > 0 && (
                  <div className="flex justify-between text-amber-700">
                    <span>Coupon Promo</span>
                    <span className="font-mono">-{appliedDiscountPercentage}%</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Logistics</span>
                  <span>Free</span>
                </div>
                <div className="h-px bg-neutral-200 my-1" />
                <div className="flex justify-between font-serif font-bold text-neutral-950">
                  <span>Grand Total</span>
                  <span className="font-mono text-base text-amber-700">₹{activeReceipt?.total?.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Concierge support */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 border border-neutral-100 rounded-xl gap-4 text-xs font-light">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#D4AF37]" />
                <span>Urgent order inquiries? Hotline call: <b>+91 7069870221</b></span>
              </div>
              <a
                href={getWhatsAppTrackingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#128C7E] hover:bg-[#0e7065] text-white text-[10px] tracking-widest font-bold uppercase py-2 px-4 rounded-lg flex items-center gap-1 shadow print:hidden"
              >
                <MessageSquare size={12} /> Live Support
              </a>
            </div>

            {/* Success Print Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 print:hidden">
              <button
                onClick={handlePrintReceipt}
                type="button"
                className="w-full bg-white hover:bg-neutral-50 text-neutral-950 border border-neutral-300 font-bold text-xs tracking-widest uppercase py-3.5 rounded-xl flex items-center justify-center gap-1"
                id="print-receipt-btn"
              >
                <Printer size={14} /> Print Formal Receipt
              </button>
              
              <button
                onClick={clearOrderView}
                type="button"
                className="w-full bg-neutral-900 hover:bg-neutral-950 text-white font-bold text-xs tracking-widest uppercase py-3.5 rounded-xl"
                id="receipt-return-home"
              >
                Return To Portal
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    );
  }

  // empty check redirect helper
  if (cart.length === 0) {
    return (
      <div className="bg-white min-h-screen py-24 px-4 text-center space-y-4">
        <p className="font-serif text-lg text-neutral-800">Your Checkout is Empty</p>
        <p className="text-xs text-neutral-400">Please append luxury pieces or designs to your styling bag before visiting.</p>
        <button
          onClick={() => setPage("shop")}
          className="border border-neutral-900 hover:bg-neutral-950 hover:text-white text-[10px] tracking-widest font-bold uppercase py-3.5 px-8 transition-colors"
        >
          Explore Boutique Room
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans" id="checkout-root">
      
      {/* Page Header */}
      <div className="bg-neutral-50 border-b border-neutral-100 py-10 text-center">
        <h1 className="font-serif text-2xl sm:text-3xl font-light text-neutral-950 tracking-tight">Concierge Checkout</h1>
        <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mt-1">CV Collection Portal</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* A. Left Block: Shipping and Payment Settings (Spans 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Customer contacts section */}
            <div className="space-y-4">
              <h3 className="font-serif text-base font-bold text-neutral-950 border-b border-neutral-100 pb-2">
                1. Customer Details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500" htmlFor="fullName">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    placeholder="E.g., Radhika Sharma"
                    className="w-full border border-neutral-200 rounded-xl py-3 px-4 text-xs font-sans placeholder-neutral-450 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] bg-white"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500" htmlFor="email">
                    E-Mail <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={shippingAddress.email}
                    onChange={handleInputChange}
                    placeholder="E.g., radhika@gmail.com"
                    className="w-full border border-neutral-200 rounded-xl py-3 px-4 text-xs font-sans placeholder-neutral-450 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] bg-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500" htmlFor="phone">
                  Contact Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-xs text-neutral-450 font-semibold select-none">+91</span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    maxLength={10}
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    placeholder="99999 99999"
                    className="w-full border border-neutral-200 rounded-xl py-3 pl-14 pr-4 text-xs font-sans placeholder-neutral-450 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] bg-white"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 2. Destination coordinates section */}
            <div className="space-y-4">
              <h3 className="font-serif text-base font-bold text-neutral-950 border-b border-neutral-100 pb-2">
                2. Shipping Address
              </h3>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500" htmlFor="addressLine">
                  Complete Street Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="addressLine"
                  name="addressLine"
                  value={shippingAddress.addressLine}
                  onChange={handleInputChange}
                  placeholder="Appt No, Mansion name, Cross layout..."
                  className="w-full border border-neutral-200 rounded-xl py-3 px-4 text-xs font-sans placeholder-neutral-450 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500" htmlFor="city">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    placeholder="E.g., Morbi"
                    className="w-full border border-neutral-200 rounded-xl py-3 px-4 text-xs font-sans placeholder-neutral-450 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] bg-white"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500" htmlFor="state">
                    State <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    placeholder="E.g., Gujarat"
                    className="w-full border border-neutral-200 rounded-xl py-3 px-4 text-xs font-sans placeholder-neutral-450 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] bg-white"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500" htmlFor="zipCode">
                    ZIP PIN Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleInputChange}
                    placeholder="E.g., 400050"
                    className="w-full border border-neutral-200 rounded-xl py-3 px-4 text-xs font-sans placeholder-neutral-450 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] bg-white"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 3. Core luxury Payment Channels radios */}
            <div className="space-y-4">
              <h3 className="font-serif text-base font-bold text-neutral-950 border-b border-neutral-100 pb-2">
                3. Secure Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Credit Card radio */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("credit-card")}
                  className={`flex flex-col items-center justify-center p-4 border rounded-2xl text-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === "credit-card"
                      ? "border-[#D4AF37] bg-amber-50/20 text-amber-900 font-bold"
                      : "border-neutral-250 bg-white hover:bg-neutral-50 text-neutral-600"
                  }`}
                  id="pay-cc-btn"
                >
                  <CreditCard size={18} />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">Credit Card / Debit</span>
                </button>

                {/* UPI Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex flex-col items-center justify-center p-4 border rounded-2xl text-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === "upi"
                      ? "border-[#D4AF37] bg-amber-50/20 text-amber-900 font-bold"
                      : "border-neutral-250 bg-white hover:bg-neutral-50 text-neutral-600"
                  }`}
                  id="pay-upi-btn"
                >
                  <Landmark size={18} />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">Instant UPI / NetBank</span>
                </button>

                {/* COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex flex-col items-center justify-center p-4 border rounded-2xl text-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-[#D4AF37] bg-amber-50/20 text-amber-900 font-bold"
                      : "border-neutral-250 bg-white hover:bg-neutral-50 text-neutral-600"
                  }`}
                  id="pay-cod-btn"
                >
                  <Truck size={18} />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">Cash On Delivery</span>
                </button>
              </div>

              {/* Dynamic sub-field setups based on active payment method */}
              <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-150 text-xs">
                {paymentMethod === "credit-card" && (
                  <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Credit Details</p>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider font-bold text-neutral-500">Card Number</label>
                        <input
                          type="text"
                          name="number"
                          placeholder="4111 2222 3333 4444"
                          maxLength={19}
                          value={cardDetails.number}
                          onChange={handleCardChange}
                          className="w-full bg-white border border-neutral-200 rounded-xl py-2.5 px-3 font-sans focus:outline-none font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-wider font-bold text-neutral-500">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            name="expiry"
                            placeholder="12/29"
                            maxLength={5}
                            value={cardDetails.expiry}
                            onChange={handleCardChange}
                            className="w-full bg-white border border-neutral-200 rounded-xl py-2.5 px-3 font-sans focus:outline-none font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-wider font-bold text-neutral-500">CVV Security</label>
                          <input
                            type="password"
                            name="cvv"
                            placeholder="•••"
                            maxLength={3}
                            value={cardDetails.cvv}
                            onChange={handleCardChange}
                            className="w-full bg-white border border-neutral-200 rounded-xl py-2.5 px-3 font-sans focus:outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">UPI Payments</p>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider font-bold text-neutral-500">Virtual Payment Address (VPA)</label>
                      <input
                        type="text"
                        placeholder="E.g., yourname@okaxis"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full bg-white border border-neutral-200 rounded-xl py-2.5 px-3 font-sans focus:outline-none font-mono"
                      />
                    </div>
                    <p className="text-[9px] text-neutral-400">
                      • System will dispatch a call notification to your connected smartphone payment app to complete verification securely.
                    </p>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold text-neutral-900">Cash On Delivery Approved</p>
                    <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                      • Standard cash payments on dispatch. No advance deposits required. To minimize contacts, kindly keep exact cash currency of <b>₹{finalOrderSum.toLocaleString("en-IN")}</b> ready at courier receipt.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* B. Right Block: Sticky checkout Invoice Summary list (Spans 5) */}
          <div className="lg:col-span-5 bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl lg:sticky lg:top-24">
            <h3 className="font-serif text-lg font-bold tracking-wide border-b border-neutral-850 pb-3 text-white">
              Luxury Items Summary
            </h3>

            {/* List entries */}
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center text-xs pb-3 border-b border-neutral-850">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 bg-neutral-800 rounded border border-neutral-800 overflow-hidden flex-shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-100 truncate max-w-[170px]">{item.product.name}</p>
                      <p className="text-[10px] text-neutral-400 font-mono">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold font-mono text-neutral-200">
                    ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            {/* Invoice parameters math */}
            <div className="space-y-3.5 text-xs font-light">
              <div className="flex justify-between">
                <span className="text-neutral-400">Order Subtotal</span>
                <span className="font-mono text-neutral-200">₹{cartSubtotal.toLocaleString("en-IN")}</span>
              </div>
              
              {appliedDiscountPercentage > 0 && (
                <div className="flex justify-between text-[#D4AF37] font-medium">
                  <span>Elite Voucher ({appliedDiscountPercentage}%)</span>
                  <span className="font-mono">-₹{totalDiscountVal.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Express Shipping</span>
                <span className="font-mono text-neutral-200">
                  {shippingFee === 0 ? "Complimentary" : `₹${shippingFee.toLocaleString("en-IN")}`}
                </span>
              </div>

              <hr className="border-neutral-850" />

              <div className="flex justify-between items-baseline font-serif text-base font-bold">
                <span className="font-sans text-xs uppercase tracking-widest text-[#D4AF37]">Grand Sum</span>
                <span className="text-amber-400 font-mono text-lg">₹{finalOrderSum.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Security Assurance */}
            <div className="flex items-start gap-2.5 bg-neutral-950 p-4 border border-neutral-850 rounded-xl leading-relaxed text-[10px] text-neutral-400 font-sans">
              <ShieldCheck size={14} className="text-[#D4AF37] mt-0.5" />
              <p>
                CV Collection operates dual-security protocols. Your styling order is handled with utmost integrity. Official India-GST invoicing will be inside the packaging box.
              </p>
            </div>

            {/* Placing buttons */}
            <button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-white hover:text-neutral-950 text-neutral-950 text-xs tracking-widest font-bold py-4 uppercase rounded-xl shadow-lg transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
              id="checkout-finalize-btn"
            >
              Securely Place Order
            </button>

            <button
              onClick={() => setPage("cart")}
              className="w-full text-center text-[10px] text-neutral-400 hover:text-white uppercase tracking-widest hover:underline flex items-center justify-center gap-1"
            >
              <ArrowLeft size={10} /> Back to Bag Calculations
            </button>

          </div>

        </form>
      </div>

    </div>
  );
}

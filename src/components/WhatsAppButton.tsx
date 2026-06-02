/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MessageSquare } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "+917069870221";
  const defaultMessage = encodeURIComponent(
    "Hello CV Collection Concierge, I am viewing your online boutique and would love assistance with your premium collection."
  );
  
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[\s+]/g, "")}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 group flex items-center justify-center pointer-events-auto"
      id="concierge-whatsapp-floating"
      title="Connect with a Personal Stylist"
    >
      <div className="relative">
        {/* Pulsing luxurious background ring */}
        <span className="absolute -inset-1 rounded-full bg-[#128C7E]/10 animate-ping group-hover:bg-[#128C7E]/20 transition-all duration-300" />
        
        {/* Double container for brand elegance */}
        <div className="flex items-center gap-3 bg-[#111111]/90 hover:bg-[#111111] text-white p-3.5 px-5 rounded-full border border-amber-400/30 shadow-2xl transition-all duration-300 transform group-hover:scale-105">
          {/* WhatsApp visual dot indicators */}
          <div className="relative flex h-2.5 w-2.5 mr-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          
          <MessageSquare size={16} className="text-[#25D366] transition-transform duration-300 group-hover:rotate-12" />
          
          <div className="flex flex-col text-left">
            <span className="text-[9px] uppercase tracking-[0.2em] font-light text-amber-400/80">Stylist Chat</span>
            <span className="text-[11px] font-medium tracking-wide font-serif italic text-white leading-tight">Chat On WhatsApp</span>
          </div>
        </div>
      </div>
    </a>
  );
}

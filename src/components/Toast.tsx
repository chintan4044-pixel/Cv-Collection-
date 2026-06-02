/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useShop } from "../context/ShopContext";
import { Check, Info, X } from "lucide-react";

export default function Toast() {
  const { toast, hideToast } = useShop();

  return (
    <AnimatePresence>
      {toast.visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white text-gray-900 border border-amber-200 shadow-2xl rounded-xl overflow-hidden pointer-events-auto"
          id="shop-toast"
        >
          <div className="p-4 flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === "success" ? (
                <div className="bg-emerald-50 text-emerald-600 rounded-full p-1.5 border border-emerald-100">
                  <Check size={16} />
                </div>
              ) : (
                <div className="bg-amber-50 text-amber-600 rounded-full p-1.5 border border-amber-100">
                  <Info size={16} />
                </div>
              )}
            </div>
            
            <div className="flex-grow">
              <p className="text-sm font-medium tracking-wide">
                {toast.type === "success" ? "Exquisite Addition" : "Information"}
              </p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {toast.message}
              </p>
            </div>

            <button
              onClick={hideToast}
              className="flex-shrink-0 text-gray-400 hover:text-gray-900 transition-colors rounded-lg p-1"
              aria-label="Close message"
              id="close-toast-btn"
            >
              <X size={14} />
            </button>
          </div>
          
          <div className="h-1 bg-gradient-to-r from-amber-400 via-pink-300 to-amber-500 animate-pulse w-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

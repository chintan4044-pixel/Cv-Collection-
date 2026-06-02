/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShopProvider, useShop } from "./context/ShopContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Toast from "./components/Toast";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";

function MainAppContent() {
  const { page } = useShop();

  const renderActivePage = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "shop":
        return <Shop />;
      case "product":
        return <ProductDetail />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "cart":
        return <Cart />;
      case "checkout":
        return <Checkout />;
      case "admin":
        return <Admin />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-900 selection:bg-amber-100 selection:text-amber-900" id="main-app-content-wrapper">
      {/* Sticky Premium Navigation Header */}
      <Header />

      {/* Dynamic Main Body Content */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      {/* Custom Artisan Footer */}
      <Footer />

      {/* Floating Concierge Direct WhatsApp Trigger */}
      <WhatsAppButton />

      {/* Custom Animated Screen Toasts feedback */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainAppContent />
    </ShopProvider>
  );
}

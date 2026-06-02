/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Product } from "../types";
import { 
  Plus, Edit, Trash2, RotateCcw, Check, X, 
  Sparkles, Package, DollarSign, Image, 
  FileText, List, ArrowLeft, Eye, Settings
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Curated high-resolution stock image suggestions for quick-click aesthetic selections
const PRESET_IMAGES = {
  purses: [
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800",
    "https://images.unsplash.com/photo-1598532163257-da3ad67f4729?q=80&w=800",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800",
    "https://images.unsplash.com/photo-1566150905458-1bf1fc15a4a5?q=80&w=800",
    "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800"
  ],
  jewelry: [
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800",
    "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800"
  ]
};

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct, resetCatalog, setPage, viewProduct } = useShop();

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "purses" as "purses" | "jewelry",
    images: [""] as string[],
    stock: "10",
    features: "" as string, // Joined by newline
    spec1Key: "Material",
    spec1Val: "Genuine Leather",
    spec2Key: "Hardware",
    spec2Val: "Gold-plated",
    spec3Key: "Dimensions",
    spec3Val: "24cm x 16cm x 8cm",
    spec4Key: "Weight",
    spec4Val: "500g"
  });

  // Filter administration list
  const [adminCategory, setAdminCategory] = useState<"all" | "purses" | "jewelry">("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredProducts = products.filter(
    p => adminCategory === "all" || p.category === adminCategory
  );

  // Open Form for Adding New Product
  const handleOpenAdd = () => {
    setEditingProductId(null);
    setFormData({
      name: "",
      description: "Premium handcrafted design reflecting absolute grace.",
      price: "8500",
      originalPrice: "11500",
      category: "purses",
      images: [PRESET_IMAGES.purses[0]],
      stock: "10",
      features: "100% Premium handcrafted layout\nPolished hardware and locks\nInner protective slip slot\nHighly durable for everyday styling\nAuthenticity certification card included",
      spec1Key: "Material",
      spec1Val: "Premium Crafted Material",
      spec2Key: "Hardware",
      spec2Val: "Polished Gold Tone",
      spec3Key: "Dimensions",
      spec3Val: "25cm x 18cm x 10cm",
      spec4Key: "Weight",
      spec4Val: "450g"
    });
    setIsFormOpen(true);
  };

  // Open Form for Editing Existing Product
  const handleOpenEdit = (product: Product) => {
    setEditingProductId(product.id);
    
    // Deconstruct features and specifications
    const featuresStr = product.features.join("\n");
    const specs = Object.entries(product.specifications);
    const s1 = specs[0] || ["Material", ""];
    const s2 = specs[1] || ["Hardware", ""];
    const s3 = specs[2] || ["Dimensions", ""];
    const s4 = specs[3] || ["Weight", ""];

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice ? product.originalPrice.toString() : "",
      category: product.category,
      images: product.images.length > 0 ? [...product.images] : ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800"],
      stock: product.stock.toString(),
      features: featuresStr,
      spec1Key: s1[0],
      spec1Val: s1[1],
      spec2Key: s2[0],
      spec2Val: s2[1],
      spec3Key: s3[0],
      spec3Val: s3[1],
      spec4Key: s4[0],
      spec4Val: s4[1]
    });
    
    setIsFormOpen(true);
  };

  // Handle Form Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Category Change in Form (updates default preset images)
  const handleFormCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value as "purses" | "jewelry";
    setFormData(prev => ({
      ...prev,
      category,
      images: [PRESET_IMAGES[category][0]] // Autoselect first preset of new category
    }));
  };

  // Image URL helpers
  const handleImageUrlChange = (index: number, val: string) => {
    const updated = [...formData.images];
    updated[index] = val;
    setFormData(prev => ({ ...prev, images: updated }));
  };

  const addImageUrlField = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImageUrlField = (index: number) => {
    if (formData.images.length <= 1) return;
    const updated = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: updated }));
  };

  // Submit form (Create or Update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return;

    const parsedPrice = parseFloat(formData.price) || 0;
    const parsedOriginalPrice = formData.originalPrice ? parseFloat(formData.originalPrice) : undefined;
    const parsedStock = parseInt(formData.stock, 10) || 0;
    const parsedFeatures = formData.features
      .split("\n")
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const parsedSpecs: Record<string, string> = {};
    if (formData.spec1Key.trim()) parsedSpecs[formData.spec1Key] = formData.spec1Val;
    if (formData.spec2Key.trim()) parsedSpecs[formData.spec2Key] = formData.spec2Val;
    if (formData.spec3Key.trim()) parsedSpecs[formData.spec3Key] = formData.spec3Val;
    if (formData.spec4Key.trim()) parsedSpecs[formData.spec4Key] = formData.spec4Val;

    // Filter out empty image URLs
    const filteredImages = formData.images.map(img => img.trim()).filter(img => img.length > 0);
    const finalImages = filteredImages.length > 0 ? filteredImages : [PRESET_IMAGES[formData.category][0]];

    const productPayload = {
      name: formData.name,
      description: formData.description,
      price: parsedPrice,
      originalPrice: parsedOriginalPrice,
      category: formData.category,
      images: finalImages,
      stock: parsedStock,
      features: parsedFeatures,
      specifications: parsedSpecs
    };

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsFormOpen(false);
    setEditingProductId(null);
  };

  // Trigger catalog reset
  const handleResetCatalog = () => {
    if (window.confirm("Are you sure you want to reset the catalog? All custom additions/edits will be undone.")) {
      resetCatalog();
    }
  };

  return (
    <div className="bg-white min-h-screen text-neutral-900 pb-20" id="admin-view-viewport">
      
      {/* 1. Header/Navigation Bar */}
      <section className="bg-[#fdf2f2]/40 border-b border-neutral-150 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Settings size={16} className="text-[#c5a059]" />
                <span className="text-[10px] text-[#c5a059] uppercase tracking-[0.25em] font-bold">Aesthetic Management</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-neutral-950 font-light tracking-tight">
                CV Collection <span className="italic font-bold">Catalog Studio</span>
              </h1>
              <p className="text-xs text-neutral-500 font-light max-w-xl">
                Add, edit, or reset premium leather purses and high-luxury jewelry instantly. Changes are synchronized live and stored in your persistence panel.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setPage("shop")}
                className="inline-flex items-center gap-2 border border-neutral-200 bg-white hover:border-neutral-900 px-5 py-3 text-[11px] font-medium tracking-widest uppercase transition-all rounded-none shadow-sm"
                id="admin-to-shop-btn"
              >
                <ArrowLeft size={13} /> Return to Shop
              </button>
              <button
                onClick={handleResetCatalog}
                className="inline-flex items-center gap-2 border border-dashed border-red-200 hover:border-red-500 bg-red-50/20 text-red-700 hover:bg-red-50 px-5 py-3 text-[11px] font-medium tracking-widest uppercase transition-all rounded-none"
                id="admin-reset-catalog-btn"
                title="Reset live changes back to the design standard catalog"
              >
                <RotateCcw size={13} /> Reset Catalog Defaults
              </button>
              <button
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white hover:bg-[#c5a059] px-6 py-3 text-[11px] font-medium tracking-widest uppercase transition-all shadow-md rounded-none"
                id="admin-add-product-btn"
              >
                <Plus size={14} /> Add Luxury Product
              </button>
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Category Filters Tab bar */}
        <div className="border-b border-neutral-200 mb-8 flex justify-between items-center flex-wrap gap-4">
          <div className="flex space-x-1 overflow-x-auto pb-[1px]" id="admin-category-tabs">
            {(["all", "purses", "jewelry"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setAdminCategory(cat)}
                className={`py-4 px-5 text-xs font-medium uppercase tracking-widest border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  adminCategory === cat
                    ? "border-[#c5a059] text-neutral-900 font-semibold"
                    : "border-transparent text-neutral-450 hover:text-neutral-900"
                }`}
              >
                {cat === "all" ? "Entire Catalog" : cat === "purses" ? "Boutique Handbags" : "Fine Jewelry"} ({products.filter(p => cat === "all" || p.category === cat).length})
              </button>
            ))}
          </div>

          <p className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
            Current Live Items: {products.length} units
          </p>
        </div>

        {/* 2. Grid Table of Products */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-neutral-100 bg-neutral-50/20">
            <Package size={36} className="mx-auto text-neutral-300 stroke-1" />
            <p className="font-serif text-lg text-neutral-700 mt-4 leading-normal">No Products Found in Selected Room</p>
            <p className="text-xs text-neutral-450 mt-1 max-w-md mx-auto">
              Please click "Add Luxury Product" in the upper right to hand-create a new custom item, or click "Reset Catalog Defaults".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="admin-products-grid">
            {filteredProducts.map((p) => {
              const hasDiscount = p.originalPrice && p.originalPrice > p.price;
              const isLowStock = p.stock <= 3;
              const isOut = p.stock === 0;

              return (
                <motion.div
                  layout
                  key={p.id}
                  className="bg-white border border-neutral-200 hover:border-neutral-400 transition-all shadow-sm group relative flex flex-col justify-between"
                  id={`admin-card-${p.id}`}
                >
                  {/* Photo & badges */}
                  <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 border-b border-neutral-100">
                    <img
                      src={p.images[0] || "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800"}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      <span className="bg-white/95 text-neutral-900 border border-neutral-200 text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 shadow-sm">
                        {p.category}
                      </span>
                      {p.isFeatured && (
                        <span className="bg-amber-500 text-white text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 shadow-sm">
                          Featured
                        </span>
                      )}
                      {p.isBestSeller && (
                        <span className="bg-neutral-900 text-white text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 shadow-sm">
                          Best Seller
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <span className={`text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 ${
                        isOut 
                          ? "bg-red-550 text-white" 
                          : isLowStock 
                            ? "bg-amber-50 text-amber-900 border border-amber-200" 
                            : "bg-emerald-50 text-emerald-900 border border-emerald-200"
                      }`}>
                        {isOut ? "Out of Stock" : isLowStock ? `Only ${p.stock} Left!` : `Stock: ${p.stock}`}
                      </span>
                    </div>
                  </div>

                  {/* Body textuals */}
                  <div className="p-5 flex-grow space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif text-base font-bold text-neutral-900 line-clamp-1">
                        {p.name}
                      </h3>
                      <button
                        onClick={() => viewProduct(p)}
                        className="text-neutral-400 hover:text-[#c5a059] p-0.5 transition-colors"
                        title="Display public buyer page preview"
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                    
                    <p className="text-neutral-500 text-[11px] leading-relaxed line-clamp-2 font-light">
                      {p.description}
                    </p>

                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="font-serif text-sm font-semibold text-neutral-950">
                        ₹{p.price.toLocaleString("en-IN")}
                      </span>
                      {hasDiscount && (
                        <span className="text-[10px] text-neutral-400 line-through font-light">
                          ₹{p.originalPrice?.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom administrative rows controls */}
                  <div className="p-4 bg-neutral-50/60 border-t border-neutral-100 flex items-center justify-between gap-6">
                    <span className="text-[9px] font-mono text-neutral-400">ID: {p.id}</span>
                    
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-2 border border-neutral-200 bg-white hover:border-neutral-950 text-neutral-700 hover:text-neutral-950 transition-all rounded-none"
                        title="Edit specification, prices, or titles"
                      >
                        <Edit size={13} />
                      </button>

                      {deleteConfirmId === p.id ? (
                        <div className="flex items-center gap-1 bg-red-50 border border-red-200 px-1 py-0.5">
                          <button
                            onClick={() => {
                              deleteProduct(p.id);
                              setDeleteConfirmId(null);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white text-[9px] uppercase tracking-widest font-bold px-2 py-1.5 transition-colors"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="text-neutral-500 hover:text-neutral-900 p-1"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-2 border border-neutral-200 bg-white hover:bg-red-50 hover:border-red-400 text-neutral-400 hover:text-red-500 transition-all rounded-none"
                          title="Remove unit from database"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* 3. Sliding Beautiful Form Panel (Overlay dialog) */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50 flex justify-end" id="admin-form-modal-overlay">
            <motion.div
              initial={{ x: "100%", opacity: 0.95 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between overflow-hidden relative"
              id="admin-scrollable-form-container"
            >
              {/* Form title */}
              <div className="px-6 py-5 bg-[#fdf2f2]/60 border-b border-neutral-150 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-lg font-bold text-neutral-900">
                    {editingProductId ? "Modify Exhibition specifications" : "Introduce New Curated Exhibit"}
                  </h2>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold mt-0.5">
                    {editingProductId ? `Edit Product ID: ${editingProductId}` : "Create a new boutique masterpiece catalog entry"}
                  </p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-950 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable form body fields properties */}
              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow space-y-6 text-xs font-sans">
                
                {/* Visual Section: Essential Identity */}
                <div className="space-y-4">
                  <h3 className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] border-b border-neutral-100 pb-1.5 flex items-center gap-1.5">
                    <Sparkles size={11} /> 1. Essence and Identity
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-neutral-500 font-medium font-sans">Curated Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="E.g., Diamond Petal Studs / Regal Saffiano"
                        className="w-full border border-neutral-200 rounded-none py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-neutral-500 font-medium font-sans">Heritage Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleFormCategoryChange}
                        className="w-full border border-neutral-200 rounded-none py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-[#c5a059] bg-white cursor-pointer"
                      >
                        <option value="purses">Boutique Handbags / Purses</option>
                        <option value="jewelry">Fine Artisan Jewelry</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-500 font-medium font-sans">Atelier Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Narrate details, provenance, feeling, and luxury context of this unit..."
                      className="w-full border border-neutral-200 rounded-none py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-[#c5a059] h-20 resize-none font-sans leading-relaxed"
                      required
                    />
                  </div>
                </div>

                {/* Visual Section: Pricing & Stock status */}
                <div className="space-y-4 pt-1">
                  <h3 className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] border-b border-neutral-100 pb-1.5 flex items-center gap-1.5">
                    <Package size={11} /> 2. Pricing & Storage Coordinates
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-neutral-500 font-medium font-sans">Exhibition Price (₹ INR)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-neutral-400 font-sans">₹</span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="9500"
                          className="w-full border border-neutral-200 rounded-none py-2.5 pl-7 pr-3 focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                          required
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-neutral-500 font-medium font-sans flex items-center justify-between">
                        <span>Original Price (Strikethrough)</span>
                        <span className="text-[9px] font-light text-neutral-400 italic">Optional</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-neutral-400 font-sans">₹</span>
                        <input
                          type="number"
                          name="originalPrice"
                          value={formData.originalPrice}
                          onChange={handleChange}
                          placeholder="12999"
                          className="w-full border border-neutral-200 rounded-none py-2.5 pl-7 pr-3 focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-neutral-500 font-medium font-sans">Available Units (Stock)</label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="10"
                        className="w-full border border-neutral-200 rounded-none py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                        required
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Visual Section: Images config */}
                <div className="space-y-4 pt-1">
                  <div className="flex justify-between items-center border-b border-neutral-100 pb-1.5">
                    <h3 className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] flex items-center gap-1.5">
                      <Image size={11} /> 3. High-Quality Imagery
                    </h3>
                    <button
                      type="button"
                      onClick={addImageUrlField}
                      className="text-[9px] font-semibold text-neutral-500 hover:text-neutral-900 uppercase tracking-widest"
                    >
                      + Add image path
                    </button>
                  </div>

                  <p className="text-[10px] text-neutral-400 font-light leading-relaxed">
                    Paste public web image URLs. Alternatively, click any of the curated presets below to instantly bind a beautiful professional placeholder.
                  </p>

                  <div className="space-y-2">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          type="url"
                          value={img}
                          onChange={(e) => handleImageUrlChange(idx, e.target.value)}
                          placeholder="https://images.unsplash.com/photo-..."
                          className="flex-grow border border-neutral-200 rounded-none py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                        />
                        {formData.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeImageUrlField(idx)}
                            className="bg-red-50 text-red-600 border border-red-150 p-2.5 hover:bg-red-100 transition-colors"
                          >
                            <X size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Preset quick buttons */}
                  <div className="space-y-2 pt-1.5 bg-neutral-50 p-3 border border-neutral-150">
                    <p className="text-[9px] uppercase tracking-wider font-semibold text-neutral-500">Curated Stock Presets ({formData.category}):</p>
                    <div className="flex flex-wrap gap-2 text-neutral-700">
                      {PRESET_IMAGES[formData.category].map((url, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            // Replace first image or set as sole image
                            const updated = [...formData.images];
                            updated[0] = url;
                            setFormData(prev => ({ ...prev, images: updated }));
                          }}
                          className="w-11 h-11 border border-neutral-200 hover:border-[#c5a059] overflow-hidden aspect-square bg-white relative group"
                        >
                          <img src={url} alt={`Preset ${i}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-[8px] text-white font-bold font-sans">Use</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual Section: Feature Points */}
                <div className="space-y-4 pt-1">
                  <h3 className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] border-b border-neutral-100 pb-1.5 flex items-center gap-1.5">
                    <List size={11} /> 4. Premium Bullet Highlights
                  </h3>
                  
                  <div className="space-y-1">
                    <label className="text-neutral-500 font-medium font-sans flex items-center justify-between">
                      <span>Bespoke Features Highlight Points (One highlight line per row)</span>
                      <span className="text-[9px] font-light text-neutral-400">Press ENTER for next bullet</span>
                    </label>
                    <textarea
                      name="features"
                      value={formData.features}
                      onChange={handleChange}
                      placeholder="Genuine Italian micro-weave calfskin&#10;Sturdy gold protection feet&#10;Adjustable premium handle"
                      className="w-full border border-neutral-200 rounded-none py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-[#c5a059] h-28 resize-none font-sans leading-relaxed"
                    />
                  </div>
                </div>

                {/* Visual Section: Technical specifications */}
                <div className="space-y-4 pt-1">
                  <h3 className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] border-b border-neutral-100 pb-1.5 flex items-center gap-1.5">
                    <FileText size={11} /> 5. Technical Specifications Card
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid grid-cols-3 gap-2 items-center">
                      <input type="text" name="spec1Key" value={formData.spec1Key} onChange={handleChange} className="border border-neutral-200 py-2 px-2 focus:ring-1 font-bold rounded-none" />
                      <input type="text" name="spec1Val" value={formData.spec1Val} onChange={handleChange} className="border border-neutral-200 py-2 px-2 col-span-2 rounded-none" placeholder="e.g. Saffiano Leather" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 items-center">
                      <input type="text" name="spec2Key" value={formData.spec2Key} onChange={handleChange} className="border border-neutral-200 py-2 px-2 focus:ring-1 font-bold rounded-none" />
                      <input type="text" name="spec2Val" value={formData.spec2Val} onChange={handleChange} className="border border-neutral-200 py-2 px-2 col-span-2 rounded-none" placeholder="e.g. Gold Plated brass" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 items-center">
                      <input type="text" name="spec3Key" value={formData.spec3Key} onChange={handleChange} className="border border-neutral-200 py-2 px-2 focus:ring-1 font-bold rounded-none" />
                      <input type="text" name="spec3Val" value={formData.spec3Val} onChange={handleChange} className="border border-neutral-200 py-2 px-2 col-span-2 rounded-none" placeholder="e.g. 24cm x 16cm" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 items-center">
                      <input type="text" name="spec4Key" value={formData.spec4Key} onChange={handleChange} className="border border-neutral-200 py-2 px-2 focus:ring-1 font-bold rounded-none" />
                      <input type="text" name="spec4Val" value={formData.spec4Val} onChange={handleChange} className="border border-neutral-200 py-2 px-2 col-span-2 rounded-none" placeholder="e.g. 500g" />
                    </div>
                  </div>
                </div>

              </form>

              {/* Form Action Controls buttons */}
              <div className="p-6 bg-neutral-50 border-t border-neutral-150 flex items-center justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-3 border border-neutral-250 bg-white hover:border-neutral-900 text-[11px] font-medium tracking-widest uppercase transition-all rounded-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#c5a059] text-white text-[11px] font-medium tracking-widest uppercase transition-all shadow-md rounded-none inline-flex items-center gap-1.5"
                >
                  <Check size={13} /> {editingProductId ? "Apply Specifications edits" : "Authorize Addition into Catalog"}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

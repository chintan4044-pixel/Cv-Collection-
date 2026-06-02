/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, CartItem, PageType, ShippingAddress, PaymentMethod } from "../types";
import { PRODUCTS } from "../data/products";

interface ToastState {
  message: string;
  visible: boolean;
  type: "success" | "info";
}

interface ShopContextType {
  page: PageType;
  setPage: (page: PageType) => void;
  selectedCategory: "all" | "purses" | "jewelry";
  setSelectedCategory: (category: "all" | "purses" | "jewelry") => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortOption: string;
  setSortOption: (opt: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  activeProduct: Product | null;
  setActiveProduct: (product: Product | null) => void;
  viewProduct: (product: Product) => void;
  searchAndNavigate: (q: string) => void;
  toast: ToastState;
  showToast: (message: string, type?: "success" | "info") => void;
  hideToast: () => void;
  placeOrder: (address: ShippingAddress, method: PaymentMethod) => { orderId: string } | null;
  lastOrder: { id: string; address: ShippingAddress; method: PaymentMethod; total: number; items: CartItem[] } | null;
  setLastOrder: (order: any) => void;
  
  // Real-time catalog editing / CRUD capabilities
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetCatalog: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  // Navigation & filter state
  const [page, setPageState] = useState<PageType>("home");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "purses" | "jewelry">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  
  // Loaded from localStorage to provide consistent and persistence-first store experience
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cv_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem("cv_wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeProduct, setActiveProduct] = useState<Product | null>(() => {
    const saved = localStorage.getItem("cv_active_product");
    return saved ? JSON.parse(saved) : null;
  });
  const [lastOrder, setLastOrder] = useState<any>(() => {
    const saved = localStorage.getItem("cv_last_order");
    return saved ? JSON.parse(saved) : null;
  });

  const [products, setProductsState] = useState<Product[]>(() => {
    const saved = localStorage.getItem("cv_products");
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // Toasts
  const [toast, setToast] = useState<ToastState>({
    message: "",
    visible: false,
    type: "success"
  });

  // Keep localStorage synced
  useEffect(() => {
    localStorage.setItem("cv_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cv_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (activeProduct) {
      localStorage.setItem("cv_active_product", JSON.stringify(activeProduct));
    } else {
      localStorage.removeItem("cv_active_product");
    }
  }, [activeProduct]);

  useEffect(() => {
    if (lastOrder) {
      localStorage.setItem("cv_last_order", JSON.stringify(lastOrder));
    } else {
      localStorage.removeItem("cv_last_order");
    }
  }, [lastOrder]);

  useEffect(() => {
    localStorage.setItem("cv_products", JSON.stringify(products));
  }, [products]);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, visible: true, type });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  // Toast auto-dismissal
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  const setPage = (newPage: PageType) => {
    setPageState(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const viewProduct = (product: Product) => {
    setActiveProduct(product);
    setPage("product");
  };

  const searchAndNavigate = (query: string) => {
    setSearchQuery(query);
    setPage("shop");
  };

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        
        if (newQty > product.stock) {
          showToast(`Only ${product.stock} items remaining in stock.`, "info");
          updated[existingIndex].quantity = product.stock;
        } else {
          updated[existingIndex].quantity = newQty;
          showToast(`Added ${quantity} x ${product.name} to your styling bag.`, "success");
        }
        return updated;
      } else {
        if (quantity > product.stock) {
          showToast(`Only ${product.stock} items available. Added maximum stock.`, "info");
          return [...prevCart, { product, quantity: product.stock }];
        }
        showToast(`Added ${product.name} to your styling bag.`, "success");
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          if (quantity > item.product.stock) {
            showToast(`Sorry, only ${item.product.stock} items are in stock.`, "info");
            return { ...item, quantity: item.product.stock };
          }
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const product = prevCart.find(item => item.product.id === productId)?.product;
      if (product) {
        showToast(`Removed ${product.name} from your bag.`, "info");
      }
      return prevCart.filter(item => item.product.id !== productId);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist(prevList => {
      const exists = prevList.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from your wishlist.`, "info");
        return prevList.filter(item => item.id !== product.id);
      } else {
        showToast(`Added ${product.name} to your wishlist.`, "success");
        return [...prevList, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  // Product management CRUD operations
  const addProduct = (newProductData: Omit<Product, "id">) => {
    const randomId = `${newProductData.category}-${Date.now()}`;
    const newProduct: Product = {
      ...newProductData,
      id: randomId,
      rating: 5.0,
      reviewCount: 0,
      reviews: []
    };
    setProductsState(prev => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" added successfully.`, "success");
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProductsState(prev => prev.map(p => {
      if (p.id === id) {
        const merged = { ...p, ...updatedFields };
        // Sync active product if it is currently displayed
        if (activeProduct && activeProduct.id === id) {
          setActiveProduct(merged);
        }
        return merged;
      }
      return p;
    }));
    showToast("Product updated successfully.", "success");
  };

  const deleteProduct = (id: string) => {
    setProductsState(prev => prev.filter(p => p.id !== id));
    // Clear active product if it was deleted
    if (activeProduct && activeProduct.id === id) {
      setActiveProduct(null);
      if (page === "product" || page === "admin") {
        setPage("shop");
      }
    }
    showToast("Product deleted successfully.", "info");
  };

  const resetCatalog = () => {
    setProductsState(PRODUCTS);
    localStorage.setItem("cv_products", JSON.stringify(PRODUCTS));
    showToast("Product catalog reset to default premium standard.", "info");
  };

  // Place order
  const placeOrder = (address: ShippingAddress, method: PaymentMethod) => {
    if (cart.length === 0) return null;

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const orderId = "CV-" + Math.floor(100000 + Math.random() * 900000);
    
    const newOrder = {
      id: orderId,
      address,
      method,
      total,
      items: [...cart],
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    };

    setLastOrder(newOrder);
    clearCart();
    showToast("Congratulations! Your premium order has been successfully placed.", "success");
    return { orderId };
  };

  return (
    <ShopContext.Provider
      value={{
        page,
        setPage,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortOption,
        setSortOption,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        activeProduct,
        setActiveProduct,
        viewProduct,
        searchAndNavigate,
        toast,
        showToast,
        hideToast,
        placeOrder,
        lastOrder,
        setLastOrder,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetCatalog
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}

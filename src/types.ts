/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Visual styling for discount to drive sales
  category: "purses" | "jewelry";
  images: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  stock: number;
  features: string[];
  specifications: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PageType = "home" | "shop" | "product" | "about" | "contact" | "cart" | "checkout" | "admin";

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
}

export type PaymentMethod = "credit-card" | "upi" | "cod";

"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface CartContextType {
  quantity: number
  setQuantity: (quantity: number) => void
  getCurrentPrice: (quantity: number) => number
  getDiscount: (quantity: number) => number
}

const basePrice = 29.99

const discountTiers = [
	{ minQuantity: 50, discount: 0.4 }, // 40% off
	{ minQuantity: 20, discount: 0.35 }, // 35% off
	{ minQuantity: 10, discount: 0.3 }, // 30% off
	{ minQuantity: 5, discount: 0.25 }, // 25% off
	{ minQuantity: 2, discount: 0.15 }, // 15% off
];

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [quantity, setQuantity] = useState(1)

  const getDiscount = (qty: number): number => {
    const tier = discountTiers.find((tier) => qty >= tier.minQuantity)
    return tier ? tier.discount : 0
  }

  const getCurrentPrice = (qty: number): number => {
    const discount = getDiscount(qty)
    return basePrice * (1 - discount)
  }

  return (
    <CartContext.Provider value={{ quantity, setQuantity, getCurrentPrice, getDiscount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}


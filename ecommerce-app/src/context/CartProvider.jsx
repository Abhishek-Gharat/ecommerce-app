import { useState } from 'react'
import { cartElements } from '../data/cartItems'
import { CartContext } from './CartContextValue'

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(cartElements)

  const addToCart = (product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.title === product.title)

      if (existingItem) {
        return items.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...items, { ...product, quantity: 1 }]
    })
  }

  const removeCartItem = (title) => {
    setCartItems((items) => items.filter((item) => item.title !== title))
  }

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeCartItem, cartItemCount }}
    >
      {children}
    </CartContext.Provider>
  )
}


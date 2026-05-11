import { useContext } from 'react'
import { CartContext } from '../context/CartContextValue'

export function useCart() {
  return useContext(CartContext)
}

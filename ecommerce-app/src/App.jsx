import { HashRouter } from 'react-router-dom'
import './App.css'
import { CartProvider } from './context/CartProvider'
import StoreLayout from './layouts/StoreLayout'

function App() {
  return (
    <HashRouter>
      <CartProvider>
        <StoreLayout />
      </CartProvider>
    </HashRouter>
  )
}

export default App

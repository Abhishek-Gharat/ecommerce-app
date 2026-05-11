import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import Cart from '../components/cart/Cart'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import StoreNavbar from '../components/layout/StoreNavbar'
import AboutPage from '../pages/AboutPage'
import HomePage from '../pages/HomePage'
import MoviesPage from '../pages/MoviesPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import StorePage from '../pages/StorePage'
import ContactPage from '../pages/ContactPage'

function StoreLayout() {
  const [showCart, setShowCart] = useState(false)

  return (
    <div className="store-page">
      <StoreNavbar onCartOpen={() => setShowCart(true)} />
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/store/:productId" element={<ProductDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />

      <Modal show={showCart} onHide={() => setShowCart(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Cart />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default StoreLayout

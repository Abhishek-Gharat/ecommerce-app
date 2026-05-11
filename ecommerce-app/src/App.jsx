import { createContext, useContext, useState } from 'react'
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Nav,
  Navbar,
  Row,
  Table,
} from 'react-bootstrap'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

const tours = [
  {
    date: 'JUL 16',
    city: 'DETROIT, MI',
    venue: 'DTE ENERGY MUSIC THEATRE',
  },
  {
    date: 'JUL 19',
    city: 'TORONTO, ON',
    venue: 'BUDWEISER STAGE',
  },
  {
    date: 'JUL 22',
    city: 'BRISTOW, VA',
    venue: 'JIGGY LUBE LIVE',
  },
  {
    date: 'JUL 29',
    city: 'PHOENIX, AZ',
    venue: 'AK-CHIN PAVILION',
  },
  {
    date: 'AUG 2',
    city: 'LAS VEGAS, NV',
    venue: 'T-MOBILE ARENA',
  },
  {
    date: 'AUG 7',
    city: 'CONCORD, CA',
    venue: 'CONCORD PAVILION',
  },
]

const productsArr = [
  {
    title: 'Colors',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
  },
  {
    title: 'Black and white Colors',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
  },
  {
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
  },
  {
    title: 'Blue Color',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
  },
]

const cartElements = [
  {
    title: 'Colors',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    quantity: 2,
  },
  {
    title: 'Black and white Colors',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    quantity: 3,
  },
  {
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    quantity: 1,
  },
]

const CartContext = createContext()

function CartProvider({ children }) {
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

function useCart() {
  return useContext(CartContext)
}

function Cart() {
  const { cartItems, removeCartItem } = useCart()

  return (
    <section className="cart-section">
      <Table responsive hover className="align-middle cart-table mb-0">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.title}>
              <td>
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="cart-image"
                  />
                  <span className="fw-semibold">{item.title}</span>
                </div>
              </td>
              <td>Rs {item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeCartItem(item.title)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  )
}

function ProductList() {
  const { addToCart } = useCart()

  return (
    <Row className="g-4">
      {productsArr.map((product) => (
        <Col sm={6} lg={3} key={product.title}>
          <Card className="product-card h-100">
            <Card.Img
              variant="top"
              src={product.imageUrl}
              alt={product.title}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-center mb-3">
                {product.title}
              </Card.Title>
              <div className="d-flex align-items-center justify-content-between mt-auto">
                <span className="fw-semibold">Rs {product.price}</span>
                <Button
                  variant="info"
                  className="text-white"
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

function HomePage() {
  return (
    <Container className="home-content py-5">
      <h1 className="section-title text-center mb-4">Tours</h1>
      <div className="tour-list">
        {tours.map((tour) => (
          <div className="tour-row" key={`${tour.date}-${tour.city}`}>
            <span className="tour-date">{tour.date}</span>
            <span className="tour-city">{tour.city}</span>
            <span className="tour-venue">{tour.venue}</span>
            <Button className="tour-button">Buy Tickets</Button>
          </div>
        ))}
      </div>
    </Container>
  )
}

function StorePage() {
  return (
    <Container className="py-5">
      <h1 className="section-title text-center mb-5">Music</h1>
      <ProductList />
    </Container>
  )
}

function AboutPage() {
  return (
    <Container className="py-5 about-page">
      <h1 className="section-title text-center mb-4">About Us</h1>
      <p className="lead text-center mx-auto">
        This store is built for music lovers who enjoy colorful album art,
        simple shopping, and clean collections.
      </p>
      <p className="text-center mx-auto">
        Browse the products, add your favorite albums to the cart, and manage
        the cart from the button at the top right.
      </p>
    </Container>
  )
}

function StoreLayout() {
  const [showCart, setShowCart] = useState(false)
  const { cartItemCount } = useCart()

  return (
    <div className="store-page">
      <Navbar bg="dark" variant="dark" className="store-navbar" expand="md">
        <Container>
          <Navbar.Brand>The Generics</Navbar.Brand>
          <Navbar.Toggle aria-controls="store-navbar-nav" />
          <Navbar.Collapse id="store-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/store" className="nav-link">
              Store
            </NavLink>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
          </Nav>
          <Button variant="light" onClick={() => setShowCart(true)}>
            Cart <Badge bg="danger">{cartItemCount}</Badge>
          </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <header className="site-hero">
        <h1>The Generics</h1>
        <Button className="album-button">Get Our Latest Album</Button>
        <button className="play-button" aria-label="Play featured music">
          Play
        </button>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>

      <footer className="site-footer">
        <Container className="footer-content">
          <h2>The Generics</h2>
          <div className="footer-links">
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a href="https://open.spotify.com/" target="_blank" rel="noreferrer">
              Spotify
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>
        </Container>
      </footer>

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

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <StoreLayout />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App

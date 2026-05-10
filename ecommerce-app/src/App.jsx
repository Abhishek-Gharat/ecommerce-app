import { createContext, useContext, useState } from 'react'
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Navbar,
  Row,
  Table,
} from 'react-bootstrap'
import './App.css'

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

function Store() {
  const [showCart, setShowCart] = useState(false)
  const { cartItemCount } = useCart()

  return (
    <div className="store-page">
      <Navbar bg="dark" variant="dark" className="store-navbar">
        <Container>
          <Navbar.Brand>Music</Navbar.Brand>
          <Button variant="light" onClick={() => setShowCart(true)}>
            Cart <Badge bg="danger">{cartItemCount}</Badge>
          </Button>
        </Container>
      </Navbar>

      <Container className="py-5">
        <h1 className="store-title text-center mb-5">Music</h1>

        <ProductList />
      </Container>

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
    <CartProvider>
      <Store />
    </CartProvider>
  )
}

export default App

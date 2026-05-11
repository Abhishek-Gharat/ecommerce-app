import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

function StoreNavbar({ onCartOpen }) {
  const { cartItemCount } = useCart()

  return (
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
            <NavLink to="/movies" className="nav-link">
              Movies
            </NavLink>
          </Nav>
          <Button variant="light" onClick={onCartOpen}>
            Cart <Badge bg="danger">{cartItemCount}</Badge>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default StoreNavbar

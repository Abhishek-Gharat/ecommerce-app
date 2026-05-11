import { Button, Card, Col, Row } from 'react-bootstrap'
import { productsArr } from '../../data/products'
import { useCart } from '../../hooks/useCart'

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

export default ProductList

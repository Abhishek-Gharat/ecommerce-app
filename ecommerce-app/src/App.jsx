import {
  Button,
  Card,
  Col,
  Container,
  Row,
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

function App() {
  return (
    <div className="store-page">
      <Container className="py-5">
        <h1 className="store-title text-center mb-5">Music</h1>

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
                    <Button variant="info" className="text-white">
                      Add To Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default App

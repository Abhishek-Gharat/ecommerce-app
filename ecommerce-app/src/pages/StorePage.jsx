import { Container } from 'react-bootstrap'
import ProductList from '../components/products/ProductList'

function StorePage() {
  return (
    <Container className="py-5">
      <h1 className="section-title text-center mb-5">Music</h1>
      <ProductList />
    </Container>
  )
}

export default StorePage


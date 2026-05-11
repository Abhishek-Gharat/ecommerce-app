import { Container } from 'react-bootstrap'

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

export default AboutPage


import { useMemo, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { productsArr } from '../data/products'
import { useCart } from '../hooks/useCart'

function ProductDetailPage() {
  const { productId } = useParams()
  const { addToCart } = useCart()
  const product = useMemo(
    () => productsArr.find((item) => item.id === productId),
    [productId],
  )
  const [selectedImage, setSelectedImage] = useState(product?.imageUrl)

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h1 className="section-title mb-3">Product Not Found</h1>
        <Button as={Link} to="/store" variant="dark">
          Back To Store
        </Button>
      </Container>
    )
  }

  const activeImage = selectedImage || product.imageUrl

  return (
    <Container className="py-5 product-detail-page">
      <Button as={Link} to="/store" variant="outline-dark" className="mb-4">
        Back To Store
      </Button>

      <Row className="g-5 align-items-start">
        <Col lg={6}>
          <div className="product-main-image-wrap">
            <img
              src={activeImage}
              alt={product.title}
              className="product-main-image"
            />
          </div>

          <div className="product-thumbnails">
            {product.images.map((image) => (
              <button
                type="button"
                className={`product-thumbnail ${
                  image === activeImage ? 'active' : ''
                }`}
                onClick={() => setSelectedImage(image)}
                key={image}
              >
                <img src={image} alt={`${product.title} view`} />
              </button>
            ))}
          </div>
        </Col>

        <Col lg={6}>
          <h1 className="section-title mb-3">{product.title}</h1>
          <p className="product-detail-price">Rs {product.price}</p>
          <p className="product-detail-copy">
            View different images, zoom the album art, and read customer
            reviews before adding this product to your cart.
          </p>

          <Button
            variant="info"
            className="text-white mb-5"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </Button>

          <section>
            <h2 className="product-detail-subtitle">Reviews</h2>
            <div className="product-reviews">
              {product.reviews.map((review) => (
                <article className="product-review" key={review.name}>
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <h3>{review.name}</h3>
                    <span>Rating {review.rating}/5</span>
                  </div>
                  <p>{review.comment}</p>
                </article>
              ))}
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetailPage

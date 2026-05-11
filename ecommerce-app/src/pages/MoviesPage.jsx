import { useEffect, useRef, useState } from 'react'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'

function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isRetrying, setIsRetrying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const retryTimeoutRef = useRef(null)
  const shouldRetryRef = useRef(true)

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      setError('')
      setMovies([])

      try {
        const response = await fetch('https://swapi.info/api/films')

        if (!response.ok) {
          throw new Error('Could not fetch movies')
        }

        const data = await response.json()
        setMovies(data)
        setIsRetrying(false)
      } catch {
        setError('Something went wrong ....Retrying')
        setIsRetrying(true)

        if (shouldRetryRef.current) {
          retryTimeoutRef.current = setTimeout(() => {
            setRetryCount((count) => count + 1)
          }, 5000)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()

    return () => {
      clearTimeout(retryTimeoutRef.current)
    }
  }, [retryCount])

  const cancelRetrying = () => {
    shouldRetryRef.current = false
    clearTimeout(retryTimeoutRef.current)
    setIsRetrying(false)
    setIsLoading(false)
    setError('Retrying cancelled')
  }

  return (
    <Container className="py-5 movies-page">
      <h1 className="section-title text-center mb-4">Movies</h1>

      {isLoading && <p className="text-center">Loading movies...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      {isRetrying && (
        <div className="text-center mb-4">
          <Button variant="danger" onClick={cancelRetrying}>
            Cancel Retrying
          </Button>
        </div>
      )}

      {!isLoading && !error && (
        <Row className="g-4">
          {movies.map((movie) => (
            <Col md={6} lg={4} key={movie.episode_id}>
              <Card className="movie-card h-100">
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Subtitle className="mb-3 text-muted">
                    Episode {movie.episode_id}
                  </Card.Subtitle>
                  <Card.Text>{movie.opening_crawl}</Card.Text>
                  <Badge bg="info" text="dark">
                    Released {movie.release_date}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default MoviesPage

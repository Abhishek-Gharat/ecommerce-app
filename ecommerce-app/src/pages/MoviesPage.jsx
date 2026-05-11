import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Badge, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

const initialMovieForm = {
  title: '',
  openingText: '',
  releaseDate: '',
}

function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [movieForm, setMovieForm] = useState(initialMovieForm)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isRetrying, setIsRetrying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const retryTimeoutRef = useRef(null)
  const shouldRetryRef = useRef(true)

  const fetchMovies = useCallback(async () => {
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
      if (!shouldRetryRef.current) {
        setError('Retrying cancelled')
        setIsRetrying(false)
        return
      }

      setError('Something went wrong ....Retrying')
      setIsRetrying(true)

      retryTimeoutRef.current = setTimeout(() => {
        setRetryCount((count) => count + 1)
      }, 5000)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const fetchTimeout = setTimeout(fetchMovies, 0)

    return () => {
      clearTimeout(fetchTimeout)
      clearTimeout(retryTimeoutRef.current)
    }
  }, [fetchMovies, retryCount])

  const cancelRetrying = useCallback(() => {
    shouldRetryRef.current = false
    clearTimeout(retryTimeoutRef.current)
    setIsRetrying(false)
    setIsLoading(false)
    setError('Retrying cancelled')
  }, [])

  const handleMovieInputChange = useCallback((event) => {
    const { name, value } = event.target

    setMovieForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }, [])

  const handleAddMovie = useCallback(
    (event) => {
      event.preventDefault()

      const NewMovieObj = {
        title: movieForm.title,
        openingText: movieForm.openingText,
        releaseDate: movieForm.releaseDate,
      }

      console.log(NewMovieObj)
      setMovieForm(initialMovieForm)
    },
    [movieForm],
  )

  const movieCards = useMemo(
    () =>
      movies.map((movie) => (
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
      )),
    [movies],
  )

  return (
    <Container className="py-5 movies-page">
      <h1 className="section-title text-center mb-4">Movies</h1>

      <Card className="add-movie-card mx-auto mb-5">
        <Card.Body>
          <Form onSubmit={handleAddMovie}>
            <Form.Group className="mb-3" controlId="movie-title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={movieForm.title}
                onChange={handleMovieInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="movie-opening-text">
              <Form.Label>Opening Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="openingText"
                value={movieForm.openingText}
                onChange={handleMovieInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="movie-release-date">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="date"
                name="releaseDate"
                value={movieForm.releaseDate}
                onChange={handleMovieInputChange}
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant="primary">
                Add Movie
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

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
        <Row className="g-4">{movieCards}</Row>
      )}
    </Container>
  )
}

export default MoviesPage

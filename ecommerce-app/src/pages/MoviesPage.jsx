import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

const initialMovieForm = {
  title: '',
  openingText: '',
  releaseDate: '',
}

const MOVIES_API_URL =
  import.meta.env.VITE_MOVIES_DATABASE_URL ||
  'https://react-http-6b4a6-default-rtdb.firebaseio.com/movies.json'

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
      const response = await fetch(MOVIES_API_URL)

      if (!response.ok) {
        throw new Error('Could not fetch movies')
      }

      const data = await response.json()
      const loadedMovies = []

      for (const key in data || {}) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }

      setMovies(loadedMovies)
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
    async (event) => {
      event.preventDefault()

      const NewMovieObj = {
        title: movieForm.title,
        openingText: movieForm.openingText,
        releaseDate: movieForm.releaseDate,
      }

      try {
        const response = await fetch(MOVIES_API_URL, {
          method: 'POST',
          body: JSON.stringify(NewMovieObj),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Could not add movie')
        }

        const data = await response.json()

        setMovies((currentMovies) => [
          ...currentMovies,
          {
            id: data.name,
            ...NewMovieObj,
          },
        ])
        setMovieForm(initialMovieForm)
        setError('')
      } catch {
        setError('Could not add movie')
      }
    },
    [movieForm],
  )

  const handleDeleteMovie = useCallback(async (movieId) => {
    try {
      const deleteUrl = MOVIES_API_URL.replace('.json', `/${movieId}.json`)
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Could not delete movie')
      }

      setMovies((currentMovies) =>
        currentMovies.filter((movie) => movie.id !== movieId),
      )
      setError('')
    } catch {
      setError('Could not delete movie')
    }
  }, [])

  const movieCards = useMemo(
    () =>
      movies.map((movie) => (
        <Col md={6} lg={4} key={movie.id}>
          <Card className="movie-card h-100">
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                Released {movie.releaseDate}
              </Card.Subtitle>
              <Card.Text>{movie.openingText}</Card.Text>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteMovie(movie.id)}
              >
                Delete Movie
              </Button>
            </Card.Body>
          </Card>
        </Col>
      )),
    [handleDeleteMovie, movies],
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

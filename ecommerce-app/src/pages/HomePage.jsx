import { Button, Container } from 'react-bootstrap'
import { tours } from '../data/tours'

function HomePage() {
  return (
    <Container className="home-content py-5">
      <h1 className="section-title text-center mb-4">Tours</h1>
      <div className="tour-list">
        {tours.map((tour) => (
          <div className="tour-row" key={`${tour.date}-${tour.city}`}>
            <span className="tour-date">{tour.date}</span>
            <span className="tour-city">{tour.city}</span>
            <span className="tour-venue">{tour.venue}</span>
            <Button className="tour-button">Buy Tickets</Button>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default HomePage


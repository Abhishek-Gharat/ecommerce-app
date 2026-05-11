import { Button } from 'react-bootstrap'

function Header() {
  return (
    <header className="site-hero">
      <h1>The Generics</h1>
      <Button className="album-button">Get Our Latest Album</Button>
      <button className="play-button" aria-label="Play featured music">
        Play
      </button>
    </header>
  )
}

export default Header


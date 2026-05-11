import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="site-footer">
      <Container className="footer-content">
        <h2>The Generics</h2>
        <div className="footer-links">
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
            YouTube
          </a>
          <a href="https://open.spotify.com/" target="_blank" rel="noreferrer">
            Spotify
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            Facebook
          </a>
        </div>
      </Container>
    </footer>
  )
}

export default Footer


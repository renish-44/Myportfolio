import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="page-container not-found">
      <h2>404 — Page not found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="nav-link">Go back home</Link>
    </main>
  )
}

export default NotFound

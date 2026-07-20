import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="site-nav">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/projects" className="nav-link">Projects</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
    </nav>
  )
}

export default NavBar

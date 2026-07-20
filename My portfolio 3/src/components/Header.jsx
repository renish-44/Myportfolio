function Header({ name, themeColor }) {
  return (
    <header className="site-header">
      <nav className="nav">
        <div className="brand">{name}</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div className="hero">
        <div className="hero-copy">
          <h1 className="hero-title">{name}</h1>
          <h3 className="hero-sub">AI & ML Developer · Backend & Systems</h3>
          <p className="hero-lead">I build intelligent systems and production-ready APIs integrating ML models and modern backends.</p>
          <div className="hero-ctas">
            <a className="btn primary" href="#projects">Let's Talk</a>
            <a className="btn ghost" href="#about">Learn More</a>
          </div>
        </div>
        <div className="hero-visual">
          <img src="/assets/profile.jpg" alt="profile visual" onError={(e)=>{e.target.onerror=null; e.target.src='/assets/avatar.svg'}} />
        </div>
      </div>
    </header>
  )
}

export default Header

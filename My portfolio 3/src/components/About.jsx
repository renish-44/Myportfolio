function About({ bio }) {
  return (
    <section id="about" className="about-section">
      <div className="about-grid">
        <div className="about-visual">
          <img src="/assets/profile.jpg" alt="profile" onError={(e)=>{e.target.onerror=null; e.target.src='/assets/avatar.svg'}} />
        </div>
        <div className="about-copy">
          <h2>AI Developer, Data Storyteller</h2>
          <p>{bio}</p>

          <div className="about-cards">
            <div className="info-card">
              <strong>Location</strong>
              <span>India, IN</span>
            </div>
            <div className="info-card">
              <strong>Studies</strong>
              <span>B.Tech AIML</span>
            </div>
            <div className="info-card">
              <strong>Available</strong>
              <span>Open to Work</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

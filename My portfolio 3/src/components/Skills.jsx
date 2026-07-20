function SkillCard({ name, level }) {
  const key = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const src = `/assets/skills/${key}.svg`

  return (
    <div className="skill-card">
      <img className="skill-icon" src={src} alt={`${name} icon`} onError={(e)=>{e.target.style.display='none'}} />
      <div className="skill-body">
        <strong>{name}</strong>
        <span className="level">{level}</span>
      </div>
    </div>
  )
}

function Skills({ skillList }) {
  return (
    <section id="skills" className="skills-section">
      <h2>My Skills & Expertise</h2>
      <p className="skills-lead">From training ML models and building pipelines to deploying APIs — here is my toolkit.</p>

      <div className="skills-grid">
        {skillList.map((s) => (
          <SkillCard key={s.name} name={s.name} level={s.level} />
        ))}
      </div>
    </section>
  )
}

export default Skills

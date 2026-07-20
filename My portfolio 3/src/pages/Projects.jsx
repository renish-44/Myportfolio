function Projects() {
  const projects = [
    { title: 'BAJA RuleBot', description: 'AI chatbot for BAJA SAEINDIA rulebook querying.' },
    { title: 'Plant Disease Detection', description: 'Deep learning model to identify plant diseases from leaf images.' },
    { title: 'Smart Attendance System', description: 'Face recognition attendance system for classroom automation.' },
  ]

  return (
    <main className="page-container">
      <h2>Projects</h2>
      <div className="project-list">
        {projects.map((project) => (
          <article key={project.title} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Projects

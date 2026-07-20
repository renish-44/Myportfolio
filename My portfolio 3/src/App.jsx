import Header from './components/Header'
import About from './components/About'
import Skills from './components/Skills'
import Footer from './components/Footer'
import './App.css'

function App() {
  const name = 'Patel Renish Nathubhai'
  const bio = 'I am a B.Tech AIML student at CHARUSAT, passionate about AI/ML, backend development, and building practical solutions.'
  const skillList = [
    { name: 'Python', level: 'Expert' },
    { name: 'Machine Learning', level: 'Advanced' },
    { name: 'Deep Learning', level: 'Advanced' },
    { name: 'scikit-learn', level: 'Advanced' },
    { name: 'Pandas / NumPy', level: 'Expert' },
    { name: 'FastAPI', level: 'Advanced' },
    { name: 'SQL', level: 'Advanced' },
    { name: 'REST APIs', level: 'Advanced' },
  ]
  const contact = 'Email: 24aiml044@charusat.edu.in'

  return (
    <div className="portfolio-app">
      <Header name={name} themeColor="#0f172a" />
      <About bio={bio} />
      <Skills skillList={skillList} />
      <Footer contact={contact} />
    </div>
  )
}

export default App

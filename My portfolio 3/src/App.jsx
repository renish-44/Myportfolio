import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
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
    <div className="app-shell">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home name={name} bio={bio} skillList={skillList} contact={contact} />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App

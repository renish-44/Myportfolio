import Header from '../components/Header'
import About from '../components/About'
import Skills from '../components/Skills'
import Footer from '../components/Footer'

function Home({ name, bio, skillList, contact }) {
  return (
    <div className="portfolio-app">
      <Header name={name} />
      <About bio={bio} />
      <Skills skillList={skillList} />
      <Footer contact={contact} />
    </div>
  )
}

export default Home

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Members from './components/Members'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import './App.css'

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="divider" />
      <Members />
      <div className="divider" />
      <Skills />
      <div className="divider" />
      <Experience />
      <div className="divider" />
      <Projects />
      <div className="divider" />
      <Contact />
    </div>
  )
}

export default App

import SmoothScroll from './components/SmoothScroll'
import ScrollProgress from './components/ScrollProgress'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-x-clip">
        <Background />
        <ScrollProgress />
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>

        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  )
}

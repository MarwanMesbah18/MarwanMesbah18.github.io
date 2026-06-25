import SmoothScroll from './components/SmoothScroll'
import ScrollProgress from './components/ScrollProgress'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
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
          <Projects />
          <Skills />
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

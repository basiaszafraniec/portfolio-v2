import Nav from './components/Nav'
import Hero from './components/Hero'
import IntroLines from './components/IntroLines'
import WorkSection from './components/WorkSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'
import FloatingPlayer from './components/FloatingPlayer'
import './App.css'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <IntroLines />
        <WorkSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <FloatingPlayer />
    </>
  )
}

export default App

import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ScrollMarquee from './components/ScrollMarquee'
import WorkSection from './components/WorkSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'
import FloatingPlayer from './components/FloatingPlayer'
import Cursor from './components/Cursor'
import './App.css'

function App() {
  useLenis()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ScrollMarquee />
        <WorkSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <FloatingPlayer />
      <Cursor />
    </>
  )
}

export default App

import TerminalHero from './components/TerminalHero/TerminalHero.jsx'
import About from './components/About/About.jsx'
import Projects from './components/Projects/Projects.jsx'
import ContactForm from './components/ContactForm/ContactForm.jsx'
import Footer from './components/Footer/Footer.jsx'

function App() {
  return (
    <div className="wrap">
      <main>
        <TerminalHero />
        <About />
        <Projects />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

export default App

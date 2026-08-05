import { useEffect, useState } from 'react'
import styles from './TerminalHero.module.css'

const TYPED_LINE =
  'Desenvolvedor Back-end .NET | Líder de dev no LearningLab | Ciência da Computação — UFC.'

const COMMANDS = [
  { id: 'sobre', label: 'cd ./sobre' },
  { id: 'projetos', label: 'ls ./projetos' },
  { id: 'contato', label: 'cat contato.md' },
]

function TerminalHero() {
  const [output, setOutput] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOutput(TYPED_LINE)
      setDone(true)
      return
    }

    let i = 0
    const timer = setInterval(() => {
      i += 1
      setOutput(TYPED_LINE.slice(0, i))
      if (i >= TYPED_LINE.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, 28)
    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView()
  }

  return (
    <section className={styles.hero}>
      <div className={styles.term}>
        <div className={styles.termBar}>
          <span className={styles.termDot} />
          <span className={styles.termDot} />
          <span className={styles.termDot} />
          <span className={styles.termTitle}>visitante@portfolio: ~</span>
        </div>
        <div className={styles.termBody}>
          <div className={styles.line}>
            <span className={styles.prompt}>$</span> whoami
            {!done && <span className={styles.cursor} />}
          </div>
          <p className={styles.output} aria-live="polite">
            {output}
            {done && <span className={styles.cursor} />}
          </p>
          <nav className={styles.commands} aria-label="Navegação principal">
            <div className={styles.hint}>comandos disponíveis:</div>
            {COMMANDS.map((cmd) => (
              <button
                key={cmd.id}
                type="button"
                className={styles.cmdBtn}
                onClick={() => scrollToSection(cmd.id)}
              >
                <span className={styles.prompt}>$</span> {cmd.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}

export default TerminalHero

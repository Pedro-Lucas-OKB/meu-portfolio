import { useEffect, useState } from 'react'
import styles from './TerminalHero.module.css'

const TYPED_NAME = 'Pedro Lucas'
const ROLE = 'Desenvolvedor Back-end .NET'

const COMMANDS = [
  { id: 'sobre', label: 'cd ./sobre' },
  { id: 'skills', label: 'ls ./skills' },
  { id: 'experiencias', label: 'git log ./experiencias' },
  { id: 'projetos', label: 'ls ./projetos' },
  { id: 'contato', label: 'cat contato.md' },
]

function TerminalHero() {
  const [output, setOutput] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOutput(TYPED_NAME)
      setDone(true)
      return
    }

    let i = 0
    const timer = setInterval(() => {
      i += 1
      setOutput(TYPED_NAME.slice(0, i))
      if (i >= TYPED_NAME.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, 80)
    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView()
  }

  return (
    <section id="terminal" className={styles.hero}>
      <div className={styles.term}>
        <div className={styles.termBar}>
          <span className={styles.termDot} />
          <span className={styles.termDot} />
          <span className={styles.termDot} />
          <span className={styles.termTitle}>pedro-lucas@portfolio: ~</span>
        </div>
        <div className={styles.termBody}>
          <div className={styles.line}>
            <span className={styles.prompt}>$</span> whoami
            {!done && <span className={styles.cursor} />}
          </div>
          <div aria-live="polite">
            <p className={styles.output}>
              {output}
              {done && <span className={styles.cursor} />}
            </p>
            {done && <p className={styles.role}>{ROLE}</p>}
          </div>
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

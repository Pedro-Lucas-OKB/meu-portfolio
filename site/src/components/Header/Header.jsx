import { useEffect, useRef, useState } from 'react'
import styles from './Header.module.css'

const NAV_LINKS = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'skills', label: 'Skills' },
  { id: 'experiencias', label: 'Experiências' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)

  const close = () => {
    setMenuOpen(false)
    toggleRef.current?.focus()
  }

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header id="top" className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#terminal">
          pedro-lucas@portfolio: ~
        </a>
        <button
          type="button"
          ref={toggleRef}
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls="header-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.toggleIcon} aria-hidden="true" />
          <span>{menuOpen ? 'fechar' : 'menu'}</span>
        </button>
        <nav
          id="header-nav"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header

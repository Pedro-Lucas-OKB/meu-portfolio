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
  const [activeId, setActiveId] = useState(null)
  const toggleRef = useRef(null)
  const headerRef = useRef(null)

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

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id))
    const scrollMargin = sections.reduce((max, section) => {
      if (!section) return max
      return Math.max(max, parseFloat(getComputedStyle(section).scrollMarginTop) || 0)
    }, 0)

    const update = () => {
      const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0
      const threshold = (scrollMargin > 0 ? scrollMargin : headerHeight) + 2
      let current = null
      for (const section of sections) {
        if (section && section.getBoundingClientRect().top <= threshold) {
          current = section.id
        } else {
          break
        }
      }
      setActiveId((prev) => (prev === current ? prev : current))
    }

    update()
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        update()
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header id="top" ref={headerRef} className={styles.header}>
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
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={link.id === activeId ? 'true' : undefined}
              className={link.id === activeId ? styles.active : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header

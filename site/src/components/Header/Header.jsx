import styles from './Header.module.css'

const NAV_LINKS = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'skills', label: 'Skills' },
  { id: 'experiencias', label: 'Experiências' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
]

function Header() {
  return (
    <header id="top" className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top">
          pedro-lucas@portfolio: ~
        </a>
        <nav className={styles.nav} aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header

import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© 2026 Pedro Lucas</span>
      <span>
        <a href="https://github.com/pedro-lucas-okb" target="_blank" rel="noopener">
          github
        </a>{' '}
        ·{' '}
        <a href="https://linkedin.com/in/pedrolucas-dev" target="_blank" rel="noopener">
          linkedin
        </a>
      </span>
    </footer>
  )
}

export default Footer

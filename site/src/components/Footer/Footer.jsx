import styles from './Footer.module.css'
import { GithubIcon, LinkedinIcon } from '../Icons/Icons.jsx'

function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© 2026 Pedro Lucas</span>
      <span className={styles.links}>
        <a href="https://github.com/pedro-lucas-okb" target="_blank" rel="noopener">
          <GithubIcon className={styles.linkIcon} />
          github
        </a>
        <span className={styles.sep}>·</span>
        <a href="https://linkedin.com/in/pedrolucas-dev" target="_blank" rel="noopener">
          <LinkedinIcon className={styles.linkIcon} />
          linkedin
        </a>
      </span>
    </footer>
  )
}

export default Footer

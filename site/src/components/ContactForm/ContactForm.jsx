import { useState } from 'react'
import styles from './ContactForm.module.css'

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contato" className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.prompt}>$</span>
        <h2>cat contato.md</h2>
      </div>
      <p className={styles.contactHint}>contato direto:</p>
      <div className={styles.contacts}>
        <div className={styles.contactRow}>
          <span className={styles.contactLabel}>email</span>
          <a href="mailto:pedrolucasep5100@gmail.com">pedrolucasep5100@gmail.com</a>
        </div>
        <div className={styles.contactRow}>
          <span className={styles.contactLabel}>github</span>
          <a href="https://github.com/pedro-lucas-okb" target="_blank" rel="noopener">
            github.com/pedro-lucas-okb
          </a>
        </div>
        <div className={styles.contactRow}>
          <span className={styles.contactLabel}>linkedin</span>
          <a href="https://linkedin.com/in/pedrolucas-dev" target="_blank" rel="noopener">
            linkedin.com/in/pedrolucas-dev
          </a>
        </div>
      </div>
      <p className={styles.formHint}>ou envie uma mensagem por aqui:</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">nome</label>
          <input id="nome" name="nome" type="text" required />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="mensagem">mensagem</label>
          <textarea id="mensagem" name="mensagem" required />
        </div>
        <button className={styles.sendBtn} type="submit">
          $ send --to=pedrolucasep5100@gmail.com
        </button>
        <p className={styles.formNote}>
          {submitted
            ? 'Mensagem recebida. O envio real chega na próxima etapa, com AWS Lambda + SES.'
            : 'este formulário ainda é só visual. Vamos ligá-lo a uma função Lambda na próxima etapa.'}
        </p>
      </form>
    </section>
  )
}

export default ContactForm

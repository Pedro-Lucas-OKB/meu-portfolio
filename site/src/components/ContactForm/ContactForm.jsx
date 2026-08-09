import { useState } from 'react'
import SectionTitle from '../SectionTitle/SectionTitle.jsx'
import styles from './ContactForm.module.css'
import { MailIcon, LinkedinIcon, GithubIcon } from '../Icons/Icons.jsx'

const API_URL = import.meta.env.VITE_CONTACT_API_URL

const MAX_NAME = 120
const MAX_EMAIL = 254
const MAX_MESSAGE = 5000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(field, value, max) {
  const trimmed = value.trim()
  if (!trimmed) return `${field} é obrigatório`
  if (trimmed.length > max) return `${field} deve ter no máximo ${max} caracteres`
  return null
}

function validate(payload) {
  const errors = []
  const nomeError = validateField('nome', payload.nome, MAX_NAME)
  if (nomeError) errors.push(nomeError)

  const emailError = validateField('email', payload.email, MAX_EMAIL)
  if (!emailError && !EMAIL_RE.test(payload.email.trim())) {
    errors.push('email inválido')
  }

  const mensagemError = validateField('mensagem', payload.mensagem, MAX_MESSAGE)
  if (mensagemError) errors.push(mensagemError)

  return errors
}

function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = async (event) => {    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const payload = {
      nome: data.get('nome'),
      email: data.get('email'),
      mensagem: data.get('mensagem'),
      website: data.get('website'),
    }

    if (payload.website) {
      setStatus('success')
      setMessage('Mensagem recebida. Obrigado!')
      form.reset()
      return
    }

    const clientErrors = validate(payload)
    if (clientErrors.length > 0) {
      setStatus('error')
      setErrors(clientErrors)
      setMessage('')
      return
    }

    // Sem API configurada (ex: dev local), abre o cliente de e-mail do usuário.
    if (!API_URL) {
      const subject = encodeURIComponent(`Contato do portfólio: ${payload.nome}`)
      const body = encodeURIComponent(`${payload.mensagem}\n\n${payload.email}`)
      window.location.href = `mailto:pedrolucasep5100@gmail.com?subject=${subject}&body=${body}`
      return
    }

    setStatus('loading')
    setMessage('')
    setErrors([])

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const dataJson = await res.json().catch(() => null)

      if (res.ok) {
        setStatus('success')
        setMessage(dataJson?.message ?? 'Mensagem recebida. Obrigado!')
        form.reset()
        return
      }

      if (res.status === 400) {
        const serverErrors = dataJson?.errors ?? []
        setStatus('error')
        setErrors(Array.isArray(serverErrors) ? serverErrors : ['dados inválidos'])
        setMessage('')
        return
      }

      setStatus('error')
      setErrors([])
      setMessage(dataJson?.message ?? 'Algo deu errado. Tente novamente em instantes.')
    } catch {
      setStatus('error')
      setErrors([])
      setMessage('Não foi possível enviar. Tente novamente em instantes.')
    }
  }

  const disabled = status === 'loading'

  return (
    <section id="contato" className={styles.section}>
      <SectionTitle command="cat contato.md" />
      <p className={styles.contactHint}>contato direto:</p>
      <div className={styles.contacts}>
        <div className={styles.contactRow}>
          <span className={styles.contactLabel}>
            <MailIcon className={styles.contactIcon} />
            email
          </span>
          <a href="mailto:pedrolucasep5100@gmail.com">pedrolucasep5100@gmail.com</a>
        </div>
        <div className={styles.contactRow}>
          <span className={styles.contactLabel}>
            <LinkedinIcon className={styles.contactIcon} />
            linkedin
          </span>
          <a href="https://linkedin.com/in/pedrolucas-dev" target="_blank" rel="noopener">
            linkedin.com/in/pedrolucas-dev
          </a>
        </div>
        <div className={styles.contactRow}>
          <span className={styles.contactLabel}>
            <GithubIcon className={styles.contactIcon} />
            github
          </span>
          <a href="https://github.com/pedro-lucas-okb" target="_blank" rel="noopener">
            github.com/pedro-lucas-okb
          </a>
        </div>
      </div>
      <p className={styles.formHint}>ou envie uma mensagem por aqui:</p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="nome">nome</label>
          <input id="nome" name="nome" type="text" autoComplete="name" required />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <label htmlFor="mensagem">mensagem</label>
          <textarea id="mensagem" name="mensagem" required />
        </div>
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="website">website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <button className={styles.sendBtn} type="submit" disabled={disabled}>
          {disabled ? 'enviando...' : '$ send --to=pedrolucasep5100@gmail.com'}
        </button>
        <p
          className={`${styles.formNote} ${
            status === 'success' ? styles.isSuccess : status === 'error' ? styles.isError : ''
          }`}
          role="status"
          aria-live="polite"
        >
          {status === 'success' && message}
          {status === 'error' && errors.length > 0 && errors.join('. ')}
          {status === 'error' && errors.length === 0 && message}
          {status === 'idle' && 'mensagens são enviadas por e-mail via AWS Lambda + SES.'}
          {status === 'loading' && 'enviando...'}
        </p>
      </form>
    </section>
  )
}

export default ContactForm

import { useEffect, useRef, useState } from 'react'
import styles from './SectionTitle.module.css'

const TYPE_SPEED = 55

function SectionTitle({ command }) {
  const [typed, setTyped] = useState('')
  const [typing, setTyping] = useState(false)
  const ref = useRef(null)
  const done = typed.length >= command.length

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(command)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTyping(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [command])

  useEffect(() => {
    if (!typing) return
    let i = 0
    const timer = setInterval(() => {
      i += 1
      setTyped(command.slice(0, i))
      if (i >= command.length) clearInterval(timer)
    }, TYPE_SPEED)
    return () => clearInterval(timer)
  }, [typing, command])

  return (
    <div className={styles.head} ref={ref}>
      <span className={styles.prompt}>$</span>
      <h2 className={styles.title}>
        <span className={styles.srOnly}>{command}</span>
        <span aria-hidden="true">
          {typed}
          {!done && typing && <span className={styles.cursor} />}
        </span>
      </h2>
    </div>
  )
}

export default SectionTitle

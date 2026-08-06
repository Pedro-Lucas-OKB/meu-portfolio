import { useState } from 'react'
import styles from './Experience.module.css'

const COMMITS = [
  {
    hash: 'a91c2f4',
    ref: 'HEAD -> lideranca',
    role: 'Líder de Desenvolvimento',
    company: 'LearningLab',
    period: 'Mar 2026 - Atual',
    bullets: [
      'Gerenciei e priorizei tarefas no ClickUp, organizando o fluxo de trabalho de uma equipe de 5 devs.',
      'Conduzi revisões de código por pull requests, com média de 2 por semana.',
      'Promovi boas práticas de código e design: Clean Code e SOLID.',
    ],
    stats: ['+1 equipe de 5 devs', '+2 PRs/semana', '+Clean Code e SOLID'],
  },
  {
    hash: 'b32e8d1',
    ref: 'desenvolvimento',
    role: 'Desenvolvedor .NET Estagiário',
    company: 'LearningLab',
    period: 'Out 2025 - Atual',
    bullets: [
      'Padronizei o uso de arquivos .env em dev e produção, evitando exposição de dados sensíveis.',
      'Removi código legado obsoleto, com 82.000+ linhas eliminadas.',
      'Implementei salt aleatório no hashing de senhas, evitando hashes duplicadas.',
      'Adicionei rate limiting em 3 endpoints (IP e e-mail) contra ataques brute force.',
      'Escrevi testes unitários e de integração com xUnit e Postman.',
    ],
    stats: ['-82.000 linhas', '+3 endpoints', '+rate limiting', '+xUnit'],
  },
  {
    hash: 'c73f0b2',
    ref: '',
    role: 'Desenvolvedor Back-End .NET Estagiário',
    company: 'FASTEF e UFC',
    period: 'Mar 2024 - Set 2024',
    bullets: [
      'Contribuí em API de gestão de eventos com .NET, SQL Server e autenticação JWT.',
      'Participei de processo ágil com Scrum: dailies, sprints e retrospectivas.',
      'Implementei containerização com Docker para padronizar ambientes de desenvolvimento.',
    ],
    stats: ['+API de eventos', '+Scrum', '+Docker'],
  },
]

function railFor(index) {
  if (index === 0) {
    return (
      <>
        <span className={styles.node}>*</span>
        <span className={styles.vline} />
      </>
    )
  }
  if (index === 1) {
    return (
      <>
        <div className={styles.railRow}>
          <span className={styles.vchar}>|</span>
          <span className={styles.node}>*</span>
        </div>
        <div className={styles.railRow}>
          <span className={styles.vchar}>|</span>
          <span className={styles.join}>/</span>
        </div>
        <span className={styles.vline} />
      </>
    )
  }
  return <span className={styles.node}>*</span>
}

function Experience() {
  const [open, setOpen] = useState(COMMITS[0].hash)

  const toggle = (hash) => setOpen(open === hash ? null : hash)

  return (
    <section id="experiencias" className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.prompt}>$</span>
        <h2>git log --graph --all --decorate</h2>
      </div>
      <div className={styles.log}>
        {COMMITS.map((commit, index) => {
          const isOpen = open === commit.hash
          return (
            <article className={styles.commit} key={commit.hash}>
              <div className={styles.rail} aria-hidden="true">
                {railFor(index)}
              </div>
              <div className={styles.content}>
                <button
                  type="button"
                  className={styles.commitHead}
                  aria-expanded={isOpen}
                  aria-controls={`commit-${commit.hash}`}
                  onClick={() => toggle(commit.hash)}
                >
                  <span className={styles.hash}>{commit.hash}</span>{' '}
                  {commit.ref && <span className={styles.ref}>({commit.ref})</span>}
                  <span className={styles.role}>{commit.role}</span>{' '}
                  <span className={styles.company}>· {commit.company}</span>
                </button>
                {isOpen && (
                  <div id={`commit-${commit.hash}`} className={styles.details}>
                    <div className={styles.meta}>Date: {commit.period}</div>
                    <ul className={styles.bullets}>
                      {commit.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <div className={styles.stats}>
                      {commit.stats.map((stat) => (
                        <span
                          key={stat}
                          className={`${styles.stat} ${
                            stat.startsWith('-') ? styles.statMinus : styles.statPlus
                          }`}
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
      <div className={styles.end}>~ (END) ~</div>
    </section>
  )
}

export default Experience

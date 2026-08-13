import SectionTitle from '../SectionTitle/SectionTitle.jsx'
import styles from './About.module.css'

function About() {
  return (
    <section id="sobre" className={styles.section}>
      <SectionTitle command="cat sobre.md" />
      <p className={styles.body}>
        Sou desenvolvedor .NET com quase 2 anos de experiência construindo e
        mantendo APIs REST, hoje atuando como líder de desenvolvimento em um
        projeto com mais de 1300 usuários potenciais. Trabalho com Clean
        Architecture, DDD e boas práticas de segurança (de rate limiting a
        tratamento de concorrência).
      </p>
      <p className={styles.body}>
        Tenho formação em Ciência da Computação pela Universidade Federal do Ceará (UFC) e atualmente
        estou me aprofundando em AWS para levar meus próprios projetos do
        código até a nuvem, de ponta a ponta. Este site é parte desse
        processo.
      </p>
    </section>
  )
}

export default About

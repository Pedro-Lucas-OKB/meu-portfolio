import styles from './About.module.css'

function About() {
  return (
    <section id="sobre" className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.prompt}>$</span>
        <h2>cat sobre.md</h2>
      </div>
      <p className={styles.body}>
        Desenvolvedor .NET com quase 2 anos de experiência construindo e
        mantendo APIs REST, hoje atuando como líder de desenvolvimento em um
        projeto com mais de 1300 usuários potenciais. Trabalho com Clean
        Architecture, DDD e boas práticas de segurança (de rate limiting a 
        tratamento de concorrência). Concluí minha graduação em Ciência da Computação na
        UFC e atualmente estou me aprofundando em AWS para levar meus próprios projetos do
        código até a nuvem, de ponta a ponta. Este site é parte desse
        processo: escrito à mão, hospedado por mim.
      </p>
    </section>
  )
}

export default About

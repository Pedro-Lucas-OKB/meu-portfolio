import styles from './Projects.module.css'

const PROJECTS = [
  {
    name: 'ecommerce-order-processing/',
    description:
      'Microsserviços com processamento assíncrono via RabbitMQ, separando pedidos em workers de pagamento, estoque e notificação. API com ASP.NET Core Minimal APIs e EF Core + PostgreSQL. CI/CD com GitHub Actions.',
    tags: ['C#', 'RabbitMQ', 'PostgreSQL', 'Docker'],
    href: 'https://github.com/Pedro-Lucas-OKB/rabbitmq-ecommerce-order-processing',
  },
  {
    name: 'simplified-bank/',
    description:
      'API de transações financeiras com 13 endpoints em Clean Architecture. Row versioning no SQL Server pra resolver concorrência em transações simultâneas, JWT e senhas criptografadas.',
    tags: ['C#', '.NET', 'SQL Server', 'DDD'],
    href: 'https://github.com/Pedro-Lucas-OKB/simplified-bank',
  },
  {
    name: 'este-portfolio/',
    description:
      'Site estático hospedado na AWS (S3 + CloudFront), com formulário de contato via Lambda em C# e SES.',
    tags: ['HTML/CSS/JS', 'AWS'],
    href: 'https://github.com/Pedro-Lucas-OKB/meu-portifolio',
  },
]

function Projects() {
  return (
    <section id="projetos" className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.prompt}>$</span>
        <h2>ls -la ./projetos</h2>
      </div>
      <div className={styles.listing}>
        <div className={styles.listingHead}>
          <span>permissões</span>
          <span>arquivo</span>
        </div>
        {PROJECTS.map((project) => (
          <article className={styles.entry} key={project.name}>
            <span className={styles.perm}>drwxr-xr-x</span>
            <div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span className={styles.tag} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className={styles.entryLinks}>
                <a href={project.href} target="_blank" rel="noopener">
                  código-fonte
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects

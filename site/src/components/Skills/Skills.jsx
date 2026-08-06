import SectionTitle from '../SectionTitle/SectionTitle.jsx'
import styles from './Skills.module.css'

const SKILL_GROUPS = [
  {
    label: 'Backend',
    skills: ['C#', '.NET / ASP.NET Core', 'Minimal APIs', 'REST APIs', 'EF Core', 'JWT'],
  },
  {
    label: 'Arquitetura e boas práticas',
    skills: ['Clean Architecture', 'DDD', 'SOLID', 'Clean Code', 'Repository / Unit of Work'],
  },
  {
    label: 'Banco de dados e mensageria',
    skills: ['SQL Server', 'PostgreSQL', 'Supabase', 'RabbitMQ'],
  },
  {
    label: 'Front-end',
    skills: ['React', 'Blazor', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    label: 'Cloud e DevOps',
    skills: ['AWS (EC2, S3, RDS, ECS, IAM)', 'Docker', 'Docker Compose', 'GitHub Actions', 'CI/CD'],
  },
  {
    label: 'Testes e segurança',
    skills: ['xUnit', 'Testcontainers', 'FluentAssertions', 'Postman'],
  },
]

function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <SectionTitle command="ls ./skills" />
      {SKILL_GROUPS.map((group) => (
        <div className={styles.group} key={group.label}>
          <p className={styles.groupLabel}>{group.label}</p>
          <div className={styles.tags}>
            {group.skills.map((skill) => (
              <span className={styles.tag} key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
      <p className={styles.note}>* aprofundando em AWS: Lambda, CloudFront e SES</p>
    </section>
  )
}

export default Skills

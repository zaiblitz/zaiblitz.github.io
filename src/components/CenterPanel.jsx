import { projects } from '../data/projects'
import Terminal from './Terminal'

export default function CenterPanel() {
  return (
    <section className="panel panel--center">
      <div className="panel__header">
        <span className="panel__label">PROJECT DATABASE</span>
        <span className="panel__decoration">━━━━━━━━━━━━━━━━</span>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-card__header">
              <span
                className={`project-card__status${project.status === 'ARCHIVED' ? ' status--archived' : ''}`}
              >
                ● {project.status}
              </span>
              <span className="project-card__id">#{project.id}</span>
            </div>
            <h3 className="project-card__name">{project.name}</h3>
            <p className="project-card__desc">{project.description}</p>
            <div className="project-card__tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <a href={project.url} className="project-card__btn">ACCESS ▸</a>
          </article>
        ))}
      </div>

      <Terminal />
    </section>
  )
}

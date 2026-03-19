import { projects } from '../data/projects'
import Terminal from './Terminal'
import AboutSection from './AboutSection'
import TimelineSection from './TimelineSection'

export default function CenterPanel() {
  return (
    <section className="panel panel--center fade-in-panel">
      <div className="panel__header">
        <span className="panel__label">PROJECT DATABASE</span>
        <span className="panel__decoration">━━━━━━━━━━━━━━━━</span>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-card__header">
              <span
                className={`project-card__status${project.status === 'ARCHIVED' ? ' status--archived' : ''}${project.status === 'PLANNED' ? ' status--planned' : ''}${project.status === 'IN DEV' ? ' status--indev' : ''}`}
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
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-card__btn">ACCESS ▸</a>
          </article>
        ))}
      </div>

      <AboutSection />
      <TimelineSection />
      <Terminal />
    </section>
  )
}

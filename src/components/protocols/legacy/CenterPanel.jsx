import { useState } from 'react'
import { projects } from '../../../data/projects'
import { about } from '../../../data/about'
import { timeline } from '../../../data/timeline'
import Terminal from './Terminal'
import TerminalManager from '../../shared/TerminalManager'

const terminalData = {
  about: () => {
    const lines = [
      "INITIATING QUERY: DOSSIER\n",
      `> OPERATOR: ${about.headline}`,
      ...about.paragraphs.map(p => `> ${p}`),
      "",
      ...about.focus.map(f => `> ${f.label}: ${f.value}`),
      "\n[ END OF FILE ]"
    ];
    return lines.join('\n');
  },
  career: () => {
    const lines = [
      "INITIATING QUERY: MISSION LOG\n",
      "> SCANNING CAREER DATABASE...\n"
    ];
    timeline.forEach(entry => {
      lines.push(`> [${entry.year}] ${entry.role}`);
      lines.push(`  ORG: ${entry.org}`);
      lines.push(`  ${entry.description}`);
      lines.push(`  STATUS: ${entry.status}`);
      if (entry.tags) lines.push(`  TAGS: ${entry.tags.join(', ')}`);
      lines.push("");
    });
    lines.push("[ END OF TRANSMISSION ]");
    return lines.join('\n');
  },
  contact: () => {
    return "INITIATING QUERY: CONTACT\n\n> ENCRYPTING CONNECTION...\n> SECURE CHANNEL ESTABLISHED.\n\n> Use the terminal command 'contact' for direct links.\n\n> AWAITING INCOMING TRANSMISSION...";
  }
};

export default function CenterPanel() {
  const [termState, setTermState] = useState({ open: false, key: 'about' });

  const handleTerminalCommand = (cmd) => {
    if (terminalData[cmd]) {
      setTermState({ open: true, key: cmd });
      return true; // handled as popup
    }
    return false; // let terminal handle normally
  };

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

      <Terminal onPopupCommand={handleTerminalCommand} />

      <TerminalManager
        isOpen={termState.open}
        onClose={() => setTermState(prev => ({ ...prev, open: false }))}
        title={`OS // QUERY: ${termState.key.toUpperCase()}`}
        content={typeof terminalData[termState.key] === 'function' ? terminalData[termState.key]() : ''}
        soundPitch={1200}
      />
    </section>
  )
}

import { personalStrengths, skillGroups, skillLevels } from '../data/skills'

export default function SkillsApp() {
  return (
    <div className="app skills-app">
      <header className="skills-header reveal">
        <p className="about-kicker">My toolkit</p>
        <h1>Skills I&rsquo;m using—and growing</h1>
        <p>I&rsquo;m strongest in frontend work and actively expanding toward full-stack development. The labels below show where each skill fits today.</p>
      </header>

      <div className="skill-legend reveal" aria-label="Skill familiarity key">
        {Object.entries(skillLevels).map(([level, info]) => (
          <div key={level} className="legend-item">
            <span className={`level-dot level-${level}`} aria-hidden />
            <span><strong>{info.label}</strong><small>{info.detail}</small></span>
          </div>
        ))}
      </div>

      <div className="skill-grid">
        {skillGroups.map((group) => (
          <section key={group.category} className="skill-card reveal">
            <h2><span className="skill-icon" aria-hidden>{group.icon}</span>{group.category}</h2>
            <p className="skill-description">{group.description}</p>
            <ul className="tag-list">
              {group.skills.map((skill) => (
                <li key={skill.name} className={`tag tag-${skill.level}`}>
                  <span className={`level-dot level-${skill.level}`} aria-hidden />{skill.name}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <h2 className="section-title reveal">What I bring beyond the toolkit</h2>
      <div className="soft-list">
        {personalStrengths.map((skill) => (
          <div key={skill.title} className="soft-item reveal"><h3>{skill.title}</h3><p>{skill.detail}</p></div>
        ))}
      </div>
    </div>
  )
}

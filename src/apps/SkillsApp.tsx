import { softSkills, technicalSkills } from '../data/skills'

export default function SkillsApp() {
  return (
    <div className="app skills-app">
      <h2 className="section-title reveal">Technical Skills</h2>
      <div className="skill-grid">
        {technicalSkills.map((group) => (
          <div key={group.category} className="skill-card reveal">
            <h4>
              <span className="skill-icon" aria-hidden>
                {group.icon}
              </span>
              {group.category}
            </h4>
            <ul className="tag-list">
              {group.skills.map((skill) => (
                <li key={skill} className="tag">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="section-title reveal">
        Soft Skills
      </h2>
      <div className="soft-list">
        {softSkills.map((skill) => (
          <div key={skill.title} className="soft-item reveal">
            <h4>{skill.title}</h4>
            <p>{skill.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

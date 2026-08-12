/** SKILLS — grouped by context, with an honest indication of familiarity. */

export type SkillLevel = 'active' | 'experienced' | 'learning'

export interface Skill {
  name: string
  level: SkillLevel
}

export interface SkillGroup {
  category: string
  icon: string
  description: string
  skills: Skill[]
}

export const skillLevels: Record<SkillLevel, { label: string; detail: string }> = {
  active: { label: 'Actively use', detail: 'Part of my current project or coursework toolkit' },
  experienced: { label: 'Experience with', detail: 'Used in past projects, research, or classes' },
  learning: { label: 'Currently learning', detail: 'An area I’m intentionally building depth in' },
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages', icon: '⌨️', description: 'The languages I use to build, learn, and explore.',
    skills: [
      { name: 'Java', level: 'active' }, { name: 'JavaScript', level: 'active' },
      { name: 'HTML', level: 'active' }, { name: 'CSS', level: 'active' },
      { name: 'Python', level: 'experienced' }, { name: 'SQL', level: 'active' },
    ],
  },
  {
    category: 'Frontend & Web', icon: '🖥️', description: 'Where most of my hands-on building experience began.',
    skills: [
      { name: 'React', level: 'active' }, { name: 'Vite', level: 'active' },
      { name: 'Responsive design', level: 'active' }, { name: 'Flexbox & Grid', level: 'active' },
      { name: 'React Router', level: 'experienced' }, { name: 'State management', level: 'experienced' },
    ],
  },
  {
    category: 'Backend & Full Stack', icon: '🔗', description: 'The systems behind the interface—my main area of growth.',
    skills: [
      { name: 'REST APIs', level: 'learning' }, { name: 'Supabase', level: 'learning' },
      { name: 'PostgreSQL', level: 'learning' }, { name: 'Authentication', level: 'learning' },
      { name: 'Row Level Security', level: 'learning' }, { name: 'FastAPI', level: 'experienced' },
      { name: 'Node.js basics', level: 'learning' }, { name: 'Frontend/backend integration', level: 'learning' },
    ],
  },
  {
    category: 'Software Engineering', icon: '⚙️', description: 'Practices I’ve encountered through teams, projects, and coursework.',
    skills: [
      { name: 'Git & GitHub', level: 'active' }, { name: 'Object-oriented design', level: 'active' },
      { name: 'JUnit', level: 'experienced' }, { name: 'Mockito', level: 'experienced' },
      { name: 'GitHub Actions', level: 'experienced' }, { name: 'CI/CD', level: 'experienced' },
      { name: 'Dependency injection', level: 'experienced' }, { name: 'Ports & adapters', level: 'experienced' },
      { name: 'Error handling & retries', level: 'experienced' },
    ],
  },
  {
    category: 'Data & Research', icon: '🔎', description: 'Working with structured data and web-based research workflows.',
    skills: [
      { name: 'Relational design', level: 'active' }, { name: 'ER modeling', level: 'active' },
      { name: 'Data collection', level: 'experienced' }, { name: 'Web-based data collection', level: 'experienced' },
      { name: 'Web scraping', level: 'experienced' },
    ],
  },
  {
    category: 'Tools', icon: '🧰', description: 'The everyday environments and platforms in my workflow.',
    skills: [
      { name: 'VS Code', level: 'active' }, { name: 'IntelliJ IDEA', level: 'active' },
      { name: 'DataGrip', level: 'experienced' }, { name: 'npm', level: 'active' },
    ],
  },
]

export const personalStrengths = [
  { title: 'Curious debugging', detail: 'I like tracing mistakes back to the gap in my understanding instead of moving past them.' },
  { title: 'Product perspective', detail: 'Studying business alongside CS keeps me interested in users, tradeoffs, and why a product should exist.' },
  { title: 'Creative practice', detail: 'Digital art, design, and piano give me other ways to notice patterns and make ideas tangible.' },
  { title: 'Collaborative research', detail: 'I’m comfortable contributing carefully to team projects and detail-oriented research workflows.' },
]

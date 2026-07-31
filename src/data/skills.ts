/**
 * SKILLS — edit these arrays to update the Skills window.
 * Each group renders as a titled card of tags.
 */

export interface SkillGroup {
  category: string
  /** A short emoji/icon shown next to the category title. */
  icon: string
  skills: string[]
}

export const technicalSkills: SkillGroup[] = [
  {
    category: 'Languages',
    icon: '💻',
    skills: ['Java', 'Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
  },
  {
    category: 'Libraries & Frameworks',
    icon: '📚',
    skills: ['React', 'WPILib', 'p5.js', 'Bootstrap'],
  },
  {
    category: 'Tools & Platforms',
    icon: '🛠️',
    skills: ['Git & GitHub', 'VS Code', 'Figma', 'Replit'],
  },
  {
    category: 'Design',
    icon: '🎨',
    skills: [
      'Adobe Illustrator',
      'Adobe Photoshop',
      'Procreate',
      'Wireframing',
      'User research',
    ],
  },
]

export interface SoftSkill {
  title: string
  detail: string
}

export const softSkills: SoftSkill[] = [
  {
    title: 'Leadership & Teamwork',
    detail:
      'President of a 50+ member tutoring club, HTML Workshop Manager at a nonprofit, and Art Editor for the school news outlet.',
  },
  {
    title: 'Communication',
    detail:
      'Taught beginner coding workshops and collaborated across design and engineering teams.',
  },
  {
    title: 'Creativity & Design Thinking',
    detail:
      'Approaches problems with curiosity, a strong visual sense, and attention to detail.',
  },
]

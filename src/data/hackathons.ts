/**
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  HACKATHONS — edit this file to update the Projects window.                 │
 * │                                                                            │
 * │  To add a hackathon: copy one { ... } block and fill it in.                │
 * │  To remove one: delete its block.                                          │
 * │  Anything left blank (e.g. `award: ''`) is simply hidden on the page.      │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

export interface HackathonLink {
  label: string
  url: string
}

export interface Hackathon {
  /** Optional anchor id so a notification can link to this card. */
  id?: string
  /** Name of the hackathon event, e.g. "HackBeanpot 2026". */
  event: string
  /** Name of the project you built there. */
  project: string
  /** When it happened, e.g. "Feb 2026". */
  date: string
  /** Where it happened, e.g. "Boston, MA". */
  location: string
  /** Your role, e.g. "Frontend & Design". */
  role: string
  /** An award or recognition. Leave '' if none. */
  award: string
  /** 1–3 sentence description of what you built. */
  description: string
  /** Technologies used — shown as tags. */
  tech: string[]
  /** Optional links (Devpost, GitHub, live demo, video…). */
  links: HackathonLink[]
}

export const hackathons: Hackathon[] = [
  {
    event: 'Hack NUACM',
    project: 'Healthy Huskies',
    date: '',
    location: '',
    role: '',
    award: 'Best Project in Finance Track',
    description:
      'A three-in-one dining companion for Northeastern students that creates personalized meal plans from dining hall menus, dietary needs, and daily schedules. It also analyzes dining-dollar spending and meal swipes to recommend a sustainable semester budget, with a streamlined digital card-swipe experience.',
    tech: ['Python', 'Flask', 'HTML', 'CSS', 'Claude'],
    links: [
      { label: 'Devpost', url: 'https://devpost.com/software/healthy-huskies' },
      { label: 'GitHub', url: 'https://github.com/yalk2007/ACM-Hackathon' },
    ],
  },
  {
    event: 'Hack NUACM',
    project: 'Civilization Shield',
    date: '',
    location: '',
    role: '',
    award: 'DevSwarm Award',
    description:
      'An AI-assisted crisis management platform that unifies real-time threat monitoring, disaster simulation, and emergency logistics in one command center. A public-facing portal also helps citizens understand local risks, track preparedness, and build community resilience.',
    tech: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS', 'Chart.js'],
    links: [
      { label: 'GitHub', url: 'https://github.com/agabayu/Civilization_Shield' },
    ],
  },
  {
    event: 'ViTAL Hacks 2026',
    project: 'ViTAL Track',
    date: 'Mar 2026',
    location: 'Boston, MA',
    role: '',
    award: '',
    description:
      'A full-stack health literacy platform that helps users organize personal health attributes and medications in one place. It connects to the openFDA API to surface clear drug usage, purpose, precaution, and side-effect information while caching results for faster access.',
    tech: ['React', 'Vite', 'Java', 'Spring Boot', 'PostgreSQL', 'openFDA API'],
    links: [
      { label: 'Devpost', url: 'https://devpost.com/software/health-data-transparency' },
      { label: 'GitHub', url: 'https://github.com/mwanta/vitalHacksProject' },
    ],
  },
]

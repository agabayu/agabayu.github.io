/**
 * PROJECTS — edit this file to update the "Projects" section of the Projects
 * window (shown above Hackathons). Uses the same fields as hackathons.ts:
 * `event` is the organization or team, and anything left blank is hidden.
 *
 * Give a project an `id` if a notification should link to it
 * (see src/data/notifications.ts).
 */
import type { Hackathon } from './hackathons'

export const projects: Hackathon[] = [
  {
    id: 'project-ratemyhusky',
    event: 'Oasis',
    project: 'RateMyHusky',
    date: 'Jan 2026 – Present',
    location: 'Boston, MA',
    role: 'Software Engineer',
    award: '',
    description:
      'A professor-rating platform for 20K+ Northeastern students. I unified 43K+ ratings, 9K Reddit mentions, and student submissions into one profile API for side-by-side comparisons, and built a Chrome extension that surfaces 3,800+ professor profiles right in the browser.',
    tech: ['React', 'TypeScript', 'Flask', 'PostgreSQL', 'Chrome Extension (Manifest V3)'],
    links: [{ label: 'Visit RateMyHusky', url: 'https://ratemyhusky.com/' }],
  },
  {
    id: 'project-yuji',
    event: 'Social travel discovery app',
    project: 'Yuji',
    date: 'Sep 2026 – Present',
    location: '',
    role: '',
    award: '',
    description:
      'An app for exploring travel destinations by location, from the world view down to individual places. I built its interactive search and map interface, plotting destinations as rating pins with React Native maps and connecting that location data to the app’s search, filters, and place details.',
    tech: ['React Native', 'TypeScript', 'Expo', 'NestJS', 'Prisma', 'AWS (S3)'],
    links: [],
  },
]

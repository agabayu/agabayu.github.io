/**
 * NOTIFICATIONS — the cards in the Notification Center (click "Angela You" in
 * the top-right of the menu bar).
 *
 * To announce an update: add a block below. Cards are sorted newest first by
 * `date` (same-day updates keep the order listed here, top first). Clicking a card opens `app` and, if
 * `target` is set, scrolls to the element with that id and briefly outlines it
 * (e.g. a project's `id` in src/data/projects.ts).
 */
import type { AppId } from '../types'

export interface SiteNotification {
  id: string
  title: string
  /** One or two sentences; longer text is trimmed to two lines on the card. */
  body: string
  /** When the update was made, as 'YYYY-MM-DD'. */
  date: string
  /** Which window to open when the card is clicked. */
  app: AppId
  /** Optional id of the element inside that window to scroll to. */
  target?: string
}

export const notifications: SiteNotification[] = [
  {
    id: 'yuji',
    title: 'New project: Yuji',
    body: 'Added Yuji to Projects: a social travel discovery app where I built the interactive search and map interface with React Native.',
    date: '2026-11-16',
    app: 'projects',
    target: 'project-yuji',
  },
  {
    id: 'ratemyhusky',
    title: 'New project: RateMyHusky',
    body: 'Added RateMyHusky to Projects: a professor-rating platform for 20K+ Northeastern students, built with React, Flask, and PostgreSQL.',
    date: '2026-11-16',
    app: 'projects',
    target: 'project-ratemyhusky',
  },
]

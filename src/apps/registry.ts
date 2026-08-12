import type { AppDefinition } from '../types'
import AboutApp from './AboutApp'
import SkillsApp from './SkillsApp'
import ProjectsApp from './ProjectsApp'
import ContactApp from './ContactApp'
import SiteInfoApp from './SiteInfoApp'
import WelcomeApp from './WelcomeApp'

/**
 * The single source of truth for every desktop app. Adding an entry here
 * automatically creates its desktop icon, menu-bar link, and window.
 */
export const APPS: AppDefinition[] = [
  {
    id: 'about',
    title: 'About Me',
    icon: '/desktop/icons/about.PNG',
    Component: AboutApp,
    defaultSize: { width: 860, height: 650 },
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: '/desktop/icons/skills.PNG',
    Component: SkillsApp,
    defaultSize: { width: 720, height: 540 },
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: '/desktop/icons/projects.PNG',
    Component: ProjectsApp,
    defaultSize: { width: 780, height: 580 },
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: '/desktop/icons/contact.PNG',
    Component: ContactApp,
    defaultSize: { width: 560, height: 460 },
  },
  {
    id: 'welcome',
    title: 'Welcome',
    icon: '/header/icons/logo.PNG',
    Component: WelcomeApp,
    defaultSize: { width: 560, height: 510 },
    showOnDesktop: false,
  },
  {
    id: 'site-info',
    title: 'About This Site',
    icon: '/header/icons/logo.PNG',
    Component: SiteInfoApp,
    defaultSize: { width: 560, height: 520 },
    showOnDesktop: false,
  },
]

export const DESKTOP_APPS = APPS.filter((app) => app.showOnDesktop !== false)

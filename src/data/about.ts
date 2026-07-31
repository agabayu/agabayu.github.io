/** ABOUT — edit these to update the About Me window. */

export const intro = {
  name: 'Angela You',
  tagline: 'Computer Science + Business Student @ Northeastern University',
  quote:
    'I’m from Queens, New York, where growing up in a diverse, fast-paced environment taught me adaptability, creativity, and a strong work ethic.',
}

export interface Card {
  title: string
  body: string
  /** Optional link shown as a small icon in the corner of the card. */
  link?: { href: string; icon: string; label: string }
}

export const interests: Card[] = [
  {
    title: 'Piano',
    body: 'I love learning new songs — YouTube tutorials are a staple for me. I completed the NYSSMA Level 6 Piano Solo with a score of 99.',
  },
  {
    title: 'Digital Art',
    body: 'I enjoy creating digital illustrations and exploring different art styles. I drew every icon and image on this website in Ibis Paint!',
  },
]

export const activities: Card[] = [
  {
    title: 'Uplift Tutoring Club — President',
    body: 'Led a team of 50+ tutors providing academic support to 200+ students and organized weekly tutoring sessions.',
    link: {
      href: 'https://www.instagram.com/thhs.uplift/',
      icon: '/desktop/icons/insta.png',
      label: 'Uplift on Instagram',
    },
  },
  {
    title: 'HTML Workshop Manager @ Bridge2Reach',
    body: 'Managed a team of volunteers teaching HTML and web development skills to foster students.',
  },
  {
    title: 'Girls Who Code Club — President',
    body: 'Led a Girls Who Code sister club and organized bi-weekly meetings for THHS students.',
  },
]

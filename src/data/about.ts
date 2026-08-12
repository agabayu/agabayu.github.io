/** ABOUT — edit these to update the About Me window. */

export const intro = {
  name: 'Angela You',
  tagline: 'Computer Science + Business Administration @ Northeastern',
  paragraphs: [
    'I’m a student from Queens, New York who likes building things and understanding what makes them work. Most of my experience so far has been on the frontend, where I’ve used React, JavaScript, HTML, and CSS to turn ideas into usable interfaces.',
    'Right now, I’m working toward a fuller picture of software development—learning how APIs, databases, authentication, and backend architecture connect to the experiences people see on screen. When something doesn’t make sense, I like going back, finding the gap, and figuring out why.',
  ],
}

export interface Card {
  title: string
  body: string
  eyebrow?: string
}

export const focusAreas: Card[] = [
  {
    eyebrow: 'Building',
    title: 'From interfaces to full-stack systems',
    body: 'I’m building on my frontend foundation through projects like Oasis while learning Supabase, PostgreSQL, authentication, database schemas, and Row Level Security.',
  },
  {
    eyebrow: 'Exploring',
    title: 'Research + real-world questions',
    body: 'With Northeastern’s NU DATA Initiative, I’ve supported web-based data collection and research on digital platforms—including spotting problems in collection workflows.',
  },
  {
    eyebrow: 'Practicing',
    title: 'How software teams work',
    body: 'Through AeroNU and coursework, I’ve gained experience with CI/CD, GitHub Actions, testing, object-oriented design, APIs, and software architecture.',
  },
]

export const beyondCode: Card[] = [
  {
    title: 'Technology meets business',
    body: 'I’m drawn to product thinking, research, entrepreneurship, and the practical questions behind what gets built and why.',
  },
  {
    title: 'A creative side',
    body: 'Outside of class and projects, I draw digital art and play piano. I also illustrated the icons and images throughout this website.',
  },
]

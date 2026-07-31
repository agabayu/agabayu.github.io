/** CONTACT — edit these to update the Contact window. */

export interface ContactMethod {
  label: string
  /** The visible value, e.g. an email address or handle. */
  value: string
  /** Where it links to. Use a mailto: for email. */
  href: string
  /** Emoji shown as the method's icon. */
  icon: string
  /** If true, a "copy" button appears next to it (used for the email). */
  copyable?: boolean
}

export const contactMethods: ContactMethod[] = [
  {
    label: 'Email',
    value: 'angelayou2882@gmail.com',
    href: 'mailto:angelayou2882@gmail.com',
    icon: '✉️',
    copyable: true,
  },
  {
    label: 'LinkedIn',
    value: 'in/angela-y-0a76572a4',
    href: 'https://www.linkedin.com/in/angela-you-0a76572a4/',
    icon: '💼',
  },
  {
    label: 'GitHub',
    value: 'github.com/agabayu',
    href: 'https://github.com/agabayu',
    icon: '🐙',
  },
]

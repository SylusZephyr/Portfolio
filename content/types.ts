export type Lang = 'en' | 'zh'

export type Profile = {
  name: string
  altName: string
  initials: string
  role: string
  roleLong: string
  headline: string
  tagline: string
  location: string
  nationality: string
  availabilityNote: string
  availabilityDetail: string
  targetRoles: string
  targetCities: string
  email: string
  phone: string
  wechat: string
  github: string
  githubHandle: string
  resumeUrl: string
}

export type Stat = { value: string; label: string }

export type BentoCard = {
  id: string
  title: string
  description?: string
  /** tailwind grid placement */
  className: string
  variant: 'chain' | 'stack' | 'location' | 'bilingual' | 'quote' | 'cta'
}

export type Project = {
  id: string
  title: string
  kind: string
  period: string
  accent: string
  gradient: string
  summary: string
  problem: string
  approach: string
  outcome: string[]
  stack: string[]
  metrics: Stat[]
  links: { label: string; url: string }[]
  featured?: boolean
}

export type Job = {
  company: string
  role: string
  period: string
  location: string
  blurb: string
  highlights: string[]
}

export type SkillGroup = {
  group: string
  accent: string
  items: { name: string; level: number }[]
}

export type Award = {
  title: string
  date: string
  kind: string
  tags: string[]
  detail: string
}

export type Education = {
  school: string
  credential: string
  period: string
  detail: string
}

export type Content = {
  profile: Profile
  nav: { label: string; href: string }[]
  hero: {
    eyebrow: string
    headlineWords: string
    sub: string
    primaryCta: string
    secondaryCta: string
    stats: Stat[]
  }
  about: {
    eyebrow: string
    heading: string
    cards: BentoCard[]
    chainSteps: string[]
    quote: string
    ctaCopied: string
    ctaLabel: string
  }
  projects: {
    eyebrow: string
    heading: string
    sub: string
    items: Project[]
    labels: { problem: string; approach: string; outcome: string; stack: string; close: string; open: string }
  }
  experience: { eyebrow: string; heading: string; sub: string; items: Job[] }
  skills: { eyebrow: string; heading: string; sub: string; groups: SkillGroup[] }
  awards: { eyebrow: string; heading: string; sub: string; items: Award[]; education: Education[]; educationHeading: string }
  contact: {
    eyebrow: string
    heading: string
    sub: string
    emailCta: string
    resumeCta: string
    copied: string
    availability: string
    citiesLabel: string
    rolesLabel: string
  }
  footer: { rights: string; built: string }
}

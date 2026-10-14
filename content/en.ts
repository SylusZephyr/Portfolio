import type { Content } from './types'

const shared = {
  email: 'kanwar.wajid13@gmail.com',
  phone: '+86 132 5709 6719',
  wechat: 'kanwar_18',
  github: 'https://github.com/SylusZephyr',
  githubHandle: 'SylusZephyr',
  initials: 'WK',
}

export const en: Content = {
  profile: {
    name: 'Wajid Kanwar Abdul',
    altName: '万吉',
    initials: shared.initials,
    role: 'AI Full-Stack Engineer',
    roleLong: 'AI Full-Stack Engineer · Class of 2027',
    headline: 'I build the whole chain that carries a model to the user',
    tagline:
      'Local inference, streaming transport, API integration, product surface, audit — an offline voice device and a regulated review module are two cuts through the same chain.',
    location: 'Nanchang, Jiangxi, China',
    nationality: 'Pakistani · born March 2004',
    availabilityNote: 'Open to internships and 2027 campus recruitment',
    availabilityDetail: 'Full-time internship Oct 2026 → March winter break. Remote possible.',
    targetRoles: 'AI full-stack · Large-model applications · Edge AI · AI application frontend',
    targetCities: 'Hangzhou · Shanghai · Shenzhen · Beijing · Nanchang',
    email: shared.email,
    phone: shared.phone,
    wechat: shared.wechat,
    github: shared.github,
    githubHandle: shared.githubHandle,
    resumeUrl: 'resume.pdf',
  },

  nav: [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ],

  hero: {
    eyebrow: 'AI Full-Stack Engineer · Nanchang University · Class of 2027',
    headlineWords: 'I build the whole chain that carries a model to the user.',
    sub: 'Edge AI, large-model applications and the governance that lets them ship. I am Wajid — 万吉 — and I write code in two languages and work in three.',
    primaryCta: 'See my work',
    secondaryCta: 'Download résumé',
    stats: [
      { value: '4', label: 'Shipped projects' },
      { value: '2', label: 'National awards' },
      { value: '7.5', label: 'IELTS Academic' },
      { value: '2027', label: 'Graduating' },
    ],
  },

  about: {
    eyebrow: 'About',
    heading: 'What I actually do',
    cards: [
      {
        id: 'chain',
        title: 'The chain, end to end',
        description:
          'Every project I ship walks the same path. I have built each step at least twice, under hardware limits and under regulation.',
        className: 'md:col-span-4 lg:col-span-4 lg:row-span-2',
        variant: 'chain',
      },
      {
        id: 'stack',
        title: 'Working stack',
        description: 'What I reach for without looking things up.',
        className: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
        variant: 'stack',
      },
      {
        id: 'location',
        title: 'Based in Nanchang, open to Hangzhou, Shanghai, Shenzhen, Beijing',
        description: 'Full-time internship from October 2026. Remote works.',
        className: 'md:col-span-3 lg:col-span-2 lg:row-span-1',
        variant: 'location',
      },
      {
        id: 'bilingual',
        title: 'Two working languages',
        description:
          'Three years studying and collaborating in China. I push work forward inside a Chinese team and own the English documentation and internationalisation alone.',
        className: 'md:col-span-3 lg:col-span-2 lg:row-span-1',
        variant: 'bilingual',
      },
      {
        id: 'quote',
        title: 'Where AI actually lands',
        description: '',
        className: 'md:col-span-4 lg:col-span-4 lg:row-span-1',
        variant: 'quote',
      },
      {
        id: 'cta',
        title: 'Want the long version?',
        description: 'My inbox is open.',
        className: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
        variant: 'cta',
      },
    ],
    chainSteps: [
      'Local inference deployment',
      'Streaming transport',
      'API integration',
      'Product surface',
      'Audit & compliance',
    ],
    quote:
      'I know what belongs on the device and what belongs on the inference side — and that in regulated work, AI assistance has to stay switchable and traceable. Both of those cost me real debugging time to learn.',
    ctaCopied: 'Copied',
    ctaLabel: 'Copy my email',
  },

  projects: {
    eyebrow: 'Selected work',
    heading: 'Four things I built and what broke',
    sub: 'Each one has a real failure in it. That is where the engineering is.',
    labels: {
      problem: 'The problem',
      approach: 'What I did',
      outcome: 'Outcome',
      stack: 'Stack',
      close: 'Close',
      open: 'Read the case study',
    },
    items: [
      {
        id: 'edge-voice',
        title: 'Offline Edge Voice Assistant',
        kind: 'Personal project · ESP32-S3',
        period: '2026.03 — 2026.06',
        accent: '#22d3ee',
        gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent',
        featured: true,
        summary: 'A full voice assistant chain running with the network cable pulled. No cloud API anywhere in the loop.',
        problem:
          'Run a complete speech pipeline on a microcontroller with no internet at all — wake word, recognition, a large model, and a spoken reply — on hardware that cannot hold any one of those steps alone.',
        approach:
          'Secondary development on the open-source Xiaozhi firmware. Since the MCU cannot run the model, I split the pipeline: the board handles wake word, audio capture and I2S playback; a local workstation runs inference under Ollama; the two talk over WebSocket, so data never leaves the local network. Synthesising the whole reply before speaking left a long silence, so I moved to streaming — playback starts on the model’s first returned batch.',
        outcome: [
          'Complete pipeline runs fully offline; nothing leaves the local network',
          'Streaming playback removed the long pre-speech silence',
          'Tracked a persistent failure down to an incomplete model weight download, then fixed it',
          'Passed on-site defence with the physical device delivered, plus a bilingual report and installation manual',
        ],
        stack: ['ESP32-S3', 'C/C++', 'Ollama', 'WebSocket', 'I2S', 'ASR / TTS'],
        metrics: [
          { value: '0', label: 'Cloud calls' },
          { value: '100%', label: 'Offline' },
          { value: 'Streaming', label: 'Playback' },
        ],
        links: [{ label: 'GitHub', url: shared.github }],
      },
      {
        id: 'irb-smart',
        title: 'IRB Smart — Hospital Ethics Review Platform',
        kind: 'Internship · Neusoft Group (Nanchang)',
        period: '2026.07 — 2026.09',
        accent: '#f59e0b',
        gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
        featured: true,
        summary:
          'Clinical research ethics review for provincial hospital committees. I owned the secretary module — around 25 pages — and the AI pre-review integration.',
        problem:
          'Hospital ethics committees run review on meetings and paper trails. The platform had to carry that process online without losing the accountability that makes it valid — and add AI assistance without letting it decide anything on its own.',
        approach:
          'Built the secretary-side module in Vue 3, TypeScript, Pinia and Element Plus against a Java 21 / Spring Boot 3 backend, with Flowable driving the review workflow and PostgreSQL, Redis and Elasticsearch behind it. The AI pre-review is integrated as an assist: it surfaces findings for a human reviewer, stays switchable, and leaves a trace behind every suggestion.',
        outcome: [
          'Around 25 secretary-module pages delivered against a live Flowable workflow',
          'AI pre-review integrated as a switchable, traceable assist rather than an automatic decision',
          'University–enterprise joint internship, mentored by the Associate Dean of the School of Software',
        ],
        stack: ['Vue 3', 'TypeScript', 'Pinia', 'Element Plus', 'Spring Boot 3', 'Flowable', 'PostgreSQL', 'Redis', 'Elasticsearch'],
        metrics: [
          { value: '~25', label: 'Pages owned' },
          { value: '3 mo', label: 'Duration' },
          { value: 'Assist', label: 'AI role' },
        ],
        links: [],
      },
      {
        id: 'text-mining',
        title: 'Chinese Text Mining & Topic Modelling',
        kind: 'National competition · Technical lead',
        period: '2025.10 — 2026.05',
        accent: '#a855f7',
        gradient: 'from-purple-500/20 via-fuchsia-500/10 to-transparent',
        summary:
          'Pipeline from Chinese corpus collection to unsupervised topic discovery, on consumer discourse around medicine-food homology.',
        problem:
          'Scraped Chinese web text arrives mixed with navigation furniture and advertising, and unsupervised topic modelling has no ground truth to check an answer against.',
        approach:
          'Built collection through analysis in Python: requests, BeautifulSoup and lxml to gather, then regex extraction rules and a stopword dictionary to strip the noise, jieba for segmentation, gensim LDA for topics. With no labels to score against, I iterated parameters against business keywords until topics came out interpretable, and owned the model construction that turned qualitative reading into quantified results.',
        outcome: [
          'National Second Prize at the 16th "Zhengda Cup" National College Student Market Research and Analysis Competition',
          'A field of 360,000+ students across 1,200+ universities',
          'Cleaning rules measurably raised the quality of the text dataset',
          'Qualitative discourse turned into quantified, interpretable topics',
        ],
        stack: ['Python', 'jieba', 'gensim (LDA)', 'pandas', 'BeautifulSoup', 'matplotlib'],
        metrics: [
          { value: '2nd', label: 'National prize' },
          { value: '360k+', label: 'Entrants' },
          { value: 'Lead', label: 'My role' },
        ],
        links: [],
      },
      {
        id: 'vr-racer',
        title: 'Gesture-Driven VR Racer',
        kind: 'Personal project · PICO 4 port',
        period: '2026.06',
        accent: '#34d399',
        gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
        summary: 'A VR racing game steered with bare hands, ported to PICO 4.',
        problem:
          'Steering by hand tracking has to feel continuous, and hand tracking loses confidence exactly when you need it — mid-corner, hands turned away from the headset.',
        approach:
          'Built in Unity 6 (URP) with OpenXR, XR Hands and the XR Interaction Toolkit, built out to Android via IL2CPP for ARM64. Steering angle comes from projecting both palm direction vectors onto the head-up plane, giving a continuous angle rather than discrete gestures; when tracking confidence drops, the game falls back to controller input automatically.',
        outcome: [
          'Continuous steering from two-handed palm vectors, not discrete gestures',
          'Automatic fallback to controllers when hand-tracking confidence drops',
          'Ported and measured on PICO 4 hardware',
        ],
        stack: ['Unity 6 (URP)', 'OpenXR', 'XR Hands', 'IL2CPP', 'ARM64'],
        metrics: [
          { value: 'PICO 4', label: 'Platform' },
          { value: 'Hands', label: 'Input' },
          { value: 'Auto', label: 'Fallback' },
        ],
        links: [],
      },
    ],
  },

  experience: {
    eyebrow: 'Experience',
    heading: 'Where the hours went',
    sub: 'Engineering, and the media work that pays for the bilingual half of my CV.',
    items: [
      {
        company: 'Neusoft Group (Nanchang)',
        role: 'AI Application Frontend Development Intern',
        period: '2026.07 — 2026.09',
        location: 'Nanchang · University–enterprise joint internship',
        blurb: 'IRB Smart, a clinical research ethics review platform for provincial hospital ethics committees.',
        highlights: [
          'Owned the secretary module — roughly 25 pages — in Vue 3, TypeScript, Pinia and Element Plus.',
          'Integrated AI pre-review as a switchable, traceable assist to human reviewers.',
          'Worked against Java 21 / Spring Boot 3 with Flowable, PostgreSQL, Redis and Elasticsearch.',
        ],
      },
      {
        company: 'China Media Group (CCTV) · Xinhua',
        role: 'On-camera contributor',
        period: '2026.05 — 2026.07',
        location: 'Fuzhou · Jiangxi',
        blurb: 'Cultural and tourism media work alongside the engineering track.',
        highlights: [
          'Filmed Fuzhou cultural-tourism promotional content with China Media Group (CCTV).',
          'Took part in a Xinhua feature on ancient-book restoration.',
        ],
      },
      {
        company: 'Beijing Huayu Times Culture Media',
        role: 'International youth media talent',
        period: '2025.12',
        location: 'Beijing · Letter of intent',
        blurb: 'A state-owned enterprise under Sinolingua Press, affiliated with the China International Communications Group.',
        highlights: ['Signed a cooperation letter of intent as an international youth self-media talent.'],
      },
      {
        company: 'Nanchang University',
        role: 'Bilingual host · Class monitor',
        period: '2023 — 2025',
        location: 'Jiangxi',
        blurb: 'Student leadership and bilingual public speaking.',
        highlights: [
          'Bilingual host of the "World Youth Speak" culture salon at the Jiangxi Chinese-Foreign Humanities Exchange Week, addressing 14 universities.',
          'Class monitor, School of Software, 2023—2024.',
        ],
      },
    ],
  },

  skills: {
    eyebrow: 'Skills',
    heading: 'Depth, not a word cloud',
    sub: 'Self-assessed fluency. Under 70 means I can work in it, not teach it.',
    groups: [
      {
        group: 'Large-model applications',
        accent: '#22d3ee',
        items: [
          { name: 'Local deployment (Ollama)', level: 88 },
          { name: 'ASR → LLM → TTS chains', level: 85 },
          { name: 'Streaming & first-token latency', level: 82 },
          { name: 'REST integration', level: 86 },
        ],
      },
      {
        group: 'Edge AI',
        accent: '#a855f7',
        items: [
          { name: 'ESP32-S3', level: 84 },
          { name: 'C / C++ firmware', level: 78 },
          { name: 'WebSocket streaming', level: 85 },
          { name: 'Constrained-resource trade-offs', level: 82 },
        ],
      },
      {
        group: 'NLP & data',
        accent: '#f472b6',
        items: [
          { name: 'jieba segmentation', level: 86 },
          { name: 'gensim / LDA', level: 83 },
          { name: 'pandas', level: 85 },
          { name: 'requests / BeautifulSoup', level: 88 },
        ],
      },
      {
        group: 'AI governance',
        accent: '#f59e0b',
        items: [
          { name: 'Algorithmic recommendation ethics', level: 85 },
          { name: 'PIPL & recommendation provisions', level: 82 },
          { name: 'Audit trails for AI decisions', level: 80 },
          { name: 'ACM / IEEE ethics guidelines', level: 83 },
        ],
      },
      {
        group: 'Frontend',
        accent: '#38bdf8',
        items: [
          { name: 'Vue 3', level: 90 },
          { name: 'TypeScript', level: 85 },
          { name: 'Pinia / Vue Router', level: 86 },
          { name: 'Element Plus', level: 88 },
        ],
      },
      {
        group: 'Backend & storage',
        accent: '#34d399',
        items: [
          { name: 'REST API design', level: 84 },
          { name: 'MySQL · SQLite', level: 82 },
          { name: 'Spring Boot / Flowable', level: 75 },
          { name: 'PostgreSQL · Redis', level: 74 },
        ],
      },
    ],
  },

  awards: {
    eyebrow: 'Awards & research',
    heading: 'Receipts',
    sub: 'Competition results, and the governance research that shapes how I build regulated systems.',
    educationHeading: 'Education & languages',
    items: [
      {
        title: 'National First Prize — 4th "Travel + Chinese" Video Competition',
        date: '2026.05',
        kind: 'Award',
        tags: ['National First Prize', 'Excellent Work Award'],
        detail:
          'Awarded by the Center for Language Education and Cooperation, Ministry of Education. Received both the National First Prize and the Excellent Work Award.',
      },
      {
        title: 'National Second Prize — 16th "Zhengda Cup" Market Research Competition',
        date: '2026.05',
        kind: 'Award',
        tags: ['National Second Prize', '360,000+ entrants'],
        detail:
          'Technical lead on the Chinese text mining and topic modelling pipeline behind the entry. A field of over 360,000 students from more than 1,200 universities.',
      },
      {
        title: 'Ethical Dilemmas and Regulatory Boundaries of "Hot-Topic Push" Algorithms',
        date: '2026',
        kind: 'Research report',
        tags: ['AI governance', 'Course grade 89'],
        detail:
          'Working from ACM/IEEE software engineering ethics guidelines, the Personal Information Protection Law and the Provisions on the Administration of Algorithmic Recommendations, the report analyses information cocoons, algorithmic bias and the protection of minors, and argues for embedding ethical review into the software lifecycle.',
      },
      {
        title: 'Academic references available',
        date: 'On request',
        kind: 'Reference',
        tags: ['Nanchang University'],
        detail: 'Letters of recommendation available from two professors of the School of Software, Nanchang University.',
      },
    ],
    education: [
      {
        school: 'Nanchang University, School of Software',
        credential: 'BEng Software Engineering — full English-taught international class',
        period: '2023.09 — 2027.07 (expected)',
        detail:
          'National "Double First-Class" university and Project 211. Web Frontend Practice 95 · IoT Fundamentals 93 · Algorithm Analysis & Design 89 · Software Ethics & Cyber Law 89 · Python 87 · Discrete Mathematics 87.',
      },
      {
        school: 'Languages',
        credential: 'IELTS Academic 7.5 (Speaking 8.0, Listening 8.5)',
        period: 'Current',
        detail:
          'English: full English-taught degree, writes technical documentation independently. Chinese: fluent in Chinese-language work environments, bilingual technical writing and hosting, HSK 5 in preparation. Urdu: native.',
      },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    heading: 'Let me build the thing you have been putting off',
    sub: 'Looking for AI full-stack, large-model application, edge AI and AI frontend roles. Internship now, campus recruitment for 2027.',
    emailCta: 'Email me',
    resumeCta: 'Download résumé',
    copied: 'Copied to clipboard',
    availability: 'Available for internship from October 2026',
    citiesLabel: 'Target cities',
    rolesLabel: 'Target roles',
  },

  footer: {
    rights: 'Wajid Kanwar Abdul · 万吉',
    built: 'Built with Next.js, Tailwind and Motion.',
  },
}

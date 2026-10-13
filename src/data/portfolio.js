/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE TO MAKE THE PORTFOLIO YOURS.
 *  Everything the 3D world and the UI render comes from here.
 *  Nothing else needs to change for a full content swap.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: 'Ayan Kabir',
  initials: 'AK',
  role: 'Software Engineer',
  tagline: 'I build systems that stay up, and interfaces people actually enjoy.',
  location: 'Lahore, PK · remote-friendly',
  available: true,
  availabilityNote: 'Open to senior backend / full-stack roles',
  email: 'hello@ayankabir.dev',
  resumeUrl: '/resume.pdf',
  socials: [
    { label: 'GitHub', handle: '@syluszephyr', url: 'https://github.com/syluszephyr' },
    { label: 'LinkedIn', handle: '/in/ayankabir', url: 'https://linkedin.com/in/ayankabir' },
    { label: 'X', handle: '@ayanbuilds', url: 'https://x.com/ayanbuilds' },
    { label: 'Email', handle: 'hello@ayankabir.dev', url: 'mailto:hello@ayankabir.dev' },
  ],
}

export const about = {
  heading: 'About',
  lead: 'Six years turning vague product ideas into services that handle real traffic without drama.',
  paragraphs: [
    "I started out writing Unity shaders for a two-person game studio, which is where the taste for real-time graphics comes from. These days most of my work is distributed backends — event pipelines, payment flows, the unglamorous machinery that has to be right — but I never stopped building things that render.",
    "I like problems where correctness and feel both matter: a checkout that cannot double-charge and still responds in under 80ms, a 3D editor that holds 60fps on a four-year-old laptop. I write the boring tests, I draw the architecture before the code, and I would rather delete a service than add one.",
    "Outside work I render procedural landscapes, maintain two small open-source libraries, and mentor three junior engineers who are already better than me at CSS.",
  ],
  facts: [
    { k: 'Years shipping', v: '6' },
    { k: 'Production services owned', v: '14' },
    { k: 'Peak traffic handled', v: '38k req/s' },
    { k: 'Open-source stars', v: '4.1k' },
    { k: 'Coffees per deploy', v: '1.5' },
  ],
}

export const skills = [
  {
    group: 'Languages',
    accent: '#38f8d4',
    items: [
      { name: 'TypeScript', level: 95 },
      { name: 'Go', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'Rust', level: 64 },
      { name: 'GLSL', level: 72 },
      { name: 'SQL', level: 90 },
    ],
  },
  {
    group: 'Backend & data',
    accent: '#7b6cff',
    items: [
      { name: 'Node / Fastify', level: 93 },
      { name: 'PostgreSQL', level: 90 },
      { name: 'Kafka', level: 80 },
      { name: 'Redis', level: 86 },
      { name: 'gRPC', level: 78 },
      { name: 'ClickHouse', level: 70 },
    ],
  },
  {
    group: 'Frontend & 3D',
    accent: '#ff4ddb',
    items: [
      { name: 'React', level: 94 },
      { name: 'three.js / r3f', level: 87 },
      { name: 'WebGL / shaders', level: 75 },
      { name: 'Blender', level: 68 },
      { name: 'Framer Motion', level: 80 },
    ],
  },
  {
    group: 'Platform',
    accent: '#ffb347',
    items: [
      { name: 'Kubernetes', level: 82 },
      { name: 'Terraform', level: 79 },
      { name: 'AWS', level: 85 },
      { name: 'Observability (OTel)', level: 83 },
      { name: 'CI/CD', level: 88 },
    ],
  },
]

/**
 * Projects become the monoliths in the gallery zone.
 * `accent` drives the emissive colour of that monolith.
 * `shape`: 'slab' | 'tower' | 'ring' | 'shard' — picks the 3D form.
 */
export const projects = [
  {
    id: 'driftkit',
    title: 'DriftKit',
    kind: 'Open source · WebGL',
    year: '2025',
    accent: '#38f8d4',
    shape: 'ring',
    summary: 'A 14kb real-time particle engine for the web that holds 100k GPU particles at 60fps on integrated graphics.',
    problem:
      'Existing web particle libraries allocate on the CPU every frame, so anything past a few thousand particles stutters on the hardware most visitors actually have.',
    approach:
      'Moved the entire simulation into a ping-pong pair of float textures updated by a fragment shader, so the CPU only ever uploads uniforms. Emitters compile to a tiny bytecode the shader interprets, which keeps the API declarative without a shader-per-effect explosion.',
    outcome: [
      '100k particles at a locked 60fps on Intel Iris Xe',
      '14.2kb gzipped, zero runtime dependencies',
      '2.3k GitHub stars, used by 400+ projects',
      'Adopted as the effects layer in two commercial game jams',
    ],
    stack: ['TypeScript', 'WebGL2', 'GLSL', 'Vite'],
    links: [
      { label: 'GitHub', url: 'https://github.com/syluszephyr' },
      { label: 'Live demo', url: '#' },
    ],
    metrics: [
      { k: 'Particles', v: '100k' },
      { k: 'Bundle', v: '14kb' },
      { k: 'Stars', v: '2.3k' },
    ],
  },
  {
    id: 'ledgerline',
    title: 'Ledgerline',
    kind: 'Fintech · Distributed systems',
    year: '2024',
    accent: '#7b6cff',
    shape: 'tower',
    summary: 'Double-entry payments core processing 38k requests/second with exactly-once settlement guarantees.',
    problem:
      'The legacy monolith settled payments in a nightly batch. Reconciliation breaks were found a day late, and every regional launch meant another fragile cron.',
    approach:
      'Rebuilt settlement as an event-sourced ledger: every money movement is an immutable append, balances are projections, and idempotency keys plus a transactional outbox make retries free. Rolled out behind a shadow-write period where old and new engines were diffed on live traffic for six weeks before cutover.',
    outcome: [
      '38k req/s sustained, p99 at 71ms',
      'Reconciliation breaks down 99.4% year over year',
      'Settlement latency from ~18 hours to under 2 seconds',
      'Zero-downtime cutover across 9 regions',
    ],
    stack: ['Go', 'PostgreSQL', 'Kafka', 'Kubernetes', 'Terraform'],
    links: [{ label: 'Case study', url: '#' }],
    metrics: [
      { k: 'Throughput', v: '38k/s' },
      { k: 'p99', v: '71ms' },
      { k: 'Breaks', v: '−99.4%' },
    ],
  },
  {
    id: 'atlasforge',
    title: 'AtlasForge',
    kind: 'Creative tool · 3D',
    year: '2024',
    accent: '#ff4ddb',
    shape: 'slab',
    summary: 'Browser-based procedural terrain studio. Node graph in, streamable 3D world out.',
    problem:
      'Indie teams wanted procedural landscapes but desktop tools demand a GPU workstation and a week of tutorials before anything looks good.',
    approach:
      'A node graph compiled to a single GLSL kernel, evaluated on tiles so the viewport stays responsive while full-resolution bakes run in a worker pool. Exports to glTF with LODs generated from the same height field, so what you preview is what ships.',
    outcome: [
      '4k×4k terrain baked in 11 seconds in-browser',
      'Collaborative editing with CRDT-backed graph state',
      '1.1k monthly active creators in the first six months',
      'glTF export adopted by three published indie titles',
    ],
    stack: ['React', 'three.js', 'GLSL', 'WebWorkers', 'Yjs'],
    links: [
      { label: 'Try it', url: '#' },
      { label: 'Renders', url: '#' },
    ],
    metrics: [
      { k: 'Bake', v: '11s' },
      { k: 'Creators', v: '1.1k' },
      { k: 'Resolution', v: '4k²' },
    ],
  },
  {
    id: 'sentrymesh',
    title: 'SentryMesh',
    kind: 'Infrastructure · Observability',
    year: '2023',
    accent: '#ffb347',
    shape: 'shard',
    summary: 'Tracing sidecar that cut an 80-service platform’s mean time to diagnosis from hours to minutes.',
    problem:
      'Two hundred engineers, eighty services, and no causal view of a request. Every incident started with twenty minutes of guessing which team to page.',
    approach:
      'Shipped an OpenTelemetry sidecar with sane defaults and zero app-code changes, plus a tail-sampling gateway that keeps every error trace and 1% of the happy path. Built the service-dependency map from live spans so it could never drift from reality.',
    outcome: [
      'MTTD from 95 minutes to 7 minutes',
      '80 services instrumented in 5 weeks',
      'Telemetry bill down 62% via tail sampling',
      'Became the org-wide default for new services',
    ],
    stack: ['Go', 'OpenTelemetry', 'ClickHouse', 'Grafana'],
    links: [{ label: 'Write-up', url: '#' }],
    metrics: [
      { k: 'MTTD', v: '−93%' },
      { k: 'Services', v: '80' },
      { k: 'Cost', v: '−62%' },
    ],
  },
  {
    id: 'echovault',
    title: 'EchoVault',
    kind: 'Side project · Audio',
    year: '2023',
    accent: '#5ad8ff',
    shape: 'slab',
    summary: 'Self-hosted audio archive with on-device transcription and semantic search over ten years of voice notes.',
    problem:
      'A decade of voice memos is a write-only archive. Cloud transcription means handing over everything personal you ever recorded.',
    approach:
      'Whisper running locally, embeddings in SQLite with a vector extension, and a search UI that scrubs straight to the matching waveform segment. Everything stays on the machine; sync is an optional encrypted blob.',
    outcome: [
      '11 years / 4,800 recordings indexed',
      'Search to playback in under 300ms',
      'Fully offline — no network calls at runtime',
    ],
    stack: ['Python', 'Whisper', 'SQLite', 'React'],
    links: [{ label: 'GitHub', url: 'https://github.com/syluszephyr' }],
    metrics: [
      { k: 'Recordings', v: '4.8k' },
      { k: 'Search', v: '<300ms' },
      { k: 'Offline', v: '100%' },
    ],
  },
  {
    id: 'pulseboard',
    title: 'Pulseboard',
    kind: 'Product · Realtime',
    year: '2022',
    accent: '#9dff5a',
    shape: 'tower',
    summary: 'Realtime ops dashboard for a logistics fleet — 12k vehicles streaming to one map without melting the browser.',
    problem:
      'Dispatchers needed live positions for twelve thousand vehicles. The previous dashboard polled every five seconds and froze the tab at two thousand.',
    approach:
      'Binary WebSocket deltas, positions kept in a typed-array ring buffer, and rendering through a single instanced mesh so twelve thousand markers cost one draw call. Interpolation on the client means a 1Hz feed looks continuous.',
    outcome: [
      '12k live markers at 60fps in one draw call',
      'Bandwidth per client down 94% vs JSON polling',
      'Dispatcher task time down 31% in field trials',
    ],
    stack: ['TypeScript', 'WebSockets', 'three.js', 'Redis'],
    links: [{ label: 'Case study', url: '#' }],
    metrics: [
      { k: 'Markers', v: '12k' },
      { k: 'Bandwidth', v: '−94%' },
      { k: 'Draw calls', v: '1' },
    ],
  },
]

export const experience = [
  {
    company: 'Northwind Pay',
    role: 'Senior Software Engineer',
    period: '2023 — present',
    location: 'Remote',
    accent: '#7b6cff',
    blurb: 'Technical owner of the settlement platform that moves roughly $400M a month.',
    highlights: [
      'Led the event-sourced rewrite of the payments core (Ledgerline) across nine regions with zero downtime.',
      'Cut infrastructure spend 28% by collapsing six near-duplicate services into two and right-sizing the fleet.',
      'Set the service template every new backend starts from — tracing, migrations and CI wired in by default.',
      'Mentored three engineers from mid to senior, two now owning their own services.',
    ],
  },
  {
    company: 'Meridian Labs',
    role: 'Software Engineer',
    period: '2021 — 2023',
    location: 'Hybrid · Lahore',
    accent: '#38f8d4',
    blurb: 'Platform and observability for an eighty-service product org.',
    highlights: [
      'Built and rolled out SentryMesh, taking mean time to diagnosis from 95 minutes to 7.',
      'Shipped Pulseboard, the realtime fleet dashboard still used by 400 dispatchers daily.',
      'Ran the on-call rotation redesign that halved after-hours pages in a quarter.',
    ],
  },
  {
    company: 'Halcyon Interactive',
    role: 'Graphics / Gameplay Programmer',
    period: '2019 — 2021',
    location: 'On-site',
    accent: '#ff4ddb',
    blurb: 'Two-person studio. Shaders, tools, and whatever else was on fire.',
    highlights: [
      'Wrote the stylised water and foliage shaders for a title with 180k copies sold.',
      'Built the in-engine level editor the designers used for every shipped level.',
      'Got a 40-minute bake pipeline down to 4 minutes, which changed how the team worked daily.',
    ],
  },
]

export const education = [
  {
    school: 'University of Engineering & Technology',
    credential: 'BSc Computer Science',
    period: '2015 — 2019',
    detail: 'Graduated with distinction. Final year project: a real-time global illumination approximation for low-end GPUs.',
  },
  {
    school: 'Certifications',
    credential: 'AWS Solutions Architect — Professional',
    period: '2023',
    detail: 'Plus CKA (Certified Kubernetes Administrator), 2022.',
  },
]

export const posts = [
  {
    title: 'Your particle system is CPU-bound and you can fix it today',
    date: '2026-02-11',
    readingTime: '9 min',
    tags: ['WebGL', 'Performance'],
    excerpt:
      'Most web particle systems die on the upload, not the draw. A walk through moving simulation state into textures, with the three bugs that will bite you first.',
    url: '#',
  },
  {
    title: 'Shadow writes: how to replace a payments engine without anyone noticing',
    date: '2025-11-03',
    readingTime: '14 min',
    tags: ['Distributed systems', 'Migration'],
    excerpt:
      'Six weeks of running two ledgers side by side, diffing every transaction, and the uncomfortable things we learned about the old one.',
    url: '#',
  },
  {
    title: 'Tail sampling cut our telemetry bill 62% and improved debugging',
    date: '2025-06-22',
    readingTime: '7 min',
    tags: ['Observability'],
    excerpt:
      'Keeping 1% of traces sounds like losing information. Keeping the right 1% is strictly better than keeping all of it badly.',
    url: '#',
  },
  {
    title: 'Why I draw the architecture before I write the code',
    date: '2025-01-18',
    readingTime: '5 min',
    tags: ['Craft'],
    excerpt:
      'A boxes-and-arrows diagram is the cheapest place to be wrong. A short argument for twenty minutes of drawing.',
    url: '#',
  },
]

export const contact = {
  heading: 'Say hello',
  lead: 'Best for interesting backend problems, real-time graphics work, or anything that needs both.',
  responseTime: 'Usually replies within a day',
}

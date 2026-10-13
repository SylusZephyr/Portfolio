/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR THE WHOLE PORTFOLIO.
 *  Content is bilingual: `content.en` and `content.zh` share the
 *  exact same shape, so adding a language means copying one block.
 *  The language toggle lives in the HUD (EN / 中文).
 * ─────────────────────────────────────────────────────────────
 */

export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'zh', label: '中文', name: '简体中文' },
]

/* Values that are identical in both languages live here once. */
const shared = {
  email: 'kanwar.wajid13@gmail.com',
  phone: '+86 132 5709 6719',
  wechat: 'kanwar_18',
  github: 'https://github.com/SylusZephyr',
  githubHandle: 'github.com/SylusZephyr',
  // BASE_URL keeps this correct both at a domain root and under /<repo>/ on
  // GitHub Pages — an absolute '/resume.pdf' 404s on the sub-path
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
  initials: 'WK',
}

/* Accents are shared so the 3D world keeps one identity across languages. */
const ACCENT = {
  llm: '#38f8d4',
  edge: '#7b6cff',
  nlp: '#ff4ddb',
  governance: '#ffb347',
  frontend: '#5ad8ff',
  backend: '#9dff5a',
  tools: '#ff8a5a',
}

export const content = {
  /* ═══════════════════════════ ENGLISH ═══════════════════════════ */
  en: {
    profile: {
      name: 'Wajid Kanwar Abdul',
      altName: '万吉',
      initials: shared.initials,
      role: 'AI Full-Stack Engineer',
      roleLong: 'AI Full-Stack Engineer · Class of 2027',
      tagline: 'I build the whole chain that carries a model to the user: local inference, streaming, API, interface, audit.',
      location: 'Nanchang, Jiangxi, China',
      nationality: 'Pakistani · born March 2004',
      available: true,
      availabilityNote: 'Open to internships and 2027 campus recruitment',
      availabilityDetail:
        'Full-time internship from October 2026 through the March winter break; remote work possible.',
      targetRoles: 'AI full-stack · large-model applications · edge AI · AI application frontend',
      targetCities: 'Hangzhou · Shanghai · Shenzhen · Beijing · Nanchang',
      email: shared.email,
      resumeUrl: shared.resumeUrl,
      socials: [
        { label: 'GitHub', handle: shared.githubHandle, url: shared.github },
        { label: 'Email', handle: shared.email, url: `mailto:${shared.email}` },
        { label: 'Phone', handle: shared.phone, url: `tel:${shared.phone.replace(/\s/g, '')}` },
        { label: 'WeChat', handle: shared.wechat, url: '#' },
      ],
    },

    about: {
      heading: 'About',
      lead: 'Software engineering undergraduate at Nanchang University, building AI systems end to end — from a model running on a microcontroller to the review interface a hospital committee actually signs off in.',
      paragraphs: [
        "I am in the full English-taught international class of the School of Software at Nanchang University, a national Double First-Class and Project 211 university, graduating in July 2027. Most of what I know I learned by shipping: a voice assistant that runs with the network cable pulled, a text-mining pipeline that carried a national competition entry, a VR racer steered with your bare hands.",
        "The thread through all of it is the chain that connects a model to a person: local inference deployment → streaming transport → API integration → product surface → audit and compliance. An offline voice device on constrained hardware and a strictly regulated review module look like opposite problems, but they are two cuts through that same chain.",
        "I care about where AI actually lands. What belongs on the device, what belongs on the inference side, and — in regulated work — the fact that AI assistance must stay switchable and traceable. Those two judgements cost me real debugging time to learn.",
        "I work in Chinese and English. Three years studying and collaborating in China means I can push work forward inside a Chinese team, and I can independently own the English documentation and internationalisation side of a product.",
      ],
      facts: [
        { k: 'Graduating', v: '2027' },
        { k: 'IELTS Academic', v: '7.5' },
        { k: 'National awards', v: '1st + 2nd' },
        { k: 'Languages', v: '3' },
        { k: 'University', v: '211' },
      ],
    },

    skills: [
      {
        group: 'Large-model applications',
        accent: ACCENT.llm,
        items: [
          { name: 'Local deployment (Ollama)', level: 88 },
          { name: 'ASR → LLM → TTS chains', level: 85 },
          { name: 'Streaming & first-token latency', level: 82 },
          { name: 'REST integration into business systems', level: 86 },
          { name: 'Edge / inference-side split', level: 80 },
        ],
      },
      {
        group: 'Edge AI',
        accent: ACCENT.edge,
        items: [
          { name: 'ESP32-S3', level: 84 },
          { name: 'C / C++ firmware', level: 78 },
          { name: 'I2S audio', level: 76 },
          { name: 'WebSocket streaming', level: 85 },
          { name: 'Constrained-resource trade-offs', level: 82 },
        ],
      },
      {
        group: 'NLP & data',
        accent: ACCENT.nlp,
        items: [
          { name: 'jieba segmentation', level: 86 },
          { name: 'gensim / LDA topic models', level: 83 },
          { name: 'pandas cleaning & features', level: 85 },
          { name: 'requests / BeautifulSoup', level: 88 },
          { name: 'matplotlib', level: 80 },
        ],
      },
      {
        group: 'AI governance',
        accent: ACCENT.governance,
        items: [
          { name: 'Algorithmic recommendation ethics', level: 85 },
          { name: 'PIPL & recommendation provisions', level: 82 },
          { name: 'Audit trails for AI decisions', level: 80 },
          { name: 'ACM / IEEE ethics guidelines', level: 83 },
        ],
      },
      {
        group: 'Frontend',
        accent: ACCENT.frontend,
        items: [
          { name: 'Vue 3', level: 90 },
          { name: 'TypeScript', level: 85 },
          { name: 'Pinia / Vue Router', level: 86 },
          { name: 'Element Plus', level: 88 },
          { name: 'Axios · PWA', level: 82 },
        ],
      },
      {
        group: 'Backend & storage',
        accent: ACCENT.backend,
        items: [
          { name: 'REST API design', level: 84 },
          { name: 'MySQL · SQLite', level: 82 },
          { name: 'Spring Boot / Flowable integration', level: 75 },
          { name: 'PostgreSQL · Redis', level: 74 },
          { name: 'Elasticsearch', level: 70 },
        ],
      },
      {
        group: 'Languages & tools',
        accent: ACCENT.tools,
        items: [
          { name: 'Python', level: 90 },
          { name: 'TypeScript / JavaScript', level: 86 },
          { name: 'C / C++', level: 76 },
          { name: 'Java · SQL', level: 72 },
          { name: 'Git · Linux · Shell', level: 84 },
          { name: 'Postman + Newman', level: 80 },
        ],
      },
    ],

    projects: [
      {
        id: 'edge-voice',
        title: 'Offline Edge Voice Assistant',
        kind: 'Personal project · ESP32-S3',
        year: '2026.03 — 2026.06',
        accent: ACCENT.llm,
        shape: 'tower',
        summary:
          'A full voice assistant chain running with the network disconnected — no cloud API anywhere in the loop.',
        problem:
          'Run a complete speech pipeline on an MCU with no cloud API and no internet at all: wake word, recognition, a large model, and spoken reply, on hardware that cannot hold any of it alone.',
        approach:
          'Secondary development on the open-source Xiaozhi firmware. Because the MCU cannot run the model, I split the pipeline: the board handles wake-word, audio capture and I2S playback, a local workstation runs inference under Ollama, and the two talk over WebSocket — so data never leaves the local network. Synthesising the whole reply before speaking left a long silence, so I moved to streaming: playback starts on the model\'s first returned batch.',
        outcome: [
          'Complete pipeline runs fully offline, nothing leaves the local network',
          'Streaming playback removed the long pre-speech silence',
          'Tracked a persistent failure down to an incomplete model weight download, then fixed it',
          'Passed on-site course defence with the physical device delivered, plus a bilingual CN/EN report and installation manual',
        ],
        stack: ['ESP32-S3', 'C/C++', 'Ollama', 'WebSocket', 'I2S', 'ASR / TTS'],
        links: [{ label: 'GitHub', url: shared.github }],
        metrics: [
          { k: 'Cloud calls', v: '0' },
          { k: 'Runs offline', v: '100%' },
          { k: 'Playback', v: 'Streaming' },
        ],
      },
      {
        id: 'irb-smart',
        title: 'IRB Smart — Hospital Ethics Review Platform',
        kind: 'Internship · Neusoft Group (Nanchang)',
        year: '2026.07 — 2026.09',
        accent: ACCENT.governance,
        shape: 'slab',
        summary:
          'Clinical research ethics review system for provincial hospital committees. I owned the secretary module — roughly 25 pages — and the AI pre-review integration.',
        problem:
          'Hospital ethics committees run review entirely on meetings and paper trails. The platform had to carry that process online without losing the accountability that makes it valid — and to add AI assistance without letting it decide anything on its own.',
        approach:
          'Built the secretary-side module in Vue 3, TypeScript, Pinia and Element Plus against a Java 21 / Spring Boot 3 backend with Flowable driving the review workflow, PostgreSQL, Redis and Elasticsearch behind it. The AI pre-review capability is integrated as an assist: it surfaces findings for a human reviewer, stays switchable, and leaves a trace behind every suggestion.',
        outcome: [
          'Around 25 secretary-module pages delivered against a live Flowable workflow',
          'AI pre-review integrated as a switchable, traceable assist rather than an automatic decision',
          'University–enterprise joint internship, mentored by Prof. Xia Minglin, Associate Dean of the School of Software',
        ],
        stack: ['Vue 3', 'TypeScript', 'Pinia', 'Element Plus', 'Axios', 'Spring Boot 3', 'Flowable', 'PostgreSQL', 'Redis', 'Elasticsearch'],
        links: [],
        metrics: [
          { k: 'Pages owned', v: '~25' },
          { k: 'Duration', v: '3 months' },
          { k: 'AI role', v: 'Assist' },
        ],
      },
      {
        id: 'text-mining',
        title: 'Chinese Text Mining & Topic Modelling Pipeline',
        kind: 'National competition · Technical lead',
        year: '2025.10 — 2026.05',
        accent: ACCENT.nlp,
        shape: 'ring',
        summary:
          'End-to-end pipeline from Chinese corpus collection to unsupervised topic discovery, on consumer discourse around medicine-food homology.',
        problem:
          'Scraped Chinese web text arrives mixed with navigation furniture and advertising, and unsupervised topic modelling has no ground truth to check an answer against.',
        approach:
          'Built collection through to analysis in Python: requests, BeautifulSoup and lxml for gathering, then regex extraction rules and a stopword dictionary to strip the noise, jieba for segmentation, and gensim LDA for topics. With no labels to score against, I iterated parameters against business keywords until topics came out interpretable, and owned the model construction that turned qualitative reading into quantified results.',
        outcome: [
          'National Second Prize at the 16th "Zhengda Cup" National College Student Market Research and Analysis Competition',
          'Competition field of 360,000+ students across 1,200+ universities',
          'Cleaning rules measurably raised the quality of the text dataset',
          'Qualitative discourse turned into quantified, interpretable topics',
        ],
        stack: ['Python', 'jieba', 'gensim (LDA)', 'pandas', 'requests', 'BeautifulSoup', 'lxml', 'matplotlib'],
        links: [],
        metrics: [
          { k: 'Award', v: '2nd national' },
          { k: 'Entrants', v: '360k+' },
          { k: 'Role', v: 'Tech lead' },
        ],
      },
      {
        id: 'vr-racer',
        title: 'Gesture-Driven VR Racer',
        kind: 'Personal project · PICO 4 port',
        year: '2026.06',
        accent: ACCENT.edge,
        shape: 'shard',
        summary: 'A VR racing game steered with bare hands, ported to PICO 4.',
        problem:
          'Steering by hand tracking has to feel continuous, and hand tracking drops confidence exactly when you need it — mid-corner, hands turned away from the headset.',
        approach:
          'Built in Unity 6 (URP) with OpenXR, XR Hands and the XR Interaction Toolkit, built out to Android via IL2CPP for ARM64. Steering angle comes from projecting both palm direction vectors onto the head-up plane, giving a continuous angle rather than discrete gestures; when tracking confidence drops the game falls back to controller input automatically.',
        outcome: [
          'Continuous steering from two-handed palm vectors, not discrete gestures',
          'Automatic fallback to controllers when hand-tracking confidence drops',
          'Ported and measured on PICO 4 hardware',
        ],
        stack: ['Unity 6 (URP)', 'OpenXR', 'XR Hands', 'XR Interaction Toolkit', 'Android', 'IL2CPP', 'ARM64'],
        links: [],
        metrics: [
          { k: 'Platform', v: 'PICO 4' },
          { k: 'Input', v: 'Hands' },
          { k: 'Fallback', v: 'Auto' },
        ],
      },
    ],

    experience: [
      {
        company: 'Neusoft Group (Nanchang) Co., Ltd.',
        role: 'AI Application Frontend Development Intern',
        period: '2026.07 — 2026.09',
        location: 'Nanchang · University–enterprise joint internship',
        accent: ACCENT.governance,
        blurb:
          'IRB Smart, a clinical research ethics review platform for provincial hospital ethics committees. Mentored by Prof. Xia Minglin, Associate Dean of the School of Software, Nanchang University.',
        highlights: [
          'Owned the secretary module — roughly 25 pages — in Vue 3, TypeScript, Pinia and Element Plus.',
          'Integrated the AI pre-review capability as a switchable, traceable assist to human reviewers.',
          'Worked against a Java 21 / Spring Boot 3 backend with Flowable workflow, PostgreSQL, Redis and Elasticsearch.',
        ],
      },
      {
        company: 'China Media Group (CCTV) · Xinhua News Agency',
        role: 'On-camera contributor',
        period: '2026.05 — 2026.07',
        location: 'Fuzhou · Jiangxi',
        accent: ACCENT.nlp,
        blurb: 'Cultural and tourism media work alongside the engineering track.',
        highlights: [
          'Filmed Fuzhou city cultural-tourism promotional content with China Media Group (CCTV), July 2026.',
          'Took part in a Xinhua News Agency feature on ancient-book restoration, May 2026.',
        ],
      },
      {
        company: 'Beijing Huayu Times Culture Media Co., Ltd.',
        role: 'International youth media talent (letter of intent)',
        period: '2025.12',
        location: 'Beijing',
        accent: ACCENT.frontend,
        blurb:
          'A state-owned enterprise under Sinolingua Press, affiliated with the China International Communications Group.',
        highlights: ['Signed a cooperation letter of intent as an international youth self-media talent.'],
      },
      {
        company: 'Nanchang University',
        role: 'Bilingual host · Class monitor',
        period: '2023 — 2025',
        location: 'Jiangxi',
        accent: ACCENT.llm,
        blurb: 'Student leadership and bilingual public speaking.',
        highlights: [
          'Bilingual host of the "World Youth Speak" culture salon at the Jiangxi Chinese-Foreign Humanities Exchange Week, addressing 14 universities across the province, September 2025.',
          'Class monitor, School of Software, 2023—2024.',
        ],
      },
    ],

    education: [
      {
        school: 'Nanchang University, School of Software',
        credential: 'BEng Software Engineering — full English-taught international class',
        period: '2023.09 — 2027.07 (expected)',
        detail:
          'National "Double First-Class" university and Project 211. Selected course results: Web Frontend Practice 95 · IoT Fundamentals 93 · Algorithm Analysis & Design 89 · Software Ethics & Cyber Law 89 · Python Programming 87 · Discrete Mathematics 87 · Database Principles 85 · Probability & Statistics 85.',
      },
      {
        school: 'Languages',
        credential: 'IELTS Academic 7.5 (Speaking 8.0, Listening 8.5)',
        period: 'Current',
        detail:
          'English: full English-taught degree, writes English technical documentation independently. Chinese: works fluently in Chinese-language environments, bilingual CN/EN technical writing and hosting, HSK 5 in preparation. Urdu: native.',
      },
    ],

    research: {
      heading: 'Awards & Research',
      lead: 'Competition results and the AI governance work that shapes how I build regulated systems.',
      items: [
        {
          title: 'National First Prize — 4th "Travel + Chinese" Video Competition',
          date: '2026.05',
          kind: 'Award',
          tags: ['National First Prize', 'Excellent Work Award'],
          excerpt:
            'Awarded by the Center for Language Education and Cooperation, Ministry of Education. Received both the National First Prize and the Excellent Work Award.',
          url: '#',
        },
        {
          title: 'National Second Prize — 16th "Zhengda Cup" Market Research & Analysis Competition',
          date: '2026.05',
          kind: 'Award',
          tags: ['National Second Prize', '360,000+ entrants'],
          excerpt:
            'Technical lead on the Chinese text mining and topic modelling pipeline behind the entry. A field of over 360,000 students from more than 1,200 universities.',
          url: '#',
        },
        {
          title:
            'Ethical Dilemmas and Regulatory Boundaries of "Hot-Topic Push" Algorithms on Intelligent Social Platforms',
          date: '2026',
          kind: 'Research report',
          tags: ['AI governance', 'Course grade 89'],
          excerpt:
            'Working from the ACM/IEEE software engineering ethics guidelines, the Personal Information Protection Law and the Provisions on the Administration of Algorithmic Recommendations, the report analyses information cocoons, algorithmic bias and the protection of minors, and argues for embedding ethical review into the software lifecycle.',
          url: '#',
        },
        {
          title: 'Academic references',
          date: 'Available on request',
          kind: 'Reference',
          tags: ['Nanchang University'],
          excerpt:
            'Letters of recommendation available from Prof. Feng Jian and Prof. Rao Hong, School of Software, Nanchang University.',
          url: '#',
        },
      ],
    },

    contact: {
      heading: 'Get in touch',
      lead: 'Looking for AI full-stack, large-model application, edge AI and AI frontend roles — internship now, campus recruitment for 2027.',
      responseTime: 'Email or WeChat both reach me',
    },

    ui: {
      zones: {
        hero: 'Home',
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        experience: 'Experience',
        research: 'Research',
        contact: 'Contact',
      },
      zoneLabels: {
        hero: 'Entry',
        about: 'Core',
        skills: 'Array',
        projects: 'Gallery',
        experience: 'Timeline',
        research: 'Signals',
        contact: 'Beacon',
      },
      scroll: 'Scroll',
      walk: 'Walk',
      tour: 'Guided tour',
      tourStop: 'Stop tour',
      quality: 'Quality',
      resume: 'Résumé',
      enter: 'Enter the world',
      building: 'Building the world…',
      loaderNote: 'Best with a keyboard. Works on a phone too — there’s a joystick.',
      close: 'Esc to close',
      promptTour: 'Guided tour running — scroll or click anything to take over',
      promptWalk: 'WASD to move · drag to look · Shift to sprint',
      promptWalkTouch: 'Drag to look · joystick to move',
      promptRail: 'Scroll to travel · click any structure to open it',
      promptRailTouch: 'Swipe up to travel · tap a structure to open it',
      promptOpen: (zone) => `Press E to open ${zone}`,
      promptOpenTouch: (zone) => `Tap the marker to open ${zone}`,
      open: 'Open',
      sectionWork: 'Selected Work',
      caseStudies: (n) => `${n} CASE STUDIES · CLICK ANY STRUCTURE`,
      clickToOpen: 'CLICK TO OPEN CASE STUDY',
      aboutHint: 'Read the long version',
      skillsHint: 'See the full matrix',
      experienceHint: 'Full history & education',
      researchHint: 'All awards & research',
      contactHint: 'Open contact card',
      skillsSub: 'Depth, not a word cloud — bar height is self-assessed fluency.',
      experienceSub: 'Where the hours went.',
      researchSub: 'Awards, and the governance work behind them.',
      contactHeadline: "Let's build something",
      problem: 'The problem',
      approach: 'What I did',
      outcomeLabel: 'Outcome',
      educationHeading: 'Education & languages',
      downloadResume: 'Download résumé',
      downloadResumePdf: 'Download résumé (PDF)',
      emailMe: 'Email me',
      startEmail: 'Start an email',
      skillsNote: 'Self-assessed fluency. Anything under 70 means I can work in it, not teach it.',
      targetRolesLabel: 'Target roles',
      targetCitiesLabel: 'Target cities',
      availabilityLabel: 'Availability',
      help: {
        title: 'How to get around',
        kicker: 'Controls',
        railTitle: 'Scroll mode',
        railItems: ['Scroll or ↑ ↓ to travel the path', 'Click a structure to open it', 'Click the left-hand nav to jump'],
        walkTitle: 'Walk mode',
        walkItems: ['W A S D to move', 'Drag the mouse to look', 'Shift to sprint', 'E to open what you’re next to'],
        anyTitle: 'Anywhere',
        anyItems: ['Esc closes a panel', '? opens this help', 'Guided tour flies you through everything', 'Drop Quality if the frame rate dips'],
        touchTitle: 'On a phone',
        touchItems: ['Swipe to travel', 'Walk mode gives you a joystick', 'Tap structures to open them'],
      },
    },
  },

  /* ═══════════════════════════ 中文 ═══════════════════════════ */
  zh: {
    profile: {
      name: '万吉',
      altName: 'Wajid Kanwar Abdul',
      initials: shared.initials,
      role: 'AI 全栈开发工程师',
      roleLong: 'AI 全栈开发工程师 · 2027 届本科应届毕业生',
      tagline: '我做的是「把模型接到用户面前」的完整链路：本地推理、流式传输、接口集成、产品界面、审计与合规。',
      location: '现居江西南昌',
      nationality: '巴基斯坦籍 · 2004.03',
      available: true,
      availabilityNote: '求职实习与 2027 届校园招聘',
      availabilityDetail: '2026 年 10 月至次年 3 月寒假可全职实习；可远程投入工作。',
      targetRoles: 'AI 全栈开发 / 大模型应用开发 / 端侧 AI / AI 应用前端',
      targetCities: '杭州 · 上海 · 深圳 · 北京 · 南昌',
      email: shared.email,
      resumeUrl: shared.resumeUrl,
      socials: [
        { label: 'GitHub', handle: shared.githubHandle, url: shared.github },
        { label: '邮箱', handle: shared.email, url: `mailto:${shared.email}` },
        { label: '手机', handle: shared.phone, url: `tel:${shared.phone.replace(/\s/g, '')}` },
        { label: '微信', handle: shared.wechat, url: '#' },
      ],
    },

    about: {
      heading: '关于我',
      lead:
        '南昌大学软件工程本科在读，做端到端的 AI 系统——从跑在单片机上的模型，到医院伦理委员会真正签字用的审查界面。',
      paragraphs: [
        '我就读于南昌大学软件学院全英文授课国际本科班，国家「双一流」建设高校、211 工程高校，2027 年 7 月毕业。我的东西基本都是做出来学会的：一个拔掉网线也能跑的语音助手、一条支撑全国竞赛作品的文本挖掘流水线、一台用双手手势驾驶的 VR 赛车。',
        '贯穿其中的是把模型接到人面前的那条链路：本地推理部署 → 流式传输 → 接口集成 → 产品界面 → 审计与合规。受限硬件上的离线语音设备和强监管下的审查模块看起来是两个极端，其实是同一条链路的不同切面。',
        '我在意 AI 落地的边界：什么该放在端上、什么该推到推理侧，以及在受监管业务里，AI 辅助必须可关闭、可追溯。这两点都是用实际调试时间换来的认识。',
        '我用中英双语工作。三年在华学习与协作，既能在中文团队内部推进工作，也能独立承担产品的英文文档与国际化落地。',
      ],
      facts: [
        { k: '毕业年份', v: '2027' },
        { k: '雅思学术类', v: '7.5' },
        { k: '国赛奖项', v: '一等 + 二等' },
        { k: '语言', v: '3 种' },
        { k: '院校', v: '211' },
      ],
    },

    skills: [
      {
        group: '大模型应用',
        accent: ACCENT.llm,
        items: [
          { name: '本地部署（Ollama）', level: 88 },
          { name: '语音识别 → 大模型 → 语音合成', level: 85 },
          { name: '流式传输与首字延迟优化', level: 82 },
          { name: 'REST 接入业务系统', level: 86 },
          { name: '端侧与推理侧切分', level: 80 },
        ],
      },
      {
        group: '端侧 / 边缘 AI',
        accent: ACCENT.edge,
        items: [
          { name: 'ESP32-S3', level: 84 },
          { name: 'C / C++ 固件开发', level: 78 },
          { name: 'I2S 音频外设', level: 76 },
          { name: 'WebSocket 流式通信', level: 85 },
          { name: '受限资源下的架构取舍', level: 82 },
        ],
      },
      {
        group: 'NLP 与数据',
        accent: ACCENT.nlp,
        items: [
          { name: 'jieba 中文分词', level: 86 },
          { name: 'gensim LDA 主题建模', level: 83 },
          { name: 'pandas 数据清洗与特征工程', level: 85 },
          { name: 'requests / BeautifulSoup 采集', level: 88 },
          { name: 'matplotlib', level: 80 },
        ],
      },
      {
        group: 'AI 合规与治理',
        accent: ACCENT.governance,
        items: [
          { name: '算法推荐伦理与规制', level: 85 },
          { name: '《个人信息保护法》与算法推荐规定', level: 82 },
          { name: 'AI 辅助决策的审计留痕', level: 80 },
          { name: 'ACM / IEEE 伦理准则', level: 83 },
        ],
      },
      {
        group: '前端工程',
        accent: ACCENT.frontend,
        items: [
          { name: 'Vue 3', level: 90 },
          { name: 'TypeScript', level: 85 },
          { name: 'Pinia / Vue Router', level: 86 },
          { name: 'Element Plus', level: 88 },
          { name: 'Axios · PWA', level: 82 },
        ],
      },
      {
        group: '后端与存储',
        accent: ACCENT.backend,
        items: [
          { name: 'REST 接口设计与联调', level: 84 },
          { name: 'MySQL · SQLite', level: 82 },
          { name: '对接 Spring Boot / Flowable', level: 75 },
          { name: 'PostgreSQL · Redis', level: 74 },
          { name: 'Elasticsearch', level: 70 },
        ],
      },
      {
        group: '语言与工具',
        accent: ACCENT.tools,
        items: [
          { name: 'Python', level: 90 },
          { name: 'TypeScript / JavaScript', level: 86 },
          { name: 'C / C++', level: 76 },
          { name: 'Java · SQL', level: 72 },
          { name: 'Git · Linux · Shell', level: 84 },
          { name: 'Postman + Newman', level: 80 },
        ],
      },
    ],

    projects: [
      {
        id: 'edge-voice',
        title: '端侧离线大模型语音助手',
        kind: '个人项目 · ESP32-S3',
        year: '2026.03 — 2026.06',
        accent: ACCENT.llm,
        shape: 'tower',
        summary: '在完全断网、不调用任何云 API 的前提下，跑通完整的语音对话链路。',
        problem:
          '要在单片机上跑通一条完整语音链路：唤醒、识别、大模型、语音回复，而这块硬件单独跑不动其中任何一步，且全程不能联网。',
        approach:
          '基于开源「小智（Xiaozhi）」固件二次开发。硬件算力有限，无法独立完成模型推理，于是做分工：开发板负责唤醒、音频采集与 I2S 播放，本地工作站通过 Ollama 承担推理任务，两端用 WebSocket 流式通信，数据不出本地网络。整段文本合成完再播放会产生长时间静默，因此改用流式输出：模型返回首批内容即开始播放。',
        outcome: [
          '完整链路全程离线运行，数据不出本地网络',
          '改用流式播放后，消除了回复前的长时间静默',
          '定位到一个反复出现的故障源于模型权重文件下载不全，并完成修复',
          '完成课程现场答辩并交付实物设备，配套中英双语项目报告与安装使用手册',
        ],
        stack: ['ESP32-S3', 'C/C++', 'Ollama', 'WebSocket', 'I2S', '语音识别 / 合成'],
        links: [{ label: 'GitHub', url: shared.github }],
        metrics: [
          { k: '云端调用', v: '0' },
          { k: '离线运行', v: '100%' },
          { k: '播放方式', v: '流式' },
        ],
      },
      {
        id: 'irb-smart',
        title: 'IRB Smart 医院临床研究伦理审查平台',
        kind: '实习项目 · 东软集团（南昌）',
        year: '2026.07 — 2026.09',
        accent: ACCENT.governance,
        shape: 'slab',
        summary: '面向省级医院伦理委员会的审查系统。我负责秘书模块（约 25 个页面）及其中 AI 预审能力的接入。',
        problem:
          '医院伦理审查原本依赖会议与纸质流程。平台要把这套流程搬到线上，同时不能丢掉让它成立的责任链；AI 要有用，但不能自己做决定。',
        approach:
          '用 Vue 3、TypeScript、Pinia 与 Element Plus 实现秘书端模块，对接 Java 21 / Spring Boot 3 后端，审查流程由 Flowable 工作流驱动，底层为 PostgreSQL、Redis 与 Elasticsearch。AI 预审作为辅助接入：结论交由人工审查员判断，能力可关闭，每条建议都留痕可追溯。',
        outcome: [
          '交付秘书模块约 25 个页面，对接线上 Flowable 审查流程',
          'AI 预审以可关闭、可追溯的辅助形式接入，而非自动决策',
          '校企联合实习，指导老师为南昌大学软件学院副院长夏旻林教授',
        ],
        stack: ['Vue 3', 'TypeScript', 'Pinia', 'Element Plus', 'Axios', 'Spring Boot 3', 'Flowable', 'PostgreSQL', 'Redis', 'Elasticsearch'],
        links: [],
        metrics: [
          { k: '负责页面', v: '约 25' },
          { k: '周期', v: '3 个月' },
          { k: 'AI 定位', v: '辅助' },
        ],
      },
      {
        id: 'text-mining',
        title: '中文文本挖掘与主题建模流水线',
        kind: '全国竞赛课题 · 技术负责',
        year: '2025.10 — 2026.05',
        accent: ACCENT.nlp,
        shape: 'ring',
        summary: '面向「药食同源」消费议题，从零搭建中文语料采集到无监督主题发现的完整流程。',
        problem: '网页文本噪声大，正文中混杂导航与广告；而无监督主题建模没有标准答案可以对照。',
        approach:
          '用 Python 打通采集到分析：requests、BeautifulSoup 与 lxml 负责采集，再用正则抽取与过滤规则、停用词词典去噪，jieba 分词，gensim LDA 建模。没有标注可评分，于是结合业务关键词反复迭代参数，直到主题可解释；我负责模型构建，把定性结论转化为可量化的结果。',
        outcome: [
          '支撑作品获「正大杯」第十六届全国大学生市场调查与分析大赛全国二等奖',
          '赛事覆盖全国 360,000+ 学生、1,200+ 高校',
          '清洗规则显著提升了文本数据集质量',
          '把定性话语转化为可量化、可解释的主题',
        ],
        stack: ['Python', 'jieba', 'gensim (LDA)', 'pandas', 'requests', 'BeautifulSoup', 'lxml', 'matplotlib'],
        links: [],
        metrics: [
          { k: '奖项', v: '全国二等' },
          { k: '参赛规模', v: '36 万+' },
          { k: '角色', v: '技术负责' },
        ],
      },
      {
        id: 'vr-racer',
        title: '手势驱动 VR 赛车',
        kind: '个人项目 · PICO 4 移植',
        year: '2026.06',
        accent: ACCENT.edge,
        shape: 'shard',
        summary: '用双手手势驾驶的 VR 赛车，并移植到 PICO 4。',
        problem: '手势转向要连续可控，而手部跟踪恰恰在最需要的时候掉置信度——过弯中、手背向头显时。',
        approach:
          '基于 Unity 6（URP），使用 OpenXR、XR Hands 与 XR Interaction Toolkit，通过 IL2CPP 构建 ARM64 的 Android 包。转向角由双手掌心向量投影到头显平面计算得到，是连续角度而非离散手势；当手部跟踪置信度不足时自动切换为手柄输入。',
        outcome: ['以双手掌心向量计算连续转向角，而非离散手势', '跟踪置信度下降时自动回落到手柄输入', '完成 PICO 4 真机移植与实测'],
        stack: ['Unity 6 (URP)', 'OpenXR', 'XR Hands', 'XR Interaction Toolkit', 'Android', 'IL2CPP', 'ARM64'],
        links: [],
        metrics: [
          { k: '平台', v: 'PICO 4' },
          { k: '输入', v: '手势' },
          { k: '回落', v: '自动' },
        ],
      },
    ],

    experience: [
      {
        company: '东软集团（南昌）有限公司',
        role: 'AI 应用前端开发实习生',
        period: '2026.07 — 2026.09',
        location: '南昌 · 校企联合实习',
        accent: ACCENT.governance,
        blurb:
          'IRB Smart 医院临床研究伦理审查平台，面向省级医院伦理委员会。指导老师：南昌大学软件学院副院长夏旻林教授。',
        highlights: [
          '负责秘书模块（约 25 个页面），技术栈 Vue 3、TypeScript、Pinia、Element Plus。',
          '将 AI 预审能力以可关闭、可追溯的辅助形式接入人工审查流程。',
          '对接 Java 21 / Spring Boot 3 后端，Flowable 工作流、PostgreSQL、Redis 与 Elasticsearch。',
        ],
      },
      {
        company: '中央广播电视总台（CCTV）· 新华网',
        role: '出镜参与',
        period: '2026.05 — 2026.07',
        location: '抚州 · 江西',
        accent: ACCENT.nlp,
        blurb: '工程之外的文化与传播实践。',
        highlights: [
          '2026.07 配合中央广播电视总台（CCTV）拍摄抚州市文旅推广内容。',
          '2026.05 参与新华网古籍修复专题拍摄。',
        ],
      },
      {
        company: '北京华语时代文化传媒有限公司',
        role: '国际青年自媒体达人（合作意向）',
        period: '2025.12',
        location: '北京',
        accent: ACCENT.frontend,
        blurb: '中国外文局下属华语教学出版社控股国企。',
        highlights: ['签署国际青年自媒体达人合作意向书。'],
      },
      {
        company: '南昌大学',
        role: '双语主持人 · 班长',
        period: '2023 — 2025',
        location: '江西',
        accent: ACCENT.llm,
        blurb: '学生工作与双语表达。',
        highlights: [
          '2025.09 江西省中外人文交流周「世界青年说」文化沙龙双语主持人，面向省内 14 所高校。',
          '2023—2024 软件学院班长。',
        ],
      },
    ],

    education: [
      {
        school: '南昌大学 软件学院',
        credential: '软件工程专业 · 全英文授课国际本科班 · 工学学士',
        period: '2023.09 — 2027.07（预计）',
        detail:
          '国家「双一流」建设高校、211 工程高校。优势课程：Web 前端开发实践 95 · 物联网技术基础 93 · 算法分析与设计 89 · 工程伦理与网络安全法规 89 · Python 程序设计 87 · 离散数学 87 · 数据库原理 85 · 概率论与数理统计 85。',
      },
      {
        school: '语言能力',
        credential: '雅思学术类 7.5（口语 8.0、听力 8.5）',
        period: '当前',
        detail:
          '英语：全英文授课学位，可独立撰写英文技术文档。中文：可流利胜任中文工作环境，具备中英双语技术撰写与双语主持能力（HSK5 备考中）。乌尔都语：母语。',
      },
    ],

    research: {
      heading: '获奖与研究',
      lead: '竞赛成绩，以及支撑我做受监管系统的 AI 治理研究。',
      items: [
        {
          title: '全国一等奖 — 第四届「旅游 + 中文」视频征集活动',
          date: '2026.05',
          kind: '奖项',
          tags: ['全国一等奖', '优秀作品奖'],
          excerpt: '教育部中外语言交流合作中心主办，同时获全国一等奖与优秀作品奖。',
          url: '#',
        },
        {
          title: '全国二等奖 — 「正大杯」第十六届全国大学生市场调查与分析大赛',
          date: '2026.05',
          kind: '奖项',
          tags: ['全国二等奖', '36 万+ 参赛'],
          excerpt:
            '担任作品背后中文文本挖掘与主题建模流水线的技术负责人。赛事覆盖全国 360,000+ 学生、1,200+ 高校。',
          url: '#',
        },
        {
          title: '《智能社交平台「热点推送」算法的伦理困境与规制边界》',
          date: '2026',
          kind: 'AI 治理研究报告',
          tags: ['AI 治理', '课程成绩 89'],
          excerpt:
            '依据 ACM/IEEE 软件工程伦理准则、《个人信息保护法》与《互联网信息服务算法推荐管理规定》，分析信息茧房、算法偏见与未成年人保护，并提出把伦理审查嵌入软件生命周期的落地框架。',
          url: '#',
        },
        {
          title: '学术推荐',
          date: '可提供',
          kind: '推荐信',
          tags: ['南昌大学'],
          excerpt: '可提供南昌大学软件学院冯剑教授、饶泓教授推荐信。',
          url: '#',
        },
      ],
    },

    contact: {
      heading: '联系我',
      lead: '求职方向：AI 全栈开发 / 大模型应用开发 / 端侧 AI / AI 应用前端——当前求实习，2027 届校招。',
      responseTime: '邮箱与微信都可联系',
    },

    ui: {
      zones: {
        hero: '首页',
        about: '关于',
        skills: '技能',
        projects: '项目',
        experience: '经历',
        research: '获奖',
        contact: '联系',
      },
      zoneLabels: {
        hero: '入口',
        about: '核心',
        skills: '阵列',
        projects: '展厅',
        experience: '时间线',
        research: '信号',
        contact: '信标',
      },
      scroll: '滚动',
      walk: '漫游',
      tour: '自动导览',
      tourStop: '停止导览',
      quality: '画质',
      resume: '简历',
      enter: '进入世界',
      building: '正在构建世界…',
      loaderNote: '建议使用键盘体验。手机端也可以——提供虚拟摇杆。',
      close: '按 Esc 关闭',
      promptTour: '自动导览进行中——滚动或点击任意位置即可接管',
      promptWalk: 'WASD 移动 · 拖动视角 · Shift 加速',
      promptWalkTouch: '拖动看向四周 · 摇杆移动',
      promptRail: '滚动前进 · 点击任意结构查看详情',
      promptRailTouch: '上滑前进 · 点击结构查看详情',
      promptOpen: (zone) => `按 E 打开${zone}`,
      promptOpenTouch: (zone) => `点击标记打开${zone}`,
      open: '打开',
      sectionWork: '项目作品',
      caseStudies: (n) => `${n} 个项目 · 点击任意结构`,
      clickToOpen: '点击查看项目详情',
      aboutHint: '查看完整介绍',
      skillsHint: '查看完整技能矩阵',
      experienceHint: '完整经历与教育背景',
      researchHint: '全部获奖与研究',
      contactHint: '打开联系方式',
      skillsSub: '不是词云——柱高为自评熟练度。',
      experienceSub: '时间都花在了这里。',
      researchSub: '奖项，以及背后的治理研究。',
      contactHeadline: '一起做点东西',
      problem: '问题',
      approach: '我做了什么',
      outcomeLabel: '成果',
      educationHeading: '教育背景与语言能力',
      downloadResume: '下载简历',
      downloadResumePdf: '下载简历（PDF）',
      emailMe: '发邮件给我',
      startEmail: '写邮件',
      skillsNote: '均为自评熟练度。低于 70 表示能用它工作，但还谈不上精通。',
      targetRolesLabel: '目标岗位',
      targetCitiesLabel: '意向城市',
      availabilityLabel: '到岗时间',
      help: {
        title: '如何浏览',
        kicker: '操作说明',
        railTitle: '滚动模式',
        railItems: ['滚动或 ↑ ↓ 沿路径前进', '点击结构查看详情', '点击左侧导航直接跳转'],
        walkTitle: '漫游模式',
        walkItems: ['W A S D 移动', '拖动鼠标转动视角', 'Shift 加速', 'E 打开身边的内容'],
        anyTitle: '通用',
        anyItems: ['Esc 关闭面板', '? 打开此说明', '自动导览会带你走完全程', '帧率下降时可降低画质'],
        touchTitle: '手机端',
        touchItems: ['滑动前进', '漫游模式提供虚拟摇杆', '点击结构查看详情'],
      },
    },
  },
}

export const DEFAULT_LANG = 'en'

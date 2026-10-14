import type { Content } from './types'

const shared = {
  email: 'kanwar.wajid13@gmail.com',
  phone: '+86 132 5709 6719',
  wechat: 'kanwar_18',
  github: 'https://github.com/SylusZephyr',
  githubHandle: 'SylusZephyr',
  initials: 'WK',
}

export const zh: Content = {
  profile: {
    name: '万吉',
    altName: 'Wajid Kanwar Abdul',
    initials: shared.initials,
    role: 'AI 全栈开发工程师',
    roleLong: 'AI 全栈开发工程师 · 2027 届本科应届',
    headline: '我做的是「把模型接到用户面前」的完整链路',
    tagline:
      '本地推理、流式传输、接口集成、产品界面、审计合规——离线语音设备与强监管审查模块，是同一条链路的两个切面。',
    location: '现居江西南昌',
    nationality: '巴基斯坦籍 · 2004.03',
    availabilityNote: '求职实习与 2027 届校园招聘',
    availabilityDetail: '2026 年 10 月至次年 3 月寒假可全职实习，可远程。',
    targetRoles: 'AI 全栈开发 · 大模型应用 · 端侧 AI · AI 应用前端',
    targetCities: '杭州 · 上海 · 深圳 · 北京 · 南昌',
    email: shared.email,
    phone: shared.phone,
    wechat: shared.wechat,
    github: shared.github,
    githubHandle: shared.githubHandle,
    resumeUrl: 'resume.pdf',
  },

  nav: [
    { label: '关于', href: '#about' },
    { label: '项目', href: '#work' },
    { label: '经历', href: '#experience' },
    { label: '技能', href: '#skills' },
    { label: '联系', href: '#contact' },
  ],

  hero: {
    eyebrow: 'AI 全栈开发工程师 · 南昌大学 · 2027 届',
    headlineWords: '我做的是「把模型接到用户面前」的完整链路。',
    sub: '端侧 AI、大模型应用，以及让它们真正能上线的合规能力。我是万吉——用两种语言写文档，在三种语言之间工作。',
    primaryCta: '查看项目',
    secondaryCta: '下载简历',
    stats: [
      { value: '4', label: '落地项目' },
      { value: '2', label: '国家级奖项' },
      { value: '7.5', label: '雅思学术类' },
      { value: '2027', label: '毕业年份' },
    ],
  },

  about: {
    eyebrow: '关于我',
    heading: '我到底在做什么',
    cards: [
      {
        id: 'chain',
        title: '一条完整的链路',
        description: '我做的每个项目都走同一条路。每一步我至少做过两遍——一次在硬件受限下，一次在强监管下。',
        className: 'md:col-span-4 lg:col-span-4 lg:row-span-2',
        variant: 'chain',
      },
      {
        id: 'stack',
        title: '常用技术栈',
        description: '不用查文档就能上手的部分。',
        className: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
        variant: 'stack',
      },
      {
        id: 'location',
        title: '现居南昌，可赴杭州、上海、深圳、北京',
        description: '2026 年 10 月起可全职实习，亦可远程。',
        className: 'md:col-span-3 lg:col-span-2 lg:row-span-1',
        variant: 'location',
      },
      {
        id: 'bilingual',
        title: '两种工作语言',
        description: '三年在华学习与协作。既能在中文团队内部推进工作，也能独立承担产品的英文文档与国际化落地。',
        className: 'md:col-span-3 lg:col-span-2 lg:row-span-1',
        variant: 'bilingual',
      },
      {
        id: 'quote',
        title: 'AI 落地的边界',
        description: '',
        className: 'md:col-span-4 lg:col-span-4 lg:row-span-1',
        variant: 'quote',
      },
      {
        id: 'cta',
        title: '想了解更多？',
        description: '欢迎来信。',
        className: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
        variant: 'cta',
      },
    ],
    chainSteps: ['本地推理部署', '流式传输', '接口集成', '产品界面', '审计与合规'],
    quote:
      '我清楚什么该放在端上、什么该推到推理侧，也清楚在受监管业务里 AI 辅助必须可关闭、可追溯。这两点都是用实际调试时间换来的。',
    ctaCopied: '已复制',
    ctaLabel: '复制邮箱',
  },

  projects: {
    eyebrow: '项目作品',
    heading: '四个项目，以及它们各自踩过的坑',
    sub: '每个项目里都有一次真实的失败。工程能力就在那里。',
    labels: {
      problem: '问题',
      approach: '我做了什么',
      outcome: '成果',
      stack: '技术栈',
      close: '关闭',
      open: '查看项目详情',
    },
    items: [
      {
        id: 'edge-voice',
        title: '端侧离线大模型语音助手',
        kind: '个人项目 · ESP32-S3',
        period: '2026.03 — 2026.06',
        accent: '#22d3ee',
        gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent',
        featured: true,
        summary: '在完全断网、不调用任何云 API 的前提下，跑通完整的语音对话链路。',
        problem:
          '要在单片机上跑通一条完整语音链路：唤醒、识别、大模型、语音回复，而这块硬件单独跑不动其中任何一步，且全程不能联网。',
        approach:
          '基于开源「小智」固件二次开发。硬件算力有限，于是做分工：开发板负责唤醒、音频采集与 I2S 播放，本地工作站通过 Ollama 承担推理，两端用 WebSocket 流式通信，数据不出本地网络。整段文本合成完再播放会产生长时间静默，因此改用流式输出：模型返回首批内容即开始播放。',
        outcome: [
          '完整链路全程离线运行，数据不出本地网络',
          '改用流式播放后，消除了回复前的长时间静默',
          '定位到反复出现的故障源于模型权重文件下载不全，并完成修复',
          '完成课程现场答辩并交付实物设备，配套中英双语项目报告与安装手册',
        ],
        stack: ['ESP32-S3', 'C/C++', 'Ollama', 'WebSocket', 'I2S', '语音识别 / 合成'],
        metrics: [
          { value: '0', label: '云端调用' },
          { value: '100%', label: '离线运行' },
          { value: '流式', label: '播放方式' },
        ],
        links: [{ label: 'GitHub', url: shared.github }],
      },
      {
        id: 'irb-smart',
        title: 'IRB Smart 医院临床研究伦理审查平台',
        kind: '实习项目 · 东软集团（南昌）',
        period: '2026.07 — 2026.09',
        accent: '#f59e0b',
        gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
        featured: true,
        summary: '面向省级医院伦理委员会的审查系统。我负责秘书模块（约 25 个页面）及其中 AI 预审能力的接入。',
        problem:
          '医院伦理审查原本依赖会议与纸质流程。平台要把流程搬到线上，同时不能丢掉让它成立的责任链；AI 要有用，但不能自己做决定。',
        approach:
          '用 Vue 3、TypeScript、Pinia 与 Element Plus 实现秘书端模块，对接 Java 21 / Spring Boot 3 后端，审查流程由 Flowable 工作流驱动，底层为 PostgreSQL、Redis 与 Elasticsearch。AI 预审作为辅助接入：结论交由人工判断，能力可关闭，每条建议都留痕可追溯。',
        outcome: [
          '交付秘书模块约 25 个页面，对接线上 Flowable 审查流程',
          'AI 预审以可关闭、可追溯的辅助形式接入，而非自动决策',
          '校企联合实习，由软件学院副院长担任指导老师',
        ],
        stack: ['Vue 3', 'TypeScript', 'Pinia', 'Element Plus', 'Spring Boot 3', 'Flowable', 'PostgreSQL', 'Redis', 'Elasticsearch'],
        metrics: [
          { value: '约 25', label: '负责页面' },
          { value: '3 个月', label: '周期' },
          { value: '辅助', label: 'AI 定位' },
        ],
        links: [],
      },
      {
        id: 'text-mining',
        title: '中文文本挖掘与主题建模流水线',
        kind: '全国竞赛课题 · 技术负责',
        period: '2025.10 — 2026.05',
        accent: '#a855f7',
        gradient: 'from-purple-500/20 via-fuchsia-500/10 to-transparent',
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
        stack: ['Python', 'jieba', 'gensim (LDA)', 'pandas', 'BeautifulSoup', 'matplotlib'],
        metrics: [
          { value: '全国二等', label: '奖项' },
          { value: '36 万+', label: '参赛规模' },
          { value: '技术负责', label: '角色' },
        ],
        links: [],
      },
      {
        id: 'vr-racer',
        title: '手势驱动 VR 赛车',
        kind: '个人项目 · PICO 4 移植',
        period: '2026.06',
        accent: '#34d399',
        gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
        summary: '用双手手势驾驶的 VR 赛车，并移植到 PICO 4。',
        problem: '手势转向要连续可控，而手部跟踪恰恰在最需要的时候掉置信度——过弯中、手背向头显时。',
        approach:
          '基于 Unity 6（URP），使用 OpenXR、XR Hands 与 XR Interaction Toolkit，通过 IL2CPP 构建 ARM64 的 Android 包。转向角由双手掌心向量投影到头显平面计算得到，是连续角度而非离散手势；当手部跟踪置信度不足时自动切换为手柄输入。',
        outcome: ['以双手掌心向量计算连续转向角，而非离散手势', '跟踪置信度下降时自动回落到手柄输入', '完成 PICO 4 真机移植与实测'],
        stack: ['Unity 6 (URP)', 'OpenXR', 'XR Hands', 'IL2CPP', 'ARM64'],
        metrics: [
          { value: 'PICO 4', label: '平台' },
          { value: '手势', label: '输入' },
          { value: '自动', label: '回落' },
        ],
        links: [],
      },
    ],
  },

  experience: {
    eyebrow: '经历',
    heading: '时间都花在了这里',
    sub: '工程之外，还有支撑我双语能力的媒体实践。',
    items: [
      {
        company: '东软集团（南昌）',
        role: 'AI 应用前端开发实习生',
        period: '2026.07 — 2026.09',
        location: '南昌 · 校企联合实习',
        blurb: 'IRB Smart 医院临床研究伦理审查平台，面向省级医院伦理委员会。',
        highlights: [
          '负责秘书模块（约 25 个页面），技术栈 Vue 3、TypeScript、Pinia、Element Plus。',
          '将 AI 预审以可关闭、可追溯的辅助形式接入人工审查流程。',
          '对接 Java 21 / Spring Boot 3 后端，Flowable 工作流、PostgreSQL、Redis 与 Elasticsearch。',
        ],
      },
      {
        company: '中央广播电视总台（CCTV）· 新华网',
        role: '出镜参与',
        period: '2026.05 — 2026.07',
        location: '抚州 · 江西',
        blurb: '工程之外的文化与传播实践。',
        highlights: ['配合中央广播电视总台拍摄抚州市文旅推广内容。', '参与新华网古籍修复专题拍摄。'],
      },
      {
        company: '北京华语时代文化传媒',
        role: '国际青年自媒体达人',
        period: '2025.12',
        location: '北京 · 合作意向',
        blurb: '中国外文局下属华语教学出版社控股国企。',
        highlights: ['签署国际青年自媒体达人合作意向书。'],
      },
      {
        company: '南昌大学',
        role: '双语主持人 · 班长',
        period: '2023 — 2025',
        location: '江西',
        blurb: '学生工作与双语表达。',
        highlights: [
          '江西省中外人文交流周「世界青年说」文化沙龙双语主持人，面向省内 14 所高校。',
          '2023—2024 软件学院班长。',
        ],
      },
    ],
  },

  skills: {
    eyebrow: '技能',
    heading: '不是词云，是深度',
    sub: '均为自评熟练度。低于 70 表示能用它工作，但还谈不上精通。',
    groups: [
      {
        group: '大模型应用',
        accent: '#22d3ee',
        items: [
          { name: '本地部署（Ollama）', level: 88 },
          { name: '语音识别 → 大模型 → 合成', level: 85 },
          { name: '流式传输与首字延迟', level: 82 },
          { name: 'REST 接入业务系统', level: 86 },
        ],
      },
      {
        group: '端侧 / 边缘 AI',
        accent: '#a855f7',
        items: [
          { name: 'ESP32-S3', level: 84 },
          { name: 'C / C++ 固件开发', level: 78 },
          { name: 'WebSocket 流式通信', level: 85 },
          { name: '受限资源下的架构取舍', level: 82 },
        ],
      },
      {
        group: 'NLP 与数据',
        accent: '#f472b6',
        items: [
          { name: 'jieba 中文分词', level: 86 },
          { name: 'gensim / LDA 主题建模', level: 83 },
          { name: 'pandas 清洗与特征', level: 85 },
          { name: 'requests / BeautifulSoup', level: 88 },
        ],
      },
      {
        group: 'AI 合规与治理',
        accent: '#f59e0b',
        items: [
          { name: '算法推荐伦理与规制', level: 85 },
          { name: '《个人信息保护法》与算法规定', level: 82 },
          { name: 'AI 决策的审计留痕', level: 80 },
          { name: 'ACM / IEEE 伦理准则', level: 83 },
        ],
      },
      {
        group: '前端工程',
        accent: '#38bdf8',
        items: [
          { name: 'Vue 3', level: 90 },
          { name: 'TypeScript', level: 85 },
          { name: 'Pinia / Vue Router', level: 86 },
          { name: 'Element Plus', level: 88 },
        ],
      },
      {
        group: '后端与存储',
        accent: '#34d399',
        items: [
          { name: 'REST 接口设计与联调', level: 84 },
          { name: 'MySQL · SQLite', level: 82 },
          { name: 'Spring Boot / Flowable', level: 75 },
          { name: 'PostgreSQL · Redis', level: 74 },
        ],
      },
    ],
  },

  awards: {
    eyebrow: '获奖与研究',
    heading: '凭据',
    sub: '竞赛成绩，以及支撑我做受监管系统的治理研究。',
    educationHeading: '教育背景与语言能力',
    items: [
      {
        title: '全国一等奖 — 第四届「旅游 + 中文」视频征集活动',
        date: '2026.05',
        kind: '奖项',
        tags: ['全国一等奖', '优秀作品奖'],
        detail: '教育部中外语言交流合作中心主办，同时获全国一等奖与优秀作品奖。',
      },
      {
        title: '全国二等奖 — 「正大杯」第十六届全国大学生市场调查与分析大赛',
        date: '2026.05',
        kind: '奖项',
        tags: ['全国二等奖', '36 万+ 参赛'],
        detail: '担任作品背后中文文本挖掘与主题建模流水线的技术负责人。赛事覆盖全国 360,000+ 学生、1,200+ 高校。',
      },
      {
        title: '《智能社交平台「热点推送」算法的伦理困境与规制边界》',
        date: '2026',
        kind: 'AI 治理研究报告',
        tags: ['AI 治理', '课程成绩 89'],
        detail:
          '依据 ACM/IEEE 软件工程伦理准则、《个人信息保护法》与《互联网信息服务算法推荐管理规定》，分析信息茧房、算法偏见与未成年人保护，并提出把伦理审查嵌入软件生命周期的落地框架。',
      },
      {
        title: '可提供学术推荐信',
        date: '可提供',
        kind: '推荐信',
        tags: ['南昌大学'],
        detail: '可提供南昌大学软件学院两位教授的推荐信。',
      },
    ],
    education: [
      {
        school: '南昌大学 软件学院',
        credential: '软件工程 · 全英文授课国际本科班 · 工学学士',
        period: '2023.09 — 2027.07（预计）',
        detail:
          '国家「双一流」建设高校、211 工程高校。Web 前端开发实践 95 · 物联网技术基础 93 · 算法分析与设计 89 · 工程伦理与网络安全法规 89 · Python 87 · 离散数学 87。',
      },
      {
        school: '语言能力',
        credential: '雅思学术类 7.5（口语 8.0、听力 8.5）',
        period: '当前',
        detail:
          '英语：全英文授课学位，可独立撰写英文技术文档。中文：可流利胜任中文工作环境，具备中英双语技术撰写与双语主持能力（HSK5 备考中）。乌尔都语：母语。',
      },
    ],
  },

  contact: {
    eyebrow: '联系',
    heading: '把你一直搁置的那件事交给我',
    sub: '求职方向：AI 全栈开发 / 大模型应用 / 端侧 AI / AI 应用前端。当前求实习，2027 届校招。',
    emailCta: '发邮件',
    resumeCta: '下载简历',
    copied: '已复制到剪贴板',
    availability: '2026 年 10 月起可实习',
    citiesLabel: '意向城市',
    rolesLabel: '目标岗位',
  },

  footer: {
    rights: '万吉 · Wajid Kanwar Abdul',
    built: '使用 Next.js、Tailwind 与 Motion 构建。',
  },
}

import { useEffect } from 'react'
import { setState, useStore } from '../store.js'
import { useContent } from '../data/useContent.js'
import { zoneById } from '../world/config.js'

/* ───────────────── shell ───────────────── */

function Panel({ title, kicker, accent, children, wide }) {
  const { ui } = useContent()
  return (
    <div className={`panel${wide ? ' panel-wide' : ''}`} style={{ '--accent': accent || '#38f8d4' }}>
      <header className="panel-head">
        {kicker && <span className="panel-kicker">{kicker}</span>}
        <h2>{title}</h2>
        <button className="panel-close" onClick={() => setState({ openPanel: null, showHelp: false })} aria-label="Close">
          ✕
        </button>
      </header>
      <div className="panel-body">{children}</div>
      <footer className="panel-foot">
        <span>{ui.close}</span>
      </footer>
    </div>
  )
}

/* ───────────────── content ───────────────── */

function AboutPanel() {
  const { about, profile, ui } = useContent()
  return (
    <Panel title={about.heading} kicker={ui.zoneLabels.about} accent={zoneById.about.accent}>
      <p className="lead">{about.lead}</p>
      {about.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      <div className="fact-grid">
        {about.facts.map((f) => (
          <div key={f.k} className="fact">
            <strong>{f.v}</strong>
            <span>{f.k}</span>
          </div>
        ))}
      </div>

      <div className="detail-list">
        <div>
          <span className="detail-key">{ui.targetRolesLabel}</span>
          <span>{profile.targetRoles}</span>
        </div>
        <div>
          <span className="detail-key">{ui.targetCitiesLabel}</span>
          <span>{profile.targetCities}</span>
        </div>
        <div>
          <span className="detail-key">{ui.availabilityLabel}</span>
          <span>{profile.availabilityDetail}</span>
        </div>
      </div>

      <div className="panel-actions">
        <a className="btn primary" href={profile.resumeUrl} download>
          {ui.downloadResume}
        </a>
        <a className="btn" href={`mailto:${profile.email}`}>
          {ui.emailMe}
        </a>
      </div>
    </Panel>
  )
}

function SkillsPanel() {
  const { skills, ui } = useContent()
  return (
    <Panel title={ui.zones.skills} kicker={ui.zoneLabels.skills} accent={zoneById.skills.accent} wide>
      <p className="lead">{ui.skillsNote}</p>
      <div className="skill-cols">
        {skills.map((g) => (
          <section key={g.group} style={{ '--accent': g.accent }}>
            <h3>{g.group}</h3>
            {g.items.map((it) => (
              <div key={it.name} className="bar-row">
                <span className="bar-name">{it.name}</span>
                <span className="bar-track">
                  <span className="bar-fill" style={{ width: `${it.level}%` }} />
                </span>
                <span className="bar-val">{it.level}</span>
              </div>
            ))}
          </section>
        ))}
      </div>
    </Panel>
  )
}

function ExperiencePanel() {
  const { experience, education, profile, ui } = useContent()
  return (
    <Panel title={ui.zones.experience} kicker={ui.zoneLabels.experience} accent={zoneById.experience.accent} wide>
      <div className="timeline">
        {experience.map((job) => (
          <article key={job.company} style={{ '--accent': job.accent }}>
            <div className="tl-head">
              <h3>{job.company}</h3>
              <span className="tl-period">{job.period}</span>
            </div>
            <p className="tl-role">
              {job.role} · {job.location}
            </p>
            <p className="tl-blurb">{job.blurb}</p>
            <ul>
              {job.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <h3 className="section-split">{ui.educationHeading}</h3>
      <div className="edu-grid">
        {education.map((e) => (
          <div key={e.credential} className="edu">
            <strong>{e.credential}</strong>
            <span className="edu-school">
              {e.school} · {e.period}
            </span>
            <p>{e.detail}</p>
          </div>
        ))}
      </div>

      <div className="panel-actions">
        <a className="btn primary" href={profile.resumeUrl} download>
          {ui.downloadResumePdf}
        </a>
      </div>
    </Panel>
  )
}

function ResearchPanel() {
  const { research, ui } = useContent()
  return (
    <Panel title={research.heading} kicker={ui.zoneLabels.research} accent={zoneById.research.accent} wide>
      <p className="lead">{research.lead}</p>
      <div className="post-list">
        {research.items.map((p) => (
          <article key={p.title} className="post">
            <div className="post-meta">
              <span>{p.date}</span>
              <span>{p.kind}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.excerpt}</p>
            <div className="tag-row">
              {p.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Panel>
  )
}

function ContactPanel() {
  const { contact, profile, ui } = useContent()
  return (
    <Panel title={contact.heading} kicker={ui.zoneLabels.contact} accent={zoneById.contact.accent}>
      <p className="lead">{contact.lead}</p>
      {profile.available && (
        <div className="availability">
          <span className="pulse" /> {profile.availabilityNote}
        </div>
      )}
      <div className="social-list">
        {profile.socials.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target={s.url.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer noopener"
            className="social"
          >
            <span className="social-label">{s.label}</span>
            <span className="social-handle">{s.handle}</span>
            <span className="social-arrow">↗</span>
          </a>
        ))}
      </div>
      <p className="muted">
        {contact.responseTime} · {profile.location}
      </p>
      <div className="panel-actions">
        <a className="btn primary" href={`mailto:${profile.email}`}>
          {ui.startEmail}
        </a>
        <a className="btn" href={profile.resumeUrl} download>
          {ui.resume}
        </a>
      </div>
    </Panel>
  )
}

function ProjectPanel({ id }) {
  const { projects, ui } = useContent()
  const p = projects.find((x) => x.id === id)
  if (!p) return null
  return (
    <Panel title={p.title} kicker={`${p.kind} · ${p.year}`} accent={p.accent} wide>
      <p className="lead">{p.summary}</p>

      <div className="metric-row">
        {p.metrics.map((m) => (
          <div key={m.k} className="metric">
            <strong>{m.v}</strong>
            <span>{m.k}</span>
          </div>
        ))}
      </div>

      <div className="case">
        <section>
          <h3>{ui.problem}</h3>
          <p>{p.problem}</p>
        </section>
        <section>
          <h3>{ui.approach}</h3>
          <p>{p.approach}</p>
        </section>
        <section>
          <h3>{ui.outcomeLabel}</h3>
          <ul>
            {p.outcome.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="tag-row">
        {p.stack.map((s) => (
          <span key={s} className="tag">
            {s}
          </span>
        ))}
      </div>

      {p.links.length > 0 && (
        <div className="panel-actions">
          {p.links.map((l) => (
            <a key={l.label} className="btn" href={l.url} target="_blank" rel="noreferrer noopener">
              {l.label} ↗
            </a>
          ))}
        </div>
      )}

      <div className="project-switch">
        {projects
          .filter((x) => x.id !== p.id)
          .map((x) => (
            <button key={x.id} style={{ '--accent': x.accent }} onClick={() => setState({ openPanel: `project:${x.id}` })}>
              {x.title}
            </button>
          ))}
      </div>
    </Panel>
  )
}

function HelpPanel() {
  const { ui } = useContent()
  const h = ui.help
  const cols = [
    { title: h.railTitle, items: h.railItems },
    { title: h.walkTitle, items: h.walkItems },
    { title: h.anyTitle, items: h.anyItems },
    { title: h.touchTitle, items: h.touchItems },
  ]
  return (
    <Panel title={h.title} kicker={h.kicker} accent="#7b6cff">
      <div className="help-grid">
        {cols.map((c) => (
          <div key={c.title}>
            <h3>{c.title}</h3>
            <ul>
              {c.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Panel>
  )
}

/* ───────────────── router ───────────────── */

const PANELS = {
  about: AboutPanel,
  skills: SkillsPanel,
  experience: ExperiencePanel,
  research: ResearchPanel,
  contact: ContactPanel,
}

export function PanelLayer() {
  const openPanel = useStore((s) => s.openPanel)
  const showHelp = useStore((s) => s.showHelp)

  useEffect(() => {
    document.body.classList.toggle('panel-open', Boolean(openPanel || showHelp))
  }, [openPanel, showHelp])

  if (showHelp) {
    return (
      <div className="panel-layer" onClick={(e) => e.target === e.currentTarget && setState({ showHelp: false })}>
        <HelpPanel />
      </div>
    )
  }
  if (!openPanel) return null

  let content
  if (openPanel.startsWith('project:')) content = <ProjectPanel id={openPanel.slice(8)} />
  else {
    const C = PANELS[openPanel]
    content = C ? <C /> : null
  }
  if (!content) return null

  return (
    <div className="panel-layer" onClick={(e) => e.target === e.currentTarget && setState({ openPanel: null })}>
      {content}
    </div>
  )
}

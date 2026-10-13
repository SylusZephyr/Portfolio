import { useEffect } from 'react'
import { setState, useStore } from '../store.js'
import { about, skills, experience, education, posts, projects, profile, contact } from '../data/portfolio.js'
import { zoneById } from '../world/config.js'

/* ───────────────── shell ───────────────── */

function Panel({ title, kicker, accent, children, wide }) {
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
        <span>Esc to close</span>
      </footer>
    </div>
  )
}

/* ───────────────── content ───────────────── */

function AboutPanel() {
  return (
    <Panel title={about.heading} kicker="Core" accent={zoneById.about.accent}>
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
      <div className="panel-actions">
        <a className="btn primary" href={profile.resumeUrl} download>
          Download résumé
        </a>
        <a className="btn" href={`mailto:${profile.email}`}>
          Email me
        </a>
      </div>
    </Panel>
  )
}

function SkillsPanel() {
  return (
    <Panel title="Skills" kicker="Array" accent={zoneById.skills.accent} wide>
      <p className="lead">Self-assessed fluency. Anything under 70 means I can work in it, not teach it.</p>
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
  return (
    <Panel title="Experience" kicker="Timeline" accent={zoneById.experience.accent} wide>
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
      <h3 className="section-split">Education & certifications</h3>
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
          Download résumé (PDF)
        </a>
      </div>
    </Panel>
  )
}

function BlogPanel() {
  return (
    <Panel title="Writing" kicker="Signals" accent={zoneById.blog.accent} wide>
      <p className="lead">Mostly post-mortems of my own mistakes, which are the only posts worth reading.</p>
      <div className="post-list">
        {posts.map((p) => (
          <a key={p.title} className="post" href={p.url}>
            <div className="post-meta">
              <span>{p.date}</span>
              <span>{p.readingTime}</span>
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
          </a>
        ))}
      </div>
    </Panel>
  )
}

function ContactPanel() {
  return (
    <Panel title={contact.heading} kicker="Beacon" accent={zoneById.contact.accent}>
      <p className="lead">{contact.lead}</p>
      {profile.available && (
        <div className="availability">
          <span className="pulse" /> {profile.availabilityNote}
        </div>
      )}
      <div className="social-list">
        {profile.socials.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer noopener" className="social">
            <span className="social-label">{s.label}</span>
            <span className="social-handle">{s.handle}</span>
            <span className="social-arrow">↗</span>
          </a>
        ))}
      </div>
      <p className="muted">{contact.responseTime} · {profile.location}</p>
      <div className="panel-actions">
        <a className="btn primary" href={`mailto:${profile.email}`}>
          Start an email
        </a>
        <a className="btn" href={profile.resumeUrl} download>
          Résumé
        </a>
      </div>
    </Panel>
  )
}

function ProjectPanel({ id }) {
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
          <h3>The problem</h3>
          <p>{p.problem}</p>
        </section>
        <section>
          <h3>What I did</h3>
          <p>{p.approach}</p>
        </section>
        <section>
          <h3>Outcome</h3>
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

      <div className="panel-actions">
        {p.links.map((l) => (
          <a key={l.label} className="btn" href={l.url} target="_blank" rel="noreferrer noopener">
            {l.label} ↗
          </a>
        ))}
      </div>

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
  return (
    <Panel title="How to get around" kicker="Controls" accent="#7b6cff">
      <div className="help-grid">
        <div>
          <h3>Scroll mode</h3>
          <ul>
            <li><kbd>Scroll</kbd> / <kbd>↑</kbd><kbd>↓</kbd> travel the path</li>
            <li>Click a structure to open it</li>
            <li>Click the left-hand nav to jump</li>
          </ul>
        </div>
        <div>
          <h3>Walk mode</h3>
          <ul>
            <li><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> move</li>
            <li>Drag the mouse to look</li>
            <li><kbd>Shift</kbd> sprint</li>
            <li><kbd>E</kbd> open what you're next to</li>
          </ul>
        </div>
        <div>
          <h3>Anywhere</h3>
          <ul>
            <li><kbd>Esc</kbd> close a panel</li>
            <li><kbd>?</kbd> this help</li>
            <li>Guided tour flies you through everything</li>
            <li>Drop Quality if the frame rate dips</li>
          </ul>
        </div>
        <div>
          <h3>On a phone</h3>
          <ul>
            <li>Swipe to travel</li>
            <li>Walk mode gives you a joystick</li>
            <li>Tap structures to open them</li>
          </ul>
        </div>
      </div>
    </Panel>
  )
}

/* ───────────────── router ───────────────── */

const PANELS = {
  about: AboutPanel,
  skills: SkillsPanel,
  experience: ExperiencePanel,
  blog: BlogPanel,
  contact: ContactPanel,
}

export function PanelLayer() {
  const openPanel = useStore((s) => s.openPanel)
  const showHelp = useStore((s) => s.showHelp)

  // lock page scroll chaining while a panel is open
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

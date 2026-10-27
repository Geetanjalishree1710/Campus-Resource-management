import { useMemo, useState } from 'react'
import './App.css'

const resources = [
  { name: 'Block-4 Seminar Hall', code: 'LAB-204', type: 'Seminar hall', capacity: 42, status: 'Available', accent: 'mint' },
  { name: 'Seminar Hall', code: 'HALL-01', type: 'Seminar hall', capacity: 180, status: 'Booked', accent: 'coral' },
  { name: 'Auditorium', code: 'ROOM-116', type: 'Classroom', capacity: 60, status: 'Available', accent: 'sky' },]

const approvals = [
  { initials: 'AS', name: 'Aarav Shah', purpose: 'Robotics club review', resource: 'Innovation Lab', time: 'Today, 4:00 PM', tone: 'blue' },
  { initials: 'PM', name: 'Prof. Meera Pillai', purpose: 'Guest lecture', resource: 'Seminar Hall', time: 'Tomorrow, 10:30 AM', tone: 'peach' },
  { initials: 'NR', name: 'Nisha Rao', purpose: 'Design sprint', resource: 'North Studio', time: 'Fri, 2:00 PM', tone: 'green' },
]

function AnalyticsDashboard() {
  return (
    <div className="analytics-dashboard">
      <div className="analytics-intro">
        <div><p className="eyebrow">CAMPUS INTELLIGENCE</p><h1>Resource intelligence.</h1>
        <p className="subheading">Turn booking activity into better decisions for your campus.</p></div>
        <button className="filter-button analytics-period">Last 30 days <span>⌄</span></button>
      </div>
      <section className="analytics-highlight">
        <div><span className="analytics-kicker">CAMPUS UTILIZATION SCORE</span><strong>76.4<span>%</span></strong><p>Up 8.2% compared with the previous period</p></div>
        <div className="score-ring"><div><strong>76</strong><small>/ 100</small></div></div>
        <div className="highlight-note"><span>●</span><div><strong>Healthy momentum</strong><small>Usage is growing without creating booking friction.</small></div></div>
      </section>
      <section className="analytics-grid">
        <article className="panel chart-panel"><div className="panel-heading"><div><h2>Utilization trend</h2>
        <p>Average resource usage by week</p></div><div className="chart-legend"><span></span> Utilization</div>
        </div><div className="chart"><div className="chart-y"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div>
        <div className="chart-area"><div className="chart-line"><i style={{ left: '4%', bottom: '36%' }}></i>
        <i style={{ left: '16%', bottom: '45%' }}></i><i style={{ left: '28%', bottom: '42%' }}></i><i style={{ left: '40%', bottom: '59%' }}></i>
        <i style={{ left: '52%', bottom: '52%' }}></i><i style={{ left: '64%', bottom: '71%' }}></i><i style={{ left: '76%', bottom: '68%' }}>
          </i><i style={{ left: '90%', bottom: '82%' }}></i></div><div className="chart-x"><span>Sep 22</span><span>Sep 29</span><span>Oct 06</span>
          <span>Oct 13</span><span>Oct 20</span></div></div></div></article>
        <article className="panel peak-panel"><div className="panel-heading"><div><h2>Peak hours</h2><p>When spaces are in highest demand</p></div>
        <span className="insight-tag">INSIGHT</span></div><div className="peak-bars"><div><span style={{ height: '28%' }}></span><small>08</small>
        </div><div><span style={{ height: '45%' }}></span><small>10</small></div><div className="peak"><span style={{ height: '89%' }}></span><small>12</small></div>
        <div><span style={{ height: '72%' }}></span><small>14</small></div><div><span style={{ height: '55%' }}></span><small>16</small></div>
        <div><span style={{ height: '24%' }}></span>
        <small>18</small></div></div><p className="peak-caption"><strong>12:00–14:00</strong> is your busiest window</p></article>
      </section>
      <section className="analytics-grid lower-analytics">
        <article className="panel health-panel"><div className="panel-heading"><div><h2>Resource performance</h2><p>Usage compared with available capacity</p>
        </div><button className="text-button">Export report ↗</button></div><div className="performance-list"><div>
          <span className="performance-icon mint">▦</span><div><strong>Innovation Lab</strong><small>42 seats · 86% utilized</small>
          <div className="performance-progress"><i style={{ width: '86%' }}></i></div></div><b>86%</b></div><div><span className="performance-icon coral">▦</span>
          <div><strong>Senate Hall</strong><small>180 seats · 81% utilized</small><div className="performance-progress"><i className="coral-fill" style={{ width: '81%' }}>
            </i></div></div><b>81%</b></div><div><span className="performance-icon sky">▦</span><div><strong>North Studio</strong><small>60 seats · 64% utilized</small>
            <div className="performance-progress"><i className="sky-fill" style={{ width: '64%' }}></i></div></div><b>64%</b></div></div></article>
        <article className="panel recommendations-panel"><div className="panel-heading"><div><h2>Smart recommendations</h2><p>Small changes with measurable impact</p>
        </div><span className="spark-icon">✦</span></div><div className="recommendation"><span>↗</span>
        <div><strong>Open North Studio earlier</strong><small>Could absorb 12% of midday overflow from Senate Hall.</small></div>
        </div><div className="recommendation"><span>◌</span><div><strong>Review Media Suite maintenance</strong>
        <small>This resource has been unavailable for 6 days.</small></div></div><button className="recommendation-link">See all recommendations <span>→</span></button></article>
      </section>
    </div>
  )
}
function App() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [showBooking, setShowBooking] = useState(false)
  const [approved, setApproved] = useState([])
  const [query, setQuery] = useState('')
  const now = new Date()
  const dateInputValue = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-')
  const displayDate = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const shortDisplayDate = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
  const roundedStart = new Date(now)
  roundedStart.setMinutes(Math.ceil(now.getMinutes() / 30) * 30, 0, 0)
  const startTimeValue = `${String(roundedStart.getHours()).padStart(2, '0')}:${String(roundedStart.getMinutes()).padStart(2, '0')}`

  const filteredResources = useMemo(
    () => resources.filter((resource) => `${resource.name} ${resource.code} ${resource.type}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  const handleApprove = (name) => setApproved((current) => [...current, name])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark"><span>◆</span><div>campus<span>OS</span></div></div>
        <div className="workspace-label">OPERATIONS CONSOLE</div>
        <nav>
          {['Overview', 'Bookings', 'Resources', 'Maintenance', 'Analytics'].map((item) => (
            <button className={activeNav === item ? 'nav-item active' : 'nav-item'} key={item} onClick={() => setActiveNav(item)}>
              <span className="nav-icon">{['⌂', '◷', '▦', '⚒', '◌'][['Overview', 'Bookings', 'Resources', 'Maintenance', 'Analytics'].indexOf(item)]}</span>{item}
              {item === 'Bookings' && <b>8</b>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="system-status"><span></span><div><strong>All systems operational</strong><small>Last checked just now</small></div></div>
          <button className="help-button">? <span>Help center</span></button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">CAMPUS / <strong>{activeNav.toUpperCase()}</strong></div>
          <div className="top-actions"><button className="icon-button" aria-label="Notifications">♧<i></i></button>
          <div className="profile"><div className="avatar">G</div><div><strong>Geetnajali</strong><small>Administrator</small></div><span>⌄</span></div></div>
        </header>

        {activeNav === 'Analytics' ? <AnalyticsDashboard /> : <>
        <div className="page-heading">
          <div><p className="eyebrow">{displayDate}</p><h1>Good morning, Geetnajali.</h1>
          <p className="subheading">Here’s what’s happening across your campus today.</p></div>
          <button className="primary-button" onClick={() => setShowBooking(true)}><span>＋</span> New booking</button>
        </div>

        <section className="metrics-grid">
          <article className="metric-card featured"><div className="metric-label">ACTIVE BOOKINGS <span className="trend positive">↗ 12.4%</span>
          </div><strong>24</strong><div className="sparkline"><span style={{ height: '32%' }}></span><span style={{ height: '46%' }}>
            </span><span style={{ height: '39%' }}></span><span style={{ height: '64%' }}></span><span style={{ height: '54%' }}></span>
            <span style={{ height: '82%' }}></span><span style={{ height: '72%' }}></span><span style={{ height: '96%' }}></span>
            
            </div><small>vs. 21 last Tuesday</small></article>
          <article className="metric-card"><div className="metric-label">PENDING APPROVALS <span className="metric-dot orange"></span>
          </div><strong>08</strong><p className="metric-note">Needs your attention</p><div className="mini-avatars"><span>AS</span>
          <span>PM</span><span>NR</span><span>+5</span></div></article>
          <article className="metric-card"><div className="metric-label">UTILIZATION RATE <span className="trend positive">↗ 4.8%</span>
          </div><strong>76<span className="percent">%</span></strong><div className="progress-bar"><span></span></div><small>Across 38 active resources</small></article>
          <article className="metric-card"><div className="metric-label">RESOURCE HEALTH <span className="metric-dot green"></span>
          </div><strong>94<span className="percent">%</span></strong><p className="metric-note">Excellent condition</p><div className="health-line"><span>
            </span><span></span><span></span><span></span><span></span></div></article>
        </section>

        <section className="content-grid">
          <article className="panel approvals-panel"><div className="panel-heading"><div><h2>Approval queue</h2><p>Requests waiting for your review</p>
          </div><button className="text-button">View all <span>→</span></button></div><div className="approval-list">{approvals.map((request) => <div className="approval-row" key={request.name}>
            <div className={`request-avatar ${request.tone}`}>{request.initials}</div><div className="request-detail"><strong>{request.name}</strong>
            <span>{request.purpose}</span><small>{request.resource} <i>·</i> {request.time}</small>
            </div>{approved.includes(request.name) ? <span className="approved-label">Approved</span> : <div className="row-actions">
              <button className="reject" aria-label={`Reject ${request.name}`}>×</button><button className="approve" onClick={() => handleApprove(request.name)} aria-label={`Approve ${request.name}`}>✓</button></div>}</div>)}</div></article>

          <article className="panel schedule-panel"><div className="panel-heading"><div><h2>Today’s schedule</h2><p>{shortDisplayDate}</p>
          </div><button className="calendar-button">▣</button></div><div className="timeline"><div className="time-row"><span>09:00</span>
          <div><div className="event blue-event"><strong>Faculty sync</strong><small>North Studio · 12 attendees</small></div></div></div>
          <div className="time-row current"><span>11:30</span><div><div className="event coral-event"><strong>AI Seminar Series</strong>
          <small>Senate Hall · 148 attendees</small></div></div></div><div className="time-row"><span>14:00</span><div></div></div>
          <div className="time-row"><span>16:30</span><div><div className="event green-event"><strong>Robotics club</strong><small>Block 4 seminar hall · 24 attendees</small>
          </div></div></div></div></article>
        </section>

        <section className="panel resources-panel"><div className="panel-heading"><div><h2>Resource overview</h2>
        <p>Live status across your campus</p></div>
        <div className="resource-tools"><label>⌕<input placeholder="Search resources" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <button className="filter-button">☷ Filter</button></div></div><div className="resource-table"><div className="table-head"><span>RESOURCE</span>
        <span>TYPE</span><span>CAPACITY</span><span>STATUS</span><span></span>
        </div>{filteredResources.map((resource) => <div className="resource-row" key={resource.code}><div className="resource-name">
          <span className={`resource-icon ${resource.accent}`}>▦</span><div><strong>{resource.name}</strong>
          <small>{resource.code}</small></div></div><span>{resource.type}</span><span>{resource.capacity} {resource.capacity === 1 ? 'unit' : 'seats'}</span>
          <span className={`status ${resource.status.toLowerCase()}`}><i></i>{resource.status}</span>
          <button className="more-button" aria-label={`More actions for ${resource.name}`}>•••</button></div>)}</div></section>
        <footer><span>campusOS v1.4.2</span><span>Data refreshed 2 minutes ago <i></i></span></footer>
        </>}
      </main>

      {showBooking && <div className="modal-backdrop" onClick={() => setShowBooking(false)}><div className="booking-modal" onClick={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={() => setShowBooking(false)}>×</button><p className="eyebrow">QUICK ACTION</p>
        <h2>Create a booking</h2><p className="modal-copy">Reserve a campus resource in a few details.</p><label>Resource<select>
          <option>North Studio · 60 seats</option><option>Block 4 seminar hall · 42 seats</option><option>Seminar Hall · 180 seats</option>
          </select></label><div className="form-row"><label>Date<input type="date" defaultValue={dateInputValue} />
          </label><label>Start time<input type="time" defaultValue={startTimeValue} /></label>
          </div><button className="primary-button full" onClick={() => setShowBooking(false)}>Submit request <span>→</span></button></div></div>}
    </div>
  )
}

export default App

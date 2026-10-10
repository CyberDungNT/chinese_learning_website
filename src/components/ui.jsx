import { useEffect, useRef, useState } from 'react'
import { speak, canSpeak, hasChineseVoice } from '../lib/speak'
import { syllables, toneOf } from '../lib/pinyin'
import { useTheme } from '../lib/theme'
import { CONTACT_URL, CONTACT_LABEL } from '../config'

// Pinyin tô màu theo thanh điệu
export function Py({ text, className = '' }) {
  return (
    <span className={`py ${className}`}>
      {syllables(text).map((s, i) => (
        <span key={i} className={`t${toneOf(s)}`}>{s}</span>
      ))}
    </span>
  )
}

export function SpeakBtn({ text, label = 'Nghe', small = false }) {
  const [on, setOn] = useState(false)
  return (
    <button
      type="button"
      className={`speak ${small ? 'speak-sm' : ''} ${on ? 'on' : ''}`}
      aria-label={`${label}: ${text}`}
      title={label}
      onClick={(e) => {
        e.stopPropagation()
        speak(text)
        setOn(true)
        setTimeout(() => setOn(false), 700)
      }}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
        <path d="M16 8.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      {!small && <span>{label}</span>}
    </button>
  )
}

export function VoiceNotice() {
  const [state, setState] = useState('checking')
  useEffect(() => {
    if (!canSpeak()) {
      setState('none')
      return undefined
    }
    const t = setTimeout(() => setState(hasChineseVoice() ? 'ok' : 'novoice'), 900)
    return () => clearTimeout(t)
  }, [])
  if (state === 'ok' || state === 'checking') return null
  return (
    <p className="notice">
      {state === 'none'
        ? 'Trình duyệt này không hỗ trợ đọc thành tiếng. Hãy thử Chrome, Edge hoặc Safari bản mới.'
        : 'Chưa tìm thấy giọng đọc tiếng Trung trên máy. Trên Windows: Cài đặt → Thời gian & ngôn ngữ → Giọng nói → thêm "Chinese (Simplified)". Trên điện thoại, Chrome/Safari thường có sẵn.'}
    </p>
  )
}

// Đường nét thanh điệu theo thang 5 bậc của Triệu Nguyên Nhiệm
export function ToneContour({ contour, tone, size = 120 }) {
  const w = size
  const h = size * 0.75
  const pad = 14
  const y = (lvl) => pad + ((5 - lvl) / 4) * (h - pad * 2)
  const pts = contour.map((lvl, i) => [pad + (i / (contour.length - 1)) * (w - pad * 2), y(lvl)])
  const d = pts.length === 3
    ? `M${pts[0]} Q${pts[1][0]},${pts[1][1] + 10} ${pts[2]}`
    : `M${pts[0]} L${pts[1]}`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="contour" role="img" aria-label={`Đường nét thanh ${tone}`}>
      {[1, 2, 3, 4, 5].map((l) => (
        <g key={l}>
          <line x1={pad} x2={w - pad} y1={y(l)} y2={y(l)} className="contour-grid" />
          <text x={4} y={y(l) + 3} className="contour-lbl">{l}</text>
        </g>
      ))}
      <path d={d} className={`contour-line s${tone}`} fill="none" />
      {tone !== 5 && <circle cx={pts.at(-1)[0]} cy={pts.at(-1)[1]} r="4" className={`contour-dot f${tone}`} />}
    </svg>
  )
}

// Ô luyện viết 米字格
export function MiGrid({ char, size = 260 }) {
  const ref = useRef(null)
  const drawing = useRef(false)
  const [guide, setGuide] = useState(true)

  const ctx = () => ref.current?.getContext('2d')
  const clear = () => {
    const c = ref.current
    if (c) ctx().clearRect(0, 0, c.width, c.height)
    return undefined
  }
  useEffect(() => {
    clear()
  }, [char])

  const pos = (e) => {
    const r = ref.current.getBoundingClientRect()
    return [((e.clientX - r.left) / r.width) * ref.current.width, ((e.clientY - r.top) / r.height) * ref.current.height]
  }
  const down = (e) => {
    e.preventDefault()
    ref.current.setPointerCapture(e.pointerId)
    drawing.current = true
    const c = ctx()
    const ink = getComputedStyle(ref.current).color
    c.strokeStyle = ink
    c.lineWidth = 14
    c.lineCap = 'round'
    c.lineJoin = 'round'
    c.beginPath()
    c.moveTo(...pos(e))
  }
  const move = (e) => {
    if (!drawing.current) return
    const c = ctx()
    c.lineTo(...pos(e))
    c.stroke()
  }
  const up = () => (drawing.current = false)

  return (
    <div className="migrid-wrap">
      <div className="migrid" style={{ width: size, maxWidth: '100%' }}>
        <svg viewBox="0 0 100 100" className="migrid-lines" aria-hidden="true">
          <rect x="0.5" y="0.5" width="99" height="99" />
          <line x1="0" y1="0" x2="100" y2="100" />
          <line x1="100" y1="0" x2="0" y2="100" />
          <line x1="50" y1="0" x2="50" y2="100" />
          <line x1="0" y1="50" x2="100" y2="50" />
        </svg>
        {guide && <span className="migrid-guide hz" aria-hidden="true">{char}</span>}
        <canvas
          ref={ref}
          width={500}
          height={500}
          className="migrid-canvas"
          aria-label={`Ô luyện viết chữ ${char}`}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
        />
      </div>
      <div className="row">
        <button type="button" className="btn" onClick={clear}>Xóa nét</button>
        <button type="button" className="btn ghost" onClick={() => setGuide((g) => !g)}>
          {guide ? 'Ẩn chữ mờ' : 'Hiện chữ mờ'}
        </button>
        <SpeakBtn text={char} />
      </div>
    </div>
  )
}

// Thanh tab cuộn ngang: tự đưa tab đang chọn vào tầm nhìn và hiện mũi tên khi còn tab bị khuất
export function TabBar({ value, id, label, className = '', children }) {
  const ref = useRef(null)
  const [edges, setEdges] = useState({ left: false, right: false })

  useEffect(() => {
    const bar = ref.current
    if (!bar) return undefined
    const update = () => {
      const max = bar.scrollWidth - bar.clientWidth
      setEdges({ left: bar.scrollLeft > 4, right: bar.scrollLeft < max - 4 })
    }
    update()
    bar.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(bar)
    return () => {
      bar.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [])

  useEffect(() => {
    const bar = ref.current
    const el = bar?.querySelector('.mode-btn.active')
    if (!bar || !el || bar.scrollWidth <= bar.clientWidth) return
    const left = el.offsetLeft - (bar.clientWidth - el.offsetWidth) / 2
    bar.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
  }, [value])

  const nudge = (dir) => {
    const bar = ref.current
    if (bar) bar.scrollBy({ left: dir * bar.clientWidth * 0.7, behavior: 'smooth' })
  }
  const arrow = (dir) => (
    <button
      type="button"
      className={`tabs-arrow ${dir < 0 ? 'left' : 'right'}`}
      aria-label={dir < 0 ? 'Xem các tab phía trước' : 'Xem thêm tab'}
      tabIndex={-1}
      onClick={() => nudge(dir)}
    >
      <span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={dir < 0 ? 'M14.5 6l-6 6 6 6' : 'M9.5 6l6 6-6 6'} />
        </svg>
      </span>
    </button>
  )

  return (
    <div className="tabs-wrap" data-left={edges.left || undefined} data-right={edges.right || undefined}>
      <div ref={ref} className={`guide-modes ${className}`} role="tablist" id={id} aria-label={label}>
        {children}
      </div>
      {edges.left && arrow(-1)}
      {edges.right && arrow(1)}
    </div>
  )
}

// Thanh tab dạng khối (cùng kiểu với thanh chọn chế độ luyện viết)
export function Tabs({ tabs, value, onChange, id }) {
  return (
    <TabBar value={value} id={id} className="page-tabs">
      {tabs.map((t) => (
        <button
          key={t.value}
          type="button"
          role="tab"
          aria-selected={value === t.value}
          className={value === t.value ? 'mode-btn active' : 'mode-btn'}
          onClick={() => onChange(t.value)}
        >
          {t.label}
        </button>
      ))}
    </TabBar>
  )
}

const THEMES = [
  { value: 'light', label: 'Sáng', icon: <><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" /></> },
  { value: 'dark', label: 'Tối', icon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /> },
  { value: 'system', label: 'Theo hệ thống', icon: <><rect x="3" y="4.5" width="18" height="12" rx="1.5" /><path d="M8.5 20h7M12 16.5V20" /></> },
]

export function ThemeToggle() {
  const [mode, setMode] = useTheme()
  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Giao diện">
      {THEMES.map((t) => (
        <button
          key={t.value}
          type="button"
          role="radio"
          aria-checked={mode === t.value}
          aria-label={t.label}
          title={t.label}
          className={mode === t.value ? 'active' : ''}
          onClick={() => setMode(t.value)}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {t.icon}
          </svg>
          <span className="theme-label">{t.label}</span>
        </button>
      ))}
    </div>
  )
}

// Nút liên hệ nổi ở góc dưới bên phải, mở link trong tab mới
export function ContactButton({ href = CONTACT_URL, label = CONTACT_LABEL }) {
  if (!href) return null
  return (
    <a className="contact-fab" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (mở tab mới)`} title={label}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 5.5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9.5L5 20v-3.5H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z" />
        <path d="M7.5 10h9M7.5 13h5.5" />
      </svg>
      <span className="contact-label">{label}</span>
    </a>
  )
}

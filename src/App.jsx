import { HashRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Home from './pages/Home'
import Pinyin from './pages/Pinyin'
import Hanzi from './pages/Hanzi'
import Level from './pages/Level'
import Flashcards from './pages/Flashcards'
import Quiz from './pages/Quiz'
import { ThemeToggle, ContactButton } from './components/ui'

const nav = [
  { to: '/', label: 'Lộ trình', hz: '路', end: true },
  { to: '/pinyin', label: 'Pinyin & thanh điệu', hz: '音' },
  { to: '/chu-han', label: 'Chữ Hán & bộ thủ', hz: '字' },
]
const levels = [1, 2, 3, 4, 5, 6]
const practice = [
  { to: '/flashcard', label: 'Flashcard', hz: '卡' },
  { to: '/kiem-tra', label: 'Kiểm tra', hz: '考' },
]

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function NavContent({ onNavigate }) {
  const link = (n) => (
    <NavLink key={n.to} to={n.to} end={n.end} className="nav-link" onClick={onNavigate}>
      <span className="nav-hz hz" aria-hidden="true">{n.hz}</span>
      <span>{n.label}</span>
    </NavLink>
  )
  return (
    <nav className="nav" aria-label="Mục lục">
      <p className="nav-head">Nền tảng</p>
      {nav.map(link)}
      <p className="nav-head">Từ vựng & ngữ pháp</p>
      <div className="nav-levels">
        {levels.map((l) => (
          <NavLink key={l} to={`/hsk/${l}`} className="nav-level" onClick={onNavigate}>
            HSK {l}
          </NavLink>
        ))}
      </div>
      <p className="nav-head">Ôn luyện</p>
      {practice.map(link)}
    </nav>
  )
}

function Brand({ onNavigate }) {
  return (
    <NavLink to="/" className="brand" onClick={onNavigate}>
      <img className="brand-seal" src="./favicon.svg" alt="" width="46" height="46" />
      <span className="brand-name">
        Lộ Trình<br />Hán Ngữ
      </span>
    </NavLink>
  )
}

// Cột menu bên trái (máy tính, máy tính bảng ngang)
function Rail() {
  return (
    <aside className="rail">
      <Brand />
      <NavContent />
      <div className="rail-foot">
        <p className="nav-head">Giao diện</p>
        <ThemeToggle />
      </div>
    </aside>
  )
}

function pageTitle(pathname) {
  if (pathname.startsWith('/hsk/')) return `HSK ${pathname.split('/')[2]} · Từ vựng & ngữ pháp`
  return {
    '/pinyin': 'Pinyin & thanh điệu',
    '/chu-han': 'Chữ Hán & bộ thủ',
    '/flashcard': 'Flashcard',
    '/kiem-tra': 'Kiểm tra',
  }[pathname] || 'Lộ trình học'
}

// Thanh trên cùng + ngăn menu trượt (điện thoại)
function MobileNav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const closeRef = useRef(null)
  const menuBtnRef = useRef(null)
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    const btn = menuBtnRef.current
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      btn?.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <>
      <header className="mbar">
        <Brand />
        <div className="mbar-title">
          <span className="mbar-app">Lộ Trình Hán Ngữ</span>
          <span className="mbar-page">{pageTitle(pathname)}</span>
        </div>
        <button
          ref={menuBtnRef}
          type="button"
          className="mbar-menu"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen(true)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h10" />
          </svg>
          <span>Menu</span>
        </button>
      </header>

      <div className={open ? 'drawer-root open' : 'drawer-root'} inert={!open} aria-hidden={!open}>
        <button type="button" className="drawer-backdrop" aria-label="Đóng menu" tabIndex={-1} onClick={close} />
        <aside id="mobile-drawer" className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="drawer-head">
            <Brand onNavigate={close} />
            <button ref={closeRef} type="button" className="drawer-close" aria-label="Đóng menu" onClick={close}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <NavContent onNavigate={close} />
          <div className="drawer-foot">
            <p className="nav-head">Giao diện</p>
            <ThemeToggle />
            <p className="drawer-note">4991 từ HSK 2.0 · phát âm bằng giọng đọc của trình duyệt</p>
          </div>
        </aside>
      </div>
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <ScrollTop />
      <div className="app">
        <Rail />
        <MobileNav />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pinyin" element={<Pinyin />} />
            <Route path="/chu-han" element={<Hanzi />} />
            <Route path="/hsk/:level" element={<Level />} />
            <Route path="/flashcard" element={<Flashcards />} />
            <Route path="/kiem-tra" element={<Quiz />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <footer className="foot">
            Từ vựng theo chuẩn HSK 2.0 (6 cấp). Phát âm dùng giọng đọc có sẵn của trình duyệt. Tiến độ được lưu trên trình duyệt này.
          </footer>
        </main>
        <ContactButton />
      </div>
    </HashRouter>
  )
}

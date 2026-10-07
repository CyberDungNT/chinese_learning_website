import { HashRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
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

function Rail() {
  const link = (n) => (
    <NavLink key={n.to} to={n.to} end={n.end} className="nav-link">
      <span className="nav-hz hz" aria-hidden="true">{n.hz}</span>
      <span>{n.label}</span>
    </NavLink>
  )
  return (
    <aside className="rail">
      <NavLink to="/" className="brand">
        <span className="brand-seal hz" aria-hidden="true">汉</span>
        <span className="brand-name">
          Lộ Trình<br />Hán Ngữ
        </span>
      </NavLink>
      <nav className="nav" aria-label="Mục lục">
        <p className="nav-head">Nền tảng</p>
        {nav.map(link)}
        <p className="nav-head">Từ vựng & ngữ pháp</p>
        <div className="nav-levels">
          {levels.map((l) => (
            <NavLink key={l} to={`/hsk/${l}`} className="nav-level">
              HSK {l}
            </NavLink>
          ))}
        </div>
        <p className="nav-head">Ôn luyện</p>
        {practice.map(link)}
      </nav>
      <div className="rail-foot">
        <p className="nav-head">Giao diện</p>
        <ThemeToggle />
      </div>
    </aside>
  )
}

export default function App() {
  return (
    <HashRouter>
      <ScrollTop />
      <div className="app">
        <Rail />
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

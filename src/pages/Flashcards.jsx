import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { wordsOf, levelInfo } from '../data/hsk'
import { useStored } from '../lib/storage'
import { Py, SpeakBtn, VoiceNotice } from '../components/ui'
import { shuffle } from '../lib/pinyin'
import { speak } from '../lib/speak'

// Hệ Leitner 6 hộp: hộp càng cao, càng lâu mới ôn lại (đơn vị: ngày)
const INTERVAL = [0, 1, 2, 4, 7, 15]
const DAY = 86400000
const NEW_PER_SESSION = 15

export default function Flashcards() {
  const [params, setParams] = useSearchParams()
  const level = Math.min(6, Math.max(1, Number(params.get('level')) || 1))
  // Đổi cấp thì tạo phiên mới (key khác → state reset)
  return <Deck key={level} level={level} setParams={setParams} />
}

function Deck({ level, setParams }) {
  const [srs, setSrs] = useStored('srs', {})
  const [mode, setMode] = useStored('fcMode', 'zh')
  const words = useMemo(() => wordsOf(level), [level])

  const now = Date.now()
  const stats = words.reduce(
    (s, w) => {
      const r = srs[w.id]
      if (!r) s.fresh++
      else if (r.due <= now) s.due++
      if ((r?.box ?? 0) >= 3) s.known++
      return s
    },
    { fresh: 0, due: 0, known: 0 },
  )

  const [queue, setQueue] = useState(null)
  const [flipped, setFlipped] = useState(false)
  const [reviewed, setReviewed] = useState(0)

  const start = (all = false) => {
    const t = Date.now()
    const due = words.filter((w) => srs[w.id] && srs[w.id].due <= t)
    const fresh = words.filter((w) => !srs[w.id]).slice(0, NEW_PER_SESSION)
    const q = all ? shuffle(words) : shuffle([...due, ...fresh])
    setQueue(q)
    setFlipped(false)
    setReviewed(0)
  }

  const card = queue?.[0]

  const grade = (ok) => {
    if (!card) return
    setSrs((prev) => {
      const box = ok ? Math.min(5, (prev[card.id]?.box ?? 0) + 1) : 1
      return { ...prev, [card.id]: { box, due: Date.now() + (ok ? INTERVAL[box] * DAY : 0) } }
    })
    setReviewed((n) => n + 1)
    setFlipped(false)
    // Thẻ quên được đưa về cuối hàng đợi để gặp lại trong phiên
    setQueue((q) => (ok ? q.slice(1) : [...q.slice(1), q[0]]))
  }

  useEffect(() => {
    if (!card) return undefined
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return
      if (e.code === 'Space') {
        e.preventDefault()
        setFlipped((f) => !f)
      } else if (flipped && e.key === '1') grade(false)
      else if (flipped && e.key === '2') grade(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const reset = () => {
    setSrs((prev) => {
      const next = { ...prev }
      words.forEach((w) => delete next[w.id])
      return next
    })
    setQueue(null)
  }
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Ôn luyện</p>
        <h1>Flashcard</h1>
        <p className="lede">
          Thẻ nhớ theo hệ Leitner: thẻ trả lời đúng lên hộp cao hơn và cách lâu hơn mới gặp lại (1, 2, 4, 7, 15 ngày).
          Thẻ quên quay về hộp 1. Từ ở hộp 3 trở lên được tính là đã thuộc.
        </p>
        <VoiceNotice />
      </header>

      <div className="toolbar">
        <div className="chips">
          {[1, 2, 3, 4, 5, 6].map((l) => (
            <button key={l} type="button" className={l === level ? 'chip active' : 'chip'} onClick={() => setParams({ level: String(l) })}>
              {levelInfo[l].label}
            </button>
          ))}
        </div>
        <div className="seg" role="group" aria-label="Mặt trước của thẻ">
          <button type="button" className={mode === 'zh' ? 'active' : ''} onClick={() => setMode('zh')}>Hán → Việt</button>
          <button type="button" className={mode === 'vi' ? 'active' : ''} onClick={() => setMode('vi')}>Việt → Hán</button>
        </div>
      </div>

      {!queue && (
        <div className="panel fc-start">
          <div className="fc-stats">
            <div><b>{stats.due}</b><span>đến hạn ôn</span></div>
            <div><b>{Math.min(stats.fresh, NEW_PER_SESSION)}</b><span>từ mới phiên này</span></div>
            <div><b>{stats.known}<small>/{words.length}</small></b><span>đã thuộc</span></div>
          </div>
          <div className="row">
            <button type="button" className="btn primary" onClick={() => start(false)} disabled={stats.due + stats.fresh === 0}>
              Bắt đầu ôn {stats.due + Math.min(stats.fresh, NEW_PER_SESSION)} thẻ
            </button>
            <button type="button" className="btn ghost" onClick={() => start(true)}>Xem lại cả {words.length} thẻ</button>
          </div>
          {stats.due + stats.fresh === 0 && <p className="muted">Hôm nay đã ôn xong {levelInfo[level].label}. Quay lại vào ngày mai, hoặc xem lại toàn bộ.</p>}
          <div className="row reset-row">
            {!confirmReset ? (
              <button type="button" className="linkish small" onClick={() => setConfirmReset(true)}>Xóa tiến độ {levelInfo[level].label}</button>
            ) : (
              <>
                <span className="small">Xóa toàn bộ tiến độ flashcard của {levelInfo[level].label}?</span>
                <button type="button" className="btn danger" onClick={() => { reset(); setConfirmReset(false) }}>Xóa</button>
                <button type="button" className="btn ghost" onClick={() => setConfirmReset(false)}>Giữ lại</button>
              </>
            )}
          </div>
        </div>
      )}

      {queue && !card && (
        <div className="panel center">
          <p className="score">{reviewed}</p>
          <p>lượt ôn trong phiên này. Hẹn gặp lại ở lần ôn tiếp theo.</p>
          <button type="button" className="btn primary" onClick={() => setQueue(null)}>Xong</button>
        </div>
      )}

      {card && (
        <div className="fc">
          <p className="muted small">Còn {queue.length} thẻ · Phím cách để lật, 1 = Quên, 2 = Nhớ</p>
          <button
            type="button"
            className={`fc-card ${flipped ? 'flipped' : ''}`}
            onClick={() => {
              if (!flipped && mode === 'zh') speak(card.hz)
              setFlipped((f) => !f)
            }}
            aria-label="Lật thẻ"
          >
            <span className="fc-face fc-front">
              {mode === 'zh' ? <span className="hz fc-hz">{card.hz}</span> : <span className="fc-vi">{card.vi}</span>}
              <span className="muted small">Bấm để lật</span>
            </span>
            <span className="fc-face fc-back">
              <span className="hz fc-hz sm">{card.hz}</span>
              <Py text={card.py} className="lg" />
              <span className="fc-vi">{card.vi}</span>
              <span className="word-hv">Hán Việt: {card.hv}</span>
            </span>
          </button>
          <div className="row center-row">
            {flipped ? (
              <>
                <button type="button" className="btn danger" onClick={() => grade(false)}>Quên</button>
                <SpeakBtn text={card.hz} />
                <button type="button" className="btn primary" onClick={() => grade(true)}>Nhớ</button>
              </>
            ) : (
              <button type="button" className="btn" onClick={() => setFlipped(true)}>Lật thẻ</button>
            )}
          </div>
          <button type="button" className="linkish small" onClick={() => setQueue(null)}>Dừng phiên</button>
        </div>
      )}
    </div>
  )
}

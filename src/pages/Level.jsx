import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { vocab, levelInfo } from '../data/hsk'
import { grammar } from '../data/grammar'
import { Py, SpeakBtn, Tabs, VoiceNotice } from '../components/ui'
import { speak } from '../lib/speak'
import { useStored } from '../lib/storage'

export default function Level() {
  const level = Math.min(6, Math.max(1, Number(useParams().level) || 1))
  return <LevelView key={level} level={level} />
}

function LevelView({ level }) {
  const info = levelInfo[level]
  const topics = vocab[level]
  const count = topics.reduce((n, t) => n + t.words.length, 0)
  const [tab, setTab] = useState('vocab')

  return (
    <div className="page">
      <header className="page-head level-head">
        <div>
          <p className="eyebrow">Chặng {level + 4} · Trình độ {info.cefr}</p>
          <h1>{info.label}</h1>
          <p className="lede">{info.goal}</p>
          <p className="muted small">
            Đủ {count} từ mới của cấp này theo danh sách HSK 2.0. Cộng với các cấp dưới, bạn tích lũy {info.words} từ.
            Từ được nhóm theo từ loại; bấm vào thẻ để nghe phát âm.
          </p>
        </div>
        <div className="level-actions">
          <Link to={`/flashcard?level=${level}`} className="btn primary">Học flashcard</Link>
          <Link to={`/kiem-tra?level=${level}`} className="btn ghost">Làm bài kiểm tra</Link>
        </div>
      </header>
      <VoiceNotice />
      <Tabs
        tabs={[
          { value: 'vocab', label: `Từ vựng (${count})` },
          { value: 'grammar', label: `Ngữ pháp (${grammar[level].length})` },
        ]}
        value={tab}
        onChange={setTab}
        id="level-tabs"
      />
      {tab === 'vocab' ? <Vocab topics={topics} level={level} /> : <Grammar points={grammar[level]} />}
      <nav className="pager" aria-label="Chuyển cấp">
        {level > 1 ? <Link to={`/hsk/${level - 1}`} className="btn ghost">← HSK {level - 1}</Link> : <span />}
        {level < 6 && <Link to={`/hsk/${level + 1}`} className="btn ghost">HSK {level + 1} →</Link>}
      </nav>
    </div>
  )
}

function Vocab({ topics, level }) {
  const [topic, setTopic] = useState('all')
  const [limits, setLimits] = useState({})
  const PAGE = 60
  const [q, setQ] = useState('')
  const [showHv, setShowHv] = useStored('showHv', true)
  const [srs] = useStored('srs', {})
  const term = q.trim().toLowerCase()

  const shown = topics
    .filter((t) => topic === 'all' || t.topic === topic)
    .map((t) => ({
      ...t,
      words: t.words.filter(
        (w) =>
          !term ||
          w.hz.includes(term) ||
          w.vi.toLowerCase().includes(term) ||
          w.hv.toLowerCase().includes(term) ||
          w.py.replaceAll(' ', '').toLowerCase().includes(term.replaceAll(' ', '')),
      ),
    }))
    .filter((t) => t.words.length)

  return (
    <div className="stack">
      <div className="toolbar">
        <div className="chips">
          <button type="button" className={topic === 'all' ? 'chip active' : 'chip'} onClick={() => setTopic('all')}>Tất cả</button>
          {topics.map((t) => (
            <button key={t.topic} type="button" className={topic === t.topic ? 'chip active' : 'chip'} onClick={() => setTopic(t.topic)}>
              {t.topic}
            </button>
          ))}
        </div>
        <div className="toolbar-right">
          <label htmlFor={`q-${level}`} className="sr-only">Tìm từ</label>
          <input id={`q-${level}`} className="input" placeholder="Tìm chữ, pinyin, nghĩa…" value={q} onChange={(e) => setQ(e.target.value)} />
          <label className="check">
            <input type="checkbox" id="show-hv" checked={showHv} onChange={(e) => setShowHv(e.target.checked)} />
            <span>Hán Việt</span>
          </label>
        </div>
      </div>
      {shown.length === 0 && <p className="muted">Không tìm thấy từ nào khớp "{q}".</p>}
      {shown.map((t) => (
        <section key={t.topic}>
          <h3>{t.topic} <span className="muted small">{t.words.length} từ</span></h3>
          <div className="word-grid">
            {t.words.slice(0, limits[t.topic] ?? PAGE).map((w) => {
              const box = srs[w.id]?.box ?? 0
              return (
                <button key={w.id} type="button" className="word" onClick={() => speak(w.hz)} title="Bấm để nghe">
                  <span className={`word-hz hz ${w.hz.length > 2 ? 'long' : ''}`}>{w.hz}</span>
                  <Py text={w.py} />
                  <span className="word-vi">{w.vi}</span>
                  {showHv && <span className="word-hv">{w.hv}</span>}
                  {box >= 3 && <span className="word-badge" title="Đã thuộc trong flashcard">Đã thuộc</span>}
                </button>
              )
            })}
          </div>
          {t.words.length > (limits[t.topic] ?? PAGE) && (
            <div className="more-row">
              <button
                type="button"
                className="btn ghost"
                onClick={() => setLimits((m) => ({ ...m, [t.topic]: (m[t.topic] ?? PAGE) + PAGE * 2 }))}
              >
                Hiện thêm (còn {t.words.length - (limits[t.topic] ?? PAGE)} từ)
              </button>
              <button type="button" className="linkish small" onClick={() => setLimits((m) => ({ ...m, [t.topic]: t.words.length }))}>
                Hiện tất cả
              </button>
            </div>
          )}
        </section>
      ))}
    </div>
  )
}

function Grammar({ points }) {
  return (
    <div className="grammar-list">
      {points.map((g, i) => (
        <article key={g.title} className="gram">
          <header>
            <span className="gram-n">{i + 1}</span>
            <h3>{g.title}</h3>
          </header>
          <p className="gram-pattern hz-mix">{g.pattern}</p>
          <p>{g.note}</p>
          <ul className="examples">
            {g.ex.map(([zh, py, vi]) => (
              <li key={zh}>
                <div className="ex-main">
                  <span className="hz ex-zh">{zh}</span>
                  <SpeakBtn text={zh} small />
                </div>
                <span className="ex-py">{py}</span>
                <span className="ex-vi">{vi}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

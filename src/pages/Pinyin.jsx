import { useState } from 'react'
import { initials, finals, tones, sandhi, spellingRules, toneDrill } from '../data/pinyin'
import { Py, SpeakBtn, ToneContour, Tabs, VoiceNotice } from '../components/ui'
import { speak } from '../lib/speak'
import { toneOf, sample } from '../lib/pinyin'

const tabs = [
  { value: 'initials', label: 'Thanh mẫu' },
  { value: 'finals', label: 'Vận mẫu' },
  { value: 'tones', label: 'Thanh điệu' },
  { value: 'rules', label: 'Biến điệu & chính tả' },
  { value: 'drill', label: 'Luyện nghe' },
]

export default function Pinyin() {
  const [tab, setTab] = useState('initials')
  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Chặng 1–2</p>
        <h1>Pinyin & thanh điệu</h1>
        <p className="lede">
          Một âm tiết tiếng Trung gồm thanh mẫu (phụ âm đầu), vận mẫu (phần vần) và thanh điệu.
          Ví dụ <Py text="mǎ" /> = m + a + thanh 3. Bấm vào bất kỳ ô nào để nghe.
        </p>
        <VoiceNotice />
      </header>
      <Tabs tabs={tabs} value={tab} onChange={setTab} id="pinyin-tabs" />
      {tab === 'initials' && <Initials />}
      {tab === 'finals' && <Finals />}
      {tab === 'tones' && <Tones />}
      {tab === 'rules' && <Rules />}
      {tab === 'drill' && <Drill />}
    </div>
  )
}

function Initials() {
  return (
    <div className="stack">
      <p className="muted">
        Cặp quan trọng nhất với người Việt là <b>bật hơi</b> và <b>không bật hơi</b>: b/p, d/t, g/k, j/q, zh/ch, z/c.
        Đặt một tờ giấy trước miệng: âm bật hơi làm giấy rung mạnh.
      </p>
      {initials.map((g) => (
        <section key={g.group}>
          <h3>{g.group}</h3>
          <div className="sound-grid">
            {g.items.map((it) => (
              <button key={it.py} type="button" className="sound" onClick={() => speak(it.ex)}>
                <span className="sound-py">{it.py}</span>
                <span className="sound-ex">
                  <span className="hz">{it.ex}</span> <Py text={it.exPy} />
                </span>
                <span className="sound-tip">{it.tip}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function Finals() {
  return (
    <div className="stack">
      {finals.map((g) => (
        <section key={g.group}>
          <h3>{g.group}</h3>
          <div className="sound-grid compact">
            {g.items.map(([f, hz, py, tip]) => (
              <button key={f} type="button" className="sound" onClick={() => speak(hz)}>
                <span className="sound-py">{f}</span>
                <span className="sound-ex">
                  <span className="hz">{hz}</span> <Py text={py} />
                </span>
                <span className="sound-tip">{tip}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function Tones() {
  return (
    <div className="stack">
      <p className="muted">
        Biểu đồ dùng thang 5 bậc: 5 là giọng cao nhất, 1 là thấp nhất. Cùng âm <b>ma</b>, đổi thanh là đổi nghĩa hoàn toàn.
      </p>
      <div className="tone-grid">
        {tones.map((t) => (
          <article key={t.n} className={`tone-card b${t.n}`}>
            <div className="tone-top">
              <span className="tone-name">{t.name}</span>
              <span className="tone-code">{t.code}</span>
            </div>
            <ToneContour contour={t.contour} tone={t.n} />
            <div className="tone-word">
              <span className="hz big">{t.hz}</span>
              <div>
                <Py text={t.py} className="lg" />
                <p className="muted small">{t.vi}</p>
              </div>
              <SpeakBtn text={t.hz} small />
            </div>
            <p className="small">{t.desc}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function Rules() {
  return (
    <div className="stack">
      <h3>Biến điệu</h3>
      <div className="rule-list">
        {sandhi.map((s) => (
          <article key={s.title} className="rule">
            <h4>{s.title}</h4>
            <p>{s.rule}</p>
            <table className="mini">
              <thead>
                <tr><th>Chữ</th><th>Viết</th><th>Đọc</th><th>Nghĩa</th><th></th></tr>
              </thead>
              <tbody>
                {s.examples.map((e) => (
                  <tr key={e.hz}>
                    <td className="hz">{e.hz}</td>
                    <td><Py text={e.py} /></td>
                    <td><Py text={e.read} /></td>
                    <td>{e.vi}</td>
                    <td><SpeakBtn text={e.hz} small /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        ))}
      </div>
      <h3>Quy tắc chính tả pinyin</h3>
      <ul className="plain-list">
        {spellingRules.map((r) => (
          <li key={r.rule}><b>{r.rule}.</b> {r.ex}</li>
        ))}
      </ul>
    </div>
  )
}

function Drill() {
  const make = () => sample(toneDrill, 10)
  const [set, setSet] = useState(make)
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const done = i >= set.length
  const cur = set[i]
  const answer = cur ? toneOf(cur[1]) : null

  const pick = (t) => {
    if (picked) return
    setPicked(t)
    if (t === answer) setScore((s) => s + 1)
  }
  const nextQ = () => {
    setPicked(null)
    setI((x) => x + 1)
  }
  const restart = () => {
    setSet(make())
    setI(0)
    setScore(0)
    setPicked(null)
  }

  if (done)
    return (
      <div className="panel center">
        <p className="score">{score}/10</p>
        <p>{score >= 8 ? 'Tai bạn đã phân biệt thanh điệu khá tốt.' : 'Nghe lại phần Thanh điệu rồi thử lần nữa.'}</p>
        <button type="button" className="btn primary" onClick={restart}>Làm lại</button>
      </div>
    )

  return (
    <div className="panel drill">
      <p className="muted">Câu {i + 1}/10 · Đúng {score}</p>
      <button type="button" className="btn primary big-btn" onClick={() => speak(cur[0], 0.7)}>
        ▶ Nghe âm tiết
      </button>
      <p>Đây là thanh mấy?</p>
      <div className="tone-choices">
        {[1, 2, 3, 4].map((t) => (
          <button
            key={t}
            type="button"
            className={`choice t-choice ${picked ? (t === answer ? 'right' : t === picked ? 'wrong' : '') : ''}`}
            onClick={() => pick(t)}
          >
            Thanh {t}
          </button>
        ))}
      </div>
      {picked && (
        <div className="reveal">
          <span className="hz big">{cur[0]}</span> <Py text={cur[1]} className="lg" />
          <button type="button" className="btn" onClick={nextQ}>Câu tiếp</button>
        </div>
      )}
    </div>
  )
}

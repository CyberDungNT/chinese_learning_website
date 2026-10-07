import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { wordsOf, levelInfo } from '../data/hsk'
import { useStored } from '../lib/storage'
import { Py, VoiceNotice } from '../components/ui'
import { joinPinyin, sample, shuffle } from '../lib/pinyin'
import { speak } from '../lib/speak'

const TYPES = {
  meaning: 'Chọn nghĩa đúng',
  hanzi: 'Chọn chữ Hán đúng',
  pinyin: 'Chọn pinyin đúng',
  listen: 'Nghe và chọn chữ đúng',
}
const N = 10

function buildQuiz(level, listen) {
  const pool = wordsOf(level)
  const types = ['meaning', 'hanzi', 'pinyin', ...(listen ? ['listen'] : [])]
  return sample(pool, N).map((w, i) => {
    const type = types[i % types.length]
    const others = sample(pool.filter((o) => o.id !== w.id && o.vi !== w.vi && o.py !== w.py), 3)
    return { type, word: w, options: shuffle([w, ...others]) }
  })
}

export default function Quiz() {
  const [params, setParams] = useSearchParams()
  const level = Math.min(6, Math.max(1, Number(params.get('level')) || 1))
  const [listen, setListen] = useStored('quizListen', true)
  const [best, setBest] = useStored('quiz', {})
  const [seed, setSeed] = useState(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const quiz = useMemo(() => buildQuiz(level, listen), [level, listen, seed])
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState([])

  const restart = () => {
    setSeed((s) => s + 1)
    setI(0)
    setPicked(null)
    setScore(0)
    setWrong([])
  }
  const changeLevel = (l) => {
    setParams({ level: String(l) })
    restart()
  }

  const q = quiz[i]
  const finished = i >= N

  const pick = (opt) => {
    if (picked) return
    setPicked(opt.id)
    const ok = opt.id === q.word.id
    if (ok) setScore((s) => s + 1)
    else setWrong((w) => [...w, q.word])
    if (i === N - 1) {
      const final = score + (ok ? 1 : 0)
      setBest((b) => ({ ...b, [level]: Math.max(b[level] ?? 0, final) }))
    }
  }

  const label = (opt) => {
    if (q.type === 'meaning') return <span>{opt.vi}</span>
    if (q.type === 'pinyin') return <Py text={opt.py} />
    return <span className="hz opt-hz">{opt.hz}</span>
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Ôn luyện</p>
        <h1>Kiểm tra</h1>
        <p className="lede">Mỗi lượt 10 câu trộn bốn dạng: nghĩa, chữ Hán, pinyin và nghe. Điểm cao nhất của từng cấp hiện trên trang Lộ trình.</p>
        <VoiceNotice />
      </header>

      <div className="toolbar">
        <div className="chips">
          {[1, 2, 3, 4, 5, 6].map((l) => (
            <button key={l} type="button" className={l === level ? 'chip active' : 'chip'} onClick={() => changeLevel(l)}>
              {levelInfo[l].label}
              {best[l] != null && <span className="chip-note">{best[l]}/10</span>}
            </button>
          ))}
        </div>
        <label className="check">
          <input type="checkbox" id="quiz-listen" checked={listen} onChange={(e) => { setListen(e.target.checked); restart() }} />
          <span>Có câu nghe</span>
        </label>
      </div>

      {finished ? (
        <div className="panel">
          <div className="center">
            <p className="score">{score}/{N}</p>
            <p>{score === N ? 'Tuyệt đối. Sẵn sàng lên cấp tiếp theo.' : score >= 7 ? 'Khá vững. Ôn lại vài từ sai bên dưới.' : 'Hãy ôn flashcard cấp này thêm vài ngày rồi làm lại.'}</p>
            <button type="button" className="btn primary" onClick={restart}>Làm bài mới</button>
          </div>
          {wrong.length > 0 && (
            <>
              <h3>Từ cần ôn</h3>
              <div className="word-grid">
                {wrong.map((w) => (
                  <button key={w.id} type="button" className="word" onClick={() => speak(w.hz)}>
                    <span className="word-hz hz">{w.hz}</span>
                    <Py text={w.py} />
                    <span className="word-vi">{w.vi}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="panel quiz">
          <div className="progress" aria-hidden="true"><span style={{ width: `${(i / N) * 100}%` }} /></div>
          <p className="muted small">Câu {i + 1}/{N} · {TYPES[q.type]} · Đúng {score}</p>
          <div className="prompt">
            {q.type === 'meaning' && (
              <>
                <span className="hz prompt-hz">{q.word.hz}</span>
                {picked && <Py text={q.word.py} className="lg" />}
              </>
            )}
            {q.type === 'hanzi' && <span className="prompt-vi">{q.word.vi}</span>}
            {q.type === 'pinyin' && <span className="hz prompt-hz">{q.word.hz}</span>}
            {q.type === 'listen' && (
              <button type="button" className="btn primary big-btn" onClick={() => speak(q.word.hz, 0.75)}>▶ Nghe</button>
            )}
          </div>
          <div className="options">
            {q.options.map((opt) => {
              const state = picked ? (opt.id === q.word.id ? 'right' : opt.id === picked ? 'wrong' : '') : ''
              return (
                <button key={opt.id} type="button" className={`choice ${state}`} onClick={() => pick(opt)} aria-label={q.type === 'pinyin' ? joinPinyin(opt.py) : undefined}>
                  {label(opt)}
                </button>
              )
            })}
          </div>
          {picked && (
            <div className="reveal">
              <span>
                <span className="hz">{q.word.hz}</span> <Py text={q.word.py} /> · {q.word.vi}
              </span>
              <button type="button" className="btn" onClick={() => { setPicked(null); setI((x) => x + 1) }}>
                {i === N - 1 ? 'Xem kết quả' : 'Câu tiếp'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

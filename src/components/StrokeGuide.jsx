import { useEffect, useId, useRef, useState } from 'react'
import HanziWriter from 'hanzi-writer'
import { hanziWriterLoader, loadStrokeData, isHan } from '../lib/strokes'
import { allWords } from '../data/hsk'
import { MiGrid, Py, SpeakBtn } from './ui'

const MODES = [
  { value: 'watch', label: 'Xem cách viết' },
  { value: 'step', label: 'Từng nét' },
  { value: 'quiz', label: 'Tự viết theo nét' },
  { value: 'free', label: 'Viết tự do' },
]
const SPEEDS = [
  { value: 0.5, label: 'Chậm', delay: 700 },
  { value: 1, label: 'Vừa', delay: 400 },
  { value: 2, label: 'Nhanh', delay: 150 },
]
const QUICK = '永人口大小中国你好学生月日水火木山我爱'

// Tra pinyin và nghĩa của chữ đơn từ danh sách HSK
let charInfoMap
function charInfo(c) {
  if (!charInfoMap) {
    charInfoMap = new Map()
    for (const w of allWords()) if (w.hz.length === 1 && !charInfoMap.has(w.hz)) charInfoMap.set(w.hz, w)
  }
  return charInfoMap.get(c)
}

// Đọc màu từ biến CSS và cập nhật khi người dùng đổi giao diện sáng/tối
function readColors() {
  const cs = getComputedStyle(document.documentElement)
  const v = (n) => cs.getPropertyValue(n).trim()
  return { ink: v('--ink'), seal: v('--seal'), line: v('--line'), jade: v('--jade'), muted: v('--muted'), sheet: v('--sheet') }
}
function useThemeColors() {
  const [colors, setColors] = useState(readColors)
  useEffect(() => {
    const update = () => setColors(readColors())
    const mo = new MutationObserver(update)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', update)
    return () => {
      mo.disconnect()
      mq.removeEventListener('change', update)
    }
  }, [])
  return colors
}

function useBoxSize(max = 300) {
  const calc = () => Math.max(200, Math.min(max, (typeof window !== 'undefined' ? window.innerWidth : 400) - 72))
  const [size, setSize] = useState(calc)
  useEffect(() => {
    let t
    const onResize = () => {
      clearTimeout(t)
      t = setTimeout(() => setSize(calc()), 150)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return size
}

function useStrokeData(char) {
  const [state, setState] = useState({ char: null, data: null, error: false })
  useEffect(() => {
    let alive = true
    loadStrokeData(char).then(
      (data) => alive && setState({ char, data, error: false }),
      () => alive && setState({ char, data: null, error: true }),
    )
    return () => {
      alive = false
    }
  }, [char])
  return state.char === char ? state : { char, data: null, error: false, loading: true }
}

// Đường kẻ ô chữ 米 phía sau
function GridLines() {
  return (
    <svg viewBox="0 0 100 100" className="migrid-lines" aria-hidden="true">
      <rect x="0.5" y="0.5" width="99" height="99" />
      <line x1="0" y1="0" x2="100" y2="100" />
      <line x1="100" y1="0" x2="0" y2="100" />
      <line x1="50" y1="0" x2="50" y2="100" />
      <line x1="0" y1="50" x2="100" y2="50" />
    </svg>
  )
}

// Vẽ tĩnh chữ Hán đến nét thứ `upto` (tính từ 1), nét hiện tại tô màu, kèm mũi tên hướng viết
function StaticChar({ data, upto, colors, arrow = false, size, label }) {
  const cur = upto - 1
  const median = arrow && cur >= 0 ? data.medians[cur] : null
  const id = 'arr' + useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg viewBox="0 0 1024 1024" width={size} height={size} role="img" aria-label={label}>
      <defs>
        <marker id={id} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3.2" markerHeight="3.2" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={colors.jade} />
        </marker>
      </defs>
      <g transform="translate(0, 900) scale(1, -1)">
        {data.strokes.map((d, i) => (
          <path key={i} d={d} fill={i < cur ? colors.ink : i === cur ? colors.seal : colors.line} />
        ))}
        {median && (
          <>
            <path
              d={`M ${median.map((p) => p.join(' ')).join(' L ')}`}
              fill="none"
              stroke={colors.jade}
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1 46"
              markerEnd={`url(#${id})`}
            />
            <circle cx={median[0][0]} cy={median[0][1]} r="44" fill={colors.jade} />
          </>
        )}
      </g>
      {median && (
        <text
          x={median[0][0]}
          y={900 - median[0][1]}
          dy="20"
          textAnchor="middle"
          fontSize="56"
          fontWeight="700"
          fill={colors.sheet}
          fontFamily="system-ui, sans-serif"
        >
          {upto}
        </text>
      )}
    </svg>
  )
}

// Ô HanziWriter: hoạt hình hoặc chế độ tự viết
function WriterBox({ char, mode, size, colors, speed, loop, quizOpts, onQuizUpdate, playKey, quizKey }) {
  const hostRef = useRef(null)
  const writerRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined
    host.innerHTML = ''
    let alive = true
    const sp = SPEEDS.find((s) => s.value === speed) || SPEEDS[1]
    const writer = HanziWriter.create(host, char, {
      width: size,
      height: size,
      padding: Math.round(size * 0.06),
      charDataLoader: hanziWriterLoader,
      showCharacter: mode !== 'quiz',
      showOutline: mode === 'quiz' ? quizOpts.outline : true,
      strokeAnimationSpeed: sp.value,
      delayBetweenStrokes: sp.delay,
      delayBetweenLoops: 1200,
      strokeColor: colors.ink,
      radicalColor: colors.seal,
      outlineColor: colors.line,
      highlightColor: colors.jade,
      drawingColor: colors.jade,
      drawingWidth: Math.max(14, Math.round(size / 18)),
    })
    writerRef.current = writer
    if (mode === 'watch') {
      if (loop) writer.loopCharacterAnimation()
      else writer.animateCharacter()
    } else if (mode === 'quiz') {
      onQuizUpdate({ stroke: 0, mistakes: 0, done: false })
      writer.quiz({
        showHintAfterMisses: quizOpts.hintAfter,
        leniency: 1.1,
        onCorrectStroke: (s) => alive && onQuizUpdate((q) => ({ ...q, stroke: s.strokeNum + 1, mistakes: s.totalMistakes })),
        onMistake: (s) => alive && onQuizUpdate((q) => ({ ...q, mistakes: s.totalMistakes })),
        onComplete: (s) => alive && onQuizUpdate((q) => ({ ...q, done: true, mistakes: s.totalMistakes })),
      })
    }
    return () => {
      alive = false
      try {
        writer.cancelQuiz()
      } catch {
        /* chưa vào chế độ quiz */
      }
      writerRef.current = null
      host.innerHTML = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [char, mode, size, colors, speed, loop, playKey, quizKey, quizOpts.outline, quizOpts.hintAfter])

  return (
    <>
      <div ref={hostRef} className="writer-host" aria-label={`Hướng dẫn viết chữ ${char}`} />
    </>
  )
}

export default function StrokeGuide({ char: charProp, onCharChange }) {
  const [text, setText] = useState(charProp)
  const chars = [...text].filter(isHan)
  const char = isHan(charProp) ? charProp : chars[0] || '永'
  const setChar = (c) => onCharChange(c)

  const [mode, setMode] = useState('watch')
  const [speed, setSpeed] = useState(1)
  const [loop, setLoop] = useState(false)
  const [playKey, setPlayKey] = useState(0)
  const [quizKey, setQuizKey] = useState(0)
  const [step, setStep] = useState(1)
  const [quiz, setQuiz] = useState({ stroke: 0, mistakes: 0, done: false })
  const [quizOpts, setQuizOpts] = useState({ outline: true, hintAfter: 2 })
  const colors = useThemeColors()
  const size = useBoxSize(300)
  const { data, error, loading } = useStrokeData(char)
  const info = charInfo(char)
  const n = data?.strokes.length ?? 0

  // Đổi chữ: quay về nét đầu tiên
  const [prevChar, setPrevChar] = useState(char)
  if (prevChar !== char) {
    setPrevChar(char)
    setStep(1)
    if (![...text].includes(char)) setText(char)
  }

  const pick = (c) => {
    setChar(c)
    if (![...text].includes(c)) setText(c)
  }
  const random = () => {
    const pool = allWords().filter((w) => w.hz.length === 1)
    pick(pool[Math.floor(Math.random() * pool.length)].hz)
  }

  return (
    <div className="guide">
      <div className="seg guide-modes" role="tablist" aria-label="Chế độ luyện viết">
        {MODES.map((m) => (
          <button key={m.value} type="button" role="tab" aria-selected={mode === m.value} className={mode === m.value ? 'active' : ''} onClick={() => setMode(m.value)}>
            {m.label}
          </button>
        ))}
      </div>

      <div className="write">
        <div className="guide-stage">
          {mode === 'free' ? (
            <MiGrid char={char} size={size} />
          ) : (
            <>
              <div className="migrid" style={{ width: size, height: size }}>
                <GridLines />
                {error ? (
                  <p className="guide-empty">Chưa có dữ liệu nét cho chữ “{char}”. Hãy thử chữ khác.</p>
                ) : mode === 'step' ? (
                  data && <div className="writer-host"><StaticChar data={data} upto={step} colors={colors} arrow size={size} label={`Chữ ${char}, nét ${step} trên ${n}`} /></div>
                ) : (
                  <WriterBox
                    char={char}
                    mode={mode}
                    size={size}
                    colors={colors}
                    speed={speed}
                    loop={loop}
                    playKey={playKey}
                    quizKey={quizKey}
                    quizOpts={quizOpts}
                    onQuizUpdate={setQuiz}
                  />
                )}
                {loading && !error && <p className="guide-empty muted">Đang tải nét chữ…</p>}
              </div>

              {mode === 'watch' && (
                <div className="guide-controls">
                  <button type="button" className="btn primary" onClick={() => { setLoop(false); setPlayKey((k) => k + 1) }}>▶ Phát lại</button>
                  <label className="check">
                    <input type="checkbox" id="guide-loop" checked={loop} onChange={(e) => setLoop(e.target.checked)} />
                    <span>Lặp lại</span>
                  </label>
                  <div className="seg seg-sm" role="group" aria-label="Tốc độ">
                    {SPEEDS.map((s) => (
                      <button key={s.value} type="button" className={speed === s.value ? 'active' : ''} onClick={() => setSpeed(s.value)}>{s.label}</button>
                    ))}
                  </div>
                </div>
              )}

              {mode === 'step' && data && (
                <div className="guide-controls">
                  <button type="button" className="btn" disabled={step <= 1} onClick={() => setStep((s) => s - 1)}>← Nét trước</button>
                  <span className="step-count">Nét <b>{step}</b>/{n}</span>
                  <button type="button" className="btn primary" disabled={step >= n} onClick={() => setStep((s) => s + 1)}>Nét tiếp →</button>
                </div>
              )}

              {mode === 'quiz' && (
                <div className="guide-controls quiz-controls">
                  <p className={quiz.done ? 'quiz-status done' : 'quiz-status'} aria-live="polite">
                    {quiz.done
                      ? quiz.mistakes === 0 ? 'Hoàn hảo! Viết đúng hết các nét.' : `Hoàn thành! Sai ${quiz.mistakes} lần.`
                      : `Viết nét ${Math.min(quiz.stroke + 1, n || 1)}/${n || '…'} · Sai ${quiz.mistakes} lần`}
                  </p>
                  <div className="row">
                    <button type="button" className="btn primary" onClick={() => setQuizKey((k) => k + 1)}>Làm lại</button>
                    <label className="check">
                      <input type="checkbox" id="quiz-outline" checked={quizOpts.outline} onChange={(e) => setQuizOpts((o) => ({ ...o, outline: e.target.checked }))} />
                      <span>Hiện chữ mờ</span>
                    </label>
                    <label className="check">
                      <input type="checkbox" id="quiz-hint" checked={quizOpts.hintAfter !== false} onChange={(e) => setQuizOpts((o) => ({ ...o, hintAfter: e.target.checked ? 2 : false }))} />
                      <span>Gợi ý khi sai 2 lần</span>
                    </label>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="write-side">
          <div className="char-card">
            <span className="hz char-big">{char}</span>
            <div className="char-meta">
              {info ? (
                <>
                  <Py text={info.py} className="lg" />
                  <span>{info.vi}</span>
                  <span className="word-hv">{info.hv}</span>
                </>
              ) : (
                <span className="muted small">Chữ ngoài danh sách HSK đơn âm</span>
              )}
              {n > 0 && <span className="small"><b>{n}</b> nét{data.radStrokes?.length ? ' · phần tô đỏ là bộ thủ' : ''}</span>}
            </div>
            <SpeakBtn text={char} small />
          </div>

          <p className="small guide-help">
            {mode === 'watch' && 'Xem chữ được viết lần lượt từng nét theo đúng thứ tự. Phần màu đỏ là bộ thủ của chữ.'}
            {mode === 'step' && 'Nét đỏ là nét đang viết. Chấm xanh có số là điểm đặt bút, mũi tên chỉ hướng kéo bút.'}
            {mode === 'quiz' && 'Dùng chuột hoặc ngón tay viết từng nét vào ô theo đúng thứ tự và hướng. Viết sai, nét đúng sẽ nhấp nháy để gợi ý.'}
            {mode === 'free' && 'Viết tự do theo chữ mờ, sau đó ẩn chữ mờ và tự viết lại để kiểm tra trí nhớ.'}
          </p>

          <label htmlFor="write-char" className="field-lbl">Nhập chữ hoặc từ muốn luyện</label>
          <div className="row">
            <input
              id="write-char"
              className="input hz write-input"
              value={text}
              maxLength={8}
              placeholder="Ví dụ: 学习"
              onChange={(e) => {
                const v = e.target.value
                setText(v)
                const first = [...v].find(isHan)
                if (first && ![...v].includes(char)) setChar(first)
              }}
            />
            <button type="button" className="btn ghost" onClick={random}>Chữ ngẫu nhiên</button>
          </div>
          {chars.length > 1 && (
            <div className="chips" aria-label="Các chữ trong từ đã nhập">
              {chars.map((c, i) => (
                <button key={c + i} type="button" className={c === char ? 'chip active hz' : 'chip hz'} onClick={() => setChar(c)}>{c}</button>
              ))}
            </div>
          )}
          <p className="field-lbl">Chữ gợi ý</p>
          <div className="chips">
            {[...QUICK].map((c) => (
              <button key={c} type="button" className={c === char ? 'chip active hz' : 'chip hz'} onClick={() => pick(c)}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      {data && (
        <section className="steps-section">
          <h3>Thứ tự nét của chữ {char} <span className="muted small">{n} nét · bấm vào ô để xem nét đó</span></h3>
          <ol className="stroke-steps">
            {data.strokes.map((_, i) => (
              <li key={i}>
                <button
                  type="button"
                  className={mode === 'step' && step === i + 1 ? 'step-cell active' : 'step-cell'}
                  onClick={() => { setMode('step'); setStep(i + 1) }}
                  aria-label={`Nét ${i + 1}`}
                >
                  <StaticChar data={data} upto={i + 1} colors={colors} size={64} label={`Nét ${i + 1}`} />
                  <span className="step-n">{i + 1}</span>
                </button>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  )
}

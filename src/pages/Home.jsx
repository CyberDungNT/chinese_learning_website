import { Link } from 'react-router-dom'
import { useStored } from '../lib/storage'
import { levelInfo, wordsOf, allWords, newWordCount } from '../data/hsk'

const stages = [
  { id: 'pinyin', title: 'Pinyin: thanh mẫu và vận mẫu', to: '/pinyin', time: '1–2 tuần', hz: '拼', desc: '21 thanh mẫu, 36 vận mẫu và quy tắc viết pinyin. Nền móng để đọc đúng mọi từ về sau.' },
  { id: 'tones', title: 'Bốn thanh điệu và biến điệu', to: '/pinyin', time: '1 tuần', hz: '声', desc: 'Nghe và phân biệt 4 thanh cùng thanh nhẹ, quy tắc biến điệu của thanh 3, 不 và 一.' },
  { id: 'strokes', title: 'Nét cơ bản và bút thuận', to: '/chu-han', time: '1 tuần', hz: '笔', desc: '8 nét cơ bản và 7 quy tắc thứ tự nét. Luyện tay trên ô chữ 米.' },
  { id: 'radicals', title: 'Bộ thủ thông dụng', to: '/chu-han', time: '2 tuần', hz: '部', desc: '50 bộ thủ hay gặp nhất, kèm âm Hán Việt để đoán nghĩa chữ mới.' },
  ...[1, 2, 3, 4, 5, 6].map((l) => ({
    id: `hsk${l}`,
    title: `${levelInfo[l].label} · ${levelInfo[l].cefr}`,
    to: `/hsk/${l}`,
    time: ['1–2 tháng', '2 tháng', '3 tháng', '4–6 tháng', '6–9 tháng', '9–12 tháng'][l - 1],
    hz: '一二三四五六'[l - 1],
    desc: levelInfo[l].goal,
    level: l,
  })),
]

export default function Home() {
  const [done, setDone] = useStored('roadmap', {})
  const [srs] = useStored('srs', {})
  const [best] = useStored('quiz', {})

  const known = (ids) => ids.filter((id) => (srs[id]?.box ?? 0) >= 3).length
  const total = allWords().length
  const knownAll = known(allWords().map((w) => w.id))
  const doneCount = stages.filter((s) => done[s.id]).length
  const next = stages.find((s) => !done[s.id])

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-mark hz-brush" aria-hidden="true">学</div>
        <div className="hero-text">
          <p className="eyebrow">Học tiếng Trung từ A đến Z</p>
          <h1>Từ âm tiết đầu tiên đến HSK 6</h1>
          <p className="lede">
            Lộ trình 10 chặng cho người Việt: học phát âm, nhận mặt chữ, rồi đi qua từng cấp HSK với từ vựng,
            ngữ pháp, flashcard và bài kiểm tra. Âm Hán Việt đi kèm mỗi từ, vì khoảng 60% từ vựng tiếng Việt có gốc Hán.
          </p>
          <div className="row">
            {next ? (
              <Link to={next.to} className="btn primary">Học tiếp: {next.title}</Link>
            ) : (
              <Link to="/kiem-tra" className="btn primary">Ôn tập tổng hợp</Link>
            )}
            <Link to="/flashcard" className="btn ghost">Mở flashcard</Link>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Tiến độ">
        <div className="stat">
          <span className="stat-num">{doneCount}<small>/{stages.length}</small></span>
          <span className="stat-lbl">chặng đã xong</span>
        </div>
        <div className="stat">
          <span className="stat-num">{knownAll}<small>/{total}</small></span>
          <span className="stat-lbl">từ đã thuộc (flashcard hộp 3 trở lên)</span>
        </div>
        <div className="stat">
          <span className="stat-num">{Object.keys(best).length}<small>/6</small></span>
          <span className="stat-lbl">cấp đã làm bài kiểm tra</span>
        </div>
      </section>

      <section>
        <h2>Lộ trình</h2>
        <p className="muted">Đánh dấu chặng khi bạn thấy đã nắm chắc. Thời gian là ước lượng cho người học khoảng 1 giờ mỗi ngày.</p>
        <ol className="road">
          {stages.map((s, i) => {
            const ids = s.level ? wordsOf(s.level).map((w) => w.id) : null
            const pct = ids ? Math.round((known(ids) / ids.length) * 100) : null
            return (
              <li key={s.id} className={done[s.id] ? 'stage done' : 'stage'}>
                <span className="stage-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="stage-hz hz" aria-hidden="true">{s.hz}</span>
                <div className="stage-body">
                  <Link to={s.to} className="stage-title">{s.title}</Link>
                  <p>{s.desc}</p>
                  <p className="stage-meta">
                    <span>{s.time}</span>
                    {s.level && <span>{newWordCount(s.level)} từ mới · tích lũy {levelInfo[s.level].words} từ</span>}
                    {pct !== null && <span>Đã thuộc {pct}% từ của cấp</span>}
                    {s.level && best[s.level] != null && <span>Kiểm tra cao nhất {best[s.level]}/10</span>}
                  </p>
                </div>
                <label className="check">
                  <input
                    type="checkbox"
                    id={`stage-${s.id}`}
                    checked={!!done[s.id]}
                    onChange={(e) => setDone((d) => ({ ...d, [s.id]: e.target.checked }))}
                  />
                  <span>Đã xong</span>
                </label>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="routine">
        <h2>Một buổi học 60 phút</h2>
        <div className="routine-grid">
          <div><b>10 phút</b><span>Ôn flashcard đến hạn hôm nay</span></div>
          <div><b>20 phút</b><span>Học 10–15 từ mới, nghe và đọc to từng từ</span></div>
          <div><b>15 phút</b><span>Một điểm ngữ pháp, tự đặt 3 câu</span></div>
          <div><b>10 phút</b><span>Luyện viết 5 chữ trên ô 米</span></div>
          <div><b>5 phút</b><span>Làm một bài kiểm tra ngắn</span></div>
        </div>
      </section>
    </div>
  )
}

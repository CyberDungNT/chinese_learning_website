import { useState } from 'react'
import { strokes, strokeRules, radicals, structures } from '../data/hanzi'
import { MiGrid, Py, SpeakBtn, Tabs } from '../components/ui'

const tabs = [
  { value: 'strokes', label: 'Nét cơ bản' },
  { value: 'order', label: 'Bút thuận' },
  { value: 'radicals', label: 'Bộ thủ' },
  { value: 'write', label: 'Luyện viết' },
]

const practiceSet = '人口大小中国你好学生月日水火木山'

export default function Hanzi() {
  const [tab, setTab] = useState('strokes')
  const [char, setChar] = useState('永')
  const practice = (c) => {
    setChar(c)
    setTab('write')
  }
  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Chặng 3–4</p>
        <h1>Chữ Hán & bộ thủ</h1>
        <p className="lede">
          Mọi chữ Hán đều ghép từ một số ít nét cơ bản. Chữ <span className="hz">永</span> (vĩnh) chứa gần đủ
          các nét chính, nên thư pháp Trung Hoa dùng nó làm bài tập đầu tiên.
        </p>
      </header>
      <Tabs tabs={tabs} value={tab} onChange={setTab} id="hanzi-tabs" />

      {tab === 'strokes' && (
        <div className="stroke-grid">
          {strokes.map((s) => (
            <article key={s.zh} className="stroke">
              <span className="stroke-glyph hz">{s.glyph}</span>
              <div>
                <h4>{s.vi} <span className="hz">{s.zh}</span> <Py text={s.py} /></h4>
                <p className="small">{s.how}</p>
                <p className="small muted">
                  Ví dụ:{' '}
                  {s.ex.split(' ').map((c) => (
                    <button key={c} type="button" className="linkish hz" onClick={() => practice(c)}>{c}</button>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {tab === 'order' && (
        <div className="stack">
          <div className="order-list">
            {strokeRules.map((r, i) => (
              <article key={r.zh} className="order">
                <span className="order-n">{i + 1}</span>
                <button type="button" className="order-ex hz" onClick={() => practice(r.ex)} title="Luyện viết chữ này">{r.ex}</button>
                <div>
                  <h4>{r.rule}</h4>
                  <p className="small"><span className="hz">{r.zh}</span> · {r.order}</p>
                </div>
              </article>
            ))}
          </div>
          <h3>Cấu trúc chữ</h3>
          <div className="struct-grid">
            {structures.map((s) => (
              <div key={s.name} className="struct">
                <b>{s.name}</b>
                <span className="hz lg">{s.ex}</span>
                <span className="small muted">{s.note}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'radicals' && <Radicals onPractice={practice} />}

      {tab === 'write' && (
        <div className="write">
          <MiGrid char={char} />
          <div className="write-side">
            <h3>Luyện viết trên ô 米</h3>
            <p className="small">
              Ô chữ 米 (米字格) có đường kẻ ngang, dọc và hai đường chéo giúp bạn căn tỷ lệ. Viết theo chữ mờ vài lần,
              sau đó ẩn chữ mờ và tự viết lại. Dùng chuột, bút cảm ứng hoặc ngón tay.
            </p>
            <label htmlFor="write-char" className="field-lbl">Chữ muốn luyện</label>
            <input
              id="write-char"
              className="input hz"
              value={char}
              maxLength={2}
              onChange={(e) => {
                const c = [...e.target.value].pop()
                if (c) setChar(c)
              }}
            />
            <div className="chips">
              {[...practiceSet].map((c) => (
                <button key={c} type="button" className={c === char ? 'chip active hz' : 'chip hz'} onClick={() => setChar(c)}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Radicals({ onPractice }) {
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()
  const list = radicals.filter((r) => !term || r.join(' ').toLowerCase().includes(term))
  return (
    <div className="stack">
      <p className="muted">
        Hệ thống Khang Hy có 214 bộ thủ. Dưới đây là 50 bộ gặp nhiều nhất. Bộ thủ thường gợi ý nghĩa:
        chữ có bộ <span className="hz">氵</span> thường liên quan đến nước, bộ <span className="hz">讠</span> liên quan đến lời nói.
      </p>
      <label htmlFor="rad-q" className="field-lbl">Tìm bộ thủ</label>
      <input id="rad-q" className="input" placeholder="Ví dụ: thủy, nước, 口" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="table-wrap">
        <table className="rad-table">
          <thead>
            <tr><th>Bộ</th><th>Pinyin</th><th>Hán Việt</th><th>Nghĩa</th><th className="num">Số nét</th><th>Chữ ví dụ</th></tr>
          </thead>
          <tbody>
            {list.map(([r, py, hv, vi, n, ex]) => (
              <tr key={r}>
                <td className="hz rad">{r}</td>
                <td><Py text={py} /></td>
                <td>{hv}</td>
                <td>{vi}</td>
                <td className="num">{n}</td>
                <td>
                  <span className="ex-chars">
                    {ex.split(' ').map((c) => (
                      <button key={c} type="button" className="linkish hz" onClick={() => onPractice(c)} title="Luyện viết">{c}</button>
                    ))}
                    <SpeakBtn text={ex.replaceAll(' ', '，')} small />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <p className="muted">Không có bộ nào khớp "{q}". Thử gõ tên Hán Việt hoặc nghĩa.</p>}
      </div>
    </div>
  )
}

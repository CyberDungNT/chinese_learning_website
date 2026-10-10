// Tạo dữ liệu thứ tự nét cho các chữ Hán dùng trong web.
// Đọc từ gói hanzi-writer-data (dữ liệu Make Me a Hanzi, giấy phép Arphic Public License)
// và gộp thành 64 file nhỏ trong public/strokes/ để web chỉ tải phần cần thiết.
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const dataDir = dirname(require.resolve('hanzi-writer-data/package.json'))
// fileURLToPath xử lý đúng đường dẫn trên cả Windows (C:\...) lẫn macOS/Linux
const root = fileURLToPath(new URL('..', import.meta.url))
const outDir = join(root, 'public', 'strokes')
export const SHARDS = 64

const isHan = (c) => /\p{Script=Han}/u.test(c)
const chars = new Set()
const addText = (t) => { for (const c of t) if (isHan(c)) chars.add(c) }

// Từ vựng HSK + mọi chữ xuất hiện trong mã nguồn dữ liệu (bộ thủ, ví dụ, ngữ pháp...)
for (const row of JSON.parse(readFileSync(join(root, 'src/data/hsk-words.json'), 'utf8'))) addText(row[1])
for (const f of ['hanzi.js', 'pinyin.js', 'grammar.js']) addText(readFileSync(join(root, 'src/data', f), 'utf8'))
addText(readFileSync(join(root, 'src/pages/Hanzi.jsx'), 'utf8'))

const shardOf = (c) => c.codePointAt(0) % SHARDS
const shards = Array.from({ length: SHARDS }, () => ({}))
let found = 0
const missing = []
for (const c of chars) {
  const f = join(dataDir, `${c}.json`)
  if (!existsSync(f)) { missing.push(c); continue }
  shards[shardOf(c)][c] = JSON.parse(readFileSync(f, 'utf8'))
  found++
}

if (existsSync(outDir)) rmSync(outDir, { recursive: true })
mkdirSync(outDir, { recursive: true })
shards.forEach((s, i) => writeFileSync(join(outDir, `${i}.json`), JSON.stringify(s)))
writeFileSync(join(outDir, 'chars.json'), JSON.stringify([...chars].filter((c) => !missing.includes(c)).join('')))
console.log(`strokes: ${found} chữ, ${SHARDS} file${missing.length ? `, thiếu dữ liệu: ${missing.join('')}` : ''}`)

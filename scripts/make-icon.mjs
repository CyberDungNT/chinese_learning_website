// Tạo biểu tượng web (favicon) từ nét chữ 汉 trong hanzi-writer-data
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const dataDir = dirname(require.resolve('hanzi-writer-data/package.json'))
const root = fileURLToPath(new URL('..', import.meta.url))
const { strokes } = JSON.parse(readFileSync(join(dataDir, '汉.json'), 'utf8'))

// Căn chữ vào giữa ô 512×512 theo khung bao thực tế của các nét
const nums = strokes.join(' ').match(/-?\d+(\.\d+)?/g).map(Number)
const xs = nums.filter((_, i) => i % 2 === 0), ys = nums.filter((_, i) => i % 2 === 1).map((y) => 900 - y)
const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
const k = +(330 / Math.max(maxX - minX, maxY - minY)).toFixed(4)
const tx = +(256 - k * (minX + maxX) / 2).toFixed(1)
const ty = +(262 - k * (minY + maxY) / 2).toFixed(1)

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e3f1fb"/>
      <stop offset="0.55" stop-color="#a9cfec"/>
      <stop offset="1" stop-color="#6fa6d2"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="116" fill="url(#bg)"/>
  <path d="M116 0h280a116 116 0 0 1 116 116v40C380 120 132 120 0 156v-40A116 116 0 0 1 116 0z" fill="url(#shine)"/>
  <g transform="translate(${tx} ${ty}) scale(${k})">
    <g transform="translate(0 900) scale(1 -1)" fill="#0f2c44" stroke="#0f2c44" stroke-width="34" stroke-linejoin="round">
      ${strokes.map((d) => `<path d="${d}"/>`).join('\n      ')}
    </g>
  </g>
</svg>
`
writeFileSync(join(root, 'public', 'favicon.svg'), svg)
console.log('favicon.svg ok')

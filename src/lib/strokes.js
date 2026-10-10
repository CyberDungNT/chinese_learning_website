// Tải dữ liệu thứ tự nét (strokes, medians, radStrokes) cho một chữ Hán.
// Ưu tiên file đi kèm web (public/strokes/<n>.json, tạo bởi scripts/build-strokes.mjs).
// Chữ không có sẵn thì thử tải từ CDN jsDelivr (cần mạng; có thể bị chặn ở một số môi trường).
const SHARDS = 64
const shardCache = new Map()
const charCache = new Map()

const base = import.meta.env.BASE_URL || './'

function loadShard(n) {
  if (!shardCache.has(n)) {
    shardCache.set(
      n,
      fetch(`${base}strokes/${n}.json`)
        .then((r) => (r.ok ? r.json() : {}))
        .catch(() => ({})),
    )
  }
  return shardCache.get(n)
}

export function loadStrokeData(char) {
  if (!char) return Promise.reject(new Error('empty'))
  if (!charCache.has(char)) {
    const p = loadShard(char.codePointAt(0) % SHARDS).then((shard) => {
      if (shard[char]) return shard[char]
      return fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${encodeURIComponent(char)}.json`).then((r) => {
        if (!r.ok) throw new Error('missing')
        return r.json()
      })
    })
    p.catch(() => charCache.delete(char))
    charCache.set(char, p)
  }
  return charCache.get(char)
}

// Hàm nạp dữ liệu theo định dạng HanziWriter yêu cầu
export function hanziWriterLoader(char, onComplete, onError) {
  loadStrokeData(char).then(onComplete, onError)
}

export const isHan = (c) => /\p{Script=Han}/u.test(c)

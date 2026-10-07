// Từ vựng HSK 1–6 đầy đủ theo chuẩn HSK 2.0: 150 / 150 / 300 / 600 / 1300 / 2500 từ (tổng 4991 mục).
// Danh sách từ và pinyin lấy từ dự án mã nguồn mở "complete-hsk-vocabulary" (giấy phép MIT,
// xem LICENSE-hsk-vocabulary.txt). Nghĩa tiếng Việt và âm Hán Việt được biên soạn thêm.
//
// hsk-words.json: mỗi phần tử là [cấp, chữ Hán, pinyin, nghĩa tiếng Việt, âm Hán Việt, nhóm từ loại]
import rows from './hsk-words.json'

export const levelInfo = {
  1: { label: 'HSK 1', words: 150, cefr: 'A1', goal: 'Hiểu và dùng câu rất đơn giản: chào hỏi, giới thiệu bản thân, số đếm, thời gian.' },
  2: { label: 'HSK 2', words: 300, cefr: 'A2', goal: 'Giao tiếp đơn giản về sinh hoạt hằng ngày, mua sắm, đi lại.' },
  3: { label: 'HSK 3', words: 600, cefr: 'B1', goal: 'Giao tiếp cơ bản trong học tập, công việc, du lịch tại Trung Quốc.' },
  4: { label: 'HSK 4', words: 1200, cefr: 'B2', goal: 'Thảo luận nhiều chủ đề, giao tiếp trôi chảy với người bản ngữ.' },
  5: { label: 'HSK 5', words: 2500, cefr: 'C1', goal: 'Đọc báo, xem phim, diễn thuyết tương đối hoàn chỉnh.' },
  6: { label: 'HSK 6', words: 5000, cefr: 'C2', goal: 'Hiểu dễ dàng thông tin nghe đọc, diễn đạt trôi chảy bằng văn nói và viết.' },
}

// Thứ tự hiển thị các nhóm từ loại
const GROUP_ORDER = [
  'Danh từ',
  'Động từ',
  'Tính từ',
  'Phó từ',
  'Số từ & lượng từ',
  'Đại từ',
  'Hư từ (giới từ, liên từ, trợ từ)',
  'Thành ngữ & cụm cố định',
  'Từ khác',
]

function build() {
  const byLevel = {}
  for (const [level, hz, py, vi, hv, topic] of rows) {
    const w = { id: `${level}-${hz}`, level, topic, hz, py, vi, hv }
    ;(byLevel[level] ||= {})[topic] ||= []
    byLevel[level][topic].push(w)
  }
  const out = {}
  for (const level of Object.keys(byLevel)) {
    out[level] = GROUP_ORDER.filter((t) => byLevel[level][t]).map((topic) => ({ topic, words: byLevel[level][topic] }))
  }
  return out
}

export const vocab = build()

// Số từ mới riêng của mỗi cấp (không tính các cấp dưới)
export const newWordCount = (level) => vocab[level].reduce((n, t) => n + t.words.length, 0)

const cache = {}
export const wordsOf = (level) => (cache[level] ||= vocab[level].flatMap((t) => t.words))
export const allWords = () => (cache.all ||= [1, 2, 3, 4, 5, 6].flatMap(wordsOf))

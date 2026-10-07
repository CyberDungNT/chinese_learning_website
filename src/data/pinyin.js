// Dữ liệu Pinyin: thanh mẫu, vận mẫu, thanh điệu, biến điệu

export const initials = [
  { group: 'Âm môi', items: [
    { py: 'b', ex: '爸', exPy: 'bà', tip: 'Giống "p" trong "sport": không bật hơi.' },
    { py: 'p', ex: '怕', exPy: 'pà', tip: '"p" bật hơi mạnh, để tay trước miệng thấy luồng hơi.' },
    { py: 'm', ex: '妈', exPy: 'mā', tip: 'Như "m" tiếng Việt.' },
    { py: 'f', ex: '发', exPy: 'fā', tip: 'Như "ph" tiếng Việt.' },
  ]},
  { group: 'Âm đầu lưỡi', items: [
    { py: 'd', ex: '大', exPy: 'dà', tip: 'Như "t" tiếng Việt, không bật hơi.' },
    { py: 't', ex: '他', exPy: 'tā', tip: 'Như "th" tiếng Việt, bật hơi.' },
    { py: 'n', ex: '你', exPy: 'nǐ', tip: 'Như "n" tiếng Việt.' },
    { py: 'l', ex: '来', exPy: 'lái', tip: 'Như "l" tiếng Việt.' },
  ]},
  { group: 'Âm cuống lưỡi', items: [
    { py: 'g', ex: '哥', exPy: 'gē', tip: 'Như "c/k" tiếng Việt, không bật hơi.' },
    { py: 'k', ex: '看', exPy: 'kàn', tip: 'Như "k" nhưng bật hơi mạnh.' },
    { py: 'h', ex: '好', exPy: 'hǎo', tip: 'Giữa "h" và "kh" tiếng Việt, xát ở cuống lưỡi.' },
  ]},
  { group: 'Âm mặt lưỡi', items: [
    { py: 'j', ex: '鸡', exPy: 'jī', tip: 'Gần "ch" tiếng Việt, mặt lưỡi áp vào ngạc cứng, không bật hơi.' },
    { py: 'q', ex: '七', exPy: 'qī', tip: 'Như j nhưng bật hơi.' },
    { py: 'x', ex: '西', exPy: 'xī', tip: 'Gần "x" tiếng Việt, lưỡi phẳng và môi dẹt.' },
  ]},
  { group: 'Âm uốn lưỡi', items: [
    { py: 'zh', ex: '中', exPy: 'zhōng', tip: 'Gần "tr" tiếng Việt, cong đầu lưỡi lên, không bật hơi.' },
    { py: 'ch', ex: '吃', exPy: 'chī', tip: 'Như zh nhưng bật hơi.' },
    { py: 'sh', ex: '是', exPy: 'shì', tip: 'Gần "s" (miền Bắc phát âm uốn lưỡi), cong đầu lưỡi.' },
    { py: 'r', ex: '热', exPy: 'rè', tip: 'Đầu lưỡi cong như sh nhưng rung dây thanh, gần "r" nhẹ.' },
  ]},
  { group: 'Âm đầu lưỡi trước', items: [
    { py: 'z', ex: '字', exPy: 'zì', tip: 'Như "ts" không bật hơi, đầu lưỡi chạm chân răng trên.' },
    { py: 'c', ex: '菜', exPy: 'cài', tip: 'Như "ts" bật hơi mạnh.' },
    { py: 's', ex: '四', exPy: 'sì', tip: 'Như "x" tiếng Việt.' },
  ]},
  { group: 'Bán nguyên âm', items: [
    { py: 'y', ex: '一', exPy: 'yī', tip: 'Viết thay cho i khi i đứng đầu âm tiết.' },
    { py: 'w', ex: '五', exPy: 'wǔ', tip: 'Viết thay cho u khi u đứng đầu âm tiết.' },
  ]},
]

export const finals = [
  { group: 'Vận mẫu đơn', items: [
    ['a', '八', 'bā', 'Như "a", mở rộng miệng.'],
    ['o', '波', 'bō', 'Như "ô" hơi chuyển về "ua".'],
    ['e', '饿', 'è', 'Gần "ưa", không tròn môi.'],
    ['i', '一', 'yī', 'Như "i".'],
    ['u', '五', 'wǔ', 'Như "u", tròn môi.'],
    ['ü', '鱼', 'yú', 'Môi tròn như "u" nhưng lưỡi đặt như "i". Không có trong tiếng Việt.'],
  ]},
  { group: 'Vận mẫu kép', items: [
    ['ai', '爱', 'ài', 'Như "ai".'],
    ['ei', '黑', 'hēi', 'Như "ây".'],
    ['ao', '好', 'hǎo', 'Như "ao".'],
    ['ou', '狗', 'gǒu', 'Như "âu".'],
    ['ia', '家', 'jiā', 'Như "ia" đọc liền thành "i-a".'],
    ['ie', '谢', 'xiè', 'Như "iê".'],
    ['ua', '花', 'huā', 'Như "oa".'],
    ['uo', '多', 'duō', 'Như "ua" (u-ô).'],
    ['üe', '学', 'xué', 'ü + ê. Sau j q x y viết thành ue.'],
    ['iao', '小', 'xiǎo', 'Như "i-ao".'],
    ['iu', '六', 'liù', 'Viết tắt của iou, đọc gần "iêu".'],
    ['uai', '快', 'kuài', 'Như "oai".'],
    ['ui', '对', 'duì', 'Viết tắt của uei, đọc gần "uây".'],
  ]},
  { group: 'Vận mẫu mũi', items: [
    ['an', '看', 'kàn', 'Như "an".'],
    ['en', '人', 'rén', 'Như "ân".'],
    ['ang', '忙', 'máng', 'Như "ang".'],
    ['eng', '冷', 'lěng', 'Như "âng".'],
    ['ong', '中', 'zhōng', 'Như "ung".'],
    ['ian', '天', 'tiān', 'Đọc gần "iên".'],
    ['in', '心', 'xīn', 'Như "in".'],
    ['iang', '想', 'xiǎng', 'Như "i-ang".'],
    ['ing', '听', 'tīng', 'Như "inh" nhưng lưỡi lùi về sau.'],
    ['iong', '熊', 'xióng', 'Như "i-ung".'],
    ['uan', '关', 'guān', 'Như "oan".'],
    ['un', '春', 'chūn', 'Viết tắt của uen, đọc gần "uân".'],
    ['uang', '黄', 'huáng', 'Như "oang".'],
    ['ueng', '翁', 'wēng', 'Đứng một mình viết weng.'],
    ['üan', '远', 'yuǎn', 'ü + an, đọc gần "uyên".'],
    ['ün', '云', 'yún', 'ü + n, đọc gần "uyn".'],
  ]},
  { group: 'Vận mẫu đặc biệt', items: [
    ['er', '二', 'èr', 'Âm "ơ" rồi cong lưỡi lên.'],
    ['-i (zi ci si)', '字', 'zì', 'Sau z c s, i đọc gần "ư".'],
    ['-i (zhi chi shi ri)', '是', 'shì', 'Sau zh ch sh r, i đọc gần "ư" có uốn lưỡi.'],
  ]},
]

// Chao tone letters: 5 = cao nhất, 1 = thấp nhất
export const tones = [
  { n: 1, name: 'Thanh 1', mark: 'ā', contour: [5, 5], code: '55', hz: '妈', py: 'mā', vi: 'mẹ', desc: 'Cao và bằng, giữ nguyên độ cao. Gần thanh ngang nhưng cao hơn.' },
  { n: 2, name: 'Thanh 2', mark: 'á', contour: [3, 5], code: '35', hz: '麻', py: 'má', vi: 'cây gai; tê', desc: 'Đi lên từ giữa đến cao. Gần thanh sắc.' },
  { n: 3, name: 'Thanh 3', mark: 'ǎ', contour: [2, 1, 4], code: '214', hz: '马', py: 'mǎ', vi: 'con ngựa', desc: 'Xuống thấp rồi lên. Gần thanh hỏi. Trong lời nói thường chỉ đọc nửa đầu (21).' },
  { n: 4, name: 'Thanh 4', mark: 'à', contour: [5, 1], code: '51', hz: '骂', py: 'mà', vi: 'mắng', desc: 'Rơi mạnh từ cao xuống thấp, dứt khoát. Gần thanh huyền nhưng bắt đầu cao hơn.' },
  { n: 5, name: 'Thanh nhẹ', mark: 'a', contour: [3, 3], code: '—', hz: '吗', py: 'ma', vi: 'trợ từ nghi vấn', desc: 'Đọc nhẹ và ngắn, không đánh dấu. Độ cao phụ thuộc âm tiết đứng trước.' },
]

export const sandhi = [
  {
    title: 'Hai thanh 3 đứng liền nhau',
    rule: 'Thanh 3 đầu đọc thành thanh 2. Chữ viết vẫn giữ dấu thanh 3.',
    examples: [
      { hz: '你好', py: 'nǐ hǎo', read: 'ní hǎo', vi: 'xin chào' },
      { hz: '可以', py: 'kě yǐ', read: 'ké yǐ', vi: 'có thể' },
    ],
  },
  {
    title: 'Biến điệu của 不 (bù)',
    rule: 'Đứng trước thanh 4 đọc thành bú. Các trường hợp khác giữ bù.',
    examples: [
      { hz: '不是', py: 'bù shì', read: 'bú shì', vi: 'không phải' },
      { hz: '不好', py: 'bù hǎo', read: 'bù hǎo', vi: 'không tốt' },
    ],
  },
  {
    title: 'Biến điệu của 一 (yī)',
    rule: 'Trước thanh 4 đọc yí. Trước thanh 1, 2, 3 đọc yì. Đọc riêng, đếm số hoặc số thứ tự giữ yī.',
    examples: [
      { hz: '一个', py: 'yī gè', read: 'yí gè', vi: 'một cái' },
      { hz: '一天', py: 'yī tiān', read: 'yì tiān', vi: 'một ngày' },
      { hz: '第一', py: 'dì yī', read: 'dì yī', vi: 'thứ nhất' },
    ],
  },
]

export const spellingRules = [
  { rule: 'ü sau j, q, x, y bỏ hai chấm', ex: 'j + ü → ju (居), q + üe → que (缺), y + ü → yu (鱼)' },
  { rule: 'ü sau n, l giữ hai chấm', ex: 'nǚ (女), lǜ (绿)' },
  { rule: 'iou, uei, uen viết tắt khi có thanh mẫu', ex: 'l + iou → liu (六), d + uei → dui (对), ch + uen → chun (春)' },
  { rule: 'Dấu thanh đặt theo thứ tự ưu tiên a > o > e > i, u, ü', ex: 'hǎo, gǒu, xiè. Riêng iu và ui đặt dấu ở chữ sau: liù, duì' },
  { rule: 'Âm tiết bắt đầu bằng a, o, e đứng sau âm tiết khác thì thêm dấu cách âm', ex: "Tiān'ānmén (天安门), nǚ'ér (女儿)" },
]

// Chữ đơn dùng cho bài luyện nghe thanh điệu
export const toneDrill = [
  ['妈', 'mā'], ['麻', 'má'], ['马', 'mǎ'], ['骂', 'mà'],
  ['八', 'bā'], ['拔', 'bá'], ['把', 'bǎ'], ['爸', 'bà'],
  ['汤', 'tāng'], ['糖', 'táng'], ['躺', 'tǎng'], ['烫', 'tàng'],
  ['衣', 'yī'], ['姨', 'yí'], ['椅', 'yǐ'], ['亿', 'yì'],
  ['书', 'shū'], ['熟', 'shú'], ['鼠', 'shǔ'], ['树', 'shù'],
  ['飞', 'fēi'], ['肥', 'féi'], ['匪', 'fěi'], ['费', 'fèi'],
  ['通', 'tōng'], ['同', 'tóng'], ['桶', 'tǒng'], ['痛', 'tòng'],
  ['汤', 'tāng'], ['来', 'lái'], ['好', 'hǎo'], ['去', 'qù'],
  ['天', 'tiān'], ['钱', 'qián'], ['水', 'shuǐ'], ['四', 'sì'],
]

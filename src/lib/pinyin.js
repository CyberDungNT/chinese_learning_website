const marks = {
  1: 'āēīōūǖĀĒĪŌŪǕ',
  2: 'áéíóúǘÁÉÍÓÚǗ',
  3: 'ǎěǐǒǔǚǍĚǏǑǓǙ',
  4: 'àèìòùǜÀÈÌÒÙǛ',
}

export function toneOf(syllable) {
  for (const ch of syllable) {
    for (const t of [1, 2, 3, 4]) if (marks[t].includes(ch)) return t
  }
  return 5
}

export function syllables(py) {
  return py.split(/\s+/).filter(Boolean)
}

export function joinPinyin(py) {
  return syllables(py).join('')
}

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function sample(arr, n) {
  return shuffle(arr).slice(0, n)
}

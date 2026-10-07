// Chế độ giao diện: 'light' | 'dark' | 'system'
// 'system' = theo cài đặt của máy (prefers-color-scheme). CSS đọc thuộc tính data-theme trên <html>.
import { useEffect, useState } from 'react'
import { load, save } from './storage'

const root = typeof document !== 'undefined' ? document.documentElement : null
// Nếu trang được nhúng trong khung có sẵn data-theme (ví dụ trình xem artifact), giữ lại để khôi phục khi chọn "Hệ thống"
const hostTheme = root?.getAttribute('data-theme') ?? null

export function applyTheme(mode) {
  if (!root) return
  if (mode === 'light' || mode === 'dark') root.setAttribute('data-theme', mode)
  else if (hostTheme) root.setAttribute('data-theme', hostTheme)
  else root.removeAttribute('data-theme')
}

export function initTheme() {
  applyTheme(load('theme', 'system'))
}

export function useTheme() {
  const [mode, setMode] = useState(() => load('theme', 'system'))
  useEffect(() => {
    applyTheme(mode)
    save('theme', mode)
  }, [mode])
  return [mode, setMode]
}

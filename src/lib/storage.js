import { useEffect, useState } from 'react'

const PREFIX = 'lthn:'

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* bộ nhớ trình duyệt bị chặn: tiến độ chỉ giữ trong phiên này */
  }
}

// useState có lưu vào localStorage, đồng bộ giữa các component qua sự kiện
export function useStored(key, fallback) {
  const [value, setValue] = useState(() => load(key, fallback))
  useEffect(() => {
    const onChange = (e) => {
      if (e.detail === key) setValue(load(key, fallback))
    }
    window.addEventListener('lthn-store', onChange)
    return () => window.removeEventListener('lthn-store', onChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  const update = (next) => {
    setValue((prev) => {
      const v = typeof next === 'function' ? next(prev) : next
      save(key, v)
      queueMicrotask(() => window.dispatchEvent(new CustomEvent('lthn-store', { detail: key })))
      return v
    })
  }
  return [value, update]
}

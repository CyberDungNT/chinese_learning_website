// ====== CẤU HÌNH NÚT LIÊN HỆ ======
// Dán đường link của bạn vào CONTACT_URL (Facebook, Zalo, Messenger, Google Form, email…).
//   Ví dụ: 'https://zalo.me/0912345678'
//          'https://m.me/tenfanpage'
//          'https://www.facebook.com/tenban'
//          'mailto:ban@example.com'
// Có thể đặt bằng biến môi trường khi build: VITE_CONTACT_URL=https://... npm run build
// Để trống ('') thì nút liên hệ sẽ bị ẩn.

export const CONTACT_URL = import.meta.env.VITE_CONTACT_URL || 'https://example.com/lien-he'

// Chữ hiển thị trên nút
export const CONTACT_LABEL = import.meta.env.VITE_CONTACT_LABEL || 'Liên hệ'

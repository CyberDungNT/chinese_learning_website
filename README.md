# Lộ Trình Hán Ngữ

Web học tiếng Trung từ A đến Z cho người Việt, viết bằng React + Vite.

## Tính năng
- **Pinyin & thanh điệu**: 23 thanh mẫu, 36+ vận mẫu, biểu đồ 4 thanh (thang 5 bậc), biến điệu (thanh 3, 不, 一), quy tắc chính tả, bài luyện nghe thanh điệu.
- **Chữ Hán & bộ thủ**: 8 nét cơ bản, 7 quy tắc bút thuận, cấu trúc chữ, 50 bộ thủ thông dụng (có Hán Việt, tìm kiếm), ô luyện viết 米字格 vẽ bằng chuột/cảm ứng.
- **HSK 1–6 đầy đủ (4991 từ, chuẩn HSK 2.0)**: chữ Hán, pinyin tô màu thanh điệu, nghĩa tiếng Việt, âm Hán Việt; nhóm theo từ loại, có tìm kiếm và phân trang. Ngữ pháp trọng tâm kèm ví dụ.
- **Giao diện Sáng / Tối / Theo hệ thống**, lưu lựa chọn trên trình duyệt.
- **Flashcard** hệ Leitner (1, 2, 4, 7, 15 ngày), **Kiểm tra** 10 câu 4 dạng (nghĩa, chữ Hán, pinyin, nghe).
- Phát âm bằng Web Speech API (giọng zh-CN có sẵn trong trình duyệt). Tiến độ lưu ở localStorage.

## Chạy dự án
```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # bản build thường trong dist/ (deploy Vercel, Netlify, GitHub Pages)
npm run build:single # gộp thành 1 file dist-single/index.html
```

## Cấu trúc
```
src/
  data/       pinyin.js, hanzi.js, hsk.js (từ vựng), grammar.js (ngữ pháp)
  lib/        speak.js (phát âm), storage.js (lưu tiến độ), pinyin.js (tiện ích)
  components/ ui.jsx (Py, SpeakBtn, ToneContour, MiGrid, Tabs)
  pages/      Home, Pinyin, Hanzi, Level, Flashcards, Quiz
```

## Dữ liệu từ vựng
`src/data/hsk-words.json` chứa 4991 từ HSK 2.0 (150 / 147 / 298 / 598 / 1298 / 2500 từ mới mỗi cấp). Mỗi phần tử:
```
[cấp, "chữ Hán", "pin yin theo âm tiết", "nghĩa tiếng Việt", "âm Hán Việt", "nhóm từ loại"]
```
Danh sách từ và pinyin lấy từ dự án mã nguồn mở [complete-hsk-vocabulary](https://github.com/drkameleon/complete-hsk-vocabulary) (MIT, xem `src/data/LICENSE-hsk-vocabulary.txt`). Nghĩa tiếng Việt và âm Hán Việt được biên soạn thêm; với từ đa nghĩa chỉ ghi nghĩa thông dụng nhất. Bạn có thể sửa trực tiếp trong file JSON.
Ngữ pháp thêm trong `src/data/grammar.js`.

## Nút liên hệ
Nút "Liên hệ" nổi ở góc dưới bên phải, bấm vào sẽ mở link trong tab mới. Đổi link trong `src/config.js`:
```js
export const CONTACT_URL = 'https://www.facebook.com/z.nguyentiendung'
```
Hoặc truyền khi build, không cần sửa code:
```bash
VITE_CONTACT_URL=https://m.me/tenfanpage VITE_CONTACT_LABEL="Nhắn tin" npm run build
```
Để `CONTACT_URL = ''` thì nút sẽ ẩn.

# Hướng dẫn nhập câu hỏi hàng loạt

## 1. Tổng quan

Tính năng nhập hàng loạt cho phép admin và giáo viên thêm nhiều câu hỏi cùng lúc thông qua 2 định dạng:
- **JSON**: Định dạng có cấu trúc, phù hợp cho việc import từ hệ thống khác
- **Text**: Định dạng dễ đọc, phù hợp cho việc nhập thủ công

## 2. Định dạng JSON

### Cấu trúc cơ bản:
```json
[
  {
    "question": "Câu hỏi với LaTeX: $\\frac{x}{x+1}$",
    "options": [
      "Đáp án A",
      "Đáp án B", 
      "Đáp án C",
      "Đáp án D"
    ],
    "correctAnswer": 1,
    "explanation": "Giải thích đáp án",
    "chapter": "Chương 1",
    "lesson": "Bài học",
    "difficulty": "easy"
  }
]
```

### Các trường bắt buộc:
- `question`: Nội dung câu hỏi (hỗ trợ LaTeX)
- `options`: Mảng 4 đáp án
- `correctAnswer`: Chỉ số đáp án đúng (0=A, 1=B, 2=C, 3=D)
- `explanation`: Giải thích đáp án
- `chapter`: Chương học
- `lesson`: Bài học
- `difficulty`: Độ khó ("easy", "medium", "hard")

### Lưu ý về LaTeX:
- Sử dụng `\\` thay vì `\` trong JSON
- Ví dụ: `$\\frac{1}{2}$` thay vì `$\frac{1}{2}$`

## 3. Định dạng Text

### Cấu trúc cơ bản:
```
Câu hỏi: Nội dung câu hỏi với LaTeX $\frac{x}{x+1}$
A. Đáp án A
B. Đáp án B
C. Đáp án C [ĐÚNG]
D. Đáp án D
Giải thích: Lý do đáp án C đúng
Chương: Chương 1
Bài: Phân thức đại số
Độ khó: medium

---

Câu hỏi: Câu hỏi tiếp theo...
A. Đáp án A [ĐÚNG]
B. Đáp án B
C. Đáp án C
D. Đáp án D
Giải thích: Lý do đáp án A đúng
Chương: Chương 1
Bài: Phân thức đại số
Độ khó: easy
```

### Quy tắc định dạng Text:
1. **Phân cách câu hỏi**: Sử dụng `---` để phân cách các câu hỏi
2. **Đáp án đúng**: Thêm `[ĐÚNG]` sau đáp án đúng
3. **Thứ tự dòng**: Tuân thủ thứ tự: Câu hỏi → Đáp án → Giải thích → Thông tin bổ sung
4. **LaTeX**: Sử dụng `\` bình thường (không cần `\\`)

## 4. Ví dụ hoàn chỉnh

### JSON Format:
```json
[
  {
    "question": "Phân thức nào sau đây bằng với phân thức $\\frac{x}{x+1}$?",
    "options": [
      "$\\frac{x^2}{x^2+1}$",
      "$\\frac{2x}{2x+2}$",
      "$\\frac{x^2}{x^2+x}$",
      "$\\frac{x-1}{x}$"
    ],
    "correctAnswer": 2,
    "explanation": "$\\frac{x^2}{x^2+x} = \\frac{x^2}{x(x+1)} = \\frac{x}{x+1}$",
    "chapter": "Chương 1",
    "lesson": "Phân thức đại số",
    "difficulty": "easy"
  },
  {
    "question": "Điều kiện xác định của phân thức $\\frac{1}{x^2-9}$ là:",
    "options": [
      "$x \\neq 9$",
      "$x \\neq \\pm 3$",
      "$x \\neq 3$",
      "$x \\neq -9$"
    ],
    "correctAnswer": 1,
    "explanation": "$x^2-9 = (x-3)(x+3) \\neq 0 \\Leftrightarrow x \\neq \\pm 3$",
    "chapter": "Chương 1",
    "lesson": "Phân thức đại số",
    "difficulty": "medium"
  }
]
```

### Text Format:
```
Câu hỏi: Phân thức nào sau đây bằng với phân thức $\frac{x}{x+1}$?
A. $\frac{x^2}{x^2+1}$
B. $\frac{2x}{2x+2}$
C. $\frac{x^2}{x^2+x}$ [ĐÚNG]
D. $\frac{x-1}{x}$
Giải thích: $\frac{x^2}{x^2+x} = \frac{x^2}{x(x+1)} = \frac{x}{x+1}$
Chương: Chương 1
Bài: Phân thức đại số
Độ khó: easy

---

Câu hỏi: Điều kiện xác định của phân thức $\frac{1}{x^2-9}$ là:
A. $x \neq 9$
B. $x \neq \pm 3$ [ĐÚNG]
C. $x \neq 3$
D. $x \neq -9$
Giải thích: $x^2-9 = (x-3)(x+3) \neq 0 \Leftrightarrow x \neq \pm 3$
Chương: Chương 1
Bài: Phân thức đại số
Độ khó: medium
```

## 5. Cách sử dụng

### Bước 1: Truy cập tính năng
1. Đăng nhập với tài khoản admin/teacher
2. Vào **Bảng điều khiển** → **Câu hỏi**
3. Nhấn **"Nhập hàng loạt"**

### Bước 2: Chọn định dạng
- Chọn **JSON** nếu bạn có dữ liệu có cấu trúc
- Chọn **Text** nếu bạn muốn nhập thủ công

### Bước 3: Nhập dữ liệu
- Dán nội dung vào ô text area
- Hoặc nhấn **"Sao chép mẫu"** để xem ví dụ

### Bước 4: Kiểm tra và nhập
- Nhấn **"Nhập câu hỏi"**
- Hệ thống sẽ validate và thông báo kết quả

## 6. Lỗi thường gặp

### JSON Format:
- **Syntax Error**: Thiếu dấu phẩy, ngoặc
- **LaTeX Error**: Quên dùng `\\` thay vì `\`
- **Index Error**: `correctAnswer` không đúng (phải từ 0-3)

### Text Format:
- **Missing [ĐÚNG]**: Quên đánh dấu đáp án đúng
- **Wrong Order**: Không tuân thủ thứ tự các dòng
- **Missing Separator**: Quên dùng `---` để phân cách

## 7. Tips và Best Practices

### Chuẩn bị dữ liệu:
1. **Kiểm tra LaTeX**: Test công thức trước khi import
2. **Validate JSON**: Sử dụng JSON validator online
3. **Backup**: Lưu file gốc trước khi import

### Tối ưu hóa:
1. **Batch Size**: Import tối đa 50 câu/lần
2. **Error Handling**: Kiểm tra từng batch nhỏ trước
3. **Review**: Xem lại câu hỏi sau khi import

### Quản lý:
1. **Naming Convention**: Đặt tên chương/bài nhất quán
2. **Difficulty Balance**: Cân bằng độ khó các câu hỏi
3. **Tag System**: Sử dụng tags để phân loại

## 8. File add-sample-questions.js

File này chứa:
- **Sample Data**: Câu hỏi mẫu để test
- **Import Function**: Hàm để import vào Firebase
- **Config Template**: Template cấu hình Firebase

### Cách sử dụng:
1. **Development**: Copy sample data để test
2. **Production**: Sửa config Firebase và chạy script
3. **Backup**: Sử dụng để backup/restore dữ liệu

### Lưu ý:
- File này chỉ để tham khảo
- Không chạy trực tiếp trên production
- Sử dụng tính năng "Nhập hàng loạt" trong admin thay thế

## 9. Troubleshooting

### Nếu import thất bại:
1. Kiểm tra format dữ liệu
2. Thử với ít câu hỏi hơn
3. Kiểm tra quyền Firebase
4. Xem console log để debug

### Nếu LaTeX không hiển thị:
1. Kiểm tra syntax LaTeX
2. Đảm bảo MathJax đã load
3. Refresh trang sau khi import

### Nếu có lỗi quyền:
1. Kiểm tra role user (admin/teacher)
2. Kiểm tra Firestore Security Rules
3. Đăng nhập lại nếu cần
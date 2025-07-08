# Hướng dẫn quản lý nội dung toán học

## Cách thêm bài học mới

### 1. Tạo file bài học mới
Tạo file trong thư mục `/data/lessons/` với tên theo format: `c[số-chương]-b[số-bài]-[slug].ts`

**Ví dụ:**
- `c1-b1-phan-thuc-dai-so.ts` (Chương 1, Bài 1)
- `c1-b2-phep-cong-tru.ts` (Chương 1, Bài 2)
- `c2-b1-phuong-trinh-bac-nhat.ts` (Chương 2, Bài 1)

### 2. Template cho bài học mới

```typescript
import { MathTopic } from '../../src/types/MathTopic';

export const c1b3PhepNhanChia: MathTopic = {
  id: 'c1-b3-phep-nhan-chia', // Slug cho URL
  title: 'Bài 3: Phép nhân và chia phân thức',
  description: 'Mô tả ngắn gọn về bài học',
  theory: {
    title: 'Tiêu đề lý thuyết',
    content: [
      'Nội dung lý thuyết với LaTeX: $\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}$',
      'Đoạn văn thứ hai...',
    ],
    formulas: [
      '$\\frac{A}{B} \\times \\frac{C}{D} = \\frac{A \\cdot C}{B \\cdot D}$',
      '$\\frac{A}{B} \\div \\frac{C}{D} = \\frac{A \\cdot D}{B \\cdot C}$'
    ]
  },
  flashcards: [
    {
      id: '1',
      question: 'Câu hỏi với LaTeX: $\\sqrt{x^2}$',
      answer: 'Đáp án với LaTeX: $|x|$'
    }
  ],
  examples: [
    {
      id: '1',
      title: 'Tiêu đề ví dụ',
      problem: 'Đề bài với LaTeX: $\\int x dx$',
      solution: [
        'Bước 1: $\\int x dx = \\frac{x^2}{2} + C$',
        'Bước 2: Kiểm tra bằng đạo hàm'
      ]
    }
  ],
  quiz: [
    {
      id: '1',
      question: 'Câu hỏi trắc nghiệm',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0, // Index của đáp án đúng (0=A, 1=B, 2=C, 3=D)
      explanation: 'Giải thích đáp án'
    }
  ],
  trueFalseQuiz: [
    {
      id: '1',
      question: 'Đánh giá đúng/sai:',
      statements: [
        { text: 'Khẳng định 1', isTrue: true },
        { text: 'Khẳng định 2', isTrue: false }
      ],
      explanation: 'Giải thích các khẳng định'
    }
  ],
  shortAnswerQuiz: [
    {
      id: '1',
      question: 'Câu hỏi tự luận',
      correctAnswer: 'đáp án chính xác',
      explanation: 'Giải thích chi tiết',
      hint: 'Gợi ý cho học sinh'
    }
  ],
  homework: [
    {
      id: '1',
      title: 'Bài tập về nhà',
      description: 'Mô tả bài tập',
      problems: [
        'Câu 1: Giải phương trình...',
        'Câu 2: Tính tích phân...'
      ],
      dueDate: '2024-01-25' // Tùy chọn
    }
  ]
};
```

### 3. Import vào mathChapters.ts

Sau khi tạo file bài học, import vào `src/data/mathChapters.ts`:

```typescript
import { c1b3PhepNhanChia } from '../../data/lessons/c1-b3-phep-nhan-chia';

export const mathChapters: Chapter[] = [
  {
    id: 'chuong-1',
    title: 'Chương 1: Phân thức đại số',
    description: 'Mô tả chương',
    lessons: [
      c1b1PhanThucDaiSo,
      c1b2PhepCongTru,
      c1b3PhepNhanChia, // Thêm bài học mới
      // ... các bài khác
    ]
  }
];
```

### 4. URL và SEO

Với cấu trúc này, mỗi bài học sẽ có URL thân thiện SEO:
- `/chuong-1/c1-b1-phan-thuc-dai-so/theory`
- `/chuong-1/c1-b1-phan-thuc-dai-so/flashcards`
- `/chuong-1/c1-b1-phan-thuc-dai-so/quiz`

### 5. Lưu ý quan trọng về LaTeX

- Sử dụng `\\` thay vì `\` trong JSON/TypeScript
- Ví dụ: `\\frac{a}{b}` thay vì `\frac{a}{b}`
- Ma trận: `\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}`

### 6. Quy tắc đặt tên file

**Format:** `c[chương]-b[bài]-[slug-bài-học].ts`

**Ví dụ:**
- `c1-b1-phan-thuc-dai-so.ts`
- `c1-b2-phep-cong-tru.ts`
- `c2-b1-phuong-trinh-bac-nhat.ts`
- `c3-b1-bat-phuong-trinh.ts`

### 7. Workflow thêm bài học

1. **Tạo file** trong `/data/lessons/`
2. **Copy template** và điền nội dung
3. **Import** vào `mathChapters.ts`
4. **Test** trên website
5. **Commit** code

### 8. Công cụ hỗ trợ

- **LaTeX Editor**: [Overleaf](https://overleaf.com)
- **TypeScript Validator**: VS Code với TypeScript extension
- **MathJax Demo**: [MathJax Live Demo](https://mathjax.org)

## Ví dụ hoàn chỉnh

Xem file `c1-b1-phan-thuc-dai-so.ts` để tham khảo cấu trúc hoàn chỉnh của một bài học.
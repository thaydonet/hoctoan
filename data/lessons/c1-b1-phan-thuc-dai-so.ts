import { MathTopic } from '../../src/types/MathTopic';

export const c1b1PhanThucDaiSo: MathTopic = {
  id: 'c1-b1-phan-thuc-dai-so',
  title: 'Bài 1: Phân thức đại số',
  description: 'Khái niệm và tính chất cơ bản của phân thức đại số',
  theory: {
    title: 'Lý thuyết về Phân thức đại số',
    content: [
      'Phân thức đại số là biểu thức có dạng $\\frac{A}{B}$, trong đó $A$ và $B$ là các đa thức, $B \\neq 0$.',
      'Hai phân thức $\\frac{A}{B}$ và $\\frac{C}{D}$ được gọi là bằng nhau nếu $A \\cdot D = B \\cdot C$.',
      'Tính chất cơ bản: $\\frac{A}{B} = \\frac{A \\cdot M}{B \\cdot M}$ với $M \\neq 0$.',
      'Để rút gọn phân thức, ta chia cả tử và mẫu cho nhân tử chung của chúng.',
      'Điều kiện xác định của phân thức là những giá trị của biến làm cho mẫu thức khác 0.'
    ],
    formulas: [
      '$\\frac{A}{B} = \\frac{C}{D} \\Leftrightarrow A \\cdot D = B \\cdot C$',
      '$\\frac{A}{B} = \\frac{A \\cdot M}{B \\cdot M}$ (với $M \\neq 0$)',
      '$\\frac{A}{B} + \\frac{C}{B} = \\frac{A+C}{B}$',
      '$\\frac{A}{B} - \\frac{C}{B} = \\frac{A-C}{B}$',
      '$\\frac{A}{B} \\times \\frac{C}{D} = \\frac{A \\cdot C}{B \\cdot D}$',
      '$\\frac{A}{B} \\div \\frac{C}{D} = \\frac{A}{B} \\times \\frac{D}{C} = \\frac{A \\cdot D}{B \\cdot C}$'
    ]
  },
  flashcards: [
    {
      id: '1',
      question: 'Phân thức đại số là gì?',
      answer: 'Phân thức đại số là biểu thức có dạng $\\frac{A}{B}$, trong đó $A$ và $B$ là các đa thức, $B \\neq 0$.'
    },
    {
      id: '2',
      question: 'Khi nào hai phân thức bằng nhau?',
      answer: 'Hai phân thức $\\frac{A}{B}$ và $\\frac{C}{D}$ bằng nhau khi $A \\cdot D = B \\cdot C$.'
    },
    {
      id: '3',
      question: 'Tính chất cơ bản của phân thức?',
      answer: '$\\frac{A}{B} = \\frac{A \\cdot M}{B \\cdot M}$ với $M \\neq 0$.'
    },
    {
      id: '4',
      question: 'Điều kiện xác định của phân thức $\\frac{x+1}{x^2-4}$ là gì?',
      answer: 'Điều kiện xác định là $x^2-4 \\neq 0$, tức là $x \\neq \\pm 2$.'
    },
    {
      id: '5',
      question: 'Làm thế nào để rút gọn phân thức?',
      answer: 'Chia cả tử và mẫu cho nhân tử chung lớn nhất của chúng.'
    }
  ],
  examples: [
    {
      id: '1',
      title: 'Rút gọn phân thức cơ bản',
      problem: 'Rút gọn phân thức: $\\frac{x^2 - 4}{x^2 + 4x + 4}$',
      solution: [
        'Bước 1: Phân tích tử số: $x^2 - 4 = (x - 2)(x + 2)$',
        'Bước 2: Phân tích mẫu số: $x^2 + 4x + 4 = (x + 2)^2$',
        'Bước 3: Rút gọn: $\\frac{(x - 2)(x + 2)}{(x + 2)^2} = \\frac{x - 2}{x + 2}$',
        'Đáp số: $\\frac{x - 2}{x + 2}$ với điều kiện $x \\neq -2$'
      ]
    },
    {
      id: '2',
      title: 'Tìm điều kiện xác định',
      problem: 'Tìm điều kiện xác định của phân thức: $\\frac{2x+1}{x^2-5x+6}$',
      solution: [
        'Bước 1: Phân thức xác định khi mẫu số khác 0',
        'Bước 2: Giải phương trình $x^2-5x+6 = 0$',
        'Bước 3: Phân tích: $x^2-5x+6 = (x-2)(x-3) = 0$',
        'Bước 4: Nghiệm: $x = 2$ hoặc $x = 3$',
        'Đáp số: Điều kiện xác định là $x \\neq 2$ và $x \\neq 3$'
      ]
    }
  ],
  quiz: [
    {
      id: '1',
      question: 'Phân thức nào sau đây bằng với phân thức $\\frac{x}{x+1}$?',
      options: [
        '$\\frac{x^2}{x^2+1}$',
        '$\\frac{2x}{2x+2}$',
        '$\\frac{x^2}{x^2+x}$',
        '$\\frac{x-1}{x}$'
      ],
      correctAnswer: 2,
      explanation: '$\\frac{x^2}{x^2+x} = \\frac{x^2}{x(x+1)} = \\frac{x}{x+1}$'
    },
    {
      id: '2',
      question: 'Điều kiện xác định của phân thức $\\frac{1}{x^2-9}$ là:',
      options: [
        '$x \\neq 9$',
        '$x \\neq \\pm 3$',
        '$x \\neq 3$',
        '$x \\neq -9$'
      ],
      correctAnswer: 1,
      explanation: '$x^2-9 = (x-3)(x+3) \\neq 0 \\Leftrightarrow x \\neq \\pm 3$'
    },
    {
      id: '3',
      question: 'Kết quả rút gọn của $\\frac{x^2-1}{x+1}$ là:',
      options: [
        '$x-1$',
        '$x+1$',
        '$\\frac{x-1}{x+1}$',
        '$x^2-1$'
      ],
      correctAnswer: 0,
      explanation: '$\\frac{x^2-1}{x+1} = \\frac{(x-1)(x+1)}{x+1} = x-1$ (với $x \\neq -1$)'
    }
  ],
  trueFalseQuiz: [
    {
      id: '1',
      question: 'Xét tính đúng sai của các khẳng định sau về phân thức đại số:',
      statements: [
        { text: 'Phân thức $\\frac{x+1}{x-1}$ xác định với mọi $x \\in \\mathbb{R}$', isTrue: false },
        { text: 'Hai phân thức $\\frac{2x}{4}$ và $\\frac{x}{2}$ luôn bằng nhau', isTrue: true },
        { text: 'Phân thức $\\frac{0}{x^2+1}$ bằng 0 với mọi $x$', isTrue: true },
        { text: 'Điều kiện xác định của $\\frac{1}{x^2-4}$ là $x \\neq \\pm 2$', isTrue: true }
      ],
      explanation: 'a) Sai vì $x = 1$ làm mẫu bằng 0. b) Đúng theo tính chất cơ bản. c) Đúng vì tử bằng 0, mẫu khác 0. d) Đúng vì $x^2-4 = (x-2)(x+2) \\neq 0$'
    }
  ],
  shortAnswerQuiz: [
    {
      id: '1',
      question: 'Rút gọn phân thức $\\frac{x^2-9}{x+3}$ (với $x \\neq -3$)',
      correctAnswer: 'x-3',
      explanation: '$\\frac{x^2-9}{x+3} = \\frac{(x-3)(x+3)}{x+3} = x-3$',
      hint: 'Phân tích tử số thành nhân tử'
    },
    {
      id: '2',
      question: 'Tìm điều kiện xác định của $\\frac{1}{x^2-1}$. Viết dưới dạng $x \\neq a, x \\neq b$',
      correctAnswer: 'x ≠ 1, x ≠ -1',
      explanation: '$x^2-1 = (x-1)(x+1) \\neq 0 \\Rightarrow x \\neq 1$ và $x \\neq -1$',
      hint: 'Phân tích mẫu số thành nhân tử'
    }
  ],
  homework: [
    {
      id: '1',
      title: 'Bài tập về nhà - Phân thức đại số',
      description: 'Thực hiện các bài tập sau và nộp bài làm',
      problems: [
        'Rút gọn các phân thức sau: a) $\\frac{x^2-1}{x^2+2x+1}$ b) $\\frac{2x^2-8}{x^2-4x+4}$',
        'Tìm điều kiện xác định của: a) $\\frac{x+1}{x^2-5x+6}$ b) $\\frac{2x-1}{x^3-x}$',
        'Chứng minh rằng: $\\frac{x^2-4}{x^2+4x+4} = \\frac{x-2}{x+2}$ với điều kiện thích hợp',
        'Tìm giá trị của $x$ để phân thức $\\frac{x^2-1}{x+1}$ có giá trị bằng 3'
      ],
      dueDate: '2024-01-20'
    }
  ]
};
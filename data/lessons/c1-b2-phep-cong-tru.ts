import { MathTopic } from '../../src/types/MathTopic';

export const c1b2PhepCongTru: MathTopic = {
  id: 'c1-b2-phep-cong-tru',
  title: 'Bài 2: Phép cộng và trừ phân thức',
  description: 'Quy tắc cộng trừ phân thức đại số',
  theory: {
    title: 'Phép cộng và trừ phân thức đại số',
    content: [
      'Để cộng (trừ) hai phân thức cùng mẫu, ta cộng (trừ) các tử và giữ nguyên mẫu.',
      'Để cộng (trừ) hai phân thức khác mẫu, ta quy đồng mẫu rồi thực hiện phép cộng (trừ).',
      'Mẫu chung thường chọn là BCNN của các mẫu thức.',
      'Sau khi thực hiện phép tính, ta rút gọn kết quả nếu có thể.',
      'Điều kiện xác định của tổng (hiệu) là giao của các điều kiện xác định của từng phân thức.'
    ],
    formulas: [
      '$\\frac{A}{M} + \\frac{B}{M} = \\frac{A+B}{M}$',
      '$\\frac{A}{M} - \\frac{B}{M} = \\frac{A-B}{M}$',
      '$\\frac{A}{B} + \\frac{C}{D} = \\frac{AD + BC}{BD}$',
      '$\\frac{A}{B} - \\frac{C}{D} = \\frac{AD - BC}{BD}$',
      'BCNN$(B, D)$ = Mẫu chung tối giản'
    ]
  },
  flashcards: [
    {
      id: '1',
      question: 'Quy tắc cộng hai phân thức cùng mẫu?',
      answer: 'Cộng các tử và giữ nguyên mẫu: $\\frac{A}{M} + \\frac{B}{M} = \\frac{A+B}{M}$'
    },
    {
      id: '2',
      question: 'Làm thế nào để cộng hai phân thức khác mẫu?',
      answer: 'Quy đồng mẫu rồi cộng các tử: $\\frac{A}{B} + \\frac{C}{D} = \\frac{AD + BC}{BD}$'
    },
    {
      id: '3',
      question: 'Mẫu chung tối ưu là gì?',
      answer: 'Là BCNN của các mẫu thức để việc tính toán đơn giản nhất.'
    },
    {
      id: '4',
      question: 'Quy tắc trừ phân thức?',
      answer: '$\\frac{A}{M} - \\frac{B}{M} = \\frac{A-B}{M}$ và $\\frac{A}{B} - \\frac{C}{D} = \\frac{AD - BC}{BD}$'
    }
  ],
  examples: [
    {
      id: '1',
      title: 'Cộng phân thức cùng mẫu',
      problem: 'Tính: $\\frac{x+1}{x-2} + \\frac{x-3}{x-2}$',
      solution: [
        'Bước 1: Hai phân thức có cùng mẫu $(x-2)$',
        'Bước 2: Cộng các tử: $(x+1) + (x-3) = 2x - 2$',
        'Bước 3: Kết quả: $\\frac{2x-2}{x-2} = \\frac{2(x-1)}{x-2}$',
        'Đáp số: $\\frac{2(x-1)}{x-2}$ với điều kiện $x \\neq 2$'
      ]
    },
    {
      id: '2',
      title: 'Cộng phân thức khác mẫu',
      problem: 'Tính: $\\frac{1}{x-1} + \\frac{2}{x+1}$',
      solution: [
        'Bước 1: Mẫu chung là $(x-1)(x+1)$',
        'Bước 2: Quy đồng: $\\frac{1}{x-1} = \\frac{x+1}{(x-1)(x+1)}$',
        'Bước 3: Quy đồng: $\\frac{2}{x+1} = \\frac{2(x-1)}{(x-1)(x+1)}$',
        'Bước 4: Cộng: $\\frac{x+1+2(x-1)}{(x-1)(x+1)} = \\frac{3x-1}{(x-1)(x+1)}$',
        'Đáp số: $\\frac{3x-1}{(x-1)(x+1)}$ với $x \\neq \\pm 1$'
      ]
    }
  ],
  quiz: [
    {
      id: '1',
      question: 'Kết quả của $\\frac{x}{x+1} + \\frac{1}{x+1}$ là:',
      options: [
        '$\\frac{x+1}{x+1} = 1$',
        '$\\frac{x}{2x+2}$',
        '$\\frac{x+1}{x+1}$',
        '$\\frac{2x+1}{x+1}$'
      ],
      correctAnswer: 0,
      explanation: '$\\frac{x}{x+1} + \\frac{1}{x+1} = \\frac{x+1}{x+1} = 1$ (với $x \\neq -1$)'
    },
    {
      id: '2',
      question: 'Kết quả của $\\frac{1}{x} + \\frac{1}{x+1}$ là:',
      options: [
        '$\\frac{2}{2x+1}$',
        '$\\frac{2x+1}{x(x+1)}$',
        '$\\frac{1}{x(x+1)}$',
        '$\\frac{x+1+x}{x(x+1)}$'
      ],
      correctAnswer: 1,
      explanation: '$\\frac{1}{x} + \\frac{1}{x+1} = \\frac{x+1+x}{x(x+1)} = \\frac{2x+1}{x(x+1)}$'
    }
  ],
  trueFalseQuiz: [
    {
      id: '1',
      question: 'Xét tính đúng sai của các khẳng định sau:',
      statements: [
        { text: '$\\frac{a}{c} + \\frac{b}{c} = \\frac{a+b}{c}$', isTrue: true },
        { text: '$\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{x+y}$', isTrue: false },
        { text: '$\\frac{a}{b} - \\frac{c}{d} = \\frac{ad-bc}{bd}$', isTrue: true },
        { text: 'Để cộng phân thức khác mẫu, ta nhân chéo', isTrue: false }
      ],
      explanation: 'a) Đúng - quy tắc cộng cùng mẫu. b) Sai - phải quy đồng mẫu. c) Đúng - quy tắc trừ khác mẫu. d) Sai - phải quy đồng mẫu.'
    }
  ],
  shortAnswerQuiz: [
    {
      id: '1',
      question: 'Tính $\\frac{2}{x-1} - \\frac{1}{x-1}$',
      correctAnswer: '1/(x-1)',
      explanation: '$\\frac{2}{x-1} - \\frac{1}{x-1} = \\frac{2-1}{x-1} = \\frac{1}{x-1}$',
      hint: 'Hai phân thức có cùng mẫu'
    }
  ],
  homework: [
    {
      id: '1',
      title: 'Bài tập về nhà - Phép cộng trừ phân thức',
      description: 'Thực hiện các phép tính sau',
      problems: [
        'Tính: a) $\\frac{x+2}{x-1} + \\frac{x-1}{x-1}$ b) $\\frac{3x}{x+2} - \\frac{x-1}{x+2}$',
        'Tính: a) $\\frac{1}{x} + \\frac{2}{x-1}$ b) $\\frac{x}{x+1} - \\frac{1}{x-1}$',
        'Rút gọn: $\\frac{x}{x^2-1} + \\frac{1}{x+1} - \\frac{1}{x-1}$'
      ],
      dueDate: '2024-01-22'
    }
  ]
};
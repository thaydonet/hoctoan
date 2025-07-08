import { MathTopic } from '../types/MathTopic';

export const mathTopics: MathTopic[] = [
  {
    id: 'phan-thuc-dai-so',
    title: 'Phân thức đại số',
    description: 'Khái niệm và các phép toán với phân thức đại số',
    theory: {
      title: 'Lý thuyết về Phân thức đại số',
      content: [
        'Phân thức đại số là biểu thức có dạng A/B, trong đó A và B là các đa thức, B ≠ 0.',
        'Hai phân thức A/B và C/D được gọi là bằng nhau nếu A.D = B.C.',
        'Tính chất cơ bản: A/B = (A.M)/(B.M) với M ≠ 0.',
        'Để rút gọn phân thức, ta chia cả tử và mẫu cho nhân tử chung của chúng.'
      ],
      formulas: [
        'A/B = C/D ⟺ A.D = B.C',
        'A/B = (A.M)/(B.M)',
        'A/B + C/B = (A+C)/B',
        'A/B - C/B = (A-C)/B',
        'A/B × C/D = (A.C)/(B.D)',
        'A/B ÷ C/D = A/B × D/C = (A.D)/(B.C)'
      ]
    },
    flashcards: [
      {
        id: '1',
        question: 'Phân thức đại số là gì?',
        answer: 'Phân thức đại số là biểu thức có dạng A/B, trong đó A và B là các đa thức, B ≠ 0.'
      },
      {
        id: '2',
        question: 'Khi nào hai phân thức bằng nhau?',
        answer: 'Hai phân thức A/B và C/D bằng nhau khi A.D = B.C.'
      },
      {
        id: '3',
        question: 'Tính chất cơ bản của phân thức?',
        answer: 'A/B = (A.M)/(B.M) với M ≠ 0.'
      }
    ],
    examples: [
      {
        id: '1',
        title: 'Rút gọn phân thức',
        problem: 'Rút gọn phân thức: (x² - 4)/(x² + 4x + 4)',
        solution: [
          'Bước 1: Phân tích tử số: x² - 4 = (x - 2)(x + 2)',
          'Bước 2: Phân tích mẫu số: x² + 4x + 4 = (x + 2)²',
          'Bước 3: Rút gọn: (x - 2)(x + 2)/(x + 2)² = (x - 2)/(x + 2)',
          'Đáp số: (x - 2)/(x + 2) với điều kiện x ≠ -2'
        ]
      },
      {
        id: '2',
        title: 'Cộng phân thức',
        problem: 'Tính: 1/(x-1) + 2/(x+1)',
        solution: [
          'Bước 1: Quy đồng mẫu số chung: (x-1)(x+1)',
          'Bước 2: 1/(x-1) = (x+1)/[(x-1)(x+1)]',
          'Bước 3: 2/(x+1) = 2(x-1)/[(x-1)(x+1)]',
          'Bước 4: Cộng: [(x+1) + 2(x-1)]/[(x-1)(x+1)] = (3x-1)/[(x-1)(x+1)]'
        ]
      }
    ],
    quiz: [
      {
        id: '1',
        question: 'Phân thức nào sau đây bằng với phân thức x/(x+1)?',
        options: [
          'x²/(x²+1)',
          '2x/(2x+2)',
          'x²/(x²+x)',
          '(x-1)/x'
        ],
        correctAnswer: 2,
        explanation: 'x²/(x²+x) = x²/[x(x+1)] = x/(x+1)'
      },
      {
        id: '2',
        question: 'Điều kiện xác định của phân thức 1/(x²-4) là:',
        options: [
          'x ≠ 4',
          'x ≠ ±2',
          'x ≠ 2',
          'x ≠ -4'
        ],
        correctAnswer: 1,
        explanation: 'x²-4 = (x-2)(x+2) ≠ 0 ⟺ x ≠ ±2'
      }
    ]
  },
  {
    id: 'phuong-trinh-bac-nhat',
    title: 'Phương trình bậc nhất một ẩn',
    description: 'Giải và biện luận phương trình bậc nhất',
    theory: {
      title: 'Lý thuyết về Phương trình bậc nhất một ẩn',
      content: [
        'Phương trình bậc nhất một ẩn x có dạng ax + b = 0, với a, b là số thực và a ≠ 0.',
        'Nghiệm của phương trình ax + b = 0 là x = -b/a.',
        'Hai phương trình được gọi là tương đương nếu chúng có cùng tập nghiệm.',
        'Quy tắc chuyển vế: Khi chuyển một hạng tử từ vế này sang vế kia, ta đổi dấu hạng tử đó.'
      ],
      formulas: [
        'ax + b = 0 (a ≠ 0) ⟹ x = -b/a',
        'ax + b = cx + d ⟺ (a-c)x = d-b',
        'Nếu a ≠ c: x = (d-b)/(a-c)',
        'Nếu a = c và d = b: vô số nghiệm',
        'Nếu a = c và d ≠ b: vô nghiệm'
      ]
    },
    flashcards: [
      {
        id: '1',
        question: 'Phương trình bậc nhất một ẩn có dạng như thế nào?',
        answer: 'ax + b = 0, với a ≠ 0'
      },
      {
        id: '2',
        question: 'Nghiệm của phương trình ax + b = 0 là gì?',
        answer: 'x = -b/a'
      },
      {
        id: '3',
        question: 'Quy tắc chuyển vế là gì?',
        answer: 'Khi chuyển một hạng tử từ vế này sang vế kia, ta đổi dấu hạng tử đó.'
      }
    ],
    examples: [
      {
        id: '1',
        title: 'Giải phương trình đơn giản',
        problem: 'Giải phương trình: 2x - 5 = 3x + 1',
        solution: [
          'Bước 1: Chuyển vế: 2x - 3x = 1 + 5',
          'Bước 2: Rút gọn: -x = 6',
          'Bước 3: Chia hai vế cho -1: x = -6',
          'Vậy nghiệm của phương trình là x = -6'
        ]
      },
      {
        id: '2',
        title: 'Phương trình có chứa mẫu',
        problem: 'Giải phương trình: (x+1)/2 - (x-1)/3 = 1',
        solution: [
          'Bước 1: Quy đồng mẫu số: 3(x+1)/6 - 2(x-1)/6 = 6/6',
          'Bước 2: Khử mẫu: 3(x+1) - 2(x-1) = 6',
          'Bước 3: Phát triển: 3x + 3 - 2x + 2 = 6',
          'Bước 4: Rút gọn: x + 5 = 6, nên x = 1'
        ]
      }
    ],
    quiz: [
      {
        id: '1',
        question: 'Nghiệm của phương trình 3x - 7 = 2x + 1 là:',
        options: [
          'x = 8',
          'x = 6',
          'x = -8',
          'x = -6'
        ],
        correctAnswer: 0,
        explanation: '3x - 2x = 1 + 7 ⟹ x = 8'
      },
      {
        id: '2',
        question: 'Phương trình 2x + 3 = 2x + 5 có bao nhiêu nghiệm?',
        options: [
          'Vô số nghiệm',
          'Một nghiệm',
          'Hai nghiệm',
          'Vô nghiệm'
        ],
        correctAnswer: 3,
        explanation: '2x + 3 = 2x + 5 ⟺ 3 = 5 (vô lý) nên phương trình vô nghiệm'
      }
    ]
  },
  {
    id: 'bat-phuong-trinh',
    title: 'Bất phương trình bậc nhất',
    description: 'Giải và biểu diễn nghiệm bất phương trình',
    theory: {
      title: 'Lý thuyết về Bất phương trình bậc nhất',
      content: [
        'Bất phương trình bậc nhất một ẩn x có dạng ax + b > 0, ax + b < 0, ax + b ≥ 0 hoặc ax + b ≤ 0.',
        'Khi nhân hoặc chia hai vế của bất phương trình với cùng một số âm, ta phải đổi chiều của bất phương trình.',
        'Nghiệm của bất phương trình là tập hợp tất cả các giá trị của x thỏa mãn bất phương trình.',
        'Nghiệm của bất phương trình có thể biểu diễn trên trục số.'
      ],
      formulas: [
        'ax + b > 0: x > -b/a (nếu a > 0), x < -b/a (nếu a < 0)',
        'ax + b < 0: x < -b/a (nếu a > 0), x > -b/a (nếu a < 0)',
        'ax + b ≥ 0: x ≥ -b/a (nếu a > 0), x ≤ -b/a (nếu a < 0)',
        'ax + b ≤ 0: x ≤ -b/a (nếu a > 0), x ≥ -b/a (nếu a < 0)'
      ]
    },
    flashcards: [
      {
        id: '1',
        question: 'Khi nào phải đổi chiều bất phương trình?',
        answer: 'Khi nhân hoặc chia hai vế với cùng một số âm'
      },
      {
        id: '2',
        question: 'Nghiệm của ax + b > 0 khi a > 0?',
        answer: 'x > -b/a'
      },
      {
        id: '3',
        question: 'Nghiệm của ax + b > 0 khi a < 0?',
        answer: 'x < -b/a'
      }
    ],
    examples: [
      {
        id: '1',
        title: 'Giải bất phương trình cơ bản',
        problem: 'Giải bất phương trình: 2x - 3 > x + 1',
        solution: [
          'Bước 1: Chuyển vế: 2x - x > 1 + 3',
          'Bước 2: Rút gọn: x > 4',
          'Vậy nghiệm của bất phương trình là x > 4',
          'Biểu diễn trên trục số: đánh dấu điểm 4 (không tô đậm) và tô phần bên phải'
        ]
      },
      {
        id: '2',
        title: 'Bất phương trình có hệ số âm',
        problem: 'Giải bất phương trình: -3x + 5 ≤ 2x - 10',
        solution: [
          'Bước 1: Chuyển vế: -3x - 2x ≤ -10 - 5',
          'Bước 2: Rút gọn: -5x ≤ -15',
          'Bước 3: Chia cho -5 (đổi chiều): x ≥ 3',
          'Vậy nghiệm là x ≥ 3'
        ]
      }
    ],
    quiz: [
      {
        id: '1',
        question: 'Nghiệm của bất phương trình 2x - 1 > 5 là:',
        options: [
          'x > 3',
          'x < 3',
          'x > 2',
          'x < 2'
        ],
        correctAnswer: 0,
        explanation: '2x > 6 ⟹ x > 3'
      },
      {
        id: '2',
        question: 'Khi giải bất phương trình -2x + 3 < 7, ta được:',
        options: [
          'x > -2',
          'x < -2',
          'x > 2',
          'x < 2'
        ],
        correctAnswer: 0,
        explanation: '-2x < 4 ⟹ x > -2 (chia cho -2, đổi chiều)'
      }
    ]
  }
];
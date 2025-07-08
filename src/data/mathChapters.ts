import { Chapter } from '../types/MathTopic';
import { c1b1PhanThucDaiSo } from '../../data/lessons/c1-b1-phan-thuc-dai-so';
import { c1b2PhepCongTru } from '../../data/lessons/c1-b2-phep-cong-tru';

export const mathChapters: Chapter[] = [
  {
    id: 'chuong-1',
    title: 'Chương 1: Phân thức đại số',
    description: 'Khái niệm và các phép toán với phân thức đại số',
    lessons: [
      c1b1PhanThucDaiSo,
      c1b2PhepCongTru,
      {
        id: 'c1-b3-phep-nhan-chia',
        title: 'Bài 3: Phép nhân và chia phân thức',
        description: 'Quy tắc nhân chia phân thức đại số',
        theory: {
          title: 'Phép nhân và chia phân thức đại số',
          content: [
            'Để nhân hai phân thức, ta nhân các tử với nhau và nhân các mẫu với nhau.',
            'Để chia hai phân thức, ta nhân phân thức thứ nhất với nghịch đảo của phân thức thứ hai.',
            'Nghịch đảo của phân thức $\\frac{A}{B}$ là $\\frac{B}{A}$ (với $A \\neq 0$).',
            'Sau khi thực hiện phép tính, ta rút gọn kết quả nếu có thể.'
          ],
          formulas: [
            '$\\frac{A}{B} \\times \\frac{C}{D} = \\frac{A \\cdot C}{B \\cdot D}$',
            '$\\frac{A}{B} \\div \\frac{C}{D} = \\frac{A}{B} \\times \\frac{D}{C} = \\frac{A \\cdot D}{B \\cdot C}$',
            'Nghịch đảo của $\\frac{A}{B}$ là $\\frac{B}{A}$'
          ]
        },
        flashcards: [
          {
            id: '1',
            question: 'Quy tắc nhân hai phân thức?',
            answer: 'Nhân tử với tử, mẫu với mẫu: $\\frac{A}{B} \\times \\frac{C}{D} = \\frac{A \\cdot C}{B \\cdot D}$'
          }
        ],
        examples: [],
        quiz: [],
        trueFalseQuiz: [],
        shortAnswerQuiz: [],
        homework: []
      }
    ]
  },
  {
    id: 'chuong-2',
    title: 'Chương 2: Phương trình bậc nhất',
    description: 'Giải và biện luận phương trình bậc nhất một ẩn',
    lessons: [
      {
        id: 'c2-b1-phuong-trinh-bac-nhat',
        title: 'Bài 1: Phương trình bậc nhất một ẩn',
        description: 'Khái niệm và cách giải',
        theory: {
          title: 'Phương trình bậc nhất một ẩn',
          content: [
            'Phương trình bậc nhất một ẩn $x$ có dạng $ax + b = 0$, với $a, b$ là số thực và $a \\neq 0$.',
            'Nghiệm của phương trình $ax + b = 0$ là $x = -\\frac{b}{a}$.',
            'Hai phương trình được gọi là tương đương nếu chúng có cùng tập nghiệm.'
          ],
          formulas: [
            '$ax + b = 0$ (với $a \\neq 0$) $\\Rightarrow x = -\\frac{b}{a}$',
            '$ax + b = cx + d \\Leftrightarrow (a-c)x = d-b$'
          ]
        },
        flashcards: [],
        examples: [],
        quiz: [],
        trueFalseQuiz: [],
        shortAnswerQuiz: [],
        homework: []
      }
    ]
  },
  {
    id: 'chuong-3',
    title: 'Chương 3: Bất phương trình bậc nhất',
    description: 'Giải và biểu diễn nghiệm bất phương trình',
    lessons: []
  },
  {
    id: 'chuong-4',
    title: 'Chương 4: Hàm số bậc nhất',
    description: 'Khái niệm và đồ thị hàm số bậc nhất',
    lessons: []
  },
  {
    id: 'chuong-5',
    title: 'Chương 5: Tam giác đồng dạng',
    description: 'Định lý và ứng dụng tam giác đồng dạng',
    lessons: []
  },
  {
    id: 'chuong-6',
    title: 'Chương 6: Hình lăng trụ đứng',
    description: 'Tính chất và thể tích hình lăng trụ',
    lessons: []
  },
  {
    id: 'chuong-7',
    title: 'Chương 7: Hình chóp đều',
    description: 'Diện tích và thể tích hình chóp',
    lessons: []
  },
  {
    id: 'chuong-8',
    title: 'Chương 8: Thống kê',
    description: 'Thu thập và xử lý dữ liệu thống kê',
    lessons: []
  }
];
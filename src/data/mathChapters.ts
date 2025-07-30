import { Chapter } from '../types/MathTopic';
import { c1b1PhanThucDaiSo } from '../../data/lessons/c1-b1-phan-thuc-dai-so';
import { c1b2PhepCongTru } from '../../data/lessons/c1-b2-phep-cong-tru';
import { c3b1pythagore } from '../../data/lessons/c3-b1-dinh-ly-pythagore';

export const mathChapters: Chapter[] = [
  {
    id: 'chuong-1',
    title: 'Chương 1: Biểu thức đại số',
    description: 'Khái niệm và các phép toán với Biểu thức đại số',
    lessons: [
      c1b1PhanThucDaiSo,
      c1b2PhepCongTru,
     ]
  },
  {
    id: 'chuong-2',
    title: 'Chương 2: Các hình khối trong thực tiễn',
    description: 'Giới thiệu Các hình khối trong thực tiễn',
    lessons: []
  },
  {
    id: 'chuong-3',
    title: 'Chương 3: Định lí Pythagore - Các loại tứ giác thường gặp',
    description: 'Định lí Pythagore - Các loại tứ giác thường gặp',
    lessons: [c3b1pythagore]
  },
  {
    id: 'chuong-4',
    title: 'Chương 4: Thống kê',
    description: 'Thu thập và xử lý dữ liệu thống kê',
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
    title: 'Chương 8: Hình đồng dạng',
    description: 'Tính chất các hình đồng dạng',
    lessons: []
  },
  {
    id: 'chuong-9',
    title: 'Chương 9: Một số yếu tố xác suất',
    description: 'Xác suất cơ bản',
    lessons: []
  }
];

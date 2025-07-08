# Hướng dẫn cài đặt Firebase cho hệ thống thi online

## Bước 1: Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Nhấp "Create a project" hoặc "Add project"
3. Nhập tên project (ví dụ: "toan-lop-8-exam")
4. Chọn các tùy chọn phù hợp và tạo project

## Bước 2: Cấu hình Authentication

1. Trong Firebase Console, vào **Authentication** > **Sign-in method**
2. Enable **Google** provider:
   - Nhấp vào Google
   - Bật "Enable"
   - Nhập email hỗ trợ project
   - Lưu

## Bước 3: Cấu hình Firestore Database

1. Vào **Firestore Database** > **Create database**
2. Chọn **Start in test mode** (để phát triển)
3. Chọn location gần nhất (asia-southeast1 cho Việt Nam)

### Tạo Collections:

#### Collection: `examQuestions`
```javascript
// Document example:
{
  id: "q1",
  question: "Phân thức nào sau đây bằng với phân thức x/(x+1)?",
  options: [
    "x²/(x²+1)",
    "2x/(2x+2)", 
    "x²/(x²+x)",
    "(x-1)/x"
  ],
  correctAnswer: 2,
  explanation: "x²/(x²+x) = x²/[x(x+1)] = x/(x+1)",
  chapter: "Chương 1",
  lesson: "Phân thức đại số",
  difficulty: "easy", // easy, medium, hard
  createdAt: timestamp
}
```

#### Collection: `examResults`
```javascript
// Document example:
{
  userId: "user123",
  userName: "Nguyễn Văn A",
  score: 15,
  totalQuestions: 20,
  percentage: 75,
  timeSpent: 1200, // seconds
  completedAt: timestamp,
  answers: [0, 2, 1, 3, ...] // array of selected answer indexes
}
```

## Bước 4: Lấy Firebase Config

1. Vào **Project Settings** (biểu tượng bánh răng)
2. Scroll xuống **Your apps** > **Web apps**
3. Nhấp **Add app** nếu chưa có, hoặc chọn app hiện có
4. Copy config object:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Bước 5: Cập nhật code

1. Mở file `src/components/ExamSystem.tsx`
2. Thay thế `firebaseConfig` ở đầu file bằng config thực của bạn
3. Hoặc tạo file `.env` và sử dụng environment variables:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Bước 6: Firestore Security Rules

Vào **Firestore Database** > **Rules** và cập nhật:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to exam questions for authenticated users
    match /examQuestions/{document} {
      allow read: if request.auth != null;
      allow write: if false; // Only admin can write questions
    }
    
    // Allow users to read/write their own exam results
    match /examResults/{document} {
      allow read, write: if request.auth != null && 
        (resource == null || resource.data.userId == request.auth.uid);
    }
  }
}
```

## Bước 7: Thêm câu hỏi mẫu

Có thể thêm câu hỏi qua Firebase Console hoặc tạo script:

```javascript
// Script để thêm câu hỏi mẫu
import { collection, addDoc } from 'firebase/firestore';

const sampleQuestions = [
  {
    question: "Phân thức đại số là gì?",
    options: [
      "Biểu thức có dạng A/B với A, B là đa thức, B ≠ 0",
      "Biểu thức có dạng A + B",
      "Biểu thức có dạng A × B", 
      "Biểu thức có dạng A - B"
    ],
    correctAnswer: 0,
    explanation: "Phân thức đại số có dạng A/B với A, B là đa thức và B ≠ 0",
    chapter: "Chương 1",
    lesson: "Phân thức đại số"
  },
  // Thêm nhiều câu hỏi khác...
];

// Thêm vào Firestore
sampleQuestions.forEach(async (question) => {
  await addDoc(collection(db, 'examQuestions'), question);
});
```

## Bước 8: Test hệ thống

1. Chạy ứng dụng: `npm run dev`
2. Vào `/exam`
3. Đăng nhập bằng Google
4. Thử làm bài thi
5. Kiểm tra kết quả trong Firestore Console

## Lưu ý bảo mật

- **Không** commit Firebase config vào Git nếu có sensitive data
- Sử dụng environment variables cho production
- Cập nhật Firestore rules phù hợp với yêu cầu bảo mật
- Enable App Check cho production để chống spam

## Tính năng mở rộng

1. **Admin Panel**: Tạo interface để admin thêm/sửa câu hỏi
2. **Analytics**: Theo dõi thống kê làm bài
3. **Leaderboard**: Bảng xếp hạng học sinh
4. **Timed Exams**: Bài thi có giới hạn thời gian
5. **Question Categories**: Phân loại câu hỏi theo chủ đề
6. **Offline Support**: Cache câu hỏi để làm bài offline
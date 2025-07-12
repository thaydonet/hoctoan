# Hướng dẫn cài đặt Authentication cho Web App Toán 8

## 1. Cấu hình Firebase Authentication

### Bước 1: Enable Authentication
1. Vào [Firebase Console](https://console.firebase.google.com/)
2. Chọn project của bạn
3. Vào **Authentication** > **Sign-in method**
4. Enable **Google** provider:
   - Nhấp vào Google
   - Bật "Enable"
   - Nhập email hỗ trợ project
   - Lưu

### Bước 2: Cấu hình Firestore Collections

#### Collection: `users`
```javascript
{
  uid: "user-firebase-uid",
  email: "user@gmail.com",
  displayName: "Nguyễn Văn A",
  photoURL: "https://...",
  role: "student", // student, teacher, admin
  createdAt: timestamp,
  lastLogin: timestamp,
  reputation: 0,
  questionsAsked: 0,
  answersGiven: 0
}
```

#### Collection: `quizResults`
```javascript
{
  userId: "user-firebase-uid",
  userName: "Nguyễn Văn A",
  quizType: "multiple", // multiple, trueFalse, shortAnswer
  score: 8,
  totalQuestions: 10,
  percentage: 80,
  timeSpent: 1200, // seconds
  completedAt: timestamp,
  answers: [0, 2, 1, 3, ...], // array of selected answers
  chapter: "Chương 1",
  lesson: "Phân thức đại số"
}
```

#### Collection: `homeworkSubmissions`
```javascript
{
  userId: "user-firebase-uid",
  userName: "Nguyễn Văn A",
  assignmentId: "assignment-id",
  completedAt: timestamp,
  submissionType: "google_form"
}
```

#### Collection: `questions` (Q&A)
```javascript
{
  userId: "user-firebase-uid",
  userName: "Nguyễn Văn A",
  userAvatar: "https://...",
  title: "Làm thế nào để rút gọn phân thức?",
  content: "Em đang gặp khó khăn...",
  chapter: "Chương 1",
  lesson: "Phân thức đại số",
  difficulty: "medium",
  tags: ["phân thức", "rút gọn"],
  createdAt: timestamp,
  upvotes: 15,
  downvotes: 2,
  isSolved: false,
  answers: [...]
}
```

## 2. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Quiz results - users can only access their own results
    match /quizResults/{resultId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Homework submissions - users can only access their own submissions
    match /homeworkSubmissions/{submissionId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Questions - anyone can read, only authenticated users can create
    match /questions/{questionId} {
      allow read: if true;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
      allow update: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow delete: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

## 3. Tính năng đã implement

### ✅ **Authentication**
- Đăng nhập với Google
- Tự động tạo user profile
- Đăng xuất
- Hiển thị thông tin user

### ✅ **Phân quyền truy cập**
- **Đọc bài học**: Không cần đăng nhập
- **Hỏi đáp**: Cần đăng nhập để đặt câu hỏi và trả lời
- **Trắc nghiệm**: Cần đăng nhập để lưu kết quả
- **Bài tập về nhà**: Cần đăng nhập để lưu tiến độ

### ✅ **Lưu trữ dữ liệu**
- Kết quả trắc nghiệm tự động lưu
- Tiến độ bài tập về nhà
- Câu hỏi và trả lời trong Q&A
- Profile và thống kê user

### ✅ **UI/UX**
- Nút đăng nhập ở trang chủ
- Thông báo cần đăng nhập
- Hiển thị trạng thái đã hoàn thành
- Loading states

## 4. Cách sử dụng

### Cho học sinh:
1. **Vào trang chủ** → Nhấp "Đăng nhập với Google"
2. **Đọc bài học**: Tự do không cần đăng nhập
3. **Làm trắc nghiệm**: Kết quả tự động lưu
4. **Làm bài tập**: Đánh dấu hoàn thành để theo dõi tiến độ
5. **Hỏi đáp**: Đặt câu hỏi và tham gia thảo luận

### Cho giáo viên:
1. **Theo dõi tiến độ**: Xem kết quả học sinh qua Firebase Console
2. **Quản lý Q&A**: Trả lời câu hỏi với badge giáo viên
3. **Phân tích dữ liệu**: Export data để đánh giá

## 5. Deployment

Sau khi cấu hình Firebase:
1. Update `firebaseConfig` trong `src/firebase/config.ts`
2. Deploy Firestore Security Rules
3. Test authentication flow
4. Deploy app lên Netlify

Hệ thống sẽ hoạt động hoàn hảo với authentication và data persistence!
# Hướng dẫn cài đặt Firebase cho hệ thống Hỏi đáp

## Cấu trúc dữ liệu Firebase cho Q&A

### Collection: `questions`
```javascript
{
  id: "auto-generated-id",
  userId: "user123",
  userName: "Nguyễn Văn A",
  userAvatar: "https://...", // optional
  title: "Làm thế nào để rút gọn phân thức có chứa căn?",
  content: "Em đang gặp khó khăn với bài tập rút gọn phân thức...",
  chapter: "Chương 1",
  lesson: "Phân thức đại số",
  difficulty: "medium", // easy, medium, hard
  tags: ["phân thức", "rút gọn", "căn thức"],
  createdAt: timestamp,
  upvotes: 15,
  downvotes: 2,
  isSolved: true,
  bestAnswerId: "answer-id", // optional
  answers: [
    {
      id: "answer-id",
      userId: "teacher1",
      userName: "Cô Lan (Giáo viên)",
      userAvatar: "https://...", // optional
      content: "Em cần nhớ điều kiện xác định trước...",
      createdAt: timestamp,
      upvotes: 12,
      downvotes: 0,
      isBestAnswer: true,
      isTeacherAnswer: true
    }
  ]
}
```

### Collection: `users` (để quản lý thông tin user)
```javascript
{
  id: "user-id",
  email: "user@example.com",
  displayName: "Nguyễn Văn A",
  photoURL: "https://...",
  role: "student", // student, teacher, admin
  createdAt: timestamp,
  lastLogin: timestamp,
  reputation: 150, // điểm uy tín từ upvotes
  questionsAsked: 5,
  answersGiven: 12
}
```

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Questions collection
    match /questions/{questionId} {
      // Anyone can read questions
      allow read: if true;
      
      // Only authenticated users can create questions
      allow create: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      
      // Only question owner can update their questions
      allow update: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['teacher', 'admin']);
      
      // Only admins can delete questions
      allow delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users collection
    match /users/{userId} {
      // Users can read their own data and public profiles
      allow read: if request.auth != null;
      
      // Users can only update their own profile
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Cách sử dụng trong code

### 1. Thêm câu hỏi mới
```javascript
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const addQuestion = async (questionData) => {
  try {
    const docRef = await addDoc(collection(db, 'questions'), {
      ...questionData,
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      answers: [],
      isSolved: false
    });
    console.log("Question added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding question: ", error);
    throw error;
  }
};
```

### 2. Load câu hỏi
```javascript
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';

const loadQuestions = async (filters = {}) => {
  try {
    let q = query(collection(db, 'questions'));
    
    // Add filters
    if (filters.chapter) {
      q = query(q, where('chapter', '==', filters.chapter));
    }
    
    if (filters.solved !== undefined) {
      q = query(q, where('isSolved', '==', filters.solved));
    }
    
    // Order by creation date
    q = query(q, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const questions = [];
    
    querySnapshot.forEach((doc) => {
      questions.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      });
    });
    
    return questions;
  } catch (error) {
    console.error("Error loading questions: ", error);
    throw error;
  }
};
```

### 3. Thêm câu trả lời
```javascript
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const addAnswer = async (questionId, answerData) => {
  try {
    const questionRef = doc(db, 'questions', questionId);
    
    const answer = {
      id: Date.now().toString(), // hoặc sử dụng uuid
      ...answerData,
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      isBestAnswer: false
    };
    
    await updateDoc(questionRef, {
      answers: arrayUnion(answer)
    });
    
    return answer.id;
  } catch (error) {
    console.error("Error adding answer: ", error);
    throw error;
  }
};
```

### 4. Vote cho câu hỏi/câu trả lời
```javascript
import { doc, updateDoc, increment } from 'firebase/firestore';

const voteQuestion = async (questionId, voteType) => {
  try {
    const questionRef = doc(db, 'questions', questionId);
    
    const updateData = {};
    if (voteType === 'up') {
      updateData.upvotes = increment(1);
    } else if (voteType === 'down') {
      updateData.downvotes = increment(1);
    }
    
    await updateDoc(questionRef, updateData);
  } catch (error) {
    console.error("Error voting: ", error);
    throw error;
  }
};
```

## Tính năng nâng cao

### 1. Real-time updates
```javascript
import { onSnapshot } from 'firebase/firestore';

const subscribeToQuestions = (callback) => {
  const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    const questions = [];
    querySnapshot.forEach((doc) => {
      questions.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      });
    });
    callback(questions);
  });
};
```

### 2. Search functionality
```javascript
// Sử dụng Algolia hoặc implement client-side search
const searchQuestions = (questions, searchTerm) => {
  return questions.filter(q => 
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
};
```

### 3. Notification system
```javascript
// Thông báo khi có câu trả lời mới
const notifyNewAnswer = async (questionId, questionOwnerId) => {
  await addDoc(collection(db, 'notifications'), {
    userId: questionOwnerId,
    type: 'new_answer',
    questionId: questionId,
    createdAt: new Date(),
    read: false
  });
};
```

## Deployment và Production

### 1. Environment Variables
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 2. Performance Optimization
- Sử dụng pagination cho danh sách câu hỏi
- Cache dữ liệu với React Query hoặc SWR
- Lazy loading cho images và content
- Debounce cho search functionality

### 3. Moderation Tools
- Report system cho nội dung không phù hợp
- Admin dashboard để quản lý câu hỏi/trả lời
- Auto-moderation với keyword filtering
- User reputation system

Hệ thống Q&A này sẽ tạo ra một cộng đồng học tập tích cực và hiệu quả cho học sinh toán lớp 8!
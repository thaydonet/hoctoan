export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'student' | 'teacher' | 'admin';
  createdAt: Date;
  lastLogin: Date;
}

export interface ExamTemplate {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  duration: number; // minutes
  questionCount: number;
  questions: string[]; // question IDs
  createdBy: string; // teacher/admin ID
  createdAt: Date;
  isActive: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  chapter: string;
  lesson: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  grade: string;
  createdBy: string;
  createdAt: Date;
  tags: string[];
  isActive: boolean;
}

export interface ExamSession {
  id: string;
  examTemplateId: string;
  title: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  isActive: boolean;
  allowedUsers?: string[]; // specific students, empty = all
  createdBy: string;
  settings: {
    shuffleQuestions: boolean;
    shuffleOptions: boolean;
    showResults: boolean;
    allowRetake: boolean;
    maxAttempts: number;
  };
}
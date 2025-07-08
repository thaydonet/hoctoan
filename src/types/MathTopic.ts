export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: MathTopic[];
}

export interface MathTopic {
  id: string;
  title: string;
  description: string;
  theory: {
    title: string;
    content: string[];
    formulas: string[];
  };
  flashcards: FlashCard[];
  examples: Example[];
  quiz: QuizQuestion[];
  trueFalseQuiz: TrueFalseQuestion[];
  shortAnswerQuiz: ShortAnswerQuestion[];
  homework: HomeworkAssignment[];
}

export interface FlashCard {
  id: string;
  question: string;
  answer: string;
}

export interface Example {
  id: string;
  title: string;
  problem: string;
  solution: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TrueFalseQuestion {
  id: string;
  question: string;
  statements: {
    text: string;
    isTrue: boolean;
  }[];
  explanation: string;
}

export interface ShortAnswerQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  explanation: string;
  hint?: string;
}

export interface HomeworkAssignment {
  id: string;
  title: string;
  description: string;
  problems: string[];
  dueDate?: string;
}
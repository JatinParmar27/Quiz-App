export interface Question {
  id: string;
  chapter: number;
  question: string;
  options: string[];
  answer: string;
}

export interface QuizAttempt {
  chapters: number[];
  score: number;
  total: number;
  answers: Array<{
    questionId: string;
    selected: string;
    correct: string;
    isCorrect: boolean;
  }>;
  timeTaken: string;
  timestamp: Date;
}

export interface QuizState {
  selectedChapters: number[];
  currentQuestionIndex: number;
  answers: Array<{
    questionId: string;
    selected: string;
    correct: string;
    isCorrect: boolean;
  }>;
  startTime: Date | null;
  endTime: Date | null;
  isCompleted: boolean;
  showReview: boolean;
}
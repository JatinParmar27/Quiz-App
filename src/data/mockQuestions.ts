import { Question } from '@/types/quiz';
import { allNewQuestions } from './newQuestions';

// Combine original questions with new questions
export const mockQuestions: Question[] = [
  // Chapter 1 - General Knowledge
 
  


  // Add all new questions from chapters 5-8
  ...allNewQuestions
];

export const getChapters = (): number[] => {
  const chapters = [...new Set(mockQuestions.map(q => q.chapter))];
  return chapters.sort((a, b) => a - b);
};

export const getQuestionsByChapters = (selectedChapters: number[]): Question[] => {
  return mockQuestions.filter(q => selectedChapters.includes(q.chapter));
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
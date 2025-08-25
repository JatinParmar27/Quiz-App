import { FirebaseService } from '../services/firebaseService';
import { Question } from '@/types/quiz';

// Re-export the same functions but using Firebase
export const getChapters = async (): Promise<number[]> => {
  return await FirebaseService.getChapters();
};

export const getQuestionsByChapters = async (selectedChapters: number[]): Promise<Question[]> => {
  return await FirebaseService.getQuestionsByChapters(selectedChapters);
};

// Keep the shuffle function as it's still useful
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Additional utility functions
export const getAllQuestions = async (): Promise<Question[]> => {
  return await FirebaseService.getAllQuestions();
};

export const addQuestion = async (question: Omit<Question, 'id'>): Promise<string> => {
  return await FirebaseService.addQuestion(question);
};

export const updateQuestion = async (id: string, question: Partial<Question>): Promise<void> => {
  return await FirebaseService.updateQuestion(id, question);
};

export const deleteQuestion = async (id: string): Promise<void> => {
  return await FirebaseService.deleteQuestion(id);
}; 
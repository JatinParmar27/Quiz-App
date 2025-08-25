import { 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  where, 
  orderBy,
  writeBatch,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { Question } from '@/types/quiz';

const QUESTIONS_COLLECTION = 'questions';

export class FirebaseService {
  // Get all questions
  static async getAllQuestions(): Promise<Question[]> {
    try {
      const querySnapshot = await getDocs(collection(db, QUESTIONS_COLLECTION));
      const questions: Question[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        questions.push({
          id: doc.id,
          chapter: data.chapter,
          question: data.question,
          options: data.options,
          answer: data.answer
        });
      });
      
      return questions.sort((a, b) => a.chapter - b.chapter);
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  }

  // Get questions by chapters
  static async getQuestionsByChapters(selectedChapters: number[]): Promise<Question[]> {
    try {
      const q = query(
        collection(db, QUESTIONS_COLLECTION),
        where('chapter', 'in', selectedChapters),
        orderBy('chapter')
      );
      
      const querySnapshot = await getDocs(q);
      const questions: Question[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        questions.push({
          id: doc.id,
          chapter: data.chapter,
          answer: data.answer,
          options: data.options,
          question: data.question
        });
      });
      
      return questions;
    } catch (error) {
      console.error('Error fetching questions by chapters:', error);
      throw error;
    }
  }

  // Get all available chapters
  static async getChapters(): Promise<number[]> {
    try {
      const questions = await this.getAllQuestions();
      const chapters = [...new Set(questions.map(q => q.chapter))];
      return chapters.sort((a, b) => a - b);
    } catch (error) {
      console.error('Error fetching chapters:', error);
      throw error;
    }
  }

  // Add a single question
  static async addQuestion(question: Omit<Question, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, QUESTIONS_COLLECTION), {
        chapter: question.chapter,
        question: question.question,
        options: question.options,
        answer: question.answer
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding question:', error);
      throw error;
    }
  }

  // Bulk upload questions
  static async bulkUploadQuestions(questions: Omit<Question, 'id'>[]): Promise<void> {
    try {
      const batch = writeBatch(db);
      
      questions.forEach((question) => {
        const docRef = doc(collection(db, QUESTIONS_COLLECTION));
        batch.set(docRef, {
          chapter: question.chapter,
          question: question.question,
          options: question.options,
          answer: question.answer
        });
      });
      
      await batch.commit();
      console.log(`Successfully uploaded ${questions.length} questions`);
    } catch (error) {
      console.error('Error bulk uploading questions:', error);
      throw error;
    }
  }

  // Update a question
  static async updateQuestion(id: string, question: Partial<Question>): Promise<void> {
    try {
      const docRef = doc(db, QUESTIONS_COLLECTION, id);
      await updateDoc(docRef, question);
    } catch (error) {
      console.error('Error updating question:', error);
      throw error;
    }
  }

  // Delete a question
  static async deleteQuestion(id: string): Promise<void> {
    try {
      const docRef = doc(db, QUESTIONS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting question:', error);
      throw error;
    }
  }

  // Clear all questions (use with caution)
  static async clearAllQuestions(): Promise<void> {
    try {
      const questions = await this.getAllQuestions();
      const batch = writeBatch(db);
      
      questions.forEach((question) => {
        const docRef = doc(db, QUESTIONS_COLLECTION, question.id);
        batch.delete(docRef);
      });
      
      await batch.commit();
      console.log(`Successfully deleted ${questions.length} questions`);
    } catch (error) {
      console.error('Error clearing questions:', error);
      throw error;
    }
  }
} 
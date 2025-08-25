import { useState, useEffect } from 'react';
import { Question } from '@/types/quiz';
import { FirebaseService } from '../services/firebaseService';

interface UseQuestionsReturn {
  questions: Question[];
  chapters: number[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useQuestions = (selectedChapters?: number[]): UseQuestionsReturn => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [chapters, setChapters] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (selectedChapters && selectedChapters.length > 0) {
        // Fetch questions for specific chapters
        const chapterQuestions = await FirebaseService.getQuestionsByChapters(selectedChapters);
        setQuestions(chapterQuestions);
      } else {
        // Fetch all questions
        const allQuestions = await FirebaseService.getAllQuestions();
        setQuestions(allQuestions);
      }

      // Fetch all available chapters
      const allChapters = await FirebaseService.getChapters();
      setChapters(allChapters);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch questions');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedChapters]);

  return {
    questions,
    chapters,
    loading,
    error,
    refetch: fetchData
  };
};

// Hook for fetching just chapters
export const useChapters = () => {
  const [chapters, setChapters] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChapters = async () => {
    try {
      setLoading(true);
      setError(null);
      const allChapters = await FirebaseService.getChapters();
      setChapters(allChapters);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch chapters');
      console.error('Error fetching chapters:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  return {
    chapters,
    loading,
    error,
    refetch: fetchChapters
  };
}; 
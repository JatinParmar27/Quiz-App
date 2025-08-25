import { useState, useEffect } from 'react';
import { Question, QuizState, QuizAttempt } from '@/types/quiz';
import { getQuestionsByChapters, shuffleArray } from '@/data/mockQuestions';
import { ChapterSelection } from './quiz/ChapterSelection';
import { QuestionCard } from './quiz/QuestionCard';
import { QuizResults } from './quiz/QuizResults';
import { QuizReview } from './quiz/QuizReview';
import { useTimer } from '@/hooks/useTimer';

export const Quiz = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    selectedChapters: [],
    currentQuestionIndex: 0,
    answers: [],
    startTime: null,
    endTime: null,
    isCompleted: false,
    showReview: false
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(null);
  const { time, formattedTime, reset: resetTimer } = useTimer(
    quizState.startTime !== null && !quizState.isCompleted
  );

  const startQuiz = (selectedChapters: number[]) => {
    const questionsForChapters = getQuestionsByChapters(selectedChapters);
    const shuffledQuestions = shuffleArray(questionsForChapters);
    
    setQuestions(shuffledQuestions);
    setQuizState({
      selectedChapters,
      currentQuestionIndex: 0,
      answers: [],
      startTime: new Date(),
      endTime: null,
      isCompleted: false,
      showReview: false
    });
    resetTimer();
  };

  const handleAnswer = (selectedAnswer: string) => {
    const currentQuestion = questions[quizState.currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    const newAnswer = {
      questionId: currentQuestion.id,
      selected: selectedAnswer,
      correct: currentQuestion.answer,
      isCorrect
    };

    const updatedAnswers = [...quizState.answers, newAnswer];
    
    if (quizState.currentQuestionIndex === questions.length - 1) {
      // Quiz completed
      const endTime = new Date();
      const score = updatedAnswers.filter(a => a.isCorrect).length;
      
      const attempt: QuizAttempt = {
        chapters: quizState.selectedChapters,
        score,
        total: questions.length,
        answers: updatedAnswers,
        timeTaken: formatTimeElapsed(time),
        timestamp: new Date()
      };

      setCurrentAttempt(attempt);
      setQuizState(prev => ({
        ...prev,
        answers: updatedAnswers,
        endTime,
        isCompleted: true
      }));
    } else {
      // Move to next question
      setQuizState(prev => ({
        ...prev,
        answers: updatedAnswers,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  const formatTimeElapsed = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
    if (mins === 0) {
      return `${secs} seconds`;
    } else if (mins === 1) {
      return `1 minute ${secs} seconds`;
    } else {
      return `${mins} minutes ${secs} seconds`;
    }
  };

  const handleRetry = () => {
    const shuffledQuestions = shuffleArray(questions);
    setQuestions(shuffledQuestions);
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      answers: [],
      startTime: new Date(),
      endTime: null,
      isCompleted: false,
      showReview: false
    }));
    resetTimer();
  };

  const handleNewQuiz = () => {
    setQuizState({
      selectedChapters: [],
      currentQuestionIndex: 0,
      answers: [],
      startTime: null,
      endTime: null,
      isCompleted: false,
      showReview: false
    });
    setQuestions([]);
    setCurrentAttempt(null);
    resetTimer();
  };

  const handleShowReview = () => {
    setQuizState(prev => ({ ...prev, showReview: true }));
  };

  const handleBackToResults = () => {
    setQuizState(prev => ({ ...prev, showReview: false }));
  };

  // Chapter selection phase
  if (quizState.selectedChapters.length === 0) {
    return <ChapterSelection onStartQuiz={startQuiz} />;
  }

  // Review phase
  if (quizState.showReview && currentAttempt) {
    return (
      <QuizReview
        questions={questions}
        answers={currentAttempt.answers}
        onBack={handleBackToResults}
      />
    );
  }

  // Results phase
  if (quizState.isCompleted && currentAttempt) {
    return (
      <QuizResults
        attempt={currentAttempt}
        onRetry={handleRetry}
        onReview={handleShowReview}
        onNewQuiz={handleNewQuiz}
      />
    );
  }

  // Quiz phase
  if (questions.length > 0 && quizState.currentQuestionIndex < questions.length) {
    return (
      <QuestionCard
        question={questions[quizState.currentQuestionIndex]}
        currentIndex={quizState.currentQuestionIndex}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
        elapsedTime={formattedTime}
      />
    );
  }

  return null;
};
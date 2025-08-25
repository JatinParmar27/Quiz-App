import { Question } from '@/types/quiz';

export const mockQuestions: Question[] = [
  {
    id: '1',
    chapter: 1,
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    answer: 'Paris'
  },
  {
    id: '2',
    chapter: 1,
    question: 'Which planet is closest to the Sun?',
    options: ['Venus', 'Mercury', 'Mars', 'Earth'],
    answer: 'Mercury'
  },
  {
    id: '3',
    chapter: 1,
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    answer: '4'
  },
  {
    id: '4',
    chapter: 2,
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
    answer: 'Leonardo da Vinci'
  },
  {
    id: '5',
    chapter: 2,
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    answer: 'Pacific Ocean'
  },
  {
    id: '6',
    chapter: 2,
    question: 'In what year did World War II end?',
    options: ['1944', '1945', '1946', '1947'],
    answer: '1945'
  },
  {
    id: '7',
    chapter: 3,
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    answer: 'Au'
  },
  {
    id: '8',
    chapter: 3,
    question: 'Which is the smallest country in the world?',
    options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
    answer: 'Vatican City'
  },
  {
    id: '9',
    chapter: 3,
    question: 'What is the fastest land animal?',
    options: ['Lion', 'Cheetah', 'Leopard', 'Tiger'],
    answer: 'Cheetah'
  },
  {
    id: '10',
    chapter: 4,
    question: 'Which programming language is known for its use in web development?',
    options: ['Python', 'JavaScript', 'C++', 'Java'],
    answer: 'JavaScript'
  },
  {
    id: '11',
    chapter: 4,
    question: 'What does CPU stand for?',
    options: ['Central Processing Unit', 'Computer Processing Unit', 'Central Program Unit', 'Computer Program Unit'],
    answer: 'Central Processing Unit'
  },
  {
    id: '12',
    chapter: 4,
    question: 'Which company developed React?',
    options: ['Google', 'Microsoft', 'Facebook', 'Apple'],
    answer: 'Facebook'
  }
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
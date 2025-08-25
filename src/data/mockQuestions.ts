import { Question } from '@/types/quiz';
import { allNewQuestions } from './newQuestions';

// Combine original questions with new questions
export const mockQuestions: Question[] = [
  // Chapter 1 - General Knowledge
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
    id: '13',
    chapter: 1,
    question: 'What is the largest continent on Earth?',
    options: ['North America', 'Europe', 'Asia', 'Africa'],
    answer: 'Asia'
  },
  {
    id: '14',
    chapter: 1,
    question: 'Which element has the chemical symbol "O"?',
    options: ['Osmium', 'Oxygen', 'Oganesson', 'Osmium'],
    answer: 'Oxygen'
  },
  {
    id: '15',
    chapter: 1,
    question: 'What is the main component of the Sun?',
    options: ['Liquid Lava', 'Molten Iron', 'Hot Gases', 'Solid Rock'],
    answer: 'Hot Gases'
  },
  {
    id: '16',
    chapter: 1,
    question: 'How many sides does a hexagon have?',
    options: ['5', '6', '7', '8'],
    answer: '6'
  },
  {
    id: '17',
    chapter: 1,
    question: 'What is the largest mammal in the world?',
    options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
    answer: 'Blue Whale'
  },
  {
    id: '18',
    chapter: 1,
    question: 'Which country is home to the kangaroo?',
    options: ['New Zealand', 'South Africa', 'Australia', 'India'],
    answer: 'Australia'
  },
  {
    id: '19',
    chapter: 1,
    question: 'What is the square root of 144?',
    options: ['10', '11', '12', '13'],
    answer: '12'
  },
  {
    id: '20',
    chapter: 1,
    question: 'Which gas do plants absorb from the atmosphere?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
    answer: 'Carbon Dioxide'
  },

  // Chapter 2 - History & Culture
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
    id: '21',
    chapter: 2,
    question: 'Who was the first President of the United States?',
    options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin'],
    answer: 'George Washington'
  },
  {
    id: '22',
    chapter: 2,
    question: 'Which ancient wonder was located in Alexandria?',
    options: ['Colossus of Rhodes', 'Lighthouse of Alexandria', 'Hanging Gardens', 'Temple of Artemis'],
    answer: 'Lighthouse of Alexandria'
  },
  {
    id: '23',
    chapter: 2,
    question: 'What year did Columbus discover America?',
    options: ['1490', '1491', '1492', '1493'],
    answer: '1492'
  },
  {
    id: '24',
    chapter: 2,
    question: 'Which empire was ruled by the Aztecs?',
    options: ['Mexican Empire', 'Incan Empire', 'Mayan Empire', 'Aztec Empire'],
    answer: 'Aztec Empire'
  },
  {
    id: '25',
    chapter: 2,
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
    answer: 'William Shakespeare'
  },
  {
    id: '26',
    chapter: 2,
    question: 'What is the capital of Japan?',
    options: ['Kyoto', 'Osaka', 'Tokyo', 'Yokohama'],
    answer: 'Tokyo'
  },
  {
    id: '27',
    chapter: 2,
    question: 'Which country is known as the Land of the Rising Sun?',
    options: ['China', 'Japan', 'Korea', 'Thailand'],
    answer: 'Japan'
  },
  {
    id: '28',
    chapter: 2,
    question: 'What is the oldest known civilization?',
    options: ['Egyptian', 'Mesopotamian', 'Chinese', 'Greek'],
    answer: 'Mesopotamian'
  },
  {
    id: '29',
    chapter: 2,
    question: 'Who was the first woman to win a Nobel Prize?',
    options: ['Marie Curie', 'Mother Teresa', 'Jane Addams', 'Pearl S. Buck'],
    answer: 'Marie Curie'
  },
  {
    id: '30',
    chapter: 2,
    question: 'What year did the Berlin Wall fall?',
    options: ['1987', '1988', '1989', '1990'],
    answer: '1989'
  },

  // Chapter 3 - Science & Nature
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
    id: '31',
    chapter: 3,
    question: 'What is the hardest natural substance on Earth?',
    options: ['Steel', 'Diamond', 'Granite', 'Iron'],
    answer: 'Diamond'
  },
  {
    id: '32',
    chapter: 3,
    question: 'How many bones are in the human body?',
    options: ['206', '212', '198', '220'],
    answer: '206'
  },
  {
    id: '33',
    chapter: 3,
    question: 'What is the largest organ in the human body?',
    options: ['Heart', 'Brain', 'Liver', 'Skin'],
    answer: 'Skin'
  },
  {
    id: '34',
    chapter: 3,
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    answer: 'Mars'
  },
  {
    id: '35',
    chapter: 3,
    question: 'What is the atomic number of carbon?',
    options: ['4', '5', '6', '7'],
    answer: '6'
  },
  {
    id: '36',
    chapter: 3,
    question: 'What type of animal is a dolphin?',
    options: ['Fish', 'Amphibian', 'Mammal', 'Reptile'],
    answer: 'Mammal'
  },
  {
    id: '37',
    chapter: 3,
    question: 'What is the speed of light?',
    options: ['186,000 mph', '186,000 km/s', '299,792 km/s', '299,792 mph'],
    answer: '299,792 km/s'
  },
  {
    id: '38',
    chapter: 3,
    question: 'Which gas is most abundant in Earth\'s atmosphere?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
    answer: 'Nitrogen'
  },
  {
    id: '39',
    chapter: 3,
    question: 'What is the study of fossils called?',
    options: ['Archaeology', 'Paleontology', 'Geology', 'Biology'],
    answer: 'Paleontology'
  },
  {
    id: '40',
    chapter: 3,
    question: 'How many chromosomes do humans have?',
    options: ['23', '46', '44', '48'],
    answer: '46'
  },

  // Chapter 4 - Technology & Computing
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
  },
  {
    id: '41',
    chapter: 4,
    question: 'What does HTML stand for?',
    options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
    answer: 'HyperText Markup Language'
  },
  {
    id: '42',
    chapter: 4,
    question: 'Which company owns Android?',
    options: ['Apple', 'Microsoft', 'Google', 'Samsung'],
    answer: 'Google'
  },
  {
    id: '43',
    chapter: 4,
    question: 'What is the main function of RAM?',
    options: ['Long-term storage', 'Temporary memory', 'Processing data', 'Display output'],
    answer: 'Temporary memory'
  },
  {
    id: '44',
    chapter: 4,
    question: 'What does URL stand for?',
    options: ['Uniform Resource Locator', 'Universal Reference Link', 'Unique Resource Location', 'United Resource Library'],
    answer: 'Uniform Resource Locator'
  },
  {
    id: '45',
    chapter: 4,
    question: 'Which programming language was created by Guido van Rossum?',
    options: ['Java', 'Python', 'C++', 'JavaScript'],
    answer: 'Python'
  },
  {
    id: '46',
    chapter: 4,
    question: 'What is the file extension for JavaScript files?',
    options: ['.js', '.java', '.javascript', '.script'],
    answer: '.js'
  },
  {
    id: '47',
    chapter: 4,
    question: 'What does API stand for?',
    options: ['Application Programming Interface', 'Advanced Programming Interface', 'Automated Program Integration', 'Application Process Integration'],
    answer: 'Application Programming Interface'
  },
  {
    id: '48',
    chapter: 4,
    question: 'Which company created the iPhone?',
    options: ['Samsung', 'Apple', 'Google', 'Microsoft'],
    answer: 'Apple'
  },
  {
    id: '49',
    chapter: 4,
    question: 'What is the primary function of a firewall?',
    options: ['Speed up internet', 'Block unwanted traffic', 'Store data', 'Process graphics'],
    answer: 'Block unwanted traffic'
  },
  {
    id: '50',
    chapter: 4,
    question: 'What does VPN stand for?',
    options: ['Virtual Private Network', 'Very Personal Network', 'Virtual Public Network', 'Verified Private Network'],
    answer: 'Virtual Private Network'
  },
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
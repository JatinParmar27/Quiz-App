// Node.js script to upload questions to Firebase
// Run with: node scripts/upload-to-firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, writeBatch, doc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYDjzJ_NetpZr-fCH5bTNKYCNO1X5_Nxc",
  authDomain: "quizzer-21573.firebaseapp.com",
  projectId: "quizzer-21573",
  storageBucket: "quizzer-21573.firebasestorage.app",
  messagingSenderId: "614038126483",
  appId: "1:614038126483:web:bcb619fd42deb21898f266",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mock questions data (same as in mockQuestions.ts)
const mockQuestions = [
  {
    chapter: 1,
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    answer: 'Paris'
  },
  {
    chapter: 1,
    question: 'Which planet is closest to the Sun?',
    options: ['Venus', 'Mercury', 'Mars', 'Earth'],
    answer: 'Mercury'
  },
  {
    chapter: 1,
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    answer: '4'
  },
  {
    chapter: 2,
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
    answer: 'Leonardo da Vinci'
  },
  {
    chapter: 2,
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    answer: 'Pacific Ocean'
  },
  {
    chapter: 2,
    question: 'In what year did World War II end?',
    options: ['1944', '1945', '1946', '1947'],
    answer: '1945'
  },
  {
    chapter: 3,
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    answer: 'Au'
  },
  {
    chapter: 3,
    question: 'Which is the smallest country in the world?',
    options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
    answer: 'Vatican City'
  },
  {
    chapter: 3,
    question: 'What is the fastest land animal?',
    options: ['Lion', 'Cheetah', 'Leopard', 'Tiger'],
    answer: 'Cheetah'
  },
  {
    chapter: 4,
    question: 'Which programming language is known for its use in web development?',
    options: ['Python', 'JavaScript', 'C++', 'Java'],
    answer: 'JavaScript'
  },
  {
    chapter: 4,
    question: 'What does CPU stand for?',
    options: ['Central Processing Unit', 'Computer Processing Unit', 'Central Program Unit', 'Computer Program Unit'],
    answer: 'Central Processing Unit'
  },
  {
    chapter: 4,
    question: 'Which company developed React?',
    options: ['Google', 'Microsoft', 'Facebook', 'Apple'],
    answer: 'Facebook'
  }
];

async function uploadQuestionsToFirebase() {
  try {
    console.log('🚀 Starting bulk upload of questions to Firebase...');
    console.log(`📊 Total questions to upload: ${mockQuestions.length}`);
    
    // Use batch write for better performance
    const batch = writeBatch(db);
    
    mockQuestions.forEach((question) => {
      const docRef = doc(collection(db, 'questions'));
      batch.set(docRef, {
        chapter: question.chapter,
        question: question.question,
        options: question.options,
        answer: question.answer
      });
    });
    
    await batch.commit();
    
    console.log('✅ Successfully uploaded all questions to Firebase!');
    console.log('📝 Questions are now available in your Firestore database');
    
  } catch (error) {
    console.error('❌ Error uploading questions to Firebase:', error);
    throw error;
  }
}

// Run the upload
uploadQuestionsToFirebase()
  .then(() => {
    console.log('🎉 Upload completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Upload failed:', error);
    process.exit(1);
  }); 
# Firebase Setup Guide for Quiz Application

This guide will help you migrate from static mock data to dynamic Firebase Firestore data for your quiz application.

## 🚀 Quick Start

### 1. Firebase Project Setup

Your Firebase project is already configured in `src/firebase.js` with the following details:
- **Project ID**: `quizzer-21573`
- **Database**: Firestore

### 2. Upload Questions to Firebase

You have several options to upload your existing mock questions to Firebase:

#### Option A: Using the Admin Interface (Recommended)
1. Add the `QuestionUploader` component to your app temporarily
2. Navigate to the uploader page
3. Click "Upload Mock Questions" to bulk upload all existing questions

#### Option B: Using the Command Line Script
```bash
# Run the Node.js script to upload questions
node scripts/upload-to-firebase.js
```

#### Option C: Using the Browser Console
```javascript
// Open browser console and run this code
import { uploadQuestionsToFirebase } from './src/scripts/uploadQuestionsToFirebase.js';
await uploadQuestionsToFirebase();
```

### 3. Verify the Upload

After uploading, you can verify the data in your Firebase Console:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`quizzer-21573`)
3. Navigate to Firestore Database
4. You should see a `questions` collection with all your quiz questions

## 📁 File Structure

```
src/
├── services/
│   └── firebaseService.ts          # Firebase service layer
├── hooks/
│   └── useQuestions.ts             # React hooks for data fetching
├── data/
│   ├── mockQuestions.ts            # Original static data (can be removed)
│   └── firebaseQuestions.ts        # New Firebase-based data service
├── scripts/
│   └── uploadQuestionsToFirebase.ts # Upload script
└── components/
    └── admin/
        └── QuestionUploader.tsx    # Admin interface for managing questions
```

## 🔧 Implementation Details

### Firebase Service (`src/services/firebaseService.ts`)
- Handles all Firestore operations
- Provides methods for CRUD operations
- Uses batch writes for bulk operations
- Includes error handling and logging

### React Hooks (`src/hooks/useQuestions.ts`)
- `useQuestions()` - Fetches questions with loading/error states
- `useChapters()` - Fetches available chapters
- Provides refetch functionality
- Handles async data fetching

### Data Service (`src/data/firebaseQuestions.ts`)
- Maintains the same interface as the original mock data
- Replaces static functions with async Firebase calls
- Keeps the `shuffleArray` utility function

## 🎯 Migration Steps

### Step 1: Upload Data
Choose one of the upload methods above to populate your Firestore database.

### Step 2: Update Components
The following components have been updated to use Firebase:
- `ChapterSelection.tsx` - Now uses `useChapters` hook
- `Quiz.tsx` - Now uses async `startQuiz` function

### Step 3: Test the Application
1. Start your development server: `npm run dev`
2. Navigate to the quiz application
3. Select chapters and start a quiz
4. Verify that questions are loaded from Firebase

### Step 4: Remove Static Data (Optional)
Once you've confirmed everything works:
1. Remove `src/data/mockQuestions.ts`
2. Update any remaining imports to use `firebaseQuestions.ts`

## 🔒 Security Rules

Make sure your Firestore security rules allow read access to the questions collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /questions/{document} {
      allow read: if true;  // Allow public read access
      allow write: if false; // Restrict write access (use admin interface)
    }
  }
}
```

## 📊 Data Structure

Each question document in Firestore has the following structure:

```javascript
{
  chapter: number,        // Chapter number (1, 2, 3, 4)
  question: string,       // The question text
  options: string[],      // Array of 4 answer options
  answer: string          // The correct answer
}
```

## 🛠️ Admin Features

The `QuestionUploader` component provides:
- Bulk upload of existing mock questions
- Add custom questions one by one
- Clear all questions from the database
- Real-time feedback and error handling

## 🔄 Adding New Questions

### Via Admin Interface
1. Use the `QuestionUploader` component
2. Fill in the question form
3. Click "Add Question" to add to the list
4. Click "Upload Custom Questions" to save to Firebase

### Via Firebase Console
1. Go to Firebase Console > Firestore
2. Navigate to the `questions` collection
3. Click "Add Document"
4. Fill in the fields manually

### Via Code
```javascript
import { FirebaseService } from './src/services/firebaseService';

const newQuestion = {
  chapter: 5,
  question: "What is the capital of Japan?",
  options: ["Tokyo", "Kyoto", "Osaka", "Yokohama"],
  answer: "Tokyo"
};

await FirebaseService.addQuestion(newQuestion);
```

## 🚨 Troubleshooting

### Common Issues

1. **Firebase connection errors**
   - Check your Firebase configuration in `src/firebase.js`
   - Verify your project ID and API key

2. **Permission denied errors**
   - Check your Firestore security rules
   - Ensure read access is allowed for the questions collection

3. **Questions not loading**
   - Check the browser console for errors
   - Verify that questions exist in your Firestore database
   - Check the network tab for failed requests

4. **Upload script errors**
   - Ensure you have the correct Firebase configuration
   - Check that your Firebase project is active
   - Verify you have write permissions

### Debug Mode

Enable debug logging by adding this to your Firebase service:

```javascript
// In firebaseService.ts
console.log('Firebase operation:', operation, data);
```

## 📈 Performance Considerations

- **Batch Operations**: Use batch writes for bulk uploads
- **Caching**: Consider implementing client-side caching for frequently accessed data
- **Pagination**: For large datasets, implement pagination
- **Indexing**: Create composite indexes for complex queries

## 🔮 Future Enhancements

- **Real-time updates**: Use Firestore listeners for live data updates
- **Offline support**: Enable offline persistence
- **User authentication**: Add user-specific quiz attempts
- **Analytics**: Track quiz performance and user behavior
- **Question categories**: Add tags and categories for better organization

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Firebase configuration
3. Test with the provided upload scripts
4. Check the Firestore security rules

Your quiz application is now ready to use dynamic data from Firebase Firestore! 🎉 
import { mockQuestions } from '../data/mockQuestions';
import { FirebaseService } from '../services/firebaseService';

// Remove the 'id' field from mock questions since Firestore will generate IDs
const questionsToUpload = mockQuestions.map(({ id, ...question }) => question);

export async function uploadQuestionsToFirebase() {
  try {
    console.log('Starting bulk upload of questions to Firebase...');
    console.log(`Total questions to upload: ${questionsToUpload.length}`);
    
    await FirebaseService.bulkUploadQuestions(questionsToUpload);
    
    console.log('✅ Successfully uploaded all questions to Firebase!');
    
    // Verify the upload by fetching questions
    const uploadedQuestions = await FirebaseService.getAllQuestions();
    console.log(`✅ Verification: Found ${uploadedQuestions.length} questions in Firebase`);
    
    // Show chapters
    const chapters = await FirebaseService.getChapters();
    console.log(`✅ Available chapters: ${chapters.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error uploading questions to Firebase:', error);
    throw error;
  }
}

// If running this script directly
if (typeof window === 'undefined') {
  uploadQuestionsToFirebase()
    .then(() => {
      console.log('Upload completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Upload failed:', error);
      process.exit(1);
    });
} 
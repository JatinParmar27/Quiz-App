import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FirebaseService } from '@/services/firebaseService';
import { uploadQuestionsToFirebase } from '@/scripts/uploadQuestionsToFirebase';
import { mockQuestions } from '@/data/mockQuestions';
import { Question } from '@/types/quiz';
import { Upload, Plus, Trash2, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export const QuestionUploader = () => {
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState({
    chapter: 1,
    question: '',
    options: ['', '', '', ''],
    answer: ''
  });

  const handleBulkUpload = async () => {
    setLoading(true);
    setUploadStatus('uploading');
    
    try {
      await uploadQuestionsToFirebase();
      setUploadStatus('success');
      toast.success('Successfully uploaded all questions to Firebase!');
    } catch (error) {
      setUploadStatus('error');
      toast.error('Failed to upload questions to Firebase');
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = () => {
    if (!newQuestion.question || !newQuestion.answer || newQuestion.options.some(opt => !opt)) {
      toast.error('Please fill in all fields');
      return;
    }

    const question: Omit<Question, 'id'> = {
      chapter: newQuestion.chapter,
      question: newQuestion.question,
      options: newQuestion.options,
      answer: newQuestion.answer
    };

    setQuestions([...questions, { ...question, id: `temp-${Date.now()}` }]);
    
    // Reset form
    setNewQuestion({
      chapter: 1,
      question: '',
      options: ['', '', '', ''],
      answer: ''
    });
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleUploadCustomQuestions = async () => {
    if (questions.length === 0) {
      toast.error('No questions to upload');
      return;
    }

    setLoading(true);
    try {
      const questionsToUpload = questions.map(({ id, ...question }) => question);
      await FirebaseService.bulkUploadQuestions(questionsToUpload);
      setQuestions([]);
      toast.success(`Successfully uploaded ${questions.length} questions!`);
    } catch (error) {
      toast.error('Failed to upload custom questions');
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (!confirm('Are you sure you want to delete ALL questions from Firebase? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    try {
      await FirebaseService.clearAllQuestions();
      toast.success('All questions cleared from Firebase');
    } catch (error) {
      toast.error('Failed to clear questions');
      console.error('Clear error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Firebase Question Management
            </CardTitle>
            <CardDescription>
              Upload and manage quiz questions in Firebase Firestore
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bulk Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Bulk Upload Mock Questions</h3>
              <p className="text-sm text-muted-foreground">
                Upload all {mockQuestions.length} existing mock questions to Firebase
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={handleBulkUpload} 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading && uploadStatus === 'uploading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : uploadStatus === 'success' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : uploadStatus === 'error' ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Upload Mock Questions
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleClearAll}
                  disabled={loading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Questions
                </Button>
              </div>
            </div>

            {/* Custom Question Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Add Custom Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="chapter">Chapter</Label>
                  <Input
                    id="chapter"
                    type="number"
                    min="1"
                    value={newQuestion.chapter}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, chapter: parseInt(e.target.value) || 1 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="answer">Correct Answer</Label>
                  <Input
                    id="answer"
                    value={newQuestion.answer}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, answer: e.target.value }))}
                    placeholder="Enter the correct answer"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="question">Question</Label>
                <Textarea
                  id="question"
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion(prev => ({ ...prev, question: e.target.value }))}
                  placeholder="Enter your question here..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Options</Label>
                {newQuestion.options.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...newQuestion.options];
                        newOptions[index] = e.target.value;
                        setNewQuestion(prev => ({ ...prev, options: newOptions }));
                      }}
                      placeholder={`Option ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              <Button onClick={handleAddQuestion} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Question
              </Button>
            </div>

            {/* Custom Questions List */}
            {questions.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Custom Questions ({questions.length})</h3>
                  <Button 
                    onClick={handleUploadCustomQuestions}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    Upload Custom Questions
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {questions.map((question, index) => (
                    <div key={question.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">Chapter {question.chapter}</p>
                        <p className="text-sm text-muted-foreground truncate">{question.question}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveQuestion(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 
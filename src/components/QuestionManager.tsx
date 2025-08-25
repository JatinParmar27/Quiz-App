import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { Question } from '@/types/quiz';
import { mockQuestions, getChapters } from '@/data/mockQuestions';
import { FirebaseService } from '@/services/firebaseService';
import { Plus, Trash2, Edit, Eye, Save, X, Database, Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';

export const QuestionManager = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState({
    chapter: '1',
    question: '',
    options: ['', '', '', ''],
    answer: ''
  });
  const [chapters, setChapters] = useState<string[]>([]);
  const [isFirebaseMode, setIsFirebaseMode] = useState(false);

  // Load questions from Firebase or local
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        // Try to load from Firebase first
        const firebaseQuestions = await FirebaseService.getAllQuestions();
        if (firebaseQuestions.length > 0) {
          setQuestions(firebaseQuestions);
          setIsFirebaseMode(true);
          toast.success('Loaded questions from Firebase');
        } else {
          // Fallback to local questions
          setQuestions(mockQuestions);
          setIsFirebaseMode(false);
          toast.info('No Firebase data found, using local questions');
        }
        
        const availableChapters = [...new Set(firebaseQuestions.length > 0 ? firebaseQuestions.map(q => q.chapter) : mockQuestions.map(q => q.chapter))];
        setChapters(availableChapters.sort());
      } catch (error) {
        console.error('Error loading questions:', error);
        setQuestions(mockQuestions);
        setChapters(getChapters().map(c => c.toString()));
        setIsFirebaseMode(false);
        toast.error('Failed to load from Firebase, using local questions');
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleAddQuestion = async () => {
    if (!newQuestion.question || !newQuestion.answer || newQuestion.options.some(opt => !opt)) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      if (isFirebaseMode) {
        // Add to Firebase
        const newId = await FirebaseService.addQuestion(newQuestion);
        const question: Question = {
          id: newId,
          ...newQuestion
        };
        setQuestions([...questions, question]);
        toast.success('Question added to Firebase');
      } else {
        // Add to local state
        const question: Question = {
          id: `q${Date.now()}`,
          ...newQuestion
        };
        setQuestions([...questions, question]);
        toast.success('Question added locally');
      }
      
      // Reset form
      setNewQuestion({
        chapter: '1',
        question: '',
        options: ['', '', '', ''],
        answer: ''
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding question:', error);
      toast.error('Failed to add question');
    }
  };

  const handleEditQuestion = (id: string) => {
    const question = questions.find(q => q.id === id);
    if (question) {
      setNewQuestion({
        chapter: question.chapter,
        question: question.question,
        options: question.options,
        answer: question.answer
      });
      setEditingId(id);
      setShowAddForm(true);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;

    try {
      if (isFirebaseMode) {
        // Update in Firebase
        await FirebaseService.updateQuestion(editingId, newQuestion);
        toast.success('Question updated in Firebase');
      } else {
        // Update local state
        setQuestions(questions.map(q => 
          q.id === editingId 
            ? { ...q, ...newQuestion }
            : q
        ));
        toast.success('Question updated locally');
      }

      setEditingId(null);
      setShowAddForm(false);
      setNewQuestion({
        chapter: '1',
        question: '',
        options: ['', '', '', ''],
        answer: ''
      });
    } catch (error) {
      console.error('Error updating question:', error);
      toast.error('Failed to update question');
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      if (isFirebaseMode) {
        // Delete from Firebase
        await FirebaseService.deleteQuestion(id);
        toast.success('Question deleted from Firebase');
      } else {
        // Delete from local state
        setQuestions(questions.filter(q => q.id !== id));
        toast.success('Question deleted locally');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      toast.error('Failed to delete question');
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setNewQuestion({
      chapter: '1',
      question: '',
      options: ['', '', '', ''],
      answer: ''
    });
  };

  const handleSyncToFirebase = async () => {
    try {
      await FirebaseService.syncLocalQuestionsToFirebase(questions);
      setIsFirebaseMode(true);
      toast.success('Questions synced to Firebase successfully!');
    } catch (error) {
      console.error('Error syncing to Firebase:', error);
      toast.error('Failed to sync to Firebase');
    }
  };

  const getQuestionsByChapter = (chapter: string) => {
    return questions.filter(q => q.chapter === chapter);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center p-8">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-muted-foreground">Loading questions...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Question Manager
                  {isFirebaseMode ? (
                    <span className="flex items-center gap-1 text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                      <Database className="h-3 w-3" />
                      Firebase
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      Local
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  Manage your quiz questions. Total: {questions.length} questions
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {!isFirebaseMode && (
                  <Button 
                    onClick={handleSyncToFirebase}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Sync to Firebase
                  </Button>
                )}
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add New Question
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>
                {editingId ? 'Edit Question' : 'Add New Question'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="chapter">Chapter</Label>
                  <Input
                    id="chapter"
                    type="text"
                    value={newQuestion.chapter}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, chapter: e.target.value }))}
                    placeholder="Enter chapter name or number"
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

              <div className="flex gap-2">
                <Button 
                  onClick={editingId ? handleSaveEdit : handleAddQuestion}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {editingId ? 'Save Changes' : 'Add Question'}
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Questions by Chapter */}
        {chapters.map(chapter => {
          const chapterQuestions = getQuestionsByChapter(chapter);
          return (
            <Card key={chapter}>
              <CardHeader>
                <CardTitle>Chapter {chapter} ({chapterQuestions.length} questions)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {chapterQuestions.map((question) => (
                    <div key={question.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{question.question}</p>
                        <p className="text-sm text-muted-foreground">
                          Answer: {question.answer}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditQuestion(question.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {chapterQuestions.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      No questions in this chapter yet.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}; 
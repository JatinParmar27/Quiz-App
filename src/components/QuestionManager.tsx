import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Question } from '@/types/quiz';
import { mockQuestions, getChapters } from '@/data/mockQuestions';
import { Plus, Trash2, Edit, Eye, Save, X } from 'lucide-react';

export const QuestionManager = () => {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState({
    chapter: 1,
    question: '',
    options: ['', '', '', ''],
    answer: ''
  });

  const chapters = getChapters();

  const handleAddQuestion = () => {
    if (!newQuestion.question || !newQuestion.answer || newQuestion.options.some(opt => !opt)) {
      alert('Please fill in all fields');
      return;
    }

    const question: Question = {
      id: `q${Date.now()}`,
      chapter: newQuestion.chapter,
      question: newQuestion.question,
      options: newQuestion.options,
      answer: newQuestion.answer
    };

    setQuestions([...questions, question]);
    
    // Reset form
    setNewQuestion({
      chapter: 1,
      question: '',
      options: ['', '', '', ''],
      answer: ''
    });
    setShowAddForm(false);
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

  const handleSaveEdit = () => {
    if (!editingId) return;

    setQuestions(questions.map(q => 
      q.id === editingId 
        ? { ...q, ...newQuestion }
        : q
    ));

    setEditingId(null);
    setShowAddForm(false);
    setNewQuestion({
      chapter: 1,
      question: '',
      options: ['', '', '', ''],
      answer: ''
    });
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setNewQuestion({
      chapter: 1,
      question: '',
      options: ['', '', '', ''],
      answer: ''
    });
  };

  const getQuestionsByChapter = (chapter: number) => {
    return questions.filter(q => q.chapter === chapter);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Question Manager</CardTitle>
                <CardDescription>
                  Manage your quiz questions. Total: {questions.length} questions
                </CardDescription>
              </div>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add New Question
              </Button>
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
                  <Select 
                    value={newQuestion.chapter.toString()} 
                    onValueChange={(value) => setNewQuestion(prev => ({ ...prev, chapter: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {chapters.map(chapter => (
                        <SelectItem key={chapter} value={chapter.toString()}>
                          Chapter {chapter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
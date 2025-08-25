import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { getChapters, getQuestionsByChapters } from '@/data/mockQuestions';
import { BookOpen, ArrowRight } from 'lucide-react';

interface ChapterSelectionProps {
  onStartQuiz: (chapters: number[]) => void;
}

export const ChapterSelection = ({ onStartQuiz }: ChapterSelectionProps) => {
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);
  const availableChapters = getChapters();

  const handleChapterToggle = (chapter: number) => {
    setSelectedChapters(prev =>
      prev.includes(chapter)
        ? prev.filter(c => c !== chapter)
        : [...prev, chapter]
    );
  };

  const handleSelectAll = () => {
    setSelectedChapters(
      selectedChapters.length === availableChapters.length ? [] : availableChapters
    );
  };

  const getQuestionCount = () => {
    return getQuestionsByChapters(selectedChapters).length;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-quiz-card border-border/50 shadow-2xl animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-primary/20 rounded-full">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Quiz Application
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Select the chapters you want to include in your quiz
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Available Chapters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
                className="text-primary hover:text-primary/80"
              >
                {selectedChapters.length === availableChapters.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            
            <div className="space-y-3">
              {availableChapters.map((chapter) => (
                <div
                  key={chapter}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-quiz-option hover:bg-quiz-option-hover transition-colors cursor-pointer"
                  onClick={() => handleChapterToggle(chapter)}
                >
                  <Checkbox
                    id={`chapter-${chapter}`}
                    checked={selectedChapters.includes(chapter)}
                    onCheckedChange={() => handleChapterToggle(chapter)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label
                    htmlFor={`chapter-${chapter}`}
                    className="flex-1 cursor-pointer font-medium text-foreground"
                  >
                    Chapter {chapter}
                  </label>
                  <span className="text-sm text-muted-foreground">
                    {getQuestionsByChapters([chapter]).length} questions
                  </span>
                </div>
              ))}
            </div>
          </div>

          {selectedChapters.length > 0 && (
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 animate-fade-in">
              <p className="text-sm text-foreground font-medium">
                Total Questions: <span className="text-primary">{getQuestionCount()}</span>
              </p>
            </div>
          )}

          <Button
            onClick={() => onStartQuiz(selectedChapters)}
            disabled={selectedChapters.length === 0}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity font-medium"
            size="lg"
          >
            Start Quiz
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuizAttempt } from '@/types/quiz';
import { Trophy, Clock, Target, RotateCcw, Eye, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuizResultsProps {
  attempt: QuizAttempt;
  onRetry: () => void;
  onReview: () => void;
  onNewQuiz: () => void;
}

export const QuizResults = ({ attempt, onRetry, onReview, onNewQuiz }: QuizResultsProps) => {
  const { toast } = useToast();
  const percentage = Math.round((attempt.score / attempt.total) * 100);
  
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return 'Excellent work!';
    if (percentage >= 60) return 'Good effort!';
    return 'Keep practicing!';
  };

  const handleExport = () => {
    // Mock export functionality
    toast({
      title: "Export Started",
      description: "Your quiz results are being prepared for download.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-quiz-card border-border/50 shadow-2xl animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/20 rounded-full">
              <Trophy className="h-12 w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Quiz Complete!</CardTitle>
          <CardDescription className="text-lg">{getScoreMessage()}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Score Display */}
          <div className="text-center space-y-4">
            <div className={`text-6xl font-bold ${getScoreColor()}`}>
              {percentage}%
            </div>
            <div className="text-xl text-muted-foreground">
              {attempt.score} out of {attempt.total} questions correct
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-quiz-option rounded-lg text-center">
              <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-sm text-muted-foreground">Time Taken</div>
              <div className="text-lg font-semibold text-foreground">{attempt.timeTaken}</div>
            </div>
            <div className="p-4 bg-quiz-option rounded-lg text-center">
              <Target className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-sm text-muted-foreground">Chapters</div>
              <div className="text-lg font-semibold text-foreground">
                {attempt.chapters.join(', ')}
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Quick Overview</h3>
            <div className="space-y-2">
              {attempt.answers.map((answer, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg flex items-center justify-between ${
                    answer.isCorrect ? 'bg-success/20 border border-success/30' : 'bg-destructive/20 border border-destructive/30'
                  }`}
                >
                  <span className="text-sm font-medium">Question {index + 1}</span>
                  <span className={`text-sm font-medium ${
                    answer.isCorrect ? 'text-success' : 'text-destructive'
                  }`}>
                    {answer.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={onReview}
              variant="outline"
              className="w-full border-primary/50 hover:bg-primary/10"
            >
              <Eye className="mr-2 h-4 w-4" />
              Review Answers
            </Button>
            <Button
              onClick={handleExport}
              variant="outline"
              className="w-full border-primary/50 hover:bg-primary/10"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Results
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={onRetry}
              variant="secondary"
              className="w-full"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retry Quiz
            </Button>
            <Button
              onClick={onNewQuiz}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              New Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
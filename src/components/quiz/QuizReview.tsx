import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Question } from '@/types/quiz';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

interface QuizReviewProps {
  questions: Question[];
  answers: Array<{
    questionId: string;
    selected: string;
    correct: string;
    isCorrect: boolean;
  }>;
  onBack: () => void;
}

export const QuizReview = ({ questions, answers, onBack }: QuizReviewProps) => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-quiz-card border-border/50 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Review Your Answers</CardTitle>
              <Button
                onClick={onBack}
                variant="outline"
                className="border-primary/50 hover:bg-primary/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Results
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Questions Review */}
        <div className="space-y-6">
          {questions.map((question, index) => {
            const answer = answers[index];
            return (
              <Card
                key={question.id}
                className={`bg-quiz-card border-border/50 shadow-lg animate-fade-in ${
                  answer.isCorrect ? 'border-l-4 border-l-success' : 'border-l-4 border-l-destructive'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-muted-foreground">
                          Question {index + 1} • Chapter {question.chapter}
                        </span>
                        {answer.isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground leading-relaxed">
                        {question.question}
                      </h3>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = option === answer.selected;
                      const isCorrect = option === answer.correct;
                      
                      let className = 'p-3 rounded-lg border transition-all ';
                      
                      if (isCorrect) {
                        className += 'bg-success/20 border-success text-success-foreground ';
                      } else if (isSelected && !isCorrect) {
                        className += 'bg-destructive/20 border-destructive text-destructive-foreground ';
                      } else {
                        className += 'bg-quiz-option border-border text-foreground ';
                      }

                      return (
                        <div key={optionIndex} className={className}>
                          <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                              isCorrect
                                ? 'border-success bg-success text-success-foreground'
                                : isSelected
                                ? 'border-destructive bg-destructive text-destructive-foreground'
                                : 'border-muted-foreground text-muted-foreground'
                            }`}>
                              {String.fromCharCode(65 + optionIndex)}
                            </div>
                            <span className="font-medium flex-1">{option}</span>
                            <div className="flex items-center space-x-1">
                              {isSelected && (
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-background/50">
                                  Your Answer
                                </span>
                              )}
                              {isCorrect && (
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-background/50">
                                  Correct
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {!answer.isCorrect && (
                    <div className="p-3 bg-muted/50 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground">
                        <strong>Explanation:</strong> The correct answer is "{answer.correct}".
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
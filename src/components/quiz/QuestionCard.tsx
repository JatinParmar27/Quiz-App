import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Question } from '@/types/quiz';
import { Clock, ArrowRight } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  elapsedTime: string;
}

export const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  elapsedTime
}: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      onAnswer(selectedOption);
      setSelectedOption(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-quiz-card border-border/50 shadow-2xl animate-fade-in">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Question {currentIndex + 1} of {totalQuestions}</span>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{elapsedTime}</span>
            </div>
          </div>
          
          <Progress value={progress} className="h-2 bg-muted" />
          
          <div className="text-center">
            <span className="text-sm text-muted-foreground">Chapter {question.chapter}</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground leading-relaxed">
            {question.question}
          </h2>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                  selectedOption === option
                    ? 'bg-quiz-option-selected border-primary text-primary-foreground shadow-lg animate-pulse-success'
                    : 'bg-quiz-option hover:bg-quiz-option-hover border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    selectedOption === option
                      ? 'border-primary-foreground bg-primary-foreground text-primary'
                      : 'border-muted-foreground text-muted-foreground'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className={`font-medium ${
                    selectedOption === option ? 'text-primary-foreground' : 'text-foreground'
                  }`}>
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleNext}
              disabled={!selectedOption}
              className="bg-gradient-primary hover:opacity-90 transition-opacity font-medium"
              size="lg"
            >
              {currentIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
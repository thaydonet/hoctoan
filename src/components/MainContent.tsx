import React from 'react';
import { MathTopic } from '../types/MathTopic';
import ContentHeader from './ContentHeader';
import TheorySection from './TheorySection';
import FlashcardsSection from './FlashcardsSection';
import ExamplesSection from './ExamplesSection';
import QuizSection from './QuizSection';
import HomeworkSection from './HomeworkSection';

interface MainContentProps {
  topic: MathTopic;
  activeSection: 'theory' | 'flashcards' | 'examples' | 'quiz' | 'homework';
  onSectionChange: (section: 'theory' | 'flashcards' | 'examples' | 'quiz' | 'homework') => void;
  onMathJaxRender: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ topic, activeSection, onSectionChange, onMathJaxRender }) => {
  const renderSection = () => {
    switch (activeSection) {
      case 'theory':
        return <TheorySection theory={topic.theory} onMathJaxRender={onMathJaxRender} />;
      case 'flashcards':
        return <FlashcardsSection flashcards={topic.flashcards} onMathJaxRender={onMathJaxRender} />;
      case 'examples':
        return <ExamplesSection examples={topic.examples} onMathJaxRender={onMathJaxRender} />;
      case 'quiz':
        return <QuizSection 
          questions={topic.quiz} 
          trueFalseQuestions={topic.trueFalseQuiz}
          shortAnswerQuestions={topic.shortAnswerQuiz}
          onMathJaxRender={onMathJaxRender}
        />;
      case 'homework':
        return <HomeworkSection assignments={topic.homework} onMathJaxRender={onMathJaxRender} />;
      default:
        return <TheorySection theory={topic.theory} onMathJaxRender={onMathJaxRender} />;
    }
  };

  return (
    <div className="flex-1 h-screen overflow-y-auto">
      <ContentHeader 
        topic={topic}
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />
      <div className="p-8">
        {renderSection()}
      </div>
    </div>
  );
};

export default MainContent;
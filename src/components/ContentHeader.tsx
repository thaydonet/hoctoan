import React from 'react';
import { Book, Zap, FileText, Brain, PenTool, MessageCircle } from 'lucide-react';
import { MathTopic } from '../types/MathTopic';

interface ContentHeaderProps {
  topic: MathTopic;
  activeSection: 'theory' | 'flashcards' | 'examples' | 'quiz' | 'homework' | 'qa';
  onSectionChange: (section: 'theory' | 'flashcards' | 'examples' | 'quiz' | 'homework' | 'qa') => void;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({ topic, activeSection, onSectionChange }) => {
  const sections = [
    { id: 'theory', label: 'Lý thuyết', icon: Book, color: 'blue' },
    { id: 'flashcards', label: 'Flashcards', icon: Zap, color: 'purple' },
    { id: 'examples', label: 'Ví dụ', icon: FileText, color: 'green' },
    { id: 'quiz', label: 'Trắc nghiệm', icon: Brain, color: 'orange' },
    { id: 'homework', label: 'Bài tập', icon: PenTool, color: 'red' },
    { id: 'qa', label: 'Hỏi đáp', icon: MessageCircle, color: 'blue' }
  ] as const;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{topic.title}</h1>
        <p className="text-gray-600 mb-6">{topic.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? `bg-${section.color}-500 text-white shadow-lg transform scale-105`
                    : `text-gray-600 hover:bg-${section.color}-50 hover:text-${section.color}-600`
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
import React, { useEffect } from 'react';
import { BookOpen, FormInput as Formula } from 'lucide-react';

interface TheorySectionProps {
  theory: {
    title: string;
    content: string[];
    formulas: string[];
  };
  onMathJaxRender: () => void;
}

const TheorySection: React.FC<TheorySectionProps> = ({ theory, onMathJaxRender }) => {
  useEffect(() => {
    onMathJaxRender();
  }, [theory, onMathJaxRender]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <BookOpen className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">{theory.title}</h2>
        </div>
        
        <div className="space-y-6">
          {theory.content.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Formula className="w-8 h-8 text-indigo-600" />
          <h3 className="text-2xl font-bold text-gray-900">Công thức quan trọng</h3>
        </div>
        
        <div className="grid gap-4">
          {theory.formulas.map((formula, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-indigo-100">
              <code className="text-lg font-mono text-indigo-800 block text-center">
                {formula}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheorySection;
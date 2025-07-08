import React, { useState, useEffect } from 'react';
import { FileText, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { Example } from '../types/MathTopic';

interface ExamplesSectionProps {
  examples: Example[];
  onMathJaxRender: () => void;
}

const ExamplesSection: React.FC<ExamplesSectionProps> = ({ examples, onMathJaxRender }) => {
  const [expandedExample, setExpandedExample] = useState<string | null>(null);

  useEffect(() => {
    onMathJaxRender();
  }, [expandedExample, onMathJaxRender]);

  const toggleExample = (id: string) => {
    setExpandedExample(expandedExample === id ? null : id);
    // Re-render MathJax after state change
    setTimeout(onMathJaxRender, 100);
  };

  if (examples.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Chưa có ví dụ cho bài học này.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <FileText className="w-8 h-8 text-green-500" />
        <h2 className="text-2xl font-bold text-gray-900">Ví dụ minh họa</h2>
      </div>

      <div className="space-y-6">
        {examples.map((example) => (
          <div key={example.id} className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{example.title}</h3>
                <button
                  onClick={() => toggleExample(example.id)}
                  className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">
                    {expandedExample === example.id ? 'Ẩn lời giải' : 'Xem lời giải'}
                  </span>
                  {expandedExample === example.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="bg-green-50 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-green-800 mb-2">Bài toán:</h4>
                <p className="text-gray-700">{example.problem}</p>
              </div>

              {expandedExample === example.id && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <div className="flex items-center space-x-2 mb-4">
                    <Lightbulb className="w-6 h-6 text-green-600" />
                    <h4 className="font-semibold text-green-800">Lời giải chi tiết:</h4>
                  </div>
                  <div className="space-y-3">
                    {example.solution.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamplesSection;
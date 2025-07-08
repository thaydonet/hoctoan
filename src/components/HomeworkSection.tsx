import React, { useState, useEffect } from 'react';
import { PenTool, ExternalLink } from 'lucide-react';
import { HomeworkAssignment } from '../types/MathTopic';

interface HomeworkSectionProps {
  assignments: HomeworkAssignment[];
  onMathJaxRender: () => void;
}

const HomeworkSection: React.FC<HomeworkSectionProps> = ({ assignments, onMathJaxRender }) => {
  useEffect(() => {
    onMathJaxRender();
  }, [onMathJaxRender]);

  if (assignments.length === 0) {
    return (
      <div className="text-center py-12">
        <PenTool className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Chưa có bài tập cho bài học này.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <PenTool className="w-8 h-8 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-900">Bài tập</h2>
      </div>

      <div className="grid gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">{assignment.title}</h3>
                  <p className="text-green-700 mb-4">{assignment.description}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 mb-6 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3">Danh sách bài tập ({assignment.problems.length} câu):</h4>
                <div className="space-y-3">
                  {assignment.problems.map((problem, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-green-800 leading-relaxed">{problem}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center space-x-2">
                  <ExternalLink className="w-5 h-5" />
                  <span>Làm bài tập trực tuyến</span>
                </h4>
                <p className="text-blue-700 mb-4">
                  Nhấp vào liên kết bên dưới để mở form Google và làm bài tập trực tuyến:
                </p>
                <a
                  href="https://forms.gle/LkUFBKFk2Yr44Cx9A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Mở Google Form</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeworkSection;
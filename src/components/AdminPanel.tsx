import React, { useState } from 'react';
import { Plus, BookOpen, CreditCard as Edit, Trash2, Save, X, Upload, FileText, Brain, MessageCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AdminPanelProps {
  onMathJaxRender: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onMathJaxRender }) => {
  const { user, profile, isTeacher } = useAuth();
  const [activeTab, setActiveTab] = useState<'lessons' | 'bulk-import' | 'templates'>('lessons');
  const [showNewLessonForm, setShowNewLessonForm] = useState(false);
  const [bulkImportData, setBulkImportData] = useState('');
  const [importFormat, setImportFormat] = useState<'json' | 'text'>('json');

  if (!user || !isTeacher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không có quyền truy cập</h2>
          <p className="text-gray-600 mb-6">Chỉ giáo viên mới có thể truy cập trang này.</p>
        </div>
      </div>
    );
  }

  const handleBulkImport = () => {
    try {
      if (importFormat === 'json') {
        const questions = JSON.parse(bulkImportData);
        console.log('Importing JSON questions:', questions);
        alert(`Đã nhập thành công ${questions.length} câu hỏi!`);
      } else {
        // Parse text format
        const questions = parseTextFormat(bulkImportData);
        console.log('Importing text questions:', questions);
        alert(`Đã nhập thành công ${questions.length} câu hỏi!`);
      }
      setBulkImportData('');
    } catch (error) {
      alert('Lỗi định dạng dữ liệu! Vui lòng kiểm tra lại.');
    }
  };

  const parseTextFormat = (text: string) => {
    const questions = text.split('---').map(block => {
      const lines = block.trim().split('\n');
      const question = lines.find(line => line.startsWith('Câu hỏi:'))?.replace('Câu hỏi:', '').trim();
      const options = lines.filter(line => /^[A-D]\./.test(line.trim()));
      const correctLine = lines.find(line => line.includes('[ĐÚNG]'));
      const correctAnswer = correctLine ? options.findIndex(opt => opt === correctLine) : 0;
      const explanation = lines.find(line => line.startsWith('Giải thích:'))?.replace('Giải thích:', '').trim();
      
      return { question, options: options.map(opt => opt.replace(/^[A-D]\.\s*/, '').replace('[ĐÚNG]', '').trim()), correctAnswer, explanation };
    }).filter(q => q.question);
    
    return questions;
  };

  const jsonTemplate = `[
  {
    "question": "Phân thức nào sau đây bằng với phân thức $\\\\frac{x}{x+1}$?",
    "options": [
      "$\\\\frac{x^2}{x^2+1}$",
      "$\\\\frac{2x}{2x+2}$",
      "$\\\\frac{x^2}{x^2+x}$",
      "$\\\\frac{x-1}{x}$"
    ],
    "correctAnswer": 2,
    "explanation": "$\\\\frac{x^2}{x^2+x} = \\\\frac{x^2}{x(x+1)} = \\\\frac{x}{x+1}$",
    "chapter": "Chương 1",
    "lesson": "Phân thức đại số",
    "difficulty": "easy"
  }
]`;

  const textTemplate = `Câu hỏi: Phân thức nào sau đây bằng với phân thức $\\frac{x}{x+1}$?
A. $\\frac{x^2}{x^2+1}$
B. $\\frac{2x}{2x+2}$
C. $\\frac{x^2}{x^2+x}$ [ĐÚNG]
D. $\\frac{x-1}{x}$
Giải thích: $\\frac{x^2}{x^2+x} = \\frac{x^2}{x(x+1)} = \\frac{x}{x+1}$
Chương: Chương 1
Bài: Phân thức đại số
Độ khó: easy

---

Câu hỏi: Điều kiện xác định của phân thức $\\frac{1}{x^2-9}$ là:
A. $x \\neq 9$
B. $x \\neq \\pm 3$ [ĐÚNG]
C. $x \\neq 3$
D. $x \\neq -9$
Giải thích: $x^2-9 = (x-3)(x+3) \\neq 0 \\Leftrightarrow x \\neq \\pm 3$
Chương: Chương 1
Bài: Phân thức đại số
Độ khó: medium`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bảng điều khiển Admin</h1>
              <p className="text-gray-600">Quản lý nội dung và câu hỏi</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
          <div className="flex space-x-2">
            {[
              { id: 'lessons', label: 'Quản lý bài học', icon: BookOpen },
              { id: 'bulk-import', label: 'Nhập hàng loạt', icon: Upload },
              { id: 'templates', label: 'Mẫu có sẵn', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'lessons' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Quản lý bài học</h2>
              <button
                onClick={() => setShowNewLessonForm(true)}
                className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <Plus className="w-5 h-5" />
                <span>Thêm bài học mới</span>
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-800 mb-3">💡 Hướng dẫn tạo bài học</h3>
              <div className="space-y-2 text-blue-700 text-sm">
                <p>• <strong>Bước 1:</strong> Tạo file trong <code>/data/lessons/</code> với tên <code>c[chương]-b[bài]-[slug].ts</code></p>
                <p>• <strong>Bước 2:</strong> Copy template từ file có sẵn và điền nội dung</p>
                <p>• <strong>Bước 3:</strong> Import vào <code>mathChapters.ts</code></p>
                <p>• <strong>LaTeX:</strong> Sử dụng <code>\\\\</code> thay vì <code>\\</code> trong TypeScript</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bulk-import' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Nhập câu hỏi hàng loạt</h2>
            
            <div className="mb-6">
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setImportFormat('json')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    importFormat === 'json'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  JSON Format
                </button>
                <button
                  onClick={() => setImportFormat('text')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    importFormat === 'text'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Text Format
                </button>
                <button
                  onClick={() => setBulkImportData(importFormat === 'json' ? jsonTemplate : textTemplate)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Sao chép mẫu
                </button>
              </div>

              <textarea
                value={bulkImportData}
                onChange={(e) => setBulkImportData(e.target.value)}
                placeholder={`Dán dữ liệu ${importFormat.toUpperCase()} vào đây...`}
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleBulkImport}
                disabled={!bulkImportData.trim()}
                className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload className="w-5 h-5" />
                <span>Nhập câu hỏi</span>
              </button>
              <button
                onClick={() => setBulkImportData('')}
                className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <X className="w-5 h-5" />
                <span>Xóa</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Mẫu có sẵn</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>Template Trắc nghiệm</span>
                </h3>
                <pre className="bg-white p-4 rounded-lg text-xs overflow-x-auto border">
{`quiz: [
  {
    id: '1',
    question: 'Câu hỏi với LaTeX $\\\\frac{x}{x+1}$',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Giải thích đáp án'
  }
]`}
                </pre>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Template Đúng/Sai</span>
                </h3>
                <pre className="bg-white p-4 rounded-lg text-xs overflow-x-auto border">
{`trueFalseQuiz: [
  {
    id: '1',
    question: 'Đánh giá tính đúng/sai:',
    statements: [
      { text: 'Khẳng định 1', isTrue: true },
      { text: 'Khẳng định 2', isTrue: false }
    ],
    explanation: 'Giải thích'
  }
]`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, ThumbsUp, ThumbsDown, Star, Search, Filter, Clock, User, CheckCircle } from 'lucide-react';
import { collection, addDoc, getDocs, updateDoc, doc, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase/config';

interface Question {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  content: string;
  chapter: string;
  lesson: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  answers: Answer[];
  isSolved: boolean;
  bestAnswerId?: string;
}

interface Answer {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  isBestAnswer: boolean;
  isTeacherAnswer: boolean;
}

interface QASectionProps {
  chapter?: string;
  lesson?: string;
  onMathJaxRender: () => void;
}

const QASection: React.FC<QASectionProps> = ({ chapter, lesson, onMathJaxRender }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showAskForm, setShowAskForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'solved' | 'unsolved' | 'popular'>('all');
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    difficulty: 'medium' as 'easy' | 'medium' | 'hard'
  });

  useEffect(() => {
    onMathJaxRender();
  }, [selectedQuestion, questions, onMathJaxRender]);

  // Mock data - trong thực tế sẽ load từ Firebase
  useEffect(() => {
    loadQuestionsFromFirebase();
  }, []);

  // Load questions from Firebase
  const loadQuestionsFromFirebase = async () => {
    try {
      const q = query(
        collection(db, 'questions'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const loadedQuestions: Question[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        loadedQuestions.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          answers: data.answers?.map((answer: any) => ({
            ...answer,
            createdAt: answer.createdAt?.toDate() || new Date()
          })) || []
        } as Question);
      });
      
      setQuestions(loadedQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
      // Fallback to mock data if Firebase fails
      loadMockData();
    }
  };

  // Mock data fallback
  const loadMockData = () => {
    const mockQuestions: Question[] = [
      {
        id: '1',
        userId: 'user1',
        userName: 'Nguyễn Văn A',
        title: 'Làm thế nào để rút gọn phân thức có chứa căn?',
        content: 'Em đang gặp khó khăn với bài tập rút gọn phân thức $\\frac{\\sqrt{x+1}}{x-1}$. Các bạn có thể hướng dẫn em được không?',
        chapter: 'Chương 1',
        lesson: 'Phân thức đại số',
        difficulty: 'medium',
        tags: ['phân thức', 'rút gọn', 'căn thức'],
        createdAt: new Date('2024-01-15'),
        upvotes: 15,
        downvotes: 2,
        isSolved: true,
        bestAnswerId: 'ans1',
        answers: [
          {
            id: 'ans1',
            userId: 'teacher1',
            userName: 'Cô Lan (Giáo viên)',
            content: 'Em cần nhớ điều kiện xác định trước: $x \\geq -1$ và $x \\neq 1$. Sau đó có thể nhân cả tử và mẫu với biểu thức liên hợp...',
            createdAt: new Date('2024-01-15'),
            upvotes: 12,
            downvotes: 0,
            isBestAnswer: true,
            isTeacherAnswer: true
          }
        ]
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Trần Thị B',
        title: 'Phương trình bậc nhất có thể có bao nhiêu nghiệm?',
        content: 'Em muốn hiểu rõ hơn về số nghiệm của phương trình bậc nhất. Có trường hợp nào đặc biệt không ạ?',
        chapter: 'Chương 2',
        lesson: 'Phương trình bậc nhất',
        difficulty: 'easy',
        tags: ['phương trình', 'nghiệm'],
        createdAt: new Date('2024-01-14'),
        upvotes: 8,
        downvotes: 0,
        isSolved: false,
        answers: []
      }
    ];
    setQuestions(mockQuestions);
  };

  const handleAskQuestion = async () => {
    // Logic để thêm câu hỏi mới
    const question: Question = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'Bạn',
      title: newQuestion.title,
      content: newQuestion.content,
      chapter: chapter || 'Chương 1',
      lesson: lesson || 'Bài học',
      difficulty: newQuestion.difficulty,
      tags: newQuestion.tags,
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      answers: [],
      isSolved: false
    };
    
    try {
      // Save to Firebase
      const docRef = await addDoc(collection(db, 'questions'), {
        ...question,
        createdAt: new Date(),
        answers: []
      });
      
      // Update local state with Firebase ID
      const questionWithId = { ...question, id: docRef.id };
      setQuestions(prev => [questionWithId, ...prev]);
      setNewQuestion({ title: '', content: '', tags: [], difficulty: 'medium' });
      setShowAskForm(false);
    } catch (error) {
      console.error('Error adding question:', error);
      // Fallback to local state only
      setQuestions(prev => [question, ...prev]);
      setNewQuestion({ title: '', content: '', tags: [], difficulty: 'medium' });
      setShowAskForm(false);
    }
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filterBy) {
      case 'solved': return matchesSearch && q.isSolved;
      case 'unsolved': return matchesSearch && !q.isSolved;
      case 'popular': return matchesSearch && q.upvotes > 5;
      default: return matchesSearch;
    }
  });

  if (selectedQuestion) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedQuestion(null)}
          className="mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          ← Quay lại danh sách
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Question Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {selectedQuestion.userName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedQuestion.userName}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedQuestion.createdAt.toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedQuestion.title}</h1>
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed">{selectedQuestion.content}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-6">
              {selectedQuestion.isSolved && (
                <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Đã giải quyết</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags and Info */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {selectedQuestion.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {selectedQuestion.chapter} - {selectedQuestion.lesson}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-green-600 hover:text-green-800">
                <ThumbsUp className="w-4 h-4" />
                <span>{selectedQuestion.upvotes}</span>
              </button>
              <button className="flex items-center space-x-1 text-red-600 hover:text-red-800">
                <ThumbsDown className="w-4 h-4" />
                <span>{selectedQuestion.downvotes}</span>
              </button>
            </div>
          </div>

          {/* Answers */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">
              Câu trả lời ({selectedQuestion.answers.length})
            </h3>
            
            {selectedQuestion.answers.map((answer) => (
              <div key={answer.id} className={`p-6 rounded-xl border-2 ${
                answer.isBestAnswer ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      answer.isTeacherAnswer ? 'bg-purple-500' : 'bg-gray-500'
                    }`}>
                      {answer.userName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">{answer.userName}</h4>
                        {answer.isTeacherAnswer && (
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                            Giáo viên
                          </span>
                        )}
                        {answer.isBestAnswer && (
                          <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            <Star className="w-3 h-3" />
                            <span>Câu trả lời hay nhất</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {answer.createdAt.toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 text-green-600 hover:text-green-800">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{answer.upvotes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-red-600 hover:text-red-800">
                      <ThumbsDown className="w-4 h-4" />
                      <span>{answer.downvotes}</span>
                    </button>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{answer.content}</p>
                </div>
              </div>
            ))}

            {/* Add Answer Form */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-4">Thêm câu trả lời của bạn</h4>
              <textarea
                className="w-full p-4 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={4}
                placeholder="Nhập câu trả lời của bạn..."
              />
              <div className="flex justify-end mt-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                  Gửi câu trả lời
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">Hỏi đáp</h2>
        </div>
        <button
          onClick={() => setShowAskForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Đặt câu hỏi</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm câu hỏi..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tất cả</option>
              <option value="solved">Đã giải quyết</option>
              <option value="unsolved">Chưa giải quyết</option>
              <option value="popular">Phổ biến</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ask Question Form */}
      {showAskForm && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Đặt câu hỏi mới</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề câu hỏi</label>
              <input
                type="text"
                value={newQuestion.title}
                onChange={(e) => setNewQuestion(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Nhập tiêu đề câu hỏi..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung chi tiết</label>
              <textarea
                value={newQuestion.content}
                onChange={(e) => setNewQuestion(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Mô tả chi tiết câu hỏi của bạn..."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleAskQuestion}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Đăng câu hỏi
              </button>
              <button
                onClick={() => setShowAskForm(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((question) => (
          <div
            key={question.id}
            onClick={() => setSelectedQuestion(question)}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {question.userName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{question.userName}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{question.createdAt.toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200">
                  {question.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{question.content}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    {question.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {question.chapter} - {question.lesson}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2 ml-6">
                {question.isSolved && (
                  <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    <CheckCircle className="w-3 h-3" />
                    <span>Đã giải quyết</span>
                  </div>
                )}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{question.upvotes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{question.answers.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Chưa có câu hỏi nào phù hợp với tìm kiếm của bạn.</p>
        </div>
      )}
    </div>
  );
};

export default QASection;
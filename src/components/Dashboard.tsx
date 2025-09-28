import React, { useState, useEffect } from 'react';
import { User, Trophy, BookOpen, MessageCircle, Calendar, TrendingUp, Award, Clock, Target, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { auth, db } from '../firebase/auth';

interface QuizResult {
  id: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: Date;
  chapter: string;
  lesson: string;
  quizType: string;
}

interface HomeworkSubmission {
  id: string;
  assignmentId: string;
  completedAt: Date;
  chapter: string;
  lesson: string;
}

interface Question {
  id: string;
  title: string;
  createdAt: Date;
  upvotes: number;
  isSolved: boolean;
  chapter: string;
  lesson: string;
}

const Dashboard: React.FC = () => {
  const [user] = useAuthState(auth);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [homeworkSubmissions, setHomeworkSubmissions] = useState<HomeworkSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'quiz' | 'homework'>('overview');

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load quiz results
      const quizQuery = query(
        collection(db, 'quizResults'),
        where('userId', '==', user.uid),
        orderBy('completedAt', 'desc')
      );
      const quizSnapshot = await getDocs(quizQuery);
      const quizData = quizSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        completedAt: doc.data().completedAt?.toDate() || new Date()
      })) as QuizResult[];
      setQuizResults(quizData);

      // Load homework submissions
      const homeworkQuery = query(
        collection(db, 'homeworkSubmissions'),
        where('userId', '==', user.uid),
        orderBy('completedAt', 'desc')
      );
      const homeworkSnapshot = await getDocs(homeworkQuery);
      const homeworkData = homeworkSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        completedAt: doc.data().completedAt?.toDate() || new Date()
      })) as HomeworkSubmission[];
      setHomeworkSubmissions(homeworkData);

    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cần đăng nhập</h2>
          <p className="text-gray-600 mb-6">Vui lòng đăng nhập để xem tiến trình học tập của bạn.</p>
          <button
            onClick={() => {
              window.history.pushState({}, '', '/');
              window.location.reload();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  const calculateStats = () => {
    const totalQuizzes = quizResults.length;
    const averageScore = totalQuizzes > 0 
      ? Math.round(quizResults.reduce((sum, result) => sum + result.percentage, 0) / totalQuizzes)
      : 0;
    const totalHomework = homeworkSubmissions.length;

    return {
      totalQuizzes,
      averageScore,
      totalHomework
    };
  };

  const stats = calculateStats();

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Trắc nghiệm</p>
              <p className="text-3xl font-bold">{stats.totalQuizzes}</p>
              <p className="text-blue-100 text-sm">Bài đã làm</p>
            </div>
            <Trophy className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Điểm trung bình</p>
              <p className="text-3xl font-bold">{stats.averageScore}%</p>
              <p className="text-green-100 text-sm">Trắc nghiệm</p>
            </div>
            <Target className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Bài tập</p>
              <p className="text-3xl font-bold">{stats.totalHomework}</p>
              <p className="text-purple-100 text-sm">Đã hoàn thành</p>
            </div>
            <BookOpen className="w-12 h-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Clock className="w-6 h-6 text-blue-500" />
          <span>Hoạt động gần đây</span>
        </h3>
        
        <div className="space-y-4">
          {/* Recent Quiz Results */}
          {quizResults.slice(0, 3).map((result) => (
            <div key={result.id} className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Trắc nghiệm: {result.chapter}</p>
                <p className="text-sm text-gray-600">{result.lesson}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-600">{result.percentage}%</p>
                <p className="text-xs text-gray-500">{result.completedAt.toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
          ))}

          {/* Recent Homework */}
          {homeworkSubmissions.slice(0, 2).map((homework) => (
            <div key={homework.id} className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Bài tập: {homework.chapter}</p>
                <p className="text-sm text-gray-600">Đã hoàn thành</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{homework.completedAt.toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQuizResults = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <BarChart3 className="w-6 h-6 text-blue-500" />
        <span>Kết quả trắc nghiệm</span>
      </h3>
      
      {quizResults.length === 0 ? (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Chưa có kết quả trắc nghiệm nào.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quizResults.map((result) => (
            <div key={result.id} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{result.chapter}</h4>
                  <p className="text-sm text-gray-600">{result.lesson}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    result.percentage >= 80 ? 'text-green-600' :
                    result.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {result.percentage}%
                  </div>
                  <p className="text-sm text-gray-500">{result.score}/{result.totalQuestions} đúng</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Loại: {result.quizType === 'mixed' ? 'Tổng hợp' : result.quizType}</span>
                <span>{result.completedAt.toLocaleDateString('vi-VN')} {result.completedAt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              
              {/* Progress bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      result.percentage >= 80 ? 'bg-green-500' :
                      result.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${result.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderHomework = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <BookOpen className="w-6 h-6 text-purple-500" />
        <span>Bài tập đã hoàn thành</span>
      </h3>
      
      {homeworkSubmissions.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Chưa hoàn thành bài tập nào.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {homeworkSubmissions.map((homework) => (
            <div key={homework.id} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{homework.chapter}</h4>
                    <p className="text-sm text-gray-600">Bài tập đã hoàn thành</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">Hoàn thành</p>
                  <p className="text-xs text-gray-500">
                    {homework.completedAt.toLocaleDateString('vi-VN')} {homework.completedAt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderQA = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <MessageCircle className="w-6 h-6 text-orange-500" />
        <span>Câu hỏi của bạn</span>
      </h3>
      
      {questions.length === 0 ? (
        <div className="text-center py-12">
          <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Chưa đặt câu hỏi nào.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <div key={question.id} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{question.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{question.chapter} - {question.lesson}</span>
                    <span>{question.createdAt.toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 text-blue-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">{question.upvotes}</span>
                  </div>
                  {question.isSolved ? (
                    <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      <CheckCircle className="w-3 h-3" />
                      <span>Đã giải quyết</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      <Clock className="w-3 h-3" />
                      <span>Chờ trả lời</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.displayName || 'User'} 
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Chào {user.displayName || user.email}!
              </h1>
              <p className="text-gray-600">Xem tiến trình học tập của bạn</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
          <div className="flex space-x-2">
            {[
              { id: 'overview', label: 'Tổng quan', icon: BarChart3 },
              { id: 'quiz', label: 'Trắc nghiệm', icon: Trophy },
              { id: 'homework', label: 'Bài tập', icon: BookOpen }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white shadow-lg'
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
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'quiz' && renderQuizResults()}
        {activeTab === 'homework' && renderHomework()}
      </div>
    </div>
  );
};

export default Dashboard;
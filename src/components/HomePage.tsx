import React from 'react';
import { BookOpen, Calculator, TrendingUp, Shapes, Box, BarChart3, Users, Clock, Target, MessageCircle } from 'lucide-react';
import { mathChapters } from '../data/mathChapters';
import { Chapter } from '../types/MathTopic';

interface HomePageProps {
  onTopicSelect?: (chapter: Chapter, topic: any) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onTopicSelect }) => {
  const handleLessonClick = (chapter: Chapter, lesson: any) => {
    if (onTopicSelect) {
      onTopicSelect(chapter, lesson);
    } else {
      // Fallback navigation
      window.location.href = `/${chapter.id}/${lesson.id}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Toán học lớp 8
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Khám phá thế giới toán học qua các bài học tương tác, flashcard thông minh và hệ thống thi online
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-lg font-semibold">{mathChapters.length} Chương học</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-lg font-semibold">Flashcard tương tác</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-lg font-semibold">Bài tập thực hành</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Math Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <div className="text-6xl font-bold transform rotate-12">∫</div>
        </div>
        <div className="absolute top-32 right-20 opacity-20">
          <div className="text-4xl font-bold transform -rotate-12">π</div>
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-20">
          <div className="text-5xl font-bold">∑</div>
        </div>
      </div>

      {/* Chapters Explorer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Khám phá các chương học
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mathChapters.map((chapter, index) => (
            <div key={chapter.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Chapter Header */}
              <div className={`p-6 bg-gradient-to-r ${getChapterGradient(index)}`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    {getChapterIcon(index)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{chapter.title}</h3>
                    <p className="text-white/80 text-sm">{chapter.description}</p>
                  </div>
                </div>
                <div className="text-white/90 text-sm">
                  {chapter.lessons.length} bài học
                </div>
              </div>

              {/* Lessons List */}
              <div className="p-6">
                {chapter.lessons.length > 0 ? (
                  <div className="space-y-3">
                    {chapter.lessons.slice(0, 4).map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonClick(chapter, lesson)}
                        className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 border border-gray-100 hover:border-blue-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">
                              {lesson.title}
                            </h4>
                            <p className="text-gray-500 text-xs mt-1">
                              {lesson.description}
                            </p>
                          </div>
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                            <span className="text-blue-600 text-xs">→</span>
                          </div>
                        </div>
                      </button>
                    ))}
                    {chapter.lessons.length > 4 && (
                      <div className="text-center pt-2">
                        <span className="text-gray-500 text-sm">
                          ... và {chapter.lessons.length - 4} bài khác
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Đang cập nhật nội dung</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Tính năng nổi bật
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lý thuyết chi tiết</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Các khái niệm được giải thích rõ ràng với công thức LaTeX và ví dụ minh họa sinh động
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Flashcard 3D</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Hệ thống flashcard lật 3D với hiệu ứng mượt mà giúp ghi nhớ hiệu quả
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bài tập đa dạng</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Trắc nghiệm, đúng-sai, trả lời ngắn và bài tập thực hành đa dạng
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hỏi đáp cộng đồng</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Hỏi đáp với cộng đồng học sinh và giáo viên, chia sẻ kiến thức
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Bắt đầu hành trình học toán ngay hôm nay!
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Chọn chương học hoặc vào thi để kiểm tra kiến thức của bạn
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="text-2xl font-bold text-white">{mathChapters.reduce((total, chapter) => total + chapter.lessons.length, 0)}+</div>
              <div className="text-blue-100 text-sm">Bài học</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="text-2xl font-bold text-white">200+</div>
              <div className="text-blue-100 text-sm">Flashcard</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="text-2xl font-bold text-white">150+</div>
              <div className="text-blue-100 text-sm">Bài tập</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-blue-100 text-sm">Hỗ trợ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for chapter styling
const getChapterGradient = (index: number) => {
  const gradients = [
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600', 
    'from-purple-500 to-purple-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600',
    'from-indigo-500 to-indigo-600',
    'from-pink-500 to-pink-600',
    'from-teal-500 to-teal-600'
  ];
  return gradients[index % gradients.length];
};

const getChapterIcon = (index: number) => {
  const icons = [
    <Calculator key="calc" className="w-6 h-6 text-white" />,
    <TrendingUp key="trend" className="w-6 h-6 text-white" />,
    <BarChart3 key="chart" className="w-6 h-6 text-white" />,
    <Shapes key="shapes" className="w-6 h-6 text-white" />,
    <Box key="box" className="w-6 h-6 text-white" />,
    <Target key="target" className="w-6 h-6 text-white" />,
    <Users key="users" className="w-6 h-6 text-white" />,
    <Clock key="clock" className="w-6 h-6 text-white" />
  ];
  return icons[index % icons.length];
};

export default HomePage;
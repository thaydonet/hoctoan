import React, { useState } from 'react';
import { BookOpen, ChevronRight, ChevronDown, Home, Trophy, BarChart3, Shield } from 'lucide-react';
import { Chapter, MathTopic } from '../types/MathTopic';
import { useAuth } from '../hooks/useAuth';

interface SidebarProps {
  chapters: Chapter[];
  selectedChapter: Chapter | null;
  selectedTopic: MathTopic | null;
  onTopicSelect: (chapter: Chapter, topic: MathTopic) => void;
  onHomeSelect: () => void;
  onDashboardSelect: () => void;
  onAdminSelect: () => void;
  onSuperAdminSelect: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chapters,
  selectedChapter,
  selectedTopic,
  onTopicSelect,
  onHomeSelect,
  onDashboardSelect,
  onAdminSelect,
  onSuperAdminSelect
}) => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user, isTeacher, isSuperAdmin } = useAuth();

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  // Đóng sidebar khi chọn topic/home trên mobile
  const handleTopicSelect = (chapter: Chapter, topic: MathTopic) => {
    onTopicSelect(chapter, topic);
    setIsOpen(false);
  };
  const handleHomeSelect = () => {
    onHomeSelect();
    setIsOpen(false);
  };
  
  const handleDashboardSelect = () => {
    onDashboardSelect();
    setIsOpen(false);
  };
  
  const handleAdminSelect = () => {
    onAdminSelect();
    setIsOpen(false);
  };

  const handleSuperAdminSelect = () => {
    onSuperAdminSelect();
    setIsOpen(false);
  };

  const getCurrentView = () => {
    const path = window.location.pathname;
    if (path === '/dashboard') return 'dashboard';
    if (path === '/admin') return 'admin';
    if (path === '/superadmin') return 'superadmin';
    if (path === '/' || path === '') return 'home';
    return 'lesson';
  };
  
  const currentView = getCurrentView();

  // Đóng sidebar khi click overlay
  const handleOverlayClick = () => setIsOpen(false);

  return (
    <>
      {/* Nút mở menu chỉ hiện trên mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-white rounded-full shadow p-2"
        onClick={() => setIsOpen(true)}
        aria-label="Mở menu"
      >
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay khi mở sidebar trên mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={handleOverlayClick}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 z-40
          h-screen w-80 bg-white shadow-xl overflow-y-auto border-r border-gray-200
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:block
        `}
        style={{ maxWidth: '100vw' }}
      >
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-xl font-bold text-white">Toán lớp 8</h1>
              <p className="text-blue-100 text-sm">Học tập hiệu quả</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          {/* Home Button */}
          <button
            onClick={handleHomeSelect}
            className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 text-left mb-2 ${
              !selectedChapter && !selectedTopic
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="font-semibold">Trang chủ</span>
          </button>

          {/* Dashboard Button - Only show if user is logged in */}
          {user && (
            <button
              onClick={handleDashboardSelect}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 text-left mb-2 ${
                currentView === 'dashboard'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <BarChart3 className="w-6 h-6" />
              <span className="font-semibold">Tiến trình học tập</span>
            </button>
          )}

          {/* Admin Button - Only show if user is teacher */}
          {user && isTeacher && (
            <button
              onClick={handleAdminSelect}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 text-left mb-2 ${
                currentView === 'admin'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <BookOpen className="w-6 h-6" />
              <span className="font-semibold">Quản lý Admin</span>
            </button>
          )}

          {/* Super Admin Button - Only show if user is super admin */}
          {user && isSuperAdmin && (
            <button
              onClick={handleSuperAdminSelect}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 text-left mb-2 ${
                currentView === 'superadmin'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Shield className="w-6 h-6" />
              <span className="font-semibold">Super Admin</span>
            </button>
          )}

          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Danh sách chương
          </h2>
          
          <ul className="space-y-2">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <div>
                  <button
                    onClick={() => toggleChapter(chapter.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 text-left ${
                      selectedChapter?.id === chapter.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-blue-600">{chapter.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{chapter.description}</p>
                    </div>
                    {expandedChapters.includes(chapter.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {expandedChapters.includes(chapter.id) && chapter.lessons.length > 0 && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {chapter.lessons.map((lesson) => (
                        <li key={lesson.id}>
                          <button
                            onClick={() => handleTopicSelect(chapter, lesson)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 text-left ${
                              selectedTopic?.id === lesson.id
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                : 'hover:bg-gray-50 text-gray-600'
                            }`}
                          >
                            <div className="flex-1">
                              <h4 className={`font-medium text-sm ${
                                selectedTopic?.id === lesson.id ? 'text-white' : 'text-blue-600'
                              }`}>
                                {lesson.title}
                              </h4>
                              <p className={`text-xs mt-1 ${
                                selectedTopic?.id === lesson.id ? 'text-blue-100' : 'text-gray-400'
                              }`}>
                                {lesson.description}
                              </p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
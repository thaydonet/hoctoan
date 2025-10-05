import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import SuperAdminPanel from './components/SuperAdminPanel';
import { mathChapters } from './data/mathChapters';
import { Chapter, MathTopic } from './types/MathTopic';

// Declare global MathJax types
declare global {
  interface Window {
    MathJax: {
      typesetPromise: () => Promise<void>;
      typeset: (elements?: HTMLElement[]) => void;
      startup: {
        promise: Promise<void>;
      };
    };
  }
}

function App() {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<MathTopic | null>(null);
  const [activeSection, setActiveSection] = useState<'theory' | 'flashcards' | 'examples' | 'quiz' | 'homework'>('theory');
  const [currentView, setCurrentView] = useState<'home' | 'lesson' | 'dashboard' | 'admin' | 'superadmin'>('home');

  // Function to re-render MathJax
  const renderMathJax = () => {
    if (window.MathJax) {
      // Use a timeout to ensure DOM is updated
      setTimeout(() => {
        if (window.MathJax.typesetPromise) {
          window.MathJax.typesetPromise().catch((err) => {
            console.warn('MathJax typeset error:', err);
          });
        } else if (window.MathJax.typeset) {
          try {
            window.MathJax.typeset();
          } catch (err) {
            console.warn('MathJax typeset error:', err);
          }
        }
      }, 100);
    }
  };

  // URL routing functions
  const updateURL = (chapterId?: string, topicId?: string, section?: string) => {
    let path = '/';
    if (chapterId && topicId) {
      path = `/${chapterId}/${topicId}`;
      if (section && section !== 'theory') {
        path += `/${section}`;
      }
    }
    window.history.pushState({}, '', path);
  };

  const parseURL = () => {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    if (segments[0] === 'dashboard') {
      setCurrentView('dashboard');
      setSelectedChapter(null);
      setSelectedTopic(null);
      setActiveSection('theory');
      return;
    }
    
    if (segments[0] === 'admin') {
      setCurrentView('admin');
      setSelectedChapter(null);
      setSelectedTopic(null);
      setActiveSection('theory');
      return;
    }

    if (segments[0] === 'superadmin') {
      setCurrentView('superadmin');
      setSelectedChapter(null);
      setSelectedTopic(null);
      setActiveSection('theory');
      return;
    }
    
    if (segments.length >= 2) {
      const [chapterId, topicId, section] = segments;
      
      // Find chapter and topic
      const chapter = mathChapters.find(c => c.id === chapterId);
      if (chapter) {
        const topic = chapter.lessons.find(l => l.id === topicId);
        if (topic) {
          setCurrentView('lesson');
          setSelectedChapter(chapter);
          setSelectedTopic(topic);
          setActiveSection((section as any) || 'theory');
          return;
        }
      }
    }
    
    // Default to home if no valid path
    setCurrentView('home');
    setSelectedChapter(null);
    setSelectedTopic(null);
    setActiveSection('theory');
  };

  // Handle browser back/forward
  useEffect(() => {
    parseURL();
    
    const handlePopState = () => {
      parseURL();
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Re-render MathJax when content changes
  useEffect(() => {
    if (window.MathJax && window.MathJax.startup) {
      window.MathJax.startup.promise.then(() => {
        renderMathJax();
      }).catch((err) => {
        console.warn('MathJax startup error:', err);
      });
    } else {
      // Fallback: try to render after a delay
      setTimeout(renderMathJax, 500);
    }
  }, [selectedTopic, activeSection, currentView]);

  const handleTopicSelect = (chapter: Chapter, topic: MathTopic) => {
    setCurrentView('lesson');
    setSelectedChapter(chapter);
    setSelectedTopic(topic);
    setActiveSection('theory');
    updateURL(chapter.id, topic.id, 'theory');
  };

  const handleDashboardSelect = () => {
    setCurrentView('dashboard');
    setSelectedChapter(null);
    setSelectedTopic(null);
    setActiveSection('theory');
    window.history.pushState({}, '', '/dashboard');
  };

  const handleAdminSelect = () => {
    setCurrentView('admin');
    setSelectedChapter(null);
    setSelectedTopic(null);
    setActiveSection('theory');
    window.history.pushState({}, '', '/admin');
  };

  const handleSuperAdminSelect = () => {
    setCurrentView('superadmin');
    setSelectedChapter(null);
    setSelectedTopic(null);
    setActiveSection('theory');
    window.history.pushState({}, '', '/superadmin');
  };

  const handleHomeSelect = () => {
    setCurrentView('home');
    setSelectedChapter(null);
    setSelectedTopic(null);
    setActiveSection('theory');
    window.history.pushState({}, '', '/');
  };


  const handleSectionChange = (section: 'theory' | 'flashcards' | 'examples' | 'quiz' | 'homework') => {
    setActiveSection(section);
    if (selectedChapter && selectedTopic) {
      updateURL(selectedChapter.id, selectedTopic.id, section);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'admin':
        return <AdminPanel onMathJaxRender={renderMathJax} />;
      case 'superadmin':
        return <SuperAdminPanel />;
      case 'lesson':
        return selectedTopic ? (
          <MainContent
            topic={selectedTopic}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            onMathJaxRender={renderMathJax}
          />
        ) : null;
      case 'home':
      default:
        return <HomePage onTopicSelect={handleTopicSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex">
        <Sidebar
          chapters={mathChapters}
          selectedChapter={selectedChapter}
          selectedTopic={selectedTopic}
          onTopicSelect={handleTopicSelect}
          onHomeSelect={handleHomeSelect}
          onDashboardSelect={handleDashboardSelect}
          onAdminSelect={handleAdminSelect}
          onSuperAdminSelect={handleSuperAdminSelect}
        />
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
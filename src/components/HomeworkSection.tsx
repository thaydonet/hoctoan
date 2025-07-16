import React, { useState, useEffect } from 'react';
import { PenTool, ExternalLink, Save, CheckCircle } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/auth';
import { HomeworkAssignment } from '../types/MathTopic';

interface HomeworkSectionProps {
  assignments: HomeworkAssignment[];
  onMathJaxRender: () => void;
}

const HomeworkSection: React.FC<HomeworkSectionProps> = ({ assignments, onMathJaxRender }) => {
  const [user] = useAuthState(auth);
  const [completedAssignments, setCompletedAssignments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onMathJaxRender();
  }, [onMathJaxRender]);

  // Load completed assignments for logged-in user
  useEffect(() => {
    if (user) {
      loadCompletedAssignments();
    }
  }, [user]);

  const loadCompletedAssignments = async () => {
    if (!user) return;
    
    try {
      const q = query(
        collection(db, 'homeworkSubmissions'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const completed = querySnapshot.docs.map(doc => doc.data().assignmentId);
      setCompletedAssignments(completed);
    } catch (error) {
      console.error('Error loading completed assignments:', error);
    }
  };

  const markAsCompleted = async (assignmentId: string) => {
    if (!user) {
      alert('Vui lòng đăng nhập để lưu tiến độ!');
      return;
    }

    setIsLoading(true);
    try {
      await addDoc(collection(db, 'homeworkSubmissions'), {
        userId: user.uid,
        userName: user.displayName || user.email,
        assignmentId: assignmentId,
        completedAt: new Date(),
        submissionType: 'google_form'
      });
      
      setCompletedAssignments(prev => [...prev, assignmentId]);
      alert('Đã đánh dấu hoàn thành bài tập!');
    } catch (error) {
      console.error('Error marking assignment as completed:', error);
      alert('Có lỗi xảy ra khi lưu tiến độ!');
    } finally {
      setIsLoading(false);
    }
  };
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
          <div key={assignment.id} className={`rounded-2xl shadow-lg border overflow-hidden ${
            completedAssignments.includes(assignment.id)
              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
              : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
          }`}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-xl font-semibold ${
                      completedAssignments.includes(assignment.id) ? 'text-blue-800' : 'text-green-800'
                    }`}>
                      {assignment.title}
                    </h3>
                    {completedAssignments.includes(assignment.id) && (
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <p className={`mb-4 ${
                    completedAssignments.includes(assignment.id) ? 'text-blue-700' : 'text-green-700'
                  }`}>
                    {assignment.description}
                  </p>
                </div>
              </div>
              
              <div className={`bg-white rounded-xl p-4 mb-6 border ${
                completedAssignments.includes(assignment.id) ? 'border-blue-200' : 'border-green-200'
              }`}>
                <h4 className={`font-semibold mb-3 ${
                  completedAssignments.includes(assignment.id) ? 'text-blue-800' : 'text-green-800'
                }`}>
                  Danh sách bài tập ({assignment.problems.length} câu):
                </h4>
                <div className="space-y-3">
                  {assignment.problems.map((problem, index) => (
                    <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                      completedAssignments.includes(assignment.id) ? 'bg-blue-50' : 'bg-green-50'
                    }`}>
                      <div className={`w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                        completedAssignments.includes(assignment.id) ? 'bg-blue-500' : 'bg-green-500'
                      }`}>
                        {index + 1}
                      </div>
                      <p className={`leading-relaxed ${
                        completedAssignments.includes(assignment.id) ? 'text-blue-800' : 'text-green-800'
                      }`}>
                        {problem}
                      </p>
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
                <div className="flex items-center space-x-3">
                  <a
                    href="https://forms.gle/LkUFBKFk2Yr44Cx9A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Mở Google Form</span>
                  </a>
                  
                  {user && !completedAssignments.includes(assignment.id) && (
                    <button
                      onClick={() => markAsCompleted(assignment.id)}
                      disabled={isLoading}
                      className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                    >
                      <Save className="w-5 h-5" />
                      <span>{isLoading ? 'Đang lưu...' : 'Đánh dấu hoàn thành'}</span>
                    </button>
                  )}
                </div>
                
                {!user && (
                  <p className="text-sm text-blue-600 mt-3">
                    💡 Đăng nhập để lưu tiến độ hoàn thành bài tập và xem tiến trình học tập
                  </p>
                ✅ Kết quả đã được lưu vào tài khoản của bạn!
                <a href="/dashboard" className="text-green-600 underline hover:text-green-800 ml-1">
                  Xem tiến trình học tập →
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
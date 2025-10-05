import React, { useState } from 'react';
import { LogIn, LogOut, CircleUser as UserCircle, GraduationCap, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { signOut } from '../lib/auth';

const AuthButton: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg">
        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm text-gray-600">Đang tải...</span>
      </div>
    );
  }

  if (user && profile) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.full_name || 'User'}
              className="w-6 h-6 rounded-full"
            />
          ) : (
            profile.role === 'teacher' ? (
              <GraduationCap className="w-6 h-6 text-green-600" />
            ) : (
              <UserCircle className="w-6 h-6 text-green-600" />
            )
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-green-800">
              {profile.full_name || profile.email}
            </span>
            {profile.role === 'teacher' && (
              <span className="text-xs text-green-600">Giáo viên</span>
            )}
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Đăng xuất</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowAuthModal(true)}
        className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
      >
        <LogIn className="w-5 h-5" />
        <span className="font-medium">Đăng nhập</span>
      </button>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
};

const AuthModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isTeacher, setIsTeacher] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { signInWithEmail } = await import('../lib/auth');
        await signInWithEmail(email, password);
        onClose();
      } else {
        const { signUpWithEmail } = await import('../lib/auth');
        await signUpWithEmail(email, password, fullName, isTeacher ? 'teacher' : 'student');
        setError('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.');
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {isLogin ? 'Đăng nhập' : 'Đăng ký'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nguyễn Văn A"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isTeacher"
                  checked={isTeacher}
                  onChange={(e) => setIsTeacher(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isTeacher" className="text-sm text-gray-700">
                  Tôi là giáo viên
                </label>
              </div>
              <p className="text-xs text-gray-500">
                Lưu ý: Chỉ đăng ký là học sinh hoặc giáo viên. Super Admin được nâng cấp bởi quản trị viên.
              </p>
            </div>
          )}

          {error && (
            <div className={`p-3 rounded-lg text-sm ${
              error.includes('thành công') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            {isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthButton;

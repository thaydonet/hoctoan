import React, { useState, useEffect } from 'react';
import { Shield, Users, Trash2, UserCog, Search, ChevronDown, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getAllUsers, promoteUser, deleteUser } from '../lib/auth';
import { UserProfile } from '../lib/supabase';

const SuperAdminPanel: React.FC = () => {
  const { user, profile, isSuperAdmin } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'student' | 'teacher' | 'super_admin'>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (isSuperAdmin) {
      loadUsers();
    }
  }, [isSuperAdmin]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePromoteUser = async (userId: string, newRole: 'student' | 'teacher' | 'super_admin') => {
    if (!confirm(`Bạn có chắc muốn thay đổi vai trò người dùng này thành ${getRoleLabel(newRole)}?`)) {
      return;
    }

    setActionLoading(userId);
    try {
      await promoteUser(userId, newRole);
      await loadUsers();
      alert('Đã cập nhật vai trò thành công!');
    } catch (error: any) {
      console.error('Error promoting user:', error);
      alert('Lỗi: ' + (error.message || 'Không thể cập nhật vai trò'));
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (userId === user?.id) {
      alert('Bạn không thể xóa tài khoản của chính mình!');
      return;
    }

    if (!confirm('Bạn có chắc muốn xóa người dùng này? Hành động này không thể hoàn tác!')) {
      return;
    }

    setActionLoading(userId);
    try {
      await deleteUser(userId);
      await loadUsers();
      alert('Đã xóa người dùng thành công!');
    } catch (error: any) {
      console.error('Error deleting user:', error);
      alert('Lỗi: ' + (error.message || 'Không thể xóa người dùng'));
    } finally {
      setActionLoading(null);
    }
  };

  if (!user || !isSuperAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không có quyền truy cập</h2>
          <p className="text-gray-600 mb-6">Chỉ Super Admin mới có thể truy cập trang này.</p>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'teacher': return 'Giáo viên';
      case 'student': return 'Học sinh';
      default: return role;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'teacher': return 'bg-green-100 text-green-800';
      case 'student': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Super Admin Panel</h1>
              <p className="text-gray-600">Quản lý người dùng và quyền truy cập</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm theo tên hoặc email..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="relative">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as any)}
                className="appearance-none px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white cursor-pointer"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="student">Học sinh</option>
                <option value="teacher">Giáo viên</option>
                <option value="super_admin">Super Admin</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <Users className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-2xl font-bold">{users.filter(u => u.role === 'student').length}</p>
              <p className="text-blue-100">Học sinh</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <UserCog className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-2xl font-bold">{users.filter(u => u.role === 'teacher').length}</p>
              <p className="text-green-100">Giáo viên</p>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
              <Shield className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-2xl font-bold">{users.filter(u => u.role === 'super_admin').length}</p>
              <p className="text-red-100">Super Admin</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Người dùng
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Vai trò
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Danh tiếng
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="ml-3 text-gray-600">Đang tải...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      Không tìm thấy người dùng
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {u.full_name?.[0]?.toUpperCase() || u.email[0].toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">{u.full_name || 'Chưa có tên'}</p>
                            {u.id === user?.id && (
                              <span className="text-xs text-blue-600">(Bạn)</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(u.role)}`}>
                          {getRoleLabel(u.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{u.reputation}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(u.created_at).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="relative group">
                            <button
                              disabled={actionLoading === u.id}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                            >
                              <UserCog className="w-5 h-5" />
                            </button>
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10 hidden group-hover:block">
                              <button
                                onClick={() => handlePromoteUser(u.id, 'student')}
                                disabled={actionLoading === u.id || u.role === 'student'}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Đổi thành Học sinh
                              </button>
                              <button
                                onClick={() => handlePromoteUser(u.id, 'teacher')}
                                disabled={actionLoading === u.id || u.role === 'teacher'}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Đổi thành Giáo viên
                              </button>
                              <button
                                onClick={() => handlePromoteUser(u.id, 'super_admin')}
                                disabled={actionLoading === u.id || u.role === 'super_admin'}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Đổi thành Super Admin
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            disabled={actionLoading === u.id || u.id === user?.id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPanel;

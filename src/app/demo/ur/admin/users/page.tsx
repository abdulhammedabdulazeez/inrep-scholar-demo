import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

const users = [
  {
    id: '1',
    name: 'Marie Uwimana',
    email: 'marie.uwimana@ur.ac.rw',
    role: 'student',
    faculty: 'Engineering',
    department: 'Computer Science',
    status: 'active',
    joinDate: '2023-09-01',
    lastLogin: '2024-06-10',
    documentsCount: 3,
    downloadsCount: 245
  },
  {
    id: '2',
    name: 'Dr. Jean Mukiza',
    email: 'jean.mukiza@ur.ac.rw',
    role: 'faculty',
    faculty: 'Engineering',
    department: 'Computer Science',
    status: 'active',
    joinDate: '2020-01-15',
    lastLogin: '2024-06-11',
    documentsCount: 15,
    downloadsCount: 2891
  },
  {
    id: '3',
    name: 'Peter Nkurunziza',
    email: 'peter.nkurunziza@ur.ac.rw',
    role: 'student',
    faculty: 'Engineering',
    department: 'Electrical Engineering',
    status: 'active',
    joinDate: '2023-09-01',
    lastLogin: '2024-06-09',
    documentsCount: 2,
    downloadsCount: 78
  },
  {
    id: '4',
    name: 'Dr. Sarah Kagame',
    email: 'sarah.kagame@ur.ac.rw',
    role: 'admin',
    faculty: 'Engineering',
    department: 'Computer Science',
    status: 'active',
    joinDate: '2019-03-10',
    lastLogin: '2024-06-11',
    documentsCount: 8,
    downloadsCount: 1234
  },
  {
    id: '5',
    name: 'Grace Munyangendo',
    email: 'grace.munyangendo@ur.ac.rw',
    role: 'student',
    faculty: 'Science',
    department: 'Environmental Science',
    status: 'active',
    joinDate: '2022-09-01',
    lastLogin: '2024-06-08',
    documentsCount: 4,
    downloadsCount: 456
  },
  {
    id: '6',
    name: 'Alice Uwimana',
    email: 'alice.uwimana@ur.ac.rw',
    role: 'student',
    faculty: 'Business',
    department: 'Tourism Management',
    status: 'inactive',
    joinDate: '2023-01-15',
    lastLogin: '2024-05-20',
    documentsCount: 1,
    downloadsCount: 23
  }
];

export default function UserManagementPage() {
  const getRoleBadge = (role: string) => {
    const roleConfig = {
      'admin': { color: 'bg-purple-100 text-purple-800', label: 'Administrator' },
      'faculty': { color: 'bg-blue-100 text-blue-800', label: 'Faculty' },
      'student': { color: 'bg-green-100 text-green-800', label: 'Student' },
      'staff': { color: 'bg-yellow-100 text-yellow-800', label: 'Staff' }
    };

    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.student;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { color: 'bg-green-100 text-green-800', label: 'Active' },
      'inactive': { color: 'bg-gray-100 text-gray-800', label: 'Inactive' },
      'suspended': { color: 'bg-red-100 text-red-800', label: 'Suspended' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
              + Add User
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              📤 Export Users
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
              <div className="text-2xl">👥</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Faculty Members</p>
                <p className="text-2xl font-bold text-blue-600">
                  {users.filter(u => u.role === 'faculty').length}
                </p>
              </div>
              <div className="text-2xl">🎓</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Students</p>
                <p className="text-2xl font-bold text-purple-600">
                  {users.filter(u => u.role === 'student').length}
                </p>
              </div>
              <div className="text-2xl">📚</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters & Search</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Name or email..."
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Roles</option>
                <option>Administrator</option>
                <option>Faculty</option>
                <option>Student</option>
                <option>Staff</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
              <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Faculties</option>
                <option>Engineering</option>
                <option>Science</option>
                <option>Medicine</option>
                <option>Business</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Suspended</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role & Faculty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm mr-4">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">Joined: {user.joinDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {getRoleBadge(user.role)}
                        <div className="text-sm text-gray-500">{user.faculty}</div>
                        <div className="text-xs text-gray-400">{user.department}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {getStatusBadge(user.status)}
                        <div className="text-xs text-gray-500">
                          Last login: {user.lastLogin}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm space-y-1">
                        <div>📄 {user.documentsCount} documents</div>
                        <div>📥 {user.downloadsCount} downloads</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Edit
                        </button>
                        <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                          View Profile
                        </button>
                        {user.status === 'active' ? (
                          <button className="text-yellow-600 hover:text-yellow-800 text-sm font-medium">
                            Suspend
                          </button>
                        ) : (
                          <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                            Activate
                          </button>
                        )}
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="bg-white rounded-lg shadow border p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Select users above to perform bulk actions
            </div>
            <div className="flex space-x-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm">
                Bulk Activate
              </button>
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition text-sm">
                Bulk Suspend
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm">
                Change Role
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition text-sm">
                Send Message
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition text-sm">
                Bulk Delete
              </button>
            </div>
          </div>
        </div>

        {/* Recent User Activity */}
        <div className="bg-white rounded-lg shadow border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent User Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">New user registered</p>
                <p className="text-xs text-gray-500">Alice Uwimana joined Business Faculty • 2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">Role updated</p>
                <p className="text-xs text-gray-500">Dr. Jean Mukiza promoted to Senior Faculty • 1 day ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">Bulk action performed</p>
                <p className="text-xs text-gray-500">5 users activated by admin • 2 days ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">Account suspended</p>
                <p className="text-xs text-gray-500">User account suspended for policy violation • 3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

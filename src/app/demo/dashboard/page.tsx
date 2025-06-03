import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">University of Rwanda Repository Overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-3xl font-bold text-gray-900">1,247</p>
              </div>
              <div className="text-2xl">📄</div>
            </div>
            <p className="text-sm text-green-600 mt-2">+12% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">156</p>
              </div>
              <div className="text-2xl">👥</div>
            </div>
            <p className="text-sm text-green-600 mt-2">+8 new this week</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                <p className="text-3xl font-bold text-gray-900">23</p>
              </div>
              <div className="text-2xl">⏳</div>
            </div>
            <p className="text-sm text-red-600 mt-2">5 overdue</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month Downloads</p>
                <p className="text-3xl font-bold text-gray-900">2,891</p>
              </div>
              <div className="text-2xl">📈</div>
            </div>
            <p className="text-sm text-green-600 mt-2">+15% increase</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/demo/upload" className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition">
                <span className="text-xl mr-3">⬆️</span>
                <div>
                  <p className="font-medium">Upload Document</p>
                  <p className="text-sm text-gray-600">Add new repository content</p>
                </div>
              </Link>

              <Link href="/demo/admin/users" className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition">
                <span className="text-xl mr-3">👥</span>
                <div>
                  <p className="font-medium">Manage Users</p>
                  <p className="text-sm text-gray-600">Add or edit user accounts</p>
                </div>
              </Link>

              <Link href="/demo/reviews" className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition">
                <span className="text-xl mr-3">📝</span>
                <div>
                  <p className="font-medium">Review Queue</p>
                  <p className="text-sm text-gray-600">Assign and manage reviews</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New thesis uploaded</p>
                  <p className="text-xs text-gray-500">by Marie Uwimana • 2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Review completed</p>
                  <p className="text-xs text-gray-500">by Dr. Jean Mukiza • 4 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">DOI assigned</p>
                  <p className="text-xs text-gray-500">to "AI in Agriculture" • 6 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-gray-500">Peter Nkurunziza • 1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

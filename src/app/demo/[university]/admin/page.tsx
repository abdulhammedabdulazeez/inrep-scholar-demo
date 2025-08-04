"use client";

import AdminStatGrid, {
  AdminStatGridProps,
} from "@/components/dashboard/AdminStatGrid";
import { useGeneralStore } from "@/store/generalStore";
import { useTenantInfoStore } from "@/store/tenantStore";
import Link from "next/link";
import {
  FileText,
  Users,
  Clock,
  TrendingUp,
  Upload,
  UserPlus,
  ClipboardList,
  CheckCircle,
  AlertCircle,
  Star,
  User,
  Activity,
  BookOpen,
  Eye,
  Lock,
} from "lucide-react";

export default function TenantAdminDashboard() {
  const tenantInfo = useTenantInfoStore((s) => s.info);
  const affiliatedUni = useGeneralStore((state) => state.affiliatedUni);

  const statsList: AdminStatGridProps[] = [
    {
      title: "Total Documents",
      value: tenantInfo?.statistics?.totalDocuments || 1247,
      // value: 1247,
      icon: "📄",
      change: "+12% from last month",
    },
    {
      title: "Active Users",
      value: 156,
      icon: "👥",
      change: "+8 new this week",
    },
    {
      title: "Pending Reviews",
      value: 23,
      icon: "⏳",
      change: "5 overdue",
    },
    {
      title: "This Month Downloads",
      value: 2891,
      icon: "📈",
      change: "+15% increase",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">
          {affiliatedUni?.universityName} Repository Management
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Documents
              </p>
              <p className="text-3xl font-bold text-gray-900">1,247</p>
            </div>
            <div className="text-blue-600">
              <FileText className="h-8 w-8" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">156</p>
            </div>
            <div className="text-green-600">
              <Users className="h-8 w-8" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">+8 new this week</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Reviews
              </p>
              <p className="text-3xl font-bold text-gray-900">23</p>
            </div>
            <div className="text-orange-600">
              <Clock className="h-8 w-8" />
            </div>
          </div>
          <p className="text-sm text-red-600 mt-2">5 overdue</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                This Month Downloads
              </p>
              <p className="text-3xl font-bold text-gray-900">2,891</p>
            </div>
            <div className="text-purple-600">
              <TrendingUp className="h-8 w-8" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">+15% increase</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              href="/demo/alu/user/upload"
              className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition"
            >
              <div className="text-blue-600 mr-3">
                <Upload className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Upload Document</p>
                <p className="text-sm text-gray-600">
                  Add new repository content
                </p>
              </div>
            </Link>

            <Link
              href="/demo/alu/admin/users"
              className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition"
            >
              <div className="text-green-600 mr-3">
                <UserPlus className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Manage Users</p>
                <p className="text-sm text-gray-600">
                  Add or edit user accounts
                </p>
              </div>
            </Link>

            <Link
              href="/demo/alu/admin/reviews"
              className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition"
            >
              <div className="text-orange-600 mr-3">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Review Queue</p>
                <p className="text-sm text-gray-600">
                  Assign and manage reviews
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">New thesis uploaded</p>
                <p className="text-xs text-gray-500">
                  by Marie Uwimana • 2 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">Review completed</p>
                <p className="text-xs text-gray-500">
                  by Dr. Jean Mukiza • 4 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">DOI assigned</p>
                <p className="text-xs text-gray-500">
                  to "AI in Agriculture" • 6 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">New user registered</p>
                <p className="text-xs text-gray-500">
                  Peter Nkurunziza • 1 day ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Repository Metrics */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Repository Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
              <div className="text-2xl font-bold text-blue-600">847</div>
            </div>
            <div className="text-sm text-gray-600">Published Documents</div>
            <div className="text-xs text-green-600 mt-1">+5.2% this month</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-yellow-600 mr-2" />
              <div className="text-2xl font-bold text-yellow-600">23</div>
            </div>
            <div className="text-sm text-gray-600">Under Review</div>
            <div className="text-xs text-orange-600 mt-1">5 overdue</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Eye className="h-6 w-6 text-green-600 mr-2" />
              <div className="text-2xl font-bold text-green-600">377</div>
            </div>
            <div className="text-sm text-gray-600">Open Access</div>
            <div className="text-xs text-green-600 mt-1">30.2% of total</div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useTenantInfoStore } from "@/store/tenantStore";
import { Users, UserCheck } from "lucide-react";

const UserSummary = () => {
  const tenantInfo = useTenantInfoStore((s) => s.info);
  let totalUsers = tenantInfo?.statistics?.totalUsers ?? 1200;
  let activeUsers = tenantInfo?.statistics?.activeUsers ?? 534;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
          </div>
          <Users className="h-8 w-8 text-gray-400" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Users</p>
            <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
          </div>
          <UserCheck className="h-8 w-8 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default UserSummary;

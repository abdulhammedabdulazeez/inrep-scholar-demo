import React from 'react';


export type AdminStatGridProps = {
    title: string;
    value: number;
    icon: string;
    change?: string;
}

const AdminStatGrid: React.FC<AdminStatGridProps> = (stats: AdminStatGridProps) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{stats.title}</p>
            <p className="text-3xl font-bold text-gray-900">1,247</p>
          </div>
          <div className="text-2xl">{stats.icon}</div>
        </div>
        {stats.change && <p className="text-sm text-green-600 mt-2">{stats.change}</p>}
      </div>
    );
};

export default AdminStatGrid;
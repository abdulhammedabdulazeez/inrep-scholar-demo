"use client";
import { useFormContext } from "react-hook-form";

const NotificationsSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const notifErrors = errors?.notifications as any;

  return (
    <div className="bg-white rounded-lg shadow border p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Email Notifications
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">New Submission Alerts</p>
            <p className="text-sm text-gray-600">
              Notify admins when new documents are submitted
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              {...register("notifications.new_submission_alert")}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Weekly Reports</p>
            <p className="text-sm text-gray-600">
              Send weekly activity reports to administrators
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              {...register("notifications.weekly_reports")}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
          </label>
        </div>
      </div>
      {/* Registration Info Section and Social Links Section removed from here; now their own sections */}
    </div>
  );
};

export default NotificationsSection;

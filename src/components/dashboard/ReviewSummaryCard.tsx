import React from "react";

interface ReviewSummaryCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  colorClass?: string; // e.g. text-green-600
  subtext?: string;
}

const ReviewSummaryCard: React.FC<ReviewSummaryCardProps> = ({
  title,
  value,
  icon,
  colorClass = "text-gray-900",
  subtext,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
      {subtext && <p className="text-xs mt-2 text-gray-500">{subtext}</p>}
    </div>
  );
};

export default ReviewSummaryCard;

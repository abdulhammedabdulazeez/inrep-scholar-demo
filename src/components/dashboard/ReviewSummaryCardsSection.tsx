import React from "react";
import ReviewSummaryCard from "./ReviewSummaryCard";
import { useTenantInfoStore } from "@/store/tenantStore";
import { Clock, Users, AlertTriangle, Timer, CheckCircle } from "lucide-react";

interface ReviewSummaryCardsSectionProps {
  pendingDocuments: { id: string }[];
  availableReviewers: {
    id: string;
    currentReviews: number;
    maxReviews: number;
  }[];
}

const ReviewSummaryCardsSection: React.FC = () => {
  const tenantInfo = useTenantInfoStore((s) => s.info);

  // Example: Overdue reviews and avg review time could come from tenantInfo.statistics
  const overdueReviews = tenantInfo?.statistics?.overdueReviews ?? 3;
  const completedReviews = tenantInfo?.statistics?.completedReviews ?? 10;
  const availableReviewers = tenantInfo?.statistics?.reviewers ?? 5;
  const pendingReviews = tenantInfo?.statistics?.pendingReviews ?? 10;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <ReviewSummaryCard
        title="Pending Reviews"
        value={pendingReviews}
        icon={<Clock className="text-orange-600" />}
        colorClass="text-orange-600"
      />
      <ReviewSummaryCard
        title="Available Reviewers"
        value={availableReviewers}
        icon={<Users className="text-green-600" />}
        colorClass="text-green-600"
      />
      <ReviewSummaryCard
        title="Overdue Reviews"
        value={overdueReviews}
        icon={<AlertTriangle className="text-red-600" />}
        colorClass="text-red-600"
      />
      <ReviewSummaryCard
        title="Completed Reviews"
        value={completedReviews}
        icon={<CheckCircle className="text-green-600" />}
        colorClass="text-green-600"
      />
    </div>
  );
};

export default ReviewSummaryCardsSection;

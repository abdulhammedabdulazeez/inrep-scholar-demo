import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PendingReview } from "./PendingReviewColumns";
import { User, Calendar, CheckCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchReviewers,
  assignReviewer,
  Reviewer,
} from "@/lib/api/reviewCalls";
import { useUserStore } from "@/store/userStore";

interface PendingReviewAssignDialogProps {
  review: PendingReview;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PendingReviewAssignDialog: React.FC<PendingReviewAssignDialogProps> = ({
  review,
  open,
  onOpenChange,
}) => {
  const tenantId = useUserStore((s) => s.tenantId) || "";
  const queryClient = useQueryClient();
  const [selectedReviewerId, setSelectedReviewerId] = useState<string>("");
  const [deadline, setDeadline] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch reviewers
  const {
    data: reviewers = [],
    isLoading: loadingReviewers,
    isError: errorLoadingReviewers,
  } = useQuery({
    queryKey: ["reviewers", tenantId],
    queryFn: () => fetchReviewers(tenantId),
    enabled: open && !!tenantId,
  });

  // Check if we're using dummy data (reviewers with dummy- prefix)
  const isUsingDummyData = reviewers.some((r) => r.userId.startsWith("dummy-"));

  // Assignment mutation
  const assignMutation = useMutation({
    mutationFn: (assignment: { reviewerId: string; deadline: string }) =>
      assignReviewer({
        documentId: review.documentId,
        reviewerId: assignment.reviewerId,
        deadline: assignment.deadline,
      }),
    onSuccess: () => {
      // Invalidate and refetch pending reviews
      queryClient.invalidateQueries({ queryKey: ["pendingReviews", tenantId] });
      // Reset form
      setSelectedReviewerId("");
      setDeadline("");
      setSubmitting(false);
      onOpenChange(false);
    },
    onError: (error) => {
      console.error("Failed to assign reviewer:", error);
      setSubmitting(false);
      // You could show a toast notification here
    },
  });

  const handleAssign = async () => {
    if (!selectedReviewerId || !deadline) return;

    setSubmitting(true);
    assignMutation.mutate({
      reviewerId: selectedReviewerId,
      deadline,
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      setSelectedReviewerId("");
      setDeadline("");
      setSubmitting(false);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-white max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign Reviewer</DialogTitle>
          <DialogDescription>
            Select a reviewer and set a deadline for this document.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {isUsingDummyData && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="text-sm text-yellow-800">
                <strong>Demo Mode:</strong> Showing sample reviewers for
                demonstration purposes. In production, this will show real
                reviewers from your tenant.
              </div>
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-900 mb-2">
              Available Reviewers
            </div>
            {loadingReviewers ? (
              <div className="text-sm text-gray-500">Loading reviewers...</div>
            ) : errorLoadingReviewers ? (
              <div className="text-sm text-red-500">
                Failed to load reviewers
              </div>
            ) : reviewers.length === 0 ? (
              <div className="text-sm text-gray-500">
                No reviewers available
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {reviewers.map((reviewer) => (
                  <label
                    key={reviewer.userId}
                    className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition ${
                      selectedReviewerId === reviewer.userId
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="reviewer"
                      value={reviewer.userId}
                      checked={selectedReviewerId === reviewer.userId}
                      onChange={(e) => setSelectedReviewerId(e.target.value)}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {reviewer.fullName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {reviewer.email}
                        {reviewer.department && ` • ${reviewer.department}`}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={
                new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]
              }
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              style={{ position: "relative", zIndex: 1 }}
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended: 2-3 weeks from today
            </p>
          </div>
          {selectedReviewerId && deadline && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-2">
                Assignment Summary
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  {
                    reviewers.find((r) => r.userId === selectedReviewerId)
                      ?.fullName
                  }
                </div>
                <div className="text-xs text-gray-600">
                  Deadline: {new Date(deadline).toLocaleDateString()}
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Email notification will be sent to the selected reviewer with
                document access and deadline.
              </p>
            </div>
          )}
        </div>
        <DialogFooter className="sticky bottom-0 bg-white pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline" disabled={submitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleAssign}
            disabled={
              submitting ||
              !selectedReviewerId ||
              !deadline ||
              loadingReviewers ||
              errorLoadingReviewers
            }
          >
            {submitting ? "Assigning..." : "Assign Reviewer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PendingReviewAssignDialog;

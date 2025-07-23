import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { PendingReview } from "./PendingReviewColumns";
import { Button } from "../ui/button";
import { User, FileText, Calendar, Mail, UserCheck } from "lucide-react";

interface PendingReviewViewDialogProps {
  review: PendingReview;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PendingReviewViewDialog: React.FC<PendingReviewViewDialogProps> = ({
  review,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-xl">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
          <DialogDescription>
            Detailed information about the document and assigned reviewers.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-600" />
            <div>
              <div className="font-semibold text-gray-900 text-base">
                {review.documentTitle}
              </div>
              <div className="text-xs text-gray-500">
                {review.departmentName}
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-700 bg-gray-50 rounded p-3 border max-h-32 overflow-y-auto">
            {review.documentAbstract || (
              <span className="italic text-gray-400">
                No abstract provided.
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4 text-blue-500" />
              <span>Author:</span>
              <span className="font-medium text-gray-900">
                {review.authorFullName}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-green-500" />
              <span>Submitted:</span>
              <span>{new Date(review.dateSubmitted).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText className="h-4 w-4 text-purple-500" />
              <span>Plagiarism:</span>
              <span>{review.plagiarismScore ?? "-"}%</span>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              Reviewers Assigned ({review.reviewersAssigned}/
              {review.reviewersNeeded})
            </div>
            {review.assignedReviewers.length > 0 ? (
              <div className="space-y-2">
                {review.assignedReviewers.map((reviewer, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-1 p-2 bg-gray-50 rounded"
                  >
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <User className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{reviewer.fullName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{reviewer.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-orange-600">
                No reviewers assigned yet.
              </div>
            )}
            {review.reviewersAssigned < review.reviewersNeeded && (
              <div className="text-sm text-orange-600 mt-2">
                Needs {review.reviewersNeeded - review.reviewersAssigned} more
                reviewer(s)
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PendingReviewViewDialog;

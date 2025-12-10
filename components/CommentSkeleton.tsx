import React from "react";

export default function CommentSkeleton() {
  return (
    <div className="shadow-lg rounded-2xl p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#212529] animate-pulse">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 space-y-2">
          {/* Name Skeleton */}
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          {/* Time Skeleton */}
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
        </div>
      </div>
      {/* Comment Text Skeleton */}
      <div className="space-y-2 mt-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      </div>
    </div>
  );
}

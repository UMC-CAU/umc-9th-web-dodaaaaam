export const CommentSkeleton = () => (
  <div className="flex items-start gap-3 p-4">
    <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
    <div className="flex-1 space-y-2">
      <div className="w-32 h-3 bg-gray-300 rounded-full animate-pulse" />
      <div className="w-full h-3 bg-gray-300 rounded-full animate-pulse" />
      <div className="w-2/3 h-3 bg-gray-300 rounded-full animate-pulse" />
    </div>
  </div>
);
export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="animate-pulse space-y-4 w-full max-w-xl mx-auto px-4">
        <div className="h-8 bg-surface rounded w-1/3 mx-auto"></div>
        <div className="space-y-3">
          <div className="h-4 bg-surface rounded"></div>
          <div className="h-4 bg-surface rounded w-5/6"></div>
          <div className="h-4 bg-surface rounded w-4/6"></div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-surface rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="space-y-6 p-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-6 w-40 bg-muted animate-pulse rounded-md" />
        <div className="h-4 w-64 bg-muted animate-pulse rounded-md" />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-lg border bg-card p-4 space-y-3"
          >
            <div className="h-4 w-24 bg-muted animate-pulse rounded-md" />
            <div className="h-6 w-16 bg-muted animate-pulse rounded-md" />
          </div>
        ))}
      </div>

      {/* Recent sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Providers */}
        <div className="space-y-3">
          <div className="h-5 w-32 bg-muted animate-pulse rounded-md" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-full bg-muted animate-pulse rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Recent Skills */}
        <div className="space-y-3">
          <div className="h-5 w-28 bg-muted animate-pulse rounded-md" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-full bg-muted animate-pulse rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
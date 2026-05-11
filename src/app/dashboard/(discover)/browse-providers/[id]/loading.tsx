import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12 space-y-8 sm:space-y-10 w-full">
      
      {/* Header */}
      <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full">
        {/* Avatar */}
        <Skeleton className="h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-full shrink-0" />

        {/* Text */}
        <div className="space-y-3 w-full max-w-md text-center sm:text-left">
          <Skeleton className="h-3 w-32 mx-auto sm:mx-0" />
          <Skeleton className="h-6 w-48 mx-auto sm:mx-0" />
          <Skeleton className="h-4 w-40 mx-auto sm:mx-0" />
          <Skeleton className="h-3 w-24 mx-auto sm:mx-0" />
        </div>
      </section>

      {/* About */}
      <section className="space-y-3 w-full">
        <Skeleton className="h-4 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-3 w-full">
        <Skeleton className="h-4 w-24" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-20 rounded-md" />
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-3 w-full">
        <Skeleton className="h-4 w-28" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border rounded-xl overflow-hidden">
              <Skeleton className="h-40 w-full" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-5 w-16 rounded" />
                  <Skeleton className="h-5 w-14 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="space-y-3 w-full">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full sm:w-1/2" />
      </section>

    </main>
  );
}
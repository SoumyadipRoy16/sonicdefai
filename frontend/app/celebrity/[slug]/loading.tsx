import { Skeleton } from "@/components/ui/skeleton"

export default function CelebrityLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-4 w-36 mt-1" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-36" />
              </div>
            </div>
            <Skeleton className="mt-4 h-4 w-full max-w-3xl" />
            <Skeleton className="mt-2 h-4 w-5/6 max-w-3xl" />
          </div>

          <div className="mb-6">
            <div className="flex gap-2">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-10 w-24" />
                ))}
            </div>
          </div>

          <div className="space-y-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="rounded-lg border bg-card">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div>
                          <div className="flex items-center gap-1">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </div>
                      <Skeleton className="h-8 w-8" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Array(3)
                        .fill(0)
                        .map((_, j) => (
                          <Skeleton key={j} className="h-6 w-16 rounded-full" />
                        ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex w-full items-center justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-8 w-48" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}


import { Skeleton } from "@/components/ui/skeleton"

export default function WishlistLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-[300px] rounded-md" />
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-[250px] flex-col border-r bg-muted/40 md:flex">
          <div className="flex h-14 items-center border-b px-4">
            <Skeleton className="h-6 w-24" />
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <div className="px-4 py-2">
              <Skeleton className="h-4 w-16 mb-4" />
              <div className="space-y-2">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
              </div>
            </div>
            <div className="px-4 py-2 mt-4">
              <Skeleton className="h-4 w-32 mb-4" />
              <div className="space-y-2">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-10 rounded-full" />
                    </div>
                  ))}
              </div>
            </div>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="mb-8 flex items-center justify-between">
              <Skeleton className="h-8 w-36" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-32" />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                      <div className="flex justify-between mb-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-12 rounded-full" />
                      </div>
                      <Skeleton className="h-4 w-32 mb-4" />
                      <div className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-2 w-full mb-4" />
                      <div className="flex justify-between">
                        <Skeleton className="h-9 w-28" />
                        <Skeleton className="h-9 w-28" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


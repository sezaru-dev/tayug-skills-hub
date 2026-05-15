"use client"

import { Button } from "@/components/ui/button"

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({
  error,
  reset,
}: ErrorPageProps) {
  console.error(error.message)
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Something went wrong
          </h1>

          <p className="text-muted-foreground text-sm">
            An unexpected error occurred while loading this page.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => reset()}>
            Try Again
          </Button>

          <Button
            variant="outline"
            onClick={() => window.location.href = "/"}
          >
            Go Home
          </Button>
        </div>

      </div>
    </main>
  )
}
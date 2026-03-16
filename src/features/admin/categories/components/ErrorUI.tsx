import React from 'react'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"

const ErrorUI = ({error}: {error: Error}) => {
  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertCircleIcon className="h-5 w-5" />
        <div>
          <AlertTitle className="text-lg font-semibold">Something went wrong</AlertTitle>
          <AlertDescription>
            {error.message || "Failed to load categories. Please try again."}
          </AlertDescription>
            <div className="mt-2">
              <Button onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
        </div>
      </Alert>
    </div>
  )
}

export default ErrorUI
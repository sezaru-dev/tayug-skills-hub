"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import DeleteAccountForm from "./components/DeleteAccountForm"

export function DeleteAccountSection() {

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Delete Account</h2>
      
      <Alert variant="destructive">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This action is permanent. Your account and all associated data will be permanently deleted.
        </AlertDescription>
      </Alert>

      <DeleteAccountForm/>
    </section>
  )
}
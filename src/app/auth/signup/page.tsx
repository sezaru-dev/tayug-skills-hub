import { SignupForm } from "@/components/sign-up-form";

export default function Page() {
  return (
    <div className="flex min-[calc(100svh-5rem)] w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}

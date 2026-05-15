import { SignupForm } from "@/components/sign-up-form";
import { SquareLibrary } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-gray-50">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <SquareLibrary className="size-4" />
            </div>
            Tayug Skills Hub
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>

      <div className="relative hidden lg:grid place-items-center overflow-hidden bg-[#070A0F]">

        {/* Cold overlay system */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#05070c] via-[#070a12]/80 to-[#05070c]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.10),transparent_55%)]" />

        {/* Grid tech overlay */}
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Subtle network nodes */}
        <div className="absolute top-[14%] left-[12%] h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)] animate-pulse" />
        <div className="absolute top-[38%] right-[14%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)] animate-pulse" />
        <div className="absolute bottom-[22%] left-[42%] h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(125,211,252,0.8)] animate-pulse" />

        {/* Content */}
        <div className="relative z-10 max-w-md text-center px-8">

          <p className="text-sky-400 text-xs tracking-[0.35em] uppercase mb-3">
            Tayug Skills Hub
          </p>

          <h1 className="text-white text-3xl font-semibold leading-tight">
            Turn your skills into real opportunities
          </h1>

          <p className="text-white/60 text-sm mt-4 leading-relaxed">
            Create your profile, showcase what you can do, and connect with people in your community
        who need your skills.
          </p>
          <div className="mt-6 flex justify-center gap-3 text-xs text-white/40 flex-wrap">
            <span>Build your profile</span>
            <span>•</span>
            <span>Show your work</span>
            <span>•</span>
            <span>Get discovered locally</span>
          </div>
        </div>
      </div>




    </div>
  )
}
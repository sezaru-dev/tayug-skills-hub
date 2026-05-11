/* import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
} */

import { LoginForm } from "@/components/login-form"
import { SquareLibrary } from "lucide-react"
import Link from "next/link"
export default function LoginPage() {
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
            <LoginForm />
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
        <div className="absolute top-24 left-28 h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)] animate-pulse" />
        <div className="absolute top-40 right-24 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)] animate-pulse" />
        <div className="absolute bottom-28 left-1/3 h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(125,211,252,0.8)] animate-pulse" />

        {/* Content */}
        <div className="relative z-10 max-w-md text-center px-8">

        <p className="text-sky-400 text-xs tracking-[0.35em] uppercase mb-3">
          Tayug Skills Hub
        </p>

        <h1 className="text-white text-3xl font-semibold leading-tight">
          Find people in your community who can help
        </h1>

        <p className="text-white/60 text-sm mt-4 leading-relaxed">
          Discover local skills from design and development to everyday services.
          Connect directly with people nearby and work things out together.
        </p>


        </div>
      </div>
    </div>
  )
}

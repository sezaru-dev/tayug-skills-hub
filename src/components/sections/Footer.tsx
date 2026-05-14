"use client";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/auth");

  // hide header on these routes
  if (isAdminRoute || isDashboardRoute || isAuthRoute) return null;
  return (
    <footer className="relative bg-[#070A0F] text-gray-300 overflow-hidden">

  {/* Background layer system */}
  <div className="absolute inset-0 pointer-events-none">

    {/* base gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#05070c] via-[#070A0F] to-[#05070c]" />

    {/* subtle brand glow (20% rule) */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08),transparent_60%)]" />

  </div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

    {/* Left */}
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-white">
        Tayug Skills Hub
      </h2>

      <p className="text-sm leading-relaxed text-gray-400">
        A personal project showcasing skilled professionals in Tayug.
        This platform is not affiliated with or endorsed by the LGU of Tayug.
      </p>

      <p className="text-xs text-gray-500">
        © {new Date().getFullYear()} Tayug Skills Hub. All rights reserved.
      </p>
    </div>

    {/* Middle */}
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-white">
        Legal
      </h3>

      <ul className="space-y-2 text-sm text-gray-400">
        <li>
          <a href="#"className="hover:text-white transition-colors">
            Terms of Service
          </a>
        </li>

        <li>
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
        </li>

        <li>
          <a href="#" className="hover:text-white transition-colors">
            Contact
          </a>
        </li>
      </ul>
    </div>

    {/* Right */}
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-white">
        Social
      </h3>

      <div className="flex justify-center md:justify-start gap-5 text-gray-400">
        <a className="hover:text-white transition-colors" href="#">
          <FaFacebookF size={18} />
        </a>

        <a className="hover:text-white transition-colors" href="#">
          <FaTwitter size={18} />
        </a>

        <a className="hover:text-white transition-colors" href="#">
          <FaLinkedinIn size={18} />
        </a>
      </div>
    </div>

  </div>

  {/* Bottom bar */}
  <div className="relative border-t border-gray-800 py-5 text-center">
    <p className="text-xs text-gray-500">
      Tayug Skills Hub is a personal project and is not affiliated with or endorsed by the LGU of Tayug.
    </p>
  </div>

</footer>
  );
}

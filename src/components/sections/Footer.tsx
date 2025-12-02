import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Left: Website & Disclaimer */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Tayug Skills Hub</h2>
          <p className="text-gray-400 text-sm">
            A personal project showcasing Tayug’s skilled professionals. 
            This website is not connected to or endorsed by the Local Government Unit (LGU) of Tayug.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            &copy; 2025 Tayug Skills Hub. All rights reserved.
          </p>
        </div>

        {/* Middle: Navigation / Legal */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Legal</h3>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li>
              <a href="/terms" className="hover:text-white">Terms of Service</a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white">Privacy Policy</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">Contact</a>
            </li>
          </ul>
        </div>

        {/* Right: Social Media */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" className="hover:text-blue-500">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" className="hover:text-blue-400">
              <FaTwitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-blue-600">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom small disclaimer */}
      <div className="bg-gray-800 text-gray-500 text-xs text-center py-2 mt-4">
        Disclaimer: Tayug Skills Hub is a personal project and is not affiliated with or endorsed by the LGU of Tayug.
      </div>
    </footer>
  );
}

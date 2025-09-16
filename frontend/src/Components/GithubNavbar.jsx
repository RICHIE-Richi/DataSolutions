import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function GithubNavbar() {
  const [open, setOpen] = useState(false); // mobile menu
  const [openMenu, setOpenMenu] = useState(null); // dropdowns

  const toggleDropdown = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">Data Solutions</a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 relative">
          {/* Product Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("product")}
              className="flex items-center gap-1 hover:text-gray-400"
            >
              Product <ChevronDown size={14} />
            </button>
            {openMenu === "product" && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-50">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Features</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Security</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Team</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Enterprise</a>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("solutions")}
              className="flex items-center gap-1 hover:text-gray-400"
            >
              Solutions <ChevronDown size={14} />
            </button>
            {openMenu === "solutions" && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-50">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">For Developers</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">For Teams</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">For Startups</a>
              </div>
            )}
          </div>

          {/* Other Links */}
          <a href="#" className="hover:text-gray-400">Pricing</a>
          <a href="#" className="hover:text-gray-400">Resource</a>
        </div>

        {/* Right - Auth */}
        <div className="hidden md:flex items-center gap-4">
          <a href="/login" className="hover:text-gray-400">Sign in</a>
          <a href="/signup" className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded">
            Sign up
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-3 space-y-2">
          {/* Product Mobile Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("product")}
              className="flex justify-between w-full px-2 py-1 hover:text-gray-400"
            >
              Product <ChevronDown size={14} />
            </button>
            {openMenu === "product" && (
              <div className="ml-4 space-y-1">
                <a href="#" className="block py-1">Features</a>
                <a href="#" className="block py-1">Security</a>
                <a href="#" className="block py-1">Team</a>
                <a href="#" className="block py-1">Enterprise</a>
              </div>
            )}
          </div>

          {/* Solutions Mobile Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("solutions")}
              className="flex justify-between w-full px-2 py-1 hover:text-gray-400"
            >
              Solutions <ChevronDown size={14} />
            </button>
            {openMenu === "solutions" && (
              <div className="ml-4 space-y-1">
                <a href="#" className="block py-1">For Developers</a>
                <a href="#" className="block py-1">For Teams</a>
                <a href="#" className="block py-1">For Startups</a>
              </div>
            )}
          </div>

          {/* Other Links */}
          <a href="#" className="block py-1 hover:text-gray-400">Pricing</a>
          <a href="#" className="block py-1 hover:text-gray-400">Resources</a>

          {/* Auth Buttons */}
          <a href="/login" className="block py-1 hover:text-gray-400">Sign in</a>
          <a href="/signup" className="block py-1 bg-green-600 rounded text-center">
            Sign up
          </a>
        </div>
      )}
    </nav>
  );
}

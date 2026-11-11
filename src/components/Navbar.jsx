import { Menu, Search, Bell, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Navbar({ setOpen, onLogout }) {
  const location = useLocation();

  const pageNames = {
    "/admin": "Dashboard",
    "/admin/students": "Students",
    "/admin/courses": "Courses",
    "/admin/batches": "Batches",
  };

  const title = pageNames[location.pathname] || "Admin";

  return (
    <header className="flex h-20 items-center justify-around border-b border-gray-200 bg-white px-5 md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="text-gray-600 lg:hidden"
        >
          <Menu size={23} />
        </button>

        <div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <p className="hidden text-xs text-gray-400 sm:block">
            Welcome back, manage your institute
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 md:flex">
          <Search size={17} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-32 bg-transparent text-sm outline-none"
          />
        </div>

        <button className="relative rounded-xl border border-gray-100 p-2.5 text-gray-500">
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
            Y
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">Yash Sharma</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
      >
        <LogOut size={17} />
        <span>Logout</span>
      </button>
    </header>
  );
}

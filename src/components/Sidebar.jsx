import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  Layers,
  GraduationCap,
  X,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Students",
    path: "/admin/students",
    icon: Users,
  },
  {
    name: "Courses",
    path: "/admin/courses",
    icon: BookOpen,
  },
  {
    name: "Batches",
    path: "/admin/batches",
    icon: Layers,
  },
];

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <GraduationCap size={24} />
            </div>

            <span className="text-xl font-bold text-gray-900">
              Student Manager
            </span>
          </div>

          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X size={22} />
          </button>
        </div>

        <div className="px-5 py-7">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Main Menu
          </p>

          <nav className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === "/admin"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  <Icon size={19} />
                  {link.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-5">
          <div className="rounded-2xl bg-blue-50 p-4">
            <GraduationCap className="mb-3 text-blue-600" size={28} />

            <h3 className="font-semibold text-gray-900">
              Manage your institute
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Keep your students and courses organized in one place.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

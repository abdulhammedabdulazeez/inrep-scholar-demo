import type React from "react";
import Link from "next/link";

const navLinks = [
  { href: "/demo/alu/admin", icon: "📊", label: "Dashboard" },
  { href: "/demo/alu/admin/documents", icon: "📄", label: "Documents" },
  { href: "/demo/alu/user/upload", icon: "⬆️", label: "Upload" },
  { href: "/demo/alu/admin/reviews", icon: "📝", label: "Reviews" },
  { href: "/demo/alu/admin/users", icon: "👥", label: "User Management" },
  {
    href: "/demo/alu/admin/settings",
    icon: "🏛️",
    label: "Repository Settings",
  },
  { href: "/demo/alu/admin/analytics", icon: "📈", label: "Analytics" },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              ALU
            </div>
            <div>
              <h2 className="font-bold text-gray-900">
                African Leadership University
              </h2>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors duration-200"
              >
                <span className="text-lg">{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="absolute bottom-0 w-64 p-6 border-t bg-white">
          <Link
            href="/demo/alu"
            className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors duration-200"
          >
            <span className="text-lg">🏠</span>
            <span className="font-medium">Repository Home</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Top bar */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                African Leadership University Repository
              </h1>
              <p className="text-sm text-gray-500">Administrative Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium">Dr. Sarah Kagame</span>{" "}
                (Administrator)
              </div>
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                SK
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

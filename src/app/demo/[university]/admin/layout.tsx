// src/app/demo/[university]/admin/layout.tsx
"use client";
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarProvider,
  useSidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { AffiliatedUni, useGeneralStore } from "@/store/generalStore";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import ScholarChat from "@/components/chat/ScholarChat";
// Lucide icons
import {
  LayoutDashboard,
  FileText,
  UploadCloud,
  FileCheck2,
  Users,
  Settings,
  BarChart2,
  Home,
  LogOut,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const uniName = useGeneralStore((state) => state.affiliatedUni);
  const pathname = usePathname();

  const navLinks = [
    {
      href: `/demo/${uniName?.subdomain}/admin`,
      icon: <LayoutDashboard size={20} className="text-blue-600" />, // Dashboard
      label: "Dashboard",
    },
    {
      href: `/demo/${uniName?.subdomain}/admin/documents`,
      icon: <FileText size={20} className="text-blue-600" />, // Documents
      label: "Documents",
    },
    {
      href: `/demo/${uniName?.subdomain}/user/upload`,
      icon: <UploadCloud size={20} className="text-blue-600" />, // Upload
      label: "Upload",
    },
    {
      href: `/demo/${uniName?.subdomain}/admin/reviews`,
      icon: <FileCheck2 size={20} className="text-blue-600" />, // Reviews
      label: "Reviews",
    },
    {
      href: `/demo/${uniName?.subdomain}/admin/users`,
      icon: <Users size={20} className="text-blue-600" />, // User Management
      label: "User Management",
    },
    {
      href: `/demo/${uniName?.subdomain}/admin/settings`,
      icon: <Settings size={20} className="text-blue-600" />, // Repository Settings
      label: "Repository Settings",
    },
    {
      href: `/demo/${uniName?.subdomain}/admin/analytics`,
      icon: <BarChart2 size={20} className="text-blue-600" />, // Analytics
      label: "Analytics",
    },
  ];

  function getActiveLink(
    navLinks: { href: string; icon: React.ReactNode; label: string }[],
    pathname: string
  ): { href: string; icon: React.ReactNode; label: string } | null {
    // Find the longest matching link
    return navLinks.reduce<{
      href: string;
      icon: React.ReactNode;
      label: string;
    } | null>((active, link) => {
      if (pathname === link.href || pathname.startsWith(link.href + "/")) {
        if (!active || link.href.length > active.href.length) {
          return link;
        }
      }
      return active;
    }, null);
  }

  const activeLink = getActiveLink(navLinks, pathname);

  return (
    <SidebarProvider className="flex min-h-screen w-full bg-white">
      <Sidebar collapsible="icon" className="bg-white border-r shadow-sm">
        <CustomSidebarContent />
      </Sidebar>
      <main className="flex-1 flex flex-col min-h-screen w-full">
        <Header uniName={uniName} />
        <div className="flex-1 w-full max-w-screen-2xl mx-auto p-6">
          {children}
        </div>
      </main>
      
      {/* Scholar AI Chat - Available on all admin pages */}
      <ScholarChat />
    </SidebarProvider>
  );

  function CustomSidebarContent() {
    const { state, isMobile } = useSidebar();
    return (
      <div className="h-full flex flex-col">
        {/* Logo and University Info */}
        <SidebarHeader>
          <div
            className={`flex items-center px-4 py-4 ${
              state === "collapsed" ? "justify-center" : "space-x-3 mb-8"
            }`}
          >
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              {uniName?.subdomain?.toUpperCase() || "UNI"}
            </div>
            {state !== "collapsed" && (
              <div>
                <h2 className="font-bold text-gray-900 text-base">
                  {uniName?.universityName || "University Admin"}
                </h2>
                <p className="text-xs text-gray-500">Admin Portal</p>
              </div>
            )}
          </div>
          <SidebarSeparator className="w-full p-0 m-0" />
        </SidebarHeader>
        {/* <SidebarSeparator /> */}
        <SidebarContent className="flex-1 overflow-y-auto px-2">
          <SidebarMenu className="space-y-2">
            {navLinks.map((link) => {
              const isActive = activeLink && activeLink.href === link.href;
              return (
                <SidebarMenuItem key={link.href}>
                  <Link href={link.href} className="w-full">
                    <SidebarMenuButton
                      className={`flex items-center w-full text-base rounded-lg transition-colors
                        ${
                          state === "collapsed"
                            ? "justify-center py-3"
                            : "gap-3 py-3 px-3"
                        }
                        ${
                          isActive
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "hover:bg-gray-100 text-gray-700"
                        }
                      `}
                    >
                      <span className="flex items-center justify-center">
                        {link.icon}
                      </span>
                      {state !== "collapsed" && (
                        <span className="font-medium">{link.label}</span>
                      )}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="px-4 py-4 border-t mt-auto">
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <Link href={`/demo/${uniName?.subdomain}`} className="w-full">
                <SidebarMenuButton
                  className={`flex items-center w-full text-red-600 hover:text-red-800 rounded-lg transition-colors
                    ${
                      state === "collapsed"
                        ? "justify-center py-3"
                        : "gap-3 py-3 px-3"
                    }
                  `}
                >
                  <span className="flex items-center justify-center">
                    <Home size={20} className="text-red-600" />
                  </span>
                  {state !== "collapsed" && (
                    <span className="font-medium">Repository Home</span>
                  )}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <button
                onClick={() => alert("Logged out!")}
                className={`flex items-center w-full text-gray-600 hover:text-red-600 rounded-lg transition-colors
                  ${
                    state === "collapsed"
                      ? "justify-center py-3"
                      : "gap-3 py-3 px-3"
                  }
                `}
              >
                <span className="flex items-center justify-center">
                  <LogOut
                    size={20}
                    className="text-gray-600 group-hover:text-red-600"
                  />
                </span>
                {state !== "collapsed" && (
                  <span className="font-medium">Logout</span>
                )}
              </button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
    );
  }

  function Header({ uniName }: { uniName: AffiliatedUni | null }) {
    const { state } = useSidebar();
    return (
      <header className="sticky top-0 z-5 bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {uniName?.universityName || "University"} Repository
            </h1>
            <p className="text-sm text-gray-500">Administrative Dashboard</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Welcome, <span className="font-medium">Admin</span>
          </div>
          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            AD
          </div>
        </div>
      </header>
    );
  }
}

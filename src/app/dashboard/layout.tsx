"use client";
import { Button } from "@/components/ui/button";
import React, { PropsWithChildren, useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  MapPin,
  User,
  LogOut,
  Menu,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/features/hooks";
import { logout } from "@/features/authSlice";
import { toast } from "react-toastify";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", pageUrl: "/dashboard" },
  { icon: ShoppingCart, label: "Orders", pageUrl: "/dashboard/order" },
  { icon: MapPin, label: "My Address", pageUrl: "/dashboard/address" },
  { icon: User, label: "Account Details", pageUrl: "/dashboard/account" },
  { icon: LogOut, label: "Logout" },
];

export default function DashoardLayout({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const router = useRouter();
  const dispatch = useAppDispatch();


  const handleNavition = (label: string, url?: string) => {
    if (url !== undefined) {
      setActiveItem(label);
      setSidebarOpen(false);
      router.push(url);
    } else {
      dispatch(logout());
      toast.success('Logout successfully');
      return router.replace('/');
    }
  };

  return (
    <div className="flex min-h-screen bg-background px-4">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
      
        <nav className="mt-6 px-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                variant={activeItem === item.label ? "default" : "ghost"}
                className={`w-full justify-start mb-1 ${
                  activeItem === item.label
                    ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                onClick={() => handleNavition(item.label, item.pageUrl)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>

      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-background px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Home</span>
            <span>›</span>
            <span>Pages</span>
            <span>›</span>
            <span className="text-foreground">{activeItem}</span>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-4 lg:p-6">{children}</div>
      </div>
    </div>
  );
}

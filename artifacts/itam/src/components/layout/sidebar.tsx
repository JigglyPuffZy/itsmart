import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { useSidebar } from "@/lib/sidebar-context";
import {
  LayoutDashboard,
  MonitorSmartphone,
  TicketCheck,
  Users,
  LogOut,
  FileBarChart2,
  CalendarDays,
  PanelLeftOpen,
  PanelLeftClose,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ROLE_LABELS: Record<string, string> = {
  administrator: "Administrator",
  support_staff: "Support Staff",
  general_user: "General User",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Sidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { collapsed, toggle } = useSidebar();
  const isAdmin = user?.role === "administrator";

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/assets", label: "Assets", icon: MonitorSmartphone },
    { href: "/tickets", label: "Tickets", icon: TicketCheck },
    { href: "/reports", label: "Reports", icon: FileBarChart2 },
    { href: "/calendar", label: "Calendar", icon: CalendarDays },
    ...(isAdmin ? [{ href: "/admin/users", label: "Users", icon: Users }] : []),
  ];

  const renderNavLink = (item: (typeof navItems)[0]) => {
    const isActive =
      location === item.href ||
      (location.startsWith(item.href) && item.href !== "/dashboard");
    const Icon = item.icon;

    const link = (
      <Link
        href={item.href}
        className={cn(
          "relative flex items-center gap-3 rounded-xl font-medium transition-all duration-200 group",
          collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5",
          isActive
            ? "bg-white/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            : "text-white/65 hover:text-white hover:bg-white/[0.06]"
        )}
      >
        {isActive && (
          <span
            aria-hidden
            className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[hsl(207_55%_72%)]"
          />
        )}
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
            isActive
              ? "bg-white/15 text-white"
              : "bg-transparent text-inherit group-hover:bg-white/[0.08]"
          )}
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.25 : 2} />
        </span>
        {!collapsed && (
          <>
            <span className="flex-1 text-[13px] tracking-tight">{item.label}</span>
            {isActive && <ChevronRight className="h-3.5 w-3.5 opacity-40 shrink-0" />}
          </>
        )}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip key={item.href} delayDuration={0}>
          <TooltipTrigger asChild>{link}</TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return <div key={item.href}>{link}</div>;
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-white/[0.06]",
        "bg-gradient-to-b from-[hsl(207_38%_30%)] via-[hsl(207_38%_33%)] to-[hsl(207_38%_28%)]",
        "text-sidebar-foreground shadow-[4px_0_24px_rgba(53,88,114,0.12)] transition-all duration-300",
        collapsed ? "w-[4.25rem]" : "w-64"
      )}
    >
      {/* Brand */}
      <div
        className={cn(
          "shrink-0 border-b border-white/[0.08] px-3 py-4",
          collapsed ? "flex justify-center" : "px-4"
        )}
      >
        <div className={cn("flex items-center min-w-0", collapsed && "justify-center")}>
          {!collapsed ? (
            <div className="min-w-0 leading-tight">
              <p className="font-display text-base font-bold tracking-tight text-white">ITSMART</p>
              <p className="text-[11px] text-white/50 truncate">IT Asset & Support</p>
            </div>
          ) : (
            <p className="font-display text-sm font-bold tracking-tight text-white">IT</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {!collapsed && (
          <p className="mb-2.5 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
            Navigation
          </p>
        )}
        <div className="flex flex-col gap-0.5">{navItems.map(renderNavLink)}</div>
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/[0.08] p-2 space-y-1">
        {collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href="/profile"
                className={cn(
                  "flex items-center justify-center rounded-xl p-2.5 transition-colors",
                  location === "/profile"
                    ? "bg-white/[0.12] text-white"
                    : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                )}
              >
                <Avatar className="h-8 w-8 ring-1 ring-white/20">
                  <AvatarFallback className="bg-white/15 text-white text-[10px] font-bold">
                    {user?.fullName ? getInitials(user.fullName) : "?"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="font-medium">{user?.fullName}</p>
              <p className="text-xs opacity-70">
                {ROLE_LABELS[user?.role ?? ""] ?? user?.role}
              </p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Link
            href="/profile"
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
              location === "/profile"
                ? "bg-white/[0.12] text-white"
                : "text-white/65 hover:bg-white/[0.06] hover:text-white"
            )}
          >
            <Avatar className="h-9 w-9 shrink-0 ring-1 ring-white/20">
              <AvatarFallback className="bg-white/15 text-white text-xs font-bold">
                {user?.fullName ? getInitials(user.fullName) : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{user?.fullName}</p>
              <p className="truncate text-[11px] text-white/45">
                {ROLE_LABELS[user?.role ?? ""] ?? user?.role}
              </p>
            </div>
          </Link>
        )}

        {collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center justify-center rounded-xl p-2.5 text-white/55 transition-colors hover:bg-red-500/15 hover:text-red-200"
              >
                <LogOut className="h-[18px] w-[18px]" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Sign out</TooltipContent>
          </Tooltip>
        ) : (
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[13px] font-medium text-white/55 transition-colors hover:bg-red-500/15 hover:text-red-200"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
              <LogOut className="h-[18px] w-[18px]" />
            </span>
            Sign out
          </button>
        )}

        <button
          type="button"
          onClick={toggle}
          className="flex w-full items-center justify-center rounded-lg py-1.5 text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/60"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
      </div>
    </aside>
  );
}

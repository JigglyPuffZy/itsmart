import type { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardPanelProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: { label: string; href: string };
  children: ReactNode;
  className?: string;
  headerExtra?: ReactNode;
  accent?: "default" | "warning";
}

export function DashboardPanel({
  title,
  description,
  icon,
  action,
  children,
  className,
  headerExtra,
  accent = "default",
}: DashboardPanelProps) {
  return (
    <article
      className={cn(
        "app-surface flex flex-col h-full overflow-hidden rounded-2xl",
        accent === "warning" ? "border-amber-200/40" : "",
        className
      )}
    >
      <header
        className={cn(
          "flex items-center justify-between gap-3 px-5 py-4 app-panel-header",
          accent === "warning" && "from-amber-500/[0.06]"
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          {icon && (
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1",
                accent === "warning"
                  ? "bg-amber-500/10 text-amber-600 ring-amber-200/50"
                  : "bg-primary/[0.08] text-primary ring-primary/10"
              )}
            >
              {icon}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-sm font-display font-semibold text-foreground tracking-tight">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {headerExtra}
          {action && (
            <Link
              href={action.href}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-primary bg-primary/[0.06] hover:bg-primary/[0.12] transition-colors group"
            >
              {action.label}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </header>
      {children}
    </article>
  );
}

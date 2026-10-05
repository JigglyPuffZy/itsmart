import type { ElementType } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ReportId =
  | "asset_inventory"
  | "asset_history"
  | "asset_unassigned"
  | "asset_depreciation"
  | "ticket_list"
  | "ticket_performance"
  | "ticket_satisfaction"
  | "user_activity";

export interface ReportDef {
  id: ReportId;
  label: string;
  icon: ElementType;
  group: "assets" | "tickets" | "admin";
  roles: ("administrator" | "support_staff" | "general_user")[];
  description: string;
}

const GROUP_LABELS: Record<ReportDef["group"], string> = {
  assets: "Assets",
  tickets: "Tickets",
  admin: "Administration",
};

interface ReportNavProps {
  groups: { key: ReportDef["group"]; label: string; reports: ReportDef[] }[];
  activeId: ReportId;
  onSelect: (id: ReportId) => void;
}

export function ReportNav({ groups, activeId, onSelect }: ReportNavProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
      <div className="border-b border-border/50 bg-muted/20 px-4 py-3.5">
        <p className="text-sm font-display font-semibold text-foreground">Report library</p>
        <p className="text-xs text-muted-foreground mt-0.5">Select a report to configure and export</p>
      </div>

      <div className="p-3 space-y-4">
        {groups.map((g) => (
          <div key={g.key}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground px-2 mb-2">
              {GROUP_LABELS[g.key]}
            </p>
            <div className="space-y-1.5">
              {g.reports.map((r) => {
                const Icon = r.icon;
                const isActive = activeId === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => onSelect(r.id)}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-200",
                      isActive
                        ? "border-primary/35 bg-primary/[0.07] shadow-[0_4px_16px_rgba(53,88,114,0.08)] ring-1 ring-primary/20"
                        : "border-transparent hover:border-border/60 hover:bg-muted/40"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-primary/[0.08] text-primary group-hover:bg-primary/12"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "text-sm font-semibold leading-tight",
                          isActive ? "text-primary" : "text-foreground"
                        )}
                      >
                        {r.label}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1 leading-relaxed">
                        {r.description}
                      </p>
                    </div>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 shrink-0 transition-all",
                        isActive
                          ? "text-primary translate-x-0"
                          : "text-muted-foreground/30 group-hover:text-muted-foreground group-hover:translate-x-0.5"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { GROUP_LABELS };

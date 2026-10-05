import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Users, UserCog, Headphones, User, UserX } from "lucide-react";

export type UserRoleFilter = "all" | "administrator" | "support_staff" | "general_user" | "inactive";

interface UserSummaryStripProps {
  total: number;
  administrators: number;
  supportStaff: number;
  generalUsers: number;
  inactive: number;
  activeFilter: UserRoleFilter;
  onFilter: (filter: UserRoleFilter) => void;
}

const FILTERS = [
  { key: "all" as const, label: "All users", field: "total" as const, icon: Users },
  { key: "administrator" as const, label: "Administrators", field: "administrators" as const, icon: UserCog },
  { key: "support_staff" as const, label: "Support staff", field: "supportStaff" as const, icon: Headphones },
  { key: "general_user" as const, label: "General users", field: "generalUsers" as const, icon: User },
  { key: "inactive" as const, label: "Inactive", field: "inactive" as const, icon: UserX },
];

const BAR_SEGMENTS = [
  { field: "administrators" as const, bar: "bg-primary" },
  { field: "supportStaff" as const, bar: "bg-accent" },
  { field: "generalUsers" as const, bar: "bg-primary/50" },
  { field: "inactive" as const, bar: "bg-slate-400" },
];

export function UserSummaryStrip({
  total,
  administrators,
  supportStaff,
  generalUsers,
  inactive,
  activeFilter,
  onFilter,
}: UserSummaryStripProps) {
  const counts = { total, administrators, supportStaff, generalUsers, inactive };
  const activeCount = total - inactive;
  const activePct = total > 0 ? Math.round((activeCount / total) * 100) : 0;

  return (
    <aside className="app-sidebar-panel flex flex-col gap-4 p-5 lg:sticky lg:top-24 lg:self-start">
      <div>
        <p className="app-page-eyebrow">Team directory</p>
        <p className="mt-1 font-display text-4xl font-bold tabular-nums text-primary">{total}</p>
        <p className="text-sm text-muted-foreground">registered accounts</p>
      </div>

      <div className="rounded-2xl bg-primary/[0.08] px-4 py-3 ring-1 ring-primary/15">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary/80">Active accounts</p>
        <p className="mt-0.5 font-display text-2xl font-bold tabular-nums text-primary">{activePct}%</p>
        <p className="text-xs text-primary/70">{activeCount} of {total} can sign in</p>
      </div>

      {total > 0 && (
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Role mix</p>
          <div className="overflow-hidden rounded-full bg-muted/60 p-0.5">
            <div className="flex h-2 overflow-hidden rounded-full">
              {BAR_SEGMENTS.map((seg, i) => {
                const pct = (counts[seg.field] / total) * 100;
                if (pct <= 0) return null;
                return (
                  <motion.div
                    key={seg.field}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, delay: i * 0.07 }}
                    className={seg.bar}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-1">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Filter by role
        </p>
        {FILTERS.map(({ key, label, field, icon: Icon }) => {
          const selected = activeFilter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onFilter(key)}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-all",
                selected ? "bg-white shadow-md ring-1 ring-primary/20" : "hover:bg-white/70"
              )}
            >
              <span className="flex items-center gap-2.5">
                <Icon className={cn("h-4 w-4", selected ? "text-primary" : "text-muted-foreground")} />
                <span className={cn("font-medium", selected ? "text-foreground" : "text-muted-foreground")}>
                  {label}
                </span>
              </span>
              <span className={cn("font-display text-base font-bold tabular-nums", selected ? "text-primary" : "text-foreground")}>
                {counts[field]}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export function applyUserFilter(users: { role: string; isActive?: boolean }[], filter: UserRoleFilter) {
  if (filter === "inactive") return users.filter((u) => u.isActive === false);
  if (filter === "all") return users;
  return users.filter((u) => u.role === filter);
}

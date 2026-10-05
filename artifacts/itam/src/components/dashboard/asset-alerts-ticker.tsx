import { Link } from "wouter";
import { AlertTriangle, Archive, ChevronRight, ShieldAlert, Wrench, Zap } from "lucide-react";
import { motion } from "framer-motion";
import type { AssetAnomaly } from "@/lib/supabase-queries";
import { cn } from "@/lib/utils";

const ICONS = {
  frequent_reassignment: Zap,
  long_maintenance: Wrench,
  inactive_long: Archive,
  end_of_life: AlertTriangle,
  pm_overdue: Wrench,
} as const;

interface AssetAlertsTickerProps {
  anomalies: AssetAnomaly[];
}

export function AssetAlertsTicker({ anomalies }: AssetAlertsTickerProps) {
  const criticalCount = anomalies.filter((a) => a.severity === "critical").length;
  const warningCount = anomalies.length - criticalCount;

  return (
    <section className="group relative flex h-full w-full min-h-[220px] flex-col overflow-hidden rounded-3xl border border-amber-500/10 bg-gradient-to-br from-white via-white to-amber-500/[0.06] p-4 shadow-[0_4px_24px_rgba(53,88,114,0.06)] backdrop-blur-xl sm:p-5">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-6 top-0 h-24 w-24 rounded-full blur-2xl",
          criticalCount > 0 ? "bg-red-400/20" : "bg-amber-400/15"
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full opacity-70 transition-opacity duration-300 group-hover:opacity-100",
          criticalCount > 0 ? "bg-red-500" : "bg-amber-500"
        )}
      />

      <div className="relative flex items-start justify-between gap-3 pl-2">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1",
              criticalCount > 0
                ? "bg-red-500/10 text-red-600 ring-red-500/15"
                : "bg-amber-500/10 text-amber-700 ring-amber-500/15"
            )}
          >
            <ShieldAlert className="h-[18px] w-[18px]" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-700/75">Watchlist</p>
            <div className="mt-0.5 flex items-center gap-2">
              <h3 className="font-display text-lg font-bold text-foreground">Asset alerts</h3>
              <span className="rounded-full bg-amber-500/12 px-2 py-0.5 text-[10px] font-bold tabular-nums text-amber-800 ring-1 ring-amber-200/70">
                {anomalies.length}
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/assets"
          className="inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-[11px] font-semibold text-amber-800 transition-colors hover:bg-amber-500/8"
        >
          View all
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {criticalCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mt-3 ml-2 flex items-center gap-2 rounded-2xl border border-red-200/80 bg-gradient-to-r from-red-50/90 to-red-50/40 px-3 py-2 shadow-[0_2px_12px_rgba(239,68,68,0.1)] ring-1 ring-red-100/80"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <p className="text-[11px] font-semibold text-red-700">
            {criticalCount} critical {criticalCount === 1 ? "item needs" : "items need"} immediate attention
          </p>
        </motion.div>
      )}

      {criticalCount === 0 && warningCount > 0 && (
        <p className="relative mt-3 ml-2 text-[11px] font-medium text-amber-700/90">
          {warningCount} {warningCount === 1 ? "item" : "items"} on watch — no critical issues
        </p>
      )}

      <div className="relative mt-3 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pl-2">
        {anomalies.slice(0, 5).map((anomaly, index) => {
          const Icon = ICONS[anomaly.type];
          const critical = anomaly.severity === "critical";

          return (
            <motion.div
              key={`${anomaly.assetId}-${anomaly.type}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/assets/${anomaly.assetId}`}
                className={cn(
                  "group/pill flex items-center gap-2.5 rounded-2xl border px-3 py-2 transition-all duration-200",
                  "hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(53,88,114,0.08)]",
                  critical
                    ? "border-red-200/90 bg-gradient-to-r from-red-50/80 to-white/60 shadow-[0_2px_10px_rgba(239,68,68,0.08)] hover:border-red-300 hover:from-red-50 hover:to-red-50/40"
                    : "border-amber-200/60 bg-gradient-to-r from-amber-50/50 to-white/60 hover:border-amber-300 hover:from-amber-50/80"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 ring-white/80",
                    critical
                      ? "bg-gradient-to-br from-red-100 to-red-50 text-red-600"
                      : "bg-gradient-to-br from-amber-100 to-amber-50 text-amber-700"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-xs font-semibold text-foreground group-hover/pill:text-primary">
                      {anomaly.assetName}
                    </p>
                    {critical && (
                      <span className="shrink-0 rounded-full bg-red-500/12 px-1.5 py-px text-[8px] font-bold uppercase tracking-wide text-red-700 ring-1 ring-red-200/70">
                        Critical
                      </span>
                    )}
                  </div>
                  <p className="truncate text-[10px] text-muted-foreground">{anomaly.message}</p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/25 transition-transform group-hover/pill:translate-x-0.5 group-hover/pill:text-primary" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

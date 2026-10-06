import { Link } from "wouter";
import { ChevronRight, Users } from "lucide-react";
import { motion } from "framer-motion";
import type { StaffWorkload } from "@/lib/supabase-queries";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function ringColor(count: number) {
  if (count >= 5) return { stroke: "#ef4444", glow: "shadow-[0_0_16px_rgba(239,68,68,0.35)]", label: "text-red-600" };
  if (count >= 3) return { stroke: "#f59e0b", glow: "shadow-[0_0_12px_rgba(245,158,11,0.25)]", label: "text-amber-600" };
  if (count > 0) return { stroke: "#10b981", glow: "", label: "text-emerald-600" };
  return { stroke: "#94a3b8", glow: "", label: "text-muted-foreground" };
}

function LoadRing({
  pct,
  strokeColor,
  size = 56,
}: {
  pct: number;
  strokeColor: string;
  size?: number;
}) {
  const stroke = 3.5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <svg width={size} height={size} className="absolute inset-0 -rotate-90" aria-hidden>
      <defs>
        <linearGradient id={`ring-${strokeColor.replace("#", "")}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={strokeColor} stopOpacity={0.85} />
          <stop offset="100%" stopColor={strokeColor} />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        className="text-slate-200/80"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={`url(#ring-${strokeColor.replace("#", "")})`}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700 ease-out"
      />
    </svg>
  );
}

interface TeamWorkloadStripProps {
  staff: StaffWorkload[];
}

export function TeamWorkloadStrip({ staff }: TeamWorkloadStripProps) {
  const max = Math.max(...staff.map((s) => s.totalActive), 1);
  const totalActive = staff.reduce((sum, s) => sum + s.totalActive, 0);

  return (
    <section className="group relative flex h-full w-full min-h-[220px] flex-col overflow-hidden rounded-3xl border border-violet-500/10 bg-gradient-to-br from-white via-white to-violet-500/[0.06] p-4 shadow-[0_4px_24px_rgba(53,88,114,0.06)] backdrop-blur-xl sm:p-5">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-violet-400/12 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full bg-violet-500 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-3 pl-2">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/15">
            <Users className="h-[18px] w-[18px]" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-700/75">Capacity</p>
            <div className="mt-0.5 flex items-baseline gap-2">
              <h3 className="font-display text-lg font-bold text-foreground">Team workload</h3>
              <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-bold tabular-nums text-violet-700 ring-1 ring-violet-200/60">
                {totalActive} active
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/tickets"
          className="inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/5"
        >
          View all
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="relative mt-5 flex min-h-0 flex-1 items-center gap-4 overflow-x-auto pb-1 pl-2 hide-scrollbar">
        {staff.map((member, index) => {
          const pct = Math.round((member.totalActive / max) * 100);
          const colors = ringColor(member.totalActive);

          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 320, damping: 28 }}
              className="flex shrink-0 flex-col items-center gap-2.5"
            >
              <div
                className={cn(
                  "relative flex h-14 w-14 items-center justify-center rounded-full bg-card/80 p-0.5 transition-transform duration-300 hover:scale-105",
                  colors.glow
                )}
              >
                <LoadRing pct={pct} strokeColor={colors.stroke} size={56} />
                <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                  <AvatarFallback className="bg-gradient-to-br from-primary/15 to-violet-500/15 text-xs font-bold text-primary">
                    {member.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="max-w-[72px] text-center">
                <p className="truncate text-[11px] font-medium text-foreground">
                  {member.fullName.split(" ")[0]}
                </p>
                <p className={cn("font-display text-sm font-bold tabular-nums", colors.label)}>
                  {member.totalActive}
                  <span className="ml-0.5 text-[10px] font-normal text-muted-foreground">tkts</span>
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

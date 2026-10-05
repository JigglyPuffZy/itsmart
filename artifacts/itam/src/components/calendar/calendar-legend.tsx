import { cn } from "@/lib/utils";

export type CalendarEventType =
  | "ticket_open"
  | "ticket_due"
  | "ticket_resolved"
  | "pm_due"
  | "asset_eol";

export interface CalendarEvent {
  id: string;
  date: Date;
  type: CalendarEventType;
  title: string;
  subtitle?: string;
  href: string;
}

export const EVENT_STYLES: Record<
  CalendarEventType,
  { dot: string; badge: string; chip: string; label: string }
> = {
  ticket_open: {
    dot: "bg-amber-400",
    badge:
      "bg-amber-50 text-amber-900 border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800/50",
    chip: "bg-amber-500/10 text-amber-700 border-amber-200/60 dark:text-amber-300",
    label: "Ticket created",
  },
  ticket_due: {
    dot: "bg-red-500",
    badge:
      "bg-red-50 text-red-900 border-red-200/80 dark:bg-red-950/40 dark:text-red-200 dark:border-red-800/50",
    chip: "bg-red-500/10 text-red-700 border-red-200/60 dark:text-red-300",
    label: "SLA deadline",
  },
  ticket_resolved: {
    dot: "bg-emerald-500",
    badge:
      "bg-emerald-50 text-emerald-900 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-800/50",
    chip: "bg-emerald-500/10 text-emerald-700 border-emerald-200/60 dark:text-emerald-300",
    label: "Ticket resolved",
  },
  pm_due: {
    dot: "bg-sky-500",
    badge:
      "bg-sky-50 text-sky-900 border-sky-200/80 dark:bg-sky-950/40 dark:text-sky-200 dark:border-sky-800/50",
    chip: "bg-sky-500/10 text-sky-700 border-sky-200/60 dark:text-sky-300",
    label: "PM due",
  },
  asset_eol: {
    dot: "bg-orange-500",
    badge:
      "bg-orange-50 text-orange-900 border-orange-200/80 dark:bg-orange-950/40 dark:text-orange-200 dark:border-orange-800/50",
    chip: "bg-orange-500/10 text-orange-700 border-orange-200/60 dark:text-orange-300",
    label: "End of life",
  },
};

interface CalendarLegendProps {
  legend: { type: CalendarEventType; label: string; count: number }[];
  activeFilters: Set<CalendarEventType>;
  onToggle: (type: CalendarEventType) => void;
}

export function CalendarLegend({ legend, activeFilters, onToggle }: CalendarLegendProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {legend.map(({ type, label, count }) => {
        const s = EVENT_STYLES[type];
        const active = activeFilters.has(type);
        return (
          <button
            key={type}
            type="button"
            onClick={() => onToggle(type)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all",
              active ? cn(s.chip, "ring-1 ring-primary/10 shadow-sm") : "bg-muted/20 text-muted-foreground border-border/50 opacity-60 hover:opacity-100"
            )}
          >
            <span className={cn("w-2 h-2 rounded-full shrink-0", active ? s.dot : "bg-muted-foreground/40")} />
            <span>{label}</span>
            <span className={cn("tabular-nums font-semibold", active ? "text-foreground" : "text-muted-foreground")}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

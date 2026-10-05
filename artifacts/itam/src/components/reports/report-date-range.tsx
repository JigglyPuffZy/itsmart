import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import { X } from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import { cn } from "@/lib/utils";

interface ReportDateRangeProps {
  from: string;
  to: string;
  onFrom: (v: string) => void;
  onTo: (v: string) => void;
  onClear: () => void;
  className?: string;
}

function toInputDate(d: Date) {
  return format(d, "yyyy-MM-dd");
}

const PRESETS = [
  { label: "Last 7 days", get: () => ({ from: toInputDate(subDays(new Date(), 7)), to: toInputDate(new Date()) }) },
  { label: "Last 30 days", get: () => ({ from: toInputDate(subDays(new Date(), 30)), to: toInputDate(new Date()) }) },
  { label: "This month", get: () => ({ from: toInputDate(startOfMonth(new Date())), to: toInputDate(endOfMonth(new Date())) }) },
];

export function ReportDateRange({ from, to, onFrom, onTo, onClear, className }: ReportDateRangeProps) {
  const hasRange = Boolean(from || to);

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-1.5 shrink-0">
          <label htmlFor="report-date-from" className="text-xs font-medium text-muted-foreground">
            From
          </label>
          <DateInput
            id="report-date-from"
            value={from}
            onChange={(e) => onFrom(e.target.value)}
            className="w-[11.5rem] rounded-xl border-border/60"
          />
        </div>
        <div className="space-y-1.5 shrink-0">
          <label htmlFor="report-date-to" className="text-xs font-medium text-muted-foreground">
            To
          </label>
          <DateInput
            id="report-date-to"
            value={to}
            onChange={(e) => onTo(e.target.value)}
            className="w-[11.5rem] rounded-xl border-border/60"
          />
        </div>
        {hasRange && (
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-2.5 rounded-xl text-muted-foreground hover:text-foreground"
            onClick={onClear}
            title="Clear dates"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Quick range
        </span>
        {PRESETS.map(({ label, get }) => {
          const preset = get();
          const isActive = from === preset.from && to === preset.to;
          return (
            <button
              key={label}
              type="button"
              onClick={() => {
                onFrom(preset.from);
                onTo(preset.to);
              }}
              className={cn(
                "text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all",
                isActive
                  ? "border-primary/30 bg-primary/[0.08] text-primary"
                  : "border-border/60 bg-background text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/[0.04]"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

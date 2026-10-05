import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const ticketTrendConfig = {
  opened: { label: "Opened", color: "hsl(38 92% 50%)" },
  resolved: { label: "Resolved", color: "hsl(142 71% 45%)" },
};

interface TrendPanelProps {
  data: { week: string; opened: number; resolved: number }[];
  weeks: number;
  onWeeksChange: (weeks: number) => void;
  compact?: boolean;
}

export function TrendPanel({ data, weeks, onWeeksChange, compact = false }: TrendPanelProps) {
  return (
    <section className={cn("dash-card h-full overflow-hidden", compact ? "p-4 sm:p-5" : "")}>
      <div className={cn("flex items-end justify-between gap-3", compact ? "" : "border-b border-border/40 px-5 py-4")}>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Volume</p>
          <div className="mt-0.5 flex items-center gap-2">
            <h3 className="font-display text-lg font-bold text-foreground">Ticket trends</h3>
            {!compact && <TrendingUp className="h-4 w-4 text-emerald-600" />}
          </div>
        </div>
        <Select value={String(weeks)} onValueChange={(v) => onWeeksChange(Number(v))}>
          <SelectTrigger className="h-7 w-[88px] rounded-full border-border/60 bg-white/80 text-[11px] shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4 wks</SelectItem>
            <SelectItem value="8">8 wks</SelectItem>
            <SelectItem value="12">3 mo</SelectItem>
            <SelectItem value="24">6 mo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className={cn(compact ? "mt-3" : "px-3 pb-4 pt-2")}>
        <ChartContainer config={ticketTrendConfig} className={cn("w-full aspect-auto", compact ? "h-[140px]" : "h-[180px]")}>
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="openedFillLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(38 92% 50%)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="hsl(38 92% 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="resolvedFillLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142 71% 45%)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="hsl(142 71% 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/40" />
            <XAxis dataKey="week" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} tickMargin={6} />
            <YAxis allowDecimals={false} tick={{ fontSize: 9 }} axisLine={false} tickLine={false} width={24} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area type="monotone" dataKey="opened" stroke="hsl(38 92% 50%)" strokeWidth={2} fill="url(#openedFillLight)" dot={false} />
            <Area type="monotone" dataKey="resolved" stroke="hsl(142 71% 45%)" strokeWidth={2} fill="url(#resolvedFillLight)" dot={false} />
          </AreaChart>
        </ChartContainer>
        <div className="mt-2 flex justify-center gap-4 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Opened
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Resolved
          </span>
        </div>
      </div>
    </section>
  );
}

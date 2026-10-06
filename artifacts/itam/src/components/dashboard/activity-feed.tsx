import { Link } from "wouter";
import { format, formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Inbox } from "lucide-react";
import type { Ticket } from "@/lib/supabase-queries";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

const PRIORITY_ORDER = { critical: 0, high: 1, medium: 2, low: 3 } as const;

function priorityRank(priority: string) {
  return PRIORITY_ORDER[priority as keyof typeof PRIORITY_ORDER] ?? 4;
}

function priorityAccent(priority: string) {
  if (priority === "critical") return "from-red-500/12 via-red-50/60 to-white border-red-200/60";
  if (priority === "high") return "from-amber-500/10 via-amber-50/50 to-white border-amber-200/50";
  if (priority === "medium") return "from-sky-500/10 via-sky-50/40 to-white border-sky-200/50";
  return "from-slate-200/30 via-slate-50/40 to-white border-border/50";
}

function priorityDot(priority: string) {
  if (priority === "critical") return "bg-red-500";
  if (priority === "high") return "bg-amber-500";
  if (priority === "medium") return "bg-sky-500";
  return "bg-slate-400";
}

interface ActivityFeedProps {
  tickets: Ticket[];
  title: string;
}

function TicketCard({
  ticket,
  variant = "compact",
}: {
  ticket: Ticket;
  variant?: "spotlight" | "compact";
}) {
  const isSpotlight = variant === "spotlight";

  return (
    <Link
      href={`/tickets/${ticket.id}`}
      className={cn(
        "group relative flex shrink-0 flex-col overflow-hidden rounded-2xl border bg-gradient-to-br transition-all duration-300",
        "hover:border-primary/25 hover:shadow-[0_12px_36px_rgba(53,88,114,0.1)] hover:-translate-y-0.5",
        priorityAccent(ticket.priority),
        isSpotlight ? "min-h-[220px] p-5 sm:p-6" : "w-[240px] p-4"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={ticket.status} />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground ring-1 ring-border/40">
            <span className={cn("h-1.5 w-1.5 rounded-full", priorityDot(ticket.priority))} />
            {ticket.priority}
          </span>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-primary" />
      </div>

      <p
        className={cn(
          "mt-3 font-display font-semibold text-foreground group-hover:text-primary",
          isSpotlight ? "line-clamp-3 text-xl leading-snug" : "line-clamp-2 text-sm"
        )}
      >
        {ticket.title}
      </p>

      {isSpotlight && ticket.description && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {ticket.description}
        </p>
      )}

      <div className={cn("mt-auto flex items-end justify-between gap-3", isSpotlight ? "pt-5" : "pt-3")}>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-foreground">{ticket.createdBy.fullName}</p>
          <p className="text-[10px] text-muted-foreground">{format(new Date(ticket.createdAt), "MMM d, yyyy")}</p>
        </div>
        <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
          {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
        </span>
      </div>
    </Link>
  );
}

export function ActivityFeed({ tickets, title }: ActivityFeedProps) {
  const sorted = [...tickets].sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority));
  const [spotlight, ...rest] = sorted;

  return (
    <section className="dash-card overflow-hidden">
      <div className="flex items-end justify-between gap-4 px-5 pb-4 pt-5 sm:px-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Live queue</p>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">{title}</h2>
            {tickets.length > 0 && (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold tabular-nums text-primary ring-1 ring-primary/15">
                {tickets.length}
              </span>
            )}
          </div>
        </div>
        <Link
          href="/tickets"
          className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
        >
          View all
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 pb-16 pt-4 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/8 ring-1 ring-primary/10">
            <Inbox className="h-7 w-7 text-primary/40" />
          </div>
          <p className="font-display font-semibold text-foreground">No tickets yet</p>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">New requests will show up here.</p>
          <Link
            href="/tickets"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Go to tickets
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4 px-4 pb-5 sm:px-5">
          {/* Spotlight + peek carousel */}
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <TicketCard ticket={spotlight} variant="spotlight" />
            </motion.div>

            {rest.length > 0 && (
              <div className="relative min-w-0">
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white/90 to-transparent" />
                <div className="dash-scroll-x hide-scrollbar -mx-1 px-1">
                  {rest.map((ticket, index) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <TicketCard ticket={ticket} variant="compact" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

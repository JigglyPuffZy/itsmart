import { Link } from "wouter";
import {
  Monitor,
  Laptop,
  Server,
  Printer,
  Smartphone,
  Tablet,
  Network,
  HardDrive,
  ChevronRight,
  MapPin,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";
import { StatusBadge } from "@/components/ui/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, typeof Monitor> = {
  laptop: Laptop,
  desktop: Monitor,
  monitor: Monitor,
  phone: Smartphone,
  tablet: Tablet,
  printer: Printer,
  server: Server,
  networking: Network,
  peripheral: HardDrive,
  other: HardDrive,
};

const STATUS_DOT: Record<string, string> = {
  active: "bg-emerald-500",
  inactive: "bg-slate-400",
  maintenance: "bg-amber-500",
  retired: "bg-rose-400",
};

interface AssetRowProps {
  asset: {
    id: string;
    assetTag: string;
    name: string;
    category: string;
    status: string;
    model?: string | null;
    location?: string | null;
    assignedTo?: { fullName?: string } | null;
  };
  index?: number;
}

export function AssetRow({ asset, index = 0 }: AssetRowProps) {
  const Icon = CATEGORY_ICONS[asset.category] ?? Monitor;
  const categoryLabel = asset.category.charAt(0).toUpperCase() + asset.category.slice(1);
  const statusDot = STATUS_DOT[asset.status] ?? "bg-primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
    >
      <Link href={`/assets/${asset.id}`}>
        <article
          className={cn(
            "group relative flex cursor-pointer items-center gap-3 rounded-2xl border border-primary/8 bg-white/70 px-3 py-3.5 transition-all sm:gap-4 sm:px-4",
            "hover:border-primary/20 hover:bg-white hover:shadow-[0_8px_24px_rgba(53,88,114,0.08)] hover:-translate-y-px"
          )}
        >
          {/* Icon + status dot */}
          <div className="relative shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.08] text-primary ring-1 ring-primary/12 transition-colors group-hover:bg-primary/[0.12] group-hover:ring-primary/20">
              <Icon className="h-5 w-5" />
            </div>
            <span
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-white shadow-sm",
                statusDot
              )}
              title={asset.status}
            />
          </div>

          {/* Main grid */}
          <div className="min-w-0 flex-1 grid gap-2 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,0.75fr)_minmax(0,0.65fr)_auto] sm:items-center sm:gap-3">
            {/* Device info */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-primary/[0.07] px-2 py-0.5 font-mono text-[10px] font-semibold text-primary ring-1 ring-primary/10">
                  {asset.assetTag}
                </span>
                <StatusBadge status={asset.status} className="text-[10px] px-1.5 py-0" />
              </div>
              <h3 className="mt-1 truncate font-display text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors">
                {asset.name}
              </h3>
              <p className="text-xs text-muted-foreground capitalize truncate">
                {categoryLabel}
                {asset.model ? ` · ${asset.model}` : ""}
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 min-w-0 sm:px-1">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/40" />
              {asset.location ? (
                <span className="truncate text-xs font-medium text-foreground/80">{asset.location}</span>
              ) : (
                <span className="text-xs text-muted-foreground/70">Not set</span>
              )}
            </div>

            {/* Assignee */}
            <div className="flex items-center min-w-0 sm:justify-start">
              {asset.assignedTo ? (
                <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-primary/[0.06] px-2.5 py-1 ring-1 ring-primary/10">
                  <Avatar className="h-5 w-5 ring-1 ring-white">
                    <AvatarFallback className="bg-primary/15 text-primary text-[8px] font-bold">
                      {asset.assignedTo.fullName?.charAt(0) ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate text-xs font-medium text-foreground max-w-[100px]">
                    {asset.assignedTo.fullName}
                  </span>
                </div>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">
                  <UserRound className="h-3 w-3 opacity-50" />
                  Unassigned
                </span>
              )}
            </div>

            {/* Action */}
            <div className="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/[0.06] text-primary/40 transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-sm">
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

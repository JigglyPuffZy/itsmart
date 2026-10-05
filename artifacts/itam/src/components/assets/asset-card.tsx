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
  Hash,
} from "lucide-react";
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

interface AssetCardProps {
  asset: {
    id: string;
    assetTag: string;
    name: string;
    category: string;
    status: string;
    model?: string | null;
    serialNumber?: string | null;
    location?: string | null;
    assignedTo?: { fullName?: string } | null;
  };
}

export function AssetCard({ asset }: AssetCardProps) {
  const Icon = CATEGORY_ICONS[asset.category] ?? Monitor;
  const categoryLabel =
    asset.category.charAt(0).toUpperCase() + asset.category.slice(1);

  return (
    <Link href={`/assets/${asset.id}`}>
      <article
        className={cn(
          "group relative flex flex-col h-full rounded-2xl border border-white/50 bg-white/70 backdrop-blur-xl overflow-hidden",
          "shadow-[0_4px_20px_rgba(53,88,114,0.05)] transition-all duration-300",
          "hover:border-primary/25 hover:shadow-[0_16px_48px_rgba(53,88,114,0.12)] hover:-translate-y-1"
        )}
      >
        <div className="h-0.5 w-full bg-gradient-to-r from-primary via-accent/80 to-primary/30" />
        <div className="p-5 flex flex-col flex-1 gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08] text-primary ring-1 ring-primary/10">
              <Icon className="h-5 w-5" />
            </div>
            <StatusBadge status={asset.status} />
          </div>

          <div className="min-w-0 space-y-1">
            <span className="inline-block font-mono text-[11px] font-semibold text-primary bg-primary/[0.06] border border-primary/10 px-2 py-0.5 rounded-md">
              {asset.assetTag}
            </span>
            <h3 className="font-display font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {asset.name}
            </h3>
            <p className="text-xs text-muted-foreground capitalize truncate">
              {categoryLabel}
              {asset.model ? ` · ${asset.model}` : ""}
            </p>
          </div>

          <div className="mt-auto space-y-2 pt-3 border-t border-border/50 text-xs text-muted-foreground">
            {asset.serialNumber && (
              <div className="flex items-center gap-1.5 truncate">
                <Hash className="h-3.5 w-3.5 shrink-0 opacity-60" />
                <span className="font-mono truncate">{asset.serialNumber}</span>
              </div>
            )}
            {asset.location && (
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="h-3.5 w-3.5 shrink-0 opacity-60" />
                <span className="truncate">{asset.location}</span>
              </div>
            )}
            <div className="flex items-center justify-between gap-2 pt-1">
              {asset.assignedTo ? (
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar className="h-6 w-6 ring-1 ring-border/50">
                    <AvatarFallback className="bg-primary/[0.08] text-primary text-[9px] font-bold">
                      {asset.assignedTo.fullName?.charAt(0) ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground truncate">
                    {asset.assignedTo.fullName}
                  </span>
                </div>
              ) : (
                <span className="italic text-muted-foreground/80">Unassigned</span>
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary shrink-0 transition-colors" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

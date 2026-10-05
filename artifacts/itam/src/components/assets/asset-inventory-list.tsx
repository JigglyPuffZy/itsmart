import { Package } from "lucide-react";
import { AssetRow } from "@/components/assets/asset-row";

interface Asset {
  id: string;
  assetTag: string;
  name: string;
  category: string;
  status: string;
  model?: string | null;
  location?: string | null;
  assignedTo?: { fullName?: string } | null;
}

interface AssetInventoryListProps {
  assets: Asset[];
  total: number;
}

export function AssetInventoryList({ assets, total }: AssetInventoryListProps) {
  return (
    <div className="app-surface overflow-hidden rounded-3xl">
      {/* Header */}
      <div className="app-panel-header flex items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
            <Package className="h-[18px] w-[18px]" />
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-base font-semibold text-foreground">Inventory</h2>
            <p className="text-xs text-muted-foreground">
              Browse and manage registered devices
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-full bg-primary/10 px-3 py-1.5 ring-1 ring-primary/15">
          <span className="text-xs font-semibold text-primary tabular-nums">
            {assets.length}
            <span className="font-normal text-primary/60"> / {total}</span>
          </span>
        </div>
      </div>

      {/* Column guide — desktop only */}
      <div className="hidden border-b border-primary/8 bg-primary/[0.02] px-4 py-2.5 sm:grid sm:grid-cols-[minmax(0,1.5fr)_minmax(0,0.75fr)_minmax(0,0.65fr)_auto] sm:gap-3 sm:px-5">
        <span className="pl-[3.25rem] text-[10px] font-semibold uppercase tracking-wider text-primary/60">Device</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60">Location</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60">Assignee</span>
        <span className="w-8" />
      </div>

      {/* Rows */}
      <div className="space-y-1.5 p-2 sm:p-3">
        {assets.map((asset, i) => (
          <AssetRow key={asset.id} asset={asset} index={i} />
        ))}
      </div>
    </div>
  );
}

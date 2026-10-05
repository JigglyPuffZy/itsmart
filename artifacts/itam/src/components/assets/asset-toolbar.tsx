import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AssetToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function AssetToolbar({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  categories,
  hasActiveFilters,
  onClearFilters,
}: AssetToolbarProps) {
  return (
    <div className="app-surface p-4">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, tag, or category..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-11 rounded-xl border-border/50 bg-background/80 pl-10"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mr-1">
          Type
        </span>
        <button
          type="button"
          onClick={() => onCategoryChange("all")}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
            categoryFilter === "all"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted/60 text-muted-foreground hover:bg-muted"
          )}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onCategoryChange(c)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-all",
              categoryFilter === c
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:bg-muted"
            )}
          >
            {c}
          </button>
        ))}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto h-8 rounded-full text-muted-foreground"
            onClick={onClearFilters}
          >
            <X className="mr-1 h-3.5 w-3.5" /> Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}

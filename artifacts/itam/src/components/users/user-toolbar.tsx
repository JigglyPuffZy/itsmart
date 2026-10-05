import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserRoleFilter } from "@/components/users/user-summary-strip";

const ROLE_CHIPS: { key: UserRoleFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "administrator", label: "Admins" },
  { key: "support_staff", label: "Support" },
  { key: "general_user", label: "General" },
  { key: "inactive", label: "Inactive" },
];

interface UserToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: UserRoleFilter;
  onRoleFilterChange: (value: UserRoleFilter) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function UserToolbar({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  hasActiveFilters,
  onClearFilters,
}: UserToolbarProps) {
  return (
    <div className="app-surface p-4">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-primary/75">Find members</p>
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-11 rounded-xl border-border/50 bg-background/80 pl-10"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Role</span>
        {ROLE_CHIPS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => onRoleFilterChange(key)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
              roleFilter === key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:bg-muted"
            )}
          >
            {label}
          </button>
        ))}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto h-8 rounded-full text-muted-foreground"
            onClick={onClearFilters}
          >
            <X className="mr-1 h-3.5 w-3.5" /> Clear
          </Button>
        )}
      </div>
    </div>
  );
}

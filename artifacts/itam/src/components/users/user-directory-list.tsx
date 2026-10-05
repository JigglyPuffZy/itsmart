import { Users } from "lucide-react";
import { UserRow } from "@/components/users/user-row";
import type { UserCardData } from "@/components/users/user-card";
import { UserRole } from "@/lib/supabase-queries";

interface UserDirectoryListProps {
  users: UserCardData[];
  total: number;
  currentUserId?: string;
  roleUpdating: boolean;
  togglePending: boolean;
  resettingId: string | null;
  onRoleChange: (id: string, role: UserRole) => void;
  onToggleActive: (id: string, currentlyActive: boolean) => void;
  onResetPassword: (id: string) => void;
}

export function UserDirectoryList({
  users,
  total,
  currentUserId,
  roleUpdating,
  togglePending,
  resettingId,
  onRoleChange,
  onToggleActive,
  onResetPassword,
}: UserDirectoryListProps) {
  return (
    <div className="app-surface overflow-hidden rounded-3xl">
      <div className="app-panel-header flex items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
            <Users className="h-[18px] w-[18px]" />
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-base font-semibold text-foreground">Team roster</h2>
            <p className="text-xs text-muted-foreground">Tap ··· on any member to manage access</p>
          </div>
        </div>
        <div className="shrink-0 rounded-full bg-primary/10 px-3 py-1.5 ring-1 ring-primary/15">
          <span className="text-xs font-semibold text-primary tabular-nums">
            {users.length}
            <span className="font-normal text-primary/60"> / {total}</span>
          </span>
        </div>
      </div>

      <div className="hidden border-b border-primary/8 bg-primary/[0.02] px-4 py-2.5 sm:grid sm:grid-cols-[minmax(0,1.5fr)_minmax(0,0.7fr)_minmax(0,0.65fr)_auto] sm:gap-3 sm:px-5">
        <span className="pl-[3.25rem] text-[10px] font-semibold uppercase tracking-wider text-primary/60">Member</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60">Role</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60">Department</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 text-right">Manage</span>
      </div>

      <div className="space-y-1.5 p-2 sm:p-3">
        {users.map((u, i) => (
          <UserRow
            key={u.id}
            user={u}
            index={i}
            isCurrentUser={u.id === currentUserId}
            roleUpdating={roleUpdating}
            togglePending={togglePending}
            resetting={resettingId === u.id}
            onRoleChange={(role) => onRoleChange(u.id, role)}
            onToggleActive={() => onToggleActive(u.id, u.isActive !== false)}
            onResetPassword={() => onResetPassword(u.id)}
          />
        ))}
      </div>
    </div>
  );
}

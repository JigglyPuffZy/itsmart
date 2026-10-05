import { useEffect, useMemo, useState } from "react";
import { Users } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { UserMemberStrip } from "@/components/users/user-member-strip";
import { UserDetailPanel } from "@/components/users/user-detail-panel";
import type { UserCardData } from "@/components/users/user-card";
import { UserRole } from "@/lib/supabase-queries";

interface UserTeamPanelProps {
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

export function UserTeamPanel({
  users,
  total,
  currentUserId,
  roleUpdating,
  togglePending,
  resettingId,
  onRoleChange,
  onToggleActive,
  onResetPassword,
}: UserTeamPanelProps) {
  const [selectedId, setSelectedId] = useState<string | null>(users[0]?.id ?? null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!users.length) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !users.some((u) => u.id === selectedId)) {
      setSelectedId(users[0].id);
    }
  }, [users, selectedId]);

  const selectedUser = useMemo(
    () => users.find((u) => u.id === selectedId) ?? null,
    [users, selectedId]
  );

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileOpen(true);
    }
  };

  return (
    <>
      <div className="app-surface overflow-hidden rounded-3xl">
        <div className="app-panel-header flex items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
              <Users className="h-[18px] w-[18px]" />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-foreground">Team members</h2>
              <p className="text-xs text-muted-foreground">Select someone to manage their account</p>
            </div>
          </div>
          <div className="rounded-full bg-primary/10 px-3 py-1.5 ring-1 ring-primary/15">
            <span className="text-xs font-semibold text-primary tabular-nums">
              {users.length}<span className="font-normal text-primary/60"> / {total}</span>
            </span>
          </div>
        </div>

        <div className="grid min-h-[420px] lg:grid-cols-[minmax(260px,300px)_1fr]">
          {/* Member list */}
          <div className="border-b border-primary/10 p-3 lg:border-b-0 lg:border-r lg:max-h-[560px] lg:overflow-y-auto">
            <div className="space-y-0.5">
              {users.map((u) => (
                <UserMemberStrip
                  key={u.id}
                  user={u}
                  selected={u.id === selectedId}
                  isCurrentUser={u.id === currentUserId}
                  onSelect={() => handleSelect(u.id)}
                />
              ))}
            </div>
          </div>

          {/* Detail — desktop */}
          <div className="hidden p-4 lg:block">
            <UserDetailPanel
              user={selectedUser}
              isCurrentUser={selectedUser?.id === currentUserId}
              roleUpdating={roleUpdating}
              togglePending={togglePending}
              resetting={selectedUser ? resettingId === selectedUser.id : false}
              onRoleChange={(role) => selectedUser && onRoleChange(selectedUser.id, role)}
              onToggleActive={() => selectedUser && onToggleActive(selectedUser.id, selectedUser.isActive !== false)}
              onResetPassword={() => selectedUser && onResetPassword(selectedUser.id)}
            />
          </div>
        </div>
      </div>

      {/* Detail — mobile sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto rounded-t-3xl">
          <SheetHeader className="mb-4">
            <SheetTitle className="font-display">{selectedUser?.fullName ?? "Member"}</SheetTitle>
          </SheetHeader>
          {selectedUser && (
            <UserDetailPanel
              user={selectedUser}
              isCurrentUser={selectedUser.id === currentUserId}
              roleUpdating={roleUpdating}
              togglePending={togglePending}
              resetting={resettingId === selectedUser.id}
              onRoleChange={(role) => onRoleChange(selectedUser.id, role)}
              onToggleActive={() => onToggleActive(selectedUser.id, selectedUser.isActive !== false)}
              onResetPassword={() => onResetPassword(selectedUser.id)}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

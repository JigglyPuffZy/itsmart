import { format, formatDistanceToNow } from "date-fns";
import {
  Mail,
  Building2,
  Clock,
  Calendar,
  UserCog,
  Headphones,
  User,
  KeyRound,
  UserCheck,
  UserX,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserRole } from "@/lib/supabase-queries";
import { cn } from "@/lib/utils";
import type { UserCardData } from "@/components/users/user-card";

function roleLabel(role: string) {
  return role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

function RoleIcon({ role, className }: { role: string; className?: string }) {
  if (role === "administrator") return <UserCog className={className} />;
  if (role === "support_staff") return <Headphones className={className} />;
  return <User className={className} />;
}

interface UserDetailPanelProps {
  user: UserCardData | null;
  isCurrentUser: boolean;
  roleUpdating: boolean;
  togglePending: boolean;
  resetting: boolean;
  onRoleChange: (role: UserRole) => void;
  onToggleActive: () => void;
  onResetPassword: () => void;
}

export function UserDetailPanel({
  user,
  isCurrentUser,
  roleUpdating,
  togglePending,
  resetting,
  onRoleChange,
  onToggleActive,
  onResetPassword,
}: UserDetailPanelProps) {
  const [resetOpen, setResetOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-primary/20 bg-primary/[0.02] p-8 text-center">
        <User className="mb-3 h-10 w-10 text-primary/30" />
        <p className="font-display font-semibold text-foreground">Select a team member</p>
        <p className="mt-1 text-sm text-muted-foreground">Choose someone from the list to view and manage their account.</p>
      </div>
    );
  }

  const active = user.isActive !== false;
  const lastLogin = user.lastSignInAt
    ? formatDistanceToNow(new Date(user.lastSignInAt), { addSuffix: true })
    : "Never signed in";

  return (
    <div className="flex h-full flex-col rounded-2xl border border-primary/10 bg-gradient-to-b from-white to-primary/[0.03] p-6 shadow-sm">
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-4">
        <Avatar className="h-16 w-16 ring-4 ring-primary/10">
          <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
            {user.fullName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <h2 className="font-display text-xl font-bold text-foreground">{user.fullName}</h2>
            {isCurrentUser && <Badge variant="secondary" className="text-[10px]">You</Badge>}
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[10px] font-semibold ring-1",
                active
                  ? "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20"
                  : "bg-rose-500/10 text-rose-600 ring-rose-500/20"
              )}
            >
              {active ? "Active" : "Inactive"}
            </span>
          </div>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{user.email}</span>
          </p>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/[0.08] px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/15 capitalize">
            <RoleIcon role={user.role} className="h-3.5 w-3.5" />
            {roleLabel(user.role)}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white/80 px-4 py-3 ring-1 ring-primary/8">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Building2 className="h-3 w-3" /> Department
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">{user.department || "Not set"}</p>
        </div>
        <div className="rounded-xl bg-white/80 px-4 py-3 ring-1 ring-primary/8">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Calendar className="h-3 w-3" /> Joined
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {format(new Date(user.createdAt), "MMMM d, yyyy")}
          </p>
        </div>
        <div className="rounded-xl bg-white/80 px-4 py-3 ring-1 ring-primary/8 sm:col-span-2">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Clock className="h-3 w-3" /> Last sign-in
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">{lastLogin}</p>
        </div>
      </div>

      {!isCurrentUser && (
        <div className="mt-6 space-y-4 border-t border-primary/10 pt-6">
          <div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground">Assign role</p>
            <Select
              value={user.role}
              onValueChange={(val) => onRoleChange(val as UserRole)}
              disabled={roleUpdating}
            >
              <SelectTrigger className="h-10 rounded-xl border-primary/15">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(UserRole).map((r) => (
                  <SelectItem key={r} value={r} className="capitalize">
                    {roleLabel(r)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className={cn(
                "flex-1 rounded-xl gap-2 min-w-[140px]",
                active
                  ? "border-rose-200 text-rose-600 hover:bg-rose-50"
                  : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
              )}
              disabled={togglePending}
              onClick={onToggleActive}
            >
              {togglePending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : active ? (
                <UserX className="h-4 w-4" />
              ) : (
                <UserCheck className="h-4 w-4" />
              )}
              {active ? "Deactivate" : "Activate"}
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-xl gap-2 min-w-[140px] border-primary/20 text-primary hover:bg-primary/[0.06]"
              disabled={resetting}
              onClick={() => setResetOpen(true)}
            >
              {resetting ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
              Reset password
            </Button>
          </div>
        </div>
      )}

      {isCurrentUser && (
        <p className="mt-6 rounded-xl bg-muted/50 px-4 py-3 text-center text-xs text-muted-foreground">
          This is your account — role and status cannot be changed here.
        </p>
      )}

      <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Reset password for {user.fullName}?</AlertDialogTitle>
            <AlertDialogDescription>
              Password will be set to <span className="font-mono font-semibold text-foreground">dostro2</span>.
              They must change it on next login.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-xl"
              onClick={() => {
                onResetPassword();
                setResetOpen(false);
              }}
            >
              Reset password
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

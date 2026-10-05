import { AppLayout } from "@/components/layout/app-layout";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <Skeleton className="h-36 rounded-3xl" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-72 rounded-3xl" />
        <div className="grid gap-4 lg:grid-cols-12">
          <Skeleton className="h-44 rounded-3xl lg:col-span-4" />
          <Skeleton className="h-44 rounded-3xl lg:col-span-8" />
        </div>
        <div className="grid gap-4 lg:grid-cols-12">
          <Skeleton className="h-36 rounded-3xl lg:col-span-7" />
          <Skeleton className="h-36 rounded-3xl lg:col-span-5" />
        </div>
      </div>
    </AppLayout>
  );
}

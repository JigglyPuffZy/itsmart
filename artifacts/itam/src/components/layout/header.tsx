import { useLocation } from "wouter";

const PAGE_TITLES: Record<string, string> = {
  "/profile": "My Profile",
  "/change-password": "Change Password",
};

export function PageHeader({ title, description }: { title?: string; description?: string }) {
  const [location] = useLocation();
  const autoTitle = PAGE_TITLES[location];

  if (!title && !autoTitle) return null;

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-display font-bold tracking-tight text-foreground">
        {title ?? autoTitle}
      </h1>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

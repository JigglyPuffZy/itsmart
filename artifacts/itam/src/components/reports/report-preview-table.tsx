import { Loader2, TableProperties, Rows3 } from "lucide-react";

const PREVIEW_ROWS = 10;

interface ReportPreviewTableProps {
  columns: string[];
  rows: (string | number | null)[][];
  total: number;
  loading: boolean;
}

export function ReportPreviewTable({ columns, rows, total, loading }: ReportPreviewTableProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
        <div className="border-b border-border/50 bg-muted/20 px-4 py-3 flex items-center gap-2">
          <div className="h-4 w-24 rounded bg-muted/60 animate-pulse" />
        </div>
        <div className="p-4 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="h-4 flex-1 rounded bg-muted/50 animate-pulse" />
              <div className="h-4 w-20 rounded bg-muted/40 animate-pulse" />
              <div className="h-4 w-16 rounded bg-muted/40 animate-pulse" />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 py-6 text-muted-foreground text-sm border-t border-border/40">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          Loading preview…
        </div>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="relative overflow-hidden flex flex-col items-center justify-center gap-3 py-16 text-center rounded-2xl border border-dashed border-border/60 bg-muted/10 px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.03]"
        />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/[0.08] ring-1 ring-primary/10">
          <TableProperties className="w-7 h-7 text-primary/50" />
        </div>
        <div className="relative">
          <p className="text-sm font-display font-semibold text-foreground">No data for this report</p>
          <p className="text-xs text-muted-foreground max-w-sm mt-1 leading-relaxed">
            Try widening your date range or clearing filters. Matching rows will appear here before export.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden bg-card shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border/50 bg-muted/20 px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Rows3 className="h-3.5 w-3.5 text-primary/70" />
          Data preview
        </div>
        <span className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground tabular-nums">{total}</span> total rows
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-primary/[0.04] border-b border-border/50">
              {columns.map((c) => (
                <th
                  key={c}
                  className="text-left px-4 py-3 font-semibold text-foreground/75 whitespace-nowrap text-[11px] uppercase tracking-wide"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {rows.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-primary/[0.02] transition-colors even:bg-muted/[0.15]"
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="px-4 py-2.5 text-foreground/85 whitespace-nowrap max-w-[200px] truncate"
                    title={String(cell ?? "")}
                  >
                    {cell ?? <span className="text-muted-foreground/50">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {total > PREVIEW_ROWS && (
        <div className="px-4 py-3 border-t border-border/50 bg-muted/20 text-xs text-muted-foreground flex items-center justify-between gap-2">
          <span>
            Showing first <span className="font-semibold text-foreground">{PREVIEW_ROWS}</span> of{" "}
            <span className="font-semibold text-foreground">{total}</span> rows
          </span>
          <span className="text-primary/80 font-medium">Export for full dataset</span>
        </div>
      )}
    </div>
  );
}

export { PREVIEW_ROWS };

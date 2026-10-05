import { Button } from "@/components/ui/button";
import { Loader2, FileSpreadsheet, FileText, Download } from "lucide-react";

interface ReportExportBarProps {
  loading: boolean;
  count: number;
  label: string;
  onXlsx: () => void;
  onPdf: () => void;
}

export function ReportExportBar({ loading, count, label, onXlsx, onPdf }: ReportExportBarProps) {
  const disabled = loading || count === 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 shadow-[0_4px_20px_rgba(53,88,114,0.08)]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-card to-accent/[0.04]" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(53,88,114,0.05) 1px, transparent 0)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-display font-semibold text-foreground">Export report</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {loading ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Preparing data…
                  </span>
                ) : count === 0 ? (
                  "Adjust filters until preview shows data, then export."
                ) : (
                  <>
                    <span className="font-semibold text-primary tabular-nums">{count}</span>{" "}
                    {label} ready to download
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <Button
            size="sm"
            variant="outline"
            className="rounded-xl gap-2 h-9 bg-card/80 backdrop-blur-sm border-border/60 hover:border-emerald-300/60 hover:bg-emerald-50/50"
            disabled={disabled}
            onClick={onXlsx}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Excel (.xlsx)
          </Button>
          <Button
            size="sm"
            className="rounded-xl gap-2 h-9 bg-gradient-to-r from-primary to-[hsl(207_38%_28%)] shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/25"
            disabled={disabled}
            onClick={onPdf}
          >
            <FileText className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}

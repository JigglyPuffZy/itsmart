import * as React from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const DateInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, disabled, ...props }, ref) => {
    return (
      <div
        className={cn(
          "date-input-wrapper relative inline-flex h-9 w-full min-w-[11.5rem] items-center overflow-hidden rounded-md border border-input bg-background shadow-sm transition-colors",
          "focus-within:ring-1 focus-within:ring-ring",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <input
          type="date"
          ref={ref}
          disabled={disabled}
          className={cn(
            "date-input h-full w-full min-w-0 border-0 bg-transparent py-1 pl-3 pr-10 text-sm shadow-none outline-none",
            "focus-visible:outline-none focus-visible:ring-0",
            "disabled:cursor-not-allowed"
          )}
          {...props}
        />
        <Calendar
          aria-hidden
          className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    );
  }
);
DateInput.displayName = "DateInput";

export { DateInput };

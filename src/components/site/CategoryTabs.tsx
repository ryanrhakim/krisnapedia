import { cn } from "@/lib/utils";

type CategoryTabsProps = {
  items: string[];
  active: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  variant?: "primary" | "secondary";
  className?: string;
};

/**
 * Horizontal pill-style tab list. Used twice on Manual Hub:
 * once for the main category, once for the sub-category.
 */
export function CategoryTabs({
  items,
  active,
  onChange,
  ariaLabel,
  variant = "primary",
  className,
}: CategoryTabsProps) {
  if (items.length === 0) return null;

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {items.map((item) => {
        const isActive = item === active;
        const label = item === "All" ? "Semua" : item;
        return (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item)}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all",
              variant === "primary" ? "h-10" : "h-9 text-[13px]",
              isActive
                ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

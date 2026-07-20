import { useT } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type DocStatus = "Terbaru" | "Aktif" | "Arsip" | string;

type Props = {
  status?: DocStatus;
  /** Hide when status = "Aktif" (default true for cards). */
  hideActive?: boolean;
  className?: string;
};

/**
 * Small semantic badge for document lifecycle status:
 * - Terbaru → primary (oranye KRISNA)
 * - Aktif   → emerald soft
 * - Arsip   → muted grey
 */
export function StatusBadge({ status, hideActive = false, className }: Props) {
  const { t } = useT();
  if (!status) return null;
  if (hideActive && status === "Aktif") return null;

  const styles: Record<string, string> = {
    Terbaru:
      "bg-primary/15 text-[var(--primary-deep)] dark:text-primary ring-1 ring-inset ring-primary/25",
    Aktif:
      "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 ring-1 ring-inset ring-emerald-500/25",
    Arsip:
      "bg-muted text-muted-foreground ring-1 ring-inset ring-border",
  };

  const labelMap: Record<string, string> = {
    Terbaru: t("status.baru"),
    Aktif: t("status.aktif"),
    Arsip: t("status.arsip"),
  };

  const cls = styles[status] ?? styles["Aktif"];
  const label = labelMap[status] ?? status;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur",
        cls,
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "Terbaru" && "bg-primary",
          status === "Aktif" && "bg-emerald-500",
          status === "Arsip" && "bg-muted-foreground/60",
        )}
      />
      {label}
    </span>
  );
}

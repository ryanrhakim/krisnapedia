/** Format an ISO date (YYYY-MM-DD) as "DD Mon YYYY" in Indonesian. */
const ID_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const ID_MONTHS_LONG = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function formatDate(iso: string | undefined | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${dd} ${ID_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function formatDateLong(iso: string | undefined | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const dd = d.getUTCDate();
  return `${dd} ${ID_MONTHS_LONG[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** Relative time in Bahasa Indonesia: "hari ini", "kemarin", "3 hari lalu", "2 minggu lalu", dst. */
export function formatRelative(iso: string | undefined | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const now = Date.now();
  const diffMs = now - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return formatDate(iso);
  if (diffDays === 0) return "hari ini";
  if (diffDays === 1) return "kemarin";
  if (diffDays < 7) return `${diffDays} hari lalu`;
  if (diffDays < 30) {
    const w = Math.floor(diffDays / 7);
    return `${w} minggu lalu`;
  }
  if (diffDays < 365) {
    const m = Math.floor(diffDays / 30);
    return `${m} bulan lalu`;
  }
  const y = Math.floor(diffDays / 365);
  return `${y} tahun lalu`;
}

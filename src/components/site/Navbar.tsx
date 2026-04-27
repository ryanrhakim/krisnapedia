import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Search, Menu, Sun, Moon, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", label: "English" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "ja", label: "日本語" },
  { code: "es", label: "Español" },
];

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as
      | "light"
      | "dark"
      | null;
    const initial = stored ?? "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    if (typeof window !== "undefined") localStorage.setItem("theme", next);
  };
  return { theme, toggle };
}

type NavLink = { label: string; href?: string; to?: string };

const links: NavLink[] = [
  { label: "Pustaka Regulasi", to: "/pustaka-regulasi" },
  { label: "Insight Hub", to: "/insight-hub" },
  { label: "Manual Hub", to: "/manual-hub" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [lang, setLang] = useState("en");
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
            <BookOpen className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            KRISNA<span className="text-primary">pedia</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) =>
            l.to ? (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-primary font-semibold" }}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => openSearch()}
            aria-label="Search (⌘K)"
            className="hidden items-center gap-2 md:inline-flex"
          >
            <Search className="h-4 w-4" />
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => openSearch()}
            aria-label="Search"
            className="md:hidden"
          >
            <Search className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Toggle theme"
            className="hidden md:inline-flex"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden items-center gap-1.5 md:inline-flex"
                aria-label="Switch language"
              >
                <Globe className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase">{lang}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {languages.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className="flex items-center justify-between"
                >
                  <span>{l.label}</span>
                  {lang === l.code && <Check className="h-4 w-4 text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

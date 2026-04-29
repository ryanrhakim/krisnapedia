import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Send } from "lucide-react";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";

type FooterLink = { label: string; to?: string; href?: string };

const cols: { title: string; links: FooterLink[] }[] = [
  {
    title: "Menu Utama",
    links: [
      { label: "Pustaka Regulasi", to: "/pustaka-regulasi" },
      { label: "Insight Hub", to: "/insight-hub" },
      { label: "Manual Hub", to: "/manual-hub" },
    ],
  },
  {
    title: "Dukungan",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Tentang KRISNApedia", href: "#" },
      { label: "Panduan Penggunaan", href: "#" },
      { label: "Hubungi Kami", href: "mailto:krisna@bappenas.go.id" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div className="flex items-center">
              <img src={logoLight} alt="KRISNApedia" className="block h-10 w-auto dark:hidden" />
              <img src={logoDark} alt="KRISNApedia" className="hidden h-10 w-auto dark:block" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Platform manajemen pengetahuan terintegrasi yang menghimpun
              regulasi, panduan teknis, dan materi pembelajaran untuk mendukung
              pemanfaatan Sistem Informasi KRISNA.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/krisna_systems/",
                  label: "Instagram",
                  external: true,
                },
                {
                  icon: Youtube,
                  href: "https://www.youtube.com/@SistemInformasiKRISNA",
                  label: "YouTube",
                  external: true,
                },
                {
                  icon: Send,
                  href: "#",
                  label: "Telegram",
                  external: false,
                },
              ].map(({ icon: Icon, href, label, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link
                        to={l.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 KRISNApedia. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privasi</a>
            <a href="#" className="hover:text-foreground">Ketentuan</a>
            <a href="#" className="hover:text-foreground">Kebijakan Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

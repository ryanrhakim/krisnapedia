import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqsQueryOptions } from "@/lib/sanity-queries";
import { PortableText } from "@/components/site/PortableText";

export function Faq() {
  const { data: all = [] } = useQuery(faqsQueryOptions());
  const faqs = all.slice(0, 6);

  return (
    <section id="faq" className="border-t border-border bg-background py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">FAQ</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Butuh bantuan? Temukan jawabannya di sini.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Informasi singkat mengenai penggunaan KRISNApedia, akses dokumen,
            serta pertanyaan umum terkait pemanfaatan Sistem Informasi KRISNA.
          </p>
        </div>

        <div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f._id} value={`item-${i}`} className="border-b border-border">
                <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold text-foreground hover:text-primary hover:no-underline">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                  <PortableText value={f.answer} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 flex justify-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-[var(--primary-soft)] px-6 py-3 text-sm font-semibold text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--shadow-soft)]"
            >
              Lihat FAQ Lainnya <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

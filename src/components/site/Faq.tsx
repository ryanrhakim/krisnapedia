import { Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is KRISNApedia?",
    a: "KRISNApedia is an integrated document repository and knowledge management system that centralizes manuals, insights, and operational documents into a single searchable platform.",
  },
  {
    q: "Who is it built for?",
    a: "Teams of any size that need to organize internal knowledge — from product documentation and SOPs to research insights and reference manuals.",
  },
  {
    q: "Can I import existing documents?",
    a: "Yes. KRISNApedia supports bulk import from Markdown, PDF, Word, Confluence, Notion, and Google Docs, while preserving structure and metadata.",
  },
  {
    q: "How does search work?",
    a: "Our search combines full-text indexing with semantic AI retrieval, so you can find content by meaning even when exact keywords don't match.",
  },
  {
    q: "Is my data secure?",
    a: "All content is encrypted at rest and in transit. Granular permissions, SSO, and audit logs are available on every workspace.",
  },
  {
    q: "Do you offer an API?",
    a: "Yes — a REST API and webhooks let you integrate KRISNApedia with your existing tools and workflows.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-border bg-background py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            FAQ
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Questions, answered.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know about KRISNApedia. Still curious? Reach
            out and we'll get back within a day.
          </p>
          <a
            href="#"
            className="mt-6 inline-flex items-center text-sm font-semibold text-primary hover:text-[var(--primary-deep)]"
          >
            Contact support →
          </a>
        </div>

        <div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-border"
              >
                <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold text-foreground hover:text-primary hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 flex justify-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-[var(--primary-soft)] px-6 py-3 text-sm font-semibold text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--shadow-soft)]"
            >
              More FAQ
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

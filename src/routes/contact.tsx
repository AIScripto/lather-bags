import { createFileRoute } from "@tanstack/react-router";
import craft from "@/assets/craft.jpg";
import { Parallax, Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Hollow & Hide" },
      { name: "description", content: "Visit the workshop or write to the Hollow & Hide team." },
      { property: "og:title", content: "Contact — Hollow & Hide" },
      { property: "og:description", content: "Get in touch with our workshop." },
    ],
  }),
  component: Contact,
});

const faqs = [
  [
    "How long does shipping take?",
    "Orders leave the workshop within two days and arrive in 3–7 working days.",
  ],
  [
    "Can I visit the workshop?",
    "Yes. Drop in Monday to Saturday, or book a guided tour on the first Friday of each month.",
  ],
  [
    "How do lifetime repairs work?",
    "Write to us with a photo. We'll send a prepaid label and return your bag mended, free.",
  ],
];

function Contact() {
  return (
    <>
      <section className="mx-auto max-w-[1500px] px-6 pb-16 pt-40 md:px-10">
        <p className="eyebrow animate-rise text-primary">Contact</p>
        <h1 className="mt-4 animate-rise font-display text-6xl leading-none [animation-delay:120ms] md:text-9xl">
          Say <em className="text-primary">hello</em>.
        </h1>
      </section>
      <section className="mx-auto grid max-w-[1500px] gap-12 px-6 pb-28 md:grid-cols-2 md:gap-16 md:px-10">
        <div>
          <Reveal className="grid gap-8 border-y py-10 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            {[
              ["Workshop", "12 Tanner's Lane, Old Town"],
              ["Email", "hello@hollowandhide.example"],
              ["Hours", "Mon–Sat, 10:00–18:00"],
            ].map(([h, t]) => (
              <div key={h}>
                <p className="eyebrow text-primary">{h}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t}</p>
              </div>
            ))}
          </Reveal>
          <Parallax src={craft} alt="Inside the workshop" className="mt-10 aspect-[4/3]" />
        </div>
        <Reveal delay={150}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8 bg-card p-8 md:p-12">
            <h2 className="font-display text-3xl md:text-4xl">
              Write to the <em>workshop</em>
            </h2>
            {["Name", "Email", "Order number (optional)"].map((l) => (
              <label key={l} className="block">
                <span className="eyebrow text-muted-foreground">{l}</span>
                <input className="mt-2 w-full border-b bg-transparent py-3 outline-none transition-colors focus:border-primary" />
              </label>
            ))}
            <label className="block">
              <span className="eyebrow text-muted-foreground">Message</span>
              <textarea
                rows={4}
                className="mt-2 w-full resize-none border-b bg-transparent py-3 outline-none transition-colors focus:border-primary"
              />
            </label>
            <button className="w-full bg-primary py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-1">
              Send message
            </button>
          </form>
        </Reveal>
      </section>
      <section className="border-t bg-card px-6 py-28 md:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="eyebrow text-primary">Questions</p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">
              Good to <em>know</em>.
            </h2>
          </Reveal>
          <div className="border-b">
            {faqs.map(([q, a], i) => (
              <Reveal key={q} delay={i * 100}>
                <details className="group border-t py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-display text-2xl">
                    {q}
                    <span className="text-primary transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

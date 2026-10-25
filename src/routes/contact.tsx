import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import craft from "@/assets/craft.jpg";
import { Parallax, Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

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
    "How long does delivery take?",
    "Orders leave the workshop within two working days and arrive in 3–7 working days after that. Shipping is free and tracked.",
  ],
  [
    "Will I pay import duty?",
    "Prices are in US dollars and include shipping. Depending on your country, local import duty may be collected on delivery; the carrier will tell you the amount before it arrives.",
  ],
  [
    "Can I return a bag?",
    "Yes, within 60 days, for any reason, as long as it hasn't been monogrammed. We send a prepaid label.",
  ],
  [
    "How do lifetime repairs work?",
    "Write to us with a photo. We send a prepaid label and return your bag mended, free, usually within two weeks.",
  ],
  [
    "Will my laptop fit?",
    "Every product page lists the exact dimensions and the largest laptop that fits. If you're between sizes, send us the model and we'll check.",
  ],
  [
    "Can I visit the workshop?",
    "Yes. Drop in Monday to Saturday, or book a guided tour on the first Friday of each month.",
  ],
];

type Field = "name" | "email" | "message";
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function Contact() {
  const [values, setValues] = useState({ name: "", email: "", order: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) next.name = "Tell us what to call you.";
    if (!emailOk(values.email))
      next.email = "Enter an email we can reply to, like name@example.com.";
    if (values.message.trim().length < 10)
      next.message = "Add a little more detail so we can help.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  const field = (key: Field | "order", label: string, multiline = false) => {
    const error = key === "order" ? undefined : errors[key];
    const props = {
      id: `contact-${key}`,
      value: values[key],
      onChange: (e: { target: { value: string } }) => {
        setValues((v) => ({ ...v, [key]: e.target.value }));
        if (error) setErrors((x) => ({ ...x, [key]: undefined }));
      },
      "aria-invalid": !!error,
      "aria-describedby": error ? `contact-${key}-error` : undefined,
      className: cn(
        "mt-2 w-full border-b bg-transparent py-3 outline-none transition-colors focus:border-primary",
        error && "border-destructive",
      ),
    };
    return (
      <div>
        <label htmlFor={props.id} className="text-sm font-medium">
          {label}
        </label>
        {multiline ? (
          <textarea rows={4} {...props} className={cn(props.className, "resize-none")} />
        ) : (
          <input
            type={key === "email" ? "email" : "text"}
            autoComplete={key === "email" ? "email" : key === "name" ? "name" : "off"}
            {...props}
          />
        )}
        {error && (
          <p id={`contact-${key}-error`} className="mt-2 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <section className="mx-auto max-w-[1500px] px-4 pb-16 pt-32 md:px-10 md:pt-40">
        <h1 className="animate-rise font-display text-6xl leading-none md:text-8xl">
          Write to the workshop
        </h1>
        <p className="mt-5 max-w-xl animate-rise text-lg text-muted-foreground [animation-delay:120ms]">
          Questions about sizing, a repair, or a bag you'd like made. A maker replies within one
          working day.
        </p>
      </section>
      <section className="mx-auto grid max-w-[1500px] gap-12 px-4 pb-28 md:grid-cols-2 md:gap-16 md:px-10">
        <div>
          <Reveal className="grid gap-8 border-y py-10 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            {[
              ["Workshop", "12 Tanner's Lane, Old Town"],
              ["Email", "hello@hollowandhide.example"],
              ["Hours", "Mon–Sat, 10:00–18:00"],
            ].map(([h, t]) => (
              <div key={h}>
                <p className="text-sm text-muted-foreground">{h}</p>
                <p className="mt-1">{t}</p>
              </div>
            ))}
          </Reveal>
          <Parallax
            src={craft}
            alt="Inside the workshop"
            className="mt-10 aspect-[4/3] rounded-2xl"
            speed={0.06}
          />
        </div>
        <Reveal delay={150}>
          {sent ? (
            <div className="rounded-2xl bg-card p-8 md:p-12" role="status">
              <h2 className="font-display text-4xl">Thank you, {values.name.split(" ")[0]}.</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Your note is with the workshop. A maker will reply to {values.email} within one
                working day.
              </p>
            </div>
          ) : (
            <form
              onSubmit={submit}
              noValidate
              className="space-y-8 rounded-2xl bg-card p-8 md:p-12"
            >
              {field("name", "Name")}
              {field("email", "Email")}
              {field("order", "Order number (optional)")}
              {field("message", "Message", true)}
              <button className="min-h-12 w-full rounded-full bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                Send message
              </button>
            </form>
          )}
        </Reveal>
      </section>
      <section className="border-t bg-card px-4 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="font-display text-5xl md:text-6xl">Before you ask</h2>
          </Reveal>
          <div className="border-b">
            {faqs.map(([q, a]) => (
              <details key={q} className="group border-t py-6">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl">
                  {q}
                  <Plus className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-4 max-w-[60ch] leading-relaxed text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

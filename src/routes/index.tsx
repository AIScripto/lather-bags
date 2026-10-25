import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, ShieldCheck, Sparkles, Globe, RotateCcw } from "lucide-react";
import hero from "@/assets/hero.jpg";
import craft from "@/assets/craft.jpg";
import lifestyle from "@/assets/lifestyle.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Marquee, Parallax, Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hollow & Hide — Handcrafted Leather Bags" },
      {
        name: "description",
        content:
          "Full-grain leather satchels, briefcases and travel bags, cut and stitched by hand.",
      },
      { property: "og:title", content: "Hollow & Hide — Handcrafted Leather Bags" },
      { property: "og:description", content: "Full-grain leather bags built to outlast trends." },
    ],
  }),
  component: Index,
});

function Index() {
  const [monogramInitials, setMonogramInitials] = useState("H.H");
  const [foilStyle, setFoilStyle] = useState<"gold" | "silver" | "blind">("gold");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleInitialsChange = (val: string) => {
    const clean = val
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(0, 3);
    if (!clean) {
      setMonogramInitials("");
      return;
    }
    setMonogramInitials(clean.split("").join("."));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[660px] overflow-hidden">
        <img
          src={hero}
          alt="Cognac leather satchel on stone in morning sunlight"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full animate-in zoom-in-105 object-cover duration-[2500ms]"
        />
        {/* Calibrated lighting scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/10" />
        <div className="relative flex h-full flex-col justify-end px-6 pb-20 text-ink-foreground md:px-12 lg:px-16">
          <p className="eyebrow w-fit rounded-full border border-ink-foreground/25 bg-ink/50 px-4 py-1.5 backdrop-blur-md shadow-sm">
            Autumn / Winter 2026 Collection
          </p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.94] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl text-balance">
            Made to <em className="text-accent">age</em> with you.
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/bags"
              className="rounded-full bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Shop the collection
            </Link>
            <Link to="/about" className="link-line text-sm tracking-wide">
              Discover our craft →
            </Link>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Full-grain bridle leather",
          "Hand saddle-stitched",
          "Solid cast brass",
          "Lifetime complimentary repairs",
          "Crafted in small batches",
        ]}
      />

      {/* Featured Collection */}
      <section className="mx-auto max-w-[1500px] px-6 py-20 md:py-28 md:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl tracking-tight">
              Carried <em>daily</em>.
            </h2>
            <p className="mt-2 text-base text-muted-foreground reading-measure">
              Signature full-grain silhouettes designed for decades of living.
            </p>
          </div>
          <Link to="/bags" className="link-line text-sm font-medium tracking-wide">
            View all {products.length} bags →
          </Link>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 120} className="h-full">
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Artisan Craft Section */}
      <section className="grid items-center gap-12 border-y bg-card/60 px-6 py-20 md:grid-cols-2 md:px-10 lg:gap-16">
        <Parallax
          src={craft}
          alt="Craftsman hand-stitching full-grain leather"
          className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl"
        />
        <Reveal className="max-w-xl">
          <span className="eyebrow text-primary">Bench Discipline</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
            Eleven hours. <em>One</em> pair of hands.
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground reading-measure">
            Every bag is cut, beveled, edged, and saddle-stitched by a single artisan from start to
            finish, then signed on the interior hide. No assembly lines and no shortcuts—just
            enduring bench craft that tells your story.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border/50 pt-8">
            {[
              ["38", "Years of Craft"],
              ["2,400", "Hand Stitches"],
              ["∞", "Lifetime Guarantee"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-4xl sm:text-5xl font-semibold text-primary tnum">
                  {n}
                </p>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Atmospheric Editorial Breather */}
      <section className="relative h-[75vh] min-h-[500px] overflow-hidden">
        <Parallax
          src={lifestyle}
          alt="Walking with an aged leather satchel"
          className="absolute inset-0"
          speed={0.22}
        />
        <div className="absolute inset-0 bg-ink/45 backdrop-blur-[0.5px]" />
        <Reveal className="relative flex h-full flex-col items-center justify-center px-6 text-center text-ink-foreground">
          <h2 className="max-w-4xl font-display text-5xl italic sm:text-7xl md:text-8xl tracking-tight text-balance">
            The long way home.
          </h2>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-ink-foreground/90 reading-measure opacity-90">
            Full-grain leather that absorbs every journey, sunlight, and rain into a rich caramel
            patina.
          </p>
          <Link
            to="/bags"
            className="mt-10 rounded-full border border-ink-foreground/70 px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-all hover:bg-ink-foreground hover:text-ink hover:scale-105"
          >
            Explore travel pieces
          </Link>
        </Reveal>
      </section>

      {/* Asymmetric Category Showcase */}
      <section className="mx-auto max-w-[1500px] px-6 py-20 md:py-28 md:px-10">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl tracking-tight">
            Find your <em>carry</em>.
          </h2>
          <p className="mt-2 text-base text-muted-foreground reading-measure">
            Tailored for the daily commute, the courthouse, or the open road.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-4 md:grid-rows-2">
          {[
            { p: products[0], cls: "md:col-span-2 md:row-span-2 aspect-[4/5] md:aspect-auto" },
            { p: products[3], cls: "aspect-[4/5]" },
            { p: products[5], cls: "aspect-[4/5]" },
            { p: products[2], cls: "aspect-[4/5]" },
            { p: products[4], cls: "aspect-[4/5]" },
          ].map(({ p, cls }, i) => (
            <Reveal key={p!.slug} delay={i * 90} className={cls}>
              <Link
                to="/bags"
                className="group relative block h-full overflow-hidden rounded-2xl border border-border/50 bg-card shadow-md transition-all duration-500 hover:border-primary/50 hover:shadow-xl"
              >
                <img
                  src={p!.image}
                  alt={p!.alt}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                <div className="absolute bottom-6 left-6 text-ink-foreground">
                  <p className="font-display text-2xl sm:text-3xl tracking-tight">{p!.category}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-accent font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Explore collection →
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The Workshop Guarantee & Manifesto */}
      <section className="border-y bg-card/40 py-20">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10">
          <div className="mb-14 text-center">
            <span className="eyebrow text-primary">Uncompromising Quality</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl italic tracking-tight">
              The Workshop Standard
            </h2>
            <p className="mt-3 text-base text-muted-foreground reading-measure mx-auto">
              The foundational benchmarks built into every hide we select, cut, and bevel.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Lifetime Repairs",
                desc: "We mend what we make, free of charge, for the life of the owner. Any stitch, rivet, or strap.",
                badge: "Lifetime Guarantee",
              },
              {
                icon: Sparkles,
                title: "Custom Monogram",
                desc: "Complimentary heat-stamped initials debossed in 24k gold foil, polished silver, or blind.",
                badge: "Complimentary",
              },
              {
                icon: Globe,
                title: "Worldwide Dispatch",
                desc: "Carbon-neutral shipping direct from our workshop bench to your door, fully tracked.",
                badge: "Carbon Neutral",
              },
              {
                icon: RotateCcw,
                title: "60-Day Trial",
                desc: "Live with the leather, watch the grain settle, and ensure it fits your life before committing.",
                badge: "Risk-Free Trial",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                  <span className="mt-auto pt-6 text-[11px] font-semibold uppercase tracking-widest text-primary/80">
                    {item.badge}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto max-w-[1500px] px-6 py-20 md:py-28 md:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl tracking-tight">
              New <em>arrivals</em>.
            </h2>
            <p className="mt-2 text-base text-muted-foreground reading-measure">
              Fresh batches freshly conditioned and signed by the bench.
            </p>
          </div>
          <Link to="/bags" className="link-line text-sm font-medium tracking-wide">
            Shop new batch →
          </Link>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 120} className="h-full">
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Customer Words (Refined with International Client Citations) */}
      <section className="grain bg-ink px-6 py-24 text-ink-foreground md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <span className="eyebrow text-accent">Client Testimonials</span>
          <h2 className="mt-3 font-display text-4xl italic sm:text-5xl text-accent">
            Words from the field
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              [
                "Ten years, three continents, and it only looks better with each flight. The single best investment piece I own.",
                "Amelia R.",
                "Heritage Satchel",
                "London, UK",
              ],
              [
                "You can feel the twelve hours of hand-stitching the moment you unbox it. The brass hardware patinas beautifully.",
                "Daniel K.",
                "Barrister Briefcase",
                "Zurich, Switzerland",
              ],
              [
                "They repaired a shoulder strap I broke on a hike, for free, within four days. Customers for life.",
                "Sana M.",
                "The Weekender Duffel",
                "Tokyo, Japan",
              ],
            ].map(([q, n, b, city], i) => (
              <Reveal
                key={n}
                delay={i * 150}
                className="flex flex-col rounded-2xl border border-ink-foreground/15 bg-ink/50 p-8 backdrop-blur-xs"
              >
                <div className="flex items-center gap-1 text-accent" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 font-display text-2xl italic leading-snug sm:text-3xl text-balance">
                  “{q}”
                </p>
                <div className="mt-auto border-t border-ink-foreground/15 pt-5">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-semibold tracking-wider uppercase text-ink-foreground">
                      {n}
                    </span>
                    <span className="text-accent/90">{city}</span>
                  </div>
                  <p className="mt-1 text-[11px] opacity-60">{b} · Verified Owner</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Monogram Stamping Studio ("Make it yours") */}
      <section className="mx-auto max-w-[1500px] px-6 py-20 md:py-28 md:px-10">
        <div className="grid items-center gap-12 lg:gap-16 md:grid-cols-2">
          <Reveal>
            <span className="eyebrow text-primary">Personalized Atelier Craft</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
              The <em>monogram</em> studio.
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground reading-measure">
              Personalize your piece with up to three initials, individually heated and debossed by
              hand into the leather grain. Complimentary on every order.
            </p>

            {/* Interactive Customizer Controls */}
            <div className="mt-8 space-y-6 rounded-2xl border border-border/60 bg-card p-7 shadow-xs">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Initials (up to 3 letters)
                </label>
                <input
                  type="text"
                  maxLength={3}
                  value={monogramInitials.replace(/\./g, "")}
                  onChange={(e) => handleInitialsChange(e.target.value)}
                  placeholder="e.g. AR"
                  aria-label="Enter your initials for monogram preview"
                  className="mt-2 w-full rounded-xl border border-border/80 bg-background px-4 py-3.5 text-xl font-semibold tracking-widest uppercase outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Stamping Finish
                </label>
                <div className="mt-2 flex gap-3">
                  {[
                    {
                      id: "gold",
                      label: "24k Gold Foil",
                      cls: "bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 text-stone-900 font-semibold",
                    },
                    {
                      id: "silver",
                      label: "Polished Silver",
                      cls: "bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 text-stone-900 font-semibold",
                    },
                    {
                      id: "blind",
                      label: "Blind Deboss",
                      cls: "bg-ink/10 text-foreground font-semibold",
                    },
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setFoilStyle(style.id as "gold" | "silver" | "blind")}
                      className={cn(
                        "flex-1 rounded-xl border px-3.5 py-2.5 text-xs transition-all shadow-xs",
                        style.cls,
                        foilStyle === style.id
                          ? "ring-2 ring-primary ring-offset-2 scale-[1.02]"
                          : "opacity-75 hover:opacity-100",
                      )}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Deboss Leather Tag Preview */}
              <div className="mt-6 flex flex-col items-center justify-center rounded-2xl bg-ink p-8 text-center text-ink-foreground shadow-inner">
                <span className="text-[11px] uppercase tracking-widest opacity-60">
                  Live Workshop Stamp Preview
                </span>
                <div className="relative mt-4 flex h-26 w-48 items-center justify-center rounded-xl border border-amber-900/40 bg-gradient-to-br from-[#4a2e1b] to-[#2c180b] shadow-2xl">
                  {/* Decorative Stitch Border */}
                  <div className="absolute inset-1.5 rounded-lg border border-dashed border-amber-200/25" />
                  <span
                    className={cn(
                      "font-display text-4xl font-bold tracking-widest transition-all",
                      foilStyle === "gold" &&
                        "text-[#f8df8d] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] drop-shadow-[0_0_8px_rgba(245,208,97,0.4)]",
                      foilStyle === "silver" &&
                        "text-[#e2e8f0] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] drop-shadow-[0_0_8px_rgba(226,232,240,0.4)]",
                      foilStyle === "blind" &&
                        "text-[#1a0e06] drop-shadow-[0_-1px_1px_rgba(255,255,255,0.18)] drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]",
                    )}
                  >
                    {monogramInitials || "H.H"}
                  </span>
                </div>
                <p className="mt-3.5 text-xs opacity-65">
                  Hand-stamped in 48 hours · Free with any bag purchase
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-border/50 shadow-2xl">
              <img
                src={products[1]!.image}
                alt="Dark chestnut leather briefcase with solid brass hardware"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Press Quotations */}
      <section className="border-t border-border/50 px-6 py-20 md:px-10">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Recognized by international publications
        </p>
        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-x-14 gap-y-6 font-display text-2xl italic opacity-75 md:text-3xl">
          {[
            "The Gentleman's Post",
            "Atelier Weekly",
            "Carry Magazine",
            "Field & Form",
            "The Courier Review",
          ].map((n) => (
            <span key={n} className="transition-opacity hover:opacity-100">
              {n}
            </span>
          ))}
        </div>
      </section>

      {/* Workshop Letters Newsletter */}
      <section className="bg-primary px-6 py-24 text-primary-foreground md:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow text-primary-foreground/75">Private Dispatches</span>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl md:text-7xl">
            Letters from the <em>workshop</em>.
          </h2>
          <p className="mt-6 text-base sm:text-lg opacity-90 reading-measure mx-auto">
            New batch announcements, leather conditioning essays, and tales from the bench. Once a
            month, never more.
          </p>
          {newsletterSubscribed ? (
            <div className="mx-auto mt-8 rounded-xl bg-primary-foreground/15 p-4 text-sm font-medium backdrop-blur-xs">
              ✓ Thank you. You have been added to our private workshop ledger.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail) setNewsletterSubscribed(true);
              }}
              className="mx-auto mt-10 flex max-w-lg border-b border-primary-foreground/50 pb-1.5"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address for workshop newsletter"
                className="flex-1 bg-transparent py-4 text-base text-primary-foreground outline-none placeholder:text-primary-foreground/60"
              />
              <button
                type="submit"
                className="eyebrow px-4 transition-transform hover:translate-x-1"
              >
                Join Ledger →
              </button>
            </form>
          )}
          <p className="mt-4 text-xs opacity-65">
            Carbon-neutral delivery updates · No promotional spam · Unsubscribe anytime
          </p>
        </Reveal>
      </section>
    </>
  );
}

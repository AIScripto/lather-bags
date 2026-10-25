import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef } from "react";
import hero from "@/assets/hero.jpg";
import craft from "@/assets/craft.jpg";
import lifestyle from "@/assets/lifestyle.jpg";
import briefcase from "@/assets/bag-briefcase.jpg";
import tote from "@/assets/bag-tote.jpg";
import duffel from "@/assets/bag-duffel.jpg";
import { collections, filterProducts, findProduct, type Collection } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Marquee, Parallax, Reveal } from "@/components/Reveal";

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

const mostCarried = ["the-heritage-satchel", "the-barrister-briefcase", "the-market-tote"]
  .map(findProduct)
  .filter((p) => !!p);

const useTiles: { id: Collection; image: string; alt: string }[] = [
  { id: "work", image: briefcase, alt: "Chestnut leather briefcase" },
  { id: "everyday", image: tote, alt: "Tan leather tote" },
  { id: "travel", image: duffel, alt: "Oxblood leather holdall" },
];

const testimonials = [
  {
    quote:
      "Ten years, three continents, and it only looks better with each flight. The best thing I own.",
    name: "Amelia R.",
    piece: "Heritage Satchel",
    city: "London",
    tenure: "Carried 10 Years",
  },
  {
    quote:
      "You can feel the eleven hours of hand-stitching the moment you unbox it. The brass has darkened beautifully.",
    name: "Daniel K.",
    piece: "Barrister Briefcase",
    city: "Zurich",
    tenure: "Carried 3 Years",
  },
  {
    quote:
      "They repaired a shoulder strap I broke on a hike, free, within four days. Customers for life.",
    name: "Sana M.",
    piece: "The Weekender",
    city: "Tokyo",
    tenure: "Restored in 2024",
  },
];

function Index() {
  const newPieces = filterProducts("new").filter((p) => p.collection !== "small-goods");
  const seasonScrollRef = useRef<HTMLDivElement>(null);

  const scrollSeason = (offset: number) => {
    seasonScrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section — full visible screen, elegant atelier kicker & trust anchors */}
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <img
          src={hero}
          alt="Cognac leather satchel on stone in morning sunlight"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full animate-in object-cover duration-[2500ms] zoom-in-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/20" />
        <div className="relative mx-auto flex h-full max-w-[1500px] flex-col justify-end px-4 pb-14 text-ink-foreground md:px-10 md:pb-16 lg:pb-20">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-ink-foreground/20 bg-ink/40 px-3.5 py-1 text-xs uppercase tracking-widest text-accent backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span>Cornwall Atelier · Est. 2014</span>
          </div>

          <h1 className="max-w-4xl animate-rise font-display text-5xl leading-[0.95] sm:text-7xl md:text-8xl">
            Made to <em className="text-accent font-normal">age</em> with you.
          </h1>
          <p className="mt-5 max-w-xl animate-rise text-base sm:text-lg text-ink-foreground/85 [animation-delay:120ms]">
            Full-grain bridle leather, cut and saddle-stitched by one pair of hands, then mended
            free for as long as you carry it.
          </p>

          <div className="mt-7 flex animate-rise flex-wrap items-center gap-x-8 gap-y-4 [animation-delay:220ms]">
            <Link
              to="/bags"
              className="inline-flex min-h-12 items-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Shop the collection
            </Link>
            <Link to="/bags" search={{ collection: "new" }} className="link-line text-sm text-ink-foreground">
              New this season: six new bags
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink-foreground/15 pt-5 text-xs text-ink-foreground/75 [animation-delay:300ms]">
            <span className="inline-flex items-center gap-2">
              <span className="text-accent">✦</span> English vegetable-tanned hide
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="text-accent">✦</span> Two-needle saddle stitch
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="text-accent">✦</span> Free lifetime repairs
            </span>
          </div>
        </div>
      </section>

      {/* Craftsmanship Marquee */}
      <Marquee
        items={[
          "Full-grain bridle leather",
          "Hand saddle-stitched",
          "Solid cast brass",
          "Repairs free for life",
          "Signed by the maker",
        ]}
      />

      {/* Most Carried — calibrated padding */}
      <section className="mx-auto max-w-[1500px] px-4 py-14 md:px-10 md:py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-medium">Curated Essentials</p>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl md:text-6xl">Most carried</h2>
          </div>
          <Link to="/bags" className="link-line inline-flex items-center gap-2 text-sm">
            All {filterProducts().length} pieces <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mostCarried.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90} className="h-full">
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Shop by Occasion — tightened padding and enriched small-goods banner */}
      <section className="mx-auto max-w-[1500px] px-4 pb-14 md:px-10 md:pb-20">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-primary font-medium">Daily Rituals</p>
          <h2 className="mt-1 font-display text-4xl sm:text-5xl md:text-6xl">Shop by the day ahead</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {useTiles.map((t, i) => {
            const c = collections.find((x) => x.id === t.id)!;
            return (
              <Reveal key={t.id} delay={i * 90}>
                <Link
                  to="/bags"
                  search={{ collection: t.id }}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-border/40 shadow-sm"
                >
                  <img
                    src={t.image}
                    alt={t.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-ink-foreground">
                    <p className="font-display text-3xl sm:text-4xl">{c.label}</p>
                    <p className="mt-1 max-w-xs text-sm text-ink-foreground/85">{c.line}</p>
                    <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                      {filterProducts(t.id).length} pieces
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-accent" />
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Integrated Small Goods banner with product categories */}
        <Reveal className="mt-4">
          <Link
            to="/bags"
            search={{ collection: "small-goods" }}
            className="group flex min-h-16 flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card/60 p-5 transition-[border-color,background-color] hover:border-primary/50 hover:bg-card"
          >
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="font-display text-2xl">Small goods</span>
              <span className="hidden text-sm text-muted-foreground lg:inline">
                Card holders, valet trays, luggage tags &amp; key clips, cut from hide offcuts
              </span>
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary">Wallets</span>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary">Valet Trays</span>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary">Key Clips</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              Explore 4 pieces
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </section>

      {/* New this Season — tightened padding with interactive scroll buttons */}
      <section className="border-y bg-card/50 py-14 md:py-20">
        <div className="mx-auto max-w-[1500px] px-4 md:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-medium">Pattern Table</p>
              <h2 className="mt-1 font-display text-4xl sm:text-5xl md:text-6xl">New this season</h2>
              <p className="mt-2.5 max-w-xl text-sm sm:text-base text-muted-foreground">
                Six new bags, shown here as drawings from the pattern table while the studio
                photographs them. Pick a shade on each page to see it in your leather.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 mr-2">
                <button
                  type="button"
                  aria-label="Scroll left"
                  onClick={() => scrollSeason(-360)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border/80 bg-background transition-colors hover:border-primary hover:text-primary"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Scroll right"
                  onClick={() => scrollSeason(360)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border/80 bg-background transition-colors hover:border-primary hover:text-primary"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <Link
                to="/bags"
                search={{ collection: "new" }}
                className="link-line inline-flex items-center gap-2 text-sm"
              >
                See all new pieces <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
        <div
          ref={seasonScrollRef}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 md:px-10 [scroll-padding-inline:1rem] md:[scroll-padding-inline:2.5rem]"
          aria-label="New this season"
        >
          {newPieces.map((p) => (
            <div key={p.slug} className="w-[78vw] max-w-[340px] shrink-0 snap-start">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Craft Story — filled the 450px asymmetry gap with Atelier Craftsmanship cards */}
      <section className="mx-auto grid max-w-[1500px] items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-10 md:py-22 lg:gap-16">
        <Parallax
          src={craft}
          alt="Craftsman hand-stitching full-grain leather"
          className="aspect-[4/5] rounded-2xl shadow-sm"
          speed={0.08}
        />
        <Reveal className="max-w-xl">
          <p className="text-xs uppercase tracking-widest text-primary font-medium">Cornwall Atelier</p>
          <h2 className="mt-1 font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            Eleven hours. One pair of hands.
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
            Every bag is cut, bevelled, edged and saddle-stitched by a single artisan from start to
            finish, then signed on the inside. Two needles pass through every hole, so if one stitch
            ever wears through, the seam still holds.
          </p>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-foreground">
            If anything ever breaks, send it back. Every bag we have ever made is mended free, for
            as long as its owner carries it.
          </p>

          {/* Rebalanced Content: Atelier Standards Grid */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-border/60 pt-6">
            <div>
              <p className="font-display text-2xl text-primary">2 Needles</p>
              <p className="mt-1 text-xs text-muted-foreground leading-snug">
                Unravel-proof saddle stitch through every hole
              </p>
            </div>
            <div>
              <p className="font-display text-2xl text-primary">3.5 mm</p>
              <p className="mt-1 text-xs text-muted-foreground leading-snug">
                Full-grain bridle hide from English tanneries
              </p>
            </div>
            <div>
              <p className="font-display text-2xl text-primary">Solid Brass</p>
              <p className="mt-1 text-xs text-muted-foreground leading-snug">
                Sand-cast hardware, unlacquered for natural patina
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-card/60 px-4 py-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="text-sm text-primary">✍︎</span>
              <span>Signed by the maker inside every finished piece.</span>
            </span>
            <Link to="/about" className="link-line inline-flex items-center gap-1.5 font-medium text-foreground shrink-0">
              How a bag is made <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Travel Parallax Banner — tightened height for balanced cadence */}
      <section className="relative h-[56svh] min-h-[400px] max-h-[560px] overflow-hidden">
        <Parallax
          src={lifestyle}
          alt="Walking with an aged leather satchel"
          className="absolute inset-0"
          speed={0.18}
        />
        <div className="absolute inset-0 bg-ink/50" />
        <Reveal className="relative flex h-full flex-col items-center justify-center px-4 text-center text-ink-foreground">
          <p className="text-xs uppercase tracking-widest text-accent font-medium">Travel &amp; Weekend</p>
          <h2 className="mt-2 max-w-4xl font-display text-4xl italic sm:text-6xl md:text-7xl">
            The long way home.
          </h2>
          <p className="mt-4 max-w-lg text-base sm:text-lg text-ink-foreground/90">
            Holdalls sized for one night, two days or a long week across the continents.
          </p>
          <Link
            to="/bags"
            search={{ collection: "travel" }}
            className="mt-7 inline-flex min-h-12 items-center rounded-full border border-ink-foreground/70 px-8 text-sm font-medium transition-colors hover:bg-ink-foreground hover:text-ink"
          >
            Shop travel pieces
          </Link>
        </Reveal>
      </section>

      {/* Testimonials — elevated with stars & provenance tenure */}
      <section className="grain bg-ink px-4 py-16 text-ink-foreground md:px-10 md:py-22">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-medium">Owner Dispatches</p>
              <h2 className="mt-1 font-display text-4xl text-accent sm:text-5xl md:text-6xl">Words from the field</h2>
            </div>
            <p className="text-xs text-ink-foreground/70">Verified long-term carriers</p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-8">
            {testimonials.map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 120}
                className="flex flex-col border-t border-ink-foreground/20 pt-6"
              >
                <div className="flex items-center gap-1 text-accent mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="font-display text-xl leading-snug sm:text-2xl text-ink-foreground">
                  “{t.quote}”
                </blockquote>
                <div className="mt-6 flex items-center justify-between text-xs text-ink-foreground/75">
                  <p>
                    <span className="font-medium text-ink-foreground">{t.name}</span>, {t.city} · {t.piece}
                  </p>
                  <span className="rounded-full bg-ink-foreground/10 px-2 py-0.5 text-[11px] text-accent">
                    {t.tenure}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
  },
  {
    quote:
      "You can feel the eleven hours of hand-stitching the moment you unbox it. The brass has darkened beautifully.",
    name: "Daniel K.",
    piece: "Barrister Briefcase",
    city: "Zurich",
  },
  {
    quote:
      "They repaired a shoulder strap I broke on a hike, free, within four days. Customers for life.",
    name: "Sana M.",
    piece: "The Weekender",
    city: "Tokyo",
  },
];

function Index() {
  const newPieces = filterProducts("new").filter((p) => p.collection !== "small-goods");

  return (
    <>
      <section className="relative h-[100svh] min-h-[620px] overflow-hidden">
        <img
          src={hero}
          alt="Cognac leather satchel on stone in morning sunlight"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full animate-in object-cover duration-[2500ms] zoom-in-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/20" />
        <div className="relative mx-auto flex h-full max-w-[1500px] flex-col justify-end px-4 pb-16 text-ink-foreground md:px-10 md:pb-20">
          <h1 className="max-w-4xl animate-rise font-display text-6xl leading-[0.95] sm:text-7xl md:text-8xl">
            Made to <em className="text-accent">age</em> with you.
          </h1>
          <p className="mt-6 max-w-lg animate-rise text-lg text-ink-foreground/85 [animation-delay:120ms]">
            Full-grain bridle leather, cut and saddle-stitched by one pair of hands, then mended
            free for as long as you carry it.
          </p>
          <div className="mt-9 flex animate-rise flex-wrap items-center gap-x-8 gap-y-4 [animation-delay:220ms]">
            <Link
              to="/bags"
              className="inline-flex min-h-12 items-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Shop the collection
            </Link>
            <Link to="/bags" search={{ collection: "new" }} className="link-line text-sm">
              New this season: six new bags
            </Link>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Full-grain bridle leather",
          "Hand saddle-stitched",
          "Solid cast brass",
          "Repairs free for life",
          "Signed by the maker",
        ]}
      />

      <section className="mx-auto max-w-[1500px] px-4 py-20 md:px-10 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl md:text-7xl">Most carried</h2>
          <Link to="/bags" className="link-line inline-flex items-center gap-2 text-sm">
            All {filterProducts().length} pieces <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mostCarried.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90} className="h-full">
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 pb-20 md:px-10 md:pb-28">
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl">Shop by the day ahead</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {useTiles.map((t, i) => {
            const c = collections.find((x) => x.id === t.id)!;
            return (
              <Reveal key={t.id} delay={i * 90}>
                <Link
                  to="/bags"
                  search={{ collection: t.id }}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl"
                >
                  <img
                    src={t.image}
                    alt={t.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-ink-foreground">
                    <p className="font-display text-4xl">{c.label}</p>
                    <p className="mt-1 max-w-xs text-sm text-ink-foreground/85">{c.line}</p>
                    <p className="mt-4 inline-flex items-center gap-2 text-sm">
                      {filterProducts(t.id).length} pieces
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-4">
          <Link
            to="/bags"
            search={{ collection: "small-goods" }}
            className="group flex min-h-16 items-center justify-between rounded-2xl border px-6 transition-colors hover:border-primary/50"
          >
            <span>
              <span className="font-display text-2xl">Small goods</span>
              <span className="ml-3 hidden text-sm text-muted-foreground sm:inline">
                Card holders, valet trays and tags, from the same hides
              </span>
            </span>
            <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      <section className="border-y bg-card/50 py-20 md:py-28">
        <div className="mx-auto max-w-[1500px] px-4 md:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-5xl md:text-7xl">New this season</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Six new bags, shown here as drawings from the pattern table while the studio
                photographs them. Pick a shade on each page to see it in your leather.
              </p>
            </div>
            <Link
              to="/bags"
              search={{ collection: "new" }}
              className="link-line inline-flex items-center gap-2 text-sm"
            >
              See all new pieces <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 md:px-10 [scroll-padding-inline:1rem] md:[scroll-padding-inline:2.5rem]"
          aria-label="New this season"
        >
          {newPieces.map((p) => (
            <div key={p.slug} className="w-[78vw] max-w-[340px] shrink-0 snap-start">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] items-center gap-12 px-4 py-20 md:grid-cols-2 md:px-10 md:py-28 lg:gap-20">
        <Parallax
          src={craft}
          alt="Craftsman hand-stitching full-grain leather"
          className="aspect-[4/5] rounded-2xl"
          speed={0.08}
        />
        <Reveal className="max-w-xl">
          <h2 className="font-display text-5xl leading-[1.02] md:text-6xl">
            Eleven hours. One pair of hands.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Every bag is cut, bevelled, edged and saddle-stitched by a single artisan from start to
            finish, then signed on the inside. Two needles pass through every hole, so if one stitch
            ever wears through, the seam still holds.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            If anything ever breaks, send it back. Every bag we have ever made is mended free, for
            as long as its owner carries it.
          </p>
          <Link to="/about" className="link-line mt-8 inline-flex items-center gap-2 text-sm">
            How a bag is made <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      <section className="relative h-[80svh] min-h-[480px] overflow-hidden">
        <Parallax
          src={lifestyle}
          alt="Walking with an aged leather satchel"
          className="absolute inset-0"
          speed={0.18}
        />
        <div className="absolute inset-0 bg-ink/45" />
        <Reveal className="relative flex h-full flex-col items-center justify-center px-4 text-center text-ink-foreground">
          <h2 className="max-w-4xl font-display text-5xl italic sm:text-7xl md:text-8xl">
            The long way home.
          </h2>
          <p className="mt-5 max-w-lg text-lg text-ink-foreground/90">
            Holdalls sized for one night, two days or a long week.
          </p>
          <Link
            to="/bags"
            search={{ collection: "travel" }}
            className="mt-9 inline-flex min-h-12 items-center rounded-full border border-ink-foreground/70 px-8 text-sm transition-colors hover:bg-ink-foreground hover:text-ink"
          >
            Shop travel
          </Link>
        </Reveal>
      </section>

      <section className="grain bg-ink px-4 py-20 text-ink-foreground md:px-10 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="font-display text-5xl text-accent md:text-6xl">Words from the field</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {testimonials.map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 120}
                className="flex flex-col border-t border-ink-foreground/20 pt-6"
              >
                <blockquote className="font-display text-2xl leading-snug sm:text-3xl">
                  “{t.quote}”
                </blockquote>
                <p className="mt-6 text-sm text-ink-foreground/70">
                  {t.name}, {t.city} · {t.piece}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

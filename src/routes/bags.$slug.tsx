import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";
import craft from "@/assets/craft.jpg";
import lifestyle from "@/assets/lifestyle.jpg";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ZoomIn, Sparkles, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/bags/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Hollow & Hide` },
          { name: "description", content: loaderData.product.blurb },
          { property: "og:title", content: `${loaderData.product.name} — Hollow & Hide` },
          { property: "og:description", content: loaderData.product.blurb },
        ]
      : [{ title: "Unavailable — Hollow & Hide" }, { name: "robots", content: "noindex" }],
  }),
  component: Detail,
});

const tabs = ["Details", "Materials", "Care", "Patina"] as const;
const tabText: Record<(typeof tabs)[number], string> = {
  Details:
    'Fits a 15" laptop and documents. Two internal drop pockets, solid brass key fob, adjustable bridle strap, and a reinforced top handle.',
  Materials:
    "Full-grain vegetable-tanned bridle leather, solid sand-cast brass hardware, hand-beveled edges, and waxed Irish linen thread.",
  Care: "Wipe clean with a damp cloth. Condition with natural beeswax leather cream twice a year. Complimentary repairs for life.",
  Patina:
    "Arrives firm with a subtle natural wax bloom. Within six months, daily handling yields an authentic honey-caramel patina unique to your hands.",
};

function Detail() {
  const { product: p } = Route.useLoaderData();
  const { addToCart } = useStore();
  const [color, setColor] = useState(p.colors[0]);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Details");
  const [pos, setPos] = useState({ x: 50, y: 50, on: false });
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);

  const gallery = [
    { label: "Studio Silhouette", sub: "Primary View", src: p.image, alt: p.alt },
    {
      label: "Waxed Grain & Awl",
      sub: "Workbench Macro",
      src: craft,
      alt: "Artisan hand-stitching with waxed linen thread",
    },
    {
      label: "Living Scale",
      sub: "On-Body Carry",
      src: lifestyle,
      alt: "Satchel on travel journey in natural sunlight",
    },
  ];

  const currentImage = gallery[activeAngleIndex] || gallery[0];

  return (
    <>
      <section className="mx-auto grid max-w-[1500px] gap-12 px-6 pb-24 pt-32 md:grid-cols-[1.3fr_1fr] md:px-10">
        <div>
          {/* Main Visualizer with Loupe Magnifier */}
          <div
            className="group relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-3xl border bg-card shadow-2xl ring-1 ring-border/50"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setPos({
                x: ((e.clientX - r.left) / r.width) * 100,
                y: ((e.clientY - r.top) / r.height) * 100,
                on: true,
              });
            }}
            onMouseLeave={() => setPos((s) => ({ ...s, on: false }))}
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              width={1024}
              height={1280}
              className="h-full w-full object-cover transition-transform duration-200 will-change-transform"
              style={{
                transformOrigin: `${pos.x}% ${pos.y}%`,
                transform: pos.on ? "scale(2.0)" : "scale(1)",
              }}
            />
            {/* View Indicator Badge */}
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-background/85 px-3 py-1.5 text-[11px] font-medium backdrop-blur shadow-xs">
              <Sparkles className="h-3 w-3 text-primary" />
              <span>{currentImage.label}</span>
            </div>

            {/* Loupe hint overlay */}
            <div
              className={cn(
                "pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-[11px] font-medium text-ink-foreground backdrop-blur transition-opacity",
                pos.on ? "opacity-100" : "opacity-0 md:group-hover:opacity-100",
              )}
            >
              <ZoomIn className="h-3 w-3 text-accent" />
              <span>
                {pos.on ? "2.0× Loupe Magnifier Active" : "Hover to inspect leather grain"}
              </span>
            </div>
          </div>

          {/* Multi-Angle Studio Thumbnails Strip */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {gallery.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => setActiveAngleIndex(idx)}
                className={cn(
                  "group flex flex-col gap-1.5 rounded-2xl border p-2 text-left transition-all",
                  activeAngleIndex === idx
                    ? "border-primary bg-primary/5 ring-2 ring-primary/40 shadow-sm"
                    : "border-border/60 hover:border-foreground/50 hover:bg-card/60",
                )}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="px-1">
                  <p className="truncate text-xs font-semibold text-foreground">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="md:sticky md:top-32 md:self-start">
          <Link
            to="/bags"
            className="text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to {p.category}
          </Link>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight text-foreground">
            {p.name}
          </h1>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="font-display text-3xl font-semibold text-primary tnum">
              ${p.price}
            </span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              USD · Complimentary worldwide shipping
            </span>
          </div>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground reading-measure">
            {p.blurb}
          </p>

          <div className="mt-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Select Leather Shade — {color}
            </span>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {p.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={cn(
                    "min-h-[44px] rounded-xl border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all shadow-xs",
                    color === c
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border/80 hover:border-foreground/60 bg-card/60",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(p, color)}
            className="mt-8 w-full min-h-[54px] rounded-full bg-primary py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-xl transition-all hover:opacity-95 hover:shadow-2xl active:scale-[0.99]"
          >
            Add to Bag — ${p.price}
          </button>

          <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-border/60 bg-card/60 p-5 text-xs text-muted-foreground">
            <div>✓ Hand-signed by single artisan</div>
            <div>✓ Lifetime complimentary repairs</div>
            <div>✓ Free monogram in 48 hours</div>
            <div>✓ 60-day living trial guarantee</div>
          </div>

          <div className="mt-10 border-t border-border/50 pt-6">
            <div className="flex gap-6 border-b border-border/40 pb-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "text-xs uppercase tracking-widest pb-2 transition-colors",
                    tab === t
                      ? "border-b-2 border-primary font-semibold text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <p
              key={tab}
              className="mt-6 animate-in fade-in slide-in-from-bottom-2 leading-relaxed text-base text-muted-foreground reading-measure"
            >
              {tabText[tab]}
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1500px] border-t px-6 py-24 md:px-10">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl">
            You may <em>also</em> like
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products
            .filter((x) => x.slug !== p.slug)
            .slice(0, 3)
            .map((x, i) => (
              <Reveal key={x.slug} delay={i * 120} className="h-full">
                <ProductCard p={x} />
              </Reveal>
            ))}
        </div>
      </section>
    </>
  );
}

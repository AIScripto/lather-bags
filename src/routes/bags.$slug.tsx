import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Hammer, Package, RotateCcw, Truck, X, ZoomIn } from "lucide-react";
import lifestyle from "@/assets/lifestyle.jpg";
import {
  collectionOf,
  findProduct,
  formatSize,
  pairingsFor,
  shades,
  type Product,
  type Shade,
} from "@/lib/products";
import { deliveryWindow, formatPrice } from "@/lib/format";
import { useStore, type Monogram } from "@/lib/store";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/ProductCard";
import { LeatherSwatch, ProductMedia, ScaleDiagram } from "@/components/ProductMedia";
import { MonogramPicker } from "@/components/Monogram";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/bags/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
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

function Detail() {
  const { product } = Route.useLoaderData();
  // Keyed so shade, view and monogram reset when moving between products.
  return <ProductDetail key={product.slug} p={product} />;
}

type ViewId = "studio" | "detail" | "drawing" | "shade" | "scale" | "carry";

const viewLabels: Record<ViewId, string> = {
  studio: "Studio",
  detail: "Hardware",
  drawing: "Pattern",
  shade: "Leather",
  scale: "To scale",
  carry: "Carried",
};

const tabs = ["Details", "Materials", "Care"] as const;
const care =
  "Wipe with a dry cloth. Twice a year, work in a thin layer of beeswax leather balm and buff it off. If rain marks it, let it dry slowly away from a radiator. Anything torn or worn through, send it back: repairs are free for life.";

const patinaStages = [
  { upTo: 0, text: "Arrives firm, with a light wax bloom on the surface that rubs away in days." },
  { upTo: 1, text: "The bloom has gone. Handles and edges start to take on a soft shine." },
  {
    upTo: 4,
    text: "The colour deepens where your hands rest, and creases settle into your routine.",
  },
  { upTo: 10, text: "A deep, even burnish. Old scuffs have softened back into the grain." },
];

function ProductDetail({ p }: { p: Product }) {
  const { addToCart } = useStore();
  const photographed = !!p.image;
  const views: ViewId[] = photographed
    ? [
        "studio",
        "detail",
        "shade",
        "scale",
        ...(p.slug === "the-heritage-satchel" ? (["carry"] as const) : []),
      ]
    : ["drawing", "shade", "scale"];

  const [shade, setShade] = useState<Shade>(p.colors[0]!);
  const [view, setView] = useState<ViewId>(views[0]!);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Details");
  const [wantsMonogram, setWantsMonogram] = useState(false);
  const [monogram, setMonogram] = useState<Monogram>({ initials: "", foil: "gold" });
  const [lightbox, setLightbox] = useState(false);
  const [years, setYears] = useState(0);
  const buyRef = useRef<HTMLButtonElement>(null);
  const [buyVisible, setBuyVisible] = useState(true);

  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setBuyVisible(e?.isIntersecting ?? true));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const chooseShade = (s: Shade) => {
    setShade(s);
    if (photographed) setView(s === p.colors[0] ? "studio" : "shade");
  };

  const add = () => addToCart(p, shade, wantsMonogram && monogram.initials ? monogram : undefined);
  const collection = collectionOf(p.collection);
  const stage = patinaStages.find((s) => years <= s.upTo) ?? patinaStages[3]!;

  return (
    <>
      <section className="mx-auto grid max-w-[1500px] gap-10 px-4 pb-20 pt-24 md:grid-cols-[1.2fr_1fr] md:gap-14 md:px-10 md:pt-32">
        <div>
          <Viewer p={p} view={view} shade={shade} onOpen={() => setLightbox(true)} />
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto" aria-label="Views">
            {views.map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={cn(
                  "w-[22%] min-w-[84px] shrink-0 overflow-hidden rounded-xl border text-left transition-colors md:w-auto md:flex-1",
                  view === v
                    ? "border-primary ring-1 ring-primary"
                    : "border-border hover:border-foreground/40",
                )}
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <ViewContent p={p} view={v} shade={shade} />
                </div>
                <span className="block px-2 py-1.5 text-[13px] text-muted-foreground">
                  {viewLabels[v]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="md:sticky md:top-28 md:self-start">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/bags" className="hover:text-foreground">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <Link
              to="/bags"
              search={{ collection: p.collection }}
              className="hover:text-foreground"
            >
              {collection.label}
            </Link>
          </nav>
          <h1 className="mt-3 font-display text-5xl leading-[1.02] md:text-6xl">{p.name}</h1>
          <p className="mt-3 font-display text-3xl text-primary tnum">
            {formatPrice(p.price)}{" "}
            <span className="font-sans text-sm text-muted-foreground">USD</span>
          </p>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
            {p.blurb}
          </p>

          <fieldset className="mt-8">
            <legend className="text-sm">
              <span className="font-medium">Leather</span>
              <span className="text-muted-foreground"> · {shade}</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => chooseShade(c)}
                  aria-pressed={shade === c}
                  aria-label={c}
                  title={c}
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-full transition-shadow",
                    shade === c
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "ring-1 ring-border hover:ring-foreground/40",
                  )}
                >
                  <span className="h-8 w-8 rounded-full" style={{ background: shades[c].color }} />
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {shades[shade].note}
              {photographed && shade !== p.colors[0] && (
                <> Photographed in {p.colors[0]}; the leather view shows your shade.</>
              )}
            </p>
          </fieldset>

          <div className="mt-8 rounded-2xl border p-5">
            <label className="flex min-h-11 cursor-pointer items-center justify-between gap-4">
              <span>
                <span className="block font-medium">Add a monogram</span>
                <span className="text-sm text-muted-foreground">
                  Stamped by hand within 48 hours. Complimentary.
                </span>
              </span>
              <input
                type="checkbox"
                checked={wantsMonogram}
                onChange={(e) => setWantsMonogram(e.target.checked)}
                className="h-5 w-5 shrink-0 accent-[var(--primary)]"
              />
            </label>
            {wantsMonogram && (
              <div className="mt-5 border-t pt-5">
                <MonogramPicker value={monogram} onChange={setMonogram} />
              </div>
            )}
          </div>

          <button
            ref={buyRef}
            onClick={add}
            className="mt-6 min-h-14 w-full rounded-full bg-primary text-base font-medium text-primary-foreground shadow-[0_14px_30px_-16px_var(--primary)] transition-[opacity,transform] hover:opacity-95 active:scale-[0.99]"
          >
            Add to bag · {formatPrice(p.price)}
          </button>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="h-4 w-4 shrink-0 text-primary" />
            Order today, delivered {deliveryWindow()}. Free shipping.
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-y py-5 text-sm">
            {(
              [
                [Hammer, "Made by one artisan, signed inside"],
                [Package, "Repairs free for life"],
                [RotateCcw, "60 days to return it"],
                [Truck, "Tracked, carbon-neutral shipping"],
              ] as const
            ).map(([Icon, text]) => (
              <li key={text} className="flex items-start gap-2 text-muted-foreground">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {text}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 font-display text-2xl">Size and fit</h2>
          <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <Spec label="Dimensions" value={formatSize(p.specs.size)} />
            <Spec label="Weight" value={p.specs.weight} />
            {p.specs.capacity && <Spec label="Capacity" value={p.specs.capacity} />}
            {p.specs.laptop && <Spec label="Laptop" value={p.specs.laptop} />}
            <div className="col-span-2">
              <dt className="text-muted-foreground">What fits</dt>
              <dd className="mt-1">{p.specs.fits.join(" · ")}</dd>
            </div>
          </dl>

          <div className="mt-8">
            <div role="tablist" aria-label="About this piece" className="flex gap-6 border-b">
              {tabs.map((t) => (
                <button
                  key={t}
                  role="tab"
                  id={`tab-${t}`}
                  aria-selected={tab === t}
                  aria-controls="tab-panel"
                  onClick={() => setTab(t)}
                  className={cn(
                    "-mb-px min-h-11 border-b-2 text-sm transition-colors",
                    tab === t
                      ? "border-primary font-medium text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <p
              id="tab-panel"
              role="tabpanel"
              aria-labelledby={`tab-${tab}`}
              className="mt-5 max-w-[60ch] leading-relaxed text-muted-foreground"
            >
              {tab === "Details" ? p.details : tab === "Materials" ? p.materials : care}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y bg-card/50">
        <div className="mx-auto grid max-w-[1500px] items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-10 md:py-28">
          <LeatherSwatch shade={shade} years={years} className="aspect-[5/4] rounded-2xl" />
          <div>
            <h2 className="font-display text-4xl md:text-6xl">How {shade.toLowerCase()} ages</h2>
            <p className="mt-4 max-w-[52ch] text-muted-foreground">
              Vegetable-tanned leather darkens with light and handling. Drag through the years to
              see roughly where yours will be.
            </p>
            <label htmlFor="patina" className="mt-10 flex justify-between text-sm">
              <span className="font-medium">
                {years === 0 ? "New" : `${years} ${years === 1 ? "year" : "years"} of daily carry`}
              </span>
              <span className="text-muted-foreground">Illustrative</span>
            </label>
            <input
              id="patina"
              type="range"
              min={0}
              max={10}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="mt-3 w-full"
            />
            <p
              className="mt-6 min-h-[3.5em] max-w-[52ch] text-lg leading-relaxed"
              aria-live="polite"
            >
              {stage.text}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-20 md:px-10 md:py-28">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl">Complete the set</h2>
          <p className="mt-3 text-muted-foreground">
            Chosen by the workshop to go with the {p.name.replace(/^The /, "")}.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pairingsFor(p).map((x, i) => (
            <Reveal key={x.slug} delay={i * 90} className="h-full">
              <ProductCard p={x} />
            </Reveal>
          ))}
        </div>
      </section>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t bg-background/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 md:hidden",
          buyVisible ? "translate-y-full" : "translate-y-0",
        )}
        inert={buyVisible}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg leading-tight">{p.name}</p>
          <p className="text-sm text-muted-foreground">
            {shade} · {formatPrice(p.price)}
          </p>
        </div>
        <button
          onClick={add}
          className="min-h-12 shrink-0 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
        >
          Add to bag
        </button>
      </div>

      {lightbox && p.image && (
        <Lightbox
          src={view === "carry" ? lifestyle : p.image}
          alt={p.alt}
          onClose={() => setLightbox(false)}
        />
      )}
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 tnum">{value}</dd>
    </div>
  );
}

function ViewContent({ p, view, shade }: { p: Product; view: ViewId; shade: Shade }): ReactNode {
  switch (view) {
    case "studio":
      return <ProductMedia product={p} sizes="eager" />;
    case "detail":
      return (
        <img
          src={p.image}
          alt={`Close-up of the hardware and stitching on ${p.name}`}
          className="h-full w-full object-cover"
          style={{
            objectPosition: p.detailFocus,
            transform: "scale(2.4)",
            transformOrigin: p.detailFocus,
          }}
        />
      );
    case "drawing":
      return <ProductMedia product={p} shade={shade} />;
    case "shade":
      return (
        <LeatherSwatch shade={shade} className="h-full w-full">
          <span className="sr-only">{shade} leather sample</span>
        </LeatherSwatch>
      );
    case "scale":
      return (
        <div className="paper grid h-full w-full place-items-center p-[10%]">
          <ScaleDiagram product={p} />
        </div>
      );
    case "carry":
      return (
        <img
          src={lifestyle}
          alt={`${p.name} carried on a walk in low sunlight`}
          className="h-full w-full object-cover"
        />
      );
  }
}

function Viewer({
  p,
  view,
  shade,
  onOpen,
}: {
  p: Product;
  view: ViewId;
  shade: Shade;
  onOpen: () => void;
}) {
  const [loupe, setLoupe] = useState<{ x: number; y: number } | null>(null);
  const zoomable = view === "studio" || view === "carry";

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border bg-muted">
      <div
        className="h-full w-full transition-transform duration-200"
        style={
          zoomable && loupe
            ? { transform: "scale(2)", transformOrigin: `${loupe.x}% ${loupe.y}%` }
            : undefined
        }
      >
        <ViewContent p={p} view={view} shade={shade} />
      </div>
      {view === "shade" && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-6 text-ink-foreground">
          <p className="font-display text-3xl">{shade}</p>
          <p className="text-sm opacity-85">{shades[shade].note}</p>
        </div>
      )}
      {zoomable && (
        <button
          onClick={onOpen}
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse") return;
            const r = e.currentTarget.getBoundingClientRect();
            setLoupe({
              x: ((e.clientX - r.left) / r.width) * 100,
              y: ((e.clientY - r.top) / r.height) * 100,
            });
          }}
          onPointerLeave={() => setLoupe(null)}
          aria-label="Open full-size image"
          className="absolute inset-0 cursor-zoom-in"
        >
          <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs text-foreground backdrop-blur">
            <ZoomIn className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Hover to inspect · click to enlarge</span>
            <span className="md:hidden">Tap to enlarge</span>
          </span>
        </button>
      )}
    </div>
  );
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(true, ref, onClose);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[60] overflow-auto bg-ink/95 animate-in fade-in"
    >
      <button
        onClick={onClose}
        aria-label="Close image"
        className="fixed right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-background text-foreground"
      >
        <X className="h-5 w-5" />
      </button>
      <img
        src={src}
        alt={alt}
        className="mx-auto min-h-full w-auto max-w-none object-contain md:max-w-full"
      />
    </div>
  );
}

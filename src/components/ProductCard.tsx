import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const swatch: Record<string, string> = {
  Cognac: "oklch(0.52 0.12 48)",
  Chestnut: "oklch(0.36 0.07 40)",
  Black: "oklch(0.2 0.01 60)",
  Tan: "oklch(0.65 0.11 65)",
  Oxblood: "oklch(0.35 0.11 20)",
  Olive: "oklch(0.42 0.06 110)",
};

export function ProductCard({ p }: { p: Product }) {
  const { favorites, toggleFavorite } = useStore();
  const isFav = favorites.includes(p.slug);

  return (
    <Link
      to="/bags/$slug"
      params={{ slug: p.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted/20">
        <img
          src={p.image}
          alt={p.alt}
          loading="lazy"
          width={1024}
          height={1280}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-108"
        />
        <span className="eyebrow absolute left-3.5 top-3.5 rounded-full border border-border/40 bg-background/90 px-3.5 py-1.5 backdrop-blur-md shadow-xs text-foreground/90">
          {p.category}
        </span>
        <button
          type="button"
          aria-label={isFav ? `Remove ${p.name} from saved items` : `Save ${p.name} to wishlist`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(p.slug);
          }}
          className={cn(
            "absolute right-3.5 top-3.5 grid h-10 w-10 place-items-center rounded-full border border-border/40 bg-background/90 backdrop-blur-md shadow-xs transition-all hover:scale-110",
            isFav ? "text-primary" : "text-muted-foreground hover:text-primary",
          )}
        >
          <Heart
            className={cn("h-4 w-4 transition-transform", isFav && "fill-current scale-110")}
          />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-accent text-xs">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">4.9 · 128 reviews</span>
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-4">
          <h3 className="min-w-0 truncate font-display text-2xl tracking-tight text-foreground transition-colors group-hover:text-primary">
            {p.name}
          </h3>
          <span className="shrink-0 font-display text-2xl font-medium text-primary tnum">
            ${p.price}
          </span>
        </div>
        <p className="mt-2.5 line-clamp-2 min-h-[2.6rem] text-[0.9375rem] leading-relaxed text-muted-foreground">
          {p.blurb}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5 border-t border-border/40">
          <div
            className="flex items-center gap-1.5"
            aria-label={`Available colors: ${p.colors.join(", ")}`}
          >
            {p.colors.map((c) => (
              <span
                key={c}
                title={c}
                className="flex h-6 w-6 items-center justify-center rounded-full transition-transform hover:scale-125"
              >
                <span
                  className="h-4.5 w-4.5 rounded-full border-2 border-background ring-1 ring-border/60 shadow-xs"
                  style={{ background: swatch[c] }}
                />
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <span>View</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

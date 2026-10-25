import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart } from "lucide-react";
import { formatSize, shades, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ProductMedia } from "./ProductMedia";

export function ProductCard({ p }: { p: Product }) {
  const { favorites, toggleFavorite } = useStore();
  const isFav = favorites.includes(p.slug);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-[border-color,box-shadow] duration-500 hover:border-primary/40 hover:shadow-[0_18px_40px_-24px_oklch(0.2_0.03_50/0.45)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted/30">
        <ProductMedia
          product={p}
          className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute left-2.5 top-2.5 flex gap-2 sm:left-3.5 sm:top-3.5">
          <span className="hidden rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground/90 backdrop-blur-md sm:inline">
            {p.category}
          </span>
          {p.isNew && (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              New
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label={isFav ? `Remove ${p.name} from saved items` : `Save ${p.name} to wishlist`}
          aria-pressed={isFav}
          onClick={() => toggleFavorite(p.slug)}
          className={cn(
            "absolute right-1.5 top-1.5 z-10 grid h-11 w-11 place-items-center rounded-full bg-background/90 backdrop-blur-md transition-colors",
            isFav ? "text-primary" : "text-muted-foreground hover:text-primary",
          )}
        >
          <Heart className={cn("h-4 w-4", isFav && "fill-current")} />
        </button>
      </div>
      {/* Compact below sm so phones show two cards per row: name, price and shades only. */}
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <h3 className="min-h-[2.5em] min-w-0 font-display text-lg leading-tight text-foreground sm:text-2xl">
            <Link
              to="/bags/$slug"
              params={{ slug: p.slug }}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-has-[a:focus-visible]:underline"
            >
              {p.name}
            </Link>
          </h3>
          <span className="shrink-0 font-display text-lg text-primary tnum sm:text-2xl">
            {formatPrice(p.price)}
          </span>
        </div>
        <p className="mb-5 mt-2 min-h-[3.25em] line-clamp-2 max-sm:hidden text-[0.9375rem] leading-relaxed text-muted-foreground">
          {p.blurb}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3 sm:border-t sm:border-border/50 sm:pt-4">
          <div className="flex items-center gap-1" aria-label={`Shades: ${p.colors.join(", ")}`}>
            {p.colors.map((c) => (
              <span
                key={c}
                title={c}
                className="h-3.5 w-3.5 rounded-full sm:h-4 sm:w-4 ring-1 ring-border ring-offset-1 ring-offset-card"
                style={{ background: shades[c].color }}
              />
            ))}
          </div>
          <span className="hidden items-center gap-1.5 text-[13px] text-muted-foreground tnum sm:flex">
            {formatSize(p.specs.size)}
            <ArrowRight className="h-3.5 w-3.5 text-primary transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

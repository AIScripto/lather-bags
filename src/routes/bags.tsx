import { createFileRoute, Link, Outlet, useChildMatches } from "@tanstack/react-router";
import { collections, filterProducts, type Collection } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const filters = [
  { id: undefined, label: "All" },
  { id: "new", label: "New" },
  ...collections.map((c) => ({ id: c.id, label: c.label })),
] as const;

type Filter = Collection | "new";
const sorts = ["featured", "price-asc", "price-desc"] as const;
type Sort = (typeof sorts)[number];

export type BagsSearch = { collection?: Filter | undefined; sort?: Sort | undefined };

const isFilter = (v: unknown): v is Filter => v === "new" || collections.some((c) => c.id === v);

export const Route = createFileRoute("/bags")({
  validateSearch: (s: Record<string, unknown>): BagsSearch => ({
    collection: isFilter(s["collection"]) ? s["collection"] : undefined,
    sort:
      sorts.includes(s["sort"] as Sort) && s["sort"] !== "featured"
        ? (s["sort"] as Sort)
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop — Hollow & Hide" },
      {
        name: "description",
        content: "Handcrafted leather briefcases, satchels, backpacks, holdalls and small goods.",
      },
      { property: "og:title", content: "Shop — Hollow & Hide" },
      { property: "og:description", content: "The full collection of handcrafted leather bags." },
    ],
  }),
  component: BagsLayout,
});

function BagsLayout() {
  const childMatches = useChildMatches();
  return childMatches.length > 0 ? <Outlet /> : <Bags />;
}

function Bags() {
  const { collection, sort } = Route.useSearch();
  const navigate = Route.useNavigate();
  const list = filterProducts(collection, sort);
  const active = collections.find((c) => c.id === collection);
  const heading =
    collection === "new" ? "New this season" : active ? active.label : "The collection";
  const line =
    collection === "new"
      ? "Six new bags and the small goods that finish a set. Drawn here from the pattern table while the studio photographs them."
      : active
        ? active.line
        : "Full-grain leather, cut and stitched by one pair of hands, and mended free for life.";

  return (
    <section className="mx-auto max-w-[1500px] px-4 pb-28 pt-28 md:px-10 md:pt-36">
      <h1 className="font-display text-5xl leading-none md:text-7xl">{heading}</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">{line}</p>

      <div className="sticky top-[65px] z-20 -mx-4 mt-8 flex items-center gap-4 border-y bg-background/95 px-4 py-3 backdrop-blur-md md:static md:mx-0 md:bg-transparent md:px-0 md:backdrop-blur-none">
        <nav
          aria-label="Filter the collection"
          className="no-scrollbar -my-1 flex flex-1 gap-2 overflow-x-auto py-1"
        >
          {filters.map((f) => {
            const isActive = collection === f.id;
            const count = filterProducts(f.id).length;
            return (
              <Link
                key={f.label}
                to="/bags"
                search={(prev) => ({ ...prev, collection: f.id })}
                replace
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm transition-colors",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-foreground/50",
                )}
              >
                {f.label}
                <span
                  className={cn("tnum text-xs", isActive ? "opacity-80" : "text-muted-foreground")}
                >
                  {count}
                </span>
              </Link>
            );
          })}
        </nav>
        <label className="sr-only" htmlFor="sort">
          Sort by
        </label>
        <select
          id="sort"
          value={sort ?? "featured"}
          onChange={(e) =>
            navigate({
              search: (prev) => ({
                ...prev,
                sort: e.target.value === "featured" ? undefined : (e.target.value as Sort),
              }),
              replace: true,
            })
          }
          className="min-h-11 shrink-0 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-primary"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price, low to high</option>
          <option value="price-desc">Price, high to low</option>
        </select>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {list.length} {list.length === 1 ? "piece" : "pieces"}
      </p>

      <div
        key={`${collection}-${sort}`}
        className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4"
      >
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 90} className="h-full">
            <ProductCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import { createFileRoute, Outlet, useChildMatches } from "@tanstack/react-router";
import { useState } from "react";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/bags")({
  head: () => ({
    meta: [
      { title: "Bags — Hollow & Hide" },
      {
        name: "description",
        content: "Shop handcrafted leather satchels, briefcases, totes, backpacks and travel bags.",
      },
      { property: "og:title", content: "Bags — Hollow & Hide" },
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
  const [cat, setCat] = useState("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filtered = cat === "All" ? products : products.filter((p) => p.category === cat);
  const list = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <section className="mx-auto max-w-[1500px] px-6 pb-28 pt-40 md:px-10">
      <p className="eyebrow animate-rise text-primary">Collection · {products.length} pieces</p>
      <h1 className="mt-4 animate-rise font-display text-7xl leading-none [animation-delay:120ms] md:text-[10rem]">
        The <em>Bags</em>
      </h1>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y py-5">
        <div className="flex flex-wrap gap-2.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition-all shadow-xs",
                cat === c
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border/80 hover:border-foreground/60 bg-card/60",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc")}
          aria-label="Sort collection by"
          className="rounded-xl border border-border/80 bg-card px-3.5 py-2 text-xs font-medium uppercase tracking-wider outline-none transition-colors focus:border-primary shadow-xs"
        >
          <option value="featured">Sort: Featured</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
        </select>
      </div>
      <div key={`${cat}-${sortBy}`} className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 120} className="h-full">
            <ProductCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

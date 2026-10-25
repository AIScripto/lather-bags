import { describe, expect, it } from "vitest";
import { categories, filterProducts, findProduct, pairingsFor, products } from "@/lib/products";

describe("Products catalogue data integrity", () => {
  it("contains the twelve bags and three small goods", () => {
    expect(products.filter((p) => p.collection !== "small-goods")).toHaveLength(12);
    expect(products.filter((p) => p.collection === "small-goods")).toHaveLength(3);
  });

  it("gives every piece a photograph or a pattern drawing, and real specs", () => {
    for (const p of products) {
      expect(p.image || p.sketch).toBeTruthy();
      expect(p.specs.size.every((n) => n > 0)).toBe(true);
      expect(p.specs.fits.length).toBeGreaterThan(0);
    }
  });

  it("only pairs pieces with products that exist", () => {
    for (const p of products) {
      for (const slug of p.pairsWith) expect(findProduct(slug)).toBeDefined();
      expect(pairingsFor(p).map((x) => x.slug)).not.toContain(p.slug);
    }
  });

  it("filters by collection and the new-season flag, and sorts by price", () => {
    expect(filterProducts("travel").every((p) => p.collection === "travel")).toBe(true);
    expect(filterProducts("new").every((p) => p.isNew)).toBe(true);
    const prices = filterProducts(undefined, "price-asc").map((p) => p.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it("verifies all products have valid fields, non-empty blurb, and positive price", () => {
    for (const product of products) {
      expect(product.slug).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.price).toBeGreaterThan(0);
      expect(product.alt).toBeTruthy();
      expect(product.colors.length).toBeGreaterThan(0);
      expect(product.blurb.length).toBeGreaterThan(10);
      expect(categories).toContain(product.category);
    }
  });

  it("ensures every product has a unique slug", () => {
    const slugs = products.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });
});

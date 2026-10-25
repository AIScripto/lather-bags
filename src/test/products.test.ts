import { describe, expect, it } from "vitest";
import { products, categories } from "@/lib/products";

describe("Products catalogue data integrity", () => {
  it("contains all curated handcrafted pieces", () => {
    expect(products.length).toBe(6);
  });

  it("verifies all products have valid fields, non-empty blurb, and positive price", () => {
    for (const product of products) {
      expect(product.slug).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.price).toBeGreaterThan(0);
      expect(product.image).toBeTruthy();
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

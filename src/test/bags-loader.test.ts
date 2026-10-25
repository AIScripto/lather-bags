import { describe, expect, it } from "vitest";
import { products } from "@/lib/products";

// Testing loader logic for /bags/$slug
function loadBagBySlug(slug: string) {
  const product = products.find((p) => p.slug === slug);
  if (!product) {
    throw new Error("NOT_FOUND");
  }
  return { product };
}

describe("Bags Detail Route Loader", () => {
  it("resolves the correct product for valid slug", () => {
    const validSlug = "the-heritage-satchel";
    const data = loadBagBySlug(validSlug);
    expect(data.product).toBeDefined();
    expect(data.product.name).toBe("The Heritage Satchel");
    expect(data.product.price).toBe(395);
  });

  it("throws notFound error when an invalid slug is queried", () => {
    const invalidSlug = "non-existent-synthetic-bag";
    expect(() => loadBagBySlug(invalidSlug)).toThrow("NOT_FOUND");
  });

  it("resolves all catalogue slugs successfully", () => {
    for (const p of products) {
      const data = loadBagBySlug(p.slug);
      expect(data.product.slug).toBe(p.slug);
      expect(data.product.colors.length).toBeGreaterThan(0);
    }
  });
});

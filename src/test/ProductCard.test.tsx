import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductCard } from "@/components/ProductCard";
import { StoreProvider } from "@/lib/store";
import { products } from "@/lib/products";

// Mock @tanstack/react-router Link
vitest.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    to,
    params,
    className,
  }: {
    children: React.ReactNode;
    to: string;
    params?: { slug?: string };
    className?: string;
  }) => (
    <a href={`${to.replace("$slug", params?.slug || "")}`} className={className}>
      {children}
    </a>
  ),
}));

describe("ProductCard Component", () => {
  const sampleProduct = products[0]!;

  it("renders product name, price, category, and dimensions", () => {
    render(
      <StoreProvider>
        <ProductCard p={sampleProduct} />
      </StoreProvider>,
    );

    expect(screen.getByText(sampleProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${sampleProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(sampleProduct.category)).toBeInTheDocument();
    expect(screen.getByText("38 × 29 × 11 cm")).toBeInTheDocument();
    expect(screen.queryByText(/reviews/i)).not.toBeInTheDocument();
  });

  it("renders wishlist save button with accessible label", () => {
    render(
      <StoreProvider>
        <ProductCard p={sampleProduct} />
      </StoreProvider>,
    );

    const button = screen.getByRole("button", {
      name: new RegExp(`Save ${sampleProduct.name} to wishlist`, "i"),
    });
    expect(button).toBeInTheDocument();
  });
});

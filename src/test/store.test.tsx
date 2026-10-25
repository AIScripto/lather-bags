import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { StoreProvider, useStore } from "@/lib/store";
import { products } from "@/lib/products";
import type { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
  <StoreProvider>{children}</StoreProvider>
);

describe("StoreProvider and useStore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes with default saddle theme and seeded cart items", () => {
    const { result } = renderHook(() => useStore(), { wrapper });

    expect(result.current.theme).toBe("saddle");
    expect(result.current.cartItems.length).toBeGreaterThan(0);
    expect(result.current.cartCount).toBeGreaterThan(0);
    expect(result.current.cartSubtotal).toBeGreaterThan(0);
  });

  it("updates and persists theme selection across expanded atelier themes", () => {
    const { result } = renderHook(() => useStore(), { wrapper });

    act(() => {
      result.current.setTheme("espresso");
    });
    expect(result.current.theme).toBe("espresso");
    expect(result.current.effectiveTheme).toBe("espresso");
    expect(result.current.isDark).toBe(true);
    expect(localStorage.getItem("hh-theme")).toBe("espresso");

    act(() => {
      result.current.setTheme("bourbon");
    });
    expect(result.current.theme).toBe("bourbon");
    expect(result.current.effectiveTheme).toBe("bourbon");
    expect(result.current.isDark).toBe(false);
    expect(localStorage.getItem("hh-theme")).toBe("bourbon");
  });

  it("toggles color mode between light and dark", () => {
    const { result } = renderHook(() => useStore(), { wrapper });

    act(() => {
      result.current.setTheme("saddle");
    });
    expect(result.current.isDark).toBe(false);

    act(() => {
      result.current.toggleColorMode();
    });
    expect(result.current.isDark).toBe(true);
    expect(result.current.theme).toBe("midnight");

    act(() => {
      result.current.toggleColorMode();
    });
    expect(result.current.isDark).toBe(false);
    expect(result.current.theme).toBe("saddle");
  });

  it("adds new items to the cart and updates counts", () => {
    const { result } = renderHook(() => useStore(), { wrapper });
    const initialCount = result.current.cartCount;
    const initialTotal = result.current.cartSubtotal;
    const testProduct = products[2]!; // The Market Tote ($285)

    act(() => {
      result.current.addToCart(testProduct, "Tan");
    });

    expect(result.current.cartCount).toBe(initialCount + 1);
    expect(result.current.cartSubtotal).toBe(initialTotal + testProduct.price);
    expect(result.current.cartOpen).toBe(true);
  });

  it("increments quantity when the same item and color are added", () => {
    const { result } = renderHook(() => useStore(), { wrapper });
    const testProduct = products[3]!; // The Rambler Rucksack

    act(() => {
      result.current.addToCart(testProduct, "Olive");
    });
    const countAfterFirst = result.current.cartCount;

    act(() => {
      result.current.addToCart(testProduct, "Olive");
    });

    expect(result.current.cartCount).toBe(countAfterFirst + 1);
  });

  it("removes items from cart by slug and color", () => {
    const { result } = renderHook(() => useStore(), { wrapper });
    const firstItem = result.current.cartItems[0]!;

    act(() => {
      result.current.removeFromCart(firstItem.product.slug, firstItem.color);
    });

    expect(
      result.current.cartItems.some(
        (i) => i.product.slug === firstItem.product.slug && i.color === firstItem.color,
      ),
    ).toBe(false);
  });

  it("toggles and persists favorites", () => {
    const { result } = renderHook(() => useStore(), { wrapper });
    const slug = "the-heritage-satchel";

    act(() => {
      result.current.toggleFavorite(slug);
    });

    expect(result.current.favorites).toContain(slug);

    act(() => {
      result.current.toggleFavorite(slug);
    });

    expect(result.current.favorites).not.toContain(slug);
  });
});

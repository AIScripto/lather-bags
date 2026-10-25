import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { StoreProvider, lineKey, normalizeTheme, useStore } from "@/lib/store";
import { products } from "@/lib/products";
import type { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
  <StoreProvider>{children}</StoreProvider>
);

describe("StoreProvider and useStore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with the Saddle theme and an empty bag", () => {
    const { result } = renderHook(() => useStore(), { wrapper });

    expect(result.current.effectiveTheme).toBe("saddle");
    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.cartCount).toBe(0);
    expect(result.current.cartSubtotal).toBe(0);
  });

  it("folds palettes from older builds into Saddle or Espresso", () => {
    expect(normalizeTheme("midnight")).toBe("espresso");
    expect(normalizeTheme("bourbon")).toBe("saddle");
    expect(normalizeTheme("olive")).toBe("saddle");
    expect(normalizeTheme(null)).toBe("system");
  });

  it("toggles between Saddle and Espresso and persists the choice", () => {
    const { result } = renderHook(() => useStore(), { wrapper });

    act(() => result.current.toggleColorMode());
    expect(result.current.isDark).toBe(true);
    expect(result.current.theme).toBe("espresso");
    expect(localStorage.getItem("hh-theme")).toBe("espresso");

    act(() => result.current.toggleColorMode());
    expect(result.current.isDark).toBe(false);
    expect(result.current.theme).toBe("saddle");
  });

  it("adds items, opens the bag and updates totals", () => {
    const { result } = renderHook(() => useStore(), { wrapper });
    const tote = products[2]!;

    act(() => result.current.addToCart(tote, "Tan"));

    expect(result.current.cartCount).toBe(1);
    expect(result.current.cartSubtotal).toBe(tote.price);
    expect(result.current.cartOpen).toBe(true);
  });

  it("increments quantity for the same piece, shade and monogram", () => {
    const { result } = renderHook(() => useStore(), { wrapper });
    const pack = products[3]!;

    act(() => result.current.addToCart(pack, "Olive"));
    act(() => result.current.addToCart(pack, "Olive"));
    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartCount).toBe(2);

    act(() => result.current.addToCart(pack, "Olive", { initials: "AR", foil: "gold" }));
    expect(result.current.cartItems).toHaveLength(2);
  });

  it("removes and decrements lines by key", () => {
    const { result } = renderHook(() => useStore(), { wrapper });
    act(() => result.current.addToCart(products[0]!, "Cognac"));
    act(() => result.current.addToCart(products[1]!, "Chestnut"));
    const [first, second] = result.current.cartItems;

    act(() => result.current.removeFromCart(lineKey(first!)));
    expect(result.current.cartItems.map(lineKey)).toEqual([lineKey(second!)]);

    act(() => result.current.updateQuantity(lineKey(second!), -1));
    expect(result.current.cartItems).toHaveLength(0);
  });

  it("restores the bag from storage on the next visit", async () => {
    localStorage.setItem(
      "hh-cart",
      JSON.stringify([{ slug: "the-courier", color: "Black", quantity: 2 }]),
    );
    const { result } = renderHook(() => useStore(), { wrapper });

    await waitFor(() => expect(result.current.cartCount).toBe(2));
    expect(result.current.cartItems[0]!.product.name).toBe("The Courier");
  });

  it("toggles and persists favorites", () => {
    const { result } = renderHook(() => useStore(), { wrapper });
    const slug = "the-heritage-satchel";

    act(() => result.current.toggleFavorite(slug));
    expect(result.current.favorites).toContain(slug);
    expect(localStorage.getItem("hh-favs")).toContain(slug);

    act(() => result.current.toggleFavorite(slug));
    expect(result.current.favorites).not.toContain(slug);
  });
});

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { findProduct, type Product } from "./products";

export const themes = [
  { id: "saddle", name: "Saddle", tone: "light" },
  { id: "espresso", name: "Espresso", tone: "dark" },
] as const;

export type ThemeId = (typeof themes)[number]["id"] | "system";

/** Older builds offered six palettes; fold any saved choice into the two that remain. */
export function normalizeTheme(saved: string | null): ThemeId {
  if (saved === "espresso" || saved === "midnight") return "espresso";
  if (!saved || saved === "system") return "system";
  return "saddle";
}

export type Foil = "gold" | "silver" | "blind";
export type Monogram = { initials: string; foil: Foil };

export const foils: { id: Foil; label: string }[] = [
  { id: "gold", label: "Gold foil" },
  { id: "silver", label: "Silver foil" },
  { id: "blind", label: "Blind deboss" },
];

export type CartItem = {
  product: Product;
  color: string;
  quantity: number;
  monogram?: Monogram | undefined;
};

export const lineKey = (i: Pick<CartItem, "product" | "color" | "monogram">) =>
  [i.product.slug, i.color, i.monogram?.initials ?? "", i.monogram?.foil ?? ""].join("|");

type StoredLine = {
  slug: string;
  color: string;
  quantity: number;
  monogram?: Monogram | undefined;
};

type Ctx = {
  theme: ThemeId;
  effectiveTheme: "saddle" | "espresso";
  isDark: boolean;
  setTheme: (t: ThemeId) => void;
  toggleColorMode: () => void;
  cartOpen: boolean;
  setCartOpen: (o: boolean) => void;
  savedOpen: boolean;
  setSavedOpen: (o: boolean) => void;
  cartItems: CartItem[];
  addToCart: (product: Product, color?: string, monogram?: Monogram) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  favorites: string[];
  toggleFavorite: (slug: string) => void;
};

const StoreCtx = createContext<Ctx | null>(null);

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable (private mode); state still works for this visit
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("saddle");
  const [systemIsDark, setSystemIsDark] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const hydrated = useRef(false);

  useEffect(() => {
    setThemeState(normalizeTheme(localStorage.getItem("hh-theme")));
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemIsDark(media.matches);
    const listener = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    media.addEventListener("change", listener);

    setFavorites(readJson<string[]>("hh-favs", []).filter((s) => findProduct(s)));
    setCartItems(
      readJson<StoredLine[]>("hh-cart", []).flatMap((l) => {
        const product = findProduct(l.slug);
        return product && l.quantity > 0
          ? [{ product, color: l.color, quantity: l.quantity, monogram: l.monogram }]
          : [];
      }),
    );
    hydrated.current = true;
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    writeJson(
      "hh-cart",
      cartItems.map<StoredLine>((i) => ({
        slug: i.product.slug,
        color: i.color,
        quantity: i.quantity,
        monogram: i.monogram,
      })),
    );
  }, [cartItems]);

  const effectiveTheme = theme === "system" ? (systemIsDark ? "espresso" : "saddle") : theme;
  const isDark = effectiveTheme === "espresso";

  useEffect(() => {
    document.documentElement.dataset["theme"] = effectiveTheme;
  }, [effectiveTheme]);

  const setTheme = (t: ThemeId) => {
    setThemeState(t);
    try {
      localStorage.setItem("hh-theme", t);
    } catch {
      // ignore
    }
  };

  const toggleColorMode = () => setTheme(isDark ? "saddle" : "espresso");

  const addToCart = (product: Product, color?: string, monogram?: Monogram) => {
    const line: CartItem = {
      product,
      color: color || product.colors[0] || "Standard",
      quantity: 1,
      monogram: monogram?.initials ? monogram : undefined,
    };
    const key = lineKey(line);
    setCartItems((prev) =>
      prev.some((i) => lineKey(i) === key)
        ? prev.map((i) => (lineKey(i) === key ? { ...i, quantity: i.quantity + 1 } : i))
        : [...prev, line],
    );
    setSavedOpen(false);
    setCartOpen(true);
  };

  const removeFromCart = (key: string) =>
    setCartItems((prev) => prev.filter((i) => lineKey(i) !== key));

  const updateQuantity = (key: string, delta: number) =>
    setCartItems((prev) =>
      prev.flatMap((i) => {
        if (lineKey(i) !== key) return [i];
        const quantity = i.quantity + delta;
        return quantity > 0 ? [{ ...i, quantity }] : [];
      }),
    );

  const clearCart = () => setCartItems([]);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      writeJson("hh-favs", next);
      return next;
    });
  };

  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  return (
    <StoreCtx.Provider
      value={{
        theme,
        effectiveTheme,
        isDark,
        setTheme,
        toggleColorMode,
        cartOpen,
        setCartOpen,
        savedOpen,
        setSavedOpen,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </StoreCtx.Provider>
  );
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}

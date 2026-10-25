import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export const themes = [
  {
    id: "saddle",
    name: "Saddle",
    tone: "light",
    description: "Alabaster porcelain & rich cognac",
    swatch: ["oklch(0.985 0.004 80)", "oklch(0.50 0.13 46)"],
  },
  {
    id: "midnight",
    name: "Midnight",
    tone: "dark",
    description: "Smoky obsidian & burnished brass",
    swatch: ["oklch(0.17 0.008 70)", "oklch(0.78 0.12 85)"],
  },
  {
    id: "espresso",
    name: "Espresso",
    tone: "dark",
    description: "Velvet dark roast & champagne gold",
    swatch: ["oklch(0.14 0.015 45)", "oklch(0.74 0.13 75)"],
  },
  {
    id: "bourbon",
    name: "Bourbon",
    tone: "light",
    description: "Golden amber whiskey & warm camel",
    swatch: ["oklch(0.975 0.018 78)", "oklch(0.52 0.15 58)"],
  },
  {
    id: "olive",
    name: "Olive Field",
    tone: "light",
    description: "Sage botanical mist & forest bridle",
    swatch: ["oklch(0.96 0.008 105)", "oklch(0.44 0.08 125)"],
  },
  {
    id: "oxblood",
    name: "Oxblood",
    tone: "light",
    description: "Royal bordeaux & aged parchment",
    swatch: ["oklch(0.965 0.008 70)", "oklch(0.38 0.12 20)"],
  },
] as const;

export type ThemeId = (typeof themes)[number]["id"] | "system";

export type CartItem = {
  product: Product;
  color: string;
  quantity: number;
};

type Ctx = {
  theme: string;
  effectiveTheme: string;
  isDark: boolean;
  setTheme: (t: string) => void;
  toggleColorMode: () => void;
  cartOpen: boolean;
  setCartOpen: (o: boolean) => void;
  cartItems: CartItem[];
  addToCart: (product: Product, color?: string) => void;
  removeFromCart: (slug: string, color: string) => void;
  updateQuantity: (slug: string, color: string, delta: number) => void;
  cartCount: number;
  cartSubtotal: number;
  favorites: string[];
  toggleFavorite: (slug: string) => void;
};

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<string>("saddle");
  const [systemIsDark, setSystemIsDark] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => [
    { product: products[0]!, color: "Cognac", quantity: 1 },
    { product: products[1]!, color: "Chestnut", quantity: 1 },
  ]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("hh-theme");
    if (saved) setThemeState(saved);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemIsDark(media.matches);
    const listener = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    media.addEventListener("change", listener);

    const savedFavs = localStorage.getItem("hh-favs");
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch {
        // ignore
      }
    }
    return () => media.removeEventListener("change", listener);
  }, []);

  const effectiveTheme = theme === "system" ? (systemIsDark ? "midnight" : "saddle") : theme;
  const isDark = effectiveTheme === "midnight" || effectiveTheme === "espresso";

  useEffect(() => {
    document.documentElement.dataset["theme"] = effectiveTheme;
  }, [effectiveTheme]);

  const setTheme = (t: string) => {
    setThemeState(t);
    localStorage.setItem("hh-theme", t);
  };

  const toggleColorMode = () => {
    if (isDark) {
      setTheme("saddle");
    } else {
      setTheme("midnight");
    }
  };

  const addToCart = (product: Product, color?: string) => {
    const selectedColor = color || product.colors[0] || "Standard";
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.slug === product.slug && item.color === selectedColor,
      );
      if (existing) {
        return prev.map((item) =>
          item.product.slug === product.slug && item.color === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, color: selectedColor, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (slug: string, color: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.slug === slug && item.color === color)),
    );
  };

  const updateQuantity = (slug: string, color: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.slug === slug && item.color === color) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null),
    );
  };

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      try {
        localStorage.setItem("hh-favs", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

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
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
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

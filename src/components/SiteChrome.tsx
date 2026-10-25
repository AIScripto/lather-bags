import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Palette,
  ShoppingBag,
  X,
  Menu,
  Trash2,
  Plus,
  Minus,
  Sun,
  Moon,
  Monitor,
  Check,
} from "lucide-react";
import { themes, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/bags", label: "Bags" },
  { to: "/about", label: "Our Craft" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { theme, isDark, setTheme, toggleColorMode, setCartOpen, cartCount } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const isHome = useLocation({ select: (l) => l.pathname }) === "/";
  const [themeOpen, setThemeOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  // Click outside to close theme dropdown
  useEffect(() => {
    if (!themeOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setThemeOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [themeOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled ? "border-b bg-background/90 py-3 backdrop-blur-md" : "py-6",
        !scrolled && isHome && "text-ink-foreground",
      )}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 md:px-10">
        <nav className="hidden gap-8 text-sm md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="link-line"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={menu ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <Link to="/" className="font-display text-2xl tracking-tight md:text-3xl">
          Hollow{" "}
          <span className={cn("italic", !scrolled && isHome ? "text-accent" : "text-primary")}>
            &amp;
          </span>{" "}
          Hide
        </Link>
        <div className="flex items-center gap-1.5 md:gap-3">
          {/* Quick Light/Dark Mode Switcher */}
          <button
            aria-label={
              isDark ? "Switch to light theme (Saddle)" : "Switch to dark theme (Midnight)"
            }
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleColorMode}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-transform hover:scale-110 hover:text-primary"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Expanded Atelier Theme Picker */}
          <div className="relative" ref={themeDropdownRef}>
            <button
              aria-label="Choose atelier leather theme"
              aria-expanded={themeOpen}
              onClick={() => setThemeOpen(!themeOpen)}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full px-2 text-xs font-medium uppercase tracking-wider transition-colors hover:text-primary"
            >
              <Palette className="h-4 w-4" />
              <span className="hidden md:inline">Theme</span>
            </button>
            {themeOpen && (
              <div className="absolute right-0 top-12 w-72 animate-in fade-in slide-in-from-top-2 rounded-2xl border bg-popover/95 backdrop-blur-md p-2.5 shadow-2xl z-50">
                <div className="flex items-center justify-between border-b pb-2 px-2.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span>Atelier Palettes</span>
                  <span className="text-[10px] lowercase text-primary font-normal">OKLCH</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setThemeOpen(false);
                      }}
                      className={cn(
                        "flex w-full min-h-[44px] items-center justify-between rounded-xl px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-muted",
                        theme === t.id &&
                          "bg-muted font-semibold text-foreground ring-1 ring-border/50",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex overflow-hidden rounded-full border border-border shadow-xs shrink-0">
                          <span className="h-4 w-2.5" style={{ background: t.swatch[0] }} />
                          <span className="h-4 w-2.5" style={{ background: t.swatch[1] }} />
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium">{t.name}</span>
                            <span className="rounded bg-muted/80 px-1.5 py-0.2 text-[9px] uppercase tracking-wider text-muted-foreground">
                              {t.tone}
                            </span>
                          </div>
                          <span className="block text-[10px] text-muted-foreground leading-tight">
                            {t.description}
                          </span>
                        </div>
                      </div>
                      {theme === t.id && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                    </button>
                  ))}
                </div>
                <div className="border-t mt-1.5 pt-1.5">
                  <button
                    onClick={() => {
                      setTheme("system");
                      setThemeOpen(false);
                    }}
                    className={cn(
                      "flex w-full min-h-[40px] items-center justify-between rounded-xl px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-muted",
                      theme === "system" &&
                        "bg-muted font-semibold text-foreground ring-1 ring-border/50",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Monitor className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div>
                        <span className="font-medium block">System Mode</span>
                        <span className="text-[10px] text-muted-foreground block leading-tight">
                          Auto-sync with OS dark/light
                        </span>
                      </div>
                    </div>
                    {theme === "system" && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            aria-label={`Open shopping bag, ${cartCount} items`}
            onClick={() => setCartOpen(true)}
            className="relative flex h-11 w-11 items-center justify-center transition-transform hover:scale-105"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {menu && (
        <nav className="flex flex-col gap-6 border-t bg-background px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMenu(false)}
                className="font-display text-2xl"
              >
                {n.label}
              </Link>
            ))}
          </div>
          <div className="border-t pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Atelier Theme
            </p>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border p-2.5 text-left text-xs transition-colors",
                    theme === t.id
                      ? "border-primary bg-primary/10 font-semibold"
                      : "hover:bg-muted",
                  )}
                >
                  <span className="flex overflow-hidden rounded-full border border-border shadow-xs shrink-0">
                    <span className="h-4 w-2" style={{ background: t.swatch[0] }} />
                    <span className="h-4 w-2" style={{ background: t.swatch[1] }} />
                  </span>
                  <span className="truncate">{t.name}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, removeFromCart, updateQuantity, cartSubtotal } =
    useStore();
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && cartOpen) setCartOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cartOpen, setCartOpen]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag"
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-500",
        cartOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background p-8 transition-transform duration-500 ease-out",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="font-display text-3xl">Your bag</h2>
          <button
            aria-label="Close bag drawer"
            onClick={() => setCartOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 flex-1 space-y-6 overflow-y-auto pr-2">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <ShoppingBag className="mx-auto h-12 w-12 opacity-30" />
              <p className="mt-4 font-display text-2xl">Your bag is empty.</p>
              <p className="mt-2 text-sm">Discover pieces built for decades of living.</p>
              <Link
                to="/bags"
                onClick={() => setCartOpen(false)}
                className="mt-6 inline-block bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground"
              >
                Shop the collection
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.product.slug}-${item.color}`} className="flex gap-4 border-b pb-6">
                <img
                  src={item.product.image}
                  alt={item.product.alt}
                  className="h-28 w-24 object-cover"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="font-display text-lg">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Colour: {item.color}</p>
                    <p className="mt-1 text-sm font-medium">${item.product.price}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 border">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.product.slug, item.color, -1)}
                        className="flex h-8 w-8 items-center justify-center hover:bg-muted"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-medium">{item.quantity}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.product.slug, item.color, 1)}
                        className="flex h-8 w-8 items-center justify-center hover:bg-muted"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      aria-label={`Remove ${item.product.name} (${item.color}) from bag`}
                      onClick={() => removeFromCart(item.product.slug, item.color)}
                      className="p-2 text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t pt-6">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-medium">${cartSubtotal}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Free worldwide shipping · Lifetime repairs included
            </p>
            <button
              onClick={() => setCheckedOut(true)}
              className="mt-6 w-full bg-primary py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
            >
              {checkedOut ? "Order Confirmed — Thank You" : "Proceed to Checkout"}
            </button>
            {checkedOut && (
              <p className="mt-2 text-center text-xs text-primary">
                Demo checkout simulated successfully.
              </p>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}

export function SiteFooter() {
  const { theme, setTheme } = useStore();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="grain bg-ink px-6 pb-10 pt-24 text-ink-foreground md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <p className="font-display text-[14vw] leading-none tracking-tighter opacity-90 md:text-[10vw]">
          Hollow <span className="italic text-accent">&amp;</span> Hide
        </p>
        <div className="mt-16 grid gap-10 border-t border-ink-foreground/15 pt-10 text-sm md:grid-cols-4">
          <div>
            <p className="eyebrow text-accent">Shop</p>
            <ul className="mt-4 space-y-2 opacity-80">
              <li>
                <Link to="/bags" className="link-line">
                  All bags
                </Link>
              </li>
              <li>
                <Link to="/bags" className="link-line">
                  New arrivals
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-accent">House</p>
            <ul className="mt-4 space-y-2 opacity-80">
              <li>
                <Link to="/about" className="link-line">
                  Our craft
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link-line">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-accent">Letters from the workshop</p>
            {subscribed ? (
              <p className="mt-4 text-sm text-accent">
                Thank you. You have been added to the workshop ledger.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 flex border-b border-ink-foreground/30">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Your email address for workshop letters"
                  className="flex-1 bg-transparent py-3 outline-none placeholder:text-ink-foreground/50"
                />
                <button type="submit" className="eyebrow transition-colors hover:text-accent">
                  Subscribe →
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-ink-foreground/10 pt-6 text-xs opacity-75">
          <p>© 2026 Hollow &amp; Hide. Handcrafted leather goods.</p>
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-wider opacity-60">
              Atelier Palette:
            </span>
            <div className="flex items-center gap-1.5">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  title={`Switch to ${t.name} theme`}
                  className={cn(
                    "flex h-5 w-5 overflow-hidden rounded-full border border-ink-foreground/30 transition-transform hover:scale-125",
                    theme === t.id && "ring-2 ring-accent ring-offset-1 ring-offset-ink scale-110",
                  )}
                >
                  <span className="h-full w-1/2" style={{ background: t.swatch[0] }} />
                  <span className="h-full w-1/2" style={{ background: t.swatch[1] }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

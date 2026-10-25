import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  Heart,
  Menu,
  Minus,
  Moon,
  Plus,
  ShoppingBag,
  Sun,
  Trash2,
  X,
} from "lucide-react";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { collections } from "@/lib/products";
import { deliveryWindow, formatInitials, formatPrice } from "@/lib/format";
import { findProduct } from "@/lib/products";
import { foils, lineKey, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ProductMedia } from "./ProductMedia";

const nav = [
  { to: "/bags", label: "Shop" },
  { to: "/about", label: "Our Craft" },
  { to: "/contact", label: "Contact" },
] as const;

function IconButton({
  label,
  onClick,
  children,
  badge,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  badge?: number;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="relative flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:text-primary"
    >
      {children}
      {!!badge && (
        <span className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground tnum">
          {badge}
        </span>
      )}
    </button>
  );
}

export function SiteHeader() {
  const { isDark, toggleColorMode, setCartOpen, setSavedOpen, cartCount, favorites } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = useLocation({ select: (l) => l.pathname });
  const overHero = pathname === "/" && !scrolled && !menu;
  const menuRef = useRef<HTMLDivElement>(null);
  useFocusTrap(menu, menuRef, () => setMenu(false));

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  return (
    <header
      ref={menuRef}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,padding,color] duration-500",
        scrolled || menu ? "border-b bg-background/95 py-2.5 backdrop-blur-md" : "py-5",
        overHero ? "text-ink-foreground" : "text-foreground",
      )}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 md:px-10">
        <nav className="hidden gap-8 text-sm md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="link-line"
              activeProps={{ className: overHero ? "text-accent" : "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          aria-controls="mobile-menu"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <Link to="/" className="font-display text-2xl tracking-tight md:text-3xl">
          Hollow{" "}
          <span className={cn("italic", overHero ? "text-accent" : "text-primary")}>&amp;</span>{" "}
          Hide
        </Link>
        <div className="flex items-center md:gap-1">
          <IconButton
            label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleColorMode}
          >
            {isDark ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </IconButton>
          <IconButton
            label={`Saved pieces, ${favorites.length}`}
            onClick={() => setSavedOpen(true)}
            badge={favorites.length}
          >
            <Heart className="h-[18px] w-[18px]" />
          </IconButton>
          <IconButton
            label={`Open bag, ${cartCount} items`}
            onClick={() => setCartOpen(true)}
            badge={cartCount}
          >
            <ShoppingBag className="h-5 w-5" />
          </IconButton>
        </div>
      </div>
      {menu && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="flex flex-col gap-1 px-4 pb-8 pt-4 md:hidden"
        >
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="py-2 font-display text-4xl"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-wrap gap-2 border-t pt-6">
            {collections.map((c) => (
              <Link
                key={c.id}
                to="/bags"
                search={{ collection: c.id }}
                className="flex min-h-11 items-center rounded-full border px-4 text-sm"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

/** Right-hand sheet. Inert and hidden from assistive tech while closed. */
function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(open, ref, onClose);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-500",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      inert={!open}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={onClose} />
      <aside
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="font-display text-3xl">{title}</h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
        {footer && <div className="border-t px-6 py-6">{footer}</div>}
      </aside>
    </div>
  );
}

function EmptyState({
  title,
  body,
  onClose,
}: {
  title: string;
  body: string;
  onClose: () => void;
}) {
  return (
    <div className="py-16 text-center">
      <p className="font-display text-3xl">{title}</p>
      <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">{body}</p>
      <Link
        to="/bags"
        onClick={onClose}
        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
      >
        Browse the collection
      </Link>
    </div>
  );
}

type Step = "bag" | "review" | "placed";

export function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    clearCart,
  } = useStore();
  const [step, setStep] = useState<Step>("bag");
  const [orderNo, setOrderNo] = useState("");
  const close = () => setCartOpen(false);

  // Start fresh each time the drawer is reopened after an order or a review.
  useEffect(() => {
    if (!cartOpen) {
      const t = setTimeout(() => setStep("bag"), 500);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [cartOpen]);

  const placeOrder = () => {
    setOrderNo(`HH-${Math.floor(100000 + Math.random() * 900000)}`);
    clearCart();
    setStep("placed");
  };

  const title = step === "review" ? "Review order" : step === "placed" ? "Thank you" : "Your bag";

  const footer =
    step === "bag" && cartItems.length > 0 ? (
      <>
        <div className="flex justify-between text-base">
          <span>Subtotal</span>
          <span className="font-medium tnum">{formatPrice(cartSubtotal)}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Free shipping and monogramming. Arrives {deliveryWindow()}.
        </p>
        <button
          onClick={() => setStep("review")}
          className="mt-5 min-h-12 w-full rounded-full bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Review and check out
        </button>
      </>
    ) : step === "review" ? (
      <>
        <button
          onClick={placeOrder}
          className="min-h-12 w-full rounded-full bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Place order · {formatPrice(cartSubtotal)}
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          This is a demonstration shop. No payment is taken.
        </p>
      </>
    ) : null;

  return (
    <Drawer open={cartOpen} onClose={close} title={title} footer={footer}>
      {step === "placed" ? (
        <div className="py-10 text-center">
          <p className="font-display text-4xl">Order {orderNo}</p>
          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Your pieces go to the bench today. Expect them {deliveryWindow()}, with a note from the
            maker who signed them.
          </p>
          <button
            onClick={close}
            className="mt-8 inline-flex min-h-11 items-center rounded-full border px-6 text-sm"
          >
            Continue browsing
          </button>
        </div>
      ) : cartItems.length === 0 ? (
        <EmptyState
          title="Your bag is empty."
          body="Every piece is cut and stitched by one pair of hands, and mended free for life."
          onClose={close}
        />
      ) : step === "review" ? (
        <div>
          <button
            onClick={() => setStep("bag")}
            className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Edit bag
          </button>
          <ul className="divide-y border-y">
            {cartItems.map((i) => (
              <li key={lineKey(i)} className="flex justify-between gap-4 py-4 text-sm">
                <div>
                  <p className="font-medium">
                    {i.quantity} × {i.product.name}
                  </p>
                  <p className="text-muted-foreground">
                    {i.color}
                    {i.monogram &&
                      ` · ${formatInitials(i.monogram.initials)} in ${foils.find((f) => f.id === i.monogram!.foil)?.label.toLowerCase()}`}
                  </p>
                </div>
                <span className="tnum">{formatPrice(i.product.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 text-sm">
            {[
              ["Shipping", "Free, tracked"],
              ["Estimated delivery", deliveryWindow()],
              ["Returns", "60 days, free"],
              ["Repairs", "Free for life"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 border-t pt-3 text-base font-medium">
              <dt>Total</dt>
              <dd className="tnum">{formatPrice(cartSubtotal)}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <ul className="space-y-6">
          {cartItems.map((item) => {
            const key = lineKey(item);
            return (
              <li key={key} className="flex gap-4 border-b pb-6">
                <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                  <ProductMedia product={item.product} shade={item.color} />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="font-display text-xl leading-tight">{item.product.name}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.color}</p>
                    {item.monogram && (
                      <p className="text-sm text-muted-foreground">
                        Monogram {formatInitials(item.monogram.initials)}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-medium tnum">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center rounded-full border">
                      <button
                        aria-label={`Remove one ${item.product.name}`}
                        onClick={() => updateQuantity(key, -1)}
                        className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-muted"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium tnum" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        aria-label={`Add one more ${item.product.name}`}
                        onClick={() => updateQuantity(key, 1)}
                        className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-muted"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      aria-label={`Remove ${item.product.name} (${item.color}) from bag`}
                      onClick={() => removeFromCart(key)}
                      className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Drawer>
  );
}

export function SavedDrawer() {
  const { savedOpen, setSavedOpen, favorites, toggleFavorite, addToCart } = useStore();
  const close = () => setSavedOpen(false);
  const saved = favorites.map(findProduct).filter((p) => !!p);

  return (
    <Drawer open={savedOpen} onClose={close} title="Saved pieces">
      {saved.length === 0 ? (
        <EmptyState
          title="Nothing saved yet."
          body="Tap the heart on any piece to keep it here while you decide."
          onClose={close}
        />
      ) : (
        <ul className="space-y-6">
          {saved.map((p) => (
            <li key={p.slug} className="flex gap-4 border-b pb-6">
              <Link
                to="/bags/$slug"
                params={{ slug: p.slug }}
                onClick={close}
                className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-muted"
              >
                <ProductMedia product={p} />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    to="/bags/$slug"
                    params={{ slug: p.slug }}
                    onClick={close}
                    className="font-display text-xl leading-tight hover:text-primary"
                  >
                    {p.name}
                  </Link>
                  <p className="mt-1 text-sm tnum">{formatPrice(p.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addToCart(p)}
                    className="min-h-11 rounded-full bg-primary px-4 text-sm text-primary-foreground"
                  >
                    Add {p.colors[0]} to bag
                  </button>
                  <button
                    aria-label={`Remove ${p.name} from saved`}
                    onClick={() => toggleFavorite(p.slug)}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}

export function SiteFooter() {
  const [status, setStatus] = useState<"idle" | "invalid" | "done">("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("invalid");
      return;
    }
    setStatus("done");
    setEmail("");
  };

  return (
    <footer className="grain bg-ink px-4 pb-10 pt-24 text-ink-foreground md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Letters from the workshop</h2>
            <p className="mt-3 max-w-md text-ink-foreground/75">
              New pieces before anyone else, and essays on leather care. Once a month, never more.
            </p>
            {status === "done" ? (
              <p className="mt-6 text-accent" role="status">
                Thank you. The first letter arrives at the start of next month.
              </p>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 max-w-md">
                <div className="flex border-b border-ink-foreground/40 focus-within:border-accent">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "invalid") setStatus("idle");
                    }}
                    placeholder="Your email address"
                    aria-invalid={status === "invalid"}
                    aria-describedby={status === "invalid" ? "footer-email-error" : undefined}
                    className="flex-1 bg-transparent py-3 outline-none placeholder:text-ink-foreground/55"
                  />
                  <button
                    type="submit"
                    className="min-h-11 px-2 text-sm font-medium hover:text-accent"
                  >
                    Subscribe
                  </button>
                </div>
                {status === "invalid" && (
                  <p id="footer-email-error" className="mt-2 text-sm text-accent">
                    That address looks incomplete. Check for the @ and the domain.
                  </p>
                )}
              </form>
            )}
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="text-ink-foreground/60">Shop</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link to="/bags" search={{ collection: "new" }} className="link-line">
                    New this season
                  </Link>
                </li>
                {collections.map((c) => (
                  <li key={c.id}>
                    <Link to="/bags" search={{ collection: c.id }} className="link-line">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-ink-foreground/60">House</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link to="/about" className="link-line">
                    Our craft
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="link-line">
                    Contact and repairs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p
          aria-hidden="true"
          className="mt-20 font-display text-[15vw] leading-[0.85] tracking-[-0.03em] text-ink-foreground/90 md:text-[11vw]"
        >
          Hollow <span className="italic text-accent">&amp;</span> Hide
        </p>
        <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-ink-foreground/15 pt-6 text-xs text-ink-foreground/65">
          <p>© 2026 Hollow &amp; Hide. Prices in US dollars.</p>
          <p>Free shipping · 60-day returns · Repairs for life</p>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      data-visible={visible}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Parallax({
  src,
  alt,
  className,
  speed = 0.15,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    const img = imgRef.current;
    if (!el || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let isVisible = false;
    let ticking = false;

    // Written straight to the element: a React state update per frame re-renders for nothing.
    const updatePosition = () => {
      ticking = false;
      if (!isVisible) return;
      const r = el.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
      img.style.transform = `translate3d(0, ${offset}px, 0) scale(1.1)`;
    };

    const onScroll = () => {
      if (!ticking && isVisible) {
        ticking = true;
        window.requestAnimationFrame(updatePosition);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false;
        if (isVisible) updatePosition();
      },
      { rootMargin: "100px 0px" },
    );

    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-x-0 -top-[15%] h-[130%] w-full object-cover will-change-transform"
        style={{ transform: "scale(1.1)" }}
      />
    </div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div
      className="overflow-hidden border-y bg-ink py-5 text-ink-foreground"
      aria-label={items.join(", ")}
    >
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap" aria-hidden="true">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-3xl md:text-4xl">
            {t}
            <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

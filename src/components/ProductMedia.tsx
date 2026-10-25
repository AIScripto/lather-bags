import type { CSSProperties, ReactNode } from "react";
import { shades, type Product, type Shade, type SketchKind } from "@/lib/products";
import { cn } from "@/lib/utils";

const shadeColor = (shade?: string) => shades[shade as Shade]?.color ?? shades.Cognac.color;

/**
 * Pattern-table drawing for pieces that have not been photographed yet.
 * Filled with the selected shade so the colour choice is always visible.
 */
export function BagSketch({ kind, shade }: { kind: SketchKind; shade?: string | undefined }) {
  const c = shadeColor(shade);
  const body: CSSProperties = {
    fill: c,
    stroke: `color-mix(in oklch, ${c} 55%, black)`,
    strokeWidth: 2.5,
    strokeLinejoin: "round",
  };
  const panel: CSSProperties = { ...body, fill: `color-mix(in oklch, ${c} 88%, black)` };
  const strap: CSSProperties = {
    fill: "none",
    stroke: `color-mix(in oklch, ${c} 75%, black)`,
    strokeWidth: 12,
    strokeLinecap: "round",
  };
  const stitch: CSSProperties = {
    fill: "none",
    stroke: `color-mix(in oklch, ${c} 45%, white)`,
    strokeWidth: 1.6,
    strokeDasharray: "5 4",
    opacity: 0.8,
  };
  const brass: CSSProperties = {
    fill: "none",
    stroke: "var(--brass)",
    strokeWidth: 4,
    strokeLinejoin: "round",
  };
  const brassFill: CSSProperties = { fill: "var(--brass)" };

  const drawings: Record<SketchKind, ReactNode> = {
    portfolio: (
      <>
        <path d="M70 252 C30 262 30 312 70 318" style={strap} />
        <rect x="70" y="120" width="270" height="200" rx="14" style={body} />
        <rect x="80" y="130" width="250" height="180" rx="9" style={stitch} />
        <path d="M86 146 H324" style={{ ...brass, strokeWidth: 3 }} />
        <rect x="296" y="139" width="22" height="14" rx="3" style={brassFill} />
      </>
    ),
    quartermaster: (
      <>
        <path d="M160 118 Q200 58 240 118" style={strap} />
        <rect x="50" y="116" width="300" height="214" rx="12" style={body} />
        <rect x="60" y="126" width="280" height="194" rx="8" style={stitch} />
        {[66, 158, 250].map((x) => (
          <g key={x}>
            <rect x={x} y="200" width="84" height="112" rx="6" style={panel} />
            <rect x={x + 4} y="204" width="76" height="104" rx="4" style={stitch} />
            <path d={`M${x} 200 h84 v34 q-42 10 -84 0 z`} style={body} />
            <rect x={x + 37} y="222" width="10" height="44" rx="2" style={panel} />
            <rect x={x + 32} y="248" width="20" height="14" rx="2" style={brass} />
          </g>
        ))}
        <rect x="70" y="326" width="14" height="8" rx="2" style={brassFill} />
        <rect x="316" y="326" width="14" height="8" rx="2" style={brassFill} />
      </>
    ),
    flappack: (
      <>
        <path d="M178 74 Q200 48 222 74" style={{ ...strap, strokeWidth: 9 }} />
        <rect x="110" y="70" width="180" height="270" rx="24" style={body} />
        <path
          d="M110 108 Q110 70 146 70 H254 Q290 70 290 108 V220 Q200 244 110 220 Z"
          style={panel}
        />
        <path
          d="M120 110 Q120 82 148 82 H252 Q280 82 280 110 V212 Q200 232 120 212 Z"
          style={stitch}
        />
        <rect x="186" y="214" width="28" height="18" rx="4" style={body} />
        <rect x="120" y="256" width="160" height="70" rx="10" style={stitch} />
      </>
    ),
    rolltop: (
      <>
        <rect x="110" y="120" width="180" height="230" rx="20" style={body} />
        <rect x="102" y="76" width="196" height="50" rx="24" style={panel} />
        <path d="M112 101 H288" style={stitch} />
        {[150, 250].map((x) => (
          <g key={x}>
            <path
              d={`M${x} 90 V200`}
              style={{ ...strap, strokeWidth: 10, strokeLinecap: "butt" }}
            />
            <rect x={x - 11} y="184" width="22" height="16" rx="2" style={brass} />
          </g>
        ))}
        <rect x="132" y="232" width="136" height="92" rx="10" style={panel} />
        <path d="M144 248 H256" style={{ ...brass, strokeWidth: 3 }} />
        <rect x="140" y="240" width="120" height="76" rx="6" style={stitch} />
      </>
    ),
    barrel: (
      <>
        <path d="M150 196 Q150 110 200 110 Q250 110 250 196" style={strap} />
        <rect x="50" y="190" width="300" height="150" rx="74" style={body} />
        <rect x="62" y="200" width="276" height="130" rx="64" style={stitch} />
        <path d="M100 198 H300" style={{ ...brass, strokeWidth: 3 }} />
        {[150, 250].map((x) => (
          <rect key={x} x={x - 9} y="192" width="18" height="146" rx="3" style={panel} />
        ))}
        <circle cx="300" cy="198" r="6" style={brassFill} />
      </>
    ),
    tourer: (
      <>
        <path d="M150 180 Q150 96 200 96 Q250 96 250 180" style={strap} />
        <path d="M168 180 Q168 116 200 116 Q232 116 232 180" style={{ ...strap, strokeWidth: 8 }} />
        <rect x="30" y="176" width="340" height="170" rx="34" style={body} />
        <rect x="40" y="186" width="320" height="150" rx="26" style={stitch} />
        <rect x="42" y="200" width="78" height="122" rx="18" style={panel} />
        <path d="M81 212 V310" style={{ ...brass, strokeWidth: 3 }} />
        <path d="M130 184 H354" style={{ ...brass, strokeWidth: 3 }} />
        {[150, 250].map((x) => (
          <rect key={x} x={x - 8} y="178" width="16" height="166" rx="3" style={panel} />
        ))}
        <circle cx="60" cy="350" r="6" style={brassFill} />
        <circle cx="340" cy="350" r="6" style={brassFill} />
      </>
    ),
    cardholder: (
      <>
        <rect x="90" y="120" width="220" height="164" rx="12" style={body} />
        <path d="M96 168 H304 M96 204 H304" style={{ ...body, fill: "none" }} />
        <path d="M168 120 Q200 152 232 120" style={{ ...panel, strokeWidth: 2 }} />
        <rect x="98" y="128" width="204" height="148" rx="8" style={stitch} />
      </>
    ),
    tray: (
      <>
        <path d="M70 170 L110 130 H290 L330 170 V292 L290 330 H110 L70 292 Z" style={body} />
        <rect x="110" y="170" width="180" height="122" rx="4" style={panel} />
        <rect x="118" y="178" width="164" height="106" rx="2" style={stitch} />
        {[
          [100, 160],
          [300, 160],
          [100, 302],
          [300, 302],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="8" style={brassFill} />
        ))}
      </>
    ),
    tag: (
      <>
        <path d="M200 110 V40 Q200 26 214 26 H226" style={{ ...strap, strokeWidth: 10 }} />
        <rect x="216" y="18" width="22" height="18" rx="2" style={brass} />
        <rect x="140" y="104" width="120" height="200" rx="16" style={body} />
        <circle cx="200" cy="128" r="8" style={{ fill: "var(--card)" }} />
        <rect x="156" y="152" width="88" height="136" rx="8" style={panel} />
        <rect x="148" y="112" width="104" height="184" rx="10" style={stitch} />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-hidden="true">
      <ellipse cx="200" cy="364" rx="150" ry="10" fill="black" opacity="0.08" />
      {drawings[kind]}
    </svg>
  );
}

/** A square of the actual hide colour, optionally aged by `years` of daily carry. */
export function LeatherSwatch({
  shade,
  years = 0,
  className,
  children,
}: {
  shade: string;
  years?: number;
  className?: string;
  children?: ReactNode;
}) {
  const c = shadeColor(shade);
  const age = Math.min(years, 10) / 10;
  return (
    <div
      className={cn("leather relative overflow-hidden", className)}
      style={
        {
          "--hide": `color-mix(in oklch, ${c} ${100 - age * 38}%, oklch(0.28 0.07 45))`,
          "--sheen": `${0.12 + age * 0.22}`,
        } as CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-3 rounded-[inherit] border border-dashed border-white/30" />
      {children}
    </div>
  );
}

const A4: [number, number] = [21, 29.7];
const CARD: [number, number] = [8.6, 5.4];

/** The bag drawn to scale beside an A4 sheet (or a bank card for small goods). */
export function ScaleDiagram({ product }: { product: Product }) {
  const [w, h] = product.specs.size;
  const small = w < 30;
  const [rw, rh] = small ? CARD : A4;
  const refLabel = small ? "Bank card" : "A4 sheet";
  const pad = 6;
  const gap = small ? 4 : 6;
  const totalW = pad * 2 + w + gap + rw;
  const totalH = pad * 2 + Math.max(h, rh) + 6;
  const base = pad + Math.max(h, rh);
  const font = totalW / 34;

  return (
    <svg
      viewBox={`0 0 ${totalW} ${totalH}`}
      className="h-full w-full text-foreground"
      role="img"
      aria-label={`${product.name} is ${w} by ${h} centimetres, shown beside ${small ? "a bank card" : "an A4 sheet"}`}
    >
      <line
        x1={pad / 2}
        x2={totalW - pad / 2}
        y1={base}
        y2={base}
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth={font / 8}
      />
      <rect
        x={pad}
        y={base - h}
        width={w}
        height={h}
        rx={Math.min(w, h) * 0.06}
        fill={shadeColor(product.colors[0])}
        fillOpacity="0.85"
      />
      <rect
        x={pad + w + gap}
        y={base - rh}
        width={rw}
        height={rh}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth={font / 8}
        strokeDasharray={`${font / 2} ${font / 3}`}
      />
      <text x={pad} y={base + font * 1.4} fontSize={font} fill="currentColor" className="tnum">
        {w} × {h} cm
      </text>
      <text
        x={pad + w + gap}
        y={base + font * 1.4}
        fontSize={font}
        fill="currentColor"
        fillOpacity="0.7"
      >
        {refLabel}
      </text>
    </svg>
  );
}

/** Photograph when we have one, pattern-table drawing when we do not. */
export function ProductMedia({
  product,
  shade,
  className,
  sizes = "lazy",
}: {
  product: Product;
  shade?: string | undefined;
  className?: string;
  sizes?: "lazy" | "eager";
}) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.alt}
        loading={sizes}
        width={1024}
        height={1280}
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }
  return (
    <div className={cn("paper grid h-full w-full place-items-center p-[8%]", className)}>
      <div role="img" aria-label={product.alt} className="aspect-square w-full">
        <BagSketch kind={product.sketch ?? "portfolio"} shade={shade ?? product.colors[0]} />
      </div>
    </div>
  );
}

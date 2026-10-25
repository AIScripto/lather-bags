import { useId, type CSSProperties } from "react";
import { foils, type Monogram } from "@/lib/store";
import { formatInitials } from "@/lib/format";
import { cn } from "@/lib/utils";

/** A small leather tab stamped with the initials, in the chosen finish. */
export function MonogramTag({ monogram, className }: { monogram: Monogram; className?: string }) {
  return (
    <div
      className={cn(
        "leather relative grid h-20 w-36 place-items-center rounded-lg shadow-[0_10px_24px_-12px_oklch(0.2_0.03_50/0.6)]",
        className,
      )}
      style={{ "--hide": "oklch(0.36 0.07 42)", "--sheen": "0.18" } as CSSProperties}
      aria-hidden="true"
    >
      <div className="absolute inset-1.5 rounded-md border border-dashed border-white/25" />
      <span
        className={cn(
          "font-display text-3xl font-semibold tracking-[0.18em]",
          monogram.foil === "gold" && "text-foil-gold [text-shadow:0_1px_1px_oklch(0_0_0/0.7)]",
          monogram.foil === "silver" && "text-foil-silver [text-shadow:0_1px_1px_oklch(0_0_0/0.7)]",
          monogram.foil === "blind" &&
            "text-[oklch(0.24_0.05_42)] [text-shadow:0_-1px_0_oklch(1_0_0/0.18),0_1px_2px_oklch(0_0_0/0.8)]",
        )}
      >
        {formatInitials(monogram.initials || "HH")}
      </span>
    </div>
  );
}

export function MonogramPicker({
  value,
  onChange,
}: {
  value: Monogram;
  onChange: (m: Monogram) => void;
}) {
  const id = useId();
  return (
    <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
      <div className="space-y-4">
        <div>
          <label htmlFor={`${id}-initials`} className="text-sm font-medium text-foreground">
            Initials <span className="text-muted-foreground">(up to 3 letters)</span>
          </label>
          <input
            id={`${id}-initials`}
            value={value.initials}
            onChange={(e) =>
              onChange({
                ...value,
                initials: e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z]/g, "")
                  .slice(0, 3),
              })
            }
            placeholder="e.g. AR"
            autoComplete="off"
            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-lg font-semibold uppercase tracking-[0.2em] outline-none transition-colors focus:border-primary"
          />
        </div>
        <fieldset>
          <legend className="text-sm font-medium text-foreground">Finish</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {foils.map((f) => (
              <label
                key={f.id}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary",
                  value.foil === f.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border hover:border-foreground/40",
                )}
              >
                <input
                  type="radio"
                  name={`${id}-foil`}
                  value={f.id}
                  checked={value.foil === f.id}
                  onChange={() => onChange({ ...value, foil: f.id })}
                  className="sr-only"
                />
                <span
                  className={cn(
                    "h-3 w-3 rounded-full",
                    f.id === "gold" && "bg-foil-gold",
                    f.id === "silver" && "bg-foil-silver",
                    f.id === "blind" && "bg-[oklch(0.36_0.07_42)]",
                  )}
                />
                {f.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <MonogramTag monogram={value} className="justify-self-center" />
    </div>
  );
}

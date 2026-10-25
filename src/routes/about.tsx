import { createFileRoute } from "@tanstack/react-router";
import craft from "@/assets/craft.jpg";
import lifestyle from "@/assets/lifestyle.jpg";
import { Parallax, Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Craft — Hollow & Hide" },
      {
        name: "description",
        content: "The story, the workshop and the hands behind every Hollow & Hide bag.",
      },
      { property: "og:title", content: "Our Craft — Hollow & Hide" },
      { property: "og:description", content: "The story behind our handcrafted leather bags." },
    ],
  }),
  component: About,
});

const timeline = [
  ["1987", "A single bench in a converted stable. The first satchel is sold to a neighbour."],
  ["1998", "We begin tanning with a family-run tannery we still work with today."],
  ["2012", "The Lifetime Repair promise: every bag we've ever made, mended for free."],
  ["2026", "Twelve artisans, one workshop. Still signed by hand."],
];

function About() {
  return (
    <>
      <section className="mx-auto max-w-[1500px] px-6 pb-20 pt-40 md:px-10">
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.95] tracking-tight md:text-8xl lg:text-9xl">
          Slow hands, <em className="text-primary">long</em> lives.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Founded in a stone stable in 1987, Hollow &amp; Hide exists to build carry goods that
          outlive trends and gain character with every journey.
        </p>
      </section>
      <section className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-2 items-center rounded-3xl border bg-card/60 p-6 md:p-10 shadow-xl">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-border/50">
            <Parallax
              src={craft}
              alt="Artisan hand-stitching full-grain bridle leather with waxed linen thread"
              className="h-full w-full"
              speed={0.12}
            />
          </div>
          <div className="md:px-6">
            <span className="eyebrow text-primary">The Workbench Manifesto</span>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              Every cut guided by human eye &amp; blade.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Machines cannot judge the natural elasticity of a vegetable-tanned hide. Each piece
              begins with our master cutter inspecting the surface grain, working around natural
              range marks to place the highest-stress straps across the spine of the hide.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t pt-6 text-xs text-muted-foreground">
              <div>
                <p className="font-display text-3xl text-foreground font-semibold">0%</p>
                <p className="mt-1">Synthetic fillers or cardboard bonding</p>
              </div>
              <div>
                <p className="font-display text-3xl text-foreground font-semibold">100%</p>
                <p className="mt-1">Hand-waxed linen saddle stitching</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1500px] gap-16 px-6 py-28 md:grid-cols-[1fr_1.4fr] md:px-10">
        <Reveal className="md:sticky md:top-32 md:self-start">
          <h2 className="font-display text-5xl md:text-7xl">
            A short <em>history</em>.
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
            Four decades of slow, careful work, and the exact same promise from our very first bag.
          </p>
        </Reveal>
        <div className="border-b">
          {timeline.map(([y, t], i) => (
            <Reveal
              key={y}
              delay={i * 100}
              className="grid grid-cols-[90px_1fr] gap-6 border-t py-10 md:grid-cols-[160px_1fr]"
            >
              <p className="font-display text-4xl text-primary md:text-5xl tnum">{y}</p>
              <p className="pt-2 leading-relaxed text-muted-foreground">{t}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-y bg-card/40 py-20">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10">
          <div className="mb-14">
            <span className="eyebrow text-primary">Artisanal Purity</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl italic tracking-tight">
              The Material Standard
            </h2>
            <p className="mt-2 text-base text-muted-foreground reading-measure">
              Why we refuse chrome tanning, synthetic threads, and plated alloys.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              [
                "Vegetable-Tanned Bridle Hide",
                "Sourced from family-run tanneries steeped in chestnut bark and natural waxes. The dense outer hide retains natural grain variations and patinas richly with handling.",
              ],
              [
                "Hand-Waxed Saddle Stitch",
                "Passed with two needles simultaneously through hand-punched awl holes. If any outer loop wears through, the opposing knot never unravels.",
              ],
              [
                "Solid Cast Hardware",
                "100% solid brass sand-castings. There is no copper plating or lacquer to chip away—only metal that darkens to a warm, antique burnish over years of wear.",
              ],
            ].map(([h, t], i) => (
              <Reveal key={h} delay={i * 120} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                  <h3 className="font-display text-2xl font-medium tracking-tight text-foreground">
                    {h}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="relative h-[70vh] overflow-hidden">
        <Parallax
          src={lifestyle}
          alt="Satchel on the road"
          className="absolute inset-0"
          speed={0.2}
        />
        <div className="absolute inset-0 bg-ink/40" />
        <Reveal className="relative flex h-full items-center justify-center px-6 text-center text-ink-foreground">
          <h2 className="max-w-4xl font-display text-5xl italic md:text-7xl">
            Made once. Mended forever.
          </h2>
        </Reveal>
      </section>
    </>
  );
}

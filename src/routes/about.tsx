import { createFileRoute, Link } from "@tanstack/react-router";
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
      <section className="mx-auto max-w-[1500px] px-4 pb-20 pt-32 md:px-10 md:pt-40">
        <h1 className="max-w-5xl animate-rise font-display text-6xl leading-[0.95] md:text-8xl">
          Slow hands, long lives.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Founded in a stone stable in 1987, Hollow &amp; Hide exists to build carry goods that
          outlive trends and gain character with every journey.
        </p>
      </section>
      <section className="mx-auto max-w-[1500px] px-4 md:px-10">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Parallax
              src={craft}
              alt="Artisan hand-stitching full-grain bridle leather with waxed linen thread"
              className="h-full w-full"
              speed={0.12}
            />
          </div>
          <div className="md:px-6">
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Every cut guided by human eye &amp; blade.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Machines cannot judge the natural elasticity of a vegetable-tanned hide. Each piece
              begins with our master cutter inspecting the surface grain, working around natural
              range marks to place the highest-stress straps across the spine of the hide.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              There is no cardboard stiffening and no bonded filler inside our bags. What gives them
              shape is the hide itself, and hand-waxed linen thread.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1500px] gap-16 px-4 py-28 md:grid-cols-[1fr_1.4fr] md:px-10">
        <Reveal className="md:sticky md:top-32 md:self-start">
          <h2 className="font-display text-5xl md:text-7xl">A short history</h2>
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
        <div className="mx-auto max-w-[1500px] px-4 md:px-10">
          <div className="mb-14">
            <h2 className="font-display text-5xl md:text-6xl">What we refuse to use</h2>
            <p className="mt-2 text-base text-muted-foreground reading-measure">
              Why we refuse chrome tanning, synthetic threads, and plated alloys.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
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
              <Reveal key={h} delay={i * 120} className="border-t border-foreground/20 pt-6">
                <h3 className="font-display text-3xl leading-tight">{h}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{t}</p>
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
        <Reveal className="relative flex h-full flex-col items-center justify-center px-4 text-center text-ink-foreground">
          <h2 className="max-w-4xl font-display text-5xl italic md:text-7xl">
            Made once. Mended forever.
          </h2>
          <Link
            to="/contact"
            className="mt-8 inline-flex min-h-12 items-center rounded-full border border-ink-foreground/70 px-8 text-sm transition-colors hover:bg-ink-foreground hover:text-ink"
          >
            Arrange a repair
          </Link>
        </Reveal>
      </section>
    </>
  );
}

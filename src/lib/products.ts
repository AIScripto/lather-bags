import briefcase from "@/assets/bag-briefcase.jpg";
import tote from "@/assets/bag-tote.jpg";
import backpack from "@/assets/bag-backpack.jpg";
import messenger from "@/assets/bag-messenger.jpg";
import duffel from "@/assets/bag-duffel.jpg";
import hero from "@/assets/hero.jpg";

export type Shade = "Cognac" | "Chestnut" | "Tan" | "Black" | "Oxblood" | "Olive" | "Natural";

export const shades: Record<Shade, { color: string; note: string }> = {
  Cognac: { color: "oklch(0.52 0.12 48)", note: "Warm red-brown that deepens to mahogany." },
  Chestnut: { color: "oklch(0.36 0.07 40)", note: "Dark, quiet brown with a soft sheen." },
  Tan: { color: "oklch(0.65 0.11 65)", note: "Honey tan that darkens fastest of all." },
  Black: { color: "oklch(0.22 0.01 60)", note: "Dense black that polishes rather than darkens." },
  Oxblood: { color: "oklch(0.33 0.1 20)", note: "Deep claret that turns almost black-cherry." },
  Olive: { color: "oklch(0.42 0.06 110)", note: "Waxed field green with a pull-up bloom." },
  Natural: { color: "oklch(0.78 0.06 75)", note: "Undyed vegetable tan. Patinas dramatically." },
};

export type Collection = "work" | "everyday" | "travel" | "small-goods";

export const collections: { id: Collection; label: string; line: string }[] = [
  {
    id: "work",
    label: "Work",
    line: "Briefcases and portfolios for the commute and the courtroom.",
  },
  { id: "everyday", label: "Everyday", line: "Satchels, totes and packs that carry a whole day." },
  {
    id: "travel",
    label: "Travel",
    line: "Holdalls sized for one night, two days, or a long week.",
  },
  {
    id: "small-goods",
    label: "Small goods",
    line: "Offcuts of the same hides, made into the pieces that finish a set.",
  },
];

export type SketchKind =
  | "portfolio"
  | "quartermaster"
  | "flappack"
  | "rolltop"
  | "barrel"
  | "tourer"
  | "cardholder"
  | "tray"
  | "tag";

export type Product = {
  slug: string;
  name: string;
  category: string;
  collection: Collection;
  price: number;
  /** Studio photograph. Pieces without one are shown as a pattern-table drawing. */
  image?: string;
  /** CSS object-position for the hardware close-up crop of `image`. */
  detailFocus?: string;
  sketch?: SketchKind;
  alt: string;
  colors: Shade[];
  blurb: string;
  details: string;
  materials: string;
  specs: {
    /** Centimetres: width × height × depth. */
    size: [number, number, number];
    weight: string;
    capacity?: string;
    laptop?: string;
    fits: string[];
  };
  isNew?: boolean;
  pairsWith: string[];
};

const BRIDLE =
  "Full-grain vegetable-tanned bridle leather, solid sand-cast brass hardware, hand-bevelled edges and waxed Irish linen thread.";

export const products: Product[] = [
  {
    slug: "the-heritage-satchel",
    name: "The Heritage Satchel",
    category: "Satchels",
    collection: "everyday",
    price: 395,
    image: hero,
    detailFocus: "43% 50%",
    alt: "Cognac leather satchel with twin brass buckles",
    colors: ["Cognac", "Chestnut", "Black"],
    blurb: "Our signature twin-buckle satchel, cut from full-grain bridle leather.",
    details:
      "Twin buckled straps over a deep front pocket, a rolled top handle and an adjustable shoulder strap. Inside, two drop pockets and a brass key fob.",
    materials: BRIDLE,
    specs: {
      size: [38, 29, 11],
      weight: "1.6 kg",
      capacity: "12 L",
      laptop: 'Up to 14"',
      fits: ['14" laptop', "A4 notebook", "Water bottle", "Keys and wallet"],
    },
    pairsWith: ["the-slim-card-holder", "the-ledger-portfolio", "the-valet-tray"],
  },
  {
    slug: "the-barrister-briefcase",
    name: "The Barrister Briefcase",
    category: "Briefcases",
    collection: "work",
    price: 465,
    image: briefcase,
    detailFocus: "34% 55%",
    alt: "Dark chestnut leather briefcase with brass buckles",
    colors: ["Chestnut", "Cognac"],
    blurb: "A structured briefcase with solid brass hardware, built for decades of use.",
    details:
      'A boxed body that stands on its own, a padded sleeve for a 15" laptop and a full-width document gusset. Detachable shoulder strap with brass dog clips.',
    materials: BRIDLE,
    specs: {
      size: [41, 30, 10],
      weight: "1.9 kg",
      capacity: "13 L",
      laptop: 'Up to 15"',
      fits: ['15" laptop', "A4 case files", "Charger pouch", "Compact umbrella"],
    },
    pairsWith: ["the-ledger-portfolio", "the-slim-card-holder", "the-luggage-tag"],
  },
  {
    slug: "the-market-tote",
    name: "The Market Tote",
    category: "Totes",
    collection: "everyday",
    price: 285,
    image: tote,
    detailFocus: "34% 50%",
    alt: "Tan leather tote with long shoulder handles",
    colors: ["Tan", "Black", "Oxblood"],
    blurb: "Unlined, soft-hand leather that softens beautifully with use.",
    details:
      "One open compartment with a snap-close inner pocket. Handles are cut long enough for the shoulder over a winter coat.",
    materials:
      "Unlined full-grain shoulder leather, hand-rolled handles and waxed Irish linen thread. No hardware to scratch a laptop.",
    specs: {
      size: [44, 34, 14],
      weight: "0.9 kg",
      capacity: "19 L",
      laptop: 'Up to 15" in a sleeve',
      fits: ['15" laptop in a sleeve', "A market shop", "A cardigan", "Water bottle"],
    },
    pairsWith: ["the-slim-card-holder", "the-valet-tray", "the-heritage-satchel"],
  },
  {
    slug: "the-rambler-rucksack",
    name: "The Rambler Rucksack",
    category: "Backpacks",
    collection: "everyday",
    price: 525,
    image: backpack,
    detailFocus: "48% 40%",
    alt: "Olive waxed leather rucksack with buckled pockets",
    colors: ["Olive", "Cognac"],
    blurb: "Waxed pull-up leather rucksack for the long road.",
    details:
      "Drawstring main compartment under a twin-buckle flap, two front pockets and padded shoulder straps. A grab handle sits on the top seam.",
    materials:
      "Waxed pull-up leather that lightens where it creases, solid brass buckles and a cotton-drill lining.",
    specs: {
      size: [30, 44, 15],
      weight: "1.7 kg",
      capacity: "20 L",
      laptop: 'Up to 15"',
      fits: ['15" laptop', "Packable jacket", "Camera", "Lunch and flask"],
    },
    pairsWith: ["the-luggage-tag", "the-bothy-roll-top", "the-slim-card-holder"],
  },
  {
    slug: "the-courier",
    name: "The Courier",
    category: "Messengers",
    collection: "everyday",
    price: 345,
    image: messenger,
    detailFocus: "30% 38%",
    alt: "Black leather messenger bag with a woven strap",
    colors: ["Black", "Chestnut"],
    blurb: "A clean-lined crossbody messenger with a woven strap.",
    details:
      "A deep flap over a single compartment with a zipped back pocket. The woven strap adjusts with one hand.",
    materials:
      "Pebbled full-grain leather, a woven cotton strap and hand-polished nickel-silver hardware.",
    specs: {
      size: [39, 30, 9],
      weight: "1.3 kg",
      capacity: "10 L",
      laptop: 'Up to 14"',
      fits: ['14" laptop', "Paperback", "Headphones", "Keys and wallet"],
    },
    pairsWith: ["the-slim-card-holder", "the-ledger-portfolio", "the-luggage-tag"],
  },
  {
    slug: "the-weekender",
    name: "The Weekender",
    category: "Holdalls",
    collection: "travel",
    price: 595,
    image: duffel,
    detailFocus: "55% 40%",
    alt: "Oxblood leather duffel with twin rolled handles",
    colors: ["Oxblood", "Cognac"],
    blurb: "A roomy duffel that carries two days of living, beautifully.",
    details:
      "A full-length brass zip, rolled twin handles and a detachable shoulder strap. Fits most overhead lockers.",
    materials: BRIDLE,
    specs: {
      size: [52, 30, 26],
      weight: "2.4 kg",
      capacity: "40 L",
      fits: ["Two days of clothes", "Wash kit", "One pair of shoes", '15" laptop'],
    },
    pairsWith: ["the-luggage-tag", "the-overnighter-barrel", "the-valet-tray"],
  },
  {
    slug: "the-ledger-portfolio",
    name: "The Ledger Portfolio",
    category: "Portfolios",
    collection: "work",
    price: 310,
    sketch: "portfolio",
    alt: "Drawing of a slim zip-top leather document portfolio with a wrist strap",
    colors: ["Chestnut", "Black", "Cognac"],
    blurb: "A slim zip-top document case: the briefcase pared down to its essentials.",
    details:
      "A wrap-around brass zip, a detachable wrist strap and a pen loop inside. One open sleeve for papers, one padded sleeve for a laptop.",
    materials: BRIDLE,
    specs: {
      size: [40, 29, 3],
      weight: "0.7 kg",
      capacity: "3 L",
      laptop: 'Up to 14"',
      fits: ['14" laptop', "A4 papers", "Fountain pen", "Phone"],
    },
    isNew: true,
    pairsWith: ["the-barrister-briefcase", "the-slim-card-holder", "the-valet-tray"],
  },
  {
    slug: "the-quartermaster",
    name: "The Quartermaster",
    category: "Briefcases",
    collection: "work",
    price: 485,
    sketch: "quartermaster",
    alt: "Drawing of a field briefcase with three buckled front pockets",
    colors: ["Tan", "Chestnut", "Olive"],
    blurb: "A field briefcase with three buckled pockets for everything that needs a place.",
    details:
      "Three gusseted front pockets in contrast stitching, a zipped main compartment and a detachable shoulder strap. Brass feet protect the base.",
    materials: BRIDLE,
    specs: {
      size: [41, 31, 12],
      weight: "2.0 kg",
      capacity: "14 L",
      laptop: 'Up to 15"',
      fits: ['15" laptop', "A4 files", "Notebook and pens", "Glasses case"],
    },
    isNew: true,
    pairsWith: ["the-ledger-portfolio", "the-luggage-tag", "the-slim-card-holder"],
  },
  {
    slug: "the-drover-flap-pack",
    name: "The Drover Flap Pack",
    category: "Backpacks",
    collection: "everyday",
    price: 410,
    sketch: "flappack",
    alt: "Drawing of a structured leather backpack with a broad front flap",
    colors: ["Cognac", "Black", "Chestnut"],
    blurb: "A structured flap pack with a hidden magnetic close and a back-entry laptop sleeve.",
    details:
      "The flap closes on concealed magnets: no buckles to undo on the platform. The laptop sleeve opens from the back panel, against your spine.",
    materials:
      "Full-grain bridle leather, concealed magnetic closure, padded back panel and waxed Irish linen thread.",
    specs: {
      size: [29, 40, 13],
      weight: "1.5 kg",
      capacity: "16 L",
      laptop: 'Up to 15"',
      fits: ['15" laptop', "Gym kit", "Notebook", "Water bottle"],
    },
    isNew: true,
    pairsWith: ["the-slim-card-holder", "the-luggage-tag", "the-courier"],
  },
  {
    slug: "the-bothy-roll-top",
    name: "The Bothy Roll-Top",
    category: "Backpacks",
    collection: "travel",
    price: 445,
    sketch: "rolltop",
    alt: "Drawing of a roll-top leather rucksack with buckled side straps",
    colors: ["Chestnut", "Olive", "Natural"],
    blurb: "A roll-top rucksack in distressed pull-up leather, lined in waxed canvas.",
    details:
      "Roll it once for a short day, three times for a full one. Two buckled straps hold the roll; a zipped front pocket keeps tickets to hand.",
    materials:
      "Distressed pull-up leather, waxed cotton-canvas lining, solid brass buckles and waxed Irish linen thread.",
    specs: {
      size: [31, 48, 14],
      weight: "1.6 kg",
      capacity: "18–24 L",
      laptop: 'Up to 16"',
      fits: ['16" laptop', "Overnight change", "Camera", "Rain shell"],
    },
    isNew: true,
    pairsWith: ["the-luggage-tag", "the-rambler-rucksack", "the-overnighter-barrel"],
  },
  {
    slug: "the-overnighter-barrel",
    name: "The Overnighter Barrel",
    category: "Holdalls",
    collection: "travel",
    price: 455,
    sketch: "barrel",
    alt: "Drawing of a small round barrel holdall with twin leather bands",
    colors: ["Cognac", "Black", "Oxblood"],
    blurb: "A compact barrel holdall with twin leather bands, sized for one night away.",
    details:
      "Two leather bands run under the base and become the handles. A single brass zip opens the full length; one inner pocket for a wash kit.",
    materials: BRIDLE,
    specs: {
      size: [46, 26, 26],
      weight: "1.6 kg",
      capacity: "24 L",
      fits: ["One night of clothes", "Wash kit", "Paperback", "Charger"],
    },
    isNew: true,
    pairsWith: ["the-luggage-tag", "the-weekender", "the-valet-tray"],
  },
  {
    slug: "the-grand-tourer",
    name: "The Grand Tourer",
    category: "Holdalls",
    collection: "travel",
    price: 640,
    sketch: "tourer",
    alt: "Drawing of a large leather holdall with a zipped shoe compartment at one end",
    colors: ["Chestnut", "Cognac"],
    blurb: "Our largest holdall, with a separate shoe compartment and a fold for one suit.",
    details:
      "A zipped end compartment keeps shoes apart from shirts. Inside, a strapped garment fold holds one jacket flat. Brass feet and a padded shoulder strap.",
    materials: BRIDLE,
    specs: {
      size: [60, 33, 30],
      weight: "3.1 kg",
      capacity: "55 L",
      fits: ["A week of clothes", "One suit, folded", "Two pairs of shoes", "Wash kit"],
    },
    isNew: true,
    pairsWith: ["the-luggage-tag", "the-weekender", "the-valet-tray"],
  },
  {
    slug: "the-slim-card-holder",
    name: "The Slim Card Holder",
    category: "Small Goods",
    collection: "small-goods",
    price: 45,
    sketch: "cardholder",
    alt: "Drawing of a slim leather card holder with four slots",
    colors: ["Cognac", "Black", "Oxblood", "Olive", "Tan"],
    blurb: "Four slots and a centre pocket, cut from the same hide as your bag.",
    details: "Four card slots and a centre pocket for folded notes. Edges are burnished by hand.",
    materials:
      "Full-grain bridle leather offcuts, hand-burnished edges and waxed Irish linen thread.",
    specs: {
      size: [10, 7.5, 0.6],
      weight: "25 g",
      fits: ["Up to 8 cards", "Folded notes"],
    },
    isNew: true,
    pairsWith: ["the-luggage-tag", "the-valet-tray"],
  },
  {
    slug: "the-valet-tray",
    name: "The Valet Tray",
    category: "Small Goods",
    collection: "small-goods",
    price: 85,
    sketch: "tray",
    alt: "Drawing of a leather valet tray with brass snap corners",
    colors: ["Cognac", "Chestnut", "Black"],
    blurb: "A snap-cornered tray for keys, watch and coins at the end of the day.",
    details: "Four brass snaps raise the corners; unsnap it and it packs flat for travel.",
    materials: "Full-grain bridle leather, solid brass snaps and hand-burnished edges.",
    specs: {
      size: [24, 17, 4],
      weight: "180 g",
      fits: ["Watch", "Keys", "Wallet", "Phone"],
    },
    isNew: true,
    pairsWith: ["the-slim-card-holder", "the-luggage-tag"],
  },
  {
    slug: "the-luggage-tag",
    name: "The Luggage Tag",
    category: "Small Goods",
    collection: "small-goods",
    price: 55,
    sketch: "tag",
    alt: "Drawing of a leather luggage tag with a privacy flap and buckled strap",
    colors: ["Cognac", "Tan", "Black", "Oxblood"],
    blurb: "A privacy-flap tag on a buckled strap. Worth monogramming.",
    details:
      "A flap hides your address card. The strap buckles through any handle up to 3 cm thick.",
    materials: "Full-grain bridle leather, solid brass buckle and waxed Irish linen thread.",
    specs: {
      size: [11, 6.5, 0.5],
      weight: "30 g",
      fits: ["Address card"],
    },
    isNew: true,
    pairsWith: ["the-slim-card-holder", "the-valet-tray"],
  },
];

export const categories = ["All", ...new Set(products.map((p) => p.category))];

export function findProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function collectionOf(id: Collection) {
  return collections.find((c) => c.id === id)!;
}

/** Curated pairings first, then the rest of the same collection. */
export function pairingsFor(p: Product, count = 3) {
  const curated = p.pairsWith.map(findProduct).filter((x): x is Product => !!x);
  const sameCollection = products.filter(
    (x) => x.collection === p.collection && x.slug !== p.slug && !p.pairsWith.includes(x.slug),
  );
  return [...curated, ...sameCollection].slice(0, count);
}

export const formatSize = ([w, h, d]: [number, number, number]) => `${w} × ${h} × ${d} cm`;

export function filterProducts(
  collection?: Collection | "new",
  sort?: "featured" | "price-asc" | "price-desc",
) {
  const list = products.filter((p) =>
    !collection ? true : collection === "new" ? p.isNew : p.collection === collection,
  );
  if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
  return list;
}

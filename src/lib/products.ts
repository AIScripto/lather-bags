import briefcase from "@/assets/bag-briefcase.jpg";
import tote from "@/assets/bag-tote.jpg";
import backpack from "@/assets/bag-backpack.jpg";
import messenger from "@/assets/bag-messenger.jpg";
import duffel from "@/assets/bag-duffel.jpg";
import hero from "@/assets/hero.jpg";

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  alt: string;
  colors: string[];
  blurb: string;
};

export const products: Product[] = [
  {
    slug: "the-heritage-satchel",
    name: "The Heritage Satchel",
    category: "Satchels",
    price: 395,
    image: hero,
    alt: "Cognac leather satchel",
    colors: ["Cognac", "Chestnut", "Black"],
    blurb: "Our signature twin-buckle satchel, cut from full-grain bridle leather.",
  },
  {
    slug: "the-barrister-briefcase",
    name: "The Barrister Briefcase",
    category: "Briefcases",
    price: 465,
    image: briefcase,
    alt: "Dark chestnut leather briefcase",
    colors: ["Chestnut", "Cognac"],
    blurb: "A structured briefcase with solid brass hardware, built for decades of use.",
  },
  {
    slug: "the-market-tote",
    name: "The Market Tote",
    category: "Totes",
    price: 285,
    image: tote,
    alt: "Tan leather tote",
    colors: ["Tan", "Black", "Oxblood"],
    blurb: "Unlined, soft-hand leather that softens beautifully with use.",
  },
  {
    slug: "the-rambler-rucksack",
    name: "The Rambler Rucksack",
    category: "Backpacks",
    price: 525,
    image: backpack,
    alt: "Olive leather backpack",
    colors: ["Olive", "Cognac"],
    blurb: "Waxed pull-up leather rucksack for the long road.",
  },
  {
    slug: "the-courier",
    name: "The Courier",
    category: "Messengers",
    price: 345,
    image: messenger,
    alt: "Black leather messenger",
    colors: ["Black", "Chestnut"],
    blurb: "A clean-lined crossbody messenger with a woven strap.",
  },
  {
    slug: "the-weekender",
    name: "The Weekender",
    category: "Travel",
    price: 595,
    image: duffel,
    alt: "Oxblood leather duffel",
    colors: ["Oxblood", "Cognac"],
    blurb: "A roomy duffel that carries two days of living, beautifully.",
  },
];

export const categories = [
  "All",
  "Satchels",
  "Briefcases",
  "Totes",
  "Backpacks",
  "Messengers",
  "Travel",
];

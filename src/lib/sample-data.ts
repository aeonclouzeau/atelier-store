// Placeholder homepage content until it is managed in the database.

export type Collection = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

/** Unsplash photo URL, pre-sized so the optimizer doesn't pull full originals. */
function unsplash(id: string, width = 1200) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export const hero = {
  season: "Autumn–Winter 2026",
  title: "The Quiet Season",
  images: [
    {
      src: unsplash("1539533018447-63fcce2678e3", 1600),
      alt: "Woman in a belted camel trench coat on stone steps",
    },
    {
      src: unsplash("1552374196-1ab2a1c593e8", 1600),
      alt: "Man in a camel blazer and cream trousers seated on a wooden stool",
    },
  ],
};

export const categories = [
  {
    href: "/women",
    title: "Women",
    image: unsplash("1617019114583-affb34d1b3cd", 1400),
    alt: "Woman in an ivory trench dress and dark sunglasses",
  },
  {
    href: "/men",
    title: "Men",
    image: unsplash("1614252369475-531eba835eb1", 1400),
    alt: "Man in a tan leather jacket and aviator sunglasses",
  },
];

/** Products are loaded from the database by slug, in this order. */
export const newArrivalSlugs = [
  "leather-biker-jacket",
  "fringed-knit-poncho",
  "suede-bomber-jacket",
  "floral-satin-pump",
  "cotton-crewneck-sweatshirt",
  "suede-brogue",
  "chambray-dot-shirt",
  "emblem-cotton-t-shirt",
];

export const story = {
  eyebrow: "The Knitwear Story",
  title: "Softly structured",
  body: "Merino and cashmere, knitted in a small workshop in the Scottish Borders. Deep burgundy, oat and charcoal pieces built to layer through the colder months.",
  href: "/stories/knitwear",
  image: unsplash("1506634572416-48cdfe530110", 1400),
  alt: "Man in a burgundy knit sweater against a dark backdrop",
};

export const collections: Collection[] = [
  {
    slug: "outerwear",
    title: "Outerwear",
    description: "Coats and trenches cut for the season",
    image: unsplash("1485462537746-965f33f7f6a7", 1200),
  },
  {
    slug: "leather-goods",
    title: "Leather Goods",
    description: "Top handles, shoulder bags and small leather goods",
    image: unsplash("1594223274512-ad4803739b7c", 1200),
  },
  {
    slug: "fine-jewellery",
    title: "Fine Jewellery",
    description: "Gold, pearl and precious stones",
    image: unsplash("1611085583191-a3b181a88401", 1200),
  },
];

export const accessorySlugs = [
  "top-handle-bag",
  "chain-shoulder-bag",
  "woven-basket-bag",
  "pearl-necklace",
  "sapphire-drop-earrings",
  "round-metal-sunglasses",
  "leather-strap-watch",
  "gold-chain-bracelet",
  "bifold-wallet",
];

export const services = [
  {
    title: "Complimentary Shipping",
    body: "Free express delivery on every order.",
  },
  {
    title: "Easy Returns",
    body: "Return within 30 days, free of charge.",
  },
  {
    title: "Gift Wrapping",
    body: "Signature boxes and handwritten notes.",
  },
  {
    title: "Book an Appointment",
    body: "Private styling, in store or online.",
  },
];

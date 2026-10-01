// Initial catalog, loaded into the database by `pnpm db:seed`.

import type { ProductImage } from "./catalog-schema";

export type SeedCategory = { slug: string; name: string };

export type SeedProduct = {
  slug: string;
  name: string;
  category: string;
  styleCode: string;
  material: string;
  color: string;
  /** Minor units (cents). */
  price: number;
  badge?: string;
  description: string;
  details: string[];
  images: ProductImage[];
  sizes: { label: string; stock: number }[];
};

/** In display order. */
export const categories: SeedCategory[] = [
  { slug: "ready-to-wear", name: "Ready-to-Wear" },
  { slug: "shoes", name: "Shoes" },
  { slug: "bags", name: "Bags" },
  { slug: "jewellery", name: "Jewellery" },
  { slug: "accessories", name: "Accessories" },
];

type Crop = [x: number, y: number, zoom: number];

/**
 * Primary Unsplash shot plus zoomed detail crops of the same photo, all 4:5 so
 * the gallery stacks evenly. Crops are hand-picked to avoid third-party labels.
 */
function gallery(id: string, alt: string, crops: Crop[] = []): ProductImage[] {
  const base = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&h=1750&q=80`;
  return [
    { src: base, alt },
    ...crops.map(([x, y, z]) => ({
      src: `${base}&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${z}`,
      alt: `${alt}, detail`,
    })),
  ];
}

const apparelSizes = (stock: number[]) =>
  ["XS", "S", "M", "L", "XL"].map((label, i) => ({ label, stock: stock[i] }));

const shoeSizes = (from: number, stock: number[]) =>
  stock.map((qty, i) => ({ label: String(from + i), stock: qty }));

const oneSize = (stock: number) => [{ label: "One size", stock }];

export const products: SeedProduct[] = [
  {
    slug: "leather-biker-jacket",
    name: "Leather Biker Jacket",
    category: "ready-to-wear",
    styleCode: "AT-RW-1021",
    material: "Lambskin",
    color: "Black",
    price: 245000,
    badge: "New",
    description:
      "A classic biker cut in supple lambskin that softens with every wear. Asymmetric zip, notched lapels with snap studs and a slightly cropped length.",
    details: [
      "100% lambskin; lining 100% cupro",
      "Asymmetric front zip, zipped cuffs",
      "Three zip pockets",
      "Specialist leather clean only",
      "Made in Italy",
    ],
    images: gallery("1551028719-00167b16eac5", "Black leather biker jacket laid flat", [
      [0.25, 0.62, 2.2],
      [0.65, 0.7, 2.5],
    ]),
    sizes: apparelSizes([0, 2, 5, 3, 1]),
  },
  {
    slug: "fringed-knit-poncho",
    name: "Fringed Knit Poncho",
    category: "ready-to-wear",
    styleCode: "AT-RW-1044",
    material: "Cotton and linen",
    color: "Ecru",
    price: 89000,
    description:
      "An open-stitch poncho knitted in a breezy cotton and linen blend, finished with a hand-knotted fringe. Layers easily over a shirt or fine knit.",
    details: [
      "70% cotton, 30% linen",
      "V-neck, hand-knotted fringe hem",
      "Hand wash cold, dry flat",
      "Made in Portugal",
    ],
    images: gallery("1434389677669-e08b4cac3105", "Ecru fringed knit poncho on a wooden hanger", [
      [0.5, 0.3, 2],
      [0.5, 0.8, 2.2],
    ]),
    sizes: oneSize(9),
  },
  {
    slug: "suede-bomber-jacket",
    name: "Suede Bomber Jacket",
    category: "ready-to-wear",
    styleCode: "AT-RW-1052",
    material: "Goat suede",
    color: "Tobacco",
    price: 198000,
    badge: "New",
    description:
      "A relaxed bomber in brushed goat suede with a ribbed collar, cuffs and hem. The utility sleeve pocket nods to its flight-jacket roots.",
    details: [
      "100% goat suede; lining 100% viscose",
      "Two-way front zip",
      "Ribbed knit trims",
      "Specialist suede clean only",
      "Made in Italy",
    ],
    images: gallery("1591047139829-d91aecb6caea", "Tobacco suede bomber jacket on a hanger", [
      [0.5, 0.25, 2.2],
      [0.5, 0.8, 2.2],
    ]),
    sizes: apparelSizes([3, 6, 8, 4, 2]),
  },
  {
    slug: "floral-satin-pump",
    name: "Floral Satin Pump",
    category: "shoes",
    styleCode: "AT-SH-2008",
    material: "Printed silk satin",
    color: "Azure floral",
    price: 79000,
    badge: "Limited edition",
    description:
      "A pointed stiletto pump wrapped in silk satin printed with an archival floral. Produced in a limited run for the season.",
    details: [
      "Silk satin upper, leather lining and sole",
      "100 mm heel",
      "Padded leather insole",
      "Made in Italy",
    ],
    images: gallery("1543163521-1bf539c55dd2", "Floral satin stiletto pumps on a pale blue set", [
      [0.35, 0.55, 2],
    ]),
    sizes: shoeSizes(36, [0, 0, 0, 0, 0, 0]),
  },
  {
    slug: "cotton-crewneck-sweatshirt",
    name: "Cotton Crewneck Sweatshirt",
    category: "ready-to-wear",
    styleCode: "AT-RW-1077",
    material: "Brushed cotton",
    color: "Optic white",
    price: 42000,
    description:
      "A heavyweight crewneck in loopback cotton, brushed inside for softness. Dropped shoulders and deep rib trims give it an easy, boxy shape.",
    details: [
      "100% organic cotton",
      "Brushed loopback interior",
      "Machine wash at 30°C",
      "Made in Portugal",
    ],
    images: gallery("1620799140408-edc6dcb6d633", "White cotton crewneck sweatshirt laid flat", [
      [0.5, 0.25, 2.2],
      [0.5, 0.75, 2.2],
    ]),
    sizes: apparelSizes([4, 10, 12, 8, 5]),
  },
  {
    slug: "suede-brogue",
    name: "Suede Brogue",
    category: "shoes",
    styleCode: "AT-SH-2031",
    material: "Calf suede",
    color: "Jade",
    price: 72000,
    description:
      "A laceless brogue in jade calf suede, with traditional punched detailing and a stacked leather heel. Blake-stitched for a close, flexible fit.",
    details: [
      "Calf suede upper, leather lining",
      "Stacked leather heel and sole",
      "Blake construction",
      "Made in Spain",
    ],
    images: gallery("1560343090-f0409e92791a", "Jade suede brogue on a pale pink plinth", [
      [0.4, 0.55, 2.2],
      [0.7, 0.5, 2.2],
    ]),
    sizes: shoeSizes(40, [2, 3, 1, 0, 2, 1]),
  },
  {
    slug: "chambray-dot-shirt",
    name: "Chambray Dot Shirt",
    category: "ready-to-wear",
    styleCode: "AT-RW-1090",
    material: "Cotton chambray",
    color: "Indigo",
    price: 38000,
    description:
      "A soft chambray shirt with a scattered dot jacquard and three-quarter sleeves. Point collar and mother-of-pearl buttons.",
    details: [
      "100% cotton",
      "Mother-of-pearl buttons",
      "Machine wash at 30°C",
      "Made in Italy",
    ],
    images: gallery("1596755094514-f87e34085b2c", "Indigo chambray shirt with white dots on a hanger", [
      [0.5, 0.7, 2.2],
    ]),
    sizes: apparelSizes([2, 5, 7, 3, 0]),
  },
  {
    slug: "emblem-cotton-t-shirt",
    name: "Emblem Cotton T-Shirt",
    category: "ready-to-wear",
    styleCode: "AT-RW-1103",
    material: "Cotton jersey",
    color: "Black",
    price: 29000,
    description:
      "A midweight jersey T-shirt with a small printed emblem on the chest. Cut straight with a neat ribbed crew neck.",
    details: [
      "100% cotton jersey",
      "Screen-printed emblem",
      "Machine wash at 30°C, inside out",
      "Made in Portugal",
    ],
    images: gallery("1618354691373-d851c5c3a990", "Black cotton T-shirt with a round chest emblem", [
      [0.3, 0.4, 2.2],
    ]),
    sizes: apparelSizes([6, 12, 14, 9, 6]),
  },
  {
    slug: "top-handle-bag",
    name: "Top Handle Bag",
    category: "bags",
    styleCode: "AT-BG-3002",
    material: "Polished calfskin",
    color: "Coral red",
    price: 289000,
    badge: "Exclusive",
    description:
      "A structured top handle bag in polished calfskin with a turn-lock flap. Carry it by hand or wear it cross-body on the detachable strap.",
    details: [
      "Polished calfskin, suede lining",
      "Palladium-finish hardware",
      "Detachable, adjustable shoulder strap",
      "W 25 × H 20 × D 12 cm",
      "Made in Italy",
    ],
    images: gallery("1584917865442-de89df76afd3", "Coral red top handle bag on a display plinth", [
      [0.5, 0.3, 2.2],
    ]),
    sizes: oneSize(4),
  },
  {
    slug: "chain-shoulder-bag",
    name: "Chain Shoulder Bag",
    category: "bags",
    styleCode: "AT-BG-3015",
    material: "Smooth leather",
    color: "Blush chevron",
    price: 165000,
    description:
      "A slim flap bag in smooth leather with a painted chevron stripe, hung on a fine curb chain that doubles for shoulder or cross-body wear.",
    details: [
      "Smooth calf leather, leather lining",
      "Silver-tone chain strap",
      "Magnetic flap closure",
      "W 22 × H 14 × D 5 cm",
      "Made in Italy",
    ],
    images: gallery("1566150905458-1bf1fc113f0d", "Blush pink chain shoulder bag with a yellow chevron", [
      [0.45, 0.4, 2.2],
      [0.6, 0.7, 2.2],
    ]),
    sizes: oneSize(7),
  },
  {
    slug: "woven-basket-bag",
    name: "Woven Basket Bag",
    category: "bags",
    styleCode: "AT-BG-3027",
    material: "Wicker and leather",
    color: "Apricot",
    price: 129000,
    badge: "New",
    description:
      "Hand-woven wicker meets smooth leather in this structured basket bag. The leather flap and top handle are finished by hand.",
    details: [
      "Wicker body, calf leather trims",
      "Turn-lock flap closure",
      "Detachable shoulder strap",
      "W 24 × H 22 × D 13 cm",
      "Handmade in Italy",
    ],
    images: gallery("1590874103328-eac38a683ce7", "Apricot woven basket bag with a leather flap", [
      [0.5, 0.75, 2.2],
    ]),
    sizes: oneSize(3),
  },
  {
    slug: "pearl-necklace",
    name: "Pearl Necklace",
    category: "jewellery",
    styleCode: "AT-JW-4003",
    material: "Freshwater pearls",
    color: "White",
    price: 140000,
    description:
      "Graduated freshwater pearls, hand-knotted on silk and fastened with a pavé-set floral clasp.",
    details: [
      "Freshwater pearls, 6–7 mm",
      "Sterling silver clasp with cubic zirconia",
      "Length 42 cm",
      "Presented in an Atelier box",
    ],
    images: gallery("1515562141207-7a88fb7ce338", "Pearl necklace with a floral clasp in a gift box", [
      [0.5, 0.5, 2.2],
      [0.4, 0.7, 2.2],
    ]),
    sizes: oneSize(6),
  },
  {
    slug: "sapphire-drop-earrings",
    name: "Sapphire Drop Earrings",
    category: "jewellery",
    styleCode: "AT-JW-4011",
    material: "White gold and sapphire",
    color: "Sapphire",
    price: 320000,
    description:
      "Statement drop earrings setting a pear-cut blue sapphire in a frame of baguette and round white stones.",
    details: [
      "18k white gold",
      "Pear-cut sapphire, white topaz surround",
      "Drop length 5.5 cm",
      "Presented in an Atelier box",
    ],
    images: gallery("1535632066927-ab7c9ab60908", "Sapphire drop earrings on a monstera leaf", [
      [0.5, 0.35, 2.2],
      [0.5, 0.7, 2.2],
    ]),
    sizes: oneSize(2),
  },
  {
    slug: "round-metal-sunglasses",
    name: "Round Metal Sunglasses",
    category: "accessories",
    styleCode: "AT-AC-5006",
    material: "Gold-tone metal",
    color: "Gold / green",
    price: 41000,
    description:
      "Fine round frames in gold-tone metal with bottle-green lenses and adjustable nose pads.",
    details: [
      "Gold-tone metal frame",
      "Green mineral glass lenses, 100% UV protection",
      "Leather case and cleaning cloth included",
      "Made in Italy",
    ],
    images: gallery("1511499767150-a48a237f0083", "Round gold metal sunglasses on a marble surface", [
      [0.3, 0.5, 2.2],
      [0.7, 0.5, 2.2],
    ]),
    sizes: oneSize(11),
  },
  {
    slug: "leather-strap-watch",
    name: "Leather Strap Watch",
    category: "accessories",
    styleCode: "AT-AC-5019",
    material: "Steel and calfskin",
    color: "Rose gold / taupe",
    price: 115000,
    description:
      "A slim 36 mm watch with a white enamel-effect dial, fine hands and a taupe calfskin strap.",
    details: [
      "36 mm rose gold-tone steel case",
      "Swiss quartz movement",
      "Calfskin strap with pin buckle",
      "Water resistant to 30 m",
    ],
    images: gallery("1524592094714-0f0654e20314", "Rose gold watch with a taupe leather strap", [
      [0.55, 0.45, 2.2],
      [0.6, 0.2, 2.2],
    ]),
    sizes: oneSize(5),
  },
  {
    slug: "gold-chain-bracelet",
    name: "Gold Chain Bracelet",
    category: "jewellery",
    styleCode: "AT-JW-4020",
    material: "18k gold",
    color: "Yellow gold",
    price: 185000,
    description:
      "A substantial curb chain bracelet in polished yellow gold with a concealed box clasp.",
    details: [
      "18k yellow gold",
      "Concealed box clasp",
      "Length 19 cm",
      "Presented in an Atelier box",
    ],
    images: gallery("1602173574767-37ac01994b2a", "Gold chain bracelet resting on an open magazine", [
      [0.5, 0.4, 2.2],
      [0.5, 0.6, 2.2],
    ]),
    sizes: oneSize(3),
  },
  {
    slug: "bifold-wallet",
    name: "Bifold Wallet",
    category: "accessories",
    styleCode: "AT-AC-5024",
    material: "Grained leather",
    color: "Chestnut",
    price: 45000,
    description:
      "A slim bifold in vegetable-tanned leather that develops a rich patina over time.",
    details: [
      "Vegetable-tanned calf leather",
      "Eight card slots, two note compartments",
      "W 11 × H 9 cm",
      "Made in Spain",
    ],
    images: gallery("1627123424574-724758594e93", "Chestnut leather bifold wallet", [
      [0.5, 0.5, 2.2],
      [0.55, 0.3, 2.2],
    ]),
    sizes: oneSize(14),
  },
];

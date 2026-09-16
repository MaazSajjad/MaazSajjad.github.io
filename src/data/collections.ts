export type Collection = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  image: string;
  uses: string[];
  notes: string[];
};

export const collections: Collection[] = [
  {
    slug: "extra-long-staple",
    title: "Extra-long staple cotton",
    kicker: "Italian mill line",
    summary:
      "Fine and extrafine counts in US Pima / Supima, Giza 87, and West Indian Sea Island — specified for shirting, voile, and luxury weaving.",
    image: "/images/collections/cotton-field.jpg",
    uses: ["Shirting", "Weaving", "Fine jersey"],
    notes: [
      "Counts from coarse service yarns through extrafine compact and gassed twists",
      "Single, twisted, voile, crepe, and high-twist programmes",
      "Specified for mills that need fibre identity, not generic cotton",
    ],
  },
  {
    slug: "organic-traceable",
    title: "Organic & traceable cotton",
    kicker: "GOTS programmes",
    summary:
      "Organic cotton yarns with chain-of-custody thinking — including scientifically traceable organic programmes for brands that audit origin.",
    image: "/images/collections/cotton-fibre.jpg",
    uses: ["Knitting", "Weaving", "Brand programmes"],
    notes: [
      "GOTS organic options across upland, Pima blend, and 100% Pima",
      "Melange knitting colours on organic bases",
      "Traceability support for B2B origin verification",
    ],
  },
  {
    slug: "regenerative",
    title: "Regenerative cotton",
    kicker: "Soil-first fibre",
    summary:
      "Organic cotton grown with regenerative practices — reduced tillage, cover crops, and measured impact through recognised content standards.",
    image: "/images/sustainability/farm.jpg",
    uses: ["Premium shirting", "Jersey", "Brand capsules"],
    notes: [
      "Regenagri-aligned supply chain thinking from farm to yarn",
      "Twists suitable for weaving and jersey, produced on request",
      "For buyers who need more than a generic organic ticket",
    ],
  },
  {
    slug: "naturally-coloured",
    title: "Naturally coloured cotton",
    kicker: "No dye required",
    summary:
      "Brown and green cottons whose colour grows in the fibre. Yarns that avoid conventional dyeing while keeping an industrial count range.",
    image: "/images/collections/yarn-cones-color.jpg",
    uses: ["Woven fashion", "Knit accessories", "Low-impact capsules"],
    notes: [
      "Natural brown and green colourways",
      "Carded and slub options in selected counts",
      "A story fibre for brands reducing dye-house load",
    ],
  },
  {
    slug: "fancy-performance",
    title: "Fancy & performance cotton",
    kicker: "Texture and twist",
    summary:
      "Slub, knop, crepe, voile, and high-twist cottons for fabric character — from rustic shantung to crisp voile.",
    image: "/images/collections/yarn-cones-machine.jpg",
    uses: ["Weaving", "Shirting", "Specialist knits"],
    notes: [
      "Carded and combed slubs, knoppy organics, crepe and voile",
      "Fast-service items alongside made-to-order counts",
      "Built for mills that sell fabric with a hand, not a commodity",
    ],
  },
  {
    slug: "noble-blends",
    title: "Noble fibre blends",
    kicker: "Cotton with silk, linen, wool, cashmere",
    summary:
      "US Pima and Sea Island blended with silk, linen, hemp, kapok, merino, and cashmere — yarns for cloth that has to feel expensive.",
    image: "/images/collections/knit-texture.jpg",
    uses: ["Luxury shirting", "Knitwear", "Tailoring cloth"],
    notes: [
      "Silk, linen, hemp, kapok, wool, and cashmere partners",
      "Selected GOTS and SFA-aligned cashmere programmes",
      "Sea Island trilogy blends including wool and baby cashmere",
    ],
  },
  {
    slug: "cellulosic",
    title: "Cellulosics",
    kicker: "Modal, Tencel, Seacell",
    summary:
      "MicroModal, Tencel / Lyocell, Cupro, Seacell, and next-generation cellulosics — alone or blended with cotton and noble fibres.",
    image: "/images/industries/showroom.jpg",
    uses: ["Jersey", "Drape weaving", "Next-to-skin"],
    notes: [
      "MicroModal Air, Tencel Micro LF, Cupro-cotton crepe",
      "Seacell and Circulose / Renewcell programmes",
      "Smooth, cool hand for contemporary apparel",
    ],
  },
  {
    slug: "technical-polyester",
    title: "Technical polyester",
    kicker: "Filament programmes",
    summary:
      "FDY and DTY polyester with functional specialties — stretch, dope-dyed colour, cotton-like and linen-like hands, UV, FR, and shrinkage control.",
    image: "/images/partners/spinning-mill.jpg",
    uses: ["Weaving", "Knitting", "Performance apparel"],
    notes: [
      "Standard filament plus elastic, colourful, and functional trees",
      "Dope dyed, high shrinkage, anti-UV, flame retardant, antibacterial",
      "A second fibre world beside the Italian cotton line",
    ],
  },
  {
    slug: "recycled-polyester",
    title: "Recycled polyester",
    kicker: "Bottle to filament",
    summary:
      "Recycled PET filament with traceable flake-to-yarn thinking — for buyers who need recycled content without giving up processability.",
    image: "/images/sustainability/pet-bottles.jpg",
    uses: ["Sportswear", "Fashion weaving", "Linings"],
    notes: [
      "RPET FDY / DTY including fine deniers",
      "Dope dyed and specialty constructions where available",
      "Traceability and quality control along the recycle line",
    ],
  },
];

export function getCollection(slug: string) {
  return collections.find((item) => item.slug === slug);
}

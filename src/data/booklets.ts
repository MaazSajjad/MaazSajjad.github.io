export type Booklet = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  file: string;
  downloadName: string;
  sizeLabel: string;
  relatedSlugs: string[];
};

export const booklets: Booklet[] = [
  {
    id: "ica-presentation",
    title: "ICA Yarns presentation",
    subtitle: "Mill overview",
    description: "House presentation covering the Italian cotton yarn programmes represented by Zisventure.",
    file: "/pdfs/ica-yarns-presentation.pdf",
    downloadName: "ICA-Yarns-Presentation.pdf",
    sizeLabel: "1.8 MB",
    relatedSlugs: ["extra-long-staple", "organic-traceable", "noble-blends"],
  },
  {
    id: "antico",
    title: "AN.TI.CO ICA yarns",
    subtitle: "Technical booklet",
    description: "AN.TI.CO line details — constructions and specifications for ICA yarn programmes.",
    file: "/pdfs/antico-ica-yarns.pdf",
    downloadName: "ANTICO-ICA-Yarns.pdf",
    sizeLabel: "353 KB",
    relatedSlugs: ["fancy-performance", "extra-long-staple", "cellulosic"],
  },
  {
    id: "product-list",
    title: "Product list 02.2026",
    subtitle: "Current range",
    description: "February 2026 product list for sampling conversations with mills and buyers.",
    file: "/pdfs/product-list-2026.pdf",
    downloadName: "Product-List-02-2026.pdf",
    sizeLabel: "449 KB",
    relatedSlugs: [],
  },
  {
    id: "biofusion",
    title: "Regenerative Biofusion",
    subtitle: "Soil-first programme",
    description: "Regenerative Biofusion booklet — farm practices, fibre story, and mill programme notes.",
    file: "/pdfs/regenerative-biofusion.pdf",
    downloadName: "Regenerative-Biofusion.pdf",
    sizeLabel: "2.2 MB",
    relatedSlugs: ["regenerative", "organic-traceable"],
  },
];

export function bookletsForCollection(slug: string) {
  return booklets.filter((b) => b.relatedSlugs.includes(slug));
}

import { Stagger, StaggerItem } from "./Motion";

const items = [
  {
    t: "Weaving & shirting",
    d: "Voile, crepe, high-twist, and extrafine cottons for mills that sell cloth with a hand.",
    i: "/images/industries/weaving.jpg",
  },
  {
    t: "Circular knitting",
    d: "Waxed singles, organic melanges, and cellulosics for jersey programmes.",
    i: "/images/industries/knitwear.jpg",
  },
  {
    t: "Luxury apparel",
    d: "Silk, linen, cashmere, and Sea Island blends for garments that have to feel expensive.",
    i: "/images/industries/shirting.jpg",
  },
  {
    t: "Performance",
    d: "Technical and recycled polyester for sportswear, linings, and functional fabrics.",
    i: "/images/industries/denim.jpg",
  },
];

export default function Industries() {
  return (
    <Stagger className="mt-12 grid gap-px bg-line md:grid-cols-2">
      {items.map((item) => (
        <StaggerItem key={item.t} className="bg-paper">
          <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
            <img src={item.i} alt="" className="aspect-[4/3] object-cover" />
            <div className="flex flex-col justify-center">
              <h3 className="serif text-2xl">{item.t}</h3>
              <p className="mt-2 text-sm text-muted">{item.d}</p>
            </div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

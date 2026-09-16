import { Stagger, StaggerItem } from "./Motion";

const items = [
  {
    t: "Origin",
    d: "Pima, Giza, Sea Island, organic US programmes — named, not mixed anonymously.",
  },
  {
    t: "Standards",
    d: "GOTS, organic content, regenerative content, and recycle chain-of-custody where the yarn supports it.",
  },
  {
    t: "Proof",
    d: "Transaction thinking from farm or flake through spinning, so the ticket matches the cone.",
  },
];

export default function SustainAsk() {
  return (
    <Stagger className="mt-10 grid gap-8 md:grid-cols-3">
      {items.map((item) => (
        <StaggerItem key={item.t}>
          <p className="text-sm uppercase tracking-wideish text-clay">{item.t}</p>
          <p className="mt-3 text-paper/80">{item.d}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

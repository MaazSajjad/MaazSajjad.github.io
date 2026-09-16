import { Stagger, StaggerItem } from "./Motion";

export default function ChipList({ items }: { items: string[] }) {
  return (
    <Stagger className="mt-6 flex flex-wrap gap-2">
      {items.map((use) => (
        <StaggerItem key={use}>
          <span className="rounded-full border border-line px-4 py-2 text-sm">{use}</span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

import { motion } from "framer-motion";
import { collections } from "../../data/collections";
import { ImageReveal, Stagger, StaggerItem } from "./Motion";

export default function CollectionGrid({ limit }: { limit?: number }) {
  const items = limit ? collections.slice(0, limit) : collections;
  return (
    <Stagger className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <StaggerItem key={item.slug}>
          <a href={`/collections/${item.slug}`} className="group block">
            <div className="overflow-hidden">
              <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                <ImageReveal
                  src={item.image}
                  alt={item.title}
                  className="aspect-[4/3]"
                  imgClassName="aspect-[4/3]"
                />
              </motion.div>
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-wideish text-clay">{item.kicker}</p>
            <h3 className="serif mt-1 text-2xl group-hover:text-clay">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
          </a>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

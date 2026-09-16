import { motion } from "framer-motion";
import { fibres } from "../../data/site";

export default function FibreMarquee() {
  const row = [...fibres, ...fibres];
  return (
    <div className="overflow-hidden border-y border-line bg-cream py-4">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap px-6 text-xs uppercase tracking-wideish text-muted"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            {item}
            <span className="h-1 w-1 rounded-full bg-clay" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

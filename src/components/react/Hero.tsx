import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-navy text-paper">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src="/images/home/hero-spinning-mill.jpg"
          alt="Spinning mill with rows of yarn cones"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(22,20,17,0.58)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161411] via-transparent to-[#161411]/40" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-24 pt-32 md:px-8 md:pb-20">
        <motion.p
          className="mb-5 text-xs uppercase tracking-wideish text-paper/70"
          initial={false}
        >
          Ampang, Malaysia · Italian mill yarns
        </motion.p>
        <motion.h1
          className="serif max-w-4xl text-5xl leading-[0.95] sm:text-6xl md:text-8xl"
          initial={false}
        >
          Italian mill yarns.
          <br />
          Regional partnership.
        </motion.h1>
        <motion.p
          className="mt-6 max-w-xl text-base text-paper/80 md:text-lg"
          initial={false}
        >
          Zisventure represents mill-grade Italian cotton yarns and technical polyester for
          manufacturers who specify fibre — not generic lots.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={false}
        >
          <a
            href="/collections"
            className="rounded-full bg-paper px-6 py-3 text-sm text-ink transition hover:bg-cream"
          >
            View collections
          </a>
          <a
            href="/contact"
            className="rounded-full border border-paper/40 px-6 py-3 text-sm text-paper transition hover:border-paper hover:bg-paper/10"
          >
            Request a sample
          </a>
        </motion.div>
      </div>
    </section>
  );
}

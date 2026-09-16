import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { nav, site } from "../../data/site";

function isDarkHero(path: string) {
  return path === "/" || path.startsWith("/about") || path.startsWith("/sustainability");
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [path, setPath] = useState("/");
  const reduce = useReducedMotion();
  const dark = isDarkHero(path) && !scrolled && !open;

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname);
    syncPath();
    document.addEventListener("astro:page-load", syncPath);
    document.addEventListener("astro:after-swap", syncPath);
    window.addEventListener("popstate", syncPath);
    return () => {
      document.removeEventListener("astro:page-load", syncPath);
      document.removeEventListener("astro:after-swap", syncPath);
      window.removeEventListener("popstate", syncPath);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          dark ? "bg-transparent text-paper" : "bg-paper/92 text-ink backdrop-blur-md"
        }`}
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="/" className="group flex items-baseline gap-2" aria-label="Zisventure home">
            <span className="serif text-2xl tracking-tight">Zisventure</span>
            <span className={`hidden text-[10px] uppercase tracking-wideish sm:inline ${dark ? "text-paper/70" : "text-muted"}`}>
              Ampang
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm sm:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-clay after:transition-all hover:after:w-full ${
                  dark ? "text-paper/80 hover:text-paper" : "text-ink/80 hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/contact"
              className={`hidden rounded-full px-4 py-2 text-xs uppercase tracking-wideish transition sm:inline-flex ${
                dark ? "bg-paper text-ink hover:bg-cream" : "bg-ink text-paper hover:bg-clay"
              }`}
            >
              Request a sample
            </a>
            <button
              type="button"
              className={`flex h-11 w-11 items-center justify-center rounded-full border sm:hidden ${
                dark ? "border-paper/30" : "border-ink/15"
              }`}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-px w-full transition ${dark ? "bg-paper" : "bg-ink"} ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-full transition ${dark ? "bg-paper" : "bg-ink"} ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 h-px w-full transition ${dark ? "bg-paper" : "bg-ink"} ${open ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-paper px-6 pt-28 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col gap-6">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="serif text-4xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <p className="pt-8 text-sm text-muted">{site.legal}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

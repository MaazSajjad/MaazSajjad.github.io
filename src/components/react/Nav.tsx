import { useEffect, useState } from "react";
import { nav, site } from "../../data/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState("/");

  useEffect(() => {
    const sync = () => {
      setPath(window.location.pathname);
      setOpen(false);
      document.body.style.overflow = "";
    };
    sync();
    document.addEventListener("astro:page-load", sync);
    document.addEventListener("astro:after-swap", sync);
    window.addEventListener("popstate", sync);
    return () => {
      document.removeEventListener("astro:page-load", sync);
      document.removeEventListener("astro:after-swap", sync);
      window.removeEventListener("popstate", sync);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-auto fixed inset-x-0 top-0 z-[100] border-b border-line bg-paper text-ink">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="/" className="group flex items-baseline gap-2" aria-label="Zisventure home">
            <span className="serif text-2xl tracking-tight">Zisventure</span>
            <span className="hidden text-[10px] uppercase tracking-wideish text-muted sm:inline">Ampang</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm sm:flex">
            {nav.map((item) => {
              const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative text-ink/80 hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-clay ${
                    active ? "after:w-full text-ink" : "after:w-0 hover:after:w-full"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/contact"
              className="hidden rounded-full bg-ink px-4 py-2 text-xs uppercase tracking-wideish text-paper hover:bg-clay sm:inline-flex"
            >
              Request a sample
            </a>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 sm:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-px w-full bg-ink ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-px w-full bg-ink ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-px w-full bg-ink ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="pointer-events-auto fixed inset-0 z-[90] bg-paper px-6 pt-28 sm:hidden">
          <div className="flex flex-col gap-6">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="serif text-4xl" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <p className="pt-8 text-sm text-muted">{site.legal}</p>
          </div>
        </div>
      )}
    </>
  );
}

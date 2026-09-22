import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { booklets, type Booklet } from "../../data/booklets";

type Props = {
  items?: Booklet[];
  heading?: string;
  intro?: string;
  featured?: boolean;
};

type LoadState = "idle" | "loading" | "ready" | "error";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PdfBooklets({
  items = booklets,
  heading = "Mill booklets",
  intro = "Four reference PDFs. Open one here, or download a copy for your team.",
  featured = false,
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const blobRef = useRef<string | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const active = items.find((b) => b.id === activeId) ?? null;

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (blobRef.current) URL.revokeObjectURL(blobRef.current);
    };
  }, []);

  async function openBooklet(item: Booklet) {
    if (activeId === item.id && loadState === "ready") {
      viewerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    abortRef.current?.abort();
    if (blobRef.current) {
      URL.revokeObjectURL(blobRef.current);
      blobRef.current = null;
    }

    setActiveId(item.id);
    setBlobUrl(null);
    setProgress(0);
    setLoadState("loading");

    requestAnimationFrame(() => {
      viewerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(item.file, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const total = Number(response.headers.get("content-length") || 0);
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No stream");

      const chunks: Uint8Array[] = [];
      let received = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.length;
        if (total > 0) {
          setProgress(Math.min(99, Math.round((received / total) * 100)));
        } else {
          setProgress((p) => Math.min(92, p + 4));
        }
      }

      const blob = new Blob(chunks, { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      blobRef.current = url;
      setBlobUrl(url);
      setProgress(100);
      setLoadState("ready");
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setLoadState("error");
      setProgress(0);
    }
  }

  function closeViewer() {
    abortRef.current?.abort();
    if (blobRef.current) {
      URL.revokeObjectURL(blobRef.current);
      blobRef.current = null;
    }
    setActiveId(null);
    setBlobUrl(null);
    setProgress(0);
    setLoadState("idle");
  }

  if (!items.length) return null;

  return (
    <div>
      <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${featured ? "" : "max-w-2xl"}`}>
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-wideish text-clay">{featured ? "Open first" : "Documents"}</p>
          <h2 className={`serif mt-3 text-ink ${featured ? "text-4xl md:text-6xl" : "text-4xl md:text-5xl"}`}>{heading}</h2>
          <p className="mt-4 text-muted">{intro}</p>
        </div>
        {featured && (
          <p className="text-xs uppercase tracking-wideish text-muted md:pb-2">
            {items.length} PDFs · view or download
          </p>
        )}
      </div>

      <div
        className={`mt-10 grid gap-3 ${
          items.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
        }`}
      >
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          const isLoading = isActive && loadState === "loading";
          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => openBooklet(item)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease }}
              className={`group relative flex min-h-[11.5rem] flex-col overflow-hidden text-left transition ${
                isActive
                  ? "bg-ink text-paper"
                  : "bg-paper text-ink ring-1 ring-line hover:ring-ink/25"
              }`}
            >
              <div className="flex flex-1 flex-col p-4 md:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className={`font-serif text-3xl leading-none ${isActive ? "text-paper/30" : "text-ink/20"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`text-[10px] uppercase tracking-wideish ${isActive ? "text-paper/55" : "text-muted"}`}>
                    PDF · {item.sizeLabel}
                  </span>
                </div>
                <p className={`mt-auto pt-8 text-[10px] uppercase tracking-wideish ${isActive ? "text-paper/55" : "text-clay"}`}>
                  {item.subtitle}
                </p>
                <h3 className="serif mt-1.5 text-xl leading-snug md:text-[1.35rem]">{item.title}</h3>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className={`text-[11px] uppercase tracking-wideish ${isActive ? "text-paper" : "text-muted group-hover:text-ink"}`}>
                    {isLoading ? "Loading…" : isActive && loadState === "ready" ? "Open below" : "View"}
                  </span>
                  <span aria-hidden className={`text-lg leading-none transition-transform duration-500 group-hover:translate-x-0.5 ${isActive ? "" : "opacity-50"}`}>
                    →
                  </span>
                </div>
              </div>
              {isActive && <div className="absolute inset-x-0 bottom-0 h-0.5 bg-clay" />}
            </motion.button>
          );
        })}
      </div>

      {!active && (
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-muted">
          {items.map((item) => (
            <a
              key={`dl-${item.id}`}
              href={item.file}
              download={item.downloadName}
              className="text-xs uppercase tracking-wideish underline-offset-4 hover:text-ink hover:underline"
            >
              Download {item.title.split(" ")[0]}
            </a>
          ))}
        </div>
      )}

      <div ref={viewerRef}>
        <AnimatePresence mode="wait">
          {active && (
            <motion.section
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.35, ease }}
              className="mt-6 overflow-hidden bg-cream ring-1 ring-line"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3.5 md:px-5">
                <div className="min-w-0">
                  <p className="truncate text-[11px] uppercase tracking-wideish text-muted">
                    {active.subtitle} · {active.sizeLabel}
                  </p>
                  <h3 className="serif truncate text-xl text-ink md:text-2xl">{active.title}</h3>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <a
                    href={active.file}
                    download={active.downloadName}
                    className="rounded-full bg-ink px-4 py-2 text-[11px] uppercase tracking-wideish text-paper transition hover:bg-clay"
                  >
                    Download
                  </a>
                  <button
                    type="button"
                    onClick={closeViewer}
                    className="rounded-full border border-ink/20 px-4 py-2 text-[11px] uppercase tracking-wideish text-ink/70 transition hover:border-ink hover:text-ink"
                  >
                    Close
                  </button>
                </div>
              </div>

              {(loadState === "loading" || loadState === "idle") && (
                <div className="relative flex min-h-[58vh] flex-col items-center justify-center bg-paper px-6 py-16">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-line">
                    <motion.div
                      className="h-full bg-clay"
                      initial={false}
                      animate={{ width: `${Math.max(progress, 3)}%` }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-[11px] uppercase tracking-wideish text-muted">Loading booklet</p>
                  <p className="serif mt-4 text-5xl tabular-nums text-ink md:text-6xl">{progress}</p>
                  <p className="mt-1 text-sm text-muted">percent</p>
                  <p className="mt-8 max-w-xs text-center text-sm text-muted">
                    Streaming {active.title} into the viewer…
                  </p>
                </div>
              )}

              {loadState === "error" && (
                <div className="flex min-h-[40vh] flex-col items-center justify-center bg-paper px-6 py-16 text-center">
                  <p className="serif text-3xl text-ink">Couldn’t load this booklet</p>
                  <p className="mt-3 max-w-md text-sm text-muted">
                    Try again, or download the PDF and open it on your device.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => openBooklet(active)}
                      className="rounded-full bg-ink px-5 py-2.5 text-xs uppercase tracking-wideish text-paper"
                    >
                      Retry
                    </button>
                    <a
                      href={active.file}
                      download={active.downloadName}
                      className="rounded-full border border-ink/20 px-5 py-2.5 text-xs uppercase tracking-wideish text-ink"
                    >
                      Download instead
                    </a>
                  </div>
                </div>
              )}

              {loadState === "ready" && blobUrl && (
                <iframe
                  title={`${active.title} PDF viewer`}
                  src={`${blobUrl}#view=FitH`}
                  className="h-[70vh] w-full border-0 bg-paper md:h-[75vh]"
                />
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

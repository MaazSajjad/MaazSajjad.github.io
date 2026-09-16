import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { site } from "../../data/site";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const company = String(data.get("company") || "");
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const interest = String(data.get("interest") || "");
    const message = String(data.get("message") || "");
    const body = encodeURIComponent(
      `Company: ${company}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nInterest: ${interest}\n\n${message}`,
    );
    window.location.href = `mailto:${site.emails[0]}?subject=${encodeURIComponent("Sample / enquiry — Zisventure")}&body=${body}`;
    setSent(true);
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className="grid gap-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Company" name="company" required />
        <Field label="Your name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>
      <label className="block text-sm">
        <span className="mb-2 block text-xs uppercase tracking-wideish text-muted">Interest</span>
        <select
          name="interest"
          className="w-full rounded-none border border-line bg-paper px-4 py-3 outline-none focus:border-ink"
        >
          <option>Extra-long staple cotton</option>
          <option>Organic / traceable</option>
          <option>Regenerative cotton</option>
          <option>Noble blends</option>
          <option>Technical polyester</option>
          <option>Recycled polyester</option>
          <option>General enquiry</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="mb-2 block text-xs uppercase tracking-wideish text-muted">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full rounded-none border border-line bg-paper px-4 py-3 outline-none focus:border-ink"
          placeholder="Counts, end use, volume, timing…"
        />
      </label>
      <button
        type="submit"
        className="justify-self-start rounded-full bg-ink px-7 py-3 text-sm text-paper transition hover:bg-clay"
      >
        {sent ? "Opening email…" : "Send enquiry"}
      </button>
    </motion.form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block text-xs uppercase tracking-wideish text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-none border border-line bg-paper px-4 py-3 outline-none focus:border-ink"
      />
    </label>
  );
}

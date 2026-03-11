"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronDown, Send } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type Option = { value: string; label: string };

export function Booking() {
  const section = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  } as const;

  const options = useMemo<Option[]>(
    () => [
      { value: "paris-1889", label: "Paris 1889 — Belle Époque" },
      { value: "cretace", label: "Crétacé — Dinosaures" },
      { value: "florence-1504", label: "Florence 1504 — Renaissance" },
    ],
    [],
  );

  const [destination, setDestination] = useState(options[0]?.value ?? "");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <section id="reservation" className="mx-auto max-w-6xl px-4 pb-24 pt-4 sm:px-6 sm:pb-32">
      <motion.div
        className="grid gap-8 sm:grid-cols-2 sm:items-start"
        variants={section}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="pt-6">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Réservation privée
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-200/70 sm:text-base">
            Indiquez votre destination et une fenêtre d’arrivée souhaitée. Notre équipe
            confirme ensuite votre itinéraire avec discrétion.
          </p>

          <div className="mt-6 space-y-3">
            {[
              { t: "Validation", d: "Contrôles de cohérence temporelle" },
              { t: "Itinéraire", d: "Transport, hébergement, guides" },
              { t: "Conciergerie", d: "Assistance avant / pendant / après" },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <div className="text-sm font-semibold text-white">{x.t}</div>
                <div className="text-sm text-zinc-200/70">{x.d}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="tt-glass relative overflow-hidden rounded-3xl p-5 sm:p-6"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_400px_at_20%_10%,rgba(245,158,11,0.16),transparent_60%),radial-gradient(700px_400px_at_90%_20%,rgba(99,102,241,0.10),transparent_62%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl"
          />

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-zinc-200/80">
                Destination
              </label>
              <div className="relative mt-2">
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="h-12 w-full appearance-none rounded-2xl bg-black/40 px-4 pr-10 text-sm text-white ring-1 ring-white/10 outline-none transition focus:ring-gold-500/30"
                >
                  {options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-200/70" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-200/80">
                Date d’arrivée (simulation)
              </label>
              <div className="relative mt-2">
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="JJ/MM/AAAA"
                  inputMode="numeric"
                  className="h-12 w-full rounded-2xl bg-black/40 px-4 pr-10 text-sm text-white ring-1 ring-white/10 outline-none transition placeholder:text-zinc-400 focus:ring-gold-500/30"
                />
                <Calendar className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-200/70" />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 0 1px rgba(255,255,255,0.10), 0 18px 60px rgba(0,0,0,0.55), 0 0 36px rgba(245,158,11,0.10)",
                  "0 0 0 1px rgba(255,255,255,0.12), 0 18px 60px rgba(0,0,0,0.55), 0 0 52px rgba(245,158,11,0.18)",
                  "0 0 0 1px rgba(255,255,255,0.10), 0 18px 60px rgba(0,0,0,0.55), 0 0 36px rgba(245,158,11,0.10)",
                ],
                scale: [1, 1.01, 1],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              type="submit"
              className="relative inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 via-gold-400 to-amber-500 text-sm font-semibold text-black ring-1 ring-amber-200/60 transition hover:brightness-110"
            >
              <Send className="size-4" />
              Planifier mon voyage
            </motion.button>

            <div
              className={[
                "rounded-2xl bg-white/5 px-4 py-3 text-sm ring-1 ring-white/10 transition-opacity",
                submitted ? "opacity-100" : "opacity-0",
              ].join(" ")}
              aria-live="polite"
            >
              Demande envoyée. Un concierge temporel vous contactera sous peu.
            </div>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}


"use client";

import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type NavItem = { label: string; href: string };

export function Navbar() {
  const items = useMemo<NavItem[]>(
    () => [
      { label: "Époques", href: "#destinations" },
      { label: "Réservation", href: "#reservation" },
      { label: "Conciergerie", href: "#chat" },
    ],
    [],
  );

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={[
          "transition-colors duration-300",
          "border-b border-white/10",
          scrolled ? "bg-black/50 backdrop-blur-xl" : "bg-black/10 backdrop-blur",
        ].join(" ")}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white"
            aria-label="Accueil TimeTravel"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]">
              <Clock className="size-4 text-gold-200" />
            </span>
            <span className="relative">
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                TimeTravel
              </span>
              <span className="ml-2 hidden rounded-full bg-gold-500/10 px-2 py-0.5 text-[10px] font-medium text-gold-200 ring-1 ring-gold-500/20 sm:inline">
                Luxury
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-6 sm:flex">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-200/80 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <motion.a
            href="#reservation"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg ring-1 ring-amber-200/20"
          >
            <Sparkles className="size-4" />
            Réserver
          </motion.a>

        </nav>
      </div>
    </header>
  );
}


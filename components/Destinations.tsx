"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";

type Destination = {
  title: string;
  era: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const destinations: Destination[] = [
  {
    title: "Paris 1889",
    era: "Belle Époque",
    description:
      "Soirées électriques, élégance parisienne et l’Exposition Universelle sous un ciel de cuivre.",
    imageSrc: "/images/paris.png",
    imageAlt: "Paris 1889, Belle Époque",
  },
  {
    title: "Crétacé",
    era: "Dinosaures",
    description:
      "Aurores primaires, jungles immenses et rencontres guidées avec les géants du passé — à distance sûre.",
    imageSrc: "/images/cretace.png",
    imageAlt: "Paysage du Crétacé avec dinosaures",
  },
  {
    title: "Florence 1504",
    era: "Renaissance",
    description:
      "Ateliers, marbre et génie artistique. Une immersion dans la ville qui façonne le monde moderne.",
    imageSrc: "/images/florence.png",
    imageAlt: "Florence en 1504, Renaissance",
  },
];

export function Destinations() {
  const section = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  } as const;

  const grid = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  } as const;

  const card = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  } as const;

  return (
    <section id="destinations" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <motion.div
        variants={section}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-3 py-1 text-xs font-medium text-gold-200 ring-1 ring-gold-500/20">
              <Sparkles className="size-4" />
              Destinations signature
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Époques à couper le souffle
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-200/70 sm:text-base">
              Trois itinéraires d’exception, conçus pour l’émerveillement — avec un niveau
              de confort digne d’un palace.
            </p>
          </div>
        </div>

        <motion.div
          className="mt-8 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-3"
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
        {destinations.map((d, idx) => (
          <motion.article
            key={d.title}
            variants={card}
            className="group relative overflow-hidden rounded-3xl tt-glass transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="p-4">
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={d.imageSrc}
                    alt={d.imageAlt}
                    fill
                    className="rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 640px) 33vw, 92vw"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                </div>

                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                </div>

                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-zinc-100 ring-1 ring-white/10 backdrop-blur">
                  <MapPin className="size-3.5 text-gold-200" />
                  {d.era}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-white">{d.title}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-200/70">{d.description}</p>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4">
              <motion.a
                href="#reservation"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/10 backdrop-blur transition-colors group-hover:bg-white/10"
              >
                Détails
                <span className="grid size-8 place-items-center rounded-xl bg-black/40 ring-1 ring-white/10">
                  <ArrowUpRight className="size-4 text-gold-200" />
                </span>
              </motion.a>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </motion.article>
        ))}
        </motion.div>
      </motion.div>
    </section>
  );
}


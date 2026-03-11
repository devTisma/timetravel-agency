"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play, Stars } from "lucide-react";

export function Hero() {
  const videoSrc = process.env.NEXT_PUBLIC_HERO_VIDEO ?? "";
  const fallbackImageSrc = "/images/florence.png";

  const intro = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  } as const;

  const introItem = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  } as const;

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src={videoSrc} />
          </video>
        ) : (
          <motion.div 
            className="absolute inset-0 h-full w-full"
            initial={{ scale: 1, x: 0 }}
            animate={{ scale: 1.15, x: "-1%" }}
            transition={{
              duration: 5,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Image
              src={fallbackImageSrc}
              alt="Décor temporel"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        )}

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />

        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(900px_600px_at_30%_25%,rgba(245,158,11,0.18),transparent_60%),radial-gradient(900px_600px_at_80%_35%,rgba(99,102,241,0.12),transparent_58%)]"
        />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 pt-20 pb-14 sm:px-6">
        <motion.div
          variants={intro}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-zinc-200 ring-1 ring-white/10">
            <Stars className="size-4 text-gold-200" />
            Conciergerie temporelle 24/7 · Protocoles premium
          </div>

          <motion.h1
            variants={introItem}
            className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl"
          >
            Réécrivez l’Histoire
          </motion.h1>

          <motion.p
            variants={introItem}
            className="mt-4 max-w-xl text-pretty text-base leading-7 text-zinc-200/80 sm:text-lg"
          >
            Voyagez avec précision, discrétion et élégance vers les époques les plus
            convoitées. Une expérience immersive pensée pour les explorateurs d’exception.
          </motion.p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.a
              href="#destinations"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_18px_60px_rgba(0,0,0,0.55)] transition hover:brightness-105"
            >
              Explorer les Époques
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="inline-flex"
              >
                <ArrowRight className="size-4" />
              </motion.span>
            </motion.a>

            <motion.a
              href="#destination-quiz"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10 backdrop-blur transition hover:bg-white/10"
            >
              <span className="grid size-7 place-items-center rounded-full bg-white/10 ring-1 ring-white/10">
                <Play className="size-4" />
              </span>
              Découvrir l’expérience
            </motion.a>
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-3">
          {[
            { k: "Sécurité", v: "Protocoles chronologiques certifiés" },
            { k: "Précision", v: "Fenêtres d’arrivée calibrées à la seconde" },
            { k: "Prestige", v: "Itinéraires sur-mesure et confidentiels" },
          ].map((x) => (
            <div key={x.k} className="tt-glass rounded-2xl px-4 py-4">
              <div className="text-sm font-semibold text-white">{x.k}</div>
              <div className="mt-1 text-sm text-zinc-200/75">{x.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


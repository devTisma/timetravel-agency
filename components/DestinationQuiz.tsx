"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type DestinationKey = "paris" | "cretace" | "florence";

type Choice = {
  label: string;
  points: Partial<Record<DestinationKey, number>>;
};

type Question = {
  title: string;
  choices: Choice[];
};

const DESTINATIONS: Record<
  DestinationKey,
  { title: string; subtitle: string; imageSrc: string; imageAlt: string }
> = {
  paris: {
    title: "Paris 1889",
    subtitle: "Belle Époque · Tour Eiffel · Exposition Universelle",
    imageSrc: "/images/paris.png",
    imageAlt: "Paris 1889, Belle Époque",
  },
  cretace: {
    title: "Crétacé -65M",
    subtitle: "Dinosaures · Nature préhistorique · Aventure",
    imageSrc: "/images/cretace.png",
    imageAlt: "Paysage du Crétacé avec dinosaures",
  },
  florence: {
    title: "Florence 1504",
    subtitle: "Renaissance · Art · Michel-Ange",
    imageSrc: "/images/florence.png",
    imageAlt: "Florence en 1504, Renaissance",
  },
};

export function DestinationQuiz() {
  const questions = useMemo<Question[]>(
    () => [
      {
        title: "Quel type d'expérience recherchez-vous ?",
        choices: [
          {
            label: "Culturelle et artistique",
            points: { florence: 1, paris: 1 },
          },
          { label: "Aventure et nature", points: { cretace: 1 } },
          { label: "Élégance et raffinement", points: { paris: 1 } },
        ],
      },
      {
        title: "Votre période préférée ?",
        choices: [
          { label: "Histoire moderne", points: { paris: 1 } },
          { label: "Temps anciens et origines", points: { cretace: 1 } },
          { label: "Renaissance et classicisme", points: { florence: 1 } },
        ],
      },
      {
        title: "Vous préférez :",
        choices: [
          { label: "L'effervescence urbaine", points: { paris: 1 } },
          { label: "La nature sauvage", points: { cretace: 1 } },
          { label: "L'art et l'architecture", points: { florence: 1 } },
        ],
      },
      {
        title: "Votre activité idéale :",
        choices: [
          { label: "Visiter des monuments", points: { paris: 1 } },
          { label: "Observer la faune", points: { cretace: 1 } },
          { label: "Explorer des musées", points: { florence: 1 } },
        ],
      },
    ],
    [],
  );

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [scores, setScores] = useState<Record<DestinationKey, number>>({
    paris: 0,
    cretace: 0,
    florence: 0,
  });

  const [phase, setPhase] = useState<"quiz" | "loading" | "result">("quiz");
  const [winner, setWinner] = useState<DestinationKey>("paris");
  const [aiText, setAiText] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");

  const progress = Math.min(1, step / questions.length);
  const current = questions[step];

  const computeWinner = (s: Record<DestinationKey, number>): DestinationKey => {
    const entries: Array<[DestinationKey, number]> = [
      ["paris", s.paris],
      ["cretace", s.cretace],
      ["florence", s.florence],
    ];
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0]?.[0] ?? "paris";
  };

  const selectChoice = (choice: Choice) => {
    if (!current) return;

    setAnswers((a) => [...a, choice.label]);
    setScores((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(choice.points) as DestinationKey[]) {
        next[k] += choice.points[k] ?? 0;
      }
      return next;
    });

    const nextStep = step + 1;
    if (nextStep >= questions.length) {
      setPhase("loading");
    } else {
      setStep(nextStep);
    }
  };

  useEffect(() => {
    if (phase !== "loading") return;

    const finalWinner = computeWinner(scores);
    setWinner(finalWinner);

    const choices = answers.join(" · ");
    const prompt =
      `Un client vient de faire ces choix : ${choices}. ` +
      `Il a obtenu la destination : ${DESTINATIONS[finalWinner].title}. ` +
      "Rédige un court paragraphe de 3 phrases, très accrocheur, pour lui annoncer que cette destination est faite pour lui en justifiant avec ses choix.";

    let cancelled = false;

    (async () => {
      try {
        setErrorText("");
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: prompt }],
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as { message?: string };
        const text = data.message?.trim();
        if (!cancelled) {
          setAiText(
            text ||
              "Votre profil appelle une expérience rare : une époque calibrée sur vos envies, vos rythmes et votre goût du détail. Préparez-vous à vivre un instant inoubliable, parfaitement orchestré. Notre conciergerie ouvre la fenêtre temporelle quand vous le décidez.",
          );
          setPhase("result");
        }
      } catch {
        if (!cancelled) {
          setAiText(
            "Votre profil appelle une expérience rare : une époque calibrée sur vos envies, vos rythmes et votre goût du détail. Préparez-vous à vivre un instant inoubliable, parfaitement orchestré. Notre conciergerie ouvre la fenêtre temporelle quand vous le décidez.",
          );
          setErrorText(
            "Impossible de contacter l’IA pour le moment. Voici une recommandation premium générée localement.",
          );
          setPhase("result");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [phase, scores, answers]);

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setScores({ paris: 0, cretace: 0, florence: 0 });
    setPhase("quiz");
    setAiText("");
    setErrorText("");
  };

  return (
    <section
      id="destination-quiz"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-3 py-1 text-xs font-medium text-gold-200 ring-1 ring-gold-500/20">
            <Sparkles className="size-4" />
            Recommandation personnalisée
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Trouvez votre époque idéale
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-200/70 sm:text-base">
            Répondez en quelques secondes. Notre IA temporelle affinera ensuite une recommandation
            digne d’un voyage d’exception.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="tt-glass relative overflow-hidden rounded-3xl p-5 sm:p-6"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_400px_at_20%_10%,rgba(245,158,11,0.14),transparent_60%),radial-gradient(700px_400px_at_90%_20%,rgba(99,102,241,0.10),transparent_62%)]"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />

          <div className="relative">
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-zinc-200/70">
                <span>Progression</span>
                <span>
                  {Math.min(step + 1, questions.length)}/{questions.length}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.round(progress * 100)}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {phase === "quiz" && current && (
                <motion.div
                  key={`q_${step}`}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <div className="text-sm font-semibold text-white sm:text-base">
                    {current.title}
                  </div>

                  <div className="mt-4 grid gap-3">
                    {current.choices.map((c) => (
                      <motion.button
                        key={c.label}
                        type="button"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => selectChoice(c)}
                        className="w-full rounded-2xl bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/10 hover:brightness-105"
                      >
                        {c.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {phase === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="py-10 text-center"
                >
                  <div className="mx-auto grid size-14 place-items-center rounded-3xl bg-white/5 ring-1 ring-white/10">
                    <LoaderCircle className="size-6 animate-spin text-gold-200" />
                  </div>
                  <div className="mt-4 text-sm font-semibold text-white">
                    L'IA temporelle analyse votre profil psychologique...
                  </div>
                  <div className="mt-2 text-sm text-zinc-200/70">
                    Affinage des signaux · Pondération des préférences · Calibrage de l’itinéraire
                  </div>
                </motion.div>
              )}

              {phase === "result" && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  {errorText && (
                    <div className="mb-4 rounded-2xl bg-white/5 px-4 py-3 text-sm text-zinc-100 ring-1 ring-white/10">
                      {errorText}
                    </div>
                  )}

                  <div className="text-xs font-medium text-gold-200">
                    Destination recommandée
                  </div>
                  <div className="mt-1 text-xl font-semibold text-white">
                    {DESTINATIONS[winner].title}
                  </div>
                  <div className="mt-1 text-sm text-zinc-200/70">
                    {DESTINATIONS[winner].subtitle}
                  </div>

                  <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-white/10">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={DESTINATIONS[winner].imageSrc}
                        alt={DESTINATIONS[winner].imageAlt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 520px, 92vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-zinc-200/80">{aiText}</p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <motion.a
                      href="#reservation"
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-gold-400 to-gold-600 px-5 text-sm font-semibold text-black ring-1 ring-gold-200/25 transition hover:brightness-105"
                    >
                      Réserver cette époque
                    </motion.a>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex h-12 items-center justify-center rounded-2xl bg-white/5 px-5 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/10"
                    >
                      Refaire le quiz
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.06 }}
          className="space-y-3"
        >
          {[
            {
              k: "Discrétion",
              v: "Nos recommandations respectent votre confidentialité et votre confort.",
            },
            {
              k: "Cohérence temporelle",
              v: "Chaque itinéraire est validé par des protocoles chronologiques certifiés.",
            },
            {
              k: "Signature luxe",
              v: "Guides privés, accès privilégiés, et détails haut de gamme — en toute époque.",
            },
          ].map((x) => (
            <div key={x.k} className="rounded-3xl bg-white/5 px-5 py-4 ring-1 ring-white/10">
              <div className="text-sm font-semibold text-white">{x.k}</div>
              <div className="mt-1 text-sm text-zinc-200/70">{x.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


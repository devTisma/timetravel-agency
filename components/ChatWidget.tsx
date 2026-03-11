"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Msg = { id: string; role: "assistant" | "user"; text: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      text: "Bonjour, je suis votre Assistant Temporel. Quelle époque souhaitez-vous explorer aujourd’hui ?",
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const shell = useMemo(
    () => ({
      panel:
        "fixed bottom-20 right-4 z-50 w-[92vw] max-w-sm overflow-hidden rounded-3xl bg-zinc-950/95 ring-1 ring-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl",
      button:
        "fixed bottom-4 right-4 z-50 grid size-14 place-items-center rounded-2xl bg-white text-black shadow-[0_18px_40px_rgba(0,0,0,0.8)] ring-1 ring-zinc-300",
    }),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [open, messages.length, loading]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || loading) return;

    const userMsg: Msg = { id: `u_${Date.now()}`, role: "user", text };
    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setDraft("");
    setLoading(true);
    window.setTimeout(() => inputRef.current?.focus(), 0);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.text })),
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = (await res.json()) as { message?: string };
      const assistantText =
        data.message?.trim() ||
        "Je n’ai pas pu générer une réponse. Pouvez-vous reformuler ?";

      setMessages((m) => [
        ...m,
        { id: `a_${Date.now()}`, role: "assistant", text: assistantText },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: `a_${Date.now()}`,
          role: "assistant",
          text: "Je rencontre un souci technique pour le moment. Réessayez dans quelques instants.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="chat">
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className={shell.panel}
            role="dialog"
            aria-label="Chat Assistant Temporel"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900/80 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <MessageCircle className="size-4 text-gold-200" />
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-white">Assistant Temporel</div>
                  <div className="text-xs text-zinc-200/70">TimeTravel Agency</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid size-9 place-items-center rounded-2xl bg-white/5 text-zinc-100 ring-1 ring-white/10 hover:bg-white/10 transition"
                aria-label="Fermer le chat"
              >
                <X className="size-4" />
              </button>
            </div>

            <div
              ref={scrollerRef}
              className="max-h-72 space-y-3 overflow-auto bg-zinc-950/80 px-4 py-4"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={[
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "max-w-[85%] rounded-2xl px-3 py-2 text-sm ring-1",
                      m.role === "user"
                        ? "bg-gold-500/20 text-white ring-gold-500/20"
                        : "bg-white/5 text-zinc-100 ring-white/10",
                    ].join(" ")}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm text-zinc-100 ring-1 ring-white/10">
                    <span className="inline-flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-zinc-200/80 animate-pulse" />
                      <span className="size-1.5 rounded-full bg-zinc-200/65 animate-pulse [animation-delay:150ms]" />
                      <span className="size-1.5 rounded-full bg-zinc-200/50 animate-pulse [animation-delay:300ms]" />
                    </span>
                    Réflexion en cours…
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="border-t border-white/10 bg-black/20 p-3">
              <div className="relative">
                <input
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Posez-moi vos questions sur les voyages temporels..."
                  disabled={loading}
                  className="h-11 w-full rounded-2xl bg-black/40 pl-4 pr-12 text-sm text-white ring-1 ring-white/10 outline-none transition placeholder:text-zinc-400 focus:ring-gold-500/30 disabled:opacity-60"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading || !draft.trim()}
                  className="absolute right-1 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-xl bg-white text-black ring-1 ring-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition disabled:opacity-60"
                  aria-label="Envoyer"
                >
                  <Send className="size-4" />
                </motion.button>
              </div>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setOpen((v) => !v);
          window.setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className={shell.button}
        aria-label={open ? "Réduire le chat" : "Ouvrir le chat"}
      >
        <MessageCircle className="size-6 text-black" />
      </motion.button>
    </div>
  );
}


import { Booking } from "../components/Booking";
import { Destinations } from "../components/Destinations";
import { DestinationQuiz } from "../components/DestinationQuiz";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <div className="tt-bg min-h-dvh">
      <Navbar />
      <main>
        <Hero />
        <Destinations />
        <Booking />
        <DestinationQuiz />
      </main>
      <footer className="border-t border-white/10 bg-black/30 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-sm text-zinc-200/70 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-semibold text-white">TimeTravel Agency</span>{" "}
            — voyages temporels de luxe
          </div>
          <div className="text-zinc-200/60">
            © {new Date().getFullYear()} — Tous droits réservés
          </div>
        </div>
      </footer>
    </div>
  );
}

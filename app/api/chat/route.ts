import { NextResponse } from "next/server";

type IncomingMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT =
  "Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe. Ton rôle : conseiller les clients sur les meilleures destinations. Ton ton : Professionnel mais chaleureux, passionné d'histoire, toujours enthousiaste sans être familier, avec une expertise en voyage temporel (fictif mais crédible). Tu connais parfaitement : Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle), Crétacé -65M (dinosaures, nature préhistorique), et Florence 1504 (Renaissance, art, Michel-Ange). Tu peux suggérer des destinations selon les intérêts, donner des conseils et inventer des prix cohérents (en 'Crédits Temporels' ou Euros).";

export async function POST(req: Request) {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing MISTRAL_API_KEY" },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = (body as { messages?: IncomingMessage[] }).messages;
  if (!Array.isArray(messages)) {
    return NextResponse.json({ error: "Missing messages[]" }, { status: 400 });
  }

  const safeMessages = messages
    .filter(
      (m): m is IncomingMessage =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .map((m) => ({ role: m.role, content: m.content.trim() }));

  const mistralRes = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-small-latest",
      temperature: 0.7,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...safeMessages],
    }),
  });

  if (!mistralRes.ok) {
    const text = await mistralRes.text().catch(() => "");
    return NextResponse.json(
      { error: "Mistral request failed", details: text.slice(0, 2000) },
      { status: 502 },
    );
  }

  const data = (await mistralRes.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content?.trim();
  return NextResponse.json({ message: content ?? "" });
}


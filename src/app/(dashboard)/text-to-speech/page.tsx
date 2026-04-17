import { TextToSpeechView } from "@/features/text-to-speech/views/text-to-speech-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to Speech Generator",
  description:
    "Convert scripts, ads, stories, and product copy into natural downloadable speech with Velora Voice's premium AI text-to-speech studio.",
  keywords: [
    "text to speech generator",
    "AI voiceover",
    "download speech audio",
    "natural AI voices",
    "Velora Voice text to speech",
  ],
  openGraph: {
    title: "Text to Speech Generator | Velora Voice",
    description:
      "Create natural downloadable voiceovers from text in a premium dark audio studio.",
  },
};

export default async function TextToSpeechPage({
  searchParams,
}: {
  searchParams: Promise<{ text?: string; voiceId?: string }>;
}) {
  const { text, voiceId } = await searchParams;

  prefetch(trpc.voices.getAll.queryOptions());
  prefetch(trpc.generations.getAll.queryOptions());

  return (
    <HydrateClient>
      <TextToSpeechView initialValues={{ text, voiceId }} />
    </HydrateClient>
  );
}

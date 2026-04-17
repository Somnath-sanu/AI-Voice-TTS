import { voicesSearchParamsCache } from "@/features/voices/lib/params";
import { VoicesView } from "@/features/voices/views/voices-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Metadata } from "next";
import type { SearchParams } from "nuqs/server";

export const metadata: Metadata = {
  title: "Voice Library",
  description:
    "Explore built-in and custom AI voices for expressive narration, ads, podcasts, games, and downloadable voiceovers in Velora Voice.",
  keywords: [
    "AI voice library",
    "custom voices",
    "voice cloning",
    "voice preview",
    "Velora Voice voices",
  ],
  openGraph: {
    title: "Voice Library | Velora Voice",
    description:
      "Browse and preview expressive built-in and custom voices for AI voiceover projects.",
  },
};

export default async function VoicesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { query } = await voicesSearchParamsCache.parse(searchParams);

  prefetch(trpc.voices.getAll.queryOptions({ query }));

  return (
    <HydrateClient>
      <VoicesView />
    </HydrateClient>
  );
}

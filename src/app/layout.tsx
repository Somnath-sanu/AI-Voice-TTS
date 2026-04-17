import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/client";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-voice-tts-production.up.railway.app"),
  applicationName: "Velora Voice",
  title: {
    default: "Velora Voice - Premium AI Voice Studio",
    template: "%s | Velora Voice",
  },
  description:
    "Create natural text-to-speech audio, preview lifelike voices, and download polished voiceovers from a cinematic dark voice generation studio.",
  keywords: [
    "AI voice generator",
    "text to speech",
    "voiceover studio",
    "voice cloning",
    "audio generation",
    "download voice audio",
    "Velora Voice",
  ],
  creator: "Velora Voice",
  publisher: "Velora Voice",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Velora Voice",
    title: "Velora Voice - Premium AI Voice Studio",
    description:
      "Generate, preview, and download expressive AI voiceovers in a premium dark audio studio.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velora Voice - Premium AI Voice Studio",
    description:
      "Generate, preview, and download expressive AI voiceovers in a premium dark audio studio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <TRPCReactProvider>
        <html lang="en">
          <body className="antialiased">
            <NuqsAdapter>{children}</NuqsAdapter>
            <Toaster />
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}

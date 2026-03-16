import { TextToSpeechView } from "@/features/text-to-speech/views/text-to-speech-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text To Speech",
  description:
    "Convert text to natural-sounding speech with our AI-powered text-to-speech platform. Create lifelike voices for your applications, content, and more.",
};

export default function TextToSpeechPage() {
  return <TextToSpeechView />;
}

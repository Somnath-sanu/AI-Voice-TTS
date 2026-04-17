"use client";

import { useTRPC } from "@/trpc/client";
import { SettingsPanel } from "../components/settings-panel";
import { TextInputPanel } from "../components/text-input-panel";
import {
  defaultTTSValues,
  TextToSpeechForm,
  TTSFormValues,
} from "../components/text-to-speech-form";
import { VoicePreviewPlaceholder } from "../components/voice-preview-placeholder";
import { useSuspenseQuery } from "@tanstack/react-query";
import { TTSVoicesProvider } from "../contexts/tts-voices-context";

export function TextToSpeechView({
  initialValues,
}: {
  initialValues?: Partial<TTSFormValues>;
}) {
  const trpc = useTRPC();
  const { data: voices } = useSuspenseQuery(trpc.voices.getAll.queryOptions());

  const { custom: customVoices, system: systemVoices } = voices;

  const allVoices = [...customVoices, ...systemVoices];

  const fallbackVoiceId = allVoices[0]?.id ?? "";

  const resolvedVoiceId =
    initialValues?.voiceId &&
    allVoices.some((v) => v.id === initialValues.voiceId)
      ? initialValues.voiceId
      : fallbackVoiceId;

  const defaultValues: TTSFormValues = {
    ...defaultTTSValues,
    ...initialValues,
    voiceId: resolvedVoiceId,
  };

  return (
    <TTSVoicesProvider
      value={{
        customVoices,
        systemVoices,
        allVoices,
      }}
    >
      <TextToSpeechForm defaultValues={defaultValues}>
        <div className="flex min-h-0 flex-1 gap-4 overflow-hidden p-3 lg:p-5">
          <div className="clay-panel flex min-h-0 flex-1 flex-col overflow-hidden rounded-[2.25rem]">
            <TextInputPanel />
            <VoicePreviewPlaceholder />
          </div>
          <SettingsPanel />
        </div>
      </TextToSpeechForm>
    </TTSVoicesProvider>
  );
}

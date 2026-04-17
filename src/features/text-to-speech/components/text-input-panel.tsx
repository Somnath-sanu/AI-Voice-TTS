"use client";

import { Textarea } from "@/components/ui/textarea";
import { COST_PER_CHARACTER, TEXT_MAX_LENGTH } from "../data/constants";
import { Badge } from "@/components/ui/badge";
import { CoinsIcon, Sparkles } from "lucide-react";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { ttsFormOptions } from "./text-to-speech-form";
import { useStore } from "@tanstack/react-form";
import { GenerateButton } from "./generate-button";
import { SettingsDrawer } from "./settings-drawer";
import { VoiceSelectorButton } from "./voice-selector-button";
import { HistoryDrawer } from "./history-drawer";
import { PromptSuggestions } from "./prompt-suggestions";

export function TextInputPanel() {
  const form = useTypedAppFormContext(ttsFormOptions);

  const text = useStore(form.store, (state) => state.values.text);
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
  const isValid = useStore(form.store, (state) => state.isValid);

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col">
      {text.length == 0 && (
        <div className="pointer-events-none absolute left-6 top-5 z-10 hidden items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-primary/90 lg:flex">
          <Sparkles className="size-4" />
          Script canvas
        </div>
      )}

      <div className="relative min-h-0 flex-1">
        <form.Field name="text">
          {(field) => (
            <Textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Start typing or paste your text here..."
              className="absolute inset-0 resize-none border-0 bg-transparent p-4 pb-6 text-base! leading-relaxed tracking-tight shadow-none wrap-break-word focus-visible:ring-0 lg:p-8 lg:pt-16 lg:pb-10"
              maxLength={TEXT_MAX_LENGTH}
              disabled={isSubmitting}
            />
          )}
        </form.Field>
        {/*Bottom fade overlay*/}
        <div className="pointer-events-none absolute inset-x-0 h-8 bottom-0 bg-linear-to-t from-card to-transparent" />
      </div>
      {/*Action bar*/}
      <div className="shrink-0 border-t border-white/10 p-2">
        {/*Mobile layout */}
        <div className="flex flex-col gap-3 lg:hidden">
          <div className="flex items-center gap-2">
            <SettingsDrawer>
              <VoiceSelectorButton />
            </SettingsDrawer>
            <HistoryDrawer />
          </div>
          <GenerateButton
            className="w-full"
            disabled={isSubmitting || !isValid}
            isSubmitting={isSubmitting}
            onSubmit={() => form.handleSubmit()}
          />
        </div>

        {/*Desktop layout */}
        {text.length > 0 ? (
          <div className="hidden items-center justify-between lg:flex">
            {/* <Badge variant={"outline"} className="gap-1.5 border-dashed border-primary/30">
              <CoinsIcon className="size-3 text-chart-5" />
              <span className="text-xs">
                <span className="tabular-nums">
                  ${(text.length * COST_PER_CHARACTER).toFixed(4)}
                </span>{" "}
                estimated
              </span>
            </Badge> */}
            <div></div>

            <div className="flex items-center gap-3">
              <p className="text-xs tracking-tight">
                {text.length.toLocaleString()}
                <span className="text-muted-foreground">
                  {" "}
                  / {TEXT_MAX_LENGTH.toLocaleString()} characters
                </span>
              </p>

              <GenerateButton
                size="sm"
                disabled={isSubmitting || !isValid}
                isSubmitting={isSubmitting}
                onSubmit={() => form.handleSubmit()}
              />
            </div>
          </div>
        ) : (
          <div className="hidden lg:block">
            <PromptSuggestions
              onSelect={(prompt) => form.setFieldValue("text", prompt)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

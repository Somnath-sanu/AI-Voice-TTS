import { useState } from "react";
import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { Search, Sparkles } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { voicesSearchParams } from "@/features/voices/lib/params";
import { VoiceCreateDialog } from "./voice-create-dialog";

export function VoicesToolbar() {
  const [query, setQuery] = useQueryState("query", voicesSearchParams.query);
  const [localQuery, setLocalQuery] = useState(query);

  const debouncedSetQuery = useDebouncedCallback(
    (value: string) => setQuery(value),
    300,
  );

  return (
    <div className="clay-panel relative space-y-5 overflow-hidden rounded-[2.5rem] p-5 lg:p-7">
      <div className="absolute right-10 top-0 size-56 rounded-full bg-primary/12 blur-3xl" />
      <Image
        src="/assets/clay/headphone-dynamic-clay.png"
        alt=""
        width={150}
        height={150}
        className="pointer-events-none absolute -right-4 -bottom-10 hidden rotate-12 opacity-65 drop-shadow-[0_24px_34px_rgba(0,0,0,0.34)] md:block"
      />
      <div className="relative space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          Voice library
        </p>
        <h2 className="text-3xl font-bold tracking-[-0.06em] lg:text-4xl">
          Find the perfect voice
        </h2>
        <p className="max-w-xl text-sm text-muted-foreground leading-relaxed italic">
          Discover team voices, preview built-in performers, or sculpt a custom
          voice for your next download-ready project.
        </p>
      </div>

      <div className="relative flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <InputGroup className="clay-pill border-white/12 bg-white/6 lg:max-w-sm">
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search voices..."
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value);
                debouncedSetQuery(e.target.value);
              }}
            />
          </InputGroup>
          <div className="ml-auto hidden lg:block">
            <VoiceCreateDialog>
              <Button size="sm">
                <Sparkles />
                Custom voice
              </Button>
            </VoiceCreateDialog>
          </div>
          <div className="lg:hidden">
            <VoiceCreateDialog>
              <Button size="sm" className="w-full">
                <Sparkles />
                Custom voice
              </Button>
            </VoiceCreateDialog>
          </div>
        </div>
      </div>
    </div>
  );
}

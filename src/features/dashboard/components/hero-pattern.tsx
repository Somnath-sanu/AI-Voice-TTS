import { WavyBackground } from "@/components/ui/wavy-background";

export function HeroPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      <div className="absolute -left-28 top-16 size-96 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute right-0 top-4 size-120 rounded-full bg-accent/12 blur-3xl" />
      <div className="absolute -bottom-48 left-1/3 size-136 rounded-full bg-chart-3/10 blur-3xl" />
      <WavyBackground
        colors={["#C8FF5A", "#64ECFF", "#FF9D5C", "#F279C8"]}
        backgroundFill="transparent"
        blur={8}
        speed="slow"
        waveOpacity={0.08}
        waveWidth={70}
        waveYOffset={250}
        containerClassName="h-full"
        className="hidden"
      />
    </div>
  );
}

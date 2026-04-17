import { quickActions } from "@/features/dashboard/data/quick-actions";
import { QuickActionCard } from "@/features/dashboard/components/quick-action-card";

export function QuickActionsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Launch pads
          </p>
          <h2 className="text-2xl font-bold tracking-[-0.05em]">
            Quick actions
          </h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quickActions.map((action) => (
          <QuickActionCard
            key={action.title}
            title={action.title}
            description={action.description}
            gradient={action.gradient}
            href={action.href}
          />
        ))}
      </div>
    </div>
  );
}

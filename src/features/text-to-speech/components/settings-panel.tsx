import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, Settings } from "lucide-react";
import { SettingsPanelSettings } from "./settings-panel-settings";
import { SettingsPanelHistory } from "./settings-panel-history";

const tabTriggerClassName =
  "flex-1 h-full gap-2 rounded-full border border-transparent bg-transparent shadow-none data-[state=active]:border-primary/30";

export function SettingsPanel() {
  return (
    <div className="clay-panel hidden min-h-0 w-105 flex-col overflow-hidden rounded-[2.25rem] lg:flex">
      <Tabs
        defaultValue="settings"
        className="flex h-full min-h-0 flex-col gap-y-0"
      >
        <TabsList className="m-3 w-auto rounded-full border border-white/10 bg-white/5 p-1 group-data-[orientation=horizontal]/tabs:h-12">
          <TabsTrigger value="settings" className={tabTriggerClassName}>
            <Settings className="size-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="history" className={tabTriggerClassName}>
            <History className="size-4" />
            History
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="settings"
          className="mt-0 flex min-h-0 flex-1 flex-col overflow-y-auto"
        >
          <SettingsPanelSettings />
        </TabsContent>
        <TabsContent
          value="history"
          className="mt-0 flex min-h-0 flex-1 flex-col overflow-y-auto"
        >
          <SettingsPanelHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}

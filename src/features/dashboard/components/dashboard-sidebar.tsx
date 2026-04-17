"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { OrganizationSwitcher, useClerk, UserButton } from "@clerk/nextjs";
import {
  AudioLinesIcon,
  HeadphonesIcon,
  HomeIcon,
  LayoutGridIcon,
  SettingsIcon,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  onClick?: () => void;
}

interface NavSectionProps {
  label?: string;
  items: MenuItem[];
  pathname: string;
}

function NavSection({ label, items, pathname }: NavSectionProps) {
  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel className="text-[13px] uppercase text-muted-foreground">
          {label}
        </SidebarGroupLabel>
      )}

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild={!!item.url}
                isActive={
                  item.url
                    ? item.url === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.url)
                    : false
                }
                onClick={item.onClick}
                tooltip={item.title}
                className="h-10 px-3 py-2 text-[13px] border border-transparent hover:border-white/10 data-[active=true]:border-primary/40"
              >
                {item.url ? (
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <>
                    <item.icon />
                    <span>{item.title}</span>
                  </>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const clerk = useClerk();

  const mainMenuItems: MenuItem[] = [
    {
      title: "Dashboard",
      url: "/",
      icon: HomeIcon,
    },
    {
      title: "Explore voices",
      url: "/voices",
      icon: LayoutGridIcon,
    },
    {
      title: "Text to speech",
      url: "/text-to-speech",
      icon: AudioLinesIcon,
    },
    // {
    //   title: "Voice cloning",
    //   icon: Volume2Icon,
    // },
  ];

  const othersMenuItems: MenuItem[] = [
    {
      title: "Settings",
      icon: SettingsIcon,
      onClick: () => clerk.openOrganizationProfile(),
    },
    {
      title: "Help and support",
      url: "mailto:somnath100dbi@gmail.com",
      icon: HeadphonesIcon,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-col gap-5 p-4">
        <div className="flex items-center gap-2 pl-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:pl-0">
          <div className="relative grid size-10 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-4 place-items-center group-data-[collapsible=icon]:rounded-full rounded-2xl bg-primary text-primary-foreground shadow-[inset_-4px_-5px_10px_rgba(0,0,0,0.22),inset_4px_5px_12px_rgba(255,255,255,0.25),0_0_28px_rgba(200,255,90,0.22)]">
            <Image
              src={"/logo.svg"}
              alt="Velora Voice"
              width={24}
              height={24}
              className="rounded-sm brightness-0"
            />
          </div>
          <span className="group-data-[collapsible=icon]:hidden text-lg font-bold tracking-[-0.04em] text-foreground">
            Velora Voice
          </span>
          <SidebarTrigger className="ml-auto lg:hidden" />
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <OrganizationSwitcher
              hidePersonal
              fallback={
                <Skeleton className="h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-2xl border border-border bg-white/10" />
              }
              appearance={{
                elements: {
                  rootBox:
                    "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center! text-black!",
                  organizationSwitcherTrigger:
                    "w-full! justify-between! bg-white/8! text-white! border! border-white/12! rounded-2xl! pl-1! pr-2! py-1! gap-3! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! shadow-[inset_-4px_-5px_10px_rgba(0,0,0,0.22),inset_4px_5px_10px_rgba(255,255,255,0.06)]!",
                  organizationPreview: "gap-2! ",
                  organizationPreviewAvatarBox: "size-6! rounded-sm! text-black!",
                  organizationPreviewTextContainer:
                    "text-xs! tracking-tight! font-semibold! group-data-[collapsible=icon]:hidden!",
                  organizationPreviewMainIdentifier: "text-[13px]!",
                  organizationSwitcherTriggerIcon:
                    "size-4! text-sidebar-foreground! group-data-[collapsible=icon]:hidden! text-black!",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <div className="mx-4 border-b border-dashed border-white/10" />
      <SidebarContent>
        <NavSection items={mainMenuItems} pathname={pathname} />
        <NavSection
          label="Others"
          items={othersMenuItems}
          pathname={pathname}
        />
      </SidebarContent>
      <div className="mx-4 border-b border-dashed border-white/10" />
      <SidebarFooter className="gap-3 py-3">
        {/* <UsageContainer /> */}
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton
              showName
              fallback={
                <Skeleton className="h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-2xl border border-border bg-white/10" />
              }
              appearance={{
                elements: {
                  rootBox:
                    "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                  userButtonTrigger:
                    "w-full! justify-between! bg-white/8! text-white! border! border-white/12! rounded-2xl! pl-1! pr-2! py-1! shadow-[inset_-4px_-5px_10px_rgba(0,0,0,0.22),inset_4px_5px_10px_rgba(255,255,255,0.06)]! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:after:hidden! [--border:color-mix(in_srgb,transparent,var(--clerk-color-neutral,#ffffff)_15%)]!",
                  userButtonBox: "flex-row-reverse! gap-2!",
                  userButtonOuterIdentifier:
                    "text-[13px]! tracking-tight! font-semibold! text-foreground! pl-0! group-data-[collapsible=icon]:hidden!",
                  userButtonAvatarBox: "size-6!",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

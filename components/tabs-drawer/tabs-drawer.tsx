'use client';
import { HeartPlus, HomeIcon, Settings, User2Icon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

type TabOption = {
  id: "home" | "profile" | "addLog" | "settings"
  icon: React.ReactNode,
  action?: () => {},
  href? : string 
}[]

export const TabsDrawer = () => {
    const TABS: TabOption = [
        {
          id: "home", 
          icon: <HomeIcon className="w-7 h-7 stroke-pacific-500 dark:stroke-pacific-300"/>,
          href: "/dashboard"
        },
        {
          id: "addLog", 
          icon: <HeartPlus className="w-7 h-7 stroke-pacific-500 dark:stroke-pacific-300"/>,
          // action: () => {},

        },
        {
          id: "profile", 
          icon: <User2Icon className="w-7 h-7 stroke-pacific-500 dark:stroke-pacific-300"/>,
          href: "/dashboard/profile"
        },
        {
          id: "settings", 
          icon: <Settings className="w-7 h-7 stroke-pacific-500 dark:stroke-pacific-300"/>,
          href: "/dashboard/settings"
        },
      ]

      return (
        <div className="px-4 mb-12">
{TABS.map((tab) => (
    tab.href ? (
       <Link href={tab.href} key={tab.id}>
        <div className="p-4">
          {tab.icon}
        </div>
       </Link>
    ) : (
       <div className="p-4" key={tab.id}>
          {tab.icon}
        </div>
    )
        ))}
        </div>
    )

}
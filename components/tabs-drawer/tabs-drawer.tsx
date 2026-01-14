'use client';
import { HeartPlus, HomeIcon, Settings, User2Icon } from "lucide-react";
import { useContext, useEffect } from "react";
import { TabContext } from "@/context/tab.context";

import Link from "next/link";

type TabOption = {
  id: "home" | "profile" | "addLog" | "settings"
  icon: React.ReactNode,
  action?: () => {},
  href? : string 
}[]

export const TabsDrawer = () => {
  const { activeTab, setActiveTab } = useContext(TabContext);



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
          // create modal for comprehensive HealthLog creation

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
        <div className="px-4 relative right-4">
{TABS.map((tab) => (
    tab.href ? (
       <Link href={tab.href} key={tab.id} onClick={() => setActiveTab(tab.href!)}>
        <div className={activeTab === tab.href ? 'border-l-peach-500 border-l-6 p-4' : "border-l-transparent border-l-6 p-4"}>
          {tab.icon}
        </div>
       </Link>
    ) : (
       <div className={activeTab === tab.href ? 'border-l-peach-500 border-l-6 p-4' : "border-l-transparent border-l-6 p-4"} key={tab.id} onClick={() => setActiveTab(tab.href!)}>
          {tab.icon}
        </div>
    )
        ))}
        </div>
    )

}
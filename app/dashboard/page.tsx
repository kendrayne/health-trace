
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle/theme-toggle";
import Button from "@/components/button/button";
import { TabsDrawer } from "@/components/tabs-drawer/tabs-drawer";
import { TemporalCorrelationChart } from "@/components/temporal-correlation-chart/temporal-correlation-chart";
import { Greeting } from "@/components/greeting/greeting";
export default function Dashboard() {

  return (
      // {/* header */}
      <div className="bg-surface-light bg-linear-to-tl from-pacific-200 to-surface-light dark:to-surface-dark dark:from-pacific-800 w-full min-h-screen flex flex-col">
      {/* logout & dark mode container */}
      <div className="w-full px-14 py-4 flex justify-between items-center">
      <Greeting/>
        <div className="flex justify-center items-center bg-yellow-550">
        </div>
        <div className="flex justify-end gap-6">
      <ThemeToggle/>
      <Button href={""} title={""} buttonType="logout"/>
        </div>
      </div>

          
      <main className="w-full flex flex-1 overflow-scroll"> 

  <div className="w-full max-h-screen max-w-20 shrink-0 justify-center fixed top-[33.333%]">
    <TabsDrawer/>
  </div>


  <div className="flex-1 flex flex-col items-center justify-center p-12">
    <TemporalCorrelationChart/>
  </div>
</main>
    </div>

  );
}


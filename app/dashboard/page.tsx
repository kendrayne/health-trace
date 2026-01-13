
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle/theme-toggle";
import Button from "@/components/button/button";
import { TabsDrawer } from "@/components/tabs-drawer/tabs-drawer";
import { TemporalCorrelationChart } from "@/components/temporal-correlation-chart/temporal-correlation-chart";
import { Greeting } from "@/components/greeting/greeting";
export default function Dashboard() {

  return (
      // {/* header */}
    <div className="bg-surface-light dark:bg-surface-dark w-full py-8">
      {/* logout & dark mode container */}
      <div className="w-full px-14 py-4 flex justify-between items-center">
        <div className="flex justify-center items-center bg-yellow-550">
        </div>
        <div className="flex justify-end gap-6">
      <ThemeToggle/>
      <Button href={""} title={""} buttonType="logout"/>
        </div>
      </div>
      <Greeting/>

          
      <main className="flex w-full h-full">
      {/* tab drawer */}
      <div className="flex flex-col h-full max-w-32 w-full gap-12 justify-center">
        <TabsDrawer/>
      </div>
      <TemporalCorrelationChart/>
      </main>
    </div>
  );
}


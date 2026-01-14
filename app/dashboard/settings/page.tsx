
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle/theme-toggle";
import Button from "@/components/button/button";
import { TabsDrawer } from "@/components/tabs-drawer/tabs-drawer";

export default function Settings() {
  return (
        // {/* header */}
      <div className="bg-surface-light dark:bg-surface-dark w-full h-100 min-h-screen flex flex-col">
        {/* logout & dark mode container */}
        <div className="w-full px-14 py-4 flex justify-between items-center">
          <div className="flex justify-center items-center bg-yellow-550">
          </div>
          <div className="flex justify-end gap-6">
        <ThemeToggle/>
        <Button href={""} title={""} buttonType="logout"/>
          </div>
        </div>

  
            
        <main className="w-full flex flex-row h-100 flex-1">
        <div className="flex flex-col max-w-22 w-full gap-12 justify-center">
          <TabsDrawer/>
        </div>
        {/* tab drawer */}

        </main>
      </div>
  )
}

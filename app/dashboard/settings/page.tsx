
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle/theme-toggle";
import Button from "@/components/button/button";
import { TabsDrawer } from "@/components/tabs-drawer/tabs-drawer";

export default function Settings() {
  return (
      // {/* header */}
    <div className="bg-surface-light dark:bg-surface-dark w-full py-8">
      {/* logout & dark mode container */}
      <div className="w-full px-14 py-4 flex justify-between items-center">
        <div className="flex justify-start">

          <h1 className="text-5xl text-pacific-300 dark:pacific-100">Account Settings</h1> 
        </div>
        <div className="flex justify-end gap-6">
      <ThemeToggle/>
      <Button href={""} title={""} buttonType="logout"/>
        </div>
      </div>


      <main className="flex w-full h-full">
      {/* tab drawer */}
      <div className="flex flex-col h-full max-w-32 w-full gap-12 justify-center">
        <TabsDrawer/>
      </div>
      </main>
    </div>
  );
}

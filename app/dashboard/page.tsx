
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle/theme-toggle";
import Button from "@/components/button/button";
import { Greeting } from "@/components/greeting/greeting";
import { MainWrapper } from "./MainWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";


export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.onboarded) redirect('/onboarding');

  const user = session?.user;
  console.log(user);

  return (
      // {/* header */}
      <div className="bg-surface-light bg-linear-to-tl from-pacific-100 to-surface-light dark:to-surface-dark dark:from-pacific-950 w-full min-h-screen flex flex-col">
      {/* logout & dark mode container */}
      <div className="w-full px-14 py-4 flex justify-between items-center">
      <Greeting user={user}/>
        <div className="flex justify-center items-center bg-yellow-550">
        </div>
        <div className="flex justify-end gap-6">
      <ThemeToggle/>
      <Button href={""} title={""} buttonType="logout"/>
        </div>
      </div>

          
      <MainWrapper user={user}/>
    </div>

  );
}


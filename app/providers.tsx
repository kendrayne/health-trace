'use client';
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from '@/context/theme.context';
import { TabProvider } from "@/context/tab.context";

export default function Providers({children} : {children: React.ReactNode}) {
    return (
        <SessionProvider>
        <ThemeProvider>
        <TabProvider>
          {children}
        </TabProvider>
        </ThemeProvider>
        </SessionProvider>
    )
}
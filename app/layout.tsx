import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "./providers";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Health Trace",
  description: "An AI tool to help you keep track of your health symptoms and recognize patterns over time. You can either note the concurrencies or send a report to your doctor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en" className="bg-surface-light dark:bg-surface-dark">
      <body
        className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Providers>
        {children}
        </Providers>

      </body>
    </html>

  );
}

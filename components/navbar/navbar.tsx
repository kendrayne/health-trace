'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Home, ChartSpline, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { useContext } from 'react';
import { ThemeContext } from '@/context/theme.context';
import { useSession } from 'next-auth/react';

import Button from '../button/button';

type IconKey = 'home' | 'dashboard' | 'settings';
type ButtonKey = 'login' | 'register' | 'logMood' | 'logDay';
const Navlink = ({ href, iconKey }: { href: string; iconKey: IconKey }) => {

    const path = usePathname();
    const isActive = path === href && path !== '/';
    const ICONMAP: Record<IconKey, React.ReactNode> = {
        home: <Home className={`stroke-pacific-500 dark:stroke-pacific-300 w-6 h-6 ${isActive ? 'stroke-peach-500' : ''}`}/>,
        dashboard: <ChartSpline className={`stroke-pacific-500 dark:stroke-pacific-300 w-6 h-6 ${isActive ? 'stroke-peach-500' : ''}`}/>,
        settings: <Settings className={`stroke-pacific-500 dark:stroke-pacific-300 w-6 h-6 ${isActive ? 'stroke-peach-500' : ''}`}/>,

    };

    return (
        <Link href={href} className={`flex items-center p-2 transition transform`}>
            {ICONMAP[iconKey]}
        </Link>
    );
};

export default function Navbar() {
    const {data: session, status} = useSession();

    console.log(session, status);
    

    const { darkModeEnabled } = useContext(ThemeContext);
    const LOGGED_IN_LINKS: { href: string; hoverTip: string; iconKey: IconKey }[] = [
        { href: "/", hoverTip: "Home", iconKey: "home" },
        { href: "/dashboard", hoverTip: "Dashboard", iconKey: "dashboard" },
        { href: "/settings", hoverTip: "Settings", iconKey: "settings" },
    ];
    const SIGNED_OUT_LINKS: { href: string; title: string; buttonType: ButtonKey }[] = [
        { href: "/login", title: "Login", buttonType: "login" },
        { href: "/register", title: "Start Tracking", buttonType: "register" },
    ];

    return (
        <nav className='flex w-full items-center justify-between px-10 py-2'>
            <div className='flex items-center w-fit h-fit'>
                <Image 
                    src={darkModeEnabled ? '/icon-dark.png' : '/icon.png'}
                    alt="Health Trace Logo" 
                    width={150} 
                    height={150} 
                    className="object-fit saturate-50 hue-rotate-200"
                    priority
                    />
            </div>
            <div className='flex items-center gap-x-6'>
                <ul className='flex items-center gap-x-2 px-6 py-1.5 rounded-full dark:bg-white/5'>
                    {
                    session?.user ? 
                    LOGGED_IN_LINKS.map(l => (
                        <li key={l.href}>
                            <Navlink href={l.href} iconKey={l.iconKey} />
                        </li>
                    )) :
                    SIGNED_OUT_LINKS.map(l => (
                        <li key={l.href}>
                            <Button href={l.href} title={l.title} buttonType={l.buttonType} />
                        </li>
                    ))
                }
                <div className='pl-4 border-l border-pacific-100 dark:border-pacific-800 flex justify-center'>
                    <ThemeToggle />
                </div>
                </ul>

            </div>
        </nav>

    );
}
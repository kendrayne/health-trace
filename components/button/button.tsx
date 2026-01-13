'use client';
import Link from 'next/link';
import { ArrowRight, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
type ButtonKey =  'logDay' | 'logMood' | 'login' | 'register' | 'getStartedHero' | 'alexDemoHero' | 'logout';
export default function Button({href, title, buttonType} : {href: string, title: string, buttonType: ButtonKey}) {
 const BUTTONMAP: Record<ButtonKey, string> = {

    login: 'group inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-pacific-100 px-6 py-2.5 font-medium text-pacific-900 transition-colors duration-300 hover:bg-pacific-900 hover:text-white dark:bg-pacific-800/80 dark:text-pacific-100 dark:hover:bg-pacific-100 dark:hover:text-pacific-900',
    register: 'group gap-2 relative flex w-fit items-center justify-center overflow-hidden rounded-full bg-peach-500 px-8 py-2.5 font-semibold text-white shadow-[inset_0_0_1.6em_-0.6em_rgba(0,0,0,0.2)] transition-all hover:shadow-md active:scale-95',
    logMood: '',
    logDay: '',
    logout: 'stroke-pacific-700/70 w-6 h-6',
    getStartedHero: 'bg-peach-500 hover:bg-peach-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-peach-200 transition-all',
    alexDemoHero: 'bg-white border-2 border-pacific-100 text-pacific-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-pacific-50 transition-all'
};

    if (buttonType === 'logout') {
        return (
                <button onClick={() => signOut()}>
                    <LogOut className={BUTTONMAP[buttonType]}/>
                </button>
        )
    } else return (
        <button className={BUTTONMAP[buttonType]}>
            <Link href={href}>{title}</Link>
            {buttonType === 'register' ? (<ArrowRight className='w-5.5 h-5.5 transition-all duration-300 group-hover:translate-x-5'/>): null} 

        </button>
    )
}


'use client';
import Image from 'next/image';
import { Home, ChartSpline, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

type IconKey = 'home' | 'dashboard' | 'settings';

const Navlink = ({href, hoverTip, iconKey}: {href: string, hoverTip: string, iconKey: IconKey}) => {
    const ICONMAP: Record<IconKey, React.ReactNode> = 
        { home: <Home/>,
        dashboard: <ChartSpline/>,
        settings: <Settings/> 
        }

    
const path = usePathname();
return (
    <a href={href} className={path === href && path !== '/' ? 'text-white font-bold mx-4' : 'text-white mx-4'}>
        {ICONMAP[iconKey]}
        </a>
)

}


export default function Navbar() {
    const LINKS: { href: string; hoverTip: string; iconKey: IconKey }[] = [
        {href: "/", hoverTip: "Home button", iconKey: "home"},
        {href: "/dashboard", hoverTip: "Dashboard button", iconKey: "dashboard"},
        {href: "/settings", hoverTip: "Settings button", iconKey: "settings"},

    ]
    return (
        <nav className='bg-pacific-500 text-white'>
            <div className={""}>
                <Image src='/logo.png' alt="Health Trace Logo" width={100} height={100} className="mx-4 my-2 object-contain"/>
            </div>

            <ul>
            {LINKS.map(l => (
                <Navlink href={l.href} hoverTip={l.hoverTip} iconKey={l.iconKey}/>
            ))}
            </ul>
        </nav>
    )
};

/*


*/
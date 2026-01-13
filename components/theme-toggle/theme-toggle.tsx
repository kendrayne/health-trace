'use client';
import { useContext } from "react";
import { ThemeContext } from "@/context/theme.context";
import Image from "next/image";
import { Sun, MoonStar } from "lucide-react";



export const ThemeToggle = () => {
    const { setDarkModeEnabled, darkModeEnabled } = useContext(ThemeContext);

    return (
        <button onClick={() => setDarkModeEnabled(!darkModeEnabled)}>
            {darkModeEnabled ? (<Sun className="stroke-peach-500 w-6 h-6"/>) : (<MoonStar className="stroke-pacific-500 w-6 h-6"/>)}
        </button>
    );
};
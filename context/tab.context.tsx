'use client';

import { createContext, useState, ReactNode, useEffect } from "react";

interface TabContextType {
    activeTab: string,
    setActiveTab: (tab: string) => void;
};

export const TabContext = createContext<TabContextType>({
    activeTab: 'home',
    setActiveTab: () => {}
})

interface TabProviderProps {
    children: ReactNode
}

export const TabProvider = ({children}: TabProviderProps) => {
    const [activeTab, setActiveTab] = useState('home')

    const value = { 
        activeTab,
        setActiveTab
    }

    return (
    <TabContext.Provider value={value}>{children}</TabContext.Provider>
    )
}
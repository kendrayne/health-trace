'use client';

import { createContext, useState, ReactNode, useEffect } from "react";

interface TabContextType {
    activeTab: string,
    modalOpen: boolean,
    setActiveTab: (tab: string) => void;
    setModalOpen: (arg: boolean) => void;
};

export const TabContext = createContext<TabContextType>({
    activeTab: 'home',
    modalOpen: false,
    setActiveTab: () => {},
    setModalOpen: () => {}
})

interface TabProviderProps {
    children: ReactNode
}

export const TabProvider = ({children}: TabProviderProps) => {
    const [activeTab, setActiveTab] = useState('home')
    const [modalOpen, setModalOpen] = useState(false);

    const value = { 
        activeTab,
        setActiveTab,
        modalOpen, 
        setModalOpen
    }

    return (
    <TabContext.Provider value={value}>{children}</TabContext.Provider>
    )
}
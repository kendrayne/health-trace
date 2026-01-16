'use client'
import { useContext, useEffect } from "react"
import { TabContext } from "@/context/tab.context"
import { TabsDrawer } from "@/components/tabs-drawer/tabs-drawer"
import { TemporalCorrelationChart } from "@/components/temporal-correlation-chart/temporal-correlation-chart"
import { HealthLogModal } from "@/components/health-log-modal/health-log-modal"


export const MainWrapper = () => {


    const { modalOpen, setModalOpen } = useContext(TabContext);


     return !modalOpen ?(
    <main className="w-full flex flex-1 overflow-scroll"> 
    
      <div className="w-full max-h-screen max-w-20 shrink-0 justify-center fixed top-[33.333%]">
        <TabsDrawer/>
      </div>
    
    
      <div className="flex-1 flex flex-col items-center justify-center p-12">
        <TemporalCorrelationChart/>
      </div>
    </main>
    
    ) : ( <HealthLogModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>

    )
}



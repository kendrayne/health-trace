'use client'
import { useContext } from "react"
import { TabContext } from "@/context/tab.context"
import { TabsDrawer } from "@/components/tabs-drawer/tabs-drawer"
import { TemporalCorrelationChart } from "@/components/temporal-correlation-chart/temporal-correlation-chart"
import { HealthLogModal } from "@/components/health-log-modal/health-log-modal"
import { type Session } from 'next-auth';

interface UserProps {
  user: Session['user'];
}

export const MainWrapper = ({user} : UserProps) => {
    const { modalOpen, setModalOpen } = useContext(TabContext);

    console.log(user);

     return !modalOpen ? (
    <main className="w-full flex flex-1 overflow-scroll relative"> 
    
      <div className="w-20 shrink-0 flex justify-center fixed top-1/2 -translate-y-1/2 left-0 z-50">
        <TabsDrawer/>
      </div>
    
    
      <div className="flex-1 flex flex-col items-start justify-start px-14 py-8 ml-20">
        <TemporalCorrelationChart user={user}/>
      </div>
    </main>
    
    ) : ( 
      <HealthLogModal modalOpen={modalOpen} setModalOpen={setModalOpen} user={user}/>
    )
}
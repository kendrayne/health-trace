'use client';

import { useState } from "react";
import { DayFrame } from "./day-frame/day-frame";
import { CategoryKey, ColorKey } from "../category-key/category-key";
import { type Session } from "next-auth";
import { useEffect } from "react";

interface UserProps {
  user: Session["user"];
}

type ChartEvent = { 
  timestamp: number;
  value?: number;
  type: ColorKey;
}[];

interface LoggedSymptomItem {
  id: string;
  name: string;
}

interface LoggedMedicationItem {
  name: string;
  strength: number | null;
  unit: string | null;
}

interface HealthLogData {
    id: number | null;
    dietQuality: number | null;
    exercise: number | null;
    nicotine: number | null;
    alcohol: number | null;
    caffeine: number | null;
    marijuana: number | null;
    sleep: number | null;
    mood: number | null;
    loggedSymptoms: LoggedSymptomItem[]; 
    loggedMedications: LoggedMedicationItem[]; 
    water: number | null;
    userId: string | undefined;
}

const MOCK_DATA: ChartEvent = [
  { timestamp: 1, value: 1, type: 'mood' },
  { timestamp: 2, value: 6.666, type: 'diet' },
  { timestamp: 3, value: 9.999, type: 'nicotine' },
  { timestamp: 4, value: 3.333, type: 'alcohol' },
  { timestamp: 5, value: 3.333, type: 'alcohol' },
];

export const TemporalCorrelationChart = ({user} : {user: Session['user']}) => {
  const [selectedRange, setSelectedRange] = useState(7);
  const [healthLogData, setHealthLogData] = useState<HealthLogData[]>([]);
  const [loadedHealthData, setLoadedHealthData] = useState(false)
  const userId = user?.id;

  useEffect(() => {

    if (!user) return;
    const fetchData = async () => {

      const res = await fetch(`/api/healthlog?userId=${userId}`);
      const data = await res.json();
      const { success, userHealthLogData, message} = data;
      if (success) { 
        console.log(userHealthLogData + ": this is the client end res sent from server.")
        const healthLogs = userHealthLogData.map((log: any) => ({
          id: log.id,
          alcohol: log.alcohol,
          caffeine: log.caffeine,
          nicotine: log.nicotine,
          marijuana: log.marijuana,
          dietQuality: log.dietQuality,
          exercise: log.exercise,
          mood: log.mood,
          sleep: log.sleep, 
          loggedSymptoms: log.symptoms,
          loggedMedications: log.medications,
          water: log.water

        }))
        setHealthLogData(healthLogs);
        console.log(healthLogData);
        setLoadedHealthData(true)
      }
    }

    fetchData();
  }, [user, loadedHealthData])



  const categories: ColorKey[] = ['diet', 'exercise', 'caffeine', 'sleep', 'symptom', 'nicotine', 'mood', 'alcohol', 'medicine'];

  return (

    <div className="w-full max-w-[80%] aspect-2/1 p-8 glass-panel rounded-3xl relative overflow-hidden flex flex-col transition-all duration-500">
      

      <div className="absolute top-0 right-0 w-64 h-64 bg-pacific-300/20 blur-[80px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-peach-300/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
      

      <div className="w-full flex flex-wrap justify-center gap-1 mb-6 z-10">
        {categories.map((cat) => (
          <CategoryKey key={cat} category={cat} />
        ))}
      </div>


      <div className="flex flex-row flex-1 w-full h-full min-h-0 relative z-10">
        

        <div className="flex flex-col-reverse justify-between h-full pr-4 text-pacific-400/70 dark:text-pacific-500/50 font-mono text-[10px] select-none">
          {[...Array(11)].map((_, i) => (
            <span key={i} className="leading-none">{i}</span>
          ))}
        </div>

        <div className="relative flex-1 h-full w-full">
          

          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
            {[...Array(11)].map((_, i) => (
              <div key={i} className="w-full h-px border-b border-dashed border-pacific-900/5 dark:border-pacific-100/10 last:border-0" />
            ))}
          </div>


          <div className="absolute inset-0 flex pointer-events-none z-0">
             {[...Array(selectedRange)].map((_, i) => (
               <div key={i} className="flex-1 border-r border-dashed border-pacific-900/5 dark:border-pacific-100/10 last:border-0" />
             ))}
          </div>


          <p className="absolute -left-6 top-1/2 -rotate-90 -translate-y-1/2 text-[9px] font-bold tracking-[0.2em] uppercase text-pacific-400/60">
            Severity
          </p>
          <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-[0.2em] uppercase text-pacific-400/60">
            Time (Days)
          </p>


          <div className="absolute inset-0 flex w-full h-full z-10">
            {[...Array(selectedRange)].map((_, i) => (
              <div key={i} className="flex-1 h-full relative group">
                <DayFrame num={i} selectedRange={selectedRange} userHealthLogData={healthLogData[i]}/>
                

                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-pacific-400 font-mono group-hover:text-pacific-600 dark:group-hover:text-pacific-200 transition-colors">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
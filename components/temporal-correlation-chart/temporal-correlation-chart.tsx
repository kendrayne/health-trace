'use client';

import * as React from "react";
import { useState, useEffect } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { type Session } from "next-auth";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { Info } from "lucide-react"; 

interface LoggedSymptomItem {
  id: string;
  symptom: { description: string };
}

interface LoggedMedicationItem {
  medication: { name: string };
}


const chartConfig = {
  dietQuality: { label: "Diet", color: "#F97316" }, 
  exercise: { label: "Exercise", color: "#3B82F6" }, 
  nicotine: { label: "Nicotine", color: "#BE123C" }, 
  alcohol: { label: "Alcohol", color: "#EAB308" }, 
  caffeine: { label: "Caffeine", color: "#A855F7" }, 
  marijuana: { label: "Marijuana", color: "#62b567" }, 
  sleep: { label: "Sleep", color: "#6366F1" }, 
  mood: { label: "Mood", color: "#F472B6" }, 
  water: { label: "Water", color: "#1971e8" }, 
} satisfies ChartConfig;

const normalizeValue = (key: string, val: number | null) => {
  if (val === null) return 0;
  switch (key) {
    case "dietQuality": return val * 3.3333333333;
    case "exercise": return val * 2.5 
    case "nicotine": return val * 2.5
    case "marijuana": return val * 2.5
    case "alcohol": return val * 2.5 
    case "caffeine": return val * 2.5;
    case "mood": return val * 2;
    case "sleep": return val * 0.714285714285714;
    case "water": return val; 
    default: return val;
  }
};

export const TemporalCorrelationChart = ({ user }: { user: Session['user'] }) => {
  const [healthLogData, setHealthLogData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/healthlog`);
        const data = await res.json();
        const { success, healthLogs, symptoms, medications } = data;

        if (success) {
          const processedLogs = healthLogs.map((log: any, index: number) => {
            let dateLabel = `Day ${index + 1}`;
            if (log.date || log.createdAt) {
               const dateObj = new Date(log.date || log.createdAt);
               dateLabel = dateObj.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
            }

            return {
              ...log,
              dateLabel, 
              dietQuality_norm: normalizeValue('dietQuality', log.dietQuality),
              exercise_norm: normalizeValue('exercise', log.exercise),
              nicotine_norm: normalizeValue('nicotine', log.nicotine),
              alcohol_norm: normalizeValue('alcohol', log.alcohol),
              caffeine_norm: normalizeValue('caffeine', log.caffeine),
              marijuana_norm: normalizeValue('marijuana', log.marijuana),
              sleep_norm: normalizeValue('sleep', log.sleep),
              mood_norm: normalizeValue('mood', log.mood),
              water_norm: normalizeValue('water', log.water),
               
              // raw data for tooltip readability
              rawSymptoms: symptoms.filter((s: any) => s.healthLogId === log.id), 
              rawMedications: medications.filter((m: any) => m.healthLogId === log.id),
            };
          });
          setHealthLogData(processedLogs);
        }
      } catch (error) {
        console.error("Failed to fetch logs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const hasLowData = healthLogData.length > 0 && healthLogData.length < 3;
  const hasNoData = healthLogData.length === 0;

  if (loading) {
    return (
      <div className="w-full h-[400px] flex flex-col items-center justify-center gap-2 glass-panel rounded-3xl">
        <div className="w-6 h-6 border-2 border-pacific-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-pacific-400">Loading your health data...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[95%] h-full p-6 glass-panel rounded-3xl relative overflow-hidden flex flex-col transition-all duration-500 bg-white/40 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-white/5 shadow-xl">
      

      <div className="absolute top-0 right-0 w-64 h-64 bg-pacific-400/10 blur-[80px] rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-300/10 blur-[100px] rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-screen" />


      <div className="relative z-10 mb-6 px-2 flex justify-between items-end">
        <div>
          <h2 className="text-lg font-bold text-pacific-700 dark:text-pacific-100 tracking-tight">
            Your Health Visualizer
          </h2>
          <p className="text-xs font-medium text-pacific-500/80 dark:text-pacific-400/80 mt-1">
            Compare scores & symptom factors over time
          </p>
        </div>
      </div>

      {/* Main chart area */}
      <div className="w-full min-h-[400px] relative z-10 flex flex-col">
        

        {hasNoData && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-xl border border-dashed border-pacific-300/30">
            <div className="p-3 bg-pacific-100 dark:bg-pacific-900/50 rounded-full mb-3 text-pacific-500">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-pacific-700 dark:text-pacific-200">You don't have any data yet</h3>
            <p className="text-xs text-pacific-500 mt-1 max-w-[200px]">
              Start logging your daily health metrics to see your correlation trends here.
            </p>
          </div>
        )}

        {/* not enough data for 7day view message  */}
        {hasLowData && (
          <div className="absolute top-4 right-10 left-10 z-0 flex justify-center pointer-events-none">
            <div className="bg-pacific-50/80 dark:bg-pacific-900/40 backdrop-blur-md px-4 py-2 rounded-full border border-pacific-200/50 dark:border-pacific-700/50 shadow-sm flex items-center gap-2">
              <Info className="w-3 h-3 text-pacific-500" />
              <span className="text-[10px] font-medium text-pacific-600 dark:text-pacific-300">
                You don't have enough data for a full week's view yet. Keep charting to get clearer results!
              </span>
            </div>
          </div>
        )}

        {/* Chart */}
        {!hasNoData && (
          <ChartContainer config={chartConfig} className="h-full w-full">
            <LineChart
              data={healthLogData}
              margin={{ top: 2, right: 10, bottom: 20, left: 10 }}
            >
              <CartesianGrid 
                vertical={true} 
                horizontal={false} 
                strokeDasharray="3 3" 
                className="stroke-pacific-900/5 dark:stroke-pacific-100/10" 
              />
              
              <XAxis
                dataKey="dateLabel"
                tickLine={false}
                axisLine={false}
                tickMargin={15}
                className="text-[10px] font-mono font-medium text-pacific-400/70"
                padding={{ left: 10, right: 10 }}
              />
              
              <YAxis domain={[0, 105]} hide />

              <ChartTooltip
                cursor={{ stroke: "rgba(100,100,100,0.2)", strokeWidth: 1 }}
                content={({ active, payload, label }) => {
                  if (!active || !payload || payload.length === 0) return null;
                  const currentData = payload[0].payload;
                  const meds = currentData.rawMedications || [];
                  const symptoms = currentData.rawSymptoms || [];

                  return (
                    <div className="min-w-[180px]rounded-xl border border-white/20 bg-white/80 dark:bg-zinc-900/90 p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl text-xs">
                      <div className="font-bold mb-3 text-pacific-900 dark:text-pacific-100 border-b border-pacific-200/50 dark:border-white/10 pb-2">
                        {label}
                      </div>
                      
                      <div className="space-y-1.5">
                        {payload.map((item: any) => (
                          <div key={item.name} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full ring-2 ring-white dark:ring-black" style={{ backgroundColor: item.color }} />
                              <span className="capitalize text-pacific-600 dark:text-pacific-400 font-medium">{item.name?.toString().replace('_norm', '')}</span>
                            </div>
                            <span className="font-mono font-bold text-pacific-800 dark:text-pacific-200">{Math.round(item.value as number)}</span>
                          </div>
                        ))}
                      </div>

                      {(meds.length > 0 || symptoms.length > 0) && (
                        <div className="border-t border-dashed border-pacific-200/50 dark:border-white/10 pt-2 mt-3 space-y-2">
                          {meds.length > 0 && (
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] uppercase tracking-wider font-bold text-pacific-400">Meds</span>
                              <div className="flex flex-wrap gap-1">
                                  {meds.map((m: any, i: number) => (
                                      <span key={i} className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-200 text-[10px] font-medium border border-blue-100 dark:border-blue-800">
                                          {m.medication.name}
                                      </span>
                                  ))}
                              </div>
                            </div>
                          )}
                          {symptoms.length > 0 && (
                              <div className="flex flex-col gap-1">
                              <span className="text-[9px] uppercase tracking-wider font-bold text-rose-400">Symptoms</span>
                               <div className="flex flex-wrap gap-1">
                                  {symptoms.map((s: any, i: number) => (
                                      <span key={i} className="px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-200 text-[10px] font-medium border border-rose-100 dark:border-rose-800">
                                          {s.symptom.description}
                                      </span>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }}
              />

              {Object.keys(chartConfig).map((key) => (
                 <Line 
                    key={key}
                    dataKey={`${key}_norm`} 
                    type="monotone" 
                    stroke={chartConfig[key as keyof typeof chartConfig].color} 
                    strokeWidth={2.5}
                    strokeOpacity={0.9}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 0, fillOpacity: 1 }}
                    name={key} 
                  />
              ))}


              <ChartLegend 
                content={
                    <ChartLegendContent className="flex-wrap gap-x-4 gap-y-2 pt-6 border-t border-pacific-100 dark:border-white/5" />
                } 
              />
            </LineChart>
          </ChartContainer>
        )}
      </div>
    </div>
  );
};
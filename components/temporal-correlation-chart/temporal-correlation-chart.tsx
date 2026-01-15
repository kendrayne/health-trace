'use client';

import { useState } from "react";
import { DayFrame } from "./day-frame/day-frame";
import { CategoryKey, ColorKey } from "../category-key/category-key";

type ChartEvent = { 
  timestamp: number;
  value?: number;
  type: ColorKey;
}[];

const MOCK_DATA: ChartEvent = [
  { timestamp: 1, value: 1, type: 'mood' },
  { timestamp: 2, value: 6.666, type: 'diet' },
  { timestamp: 3, value: 9.999, type: 'nicotine' },
  { timestamp: 4, value: 3.333, type: 'alcohol' },
  { timestamp: 5, value: 3.333, type: 'alcohol' },
];

export const TemporalCorrelationChart = () => {
  const [selectedRange, setSelectedRange] = useState(7);
  const categories: ColorKey[] = ['diet', 'exercise', 'caffeine', 'sleep', 'symptom', 'nicotine', 'mood', 'alcohol', 'medicine'];

  return (
    <div className="w-full max-w-[80%] aspect-video p-12 bg-linear-to-tl from-pacific-100/40 to-surface-light/80 dark:to-pacific-700/80 dark:from-pacific-600 rounded-xl border border-peach-800/5 dark:border-pacific-800 shadow-sm relative overflow-hidden flex flex-col">
      
      <div className="absolute top-0 right-0 w-32 h-12 bg-mint/10 blur-3xl rounded-l -mr-16 -mt-16 pointer-events-none" />

      {/* legend */}
      <div className="w-full flex flex-wrap justify-end gap-2 mb-8 z-10">
        {categories.map((cat) => (
          <CategoryKey key={cat} category={cat} />
        ))}
      </div>

      {/* chart layout */}
      <div className="flex flex-row flex-1 w-full h-full min-h-0">
        
        {/* yAxis */}
        <div className="flex flex-col-reverse justify-between h-full pr-4 text-pacific-400 dark:text-pacific-500/60 font-mono text-[10px]">
          {[...Array(11)].map((_, i) => (
            <span key={i} className="leading-none">{i}</span>
          ))}
        </div>

        {/* visualization */}
        <div className="relative flex-1 h-full w-full border-l border-b border-surface-light/40 dark:border-surface-dark/40">
          
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
            {[...Array(11)].map((_, i) => (
              <div key={i} className="w-full h-px bg-pacific-500/5 dark:bg-pacific-800/20" />
            ))}
          </div>

          <p className="absolute -left-8 top-1/2 -rotate-90 -translate-y-1/2 text-[9px] font-bold tracking-widest uppercase text-pacific-300/80">
            Severity
          </p>
          <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-widest uppercase text-pacific-300/80">
            Time
          </p>

          <div className="absolute inset-0 flex w-full h-full z-10">
            {[...Array(selectedRange)].map((_, i) => (
              <div key={i} className="flex-1 h-full relative">
                <DayFrame num={i} selectedRange={selectedRange} />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-pacific-400 font-mono">
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
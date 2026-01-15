'use client';

import { useState, useEffect } from "react";
import { DayFrame } from "./day-frame/day-frame";



type ChartEvent = { 
  timestamp: number // maybe 1 - 18 to free up some room opposed to 24hr. ask people when their day starts on onboarding ? just a thought
                    // 
  value?: number, // 0–10 for symptom & mood | 3.333 for diet, nicotine, alcohol, caffeine | 2.5 for exercise
  type:
    | "diet"
    | "exercise"
    | "nicotine"
    | "alcohol"
    | "caffeine"
    | "symptom"
    | "mood"
    | "medicine"

}[]

/*

haven't had to polya in a while

- i need to create mock data for a visualization.
- i will then need to create an svg dot component with different color codes
  props: chartevent, maybe place absolute within day frame, day frame rel, calc where points would go based off of px?
- create day frame component, 5 at a time in grid... or parent:flex-col
- 



*/

const MOCK_DATA: ChartEvent = [
    {
    timestamp: 1,
    value: 1,
    type: 'mood'
    },
    {
    timestamp: 2,
    value: 6.666,
    type: 'diet'
    },
    {
    timestamp: 3,
    value: 9.999,
    type: 'nicotine'
    },
    {
    timestamp: 4,
    value: 3.333,
    type: 'alcohol'
    },
    {
    timestamp: 5,
    value: 3.333,
    type: 'alcohol'
    },
];

export const TemporalCorrelationChart = () => {
    const [selectedRange, setSelectedRange] = useState(7);


  return (
    <div className="w-full max-w-[80%] aspect-video p-10 bg-linear-to-tl from-pacific-100/40 to-surface-light/80 dark:bg-surface-dark/90 rounded-l border border-peach-800/5 dark:border-pacific-800 shadow-sm relative overflow-hidden">

      <div className="absolute top-0 right-0 w-32 h-32 bg-mint/10 blur-3xl rounded-l -mr-16 -mt-16" />

      <div className="relative h-full w-full flex flex-col">

        <div className="flex justify-between items-start mb-6">
          <div className="h-px flex-1 bg-linear-to-r from-pacific-100 to-transparent self-center opacity-50" />
        </div>

        <div className="relative flex-1 border-l border-b border-surface-light/40 dark:border-surface-dark/40">
          

          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[...Array(11)].map((_, i) => (
              <div key={i} className="w-full h-px bg-pacific-500/10 dark:bg-pacific-800/30" />
            ))}
          </div>

            <div className="">

          <p className="absolute -left-14 top-1/2 -rotate-90 origin-center text-[10px] font-medium tracking-widest uppercase text-pacific-400 dark:text-pacific-200">
            Severity
          </p>
          <div className="flex flex-col">
            {[...Array(10)].map((_, i) => (
                <p>o{i.toString().slice(0)}</p>
            ))}
          </div>
            </div>

          <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-medium tracking-widest uppercase text-pacific-400 dark:text-pacific-200">
            Time
          </p>


            <div className="absolute inset-px bg-linear-to-t from-neutral-100/40 to-surface-light/80 border-pacific-800/5 border-2 dark:from-pacific-800/60 dark:to-transparent">
            <div className="absolute inset-px bg-linear-to-t from-neutral-100/40 to-surface-light/80 border-pacific-800/5 border-2 dark:from-pacific-800/60 dark:to-transparent">
            <div className="flex w-full h-full">
                {[...Array(selectedRange)].map((_, i) => (
                <DayFrame key={i} num={i}selectedRange={selectedRange} />
                ))}
            </div>
            </div>

            </div>
        </div>
      </div>
    </div>
  );
};
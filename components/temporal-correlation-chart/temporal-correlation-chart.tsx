import { timeStamp } from "console"

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


    return (
        // chart container
        <div className="max-w-5xl w-5xl bg-pacific-300 dark:pacific-800/90 relative pt-20 h-full">
            {/* 
            structure
            _________________________
            |                        |   
            |                        |   
            |                        |   
            |                        |   
            |                        |   
            |                        |   
            |                        |   
            |                        |   
            |____|____|____|____|____|
            */}
            <div className="">

            </div>
            <p className="absolute left-0 bottom-0">Severity</p>
            <p className="absolute left-0 bottom-0">Time</p>


        </div>
    )
};
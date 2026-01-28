'use client';
import { DataPoint } from './data-point/data-point'

interface Symptom {
  id: string;
  description: string;
  slug: string | null;
  bodyPartId: string;
  createdAt: string;
}

interface LoggedSymptomItem {
  id: string;
  healthLogId: string;
  symptomId: string;
  userId: string;
  severity: number;
  occurredAt: string;
  symptom: Symptom;
}

interface Medication {
  id: string;
  name: string;
  unit: string | null;
  defaultStrength: number | null;
  userId: string;
}

interface LoggedMedicationItem {
  id: string;
  healthLogId: string;
  medicationId: string;
  strengthTaken: number | null;
  takenAt: string;
  medication: Medication;
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
    date: string
}

interface DayFrameProps {
  selectedRange: number;
  num: number;
  userHealthLogData: HealthLogData

}



export const DayFrame = ({ selectedRange, num, userHealthLogData }: DayFrameProps) => {
  
 

  if (!userHealthLogData) {
    return (
      <div className="flex-1 h-full bg-purple-50/40 border-b border-r last:border-r-0 flex items-center justify-center">
        <span className="text-[10px] opacity-50">No health logs have been created yet!</span>
      </div>
    );
  }

   const { 
alcohol,
caffeine,
nicotine,
marijuana,
dietQuality,
exercise,
mood,
sleep,
water,
date,
loggedMedications,
loggedSymptoms
  } = userHealthLogData;

// make it look clickable
// once clicked, display tooltip that says descriptions of the symptoms that were tracked.

   return loggedSymptoms.length ? (
      <div className="flex-1 h-full bg-red-300/40 overflow-hidden border-b border-r last:border-r-0 relative">
        {/* i want to create something better than just a red bg for noting a symptom was tracked tht day. something less
        aggressive, but still should be the first thing a user notices. maybe block out a certain section horizontally to
        indicate hey, you should look at your habits within the last 6 hours.. or something, not sure yet. */}
      <DataPoint categoryName={"dietQuality"} categoryData={dietQuality}/>
      <DataPoint categoryName={"alcohol"} categoryData={alcohol}/>
      <DataPoint categoryName={"caffeine"} categoryData={caffeine}/>
      <DataPoint categoryName={"nicotine"} categoryData={nicotine}/>
      <DataPoint categoryName={"marijuana"} categoryData={marijuana}/>
      <DataPoint categoryName={"exercise"} categoryData={exercise}/>
      <DataPoint categoryName={"mood"} categoryData={mood}/>
      <DataPoint categoryName={"sleep"} categoryData={sleep}/>
      <DataPoint categoryName={"water"} categoryData={water}/>
      </div>
    ) :  (
    <div className="flex-1 h-full bg-purple-50/40 overflow-hidden border-b border-r last:border-r-0 relative">

      <DataPoint categoryName={"dietQuality"} categoryData={dietQuality}/>
      <DataPoint categoryName={"alcohol"} categoryData={alcohol}/>
      <DataPoint categoryName={"caffeine"} categoryData={caffeine}/>
      <DataPoint categoryName={"nicotine"} categoryData={nicotine}/>
      <DataPoint categoryName={"marijuana"} categoryData={marijuana}/>
      <DataPoint categoryName={"exercise"} categoryData={exercise}/>
      <DataPoint categoryName={"mood"} categoryData={mood}/>
      <DataPoint categoryName={"sleep"} categoryData={sleep}/>
      <DataPoint categoryName={"water"} categoryData={water}/>
      </div>
   
  );
};

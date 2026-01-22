'use client';

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
interface DayFrameProps {
  selectedRange: number;
  num: number;
  userHealthLogData: HealthLogData

}

export const DayFrame = ({ selectedRange, num, userHealthLogData }: DayFrameProps) => {

 

  if (!userHealthLogData) {
    return (
      <div className="flex-1 h-full bg-purple-50/40 border-b border-r last:border-r-0 flex items-center justify-center">
        <span className="text-[10px] opacity-50">-</span>
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
loggedMedications,
loggedSymptoms
  } = userHealthLogData;
  console.log(loggedSymptoms + "hi")
  return (
    <div className="flex-1 h-full bg-purple-50/40 overflow-hidden border-b border-r last:border-r-0">
      {/* <p>{num} day</p> */}
      <p>{alcohol} alcohol</p>
      <p>{caffeine} caffeine</p>
      <p>{nicotine} nicotine</p>
      <p>{marijuana} marijuana</p>
      <p>{dietQuality} diet quality</p>
      <p>{exercise} exercise</p>
      <p>{mood} mood </p>
      <p>{sleep} sleep</p>
   
    </div>
  );
};

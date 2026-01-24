// 'use client';
// import { DataPoint } from './data-point/data-point'

// interface Symptom {
//   id: string;
//   description: string;
//   slug: string | null;
//   bodyPartId: string;
//   createdAt: string;
// }

// interface LoggedSymptomItem {
//   id: string;
//   healthLogId: string;
//   symptomId: string;
//   userId: string;
//   severity: number;
//   occurredAt: string;
//   symptom: Symptom;
// }

// interface Medication {
//   id: string;
//   name: string;
//   unit: string | null;
//   defaultStrength: number | null;
//   userId: string;
// }

// interface LoggedMedicationItem {
//   id: string;
//   healthLogId: string;
//   medicationId: string;
//   strengthTaken: number | null;
//   takenAt: string;
//   medication: Medication;
// }

// interface HealthLogData {
//   id: string;
//   dietQuality: number;
//   exercise: number;
//   nicotine: number;
//   alcohol: number;
//   caffeine: number;
//   marijuana: number;
//   sleep: number;
//   mood: number;
//   water: number;
//   userId: string;
//   loggedSymptoms: LoggedSymptomItem[];
//   loggedMedications: LoggedMedicationItem[];
// }

// interface DayFrameProps {
//   selectedRange: number;
//   num: number;
//   userHealthLogData: HealthLogData

// }


// /*
// category === 'diet' ? (<div className='w-3 h-3 rounded-full bg-chart-diet shadow-sm '/>) : 
//         category === 'exercise' ? <div className='w-2 h-2 rounded-full  shadow-sm bg-chart-exercise'/> :
//         category === 'nicotine' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-nicotine'/> :
//         category === 'marijuana' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-marijuana'/> :
//         category === 'alcohol' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-alcohol'/> :
//         category === 'caffeine' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-caffeine'/> :
//         category === 'symptom' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-symptom'/> :
//         category === 'mood' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-mood'/> :
//         category === 'medicine' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-medicine-light dark:bg-chart-medicine-dark'/> :
//         category === 'sleep' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-sleep'/> : null
// */

// export const DayFrame = ({ selectedRange, num, userHealthLogData }: DayFrameProps) => {

// // if i wanted to switch back to a creating a custom chart, but going with shadcn for now.
  
 

//   if (!userHealthLogData) {
//     return (
//       <div className="flex-1 h-full bg-purple-50/40 border-b border-r last:border-r-0 flex items-center justify-center">
//         <span className="text-[10px] opacity-50">No health logs have been created yet!</span>
//       </div>
//     );
//   }

//    const { 
// alcohol,
// caffeine,
// nicotine,
// marijuana,
// dietQuality,
// exercise,
// mood,
// sleep,
// water,
// loggedMedications,
// loggedSymptoms
//   } = userHealthLogData;
//   console.log(userHealthLogData)
//   return (
//     <div className="flex-1 h-full bg-purple-50/40 overflow-hidden border-b border-r last:border-r-0 relative">

//       <DataPoint categoryName={"dietQuality"} categoryData={dietQuality}/>
//       <DataPoint categoryName={"alcohol"} categoryData={alcohol}/>
//       <DataPoint categoryName={"caffeine"} categoryData={caffeine}/>
//       <DataPoint categoryName={"nicotine"} categoryData={nicotine}/>
//       <DataPoint categoryName={"marijuana"} categoryData={marijuana}/>
//       <DataPoint categoryName={"exercise"} categoryData={exercise}/>
//       <DataPoint categoryName={"mood"} categoryData={mood}/>
//       <DataPoint categoryName={"sleep"} categoryData={sleep}/>
//       <DataPoint categoryName={"water"} categoryData={water}/>

//       {loggedMedications.map(med => (
//         <DataPoint categoryName={"medication"}categoryData={med?.medication?.name}/>
//       )        
//       )}
//       {loggedSymptoms.map(sym => (
//         <DataPoint categoryName={"symptom"} categoryData={sym.symptom.description}/>
//       )        
//       )}

   
//     </div>
//   );
// };

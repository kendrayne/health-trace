'use client';

export type ColorKey = 
  | "diet" 
  | "exercise" 
  | "nicotine" 
  | "alcohol" 
  | "caffeine" 
  | "symptom" 
  | "mood" 
  | "medicine" 
  | "sleep";

interface ColorCodeProps {
  category: ColorKey;
}

export const CategoryKey = ({ category }: ColorCodeProps) => {
 
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-light/50 dark:bg-surface-dark/50 border border-pacific-500/10 dark:border-pacific-400/10 backdrop-blur-sm">
        {

        category === 'diet' ? (<div className='w-3 h-3 rounded-full bg-chart-diet shadow-sm '/>) : 
        category === 'exercise' ? <div className='w-2 h-2 rounded-full  shadow-sm bg-chart-exercise'/> :
        category === 'nicotine' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-nicotine'/> :
        category === 'alcohol' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-alcohol'/> :
        category === 'caffeine' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-caffeine'/> :
        category === 'symptom' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-symptom'/> :
        category === 'mood' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-mood'/> :
        category === 'medicine' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-medicine-light dark:bg-chart-medicine-dark'/> :
        category === 'sleep' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-sleep'/> : null
        }
      
      
      
      
      
      
      
      <div className='w-2 h-2 rounded-full shadow-sm'/>
      <span className="text-[10px] font-medium uppercase tracking-wide text-pacific-500 dark:text-pacific-300">
        {category}
      </span>
    </div>
  );
};

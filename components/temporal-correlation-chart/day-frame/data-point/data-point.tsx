import { useEffect } from "react"




export const DataPoint = ({categoryName, categoryData}) => {

// if i wanted to switch back to a creating a custom chart, but going with shadcn for now.
    const getPosition = () => {

        switch (categoryName) {
           case "dietQuality": {
            return `${3.3333333333 * categoryData}%`
            }
            case "exercise": {
                return `${2.5 * categoryData}%`
            }
            case "nicotine": {
                return `${2.5 * categoryData}%`
            }
            case "marijuana": {
                return `${2.5 * categoryData}%`
            }
            case "alcohol": {
                return `${2.5 * categoryData}%`
            }
            case "caffeine": {
                return `${2.5 * categoryData}%`
            }
            case "symptom": {
                return `${categoryData}%`
            }
            
            case "mood": {
                return `${2 * categoryData}%`
            }
            
            case "sleep": {
                return `${.714285714285714 * categoryData}%`
            }
            case "water": {
                return `${categoryData}%`
            }

            default: null;
        }

    }
    let position = getPosition();

 
    return (

        <div className="w-full flex h-full relative">


        {
        categoryName === 'dietQuality' ? (<div className='w-3 h-3 rounded-full bg-chart-diet shadow-sm absolute' style={{bottom: `${getPosition()}`}}/>) : 
        categoryName === 'exercise' ? <div className='w-2 h-2 rounded-full  shadow-sm bg-chart-exercise absolute' style={{bottom: `${getPosition()}`}}/> :
        categoryName === 'nicotine' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-nicotine absolute' style={{bottom: `${getPosition()}`}}/> :
        categoryName === 'marijuana' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-marijuana' style={{bottom: `${getPosition()}`}}/> :
        categoryName === 'alcohol' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-alcohol' style={{bottom: `${position}`}}/> :
        categoryName === 'caffeine' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-caffeine' style={{bottom: `${position}`}}/> :
        categoryName === 'symptom' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-symptom' style={{bottom: `${position}`}}/> :
        categoryName === 'mood' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-mood' style={{bottom: `${position}`}}/> :
        categoryName === 'medicine' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-medicine-light dark:bg-chart-medicine-dark' style={{bottom: `${position}`}}/> :
        categoryName === 'sleep' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-sleep' style={{bottom: `${position}`}}/> : 
        categoryName === 'water' ? <div className='w-2 h-2 rounded-full shadow-sm bg-chart-water' style={{bottom: `${position}`}}/> : null
        }
        </div>
    )



}
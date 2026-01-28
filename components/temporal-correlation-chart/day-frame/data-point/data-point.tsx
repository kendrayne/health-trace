import { useEffect } from "react"




export const DataPoint = ({categoryName, categoryData}) => {

    const getPosition = () => {
        switch (categoryName) {
            case "dietQuality": {
               console.log(categoryName)
               return `${33.3333333333 * categoryData}em`
            }
            case "exercise": {
                console.log(categoryName)
                return `${25 * categoryData}em`
            }
            case "nicotine": {
                console.log(categoryName)
                return `${25 * categoryData}em`
            }
            case "marijuana": {
                console.log(categoryName)
                return `${25 * categoryData}em`
            }
            case "alcohol": {
                console.log(categoryName)
                return `25px`
            }
            case "caffeine": {

                return `${25 * categoryData}%`
            }
            case "symptom": {
                console.log(categoryName)
                return `${categoryData}%`
            }
            
            case "mood": {
                console.log(categoryName)
                console.log("mood: " + 2 * categoryData)
                return `${22 * categoryData}%`
            }
            
            case "sleep": {
                console.log(categoryName)
                console.log("sleep: " + .714285714285714 * categoryData)
                return `${7.14285714285714 * categoryData}%`
            }
            case "water": {
                console.log(categoryName)
                return `${categoryData}%`
            }
            
            default: null;

        }

    }
    let position = getPosition();

 
    return (
<>

        {
            categoryName === 'dietQuality' ? (<div className='w-3 h-3 rounded-full bg-chart-diet shadow-sm absolute' style={{bottom: `${getPosition()}`}}/>) : 
            categoryName === 'exercise' ? (<div className='w-2 h-2 rounded-full  shadow-sm bg-chart-exercise absolute' style={{bottom: `${getPosition()}`}}/>) :
            categoryName === 'nicotine' ? (<div className='w-2 h-2 rounded-full shadow-sm bg-chart-nicotine absolute' style={{bottom: `${getPosition()}`}}/>) :
            categoryName === 'marijuana' ? (<div className='w-2 h-2 rounded-full shadow-sm bg-chart-marijuana absolute' style={{bottom: `${getPosition()}`}}/>) :
            categoryName === 'alcohol' ? (<div className='w-2 h-2 rounded-full shadow-sm bg-chart-alcohol absolute' style={{bottom: `${getPosition()}`}}/>) :
            categoryName === 'caffeine' ? (<div className='w-2 h-2 rounded-full shadow-sm bg-chart-caffeine absolute' style={{bottom: `${getPosition()}`}}/>) :
            categoryName === 'symptom' ? (<div className='w-2 h-2 rounded-full shadow-sm bg-chart-symptom absolute' style={{bottom: `${getPosition()}`}}/>) :
            categoryName === 'mood' ? (<div className='w-2 h-2 rounded-full shadow-sm bg-chart-mood absolute' style={{bottom: `${getPosition()}`}}/>) :
            categoryName === 'medicine' ? (<div className='w-2 h-2 rounded-full shadow-sm bg-chart-medicine dark:bg-chart-medicine absolute' style={{bottom: `${getPosition()}`}}/>) :
            categoryName === 'sleep' ? (<div className='w-2 h-2 rounded-full shadow-sm bg-chart-sleep absolute' style={{bottom: `${getPosition()}`}}/>) : 
            categoryName === 'water' ? (<div className='w-2 h-2 rounded-full shadow-sm bg-chart-water absolute' style={{bottom: `${getPosition()}`}}/> ): null
        }
        </>

    )



}
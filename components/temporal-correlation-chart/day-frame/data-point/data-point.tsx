import { useEffect } from "react"




export const DataPoint = ({categoryName, categoryData}) => {

    const getPosition = () => {
        switch (categoryName) {
            case "dietQuality": {
               if (categoryData === 0) return '0em'
               return `${3.3333333333 * categoryData}em`
            }
            case "exercise": {

                return `${25 * categoryData}em`
            }
            case "nicotine": {

                return `${25 * categoryData}em`
            }
            case "marijuana": {

                return `${25 * categoryData}em`
            }
            case "alcohol": {

                return `25px`
            }
            case "caffeine": {

                return `${25 * categoryData}%`
            }
            case "symptom": {

                return `${categoryData}%`
            }
            
            case "mood": {


                return `${22 * categoryData}%`
            }
            
            case "sleep": {


                return `${7.14285714285714 * categoryData}%`
            }
            case "water": {

                return `${categoryData}%`
            }
            
            default: null;

        }

    }
    let position = getPosition();

 
    return (
<>
{/* im going to need to let user's add an estimated time for each variable, optional, but helpful. */}

        {
            categoryName === 'dietQuality' ? (<div className='w-3 h-3 rounded-full bg-chart-diet shadow-sm absolute' onMouseOver={(e) => console.log(e.target)} onMouseEnter={() => this.children[0].style.display = 'block'} style={{bottom: `${getPosition()}`}}/>) : 
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
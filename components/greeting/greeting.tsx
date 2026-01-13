'use client';
import { useSession } from "next-auth/react";
export const Greeting = () => {
    const {data: session} = useSession();
    const user = session?.user;
     const getTimeOfDay = () => {
     const timestamp: number = Date.now();
     const date: Date = new Date(timestamp);
     const hour = date.getHours()     

     if (hour < 12 && hour > 3) return 'morning, ' + user?.name?.split(' ')[0] +  '! ☀️' ;
     if (hour < 17 && hour >= 12) return 'afternoon, ' + user?.name?.split(' ')[0] + '! 🌤️';
     else return 'evening, ' + user?.name?.split(' ')[0] + ' ! 🌅';

  }

    return (
        <h1 className="text-2xl text-pacific-300 dark:pacific-100 px-32">{`Good ${getTimeOfDay()}`}</h1> 
    )

}
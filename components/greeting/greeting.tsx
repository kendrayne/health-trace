'use client';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const Greeting = () => {
    const [loaded, setLoaded] = useState(false);

    const {data: session} = useSession();
    const user = session?.user;

     const getTimeOfDay = () => {
     const timestamp: number = Date.now();
     const date: Date = new Date(timestamp);
     const hour = date.getHours()     

     if (hour < 12 && hour > 3) return 'morning, ' + user?.name?.split(' ')[0] +  '! ☀️' ;
     if (hour < 17 && hour >= 12) return 'afternoon, ' + user?.name?.split(' ')[0] + '! 🌤️';
     else return 'evening, ' + user?.name?.split(' ')[0] + ' ! 🌙';
  }

  useEffect(() => {
    if (user) return setLoaded(true)
        else return;
  }, [user])
return ( 
  loaded ? (
        <h1 className="text-2xl absolute left-0 top-5 text-pacific-500 dark:pacific-100 px-18 transition-all opacity-100 duration-1000 translate-y-6 dark:text-white/80">{`Good ${getTimeOfDay()}`}</h1> 
    ) : (<h1 className="text-2xl absolute left-0  text-pacific-300 dark:pacific-100 px-18 transition-all opacity-0 -top-1.25"></h1> )
)

}
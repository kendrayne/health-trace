'use client';
import { useEffect, useState } from "react";
import { type Session } from "next-auth";

interface UserProps {
  user: Session["user"];
}

export const Greeting = ({user}: UserProps) => {
    const [loaded, setLoaded] = useState(false);


    const name = user?.name?.split(' ')[0];

     const getTimeOfDay = () => {
     const timestamp: number = Date.now();
     const date: Date = new Date(timestamp);
     const hour = date.getHours()     

     if (hour < 12 && hour > 3) return 'morning, ' + name +  '! ☀️' ;
     if (hour < 17 && hour >= 12) return 'afternoon, ' + name + '! 🌤️';
     else return 'evening, ' + name + '! 🌙';
  }

  useEffect(() => {
    if (user) return setLoaded(true)
        else return;
  }, [user])
return ( 
  loaded ? (
        <h1 className="text-2xl text-pacific-500 dark:pacific-100 px-18 transition-all opacity-100 duration-1000 translate-y-6 dark:text-white/80">{`Good ${getTimeOfDay()}`}</h1> 
    ) : (<h1 className="text-2xl text-pacific-300 dark:pacific-100 px-18 transition-all opacity-0 -top-1.25"></h1> )
)

}
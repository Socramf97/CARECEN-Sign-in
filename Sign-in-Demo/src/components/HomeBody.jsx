import { useState } from "react";
import { Link } from 'react-router-dom'
import { classNames } from '../utilities/classNames.js'

const navigation = [
  { name: 'Staff Check-in', href: '/staff-checkin', current: false },
  { name: 'Guests', href: '/guests', current: false },
  { name: 'Staff List', href: '/staff-list', current: true }
]


function HomeBody(){
    
    return (
      <main className="mx-auto max-w-6xl w-full p-6 flex flex-col gap-8">
        <div className=" h-10"></div>
            <div className="flex flex-row gap-20 p-10">
                {navigation.map((item) => (
                    <Link key={item.name} to={item.href} className= "flex-1 text-3xl items-center content-center gap-20 h-75 w-120 bg-neutral-500 transition-transform duration-200 hover:scale-105 font-semibold  text-black">
                        {item.name}
                    </Link>
                ))}
            </div>
      </main>
    )
  };
    export  {HomeBody};

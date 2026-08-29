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
      <main className="mx-auto max-w-6xl w-full h-full px-8 py-2 md:p-6 flex flex-col gap-3 md:gap-10">
        <div className="p-2"></div>
            <div className="Links-container flex flex-1 flex-col min-h-0 gap-10 md:flex-row md:gap-20 md:p-10">
                {navigation.map((item) => (
                    <Link key={item.name} to={item.href} className= "flex flex-1 aspect-square p-5 text-xl md:text-3xl items-center justify-center gap-10 bg-neutral-500 transition-transform duration-200 hover:scale-105 font-semibold  text-black">
                        {item.name}
                    </Link>
                ))}
            </div>
      </main>
    )
  };
    export  {HomeBody};

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
      <main className="mx-auto max-w-3xs md:max-w-2xl lg:max-w-6xl w-full h-full px-8 py-2 md:p-6 gap-3 md:gap-10">
        <div className="p-5"></div>
            <div className="Links-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 md:gap-20 md:p-10 ">
                {navigation.map((item) => (
                    <Link key={item.name} to={item.href} className= "flex h-40 sm:44 md:h-48 lg:h-56 aspect-square p-3 text-xl md:text-3xl items-center justify-center gap-10 bg-neutral-500 transition-transform duration-200 hover:scale-105 font-semibold  text-black rounded-lg">
                        {item.name}
                    </Link>
                ))}
            </div>
      </main>
    )
  };
    export  {HomeBody};

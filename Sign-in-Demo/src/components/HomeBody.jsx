import { useState } from "react";
import { Link } from 'react-router-dom'
import { classNames } from '../utilities/classNames.js'

const navigation = [
  { name: 'Staff', href: '/staff', current: true },
  { name: 'Guests', href: '/guests', current: false },
  { name: 'Calendar', href: '#', current: false },
]


function HomeBody(){
    
    return (
      <main className="mx-auto max-w-6xl w-full p-6 flex flex-col gap-8">
            <div className="flex flex-row gap-20 p-10">
                {navigation.map((item) => (
                <div className="flex-1 text-3xl items-center content-center gap-20 h-90 w-90 bg-neutral-200 ">
                    <Link key={item.name} to={item.href} className= "font-semibold text-black">
                        {item.name}
                    </Link>
                </div>
                ))}
            </div>
      </main>
    )
  };
    export  {HomeBody};

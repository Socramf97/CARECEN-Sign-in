import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import { classNames } from '../utilities/classNames'
import logo from '../photos/Picture1.png'
import { supabase } from "../../db/db.js";
import { useAuth } from '../context/AuthSession.jsx'
import { useState } from 'react'

const navigation = [
    { name: 'Staff Check-in', href: '/staff-checkin', current: false },
    { name: 'Guests', href: '/guests', current: false },
    { name: 'Staff List', href: '/staff-list', current: true },
]


async function handleGoogleLogin() { 

    const {data, error} = await supabase.auth.signInWithOAuth({provider: 'google',  options: { redirectTo: window.location.origin }});
    if (error) {
        console.error("Error authorizing user:", error);
        return;
    };
};

async function handleSignOut() { 

    const {data, error} = await supabase.auth.signOut();
    if (error) {
        console.error("Error logging out user:", error);
        return;
    };
};


function Navbar(){
    const {session} = useAuth()
    const location = useLocation()
    const hideLinks = ['/', '/home'] 
    const showLinks = !hideLinks.includes(location.pathname)

  return (
    <div className="navbar-container ">
      <header className="max-w-full">
        <nav className="flex items-center justify-between px-2 py-3 md:px-8 ">
            <div className="flex flex-1 px-3"> 
                <Link to="/">
                    <img src={logo} alt="organization-logo" className="h-15 w-auto;" />
                </Link>
            </div>
            { showLinks && (
            <div className="flex justify-between gap-5 md:gap-20">
                {navigation.map((item) => (
                <Link key={item.name} to={item.href} className= "text-xs md:text-lg font-semibold text-white">
                    {item.name}
                </Link>
                ))}
            </div>
            )}
            <div className="flex flex-1 justify-end">
                    {session ? (
                    <button type='button' className="text-xs md:text-lg font-semibold text-white hover:text-neutral-300 bg-neutral-600 p-1 transition-transform duration-200 hover:scale-105"
                    onClick={() => handleSignOut()}> Log out </button>
                    ):(<button type='button' className="text-xs md:text-lg font-semibold text-white hover:text-neutral-300 bg-neutral-600 p-1 transition-transform duration-200 hover:scale-105"
                    onClick={() => handleGoogleLogin()}> Log in <span aria-hidden="true">&rarr;</span></button>)}
            </div>
        </nav>
      </header>
    </div>
  );
};
export  {Navbar};
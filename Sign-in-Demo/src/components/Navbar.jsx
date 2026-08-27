import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import { classNames } from '../utilities/classNames'
import logo from '../photos/Picture1.png'
import { supabase } from "../../db/db.js";
import { useAuth } from '../context/AuthSession.jsx'

const navigation = [
  { name: 'Staff', href: '/staff', current: true },
  { name: 'Guests', href: '/guests', current: false },
  { name: 'Calendar', href: '#', current: false },
]

async function handleGoogleLogin() { 

    const {data, error} = await supabase.auth.signInWithOAuth({provider: 'google'});
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
    <div className="">
      <header className="py-2 px-5">
        <nav className="flex items-center justify-between p-3 ">
        <div className="flex flex-1 px-3"> 
            <Link to="/home">
                <img src={logo} alt="organization-logo" className="h-15 w-auto" />
            </Link>
        </div>
        { showLinks && (
          <div className="flex justify-between gap-20">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className= "font-semibold text-white">
                {item.name}
              </Link>
            ))}
          </div>
          )}
          <div className="flex flex-1 justify-end">
                {session ? (
                <button type='button' className="text-sm/6 font-semibold text-white"
                 onClick={() => handleSignOut()}> Log out </button>
                ):(<button type='button' className="text-sm/6 font-semibold text-white"
                 onClick={() => handleGoogleLogin()}> Log in <span aria-hidden="true">&rarr;</span></button>)}
          </div>
        </nav>
      </header>
    </div>
  );
};
export  {Navbar};
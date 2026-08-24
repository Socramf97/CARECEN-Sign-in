import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { classNames } from '../utilities/classNames'
import logo from '../photos/Picture1.png'

const navigation = [
  { name: 'Staff', href: '/staff', current: true },
  { name: 'Guests', href: '/guests', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function Navbar(){
  return (
    <div className="">
      <header className="py-2 px-5">
        <nav className="flex items-center justify-between p-3 ">
        <div className="flex flex-1 px-3"> 
            <img src={logo} alt="organization-logo" className="h-15 w-auto" />
        </div>
          <div className="flex justify-between gap-20">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className= "font-semibold text-white">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-1 justify-end">
            <a href="#" className="text-sm/6 font-semibold text-white">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>
    </div>
  )
}
export  {Navbar};
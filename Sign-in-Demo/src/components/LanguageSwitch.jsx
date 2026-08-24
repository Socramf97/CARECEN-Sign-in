import { Switch } from '@headlessui/react'

function LanguageSwitch({ isSpanish, onChange }) {
  return (
    <div className='flex items-center gap-x-6'>
        <div className={`text-xl font-semibold ${isSpanish ? 'text-white/50' : 'text-white'}`}>
        English
        </div>
        <Switch
        checked={isSpanish}
        onChange={onChange}
        className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 ease-in-out focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white"
        >
        <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out "
        />
        </Switch>
        <div className={`text-xl font-semibold ${isSpanish ? 'text-white' : 'text-white/50'}`}>
        Español
        </div>
    </div>
  )
}

export {LanguageSwitch}
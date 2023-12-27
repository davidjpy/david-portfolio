import { useContext, useEffect, useRef } from 'react'

import { AppContext } from '@/context/appContext'
import SunIcon from '@/components/nav/SunIcon'
import MoonIcon from '@/components/nav/MoonIcon'

import '@/components/nav/NavBar.css'

interface Props {
    handleToggleShouldShowDarkMode: () => void
}

export default function Navbar({ handleToggleShouldShowDarkMode }: Props) {
    const appState = useContext(AppContext)
    const navRef = useRef<HTMLElement>(null)

    const navTabs = ['Home', 'About Me', 'Works', 'Contact']

    return (
        <nav ref={navRef} className='pointer-events-none fixed flex h-[80px] w-full items-center pl-16 pr-16'>
            <ul className='ml-auto flex'>
                {navTabs.map((item) => {
                    return (
                        <li key={item} className='ml-4 mr-4 text-[1.1rem] font-medium text-secondary'>
                            {item}
                        </li>
                    )
                })}
            </ul>
            <span className='pl-8 pr-8'>
                <input
                    type='checkbox'
                    id='darkmode-switch'
                    className='hidden h-0 w-0'
                    defaultChecked={appState?.shouldShowDarkMode}
                    onChange={() => handleToggleShouldShowDarkMode()}
                />
                <label htmlFor='darkmode-switch' className='switch-button'>
                    <SunIcon />
                    <MoonIcon />
                </label>
            </span>
        </nav>
    )
}

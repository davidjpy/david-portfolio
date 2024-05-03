import { useEffect, useState } from 'react'
import { dayTimeThreshold } from '@/utilities/constants'

export const useTheme = (): [number, (level: number) => void, boolean] => {
    const userSelectedTheme = localStorage.getItem('theme')
    const isUserSelectedState = userSelectedTheme === 'light' || userSelectedTheme === 'dark'
    const isUserSystemLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
    const initialShouldShowLightModeState = isUserSelectedState ? userSelectedTheme === 'light' : isUserSystemLightMode

    const [brightness, SetBrightness] = useState<number>(initialShouldShowLightModeState ? 100 : 0)
    const isLightMode = brightness >= dayTimeThreshold

    const handleSetupTheme = () => {
        if (isLightMode) {
            document.documentElement.setAttribute('theme', 'light')
            localStorage.setItem('theme', 'light')
        } else {
            document.documentElement.setAttribute('theme', 'dark')
            localStorage.setItem('theme', 'dark')
        }
    }

    const handleSetBrightness = (level: number): void => {
        SetBrightness(level)
    }

    useEffect(() => {
        handleSetupTheme()
    }, [isLightMode])

    return [brightness, handleSetBrightness, isLightMode]
}

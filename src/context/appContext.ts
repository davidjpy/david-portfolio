import { createContext } from 'react'

export interface AppContextState {
    brightness: number
    handleSetBrightness: (value: number) => void
    isLightMode: boolean
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    isStarted: boolean
    setIsStarted: React.Dispatch<React.SetStateAction<boolean>>
    isMobile: boolean
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext<AppContextState>({
    brightness: 100,
    handleSetBrightness: () => {},
    isLightMode: true,
    isLoading: true,
    setIsLoading: () => {},
    isStarted: false,
    setIsStarted: () => {},
    isMobile: false,
    setIsMobile: () => {}
})

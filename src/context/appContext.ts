import { createContext } from 'react'

export interface AppContextState {
    brightness: number
    handleSetBrightness: (value: number) => void
    isLightMode: boolean
}

export const AppContext = createContext<AppContextState>({
    brightness: 100,
    handleSetBrightness: () => {},
    isLightMode: true
})

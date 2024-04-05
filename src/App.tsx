import { useState } from 'react'

import { AppContext } from '@/context/appContext'
import { useTheme } from '@/src/hooks/useTheme'
import Experience from '@/experience/Experience'
import LoadingScreen from '@/src/experience/scene/LoadingScreen'

function App() {
    const [isStarted, setIsStarted] = useState(false)
    const [brightness, handleSetBrightness, isLightMode] = useTheme()

    return (
        <main className='font-inter'>
            <AppContext.Provider
                value={{
                    brightness: brightness,
                    handleSetBrightness: handleSetBrightness,
                    isLightMode: isLightMode,
                    isStarted: isStarted,
                    setIsStarted: setIsStarted
                }}
            >
                <Experience />
                <LoadingScreen />
            </AppContext.Provider>
        </main>
    )
}

export default App

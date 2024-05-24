import { useState } from 'react'

import { AppContext } from '@/context/appContext'
import { useTheme } from '@/src/hooks/useTheme'
import { Experience } from '@/experience/Experience'
import { LoadingScreen } from '@/src/experience/scene/LoadingScreen'
import { HtmlContent } from '@/src/experience/htmls/HtmlContent'
import { ControlPanel } from '@/src/experience/htmls/ControlPanel'

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [isStarted, setIsStarted] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [brightness, handleSetBrightness, isLightMode] = useTheme()

    return (
        <main>
            <AppContext.Provider
                value={{
                    brightness: brightness,
                    handleSetBrightness: handleSetBrightness,
                    isLightMode: isLightMode,
                    isLoading: isLoading,
                    setIsLoading: setIsLoading,
                    isStarted: isStarted,
                    setIsStarted: setIsStarted,
                    isMobile: isMobile,
                    setIsMobile: setIsMobile
                }}
            >
                <LoadingScreen />
                {isStarted && (
                    <>
                        <ControlPanel />
                        <HtmlContent />
                    </>
                )}
                <Experience />
            </AppContext.Provider>
        </main>
    )
}

export default App

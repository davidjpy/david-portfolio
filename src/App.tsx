import { Suspense } from 'react'

import { AppContext } from '@/context/appContext'
import { useTheme } from '@/src/hooks/useTheme'
import Experience from '@/experience/Experience'
import LoadingScreen from '@/src/experience/scene/LoadingScreen'

function App() {
    const [brightness, handleSetBrightness, isLightMode] = useTheme()

    return (
        <main className='font-inter'>
            <AppContext.Provider
                value={{
                    brightness: brightness,
                    handleSetBrightness: handleSetBrightness,
                    isLightMode: isLightMode
                }}
            >
                <Suspense fallback={null}>
                    <Experience />
                </Suspense>
                <LoadingScreen />
            </AppContext.Provider>
        </main>
    )
}

export default App

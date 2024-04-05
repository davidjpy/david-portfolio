import { useContext } from 'react'
import { useProgress } from '@react-three/drei'

import { AppContext } from '@/src/context/appContext'
import LighthouseLoadingSvg from '@/assets/svgs/lighthouse_loading.svg'

export default function LoadingScreen() {
    const totalItems = 14
    const loadedItems = useProgress((state) => state.loaded)
    const isLoaded = loadedItems === totalItems
    const { isStarted, setIsStarted } = useContext(AppContext)

    return (
        <section
            className='fixed flex h-screen w-screen flex-col items-center justify-center bg-primary transition-opacity duration-500 ease-linear'
            style={{ opacity: isStarted ? 0 : 1, pointerEvents: isStarted ? 'none' : 'all' }}
        >
            <figure className='h-[200px]'>
                <object type='image/svg+xml' data={LighthouseLoadingSvg} className='w-[400px]'>
                    <img src={LighthouseLoadingSvg} />
                </object>
            </figure>

            <div className='mt-4 text-lg font-extrabold text-secondary'>
                {isLoaded ? (
                    <button onClick={() => setIsStarted(true)}>Start</button>
                ) : (
                    <h1>Loading {Math.round((loadedItems / totalItems) * 100)}%</h1>
                )}
            </div>
        </section>
    )
}

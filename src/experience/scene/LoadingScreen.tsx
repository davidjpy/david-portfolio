import { useState } from 'react'
import { useProgress } from '@react-three/drei'

import LighthouseLoadingSvg from '@/assets/svgs/lighthouse_loading.svg'

export default function LoadingScreen() {
    const progress = useProgress((state) => state.progress)
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <section
            className='fixed flex h-screen w-screen flex-col items-center justify-center bg-primary transition-opacity duration-500 ease-linear'
            style={{ opacity: isLoaded ? 0 : 1, pointerEvents: isLoaded ? 'none' : 'all' }}
        >
            <object type='image/svg+xml' data={LighthouseLoadingSvg} className='w-[400px]'>
                <img src={LighthouseLoadingSvg} />
            </object>
            <div className='mt-4 text-lg font-extrabold text-secondary'>
                {progress === 100 ? (
                    <button onClick={() => setIsLoaded(true)}>Start</button>
                ) : (
                    <h1>Loading {progress}%</h1>
                )}
            </div>
        </section>
    )
}

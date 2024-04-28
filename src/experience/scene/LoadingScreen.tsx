import { useContext, useState } from 'react'
import Lottie from 'lottie-react'

import { AppContext } from '@/src/context/appContext'
import animation from './lighthouse.json'

export default function LoadingScreen() {
    const { isLoading } = useContext(AppContext)
    const [isStarted, setIsStarted] = useState(false)

    return (
        <section
            className='fixed flex h-screen w-screen flex-col items-center justify-center bg-primary transition-opacity duration-500 ease-linear'
            style={{ opacity: isStarted ? 0 : 1, pointerEvents: isStarted ? 'none' : 'all' }}
        >
            {!isLoading && (
                <div className='h-[120px]'>
                    <Lottie animationData={animation} loop={false} className='h-full w-full' />
                </div>
            )}

            <div className='mt-4 text-lg font-extrabold text-secondary'>
                {isLoading ? <h1>Loading</h1> : <button onClick={() => setIsStarted(true)}>Start</button>}
            </div>
        </section>
    )
}

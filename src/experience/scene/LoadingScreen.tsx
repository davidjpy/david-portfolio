import { useContext, useState } from 'react'

import { AppContext } from '@/src/context/appContext'
import LighthouseLoadingSvg from '@/assets/svgs/lighthouse_loading.svg'

export default function LoadingScreen() {
    const { isLoading } = useContext(AppContext)
    const [isStarted, setIsStarted] = useState(false)

    return (
        <section
            className='fixed flex h-screen w-screen flex-col items-center justify-center bg-primary transition-opacity duration-500 ease-linear'
            style={{ opacity: isStarted ? 0 : 1, pointerEvents: isStarted ? 'none' : 'all' }}
        >
            {isLoading ? (
                <figure className='h-[200px]'></figure>
            ) : (
                <figure className='h-[200px]'>
                    <object type='image/svg+xml' data={LighthouseLoadingSvg} className='w-[400px]'>
                        <img src={LighthouseLoadingSvg} />
                    </object>
                </figure>
            )}

            <div className='mt-4 text-lg font-extrabold text-secondary'>
                {isLoading ? <h1>Loading</h1> : <button onClick={() => setIsStarted(true)}>Start</button>}
            </div>
        </section>
    )
}

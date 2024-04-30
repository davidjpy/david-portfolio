import { useContext, useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react'

import { AppContext } from '@/src/context/appContext'
import animation from '@/assets/svgs/lighthouse.json'

import type { LottieRefCurrentProps } from 'lottie-react'

export default function LoadingScreen() {
    const { isLoading } = useContext(AppContext)
    const [isStarted, setIsStarted] = useState(false)
    const lottieRef = useRef<LottieRefCurrentProps | null>(null)

    const handleLoopAnimation = () => {
        if (lottieRef.current) {
            lottieRef.current.goToAndPlay(4600, false)
        }
    }

    const handleClickStartExperience = () => {
        lottieRef.current?.destroy()
        setIsStarted(true)
    }

    return (
        <section
            className='fixed flex h-screen w-screen flex-col items-center justify-center bg-[#FFF8E7] transition-opacity duration-500 ease-linear'
            style={{ opacity: isStarted ? 0 : 1, pointerEvents: isStarted ? 'none' : 'all' }}
        >
            {isLoading ? (
                <h1 className='text-4xl font-extrabold text-secondary'>
                    Sailing To the <span className='text-accent'>Lighthouse</span>...
                </h1>
            ) : (
                <div className='text-center'>
                    <span>
                        <Lottie
                            lottieRef={lottieRef}
                            animationData={animation}
                            loop={false}
                            onComplete={handleLoopAnimation}
                            className='w-[600px]'
                        />
                    </span>
                    <button className='mt-8'>Start</button>
                </div>
            )}
        </section>
    )
}

import { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import Lottie from 'lottie-react'

import { AppContext } from '@/src/context/appContext'
import lighthouseAnimation from '@/assets/svgs/lighthouse.json'
import boatWheelAnimation from '@/assets/svgs/boat_wheel.json'

import type { LottieRefCurrentProps } from 'lottie-react'

export default function LoadingScreen() {
    const { isLoading, isStarted, setIsStarted } = useContext(AppContext)
    const lighthouseLottieRef = useRef<LottieRefCurrentProps | null>(null)
    const boatWheelLottieRef = useRef<LottieRefCurrentProps | null>(null)

    const handleLoopAnimation = () => {
        if (lighthouseLottieRef.current) {
            lighthouseLottieRef.current.playSegments([460, 900], true)
        }
    }

    const handleClickStartExperience = () => {
        lighthouseLottieRef.current?.playSegments([900, 2000], true)

        setTimeout(() => {
            lighthouseLottieRef.current?.pause()
            lighthouseLottieRef.current?.destroy()
            setIsStarted(true)
        }, 200)
    }

    return (
        <section
            className='fixed flex h-screen w-screen flex-col items-center justify-center bg-[#FFF8E7] transition-opacity duration-500 ease-in'
            style={{ opacity: isStarted ? 0 : 1, pointerEvents: isStarted ? 'none' : 'all' }}
        >
            {isLoading ? (
                <h1 className='text-4xl font-extrabold text-[#505050]'>
                    Sailing To the <span className='text-accent'>Lighthouse</span>...
                </h1>
            ) : (
                <div className='text-center'>
                    <span>
                        <Lottie
                            lottieRef={lighthouseLottieRef}
                            animationData={lighthouseAnimation}
                            initialSegment={[0, 900]}
                            autoPlay={false}
                            loop={false}
                            onComplete={handleLoopAnimation}
                            className='w-[600px]'
                        />
                    </span>
                    <button
                        onClick={handleClickStartExperience}
                        className='m-auto flex items-center gap-[8px] rounded-full border-[1px] border-[#505050] pb-[8px] pl-[20px] pr-[20px] pt-[8px] font-medium text-[#505050]'
                    >
                        Start Journey
                        {!isStarted && (
                            <span>
                                <Lottie
                                    lottieRef={boatWheelLottieRef}
                                    animationData={boatWheelAnimation}
                                    autoPlay={false}
                                    loop={false}
                                    initialSegment={[0, 100]}
                                    className='h-[40px]'
                                />
                            </span>
                        )}
                    </button>
                </div>
            )}
        </section>
    )
}

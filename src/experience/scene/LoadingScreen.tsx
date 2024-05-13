import { useContext, useRef } from 'react'
import Lottie from 'lottie-react'

import { AppContext } from '@/src/context/appContext'
import lighthouseAnimation from '@/assets/svgs/lighthouse.json'
import dockAnimation from '@/assets/svgs/dock.json'
import wheelAnimation from '@/assets/svgs/boat_wheel.json'

import type { LottieRefCurrentProps } from 'lottie-react'

export default function LoadingScreen() {
    const { isLoading, isStarted, setIsStarted } = useContext(AppContext)
    const lighthouseLottieRef = useRef<LottieRefCurrentProps | null>(null)
    const boatWheelLottieRef = useRef<LottieRefCurrentProps | null>(null)
    const dockLottieRef = useRef<LottieRefCurrentProps | null>(null)
    const startButtonRef = useRef<HTMLButtonElement | null>(null)

    const handleLoopLighthouseAnimation = () => {
        if (lighthouseLottieRef.current) {
            lighthouseLottieRef.current.playSegments([460, 900], true)
        }
    }

    const handleClickStartExperience = () => {
        lighthouseLottieRef.current?.playSegments([900, 2000], true)

        if (startButtonRef.current) {
            startButtonRef.current.style.opacity = '0'
            startButtonRef.current.style.transform = 'translate(-50%, -80%)'
        }

        setTimeout(() => {
            lighthouseLottieRef.current?.destroy()
            dockLottieRef.current?.destroy()
            boatWheelLottieRef.current?.destroy()
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
                <div className='relative text-center'>
                    <span>
                        <Lottie
                            lottieRef={lighthouseLottieRef}
                            animationData={lighthouseAnimation}
                            initialSegment={[0, 900]}
                            autoPlay={false}
                            loop={false}
                            onComplete={handleLoopLighthouseAnimation}
                            className='w-[600px]'
                        />
                    </span>
                    <button
                        ref={startButtonRef}
                        onClick={handleClickStartExperience}
                        onMouseEnter={() => {
                            boatWheelLottieRef.current?.play()
                        }}
                        onMouseLeave={() => {
                            boatWheelLottieRef.current?.pause()
                        }}
                        className='pointer-events-none absolute left-1/2 flex -translate-x-1/2 -translate-y-[30%] items-center rounded-[12px] pb-[8px] pl-[12px] pr-[12px] pt-[8px] hover:bg-[#dfbf913f] [transition:background-color_0.2s_ease-out]'
                    >
                        <Lottie
                            lottieRef={dockLottieRef}
                            animationData={dockAnimation}
                            autoPlay={false}
                            loop={false}
                            initialSegment={[0, 570]}
                            onComplete={() => {
                                if (startButtonRef.current) {
                                    startButtonRef.current.style.pointerEvents = 'auto'
                                }
                            }}
                            className='mr-[8px] w-[55px]'
                        />
                        <Lottie
                            lottieRef={boatWheelLottieRef}
                            animationData={wheelAnimation}
                            autoPlay={true}
                            loop={true}
                            className='wheel w-[40px]'
                            onDOMLoaded={() => boatWheelLottieRef.current?.stop()}
                        />
                    </button>
                </div>
            )}
        </section>
    )
}

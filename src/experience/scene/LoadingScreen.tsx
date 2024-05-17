import { useContext, useMemo, useRef } from 'react'
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
            startButtonRef.current.style.transform = 'translate(0, -80%)'
        }

        setTimeout(() => {
            lighthouseLottieRef.current?.destroy()
            dockLottieRef.current?.destroy()
            boatWheelLottieRef.current?.destroy()
            setIsStarted(true)
        }, 200)
    }

    const memorizedLighthouseSvg = useMemo(() => {
        return (
            <Lottie
                lottieRef={lighthouseLottieRef}
                animationData={lighthouseAnimation}
                initialSegment={[0, 900]}
                autoPlay={false}
                loop={false}
                onComplete={handleLoopLighthouseAnimation}
                onDOMLoaded={() => lighthouseLottieRef.current?.play()}
                className='max-xm:w-[320px] w-[500px] max-md:w-[450px] max-sm:w-[400px]'
            />
        )
    }, [])

    return (
        <section
            className='absolute flex h-full min-h-[600px] w-full flex-col items-center justify-center overflow-y-auto bg-[#FFF8E7] transition-opacity duration-500 ease-in'
            style={{ opacity: isStarted ? 0 : 1, pointerEvents: isStarted ? 'none' : 'all' }}
        >
            {isLoading ? (
                <h1 className='max-xm:text-xl text-4xl font-extrabold text-[#505050] max-md:text-3xl max-sm:text-2xl'>
                    Sailing To the <span className='text-accent'>Lighthouse</span>...
                </h1>
            ) : (
                <div>
                    <span>{memorizedLighthouseSvg}</span>
                    <button
                        ref={startButtonRef}
                        onClick={handleClickStartExperience}
                        onMouseEnter={() => {
                            boatWheelLottieRef.current?.play()
                        }}
                        onMouseLeave={() => {
                            boatWheelLottieRef.current?.pause()
                        }}
                        aria-label='Start'
                        className='pointer-events-none m-auto mt-[24px] flex h-[50px] items-center rounded-[12px]  [transition:opacity_0.2s_ease-out,transform_0.2s_ease-out]'
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
                            className='mr-[8px] h-[50px] w-[75px] max-md:w-[65px] max-sm:w-[55px]'
                            aria-hidden={true}
                        />
                        <Lottie
                            lottieRef={boatWheelLottieRef}
                            animationData={wheelAnimation}
                            autoPlay={true}
                            loop={true}
                            className='wheel h-[50px] w-[50px] max-md:w-[45px] max-sm:w-[40px]'
                            onDOMLoaded={() => boatWheelLottieRef.current?.stop()}
                            aria-hidden={true}
                        />
                    </button>
                </div>
            )}
        </section>
    )
}
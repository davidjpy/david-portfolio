import { useContext, useMemo, useRef } from 'react'
import Lottie from 'lottie-react'
import { FaAngleDown } from 'react-icons/fa6'
import { LuMouse } from 'react-icons/lu'

import { AppContext } from '@/src/context/appContext'
import lighthouseAnimation from '@/assets/svgs/lighthouse.json'

import type { LottieRefCurrentProps } from 'lottie-react'

export function LoadingScreen() {
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
        window.removeEventListener('wheel', handleClickStartExperience)
        window.removeEventListener('touchmove', handleClickStartExperience)
        lighthouseLottieRef.current?.playSegments([900, 2000], true)

        if (startButtonRef.current) {
            startButtonRef.current.style.opacity = '0'
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
                onDOMLoaded={() => {
                    lighthouseLottieRef.current?.play()
                    setTimeout(() => {
                        if (startButtonRef.current) {
                            window.addEventListener('wheel', handleClickStartExperience)
                            window.addEventListener('touchmove', handleClickStartExperience)
                            startButtonRef.current.style.pointerEvents = 'auto'
                            startButtonRef.current.style.opacity = '1'
                        }
                    }, 4200)
                }}
                className='w-[500px] max-[500px]:w-full'
            />
        )
    }, [])

    return (
        <section
            className='absolute flex h-full min-h-[600px] w-full flex-col items-center justify-center overflow-y-auto bg-[#FFF8E7] transition-opacity duration-500 ease-in'
            style={{ opacity: isStarted ? 0 : 1, pointerEvents: isStarted ? 'none' : 'all' }}
        >
            {isLoading ? (
                <h1 className='text-4xl font-extrabold text-[#505050] max-md:text-3xl max-sm:text-2xl max-xs:text-xl'>
                    Sailing To the <span className='text-accent'>Lighthouse</span>...
                </h1>
            ) : (
                <>
                    {memorizedLighthouseSvg}
                    <button
                        ref={startButtonRef}
                        aria-label='Start'
                        onClick={handleClickStartExperience}
                        className='pointer-events-none absolute bottom-[12px] flex animate-floating flex-col items-center text-[#505050] opacity-0 transition-opacity duration-500 ease-out focus:outline-[#5613D1]'
                    >
                        <LuMouse aria-hidden={true} className='mb-[8px] text-[38px] max-[500px]:text-[32px]' />
                        <FaAngleDown aria-hidden={true} className='text-[26px] max-[500px]:text-[20px]' />
                    </button>
                </>
            )}
        </section>
    )
}

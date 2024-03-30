import { useProgress } from '@react-three/drei'

import LighthouseLoadingSvg from '@/assets/svgs/lighthouse_loading.svg'

export default function LoadingScreen() {
    const { active, progress } = useProgress()
    return (
        <section
            className='pointer-events-none fixed flex h-screen w-screen flex-col items-center justify-center bg-primary transition-opacity delay-[2000ms] duration-500 ease-linear'
            style={{ opacity: active ? 1 : 0 }}
        >
            <object type='image/svg+xml' data={LighthouseLoadingSvg} className='w-[600px]' />
            {/* <header>
                <h1 className='text-xl font-extrabold text-secondary'>Loading {progress}%</h1>
            </header> */}
        </section>
    )
}

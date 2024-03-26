import { useRef, useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'

import LighthouseScene from '@/src/experience/scene/LighthouseScene'
import HtmlContent from '@/src/experience/htmls/HtmlContent'
import BrightnessSlider from '@/src/experience/htmls/BrightnessSlider'
import Camera from '@/src/experience/camera/Camera'
import { getClampedValue } from '@/src/utilities/getClampedValue'

import { cameraConfig, scrollPages, perfectPageHeight } from '@/src/utilities/constants'

import '@/experience/Experience.css'

function Scene() {
    const oceanRef = useRef<unknown>(null)
    const isMobile = useRef<boolean>(false)
    const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera

    const perfectWindowWidth = 1920
    const [pages, setPages] = useState(scrollPages * (perfectPageHeight / window.innerHeight))

    useEffect(() => {
        const handleResizeExperience = () => {
            if (window.innerWidth <= 968) {
                isMobile.current = true
                camera.fov = 80
            } else {
                isMobile.current = false
                camera.fov = getClampedValue((perfectWindowWidth - window.innerWidth) / 40 + 60, 60, 70)
            }
            setPages(scrollPages * (perfectPageHeight / window.innerHeight))
            camera.updateProjectionMatrix()
        }

        handleResizeExperience()
        addEventListener('resize', handleResizeExperience)

        return () => {
            removeEventListener('resize', handleResizeExperience)
        }
    }, [])

    return (
        <ScrollControls pages={pages} damping={0}>
            <BrightnessSlider />
            <HtmlContent />
            <LighthouseScene oceanRef={oceanRef} />
            <Camera isMobile={isMobile.current} />
        </ScrollControls>
    )
}

export default function Experience() {
    return (
        <main className='fixed -z-10 h-screen w-screen overflow-hidden'>
            <Canvas
                flat
                // linear
                // eventPrefix='offset'
                // eventSource={document.getElementById('root') as HTMLElement}
                dpr={[1, 1]}
                camera={cameraConfig}
            >
                <Scene />
            </Canvas>
        </main>
    )
}

import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'

import LighthouseScene from '@/src/experience/scene/LighthouseScene'
import HtmlContent from '@/src/experience/htmls/HtmlContent'
import BrightnessSlider from '@/src/experience/htmls/BrightnessSlider'
import Camera from '@/src/experience/camera/Camera'
import { getClampedValue } from '@/src/utilities/getClampedValue'

import { cameraConfig, scrollPages } from '@/src/utilities/constants'

import '@/experience/Experience.css'

function Scene() {
    const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera
    const isMobile = useRef<boolean>(false)
    const oceanRef = useRef<unknown>(null)

    useEffect(() => {
        const perfectWindowWidth = 1920
        const handleResizeExperience = () => {
            if (window.innerWidth <= 968) {
                isMobile.current = true
                camera.fov = 80
            } else {
                isMobile.current = false
                camera.fov = getClampedValue((perfectWindowWidth - window.innerWidth) / 40 + 60, 60, 70)
            }
            camera.updateProjectionMatrix()
        }
        handleResizeExperience()
        addEventListener('resize', handleResizeExperience)

        return () => {
            removeEventListener('resize', handleResizeExperience)
        }
    }, [])

    return (
        <>
            <BrightnessSlider />
            <HtmlContent />
            <LighthouseScene oceanRef={oceanRef} />
            <Camera />
        </>
    )
}

export default function Experience() {
    return (
        <main className='fixed -z-10 h-screen w-screen overflow-hidden'>
            <Canvas
                id='kkbk'
                flat
                // linear
                // eventPrefix='offset'
                // eventSource={document.getElementById('root') as HTMLElement}
                dpr={[1, 1]}
                camera={{
                    fov: cameraConfig.fov,
                    near: cameraConfig.near,
                    far: cameraConfig.far,
                    position: [0.046, 0.7857, 1.9249]
                }}
            >
                <ScrollControls pages={scrollPages} damping={0}>
                    <Scene />
                </ScrollControls>
            </Canvas>
        </main>
    )
}

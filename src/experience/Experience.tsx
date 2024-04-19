import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'

import LighthouseScene from '@/src/experience/scene/LighthouseScene'
import HtmlContent from '@/src/experience/htmls/HtmlContent'
import ControlPanel from '@/src/experience/htmls/ControlPanel'
import Camera from '@/src/experience/camera/Camera'
import { getClampedValue } from '@/src/utilities/getClampedValue'

import { cameraConfig, scrollPages, perfectPageHeight } from '@/src/utilities/constants'

import '@/experience/Experience.css'

function Scene() {
    const oceanRef = useRef<unknown>(null)
    const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera

    const perfectWindowWidth = 1920
    const [isMobile, setIsMobile] = useState(false)
    const [pages, setPages] = useState(scrollPages * (perfectPageHeight / window.innerHeight))

    useEffect(() => {
        const handleResizeExperience = () => {
            if (
                window.innerWidth <= 968
                // || window.innerWidth / window.innerHeight < 1.2
            ) {
                console.log('ss')
                setIsMobile(true)
                camera.fov = 80
            } else {
                setIsMobile(false)
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
            <ControlPanel />
            <HtmlContent />
            <Suspense fallback={null}>
                <LighthouseScene oceanRef={oceanRef} />
                <Camera isMobile={isMobile} />
            </Suspense>
        </ScrollControls>
    )
}

export default function Experience() {
    return (
        <Canvas
            flat
            // linear
            // eventPrefix='offset'
            // eventSource={document.getElementById('root') as HTMLElement}
            dpr={[1, 1]}
            camera={{
                far: cameraConfig.far,
                near: cameraConfig.near,
                fov: cameraConfig.fov,
                position: [0, 3, 5]
            }}
            style={{
                height: '100vh',
                overflow: 'hidden',
                position: 'fixed'
            }}
        >
            <Scene />
        </Canvas>
    )
}

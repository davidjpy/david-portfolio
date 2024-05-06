import { useRef, useEffect, useContext } from 'react'
import { Canvas, useThree } from '@react-three/fiber'

import LighthouseScene from '@/src/experience/scene/LighthouseScene'
import Camera from '@/src/experience/camera/Camera'
import { getClampedValue } from '@/src/utilities/getClampedValue'
import { cameraConfig } from '@/src/utilities/constants'
import { AppContext } from '@/src/context/appContext'

import '@/experience/Experience.css'

function Scene() {
    const oceanRef = useRef<unknown>(null)
    const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera

    const perfectWindowWidth = 1920
    const { isMobile, setIsMobile } = useContext(AppContext)

    useEffect(() => {
        const handleResizeExperience = () => {
            if (window.innerWidth <= 968) {
                setIsMobile(true)
                camera.fov = 80
            } else {
                setIsMobile(false)
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
            <LighthouseScene oceanRef={oceanRef} />
            <Camera isMobile={isMobile} />
        </>
    )
}

export default function Experience() {
    const { isStarted } = useContext(AppContext)

    return (
        <Canvas
            flat
            // linear
            eventPrefix='client'
            eventSource={document.getElementById('root') as HTMLElement}
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
                position: 'fixed',
                opacity: isStarted ? 100 : 0,
                transition: 'opacity 0.5s ease-out'
            }}
        >
            <Scene />
        </Canvas>
    )
}

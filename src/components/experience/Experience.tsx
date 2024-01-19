import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { CameraControls, ScrollControls, useScroll } from '@react-three/drei'
// import { useControls } from 'leva'

import LighthouseScene from '@/src/components/experience/LighthouseScene'
import HtmlContent from '@/src/components/experience/HtmlContent'
import BrightnessSlider from '@/src/components/experience/BrightnessSlider'
import { getClampedValue } from '@/src/utilities/getClampedValue'

import { cameraConfig, cameraMouseFactor, scrollPages } from '@/src/utilities/constants'

import '@/components/experience/Experience.css'

// const tabletCameraPositions = new THREE.CatmullRomCurve3([
//     new THREE.Vector3(0.046, 0.7857, 1.9249),
//     new THREE.Vector3(0.21, 0.2357, 0.24)
// ])
// const tabletCameraLookAts = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.3, 0), new THREE.Vector3(0.39, 0.17, 0)])

const tabletCameraPositions = [
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.046, 0.7857, 1.9249),
        new THREE.Vector3(0.21, 0.2357, 0.24)
    ]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.21, 0.2357, 0.24),
        new THREE.Vector3(-0.03, 0.3597, -0.132)
    ]),
]
const tabletCameraLookAts = [
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.3, 0),
        new THREE.Vector3(0.39, 0.17, 0)
    ]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.39, 0.17, 0),
        new THREE.Vector3(-0.1135, 0.3508, -0.221)
    ]),
]

// const mobileCameraPositions = new THREE.CatmullRomCurve3([
//     new THREE.Vector3(0.046, 0.7857, 1.9249),
//     new THREE.Vector3(0.176, 0.2347, 0.2045)
// ])
// const mobileCameraLookAts = new THREE.CatmullRomCurve3([
//     new THREE.Vector3(0, 0.3, 0),
//     new THREE.Vector3(0.2385, 0.2148, 0.1238)
// ])

const mobileCameraPositions = [
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.046, 0.7857, 1.9249),
        new THREE.Vector3(0.176, 0.2347, 0.2045)
    ]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.176, 0.2347, 0.2045),
        new THREE.Vector3(-0.03, 0.3597, -0.132)
    ])
]
const mobileCameraLookAts = [
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.3, 0),
        new THREE.Vector3(0.2385, 0.2148, 0.1238)
    ]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.2385, 0.2148, 0.1238),
        new THREE.Vector3(-0.1135, 0.3508, -0.221)
    ])
]

function Scene() {
    const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera
    const scrollData = useScroll()
    const isMobile = useRef<boolean>(false)
    const cameraControlRef = useRef() as React.RefObject<CameraControls>
    const oceanRef = useRef<unknown>(null)

    // const { position, lookAt } = useControls('Camera', {
    //     position: {
    //         value: [-0.03, 0.3597, -0.132],
    //         step: 0.001
    //     },
    //     lookAt: {
    //         value: [-0.1135, 0.3508, -0.221],
    //         step: 0.001
    //     }
    // })
    // console.log(position, lookAt)

    const getNextCameraPosition = (index: number, isMobile: boolean, offset: number): THREE.Vector3 => {
        return isMobile ?
            mobileCameraPositions[index].getPoint(offset) :
            tabletCameraPositions[index].getPoint(offset)
    }

    const getNextCameraLookAt = (index: number, isMobile: boolean, offset: number): THREE.Vector3 => {
        return isMobile ?
            mobileCameraLookAts[index].getPoint(offset) :
            tabletCameraLookAts[index].getPoint(offset)
    }

    useFrame(({ pointer }) => {
        const firstSectionOffset = scrollData.range(0, 1 / scrollPages)
        const isInFirstSection = scrollData.visible(0, 1 / scrollPages)

        const secondSectionOffset = scrollData.range(4 / scrollPages, 1 / scrollPages)
        const isInSecondSection = scrollData.visible(4 / scrollPages, 1 / scrollPages)

        let nextCameraPosition
        let nextCameraLookAt
        
        // const canvas = scene.getObjectByName('canvasPhotos')
        // const canvasGlobalPosition = new THREE.Vector3()
        // canvas?.getWorldPosition(canvasGlobalPosition)
        // console.log(canvasGlobalPosition)
        // cameraControlRef.current!.setLookAt(
        //     position[0],
        //     position[1],
        //     position[2],
        //     lookAt[0],
        //     lookAt[1],
        //     lookAt[2],
        //     true
        // )

        cameraControlRef.current!.disconnect()
        cameraControlRef.current!.smoothTime = 0.3
        switch (true) {
            case isInFirstSection:
                nextCameraPosition = getNextCameraPosition(0, isMobile.current, firstSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(0, isMobile.current, firstSectionOffset)
                break

            case isInSecondSection:
            default:
                nextCameraPosition = getNextCameraPosition(1, isMobile.current, secondSectionOffset)
                nextCameraLookAt     = getNextCameraLookAt(1, isMobile.current, secondSectionOffset)
                break
        }

        const cameraDistance = cameraControlRef.current!.camera.position.distanceTo(nextCameraLookAt)
        const clampedDistanceFactor = getClampedValue(Math.pow(cameraDistance, 3), 0.02, 1.5)

        cameraControlRef.current!.setLookAt(
            nextCameraPosition.x + pointer.x * cameraMouseFactor * clampedDistanceFactor,
            nextCameraPosition.y + pointer.y * cameraMouseFactor * clampedDistanceFactor,
            nextCameraPosition.z,
            nextCameraLookAt.x,
            nextCameraLookAt.y,
            nextCameraLookAt.z,
            true
        )
    })

    useEffect(() => {
        const perfectWindowWidth = 1920
        const handleResizeExperience = () => {
            if (window.innerWidth < 768) {
                isMobile.current = true
            } else {
                isMobile.current = false
            }
            camera.fov = getClampedValue((perfectWindowWidth - window.innerWidth) / 40 + 60, 60, 90)
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

            <CameraControls ref={cameraControlRef} makeDefault />
            {/* <fog attach='fog' args={['#17171b', 30, 40]} /> */}
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

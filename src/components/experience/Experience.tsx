import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { CameraControls, ScrollControls, useScroll } from '@react-three/drei'
// import { useControls } from 'leva'

import LighthouseScene from '@/src/components/experience/LighthouseScene'
import HtmlContent from '@/src/components/experience/HtmlContent'
import BrightnessSlider from '@/src/components/experience/BrightnessSlider'

import {
    cameraConfig,
    cameraMouseFactor,
    scrollPages,
    defaultCameraLookAts,
    defaultCameraPositions
} from '@/src/utilities/constants'

import '@/components/experience/Experience.css'

const MutableCameraPositions = [new THREE.Vector3(0, 0.3, 1), new THREE.Vector3(0.11, -0.05, 0)]
const MutableCameraLookAts = [new THREE.Vector3(0, 0.05, 0), new THREE.Vector3(0.17, -0.09, -0.16)]

interface OceanShaderMaterialUniform {
    uBigWavesElevation: number
    uSmallWavesElevation: number
}

type OceanRefType = React.MutableRefObject<OceanShaderMaterialUniform>

function Scene() {
    const scene = useThree((state) => state.scene)
    const scrollData = useScroll()
    const cameraControlRef = useRef() as React.RefObject<CameraControls>
    const cameraPositionCurveRef = useRef<THREE.CatmullRomCurve3>(new THREE.CatmullRomCurve3(MutableCameraPositions))
    const cameraLookAtCurveRef = useRef<THREE.CatmullRomCurve3>(new THREE.CatmullRomCurve3(MutableCameraLookAts))
    const oceanRef = useRef<unknown>(null)

    // const { position, lookAt } = useControls('Camera', {
    //     position: {
    //         value: [0.11, -0.05, 0]
    //     },
    //     lookAt: {
    //         value: [0.17, -0.09, -0.16]
    //     }
    // })

    useFrame(({ pointer }) => {
        const firstSectionOffset = scrollData.range(0, 1 / scrollPages)
        const isInFirstSection = scrollData.visible(0, 3 / scrollPages)
        let nextCameraPosition
        let nextCameraLookAt

        // if (cameraControlRef.current) {
        //     cameraControlRef.current.disconnect()
        //     cameraControlRef.current.smoothTime = 0.3
        //     if (isInFirstSection) {
        //         nextCameraPosition = cameraPositionCurveRef.current.getPoint(firstSectionOffset)
        //         nextCameraLookAt = cameraLookAtCurveRef.current.getPoint(firstSectionOffset)
        //     } else {
        //         nextCameraPosition = cameraPositionCurveRef.current.getPoint(firstSectionOffset)
        //         nextCameraLookAt = cameraLookAtCurveRef.current.getPoint(firstSectionOffset)
        //     }
        //     // cameraControlRef.current.setLookAt(
        //     //     position[0],
        //     //     position[1],
        //     //     position[2],
        //     //     lookAt[0],
        //     //     lookAt[1],
        //     //     lookAt[2],
        //     //     false
        //     // )
        //     const cameraDistance = cameraControlRef.current.camera.position.distanceTo(nextCameraLookAt)
        //     cameraControlRef.current.setLookAt(
        //         nextCameraPosition.x + pointer.x * cameraMouseFactor * Math.pow(cameraDistance, 3),
        //         nextCameraPosition.y + pointer.y * cameraMouseFactor * Math.pow(cameraDistance, 3),
        //         nextCameraPosition.z,
        //         nextCameraLookAt.x,
        //         nextCameraLookAt.y,
        //         nextCameraLookAt.z,
        //         true
        //     )
        // }
    })

    useEffect(() => {
        // Initial adjustment for responsive camera path
        let isMobileLegacyData = false
        const perfectWindowWidth = 1920
        const canvas = scene.getObjectByName('canvas')
        const lighthouseGroup = scene.getObjectByName('lighthouseScene')
        const canvasGlobalPosition = new THREE.Vector3()
        const resizeMobileScene = () => {
            lighthouseGroup?.scale.set(0.7, 0.7, 0.7)
            if (oceanRef.current) {
                ;(oceanRef as OceanRefType).current.uBigWavesElevation = 0.1
                ;(oceanRef as OceanRefType).current.uSmallWavesElevation = 0.12
            }

            canvas?.getWorldPosition(canvasGlobalPosition)
            MutableCameraPositions[1].set(0.058, -0.033, 0)
            MutableCameraLookAts[1] = canvasGlobalPosition
            isMobileLegacyData = true
        }

        const resetScene = () => {
            MutableCameraPositions[1].set(
                defaultCameraPositions[1][0],
                defaultCameraPositions[1][1],
                defaultCameraPositions[1][2]
            )

            lighthouseGroup?.scale.set(1, 1, 1)

            if (oceanRef.current) {
                ;(oceanRef as OceanRefType).current.uBigWavesElevation = 0.15
                ;(oceanRef as OceanRefType).current.uSmallWavesElevation = 0.15
            }

            MutableCameraLookAts[1].setY(defaultCameraLookAts[1][1])
            MutableCameraLookAts[1].setZ(defaultCameraLookAts[1][2])
            isMobileLegacyData = false
        }

        const handleExperienceResize = () => {
            const isMobile = window.innerWidth <= 768
            const responsiveCameraOffset = (perfectWindowWidth - window.innerWidth) * 0.00001

            if (isMobile) {
                resizeMobileScene()
            } else {
                if (isMobileLegacyData) {
                    resetScene()
                }

                MutableCameraPositions[1].setX(defaultCameraPositions[1][0] - responsiveCameraOffset)
                MutableCameraLookAts[1].setX(defaultCameraLookAts[1][0] - responsiveCameraOffset)
            }

            cameraPositionCurveRef.current = new THREE.CatmullRomCurve3(MutableCameraPositions)
            cameraLookAtCurveRef.current = new THREE.CatmullRomCurve3(MutableCameraLookAts)
        }

        handleExperienceResize()
        addEventListener('resize', handleExperienceResize)

        return () => {
            removeEventListener('resize', handleExperienceResize)
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
                flat
                // linear
                // eventPrefix='offset'
                // eventSource={document.getElementById('root') as HTMLElement}
                dpr={[1, 1]}
                camera={{
                    fov: cameraConfig.fov,
                    near: cameraConfig.near,
                    far: cameraConfig.far,
                    position: MutableCameraPositions[0]
                }}
            >
                <ScrollControls pages={scrollPages} damping={0}>
                    <Scene />
                </ScrollControls>
            </Canvas>
        </main>
    )
}

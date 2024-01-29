import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { CameraControls, ScrollControls, useScroll } from '@react-three/drei'
import { useControls } from 'leva'

import LighthouseScene from '@/src/components/experience/LighthouseScene'
import HtmlContent from '@/src/components/experience/HtmlContent'
import BrightnessSlider from '@/src/components/experience/BrightnessSlider'
import { getClampedValue } from '@/src/utilities/getClampedValue'

import { cameraConfig, cameraMouseFactor, scrollPages } from '@/src/utilities/constants'

import '@/components/experience/Experience.css'

const tabletCameraPositions = [
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.046, 0.7857, 1.9249), new THREE.Vector3(0.21, 0.2357, 0.24)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.21, 0.2357, 0.24), new THREE.Vector3(0.201, 0.4122, 0.1468)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.201, 0.4122, 0.1468), new THREE.Vector3(-0.016, 0.3757, -0.073)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-0.016, 0.3757, -0.073), new THREE.Vector3(0.015, 0.368, -0.088)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.015, 0.368, -0.088), new THREE.Vector3(0.042, 0.366, -0.061)])
]
const tabletCameraLookAts = [
    new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.3, 0), new THREE.Vector3(0.39, 0.17, 0)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.39, 0.17, 0), new THREE.Vector3(-0.082, 0.267, -0.17)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-0.082, 0.267, -0.17), new THREE.Vector3(-0.0835, 0.3628, -0.138)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-0.0835, 0.3628, -0.138), new THREE.Vector3(-0.06, 0.357, -0.121)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-0.06, 0.357, -0.121), new THREE.Vector3(0.051, 0.3608, -0.088)])
]
const mobileCameraPositions = [
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.046, 0.7857, 1.9249), new THREE.Vector3(0.176, 0.2347, 0.2045)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.176, 0.2347, 0.2045), new THREE.Vector3(0.252, 0.4122, 0.2708)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.252, 0.4122, 0.2708), new THREE.Vector3(0.003, 0.3597, -0.084)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.003, 0.3597, -0.084), new THREE.Vector3(0.009, 0.374, -0.044)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.009, 0.374, -0.044), new THREE.Vector3(0.042, 0.366, -0.061)])
]
const mobileCameraLookAts = [
    new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.3, 0), new THREE.Vector3(0.2385, 0.2148, 0.1238)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.2385, 0.2148, 0.1238), new THREE.Vector3(-0.082, 0.267, -0.17)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-0.082, 0.267, -0.17), new THREE.Vector3(-0.075, 0.3508, -0.194)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-0.075, 0.3508, -0.194), new THREE.Vector3(-0.0665, 0.3718, -0.077)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-0.0665, 0.3718, -0.077), new THREE.Vector3(0.091, 0.363, -0.121)])
]

function Scene() {
    const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera
    const scrollData = useScroll()
    const isMobile = useRef<boolean>(false)
    const cameraControlRef = useRef() as React.RefObject<CameraControls>
    const oceanRef = useRef<unknown>(null)
    // const { position, lookAt } = useControls('Camera', {
    //     position: {
    //         value: [0.042, 0.366, -0.061],
    //         step: 0.001
    //     },
    //     lookAt: {
    //         value: [0.051, 0.3608, -0.088],
    //         step: 0.001
    //     }
    // })
    // console.log(position, lookAt)

    const getNextCameraPosition = (index: number, isMobile: boolean, offset: number): THREE.Vector3 => {
        return isMobile ? mobileCameraPositions[index].getPoint(offset) : tabletCameraPositions[index].getPoint(offset)
    }

    const getNextCameraLookAt = (index: number, isMobile: boolean, offset: number): THREE.Vector3 => {
        return isMobile ? mobileCameraLookAts[index].getPoint(offset) : tabletCameraLookAts[index].getPoint(offset)
    }

    // useFrame(() => {
    //     cameraControlRef.current!.setLookAt(
    //         position[0],
    //         position[1],
    //         position[2],
    //         lookAt[0],
    //         lookAt[1],
    //         lookAt[2],
    //         true
    //     )
    // })

    useFrame(({ pointer }) => {
        const isInCanvasSection = scrollData.visible(0, 4 / scrollPages)
        const isInTowerOverviewSection = scrollData.visible(4 / scrollPages, 0.5 / scrollPages)
        const isInSkillBoardSection = scrollData.visible(4.5 / scrollPages, 4 / scrollPages)
        const isInBookShelfSection = scrollData.visible(8.5 / scrollPages, 4 / scrollPages)
        const isInCabinetSection = scrollData.visible(12.5 / scrollPages, 4 / scrollPages)

        let nextCameraPosition
        let nextCameraLookAt

        cameraControlRef.current!.disconnect()
        cameraControlRef.current!.smoothTime = 0.3
        switch (true) {
            case isInCanvasSection:
                const canvasSectionOffset = scrollData.range(0, 1 / scrollPages)
                nextCameraPosition = getNextCameraPosition(0, isMobile.current, canvasSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(0, isMobile.current, canvasSectionOffset)
                break

            case isInTowerOverviewSection:
                const towerOverviewSectionOffset = scrollData.range(4 / scrollPages, 0.5 / scrollPages)
                nextCameraPosition = getNextCameraPosition(1, isMobile.current, towerOverviewSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(1, isMobile.current, towerOverviewSectionOffset)
                break

            case isInSkillBoardSection:
                const skillBoardSectionOffset = scrollData.range(4.5 / scrollPages, 0.5 / scrollPages)
                nextCameraPosition = getNextCameraPosition(2, isMobile.current, skillBoardSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(2, isMobile.current, skillBoardSectionOffset)
                break

            case isInBookShelfSection:
                const bookShelfSectionOffset = scrollData.range(8.5 / scrollPages, 0.5 / scrollPages)
                nextCameraPosition = getNextCameraPosition(3, isMobile.current, bookShelfSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(3, isMobile.current, bookShelfSectionOffset)
                break

            case isInCabinetSection:
            default:
                const cabinetSectionOffset = scrollData.range(12.5 / scrollPages, 0.5 / scrollPages)
                nextCameraPosition = getNextCameraPosition(4, isMobile.current, cabinetSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(4, isMobile.current, cabinetSectionOffset)
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
            if (window.innerWidth <= 968) {
                isMobile.current = true
            } else {
                isMobile.current = false
            }
            camera.fov = getClampedValue((perfectWindowWidth - window.innerWidth) / 40 + 60, 60, 70)
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

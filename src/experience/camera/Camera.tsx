import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { CameraControls, useScroll } from '@react-three/drei'
// import { useControls } from 'leva'

import { getClampedValue } from '@/src/utilities/getClampedValue'
import { cameraMouseFactor, scrollPages } from '@/src/utilities/constants'

export const tabletCameraPositions = [
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.046, 1.9557, 1.9249), new THREE.Vector3(0.217, 1.4057, 0.24)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.217, 1.4057, 0.24), new THREE.Vector3(0.21, 1.5822, 0.1468)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.21, 1.5822, 0.1468), new THREE.Vector3(-0.0182, 1.5376, -0.036)]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.0182, 1.5376, -0.036),
        new THREE.Vector3(0.0483, 1.5443, -0.0785)
    ]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.0483, 1.5443, -0.0785),
        new THREE.Vector3(-0.0233, 1.5423, -0.0756)
    ]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-0.0233, 1.5423, -0.0756), new THREE.Vector3(0.21, 1.5822, 0.1468)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.21, 1.5822, 0.1468), new THREE.Vector3(0.21, 1.7116, 0.1468)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.21, 1.7116, 0.1468), new THREE.Vector3(-0.0195, 1.6841, -0.0524)]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.0195, 1.6841, -0.0524),
        new THREE.Vector3(-0.0506, 1.6944, -0.0538)
    ])
]

const tabletCameraLookAts = [
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.008, 1.5967, 0.24), new THREE.Vector3(0.398, 1.348, 0)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.398, 1.348, 0), new THREE.Vector3(0.038, 1.521, -0.017)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.038, 1.521, -0.017), new THREE.Vector3(-0.0702, 1.5195, -0.0938)]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.0702, 1.5195, -0.0938),
        new THREE.Vector3(0.0667, 1.544, -0.1492)
    ]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.0667, 1.544, -0.1492), new THREE.Vector3(0.0169, 1.5338, -0.1211)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.0169, 1.5338, -0.1211), new THREE.Vector3(0.038, 1.521, -0.017)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.038, 1.521, -0.017), new THREE.Vector3(0.038, 1.6638, -0.017)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.038, 1.6638, -0.017), new THREE.Vector3(-0.0966, 1.6736, -0.0627)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-0.0966, 1.6736, -0.0627), new THREE.Vector3(-0.1, 1.6531, -0.0548)])
]

const mobileCameraPositions = [
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.046, 1.9557, 1.9249), new THREE.Vector3(0.165, 1.4007, 0.219)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.165, 1.4007, 0.219), new THREE.Vector3(0.234, 1.5822, 0.1528)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.234, 1.5822, 0.1528), new THREE.Vector3(-0.0101, 1.5261, -0.0795)]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.0101, 1.5261, -0.0795),
        new THREE.Vector3(0.0164, 1.5443, -0.102)
    ]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.0164, 1.5443, -0.102), new THREE.Vector3(0.0182, 1.5432, -0.0498)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.0182, 1.5432, -0.0498), new THREE.Vector3(0.234, 1.5822, 0.1528)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.234, 1.5822, 0.1528), new THREE.Vector3(0.21, 1.7116, 0.1468)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.21, 1.7116, 0.1468), new THREE.Vector3(-0.0274, 1.6841, -0.0524)]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.0274, 1.6841, -0.0524),
        new THREE.Vector3(-0.0506, 1.6944, -0.0538)
    ])
]
const mobileCameraLookAts = [
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.008, 1.5967, 0.24), new THREE.Vector3(0.218, 1.386, 0.149)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.218, 1.386, 0.149), new THREE.Vector3(0.045, 1.521, -0.017)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.045, 1.521, -0.017), new THREE.Vector3(-0.0385, 1.52, -0.1268)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-0.0385, 1.52, -0.1268), new THREE.Vector3(0.0219, 1.544, -0.1779)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.0219, 1.544, -0.1779), new THREE.Vector3(0.0662, 1.5396, -0.1031)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.0662, 1.5396, -0.1031), new THREE.Vector3(0.045, 1.521, -0.017)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.045, 1.521, -0.017), new THREE.Vector3(0.038, 1.6638, -0.017)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.038, 1.6638, -0.017), new THREE.Vector3(-0.0304, 1.6836, -0.0529)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-0.0304, 1.6836, -0.0529), new THREE.Vector3(-0.1, 1.6531, -0.0548)])
]

interface Props {
    isMobile: boolean
}

export default function Camera({ isMobile }: Props) {
    const scrollData = useScroll()
    const cameraControlRef = useRef() as React.RefObject<CameraControls>
    // const { position, lookAt } = useControls('Camera', {
    //     position: {
    //         value: [0.0364, 1.5326, -0.0582],
    //         step: 0.0001
    //     },
    //     lookAt: {
    //         value: [0.0462, 1.5331, -0.0697],
    //         step: 0.0001
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
        const isInFirstFloorSection = scrollData.visible(4 / scrollPages, 0.5 / scrollPages)
        const isInSkillBoardSection = scrollData.visible(4.5 / scrollPages, 4 / scrollPages)
        const isInBookShelfSection = scrollData.visible(8.5 / scrollPages, 4 / scrollPages)
        const isInCabinetSection = scrollData.visible(12.5 / scrollPages, 4 / scrollPages)
        const isInFirstFloorToSecondFloorSection = scrollData.visible(16.5 / scrollPages, 0.5 / scrollPages)
        const isInSecondFloorSection = scrollData.visible(17 / scrollPages, 0.5 / scrollPages)
        const isInComputerSection = scrollData.visible(17.5 / scrollPages, 5.5 / scrollPages)
        const isInLetterSection = scrollData.visible(23 / scrollPages, 4 / scrollPages)

        let nextCameraPosition
        let nextCameraLookAt

        cameraControlRef.current!.disconnect()

        switch (true) {
            case isInCanvasSection:
                const canvasSectionOffset = scrollData.range(0, 1 / scrollPages)
                nextCameraPosition = getNextCameraPosition(0, isMobile, canvasSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(0, isMobile, canvasSectionOffset)
                break

            case isInFirstFloorSection:
                const firstFloorSectionOffset = scrollData.range(4 / scrollPages, 0.5 / scrollPages)
                nextCameraPosition = getNextCameraPosition(1, isMobile, firstFloorSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(1, isMobile, firstFloorSectionOffset)
                break

            case isInSkillBoardSection:
                const skillBoardSectionOffset = scrollData.range(4.5 / scrollPages, 0.5 / scrollPages)
                nextCameraPosition = getNextCameraPosition(2, isMobile, skillBoardSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(2, isMobile, skillBoardSectionOffset)
                break

            case isInBookShelfSection:
                const bookShelfSectionOffset = scrollData.range(8.5 / scrollPages, 0.5 / scrollPages)
                nextCameraPosition = getNextCameraPosition(3, isMobile, bookShelfSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(3, isMobile, bookShelfSectionOffset)
                break

            case isInCabinetSection:
                const cabinetSectionOffset = scrollData.range(12.5 / scrollPages, 0.5 / scrollPages)
                nextCameraPosition = getNextCameraPosition(4, isMobile, cabinetSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(4, isMobile, cabinetSectionOffset)
                break

            case isInFirstFloorToSecondFloorSection:
                const firstFloorToSecondFloorSectionOffset = scrollData.range(16.5 / scrollPages, 0.5 / scrollPages)
                nextCameraPosition = getNextCameraPosition(5, isMobile, firstFloorToSecondFloorSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(5, isMobile, firstFloorToSecondFloorSectionOffset)
                break

            case isInSecondFloorSection:
                const secondFloorSectionOffset = scrollData.range(17 / scrollPages, 0.5 / scrollPages)
                nextCameraPosition = getNextCameraPosition(6, isMobile, secondFloorSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(6, isMobile, secondFloorSectionOffset)
                break

            case isInComputerSection:
                const computerSectionOffset = scrollData.range(17.5 / scrollPages, 1 / scrollPages)
                nextCameraPosition = getNextCameraPosition(7, isMobile, computerSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(7, isMobile, computerSectionOffset)
                break

            case isInLetterSection:
            default:
                const letterSectionOffset = scrollData.range(23 / scrollPages, 0.5 / scrollPages)
                nextCameraPosition = getNextCameraPosition(8, isMobile, letterSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(8, isMobile, letterSectionOffset)
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

    return <CameraControls ref={cameraControlRef} makeDefault smoothTime={0.3} />
}

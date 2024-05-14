import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
// import { useControls } from 'leva'

import { getInterpolatedValue } from '@/src/utilities/getInterpolatedValue'
import { getClampedValue } from '@/src/utilities/getClampedValue'
import { cameraMouseFactor, perfectPageHeight } from '@/src/utilities/constants'

export const tabletCameraPositions = [
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.046, 1.9557, 1.9249), new THREE.Vector3(0.217, 1.4057, 0.24)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.217, 1.4057, 0.24), new THREE.Vector3(0.21, 1.5822, 0.1468)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.21, 1.5822, 0.1468), new THREE.Vector3(-0.0243, 1.5376, -0.036)]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.0243, 1.5376, -0.036),
        new THREE.Vector3(0.0483, 1.5443, -0.0785)
    ]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.0483, 1.5443, -0.0785),
        new THREE.Vector3(-0.0246, 1.5423, -0.0712)
    ]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-0.0246, 1.5423, -0.0712), new THREE.Vector3(0.21, 1.5822, 0.1468)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.21, 1.5822, 0.1468), new THREE.Vector3(0.21, 1.7116, 0.1468)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.21, 1.7116, 0.1468), new THREE.Vector3(-0.0195, 1.6841, -0.0524)]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.0195, 1.6841, -0.0524),
        new THREE.Vector3(-0.0433, 1.7009, -0.0538)
    ])
]

const tabletCameraLookAts = [
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.008, 1.5967, 0.24), new THREE.Vector3(0.398, 1.348, 0)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.398, 1.348, 0), new THREE.Vector3(0.038, 1.521, -0.017)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.038, 1.521, -0.017), new THREE.Vector3(-0.0658, 1.5215, -0.0938)]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.0658, 1.5215, -0.0938),
        new THREE.Vector3(0.0587, 1.544, -0.1492)
    ]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.0587, 1.544, -0.1492), new THREE.Vector3(0.0201, 1.5331, -0.1211)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.0201, 1.5331, -0.1211), new THREE.Vector3(0.038, 1.521, -0.017)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.038, 1.521, -0.017), new THREE.Vector3(0.038, 1.6638, -0.017)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.038, 1.6638, -0.017), new THREE.Vector3(-0.0966, 1.6736, -0.0627)]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.0966, 1.6736, -0.0627),
        new THREE.Vector3(-0.0701, 1.6772, -0.0557)
    ])
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
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.21, 1.7116, 0.1468), new THREE.Vector3(-0.0381, 1.6841, -0.0509)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-0.0381, 1.6841, -0.0509), new THREE.Vector3(-0.06, 1.7003, -0.0706)])
]

const mobileCameraLookAts = [
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.008, 1.5967, 0.24), new THREE.Vector3(0.218, 1.386, 0.149)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.218, 1.386, 0.149), new THREE.Vector3(0.045, 1.521, -0.017)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.045, 1.521, -0.017), new THREE.Vector3(-0.0385, 1.52, -0.1268)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-0.0385, 1.52, -0.1268), new THREE.Vector3(0.0219, 1.544, -0.1779)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.0219, 1.544, -0.1779), new THREE.Vector3(0.0662, 1.5396, -0.1031)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.0662, 1.5396, -0.1031), new THREE.Vector3(0.045, 1.521, -0.017)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.045, 1.521, -0.017), new THREE.Vector3(0.038, 1.6638, -0.017)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.038, 1.6638, -0.017), new THREE.Vector3(-0.1036, 1.6836, -0.0263)]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.1036, 1.6836, -0.0263),
        new THREE.Vector3(-0.0958, 1.6549, -0.0854)
    ])
]

const contentPageHeight = perfectPageHeight * 4
const shortScrollDistance = perfectPageHeight * 0.5
const longScrollDistance = perfectPageHeight * 1
const firstFloorSectionHeight = perfectPageHeight * 0.5
const firstFloorSectionTopEnd = contentPageHeight + firstFloorSectionHeight
const cabinetSectionTopEnd = firstFloorSectionTopEnd + contentPageHeight
const skillBoardSectionTopEnd = cabinetSectionTopEnd + contentPageHeight
const bookShelfSectionTopEnd = skillBoardSectionTopEnd + contentPageHeight
const firstFloorToSecondFloorSectionHeight = perfectPageHeight * 0.5
const firstFloorToSecondFloorSectionTopEnd = bookShelfSectionTopEnd + firstFloorToSecondFloorSectionHeight
const secondFloorSectionHeight = perfectPageHeight * 0.5
const secondFloorSectionTopEnd = firstFloorToSecondFloorSectionTopEnd + secondFloorSectionHeight
const computerSectionTopEnd = secondFloorSectionTopEnd + contentPageHeight
const letterSectionTopEnd = computerSectionTopEnd + contentPageHeight

interface Props {
    isMobile: boolean
}

export default function Camera({ isMobile }: Props) {
    const cameraControlRef = useRef() as React.RefObject<CameraControls>
    // const { position, lookAt } = useControls('Camera', {
    //     position: {
    //         value: [-0.0506, 1.6944, -0.0538],
    //         step: 0.0001
    //     },
    //     lookAt: {
    //         value: [-0.1, 1.6531, -0.0548],
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
        const scrollTop = document.documentElement.scrollTop

        const isInCanvasSection = scrollTop <= contentPageHeight
        const isInFirstFloorSection = scrollTop <= firstFloorSectionTopEnd
        const isInCabinetSection = scrollTop <= cabinetSectionTopEnd
        const isInSkillBoardSection = scrollTop <= skillBoardSectionTopEnd
        const isInBookShelfSection = scrollTop <= bookShelfSectionTopEnd
        const isInFirstFloorToSecondFloorSection = scrollTop <= firstFloorToSecondFloorSectionTopEnd
        const isInSecondFloorSection = scrollTop <= secondFloorSectionTopEnd
        const isInComputerSection = scrollTop <= computerSectionTopEnd
        const isInLetterSection = scrollTop <= letterSectionTopEnd
        let nextCameraPosition
        let nextCameraLookAt

        cameraControlRef.current!.disconnect()

        switch (true) {
            case isInCanvasSection:
                const canvasSectionOffset = Math.min(scrollTop / longScrollDistance, 1)
                nextCameraPosition = getNextCameraPosition(0, isMobile, canvasSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(0, isMobile, canvasSectionOffset)
                break

            case isInFirstFloorSection:
                const firstFloorSectionOffset = getInterpolatedValue(
                    [0, 1],
                    scrollTop,
                    contentPageHeight,
                    contentPageHeight + shortScrollDistance
                )
                nextCameraPosition = getNextCameraPosition(1, isMobile, firstFloorSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(1, isMobile, firstFloorSectionOffset)
                break

            case isInCabinetSection:
                const cabinetSectionOffset = getInterpolatedValue(
                    [0, 1],
                    scrollTop,
                    firstFloorSectionTopEnd,
                    firstFloorSectionTopEnd + shortScrollDistance
                )
                nextCameraPosition = getNextCameraPosition(2, isMobile, cabinetSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(2, isMobile, cabinetSectionOffset)
                break

            case isInSkillBoardSection:
                const skillBoardSectionOffset = getInterpolatedValue(
                    [0, 1],
                    scrollTop,
                    cabinetSectionTopEnd,
                    cabinetSectionTopEnd + shortScrollDistance
                )
                nextCameraPosition = getNextCameraPosition(3, isMobile, skillBoardSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(3, isMobile, skillBoardSectionOffset)
                break

            case isInBookShelfSection:
                const bookShelfSectionOffset = getInterpolatedValue(
                    [0, 1],
                    scrollTop,
                    skillBoardSectionTopEnd,
                    skillBoardSectionTopEnd + shortScrollDistance
                )
                nextCameraPosition = getNextCameraPosition(4, isMobile, bookShelfSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(4, isMobile, bookShelfSectionOffset)
                break

            case isInFirstFloorToSecondFloorSection:
                const firstFloorToSecondFloorSectionOffset = getInterpolatedValue(
                    [0, 1],
                    scrollTop,
                    bookShelfSectionTopEnd,
                    bookShelfSectionTopEnd + shortScrollDistance
                )
                nextCameraPosition = getNextCameraPosition(5, isMobile, firstFloorToSecondFloorSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(5, isMobile, firstFloorToSecondFloorSectionOffset)
                break

            case isInSecondFloorSection:
                const secondFloorSectionOffset = getInterpolatedValue(
                    [0, 1],
                    scrollTop,
                    firstFloorToSecondFloorSectionTopEnd,
                    firstFloorToSecondFloorSectionTopEnd + shortScrollDistance
                )
                nextCameraPosition = getNextCameraPosition(6, isMobile, secondFloorSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(6, isMobile, secondFloorSectionOffset)
                break

            case isInComputerSection:
                const computerSectionOffset = getInterpolatedValue(
                    [0, 1],
                    scrollTop,
                    firstFloorToSecondFloorSectionTopEnd,
                    firstFloorToSecondFloorSectionTopEnd + longScrollDistance
                )
                nextCameraPosition = getNextCameraPosition(7, isMobile, computerSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(7, isMobile, computerSectionOffset)
                break

            case isInLetterSection:
            default:
                const letterSectionOffset = getInterpolatedValue(
                    [0, 1],
                    scrollTop,
                    computerSectionTopEnd,
                    computerSectionTopEnd + shortScrollDistance
                )
                nextCameraPosition = getNextCameraPosition(8, isMobile, letterSectionOffset)
                nextCameraLookAt = getNextCameraLookAt(8, isMobile, letterSectionOffset)
                break
        }

        const cameraDistance = cameraControlRef.current!.camera.position.distanceTo(nextCameraLookAt)
        const clampedDistanceFactor = getClampedValue(Math.pow(cameraDistance, 3), 0.02, 1.5)
        const pointerX = getClampedValue(pointer.x, -1, 1)
        const pointerY = getClampedValue(pointer.y, -1, 1)

        cameraControlRef.current!.setLookAt(
            nextCameraPosition.x + pointerX * cameraMouseFactor * clampedDistanceFactor,
            nextCameraPosition.y + pointerY * cameraMouseFactor * clampedDistanceFactor,
            nextCameraPosition.z,
            nextCameraLookAt.x,
            nextCameraLookAt.y,
            nextCameraLookAt.z,
            true
        )
    })

    return <CameraControls ref={cameraControlRef} smoothTime={0.3} />
}

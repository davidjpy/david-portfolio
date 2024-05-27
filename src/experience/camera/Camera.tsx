import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
// import { useControls } from 'leva'

import { getInterpolatedValue } from '@/src/utilities/getInterpolatedValue'
import { getClampedValue } from '@/src/utilities/getClampedValue'
import { cameraMouseFactor, perfectPageHeight } from '@/src/utilities/constants'

type Section =
    | 'canvas'
    | 'firstFloor'
    | 'cabinet'
    | 'board'
    | 'bookshelf'
    | 'first2SecondFloor'
    | 'secondFloor'
    | 'computer'
    | 'letter'
    | 'photo'

interface CameraPositionMap {
    [key: string]: {
        index: number
        min: number
        max: number
    }
}

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
    ]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.0433, 1.7009, -0.0538),
        new THREE.Vector3(-0.0817, 1.739, -0.0384)
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
    ]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.0701, 1.6772, -0.0557),
        new THREE.Vector3(-0.2201, 1.7128, -0.0883)
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
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.0381, 1.6841, -0.0509),
        new THREE.Vector3(-0.06, 1.7003, -0.0706)
    ]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-0.06, 1.7003, -0.0706), new THREE.Vector3(-0.0858, 1.7371, -0.0341)])
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
    ]),
    new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.0958, 1.6549, -0.0854),
        new THREE.Vector3(-0.1422, 1.7293, -0.0445)
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
const memorialSectionTopEnd = letterSectionTopEnd + contentPageHeight

const nextExactPositionMap: CameraPositionMap = {
    canvas: {
        index: 0,
        min: 0,
        max: longScrollDistance
    },
    firstFloor: {
        index: 1,
        min: contentPageHeight,
        max: contentPageHeight + shortScrollDistance
    },
    cabinet: {
        index: 2,
        min: firstFloorSectionTopEnd,
        max: firstFloorSectionTopEnd + shortScrollDistance
    },
    board: {
        index: 3,
        min: cabinetSectionTopEnd,
        max: cabinetSectionTopEnd + shortScrollDistance
    },
    bookshelf: {
        index: 4,
        min: skillBoardSectionTopEnd,
        max: skillBoardSectionTopEnd + shortScrollDistance
    },
    first2SecondFloor: {
        index: 5,
        min: bookShelfSectionTopEnd,
        max: bookShelfSectionTopEnd + shortScrollDistance
    },
    secondFloor: {
        index: 6,
        min: firstFloorToSecondFloorSectionTopEnd,
        max: firstFloorToSecondFloorSectionTopEnd + shortScrollDistance
    },
    computer: {
        index: 7,
        min: firstFloorToSecondFloorSectionTopEnd,
        max: firstFloorToSecondFloorSectionTopEnd + longScrollDistance
    },
    letter: {
        index: 8,
        min: computerSectionTopEnd,
        max: computerSectionTopEnd + shortScrollDistance
    },
    photo: {
        index: 9,
        min: letterSectionTopEnd,
        max: letterSectionTopEnd + shortScrollDistance
    }
}

interface Props {
    isMobile: boolean
}

export function Camera({ isMobile }: Props) {
    const cameraControlRef = useRef() as React.RefObject<CameraControls>
    // const { position, lookAt } = useControls('Camera', {
    //     position: {
    //         value: [-0.0858, 1.7402, -0.0341],
    //         step: 0.0001
    //     },
    //     lookAt: {
    //         value: [-0.1422, 1.7293, -0.0445],
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

    const getCurrentSection = (scrollTop: number): Section => {
        if (scrollTop <= contentPageHeight) {
            return 'canvas'
        } else if (scrollTop > contentPageHeight && scrollTop <= firstFloorSectionTopEnd) {
            return 'firstFloor'
        } else if (scrollTop > firstFloorSectionTopEnd && scrollTop <= cabinetSectionTopEnd) {
            return 'cabinet'
        } else if (scrollTop > cabinetSectionTopEnd && scrollTop <= skillBoardSectionTopEnd) {
            return 'board'
        } else if (scrollTop > skillBoardSectionTopEnd && scrollTop <= bookShelfSectionTopEnd) {
            return 'bookshelf'
        } else if (scrollTop > bookShelfSectionTopEnd && scrollTop <= firstFloorToSecondFloorSectionTopEnd) {
            return 'first2SecondFloor'
        } else if (scrollTop > firstFloorToSecondFloorSectionTopEnd && scrollTop <= secondFloorSectionTopEnd) {
            return 'secondFloor'
        } else if (scrollTop > secondFloorSectionTopEnd && scrollTop <= computerSectionTopEnd) {
            return 'computer'
        } else if (scrollTop > computerSectionTopEnd && scrollTop <= letterSectionTopEnd) {
            return 'letter'
        } else {
            return 'photo'
        }
    }

    useFrame(({ pointer }) => {
        const scrollTop = Math.max(document.documentElement.scrollTop, 0)
        let nextSection: Section = getCurrentSection(scrollTop)
        let nextCameraPosition
        let nextCameraLookAt
        cameraControlRef.current!.disconnect()

        const nextExactPosition = nextExactPositionMap[nextSection]
        const offset = getInterpolatedValue([0, 1], scrollTop, nextExactPosition.min, nextExactPosition.max)
        nextCameraPosition = getNextCameraPosition(nextExactPosition.index, isMobile, offset)
        nextCameraLookAt = getNextCameraLookAt(nextExactPosition.index, isMobile, offset)

        const cameraDistance = cameraControlRef.current!.camera.position.distanceTo(nextCameraLookAt)
        let clampedDistanceFactor = getClampedValue(Math.pow(cameraDistance, 3), 0.02, 1.5)
        const pointerX = getClampedValue(pointer.x, -1, 1)
        const pointerY = getClampedValue(pointer.y, -1, 1)

        if (scrollTop > letterSectionTopEnd && scrollTop <= memorialSectionTopEnd) {
            clampedDistanceFactor = 0
        }

        const cameraX = nextCameraPosition.x + pointerX * cameraMouseFactor * clampedDistanceFactor
        const cameraY = nextCameraPosition.y + pointerY * cameraMouseFactor * clampedDistanceFactor
        const cameraZ =
            nextCameraPosition.y < 1.58 || scrollTop <= contentPageHeight
                ? nextCameraPosition.z
                : nextCameraPosition.z - pointerX * cameraMouseFactor * clampedDistanceFactor

        cameraControlRef.current!.setLookAt(
            cameraX,
            cameraY,
            cameraZ,
            nextCameraLookAt.x,
            nextCameraLookAt.y,
            nextCameraLookAt.z,
            true
        )
    })

    return <CameraControls ref={cameraControlRef} smoothTime={0.4} />
}

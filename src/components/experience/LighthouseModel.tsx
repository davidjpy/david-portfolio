import * as THREE from 'three'
import { useContext, useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, shaderMaterial, useScroll } from '@react-three/drei'

import { AppContext } from '@/src/context/appContext'
import canvasVertexShader from '@/shaders/canvas/canvasVertexShader.glsl'
import canvasFragmentShader from '@/shaders/canvas/canvasFragmentShader.glsl'
import { scrollPages } from '@/src/utilities/constants'

import type { GLTF } from 'three-stdlib'
import type { Object3DNode } from '@react-three/fiber'

interface CanvasPhotosUniforms {
    uArtTexture: THREE.Texture
    uPhotoTexture: THREE.Texture
    uDisplacementTexture: THREE.Texture
    uEffectFactor: number
    uDisplacementFactor: number
}

declare module '@react-three/fiber' {
    interface ThreeElements {
        canvasPhotosMaterial: Object3DNode<typeof CanvasPhotosMaterial, typeof CanvasPhotosMaterial> &
            CanvasPhotosUniforms
    }
}

const CanvasPhotosMaterial = shaderMaterial(
    {
        uArtTexture: null,
        uPhotoTexture: null,
        uDisplacementTexture: null,
        uEffectFactor: 1.2,
        uDisplacementFactor: 0
    },
    canvasVertexShader,
    canvasFragmentShader
)

extend({ CanvasPhotosMaterial })

type GLTFResult = GLTF & {
    nodes: {
        lightHouse: THREE.Mesh
        wall: THREE.Mesh
        ['1stFloor']: THREE.Mesh
        globe: THREE.Mesh
        lightBulb: THREE.Mesh
        ['2ndFloor']: THREE.Mesh
    }
    materials: {}
}

export default function LighthouseModel(props: JSX.IntrinsicElements['group']) {
    const { isLightMode } = useContext(AppContext)
    const canvasPhotosRef = useRef(null!)
    const wallMaterialRef = useRef<THREE.MeshBasicMaterial>(null!)
    const scrollData = useScroll()
    const { nodes } = useGLTF('/lighthouse.glb') as GLTFResult
    const [
        lighthouseTexture,
        firstFloorTexture,
        secondFloorTexture,
        davidArtTexture,
        davidPhotoTexture,
        displacementTexture
    ] = useTexture([
        '/lighthouse_bake.webp',
        '/lighthouse_1stFloor_bake.webp',
        '/lighthouse_2ndFloor_bake.webp',
        '/david_art.webp',
        '/david_photo.webp',
        '/water_displacement_map.jpg'
    ])
    lighthouseTexture.flipY = false
    firstFloorTexture.flipY = false
    secondFloorTexture.flipY = false

    useFrame((_state, delta) => {
        const dampedDisplacementFactor = THREE.MathUtils.damp(
            (canvasPhotosRef as React.MutableRefObject<CanvasPhotosUniforms>).current.uDisplacementFactor,
            isLightMode ? 0 : 1,
            3.5,
            delta
        ) as number
        ;(canvasPhotosRef as React.MutableRefObject<CanvasPhotosUniforms>).current.uDisplacementFactor =
            dampedDisplacementFactor

        const isInInterior = scrollData.visible(4 / scrollPages, 1)
        const dampedWallOpacity = THREE.MathUtils.damp(wallMaterialRef.current.opacity, isInInterior ? 0 : 1, 5, delta)
        wallMaterialRef.current.opacity = dampedWallOpacity
    })

    return (
        // <group {...props} dispose={null} scale={0.4} rotation={[0, -Math.PI * 0.23, 0]}>
        //     <mesh
        //         name='lighthouse'
        //         geometry={nodes.lighthouse.geometry}
        //         material={nodes.lighthouse.material}
        //         position={[-0.278, 0.896, -0.177]}
        //         rotation={[0, -0.523, 0]}
        //     >
        //         <meshBasicMaterial map={lighthouseTexture} />
        //     </mesh>
        //     <mesh
        //         name='rockFormation'
        //         geometry={nodes.rockFormation.geometry}
        //         material={nodes.rockFormation.material}
        //         position={[0.007, 0, -0.009]}
        //         rotation={[0, 0.051, 0]}
        //     >
        //         <meshBasicMaterial map={lighthouseTexture} />
        //     </mesh>
        //     <mesh
        //         name='lampLight'
        //         geometry={nodes.lampLight.geometry}
        //         position={[-0.338, 0.896, -0.215]}
        //         rotation={[0, -0.523, 0]}
        //     >
        //         <meshBasicMaterial color='#C0E8FF' />
        //     </mesh>
        //     <mesh
        //         name='windowLight'
        //         geometry={nodes.windowLight.geometry}
        //         position={[-0.126, 1.613, -0.094]}
        //         rotation={[0, -0.523, 0]}
        //     >
        //         <meshBasicMaterial color='#C0E8FF' />
        //     </mesh>
        //     <mesh
        //         name='canvas'
        //         position={[0.1046, 1.0029, -0.2768]}
        //         rotation={[-0.1825, 0.3334, 0.063]}
        //         scale-x={0.06}
        //         scale-y={0.081}
        //         scale-z={0.0028}
        //     >
        //         <boxGeometry args={[1, 1, 1]} />
        //         <meshBasicMaterial color='#EDEBE8' />
        //     </mesh>
        //     <mesh
        //         name='canvasPhotos'
        //         position={[0.1051, 1.0029, -0.2753]}
        //         rotation={[-0.1825, 0.3334, 0.063]}
        //         scale-x={0.06}
        //         scale-y={0.081}
        //         scale-z={0.0028}
        //     >
        //         <planeGeometry args={[1, 1, 1, 1]} />
        //         <canvasPhotosMaterial
        //             ref={canvasPhotosRef as React.MutableRefObject<CanvasPhotosUniforms & typeof CanvasPhotosMaterial>}
        //             uArtTexture={davidArtTexture}
        //             uPhotoTexture={davidPhotoTexture}
        //             uDisplacementTexture={displacementTexture}
        //             uEffectFactor={1.2}
        //             uDisplacementFactor={0}
        //         />
        //     </mesh>
        // </group>

        <group {...props} dispose={null} scale={0.3} rotation={[0, -Math.PI * 0.6, 0]}>
            <mesh
                name='lightHouse'
                geometry={nodes.lightHouse.geometry}
                material={nodes.lightHouse.material}
                position={[-0.062, 0, 0.115]}
            >
                <meshBasicMaterial map={lighthouseTexture} />
            </mesh>
            <mesh name='wall' geometry={nodes.wall.geometry} material={nodes.wall.material}>
                <meshBasicMaterial ref={wallMaterialRef} map={lighthouseTexture} transparent />
            </mesh>
            <mesh
                name='canvasPhotos'
                position={[0.1561, 4.63, -0.8761]}
                rotation={[-0.4405, 1.198, 0.414]}
                scale-x={0.213}
                scale-y={0.293}
            >
                <planeGeometry args={[1, 1, 1, 1]} />
                <canvasPhotosMaterial
                    ref={canvasPhotosRef as React.MutableRefObject<CanvasPhotosUniforms & typeof CanvasPhotosMaterial>}
                    uArtTexture={davidArtTexture}
                    uPhotoTexture={davidPhotoTexture}
                    uDisplacementTexture={displacementTexture}
                    uEffectFactor={1.2}
                    uDisplacementFactor={0}
                />
            </mesh>

            <mesh
                name='1stFloor'
                geometry={nodes['1stFloor'].geometry}
                material={nodes['1stFloor'].material}
                position={[0.083, 5.031, 0.049]}
                rotation={[0, 0.439, 0]}
            >
                <meshBasicMaterial map={firstFloorTexture} />
            </mesh>
            <mesh
                name='globe'
                geometry={nodes.globe.geometry}
                material={nodes.globe.material}
                position={[0.083, 5.031, 0.049]}
                rotation={[0, 0.439, 0]}
            >
                <meshBasicMaterial map={firstFloorTexture} />
            </mesh>
            <mesh
                name='lightBulb'
                geometry={nodes.lightBulb.geometry}
                material={nodes.lightBulb.material}
                position={[0.083, 5.031, 0.049]}
                rotation={[0, 0.439, 0]}
            >
                <meshBasicMaterial color='white' />
            </mesh>

            <mesh
                name='2ndFloor'
                geometry={nodes['2ndFloor'].geometry}
                material={nodes['2ndFloor'].material}
                position={[-0.156, 5.38, 0.019]}
                rotation={[0, 0.439, 0]}
            >
                <meshBasicMaterial map={secondFloorTexture} />
            </mesh>
        </group>
    )
}

useGLTF.preload('/lighthouse.glb')

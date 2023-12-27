import * as THREE from 'three'
import { useContext, useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, shaderMaterial } from '@react-three/drei'
// import { useControls } from 'leva'

import { AppContext } from '@/src/context/appContext'
import canvasVertexShader from '@/shaders/canvas/canvasVertexShader.glsl'
import canvasFragmentShader from '@/shaders/canvas/canvasFragmentShader.glsl'

import type { GLTF } from 'three-stdlib'
import type { Object3DNode } from '@react-three/fiber'

interface CanvasPhotosUniforms {
    uArtTexture: THREE.Texture
    uPhotoTexture: THREE.Texture
    uDisplacementTexture: THREE.Texture
    effectFactor: number,
    displacementFactor: number
}

declare module '@react-three/fiber' {
    interface ThreeElements {
        canvasPhotosMaterial: Object3DNode<typeof CanvasPhotosMaterial, typeof CanvasPhotosMaterial> & CanvasPhotosUniforms
    }
}

const CanvasPhotosMaterial = shaderMaterial(
    {
        uArtTexture: null,
        uPhotoTexture: null,
        uDisplacementTexture: null,
        effectFactor: 1.2,
        displacementFactor: 0
    },
    canvasVertexShader,
    canvasFragmentShader
)

extend({ CanvasPhotosMaterial })

type GLTFResult = GLTF & {
    nodes: {
        lighthouse: THREE.Mesh
        lampLight: THREE.Mesh
        rockFormation: THREE.Mesh
        windowLight: THREE.Mesh
    }
    materials: {}
}

export default function LighthouseModel(props: JSX.IntrinsicElements['group']) {
    const { isLightMode } = useContext(AppContext)
    const canvasPhotosRef = useRef<unknown>()
    const { nodes } = useGLTF('/lighthouse.glb') as GLTFResult
    const [lighthouseTexture, davidArtTexture, davidPhotoTexture, displacementTexture] = useTexture([
        '/lighthouse_bake.jpg',
        '/david_art.webp',
        '/david_photo.webp',
        '/water_displacement_map.jpg'
    ])
    lighthouseTexture.flipY = false

    // const { position, rotation } = useControls('Canvas', {
    //     position: {
    //         value: [0.1051, 1.0029, -0.2751]
    //     },
    //     rotation: {
    //         value: [-0.1825, 0.3334, 0.063]
    //     }
    //     // scaleX: {
    //     //     value: 1,
    //     //     step: 0.001
    //     // },
    //     // scaleY: {
    //     //     value: 1,
    //     //     step: 0.001
    //     // },
    //     // scaleZ: {
    //     //     value: 1,
    //     //     step: 0.001
    //     // }
    // })
    // console.log(position)

    useFrame((_state, delta) => {
        if (canvasPhotosRef.current) {
            const dampedDisplacementFactor = THREE.MathUtils.damp((canvasPhotosRef as React.MutableRefObject<CanvasPhotosUniforms>).current.displacementFactor, isLightMode ? 0 : 1, 1.4, delta) as number
            (canvasPhotosRef as React.MutableRefObject<CanvasPhotosUniforms>).current.displacementFactor = dampedDisplacementFactor
        }
    })

    return (
        <group {...props} dispose={null} scale={0.4} rotation={[0, -Math.PI * 0.23, 0]}>
            <mesh
                name='lighthouse'
                geometry={nodes.lighthouse.geometry}
                material={nodes.lighthouse.material}
                position={[-0.278, 0.896, -0.177]}
                rotation={[0, -0.523, 0]}
            >
                <meshBasicMaterial map={lighthouseTexture} />
            </mesh>
            <mesh
                name='rockFormation'
                geometry={nodes.rockFormation.geometry}
                material={nodes.rockFormation.material}
                position={[0.007, 0, -0.009]}
                rotation={[0, 0.051, 0]}
            >
                <meshBasicMaterial map={lighthouseTexture} />
            </mesh>
            <mesh
                name='lampLight'
                geometry={nodes.lampLight.geometry}
                position={[-0.338, 0.896, -0.215]}
                rotation={[0, -0.523, 0]}
            >
                <meshBasicMaterial color='#C0E8FF' />
            </mesh>
            <mesh
                name='windowLight'
                geometry={nodes.windowLight.geometry}
                position={[-0.126, 1.613, -0.094]}
                rotation={[0, -0.523, 0]}
            >
                <meshBasicMaterial color='#C0E8FF' />
            </mesh>
            <mesh
                name='canvas'
                position={[0.1046, 1.0029, -0.2768]}
                rotation={[-0.1825, 0.3334, 0.063]}
                scale-x={0.06}
                scale-y={0.081}
                scale-z={0.0028}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color='#EDEBE8' />
            </mesh>
            <mesh
                name='canvasPhotos'
                position={[0.1051, 1.0029, -0.2753]}
                rotation={[-0.1825, 0.3334, 0.063]}
                scale-x={0.06}
                scale-y={0.081}
                scale-z={0.0028}
            >
                <planeGeometry args={[1, 1, 1, 1]} />
                <canvasPhotosMaterial
                    ref={canvasPhotosRef as React.MutableRefObject<CanvasPhotosUniforms & typeof CanvasPhotosMaterial>}
                    uArtTexture={davidArtTexture}
                    uPhotoTexture={davidPhotoTexture}
                    uDisplacementTexture={displacementTexture}
                    effectFactor={1.2}
                    displacementFactor={0}
                />
            </mesh>
        </group>
    )
}

useGLTF.preload('/lighthouse.glb')

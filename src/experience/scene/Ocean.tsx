import { useCallback, useContext } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'
// import { useControls } from 'leva'

import { AppContext } from '@/src/context/appContext'
import oceanVertexShader from '@/shaders/ocean/oceanVertexShader.glsl'
import oceanFragmentShader from '@/shaders/ocean/oceanFragmentShader.glsl'

import type { Object3DNode } from '@react-three/fiber'

const OceanMaterialUniform = {
    uTime: 0,
    uBigWavesElevation: 0.15,
    uBigWavesFrequency: [1, 2],
    uBigWavesSpeed: 0.4,

    uDepthColor: new THREE.Color('#125089'),
    uSurfaceColor: new THREE.Color('#95ccf8'),
    uColorOffset: 0.3,
    uColorMultiplier: 3,

    uSmallWavesElevation: 0.17,
    uSmallWavesFrequency: 3,
    uSmallWavesSpeed: 0.35,
    uSmallWavesIteration: 4
}

declare module '@react-three/fiber' {
    interface ThreeElements {
        oceanMaterial: Object3DNode<typeof OceanMaterial, typeof OceanMaterial>
    }
}

interface Props {
    oceanRef: React.MutableRefObject<unknown>
}

const OceanMaterial = shaderMaterial(OceanMaterialUniform, oceanVertexShader, oceanFragmentShader)
extend({ OceanMaterial })

export function Ocean({ oceanRef }: Props) {
    const { isLightMode } = useContext(AppContext)
    const starsAnimationConfigs = useSpring({
        uColorOffset: isLightMode ? 0.3 : 0.2,
        uColorMultiplier: isLightMode ? 3 : 2.5
    })

    const AnimatedMaterial = useCallback(
        animated((props: typeof starsAnimationConfigs) => {
            return (
                <oceanMaterial
                    ref={oceanRef as React.MutableRefObject<typeof OceanMaterial & typeof OceanMaterialUniform>}
                    {...props}
                />
            )
        }),
        []
    )

    // const { uBigWavesElevation, uBigWavesFrequency, uSmallWavesElevation, uSmallWavesFrequency } =
    //     useControls('Ocean', {
    //         // uDepthColor: {
    //         //     value: '#125089'
    //         // },
    //         // uSurfaceColor: {
    //         //     value: '#95ccf8'
    //         // },
    //         // uColorOffset: {
    //         //     value: OceanMaterialUniform.uColorOffset,
    //         //     step: 0.01
    //         // },
    //         // uColorMultiplier: {
    //         //     value: OceanMaterialUniform.uColorMultiplier,
    //         //     step: 0.1
    //         // }
    //         uBigWavesElevation: {
    //             value: OceanMaterialUniform.uBigWavesElevation,
    //             step: 0.1
    //         },
    //         uBigWavesFrequency: {
    //             value: OceanMaterialUniform.uBigWavesFrequency,
    //             step: 0.1
    //         },
    //         uSmallWavesElevation: {
    //             value: OceanMaterialUniform.uSmallWavesElevation,
    //             step: 0.1
    //         },
    //         uSmallWavesFrequency: {
    //             value: OceanMaterialUniform.uSmallWavesFrequency,
    //             step: 0.1
    //         }
    //     })

    useFrame((_state, delta) => {
        if (oceanRef.current) {
            // console.log(oceanRef.current.uColorOffset)
            ;(oceanRef as React.MutableRefObject<typeof OceanMaterial & typeof OceanMaterialUniform>).current.uTime +=
                delta

            // oceanRef.current.uBigWavesElevation = uBigWavesElevation
            // oceanRef.current.uBigWavesFrequency = uBigWavesFrequency
            // oceanRef.current.uBigWavesSpeed = uBigWavesSpeed
            // oceanRef.current.uDepthColor = new THREE.Color(uDepthColor)
            // oceanRef.current.uSurfaceColor = new THREE.Color(uSurfaceColor)
            // oceanRef.current.uColorOffset = uColorOffset
            // oceanRef.current.uColorMultiplier = uColorMultiplier
            // oceanRef.current.uSmallWavesElevation = uSmallWavesElevation
            // oceanRef.current.uSmallWavesFrequency = uSmallWavesFrequency
            // oceanRef.current.uSmallWavesSpeed = uSmallWavesSpeed
            // oceanRef.current.uSmallWavesIteration = uSmallWavesIteration
        }
    })

    return (
        <mesh name='ocean' position={[0, 0.95, 0]} rotation={[-Math.PI * 0.5, 0, 0]} scale={[16, 8, 0]}>
            <planeGeometry args={[1, 1, 256, 256]} />
            <AnimatedMaterial {...starsAnimationConfigs} />
        </mesh>
    )
}

import { useCallback, useContext } from 'react'
import { Center, Sky, Stars, Sparkles, Html, useScroll } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

import { AppContext } from '@/src/context/appContext'
import LighthouseModel from '@/components/experience/LighthouseModel'
import Ocean from '@/components/experience/Ocean'
import { maxBrightness, minBrightness } from '@/src/utilities/constants'

interface Props {
    oceanRef: React.MutableRefObject<unknown>
}

export default function LighthouseScene({ oceanRef }: Props) {
    const { brightness, isLightMode } = useContext(AppContext)
    const scrollData = useScroll()
    const AnimatedSky = animated(Sky)
    const AnimatedStars = animated(Stars)
    const AnimatedSparkles = useCallback(
        animated((props: typeof sparklesAnimationConfigs) => {
            return (
                <Sparkles
                    {...(props as any)}
                    count={30}
                    speed={0.1}
                    scale={[0.5, 0.4, 0.5]}
                    position={[0, 0.2, -0.1]}
                    color='#fff3a1'
                    opacity={0.7}
                />
            )
        }),
        []
    )

    const brightnessSpring = useSpring({ brightness })

    const skyAnimationConfigs = useSpring({
        'material-uniforms-sunPosition-value-x': brightnessSpring.brightness.to(
            [minBrightness, maxBrightness],
            [750, -500]
        ),
        'material-uniforms-sunPosition-value-y': brightnessSpring.brightness.to(
            [minBrightness, 35, 53, 60, 70, 80, maxBrightness],
            [-80, -30, 100, 140, 160, 140, 80]
        ),
        'material-uniforms-mieCoefficient-value': brightnessSpring.brightness.to(
            [minBrightness, 35, 36, 70, maxBrightness],
            [0.15, 0.15, 0.002, 0.004, 0.002]
        ),
        config: (key) => {
            switch (key) {
                case 'material-uniforms-mieCoefficient-value':
                    return { tension: 230, friction: 30, precision: 0.0001, clamp: true }

                default:
                    return { tension: 230, friction: 30 }
            }
        }
    })

    const starsAnimationConfigs = useSpring({
        visible: isLightMode ? false : true
    })

    const sparklesAnimationConfigs = useSpring({
        size: isLightMode ? 0 : 3
    })

    return (
        <group name='lighthouseScene'>
            <Center>
                <LighthouseModel />
                <Ocean oceanRef={oceanRef} />
            </Center>
            <AnimatedSky
                {...skyAnimationConfigs}
                material-uniforms-sunPosition-value-z={-600}
                distance={3000}
                mieDirectionalG={0.9995}
                rayleigh={0.4}
            />
            <AnimatedStars {...starsAnimationConfigs} radius={10} depth={5} count={3000} factor={0.8} fade speed={0} />
            <AnimatedSparkles {...sparklesAnimationConfigs} />
            <Html distanceFactor={1.6} center portal={{ current: scrollData.fixed }} position={[-0.26, 0.38, 0]}>
                <h1 className='w-48 animate-dropIn select-none text-center text-lg font-extrabold text-secondary'>
                    Wellcome to
                </h1>
            </Html>
            <Html distanceFactor={1.6} center portal={{ current: scrollData.fixed }} position={[0.24, 0.3, 0]}>
                <h1 className='w-56 animate-dropIn select-none text-center text-lg font-extrabold text-secondary'>
                    <span className='text-accent'>David's</span> portfolio
                </h1>
            </Html>
        </group>
    )
}

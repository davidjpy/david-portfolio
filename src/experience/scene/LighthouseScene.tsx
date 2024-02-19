import { useCallback, useContext } from 'react'
import { Sky, Stars, Sparkles } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

import { AppContext } from '@/src/context/appContext'
import LighthouseModel from '@/experience/scene/LighthouseModel'
import Ocean from '@/experience/scene/Ocean'
import { maxBrightness, minBrightness } from '@/src/utilities/constants'

interface Props {
    oceanRef: React.MutableRefObject<unknown>
}

export default function LighthouseScene({ oceanRef }: Props) {
    const { brightness, isLightMode } = useContext(AppContext)
    const AnimatedSky = animated(Sky)
    const AnimatedStars = animated(Stars)
    const AnimatedSparkles = useCallback(
        animated((props: typeof sparklesAnimationConfigs) => {
            return (
                <Sparkles
                    {...(props as any)}
                    count={50}
                    speed={0.1}
                    scale={[1, 1, 1]}
                    position={[0, 0.75, -0.15]}
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
            <LighthouseModel />
            <Ocean oceanRef={oceanRef} />
            <AnimatedSky
                {...skyAnimationConfigs}
                material-uniforms-sunPosition-value-z={-600}
                distance={3000}
                mieDirectionalG={0.9995}
                rayleigh={0.4}
            />
            <AnimatedStars {...starsAnimationConfigs} radius={10} depth={5} count={1800} factor={0.8} fade speed={0} />
            <AnimatedSparkles {...sparklesAnimationConfigs} />
            {/* <Html distanceFactor={2} center portal={{ current: scrollData.fixed }} position={[-0.44, 1, 0]}>
                <h1 className='w-[260px] animate-dropIn select-none text-center text-xl font-extrabold text-secondary'>
                    Wellcome to
                </h1>
            </Html>
            <Html distanceFactor={2} center portal={{ current: scrollData.fixed }} position={[0.54, 0.8, 0]}>
                <h1 className='w-[400px] animate-dropIn select-none text-center text-xl font-extrabold text-secondary'>
                    <span className='text-accent'>David's</span> portfolio
                </h1>
            </Html> */}
        </group>
    )
}

import { useEffect, useRef, useState, useContext } from 'react'
import { Html, useScroll } from '@react-three/drei'
import { animated, config, useSprings, useSpring } from '@react-spring/web'
import { IoSunny, IoMoon } from 'react-icons/io5'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

import { AppContext } from '@/src/context/appContext'
import { getInterpolatedValue } from '@/src/utilities/getInterpolatedValue'
import {
    latestHoursInMinutes,
    earliestHoursInMinutes,
    minBrightness,
    maxBrightness,
    aboutSectionTop,
    skillsSectionTop,
    studySectionTop,
    lifeSectionTop,
    worksSectionTop,
    testimonialsSectionTop
} from '@/src/utilities/constants'

const containerHeight = 150
const extraPaddingTop = 20

const toDos = [
    { name: 'Get Coffee', icon: '☕' },
    { name: 'Team Meeting', icon: '🎧' },
    { name: 'Coding', icon: '💻' },
    { name: 'Tasty Bento', icon: '🍱' },
    { name: 'More Coffee!', icon: '☕' },
    { name: 'Debugging', icon: '🐛' },
    { name: 'Hit the Gym', icon: '🏃' },
    { name: 'Light Dinner', icon: '🍙' },
    { name: 'Studying', icon: '📖' },
    { name: 'Gaming', icon: '🎮' },
    { name: 'Bed Time', icon: '🛏️' }
]

const navTab = [
    { name: 'About', top: aboutSectionTop },
    { name: 'Skill', top: skillsSectionTop },
    { name: 'Study', top: studySectionTop },
    { name: 'Life', top: lifeSectionTop },
    { name: 'Work', top: worksSectionTop },
    { name: 'Ack', top: testimonialsSectionTop }
]

const timeSymbols = [<IoSunny size={20} />, <IoMoon size={18} />]

export default function ControlPanel() {
    const scrollData = useScroll()
    const htmlContainerRef = useRef<HTMLDivElement>(null)
    const [time, setTime] = useState<number[]>([0, 0, 0, 0, 0])
    const [toDoIndex, setTodoIndex] = useState<number>(0)
    const [timeSymbolIndex, setTimeSymbolIndex] = useState<number>(0)
    const [shouldShowSlider, setShouldShowSlider] = useState<boolean>(true)
    const { brightness, handleSetBrightness } = useContext(AppContext)

    const handlePositionSlider = () => {
        if (htmlContainerRef.current) {
            htmlContainerRef.current.style.left = `${window.innerWidth - 440}px`
        }
    }

    const handleClickToggleSlider = () => {
        setShouldShowSlider(!shouldShowSlider)
    }

    useEffect(() => {
        window.addEventListener('resize', handlePositionSlider)

        return () => {
            window.removeEventListener('resize', handlePositionSlider)
        }
    }, [])

    useEffect(() => {
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(() => {
                scrollData.fixed.style.zIndex = '1'
                scrollData.fixed.style.removeProperty('height')
                scrollData.fixed.style.removeProperty('width')
                scrollData.fixed.style.removeProperty('overflow')
            })
        })

        observer.observe(scrollData.fixed, { attributes: true, attributeFilter: ['style'] })

        return () => {
            observer.disconnect()
        }
    }, [])

    useEffect(() => {
        const currentHoursInMinutes = getInterpolatedValue(
            [latestHoursInMinutes, earliestHoursInMinutes],
            brightness,
            minBrightness,
            maxBrightness
        )

        let minutesPosition = String(Math.floor(currentHoursInMinutes % 60))
        let hoursPositionInTwentyFourHourClock = Math.floor(currentHoursInMinutes / 60)
        let hoursPosition = String(
            hoursPositionInTwentyFourHourClock - Math.floor((hoursPositionInTwentyFourHourClock - 1) / 12) * 12
        )

        if (isSingleDigit(minutesPosition)) {
            minutesPosition = `0${minutesPosition}`
        }

        if (isSingleDigit(hoursPosition)) {
            hoursPosition = `0${hoursPosition}`
        }

        if (hoursPositionInTwentyFourHourClock < 10) {
            setTodoIndex(0)
        } else if (hoursPositionInTwentyFourHourClock < 11) {
            setTodoIndex(1)
        } else if (hoursPositionInTwentyFourHourClock < 13) {
            setTodoIndex(2)
        } else if (hoursPositionInTwentyFourHourClock < 14) {
            setTodoIndex(3)
        } else if (hoursPositionInTwentyFourHourClock < 15) {
            setTodoIndex(4)
        } else if (hoursPositionInTwentyFourHourClock < 18) {
            setTodoIndex(5)
        } else if (hoursPositionInTwentyFourHourClock < 19) {
            setTodoIndex(6)
        } else if (hoursPositionInTwentyFourHourClock < 20) {
            setTodoIndex(7)
        } else if (hoursPositionInTwentyFourHourClock < 22) {
            setTodoIndex(8)
        } else if (hoursPositionInTwentyFourHourClock < 23) {
            setTodoIndex(9)
        } else {
            setTodoIndex(10)
        }

        if (hoursPositionInTwentyFourHourClock < 18) {
            setTimeSymbolIndex(0)
        } else {
            setTimeSymbolIndex(1)
        }

        setTime([
            Number(hoursPosition[0]),
            Number(hoursPosition[1]),
            Number(minutesPosition[0]),
            Number(minutesPosition[1]),
            Math.floor(hoursPositionInTwentyFourHourClock / 12)
        ])
    }, [brightness])

    const isSingleDigit = (value: number | string): boolean => {
        return String(value).length === 1
    }

    const [clockDigitSpring] = useSprings(
        5,
        (index) => ({
            transform: `translateY(-${Number(time[index]) * (index < 4 ? 24 : 10)}px)`,
            config: config.stiff
        }),
        [time]
    )

    const [toDoSpring] = useSprings(
        1,
        () => ({
            transform: `translateY(-${toDoIndex * 50}px)`,
            config: config.stiff
        }),
        [toDoIndex]
    )

    const [timeSymbolSpring] = useSprings(
        1,
        () => ({
            transform: `translateY(-${timeSymbolIndex * 26}px)`,
            config: config.stiff
        }),
        [timeSymbolIndex]
    )

    const AnimatedHtml = animated(Html)
    const htmlSpring = useSpring({
        transform: shouldShowSlider ? `translateY(-${extraPaddingTop}px)` : `translateY(-${containerHeight}px)`,
        boxShadow: shouldShowSlider ? '' : 'none',
        config: config.stiff
    })

    return (
        <AnimatedHtml
            as='section'
            ref={htmlContainerRef}
            calculatePosition={() => {
                return [0, 0]
            }}
            portal={{ current: scrollData.fixed }}
            zIndexRange={[100, 100]}
            className='top-0 grid w-[400px] grid-cols-7 grid-rows-3 gap-[6px] rounded-b-[12px] bg-black/40 p-[8px] pt-[28px] text-center text-white shadow-xl backdrop-blur-sm'
            style={{
                left: window.innerWidth - 440,
                height: containerHeight,
                ...htmlSpring
            }}
        >
            <div className='clock-blackground-md col-span-3 row-span-1 select-none'>
                <label className='flex-center h-full'>
                    {clockDigitSpring.slice(0, 2).map((props, index) => (
                        <span key={index} className='clock-list-xl'>
                            <animated.ul style={props}>
                                {[...Array(10).keys()].map((num) => (
                                    <li key={num}>{num}</li>
                                ))}
                            </animated.ul>
                        </span>
                    ))}
                    <span className='clock-list-xl ml-[2px] mr-[2px]'>:</span>
                    {clockDigitSpring.slice(2, 4).map((props, index) => (
                        <span key={index} className='clock-list-xl'>
                            <animated.ul style={props}>
                                {[...Array(10).keys()].map((num) => (
                                    <li key={num}>{num}</li>
                                ))}
                            </animated.ul>
                        </span>
                    ))}
                    <span className='clock-list-sm ml-[4px] self-start'>
                        <animated.ul style={clockDigitSpring[4]}>
                            <li>A</li>
                            <li>P</li>
                        </animated.ul>
                    </span>
                    <span className='clock-list-sm self-start'>M</span>
                </label>
            </div>

            <div className='clock-blackground-sm col-span-1 row-span-1 overflow-hidden text-[16px]'>
                <animated.ul style={timeSymbolSpring[0]}>
                    {timeSymbols.map((symbol, index) => (
                        <li key={index} className='flex-center h-[26px]'>
                            {symbol}
                        </li>
                    ))}
                </animated.ul>
            </div>

            <div className='clock-blackground-sm col-span-3 row-span-2 p-0'>
                <header className='flex-center h-[24px] w-full rounded-t-[8px] bg-[#d6493fd2] text-[12px] shadow-lg'>
                    <h1>Timetable</h1>
                </header>
                <span className='block h-[50px] overflow-hidden'>
                    <animated.ul style={toDoSpring[0]}>
                        {toDos.map((todo, index) => (
                            <li key={index} className='flex-center h-[50px] text-[16px] font-bold'>
                                <p>{todo.name}</p>
                                <span className='ml-[4px]'>{todo.icon}</span>
                            </li>
                        ))}
                    </animated.ul>
                </span>
            </div>

            <div className='relative col-span-4 row-span-1 overflow-hidden rounded-full shadow-lg'>
                <IoMoon size={16} className='pointer-events-none absolute left-[8px] top-1/2 -translate-y-1/2' />
                <label
                    htmlFor='brightnessSlider'
                    className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm tracking-wide'
                >
                    Time Machine
                </label>
                <input
                    type='range'
                    id='brightnessSlider'
                    min={minBrightness}
                    max={maxBrightness}
                    value={brightness}
                    step={1}
                    onChange={(e) => handleSetBrightness(Number(e.target.value))}
                    className='brightness-slider'
                    aria-label='Brightness Slider'
                />
                <IoSunny size={18} className='pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2' />
            </div>

            <ul className='clock-blackground-sm col-span-7 row-span-1 flex items-center justify-evenly rounded-[8px]'>
                {navTab.map((tab, index) => (
                    <li
                        key={index}
                        className='tab-list-item'
                        onClick={() => scrollData.el.scrollTo({ top: tab.top, behavior: 'smooth' })}
                    >
                        {tab.name}
                    </li>
                ))}
            </ul>

            <span
                onClick={handleClickToggleSlider}
                className='absolute bottom-0 right-0 -translate-x-1/2 translate-y-full cursor-pointer rounded-b-[8px] bg-clock-element shadow-lg transition-colors hover:bg-black'
            >
                {shouldShowSlider ? (
                    <IoIosArrowUp
                        strokeWidth={16}
                        preserveAspectRatio='none'
                        className='ml-[6px] mr-[6px] h-[22px] w-[30px]'
                    />
                ) : (
                    <IoIosArrowDown
                        strokeWidth={16}
                        preserveAspectRatio='none'
                        className='ml-[6px] mr-[6px] h-[22px] w-[30px]'
                    />
                )}
            </span>
        </AnimatedHtml>
    )
}

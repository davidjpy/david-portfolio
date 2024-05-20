import { useEffect, useRef, forwardRef } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6'

import type { positionValues } from 'react-custom-scrollbars-2'

interface Props extends React.ComponentProps<'section'> {
    top: number
    position: 'left' | 'right'
    backgroundTitle: string
    topTitle: string
    bottomTitle: JSX.Element
    contentObserverRef: React.MutableRefObject<IntersectionObserver | null>
    children: React.ReactNode
}

const scrollIndicatorHeight = 20

const HtmlScrollContainer = forwardRef<HTMLElement, Props>(
    ({ top, position, backgroundTitle, topTitle, bottomTitle, contentObserverRef, children, ...props }, ref) => {
        const containerHeaderRef = useRef<HTMLHeadElement>(null)
        const topScrollIndicatorRef = useRef<HTMLSpanElement>(null)
        const bottomScrollIndicatorRef = useRef<HTMLSpanElement>(null)

        useEffect(() => {
            if (containerHeaderRef.current) {
                contentObserverRef.current?.observe(containerHeaderRef.current)
            }

            return () => {
                if (containerHeaderRef.current) {
                    contentObserverRef.current?.unobserve(containerHeaderRef.current)
                }
            }
        }, [])

        const handleUpdateScrollContainer = (value: positionValues) => {
            console.log(value)
            if (topScrollIndicatorRef.current && bottomScrollIndicatorRef.current) {
                topScrollIndicatorRef.current.style.top = `${value.scrollTop}px`
                bottomScrollIndicatorRef.current.style.top = `${
                    value.clientHeight + value.scrollTop - scrollIndicatorHeight
                }px`
            }
        }

        return (
            <section
                data-position={position}
                className='absolute -z-50 flex h-[2160px] w-1/2 flex-col overflow-hidden bg-primary pb-[250px] pt-[300px] shadow-2xl [transition:border-radius_0.1s_ease-out] max-mobile:w-full'
                style={{
                    top: top,
                    right: position === 'right' ? 0 : undefined
                }}
                ref={ref}
                {...props}
            >
                <span className='opacity-1 pointer-events-none absolute left-[176px] top-[160px] -z-50 translate-x-[40px] text-[250px] font-black text-primary-monochrome opacity-0 [transition:transform_0.6s_ease-out_0.4s,opacity_0.6s_ease-out_0.4s]'>
                    {backgroundTitle}
                </span>

                <header
                    data-name='ch'
                    ref={containerHeaderRef}
                    className='mb-[48px] pl-[80px] pr-[80px] max-[1669px]:pl-[60px] max-[1669px]:pr-[60px] max-2xl:pl-[40px] max-2xl:pr-[40px] max-xl:pl-[16px] max-xl:pr-[16px]'
                >
                    <div className='mb-4 h-2 w-0 bg-accent transition-[width] duration-[1s] ease-out' />
                    <h1 className='hidden-content text-xl font-bold text-secondary [transition:transform_0.6s_ease-out_0.4s,opacity_0.6s_ease-out_0.4s] sm:text-2xl'>
                        {topTitle}
                    </h1>
                    <div className='hidden-content text-3xl font-black text-secondary [transition:transform_0.6s_ease-out_0.4s,opacity_0.6s_ease-out_0.4s] sm:text-4xl'>
                        {bottomTitle}
                    </div>
                </header>
                <Scrollbars
                    onUpdate={handleUpdateScrollContainer}
                    renderTrackVertical={(props) => (
                        <div
                            {...props}
                            className='absolute bottom-[2px] top-[2px] w-[6px]'
                            style={{
                                right: position === 'right' ? '6px' : undefined,
                                left: position === 'left' ? '6px' : undefined
                            }}
                        />
                    )}
                    renderThumbVertical={(props) => (
                        <div
                            {...props}
                            className='rounded-full bg-secondary opacity-30 transition-opacity duration-100 ease-out active:opacity-70 group-hover/scroll:opacity-50'
                        />
                    )}
                    renderView={(props) => (
                        <div
                            {...props}
                            className='relative pl-[80px] pr-[80px] max-[1669px]:pl-[60px] max-[1669px]:pr-[60px] max-2xl:pl-[40px] max-2xl:pr-[40px] max-xl:pl-[16px] max-xl:pr-[16px]'
                        />
                    )}
                    className='group/scroll'
                >
                    <span
                        ref={topScrollIndicatorRef}
                        className='absolute top-0 z-50 w-[calc(100%-160px)] bg-[#000000] text-white max-[1669px]:w-[calc(100%-120px)] max-2xl:w-[calc(100%-80px)] max-xl:w-[calc(100%-32px)]'
                        style={{
                            height: scrollIndicatorHeight
                        }}
                    >
                        <FaAngleUp size={24} className='m-auto' />
                    </span>
                    {children}
                    <span
                        ref={bottomScrollIndicatorRef}
                        className='absolute z-50 hidden w-[calc(100%-160px)] bg-[#000000] text-white max-[1669px]:w-[calc(100%-120px)] max-2xl:w-[calc(100%-80px)] max-xl:w-[calc(100%-32px)]'
                        style={{
                            height: scrollIndicatorHeight,
                            top: `calc(100% - ${scrollIndicatorHeight}px)`
                        }}
                    >
                        <FaAngleDown size={24} className='m-auto' />
                    </span>
                </Scrollbars>
            </section>
        )
    }
)
export default HtmlScrollContainer

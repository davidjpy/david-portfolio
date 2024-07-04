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

export const HtmlScrollContainer = forwardRef<HTMLElement, Props>(
    ({ top, position, backgroundTitle, topTitle, bottomTitle, contentObserverRef, children, ...props }, ref) => {
        const containerHeaderRef = useRef<HTMLHeadElement>(null)
        const scrollContainerRef = useRef<any>(null)
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

        useEffect(() => {
            if (scrollContainerRef.current) {
                const lastSectionElement: HTMLDivElement = scrollContainerRef.current.view.lastChild

                if (lastSectionElement.lastElementChild!.tagName === 'UL') {
                    const lastListItem = lastSectionElement.lastElementChild?.lastElementChild as HTMLElement

                    if (lastListItem) {
                        lastListItem.addEventListener(
                            'transitionend',
                            function handleTransitionEnd(e: TransitionEvent) {
                                if (e.propertyName === 'transform') {
                                    scrollContainerRef.current.handleWindowResize()
                                    lastListItem.removeEventListener('transitionend', handleTransitionEnd)
                                }
                            }
                        )
                    }
                } else {
                    lastSectionElement.addEventListener(
                        'transitionend',
                        function handleTransitionEnd(e: TransitionEvent) {
                            if (e.propertyName === 'transform') {
                                scrollContainerRef.current.handleWindowResize()
                                lastSectionElement.removeEventListener('transitionend', handleTransitionEnd)
                            }
                        }
                    )
                }
            }
        }, [])

        const handleUpdateScrollContainer = (value: positionValues) => {
            if (topScrollIndicatorRef.current && bottomScrollIndicatorRef.current) {
                if (value.scrollTop > 0) {
                    topScrollIndicatorRef.current.style.opacity = '1'
                } else {
                    topScrollIndicatorRef.current.style.opacity = '0'
                }

                if (value.scrollHeight * (1 - value.top) > 10 && value.scrollHeight > value.clientHeight) {
                    bottomScrollIndicatorRef.current.style.opacity = '1'
                } else {
                    bottomScrollIndicatorRef.current.style.opacity = '0'
                }
            }
        }

        return (
            <section
                data-position={position}
                className='absolute -z-50 flex h-[2160px] w-1/2 flex-col overflow-hidden bg-primary pb-[200px] pl-[80px] pr-[80px] pt-[300px] shadow-2xl [transition:border-radius_0.1s_ease-out] max-[1669px]:pl-[60px] max-[1669px]:pr-[60px] max-2xl:pl-[40px] max-2xl:pr-[40px] max-xl:pl-[16px] max-xl:pr-[16px] max-mobile:w-full'
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

                <header data-name='ch' ref={containerHeaderRef} className='mb-[48px]'>
                    <div className='mb-4 h-2 w-0 bg-accent transition-[width] duration-[1s] ease-out' />
                    <h1 className='hidden-content text-xl font-bold text-secondary [transition:transform_0.6s_ease-out_0.4s,opacity_0.6s_ease-out_0.4s] sm:text-2xl'>
                        {topTitle}
                    </h1>
                    <div className='hidden-content text-3xl font-black text-secondary [transition:transform_0.6s_ease-out_0.4s,opacity_0.6s_ease-out_0.4s] sm:text-4xl'>
                        {bottomTitle}
                    </div>
                </header>
                <div className='relative h-full w-full'>
                    <span
                        ref={topScrollIndicatorRef}
                        className='absolute left-1/2 top-0 z-50 h-[25px] w-full -translate-x-1/2 bg-gradient-to-b from-[#00000021] to-transparent'
                    >
                        <span className='absolute left-[calc(50%-20px)] top-[8px] flex w-[40px] animate-floating text-accent'>
                            <FaAngleUp size={24} />
                        </span>
                    </span>
                    <Scrollbars
                        ref={scrollContainerRef as React.LegacyRef<Scrollbars>}
                        onUpdate={handleUpdateScrollContainer}
                        renderTrackVertical={(props) => (
                            <div
                                {...props}
                                className='absolute bottom-0 top-0 w-[6px]'
                                style={{
                                    right: position === 'right' ? '0px' : undefined,
                                    left: position === 'left' ? '0px' : undefined
                                }}
                            />
                        )}
                        renderThumbVertical={(props) => (
                            <div
                                {...props}
                                className='rounded-full bg-secondary opacity-30 transition-opacity duration-100 ease-out active:opacity-70'
                            />
                        )}
                        renderView={(props) => <div {...props} className='relative' />}
                    >
                        {children}
                    </Scrollbars>

                    <span
                        ref={bottomScrollIndicatorRef}
                        className='absolute bottom-0 left-1/2 z-50 h-[25px] w-full -translate-x-1/2 bg-gradient-to-t from-[#00000021] to-transparent'
                    >
                        <span className='absolute bottom-[-4px] left-[calc(50%-20px)] flex w-[40px] animate-floating text-accent'>
                            <FaAngleDown size={24} />
                        </span>
                    </span>
                </div>
            </section>
        )
    }
)

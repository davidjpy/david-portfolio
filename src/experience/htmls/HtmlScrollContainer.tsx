import { useEffect, useRef, forwardRef } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import 'react-perfect-scrollbar/dist/css/styles.css'

interface Props extends React.ComponentProps<'section'> {
    top: number
    position: 'left' | 'right'
    backgroundTitle: string
    topTitle: string
    bottomTitle: JSX.Element
    contentObserverRef: React.MutableRefObject<IntersectionObserver | null>
    children: React.ReactNode
}

const HtmlScrollContainer = forwardRef<HTMLElement, Props>(
    ({ top, position, backgroundTitle, topTitle, bottomTitle, contentObserverRef, children, ...props }, ref) => {
        const containerHeaderRef = useRef<HTMLHeadElement>(null)
        const scrollContainerRef = useRef<PerfectScrollbar>(null)

        const handleResizeScrollContainer = () => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.updateScroll()
            }
        }

        useEffect(() => {
            if (containerHeaderRef.current) {
                contentObserverRef.current?.observe(containerHeaderRef.current)
            }

            handleResizeScrollContainer()
            window.addEventListener('resize', handleResizeScrollContainer)
            return () => {
                if (containerHeaderRef.current) {
                    contentObserverRef.current?.unobserve(containerHeaderRef.current)
                }
                window.removeEventListener('resize', handleResizeScrollContainer)
            }
        }, [])

        return (
            <section
                data-position={position}
                className='scroll-text-box'
                style={{
                    top: top,
                    right: position === 'right' ? 0 : undefined
                }}
                ref={ref}
                {...props}
            >
                <h1 className='opacity-1 pointer-events-none absolute left-[176px] top-[160px] -z-50 translate-x-[40px] text-[250px] font-black text-primary-monochrome opacity-0 [transition:transform_0.6s_ease-out_0.4s,opacity_0.6s_ease-out_0.4s]'>
                    {backgroundTitle}
                </h1>
                <PerfectScrollbar
                    ref={scrollContainerRef}
                    options={{
                        suppressScrollX: true,
                        swipeEasing: true,
                        wheelSpeed: 0.5
                    }}
                    className='h-[1560px]'
                >
                    <header data-name='ch' ref={containerHeaderRef} className='relative'>
                        <div className='header-divider mb-4 h-2 w-0 bg-accent transition-[width] duration-[1s] ease-out' />
                        <h1 className='hidden-content text-xl font-bold text-secondary [transition:transform_0.6s_ease-out_0.4s,opacity_0.6s_ease-out_0.4s] sm:text-2xl'>
                            {topTitle}
                        </h1>
                        <div className='hidden-content text-3xl font-black text-secondary [transition:transform_0.6s_ease-out_0.4s,opacity_0.6s_ease-out_0.4s] sm:text-4xl'>
                            {bottomTitle}
                        </div>
                    </header>
                    {children}
                </PerfectScrollbar>
            </section>
        )
    }
)

export default HtmlScrollContainer

import { useEffect, useRef, forwardRef } from 'react'

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
        const headerRef = useRef<HTMLHeadElement>(null)

        useEffect(() => {
            if (headerRef.current) {
                contentObserverRef.current?.observe(headerRef.current)
            }

            return () => {
                if (headerRef.current) {
                    contentObserverRef.current?.unobserve(headerRef.current)
                }
            }
        }, [headerRef.current])

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
                <header data-name='header' ref={headerRef} className='relative'>
                    <h1 className='pointer-events-none absolute -top-[140px] left-[160px] -z-50 translate-x-[40px] text-[250px] font-black text-primary-monochrome opacity-0 [transition:color_0.2s_linear,transform_0.6s_ease-out,opacity_0.6s_ease-out]'>
                        {backgroundTitle}
                    </h1>
                    <div className='header-divider mb-4 h-2 w-0 bg-accent transition-[width] duration-[0.6s] ease-out' />
                    <h1 className='hidden-content text-lg font-bold text-secondary [transition:color_0.2s_linear,transform_0.6s_ease-out_0.6s,opacity_0.6s_ease-out_0.6s]'>
                        {topTitle}
                    </h1>
                    <div className='hidden-content text-xl font-black text-secondary [transition:color_0.2s_linear,transform_0.6s_ease-out_0.8s,opacity_0.6s_ease-out_0.8s]'>
                        {bottomTitle}
                    </div>
                </header>
                <div className='hidden-content [transition:color_0.2s_linear,transform_0.6s_ease-out_1s,opacity_0.6s_ease-out_1s]'>
                    {children}
                </div>
            </section>
        )
    }
)

export default HtmlScrollContainer

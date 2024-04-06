import { forwardRef, useEffect, useRef } from 'react'

interface Props {
    top: number
    position: 'left' | 'right'
    backgroundTitle: string
    topTitle: string
    bottomTitle: JSX.Element
    observerRef: React.MutableRefObject<IntersectionObserver | null>
    children: React.ReactNode
}

const HtmlScrollContainer = forwardRef<HTMLElement, Props>(
    ({ top, position, backgroundTitle, topTitle, bottomTitle, children, observerRef, ...props }, ref) => {
        const headerRef = useRef<HTMLDivElement>(null)

        useEffect(() => {
            if (headerRef.current) {
                observerRef.current?.observe(headerRef.current)
            }

            return () => {
                if (headerRef.current) {
                    observerRef.current?.unobserve(headerRef.current)
                }
            }
        }, [headerRef.current])

        return (
            <section
                ref={ref}
                className='scroll-text-box'
                style={{
                    top: top,
                    right: position === 'right' ? 0 : undefined
                }}
                {...props}
            >
                <header ref={headerRef} data-name='header' className='relative'>
                    <h1 className='pointer-events-none absolute -top-[140px] left-[160px] -z-50 translate-x-[40px] text-[250px] font-black text-primary-monochrome opacity-0 [transition:color_0.2s_linear,transform_1s_ease-out,opacity_1s_ease-out]'>
                        {backgroundTitle}
                    </h1>
                    <div className='header-divider mb-4 h-2 w-0 bg-accent transition-[width] duration-[0.8s] ease-out' />
                    <h1 className='translate-y-[20px] text-lg font-bold text-secondary opacity-0 [transition:color_0.2s_linear,transform_1s_ease-out_0.8s,opacity_1s_ease-out_0.8s]'>
                        {topTitle}
                    </h1>
                    <h1 className='translate-y-[20px] text-xl font-black text-secondary opacity-0 [transition:color_0.2s_linear,transform_1s_ease-out_1s,opacity_1s_ease-out_1s]'>
                        {bottomTitle}
                    </h1>
                </header>
                {children}
            </section>
        )
    }
)

export default HtmlScrollContainer

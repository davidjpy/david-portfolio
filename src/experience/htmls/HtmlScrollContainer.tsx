import { useEffect, useRef, forwardRef } from 'react'

import { Scrollbars } from 'react-custom-scrollbars-2'

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

        return (
            <section
                data-position={position}
                className='absolute -z-50 flex h-[2160px] w-1/2 flex-col overflow-hidden bg-primary pb-[300px] pl-[80px] pr-[80px] pt-[300px] shadow-2xl [transition:border-radius_0.1s_ease-out] max-[1669px]:pl-[60px] max-[1669px]:pr-[60px] max-2xl:pl-[40px] max-2xl:pr-[40px] max-xl:pl-[16px] max-xl:pr-[16px] max-mobile:w-full'
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
                <Scrollbars>{children}</Scrollbars>
            </section>
        )
    }
)

export default HtmlScrollContainer

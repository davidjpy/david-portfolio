import { useEffect, useRef } from 'react'

interface Props extends Omit<React.ComponentProps<'section'>, 'title'> {
    title?: JSX.Element
    contentObserverRef: React.MutableRefObject<IntersectionObserver | null>
}

export function HtmlSection({ title, children, contentObserverRef, ...props }: Props) {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (sectionRef.current) {
            contentObserverRef.current?.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                contentObserverRef.current?.unobserve(sectionRef.current)
            }
        }
    }, [sectionRef.current])

    return (
        <section
            ref={sectionRef}
            data-name='se'
            className='hidden-content mb-[48px] text-secondary [transition:transform_0.4s_ease-out_0.4s,opacity_0.4s_ease-out_0.4s] last-of-type:mb-0'
            {...props}
        >
            {title && (
                <header className='mb-[16px] flex items-center font-bold'>
                    <h1>
                        <span className='mr-[8px] inline-block h-1 w-4 bg-accent align-middle' />
                        {title}
                    </h1>
                </header>
            )}
            {children}
        </section>
    )
}

import { useEffect, useRef } from 'react'

interface Props extends Omit<React.ComponentProps<'section'>, 'title'> {
    title?: JSX.Element
    contentObserverRef: React.MutableRefObject<IntersectionObserver | null>
}

export default function HtmlSection({ title, children, contentObserverRef, ...props }: Props) {
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
            className='hidden-content mt-12 text-secondary [transition:transform_0.4s_ease-out_0.4s,opacity_0.4s_ease-out_0.4s]'
            {...props}
        >
            {title && (
                <header className='mb-4 flex items-center font-bold'>
                    <span className='mr-2 h-1 w-4 bg-accent' />
                    <h1>{title}</h1>
                </header>
            )}
            {children}
        </section>
    )
}

import { useEffect, useRef } from 'react'

interface Props extends Omit<React.ComponentProps<'section'>, 'title'> {
    title: JSX.Element
    contentObserverRef: React.MutableRefObject<IntersectionObserver | null>
}

export default function HtmlSection({ title, children, contentObserverRef, ...props }: Props) {
    const sectionHeader = useRef<HTMLElement>(null)

    useEffect(() => {
        if (sectionHeader.current) {
            contentObserverRef.current?.observe(sectionHeader.current)
        }

        return () => {
            if (sectionHeader.current) {
                contentObserverRef.current?.unobserve(sectionHeader.current)
            }
        }
    }, [sectionHeader.current])

    return (
        <section
            ref={sectionHeader}
            data-name='se'
            className='hidden-content mt-12 text-secondary [transition:color_0.2s_linear,transform_0.4s_ease-out_0.1s,opacity_0.4s_ease-out_0.1s]'
            {...props}
        >
            <header className='mb-2 flex items-center '>
                <span className='mr-2 h-1 w-4 bg-accent' />
                <h1 className='font-bold'>{title}</h1>
            </header>

            {children}
        </section>
    )
}

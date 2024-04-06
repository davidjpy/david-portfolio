import { forwardRef } from 'react'

interface Props {
    top: number
    position: 'left' | 'right'
    backgroundTitle: string
    topTitle: string
    bottomTitle: JSX.Element
    children: React.ReactNode
}

const HtmlScrollContainer = forwardRef<HTMLElement, Props>(
    ({ top, position, backgroundTitle, topTitle, bottomTitle, children, ...props }, ref) => {
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
                <header>
                    <h1 className='header-bg-text'>{backgroundTitle}</h1>
                </header>
                <div className='header-wrapper'>
                    <div className='header-divider' />
                    <h1 className='text-lg font-bold text-secondary'>{topTitle}</h1>
                    <h1 className='text-xl font-black text-secondary'>{bottomTitle}</h1>
                </div>
                {children}
            </section>
        )
    }
)

export default HtmlScrollContainer

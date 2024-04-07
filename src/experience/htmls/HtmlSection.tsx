interface Props extends Omit<React.ComponentProps<'section'>, 'title'> {
    title: JSX.Element
}

export default function HtmlSection({ title, children, ...props }: Props) {
    return (
        <section className='mt-12 text-secondary' {...props}>
            <header className='mb-2 flex items-center'>
                <span className='mr-2 h-1 w-4 bg-accent' />
                <h1 className='font-bold'>{title}</h1>
            </header>
            {children}
        </section>
    )
}

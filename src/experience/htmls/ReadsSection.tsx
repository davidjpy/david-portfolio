interface Props {
    readsSectionRef: React.MutableRefObject<HTMLElement>
    top: number
}

const bookReadingList = [
    {
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert Cecil Martin',
        summary:
            'A valuable lessons on how to improve the readiablity and maintainability of the codebase via meaningful naming conventions, pure function design, centralized error handling, etc.'
    },
    {
        title: 'New FE Textbook Vol.1 IT Fundamentals',
        author: 'IPA, Japan',
        summary:
            'The book gives a firm foundation in IT principles, which are necessary for my daily work. It touched on computer systems, software development, data structure and algorithms, database fundamentals, networking concepts, and security practices.'
    },
    {
        title: 'New FE Textbook Vol.2 IT Strategy & Management',
        author: 'IPA, Japan',
        summary:
            'A sophisticated discussion on aligning IT with business objectives, project management & strategic innovation. This resource promises to improve the grasp of IT governance, risk management, and data-driven decision-making.'
    },
    {
        title: 'Trade Your Way to Financial Freedom',
        author: 'Van K. Tharp',
        summary:
            'The book provides insight with the system design and risk management, promotes iterative development and testing for reliability, and emphasizes on self-discipline on personal growth.'
    }
]

export default function ReadsSection({ readsSectionRef, top }: Props) {
    return (
        <section ref={readsSectionRef} className={`scroll-text-box right-0 top-[${top}px]`}>
            <header>
                <h1 className='header-bg-text'>Reading</h1>
            </header>
            <header className='header-wrapper'>
                <div className='header-divider' />
                <h1 className='text-lg font-bold text-secondary'>Nice. What about...</h1>
                <h1 className='text-xl font-black text-secondary'>
                    My <span className='text-accent'> Reads</span>
                </h1>
            </header>

            <section className='mt-12 text-secondary'>
                <header className='mb-2 flex items-center'>
                    <div className='mr-2 h-0.5 w-4 bg-accent' />
                    <h1 className='font-bold'>
                        Any interesting <span className='text-accent'>books</span>?
                    </h1>
                </header>
                <ul className='ml-5 mt-4 list-outside list-decimal'>
                    {bookReadingList.map((book) => (
                        <li key={book.title} className='mb-4'>
                            <h1 className='inline font-semibold'>
                                {book.title}
                                <span className='font-normal text-accent'> - {book.author}</span>
                            </h1>
                            <p className='mt-2 text-secondary-light'>{book.summary}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    )
}

import { FaGithub, FaLink } from 'react-icons/fa'

interface Props {
    workSectionRef: React.MutableRefObject<HTMLElement>
}

export default function WorksSection({ workSectionRef }: Props) {
    return (
        <section ref={workSectionRef} className='scroll-text-box right-0 top-[2000vh]'>
            <header>
                <h1 className='header-bg-text'>Works</h1>
            </header>
            <header className='header-wrapper'>
                <div className='header-divider' />
                <h1 className='text-lg font-bold text-secondary'>Sure. Here's my...</h1>
                <h1 className='text-xl font-black text-secondary'>
                    My <span className='text-accent'> Works</span>
                </h1>
            </header>

            <section className='mt-12 text-secondary'>
                <header className='mb-2 flex items-center'>
                    <div className='mr-2 h-0.5 w-4 bg-accent' />
                    <h1 className='font-bold'>
                        Any interesting <span className='text-accent'>projects</span>?
                    </h1>
                </header>
                <ul className='mt-6'>
                    <li className='project-list-item'>
                        <img
                            src='images/projects/wildbear.webp'
                            className='max-h-[70px] flex-shrink-0 rounded-[4px] object-cover shadow-lg'
                        />

                        <div className='pl-4'>
                            <div className='flex items-center justify-between'>
                                <h1 className='font-bold'>WildBear Shop</h1>
                                <ul className='ml-2 flex gap-2'>
                                    <li>
                                        <a href='https://github.com/davidjpy/wildbear' target='_blank'>
                                            <FaGithub className='icon-link-md' />
                                        </a>
                                    </li>
                                    <li>
                                        <a href='https://www.wildbear-shop.com/' target='_blank'>
                                            <FaLink className='icon-link-md' />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <p className='mt-2 text-secondary-light'>
                                Brittany Chiang’s web developer portfolio incorporates a dark background and light
                                colors for other elements like fonts and icons, which is a great way to highlight
                                important details.
                            </p>
                        </div>
                    </li>
                </ul>
            </section>
        </section>
    )
}

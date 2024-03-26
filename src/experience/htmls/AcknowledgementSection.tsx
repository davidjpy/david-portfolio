import { FaGithub, FaLink, FaLinkedin } from 'react-icons/fa'

interface Props {
    acknowledgementSectionRef: React.MutableRefObject<HTMLElement>
    top: number
}

export default function AcknowledgementSection({ acknowledgementSectionRef, top }: Props) {
    return (
        <section ref={acknowledgementSectionRef} className='scroll-text-box' style={{ top: top }}>
            <header>
                <h1 className='header-bg-text'>Acknowledgement</h1>
            </header>
            <header className='header-wrapper'>
                <div className='header-divider' />
                <h1 className='text-lg font-bold text-secondary'>Lastly. There's...</h1>
                <h1 className='text-xl font-black text-secondary'>
                    The <span className='text-accent'> Acknowledgement</span>
                </h1>
            </header>

            <section className='mt-12 text-secondary'>
                <header className='mb-2 flex items-center'>
                    <div className='mr-2 h-0.5 w-4 bg-accent' />
                    <h1 className='font-bold'>
                        My co-workers's <span className='text-accent'>comments</span>?
                    </h1>
                </header>
                <ul className='mt-6'>
                    <li className='project-list-item'>
                        <div className='pl-4'>
                            <div className='flex justify-between'>
                                <div className='flex items-center gap-4'>
                                    <img src='images/acknowledgement/fran.webp' className='acknowledgement-list-img' />
                                    <div>
                                        <h1 className='font-bold'>Francesco Cursi</h1>
                                        <p className='text-secondary-light'>Sr. Research Engineer, Huawei</p>
                                    </div>
                                </div>
                                <ul className='ml-2 flex gap-2'>
                                    <li>
                                        <a href='https://www.linkedin.com/in/francesco-c-a94568111/' target='_blank'>
                                            <FaLinkedin className='icon-link-md' />
                                        </a>
                                    </li>
                                    <li>
                                        <a href='https://github.com/cursi36' target='_blank'>
                                            <FaGithub className='icon-link-md' />
                                        </a>
                                    </li>
                                    <li>
                                        <a href='https://francescocursi.com/' target='_blank'>
                                            <FaLink className='icon-link-md' />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <p className='mt-4 text-secondary-light'>
                                From my time working alongside David, he has demonstrated his remarkable ability to
                                solve problems and adapt quickly to new subjects. It's all the more impressive given
                                that he transitioned to this field from a completely different career. Any team would be
                                lucky to have him.
                            </p>
                        </div>
                    </li>
                </ul>
            </section>
        </section>
    )
}

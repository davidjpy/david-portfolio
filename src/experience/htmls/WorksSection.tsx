import { FaGithub, FaLink } from 'react-icons/fa'

interface Props {
    workSectionRef: React.MutableRefObject<HTMLElement>
    top: number
}

export default function WorksSection({ workSectionRef, top }: Props) {
    return (
        <section ref={workSectionRef} className='scroll-text-box right-0' style={{ top: top }}>
            <header>
                <h1 className='header-bg-text'>Works</h1>
            </header>
            <header className='header-wrapper'>
                <div className='header-divider' />
                <h1 className='text-lg font-bold text-secondary'>Sure. Here's...</h1>
                <h1 className='text-xl font-black text-secondary'>
                    My <span className='text-accent'> Works</span>
                </h1>
            </header>

            <section className='mt-12 text-secondary'>
                <header className='mb-2 flex items-center'>
                    <div className='mr-2 h-0.5 w-4 bg-accent' />
                    <h1 className='font-bold'>
                        <span className='text-accent'>Projects</span> I have done?
                    </h1>
                </header>
                <ul className='mt-6'>
                    <li className='project-list-item'>
                        <img src='images/projects/wildbear.webp' className='project-list-img' />

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
                                A full-stack demo project featuring a React front-end and a Django-powered back-end with
                                a PostgreSQL database. The project is deployed on Netlify for the client-side and AWS
                                for server-side.
                            </p>
                        </div>
                    </li>
                    <li className='project-list-item'>
                        <img src='images/projects/portfolio.webp' className='project-list-img' />

                        <div className='pl-4'>
                            <div className='flex items-center justify-between'>
                                <h1 className='font-bold'>Lighthouse Portfolio</h1>
                                <ul className='ml-2 flex gap-2'>
                                    {/* <li>
                                        <a href='https://github.com/davidjpy/wildbear' target='_blank'>
                                            <FaGithub className='icon-link-md' />
                                        </a>
                                    </li>
                                    <li>
                                        <a href='https://www.wildbear-shop.com/' target='_blank'>
                                            <FaLink className='icon-link-md' />
                                        </a>
                                    </li> */}
                                </ul>
                            </div>
                            <p className='mt-2 text-secondary-light'>
                                Showcasing an innovative web experience by integrating 3D visuals and interactive
                                elements into React. The 3D models and textures are crafted using Blender. Leveraging
                                the power of Three.js, it delivers a captivating user interface that pushes the
                                boundaries of traditional web design.
                            </p>
                        </div>
                    </li>
                </ul>
            </section>

            <section className='mt-12 text-secondary'>
                <header className='mb-2 flex items-center'>
                    <div className='mr-2 h-0.5 w-4 bg-accent' />
                    <h1 className='font-bold'>
                        Any interesting <span className='text-accent'>certificates</span>?
                    </h1>
                </header>
                <ul className='mt-6'>
                    <li className='project-list-item'>
                        <img src='images/projects/FE_exam_cert.webp' className='project-list-img' />

                        <div className='pl-4'>
                            <div className='flex items-center justify-between'>
                                <h1 className='font-bold'>FE Exam Certificate</h1>
                                <ul className='ml-2 flex gap-2'>
                                    <li>
                                        <a href='https://itpec.org/about/itpec-common-exam.html' target='_blank'>
                                            <FaLink className='icon-link-md' />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <p className='mt-2 text-secondary-light'>
                                I traveled to the Philippines to participate in the Fundamental Information Technology
                                Engineer Examination (FE). This exam broadened my IT knowledge base significantly,
                                complementing my skills as a self-taught developer. It also earned me the qualifications
                                necessary for the Engineering Visa in Japan.
                            </p>
                        </div>
                    </li>
                    <li className='project-list-item'>
                        <img src='images/projects/threejs_journey_cert.webp' className='project-list-img' />
                        <div className='pl-4'>
                            <div className='flex items-center justify-between'>
                                <h1 className='font-bold'>Three.js Journey</h1>
                                <ul className='ml-2 flex gap-2'>
                                    <li>
                                        <a href='https://threejs-journey.com/' target='_blank'>
                                            <FaLink className='icon-link-md' />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <p className='mt-2 text-secondary-light'>
                                I completed an extensive 91-hour program that offers to to advanced techniques of WebGL,
                                Three.js, GLSL, and Blender. It expanded my horizon of 3D web graphics, enabling me to
                                create more sophisticated and interactive online experiences.
                            </p>
                        </div>
                    </li>
                    <li className='project-list-item'>
                        <img src='images/projects/defect_patent.webp' className='project-list-img' />
                        <div className='pl-4'>
                            <div className='flex items-center justify-between'>
                                <h1 className='font-bold'>System and method for detecting surface defect of object</h1>
                                <ul className='ml-2 flex gap-2'>
                                    <li>
                                        <a
                                            href='https://esearch.ipd.gov.hk/nis-pos-view/#/pt/details/view/3281124_32023070552.9/0/1/10/0/null_null/KCFeIShhcHBsaWNOdW1iZXI6KDMyMDIzMDcwNTUyLjkpKSFeISkgQU5EIHB0UmVjb3JkU2VxOjE%3D?lang=en'
                                            target='_blank'
                                        >
                                            <FaLink className='icon-link-md' />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <p className='mt-2 text-secondary-light'>
                                A short-term patent for an innovative system that utilizes a robotic arm equipped with a
                                camera to capture detailed images of an object from various angles. The system then
                                employs a sophisticated detection algorithm to meticulously analyze these images and
                                pinpoint any defects present.
                            </p>
                        </div>
                    </li>
                    <li className='project-list-item'>
                        <img src='images/projects/logistic_patent.webp' className='project-list-img' />
                        <div className='pl-4'>
                            <div className='flex justify-between'>
                                <h1 className='font-bold'>
                                    Method for detecting and predicting a bottleneck in a transportation process of a
                                    logistics center
                                </h1>
                                <ul className='ml-2 flex gap-2'>
                                    <li>
                                        <a
                                            href='https://esearch.ipd.gov.hk/nis-pos-view/#/pt/details/view/3276488_32023070062.9/0/1/10/0/null_null/KCFeIShhcHBsaWNOdW1iZXI6KDMyMDIzMDcwMDYyLjkpKSFeISkgQU5EIHB0UmVjb3JkU2VxOjE%3D?lang=cn'
                                            target='_blank'
                                        >
                                            <FaLink className='icon-link-md' />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <p className='mt-2 text-secondary-light'>
                                A short-term patent of a system designed to predict bottlenecks in cargo logistics at
                                Hong Kong Airport. It harnesses the power of big data analytics by processing data
                                gathered from sensors across the transport belts. The predictive model can proactively
                                identify potential congestion points.
                            </p>
                        </div>
                    </li>
                </ul>
            </section>
        </section>
    )
}

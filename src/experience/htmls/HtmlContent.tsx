import { useEffect, useRef } from 'react'
import { Html, useScroll } from '@react-three/drei'
import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaPython,
    FaReact,
    FaVuejs,
    FaNodeJs,
    FaHtml5,
    FaCss3Alt,
    FaGitAlt,
    FaDocker,
    FaImages,
    FaFigma,
    FaKeyboard,
    FaLink,
    FaYoutube 
} from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiBlender } from 'react-icons/si'
import { MdOutlinePhonelink } from 'react-icons/md'
import { TbBrandThreejs } from 'react-icons/tb'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import HtmlScrollContainer from '@/src/experience/htmls/HtmlScrollContainer'
import HtmlSection from '@/src/experience/htmls/HtmlSection'
import { perfectPageHeight } from '@/src/utilities/constants'

const titles = ['Full-Stack Developer', 'Web Designer', '3D Modeler']
const softwareSkills = [
    { name: 'Typescript', icon: <SiTypescript className='icon-svg' /> },
    { name: 'Python', icon: <FaPython className='icon-svg' /> },
    { name: 'React', icon: <FaReact strokeWidth={8} className='icon-svg' /> },
    { name: 'Vue', icon: <FaVuejs className='icon-svg' /> },
    { name: 'ThreeJS', icon: <TbBrandThreejs strokeWidth={1.5} className='icon-svg' /> },
    { name: 'Node', icon: <FaNodeJs strokeWidth={8} className='icon-svg' /> },
    { name: 'Semantic HTML', icon: <FaHtml5 className='icon-svg' /> },
    { name: 'Responsiveness', icon: <MdOutlinePhonelink className='icon-svg' /> },
    { name: 'Acessibility', icon: <FaKeyboard className='icon-svg' /> },
    { name: 'CSS', icon: <FaCss3Alt className='icon-svg' /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className='icon-svg' /> },
    { name: 'Figma', icon: <FaFigma strokeWidth={6} className='icon-svg' /> },
    { name: 'Git', icon: <FaGitAlt className='icon-svg' /> },
    { name: 'Docker', icon: <FaDocker className='icon-svg' /> }
]
const otherSkills = [
    { name: 'Blender', icon: <SiBlender className='icon-svg' /> },
    { name: 'Stable Diffusion', icon: <FaImages className='icon-svg' /> },
    { name: 'Cantonese', icon: <h1 className='icon-text'>粵</h1> },
    { name: 'Mandarin', icon: <h1 className='icon-text'>普</h1> },
    { name: 'English', icon: <h1 className='icon-text'>En</h1> },
    { name: 'Japanese (In Progress)', icon: <h1 className='icon-text'>日</h1> }
]
const readingList = [
    {
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        // author: 'Robert Cecil Martin',
        source: 'images/study/clean_code.webp',
        links: (
            <ul className='ml-2 flex gap-2'>
                <li>
                    <a href='https://github.com/jnguyen095/clean-code/tree/master' target='_blank'>
                        <FaGithub className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary:
            'A valuable lessons on how to improve the readiablity and maintainability of the codebase via meaningful naming conventions, pure function design, centralized error handling, etc.'
    },
    {
        title: 'New FE Textbook Vol.1 IT Fundamentals',
        // author: 'IPA, Japan',
        source: 'images/study/it_fundamentals.webp',
        links: (
            <ul className='ml-2 flex gap-2'>
                <li>
                    <a href='https://itpec.org/news/20220921_LMS.html' target='_blank'>
                        <FaLink className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary:
            'The book gives a firm foundation in IT principles, which are necessary for my daily work. It touched on computer systems, software development, data structure and algorithms, database fundamentals, networking concepts, and security practices.'
    },
    {
        title: 'New FE Textbook Vol.2 IT Strategy & Management',
        // author: 'IPA, Japan',
        source: 'images/study/it_strategy_and_management.webp',
        links: (
            <ul className='ml-2 flex gap-2'>
                <li>
                    <a href='https://itpec.org/news/20220921_LMS.html' target='_blank'>
                        <FaLink className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary:
            'A sophisticated discussion on aligning IT with business objectives, project management & strategic innovation. This resource promises to improve the grasp of IT governance, risk management, and data-driven decision-making.'
    }
]
const courseList = [
    {
        title: 'Three.js Journey',
        author: 'Robert Cecil Martin',
        source: 'images/study/threejs_journey_cert.webp',
        links: (
            <ul className='ml-2 flex gap-2'>
                <li>
                    <a href='https://threejs-journey.com/' target='_blank'>
                        <FaLink className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary: `I completed an extensive 91-hour program that offers to to advanced techniques of WebGL, Three.js, GLSL, and Blender. It expanded my horizon of 3D web graphics, enabling me to create more sophisticated and interactive online experiences.`
    },
    {
        title: 'Harvard CS50: Introduction to Computer Science',
        author: 'Robert Cecil Martin',
        source: 'images/study/cs50.webp',
        links: (
            <ul className='ml-2 flex gap-2'>
                <li>
                    <a href='https://www.youtube.com/watch?v=8mAITcNt710&t=1s&ab_channel=freeCodeCamp.org' target='_blank'>
                        <FaYoutube className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary:
            'A valuable lessons on how to improve the readiablity and maintainability of the codebase via meaningful naming conventions, pure function design, centralized error handling, etc.'
    },
    {
        title: 'MIT 6.006 Introduction to Algorithms',
        author: 'Robert Cecil Martin',
        source: 'images/study/mit6.006.webp',
        links: (
            <ul className='ml-2 flex gap-2'>
                <li>
                    <a href='https://www.youtube.com/watch?v=HtSuA80QTyo&ab_channel=MITOpenCourseWare' target='_blank'>
                        <FaYoutube className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary:
            'A valuable lessons on how to improve the readiablity and maintainability of the codebase via meaningful naming conventions, pure function design, centralized error handling, etc.'
    },
    {
        title: 'Stanford CS229: Machine Learning',
        author: 'Robert Cecil Martin',
        source: 'images/study/cs229.webp',
        links: (
            <ul className='ml-2 flex gap-2'>
                <li>
                    <a href='https://www.youtube.com/watch?v=jGwO_UgTS7I&ab_channel=StanfordOnline' target='_blank'>
                        <FaYoutube className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary:
            'A valuable lessons on how to improve the readiablity and maintainability of the codebase via meaningful naming conventions, pure function design, centralized error handling, etc.'
    },
    {
        title: 'Bulletproof React',
        author: 'Robert Cecil Martin',
        source: 'images/study/bulletproof_react.webp',
        links: (
            <ul className='ml-2 flex gap-2'>
                <li>
                    <a href='https://github.com/alan2207/bulletproof-react' target='_blank'>
                        <FaGithub className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary:
            'A valuable lessons on how to improve the readiablity and maintainability of the codebase via meaningful naming conventions, pure function design, centralized error handling, etc.'
    }
]

const aboutSections = [
    {
        title: (
            <>
                <span className='text-accent'>Who</span> am I?
            </>
        ),
        children: (
            <p>
                I am an ambitious software engineer based in Hong Kong with over 2 years of professional experience in
                transforming ideas from 0 to 100 and creating captivating digital experiences that embody elegance,
                simplicity, and detail. In my full-time role as an application developer, I've successfully made several
                significant improvements to products with over 2000 daily users while laying the groundwork for a
                freelance career through targeted networking and skill-building. I am also committed to a long-life
                journey of continuous growth to stay at the forefront of technology and personal development.
            </p>
        )
    },
    {
        title: (
            <>
                How it <span className='text-accent'>started</span>?
            </>
        ),
        children: (
            <p>
                I'm a self-taught software engineer fueled by a deep passion for the digital world. I began my career as
                a building surveyor, a field steeped in rigid practices that often limited my creative spirit. Seeking a
                change, I discovered the intriguing world of programming, a place where innovation thrives and creative
                problem-solving is encouraged. This propelled me into a mountain of code, where I've found passion for
                crafting web applications with stunning visuals and software that embrace efficiency.
            </p>
        )
    }
]
const skillsSections = [
    {
        title: (
            <>
                What can I offer as a <span className='text-accent'>software developer</span>?
            </>
        ),
        children: (
            <ul>
                {softwareSkills.map((skill, index) => (
                    <li
                        key={skill.name}
                        className='hidden-content mr-6 mt-6 inline-block rounded-md bg-primary-monochrome pb-4 pl-6 pr-6 pt-4 text-center'
                        style={{
                            transition: `background-color 0.2s linear, transform 0.4s ease-out ${
                                index * 0.1
                            }s,opacity 0.4s ease-out ${index * 0.1}s`
                        }}
                    >
                        <span>{skill.icon}</span>
                        <p className='mt-2'>{skill.name}</p>
                    </li>
                ))}
            </ul>
        )
    },
    {
        title: (
            <>
                What other <span className='text-accent'>skills</span> do I have?
            </>
        ),
        children: (
            <ul>
                {otherSkills.map((skill, index) => (
                    <li
                        key={skill.name}
                        className='hidden-content mr-6 mt-6 inline-block rounded-md bg-primary-monochrome pb-4 pl-6 pr-6 pt-4 text-center'
                        style={{
                            transition: `background-color 0.2s linear, transform 0.4s ease-out ${
                                index * 0.1
                            }s, opacity 0.4s ease-out ${index * 0.1}s`
                        }}
                    >
                        <span>{skill.icon}</span>
                        <p className='mt-2'>{skill.name}</p>
                    </li>
                ))}
            </ul>
        )
    }
]
const lifeSections = [
    {
        title: (
            <>
                My <span className='text-accent'>daily</span> life?
            </>
        ),
        children: (
            <>
                <p>
                    My life is simple yet joyful, you'll either find me sitting in front of the computer, losing myself
                    in the latest gaming adventure or a pile of messy code, or exploring the hidden gems of a city. I
                    often find surprises and beauty in those untold places. I enjoy talking to strangers and meeting new
                    friends. I always get along with people regardless of their background, culture, and language.
                </p>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={16}
                    loop={true}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className='mt-8 h-[700px] w-full rounded-[24px] p-[8px]'
                >
                    <SwiperSlide className='img-gallery'>
                        <figure className='group relative col-span-2 row-span-5 overflow-hidden rounded-[16px]'>
                            <img src='images/life/japan_shine.webp' className='swipe-img col-span-2 row-span-5' />
                            <figcaption className='img-layer'>
                                <h1>Shine hidden in the forest</h1>
                                <p>Kumamoto, Japan</p>
                            </figcaption>
                        </figure>
                        <figure className='group relative col-span-2 row-span-2 overflow-hidden rounded-[16px]'>
                            <img src='images/life/japan_house.webp' className='swipe-img' />
                            <figcaption className='img-layer'>
                                <h1>Japanese architecture</h1>
                                <p>Kurokawa Onsen Ryokan, Japan</p>
                            </figcaption>
                        </figure>
                        <figure className='group relative col-span-2 row-span-3 overflow-hidden rounded-[16px]'>
                            <img src='images/life/hk_island.webp' className='swipe-img' />
                            <figcaption className='img-layer'>
                                <h1>Camping on the coast</h1>
                                <p>Po Toi Islands, Hong Kong</p>
                            </figcaption>
                        </figure>
                    </SwiperSlide>
                    <SwiperSlide className='img-gallery'>
                        <figure className='group relative col-span-2 row-span-3 overflow-hidden rounded-[16px]'>
                            <img src='images/life/taiwan_shine.webp' className='swipe-img' />
                            <figcaption className='img-layer'>
                                <h1>Fancy oriental temple</h1>
                                <p>Kaohsiung, Taiwan</p>
                            </figcaption>
                        </figure>
                        <figure className='group relative col-span-2 row-span-3 overflow-hidden rounded-[16px]'>
                            <img src='images/life/painting.webp' className='swipe-img' />
                            <figcaption className='img-layer'>
                                <h1>Fake artist</h1>
                                <p>Tsim Sha Tsui, Hong Kong</p>
                            </figcaption>
                        </figure>
                        <figure className='group relative col-span-4 row-span-2 overflow-hidden rounded-[16px]'>
                            <img src='images/life/love_bridge.webp' className='swipe-img' />
                            <figcaption className='img-layer'>
                                <h1>Lover's bridge celebrating Coldplay's arrival</h1>
                                <p>Kaohsiung, Taiwan</p>
                            </figcaption>
                        </figure>
                    </SwiperSlide>
                    <SwiperSlide className='img-gallery'>
                        <figure className='group relative col-span-2 row-span-2 overflow-hidden rounded-[16px]'>
                            <img src='images/life/fire_dragon_dance.webp' className='swipe-img' />
                            <figcaption className='img-layer'>
                                <h1>Fire Dragon Dance</h1>
                                <p>Tai Hang, Hong Kong</p>
                            </figcaption>
                        </figure>
                        <figure className='group relative col-span-2 row-span-2 overflow-hidden rounded-[16px]'>
                            <img src='images/life/coldplay.webp' className='swipe-img' />
                            <figcaption className='img-layer'>
                                <h1>Coldplay: Music of the Spheres</h1>
                                <p>Kaohsiung, Taiwan</p>
                            </figcaption>
                        </figure>
                        <figure className='group relative col-span-4 row-span-3 overflow-hidden rounded-[16px]'>
                            <img src='images/life/okinawa_sky.webp' className='swipe-img' />
                            <figcaption className='img-layer'>
                                <h1>Okinawa Churaumi Aquarium</h1>
                                <p>Okinawa, Japan</p>
                            </figcaption>
                        </figure>
                    </SwiperSlide>
                </Swiper>
            </>
        )
    }
]
const worksSections = [
    {
        title: (
            <>
                <span className='text-accent'>Projects</span> I have done?
            </>
        ),
        children: (
            <ul>
                <li className='section-list-item'>
                    <img src='images/projects/wildbear.webp' className='project-list-img' />

                    <div className='pl-4'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold'>WildBear Shop</h1>
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
                        <p className='mt-2 text-sm text-secondary-light'>
                            A full-stack demo project featuring a React front-end and a Django-powered back-end with a
                            PostgreSQL database. The project is deployed on Netlify for the client-side and AWS for
                            server-side.
                        </p>
                    </div>
                </li>
                <li className='section-list-item'>
                    <img src='images/projects/portfolio.webp' className='project-list-img' />

                    <div className='pl-4'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold'>Lighthouse Portfolio</h1>
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
                        <p className='mt-2 text-sm text-secondary-light'>
                            Showcasing an innovative web experience by integrating 3D visuals and interactive elements
                            into React. The 3D models and textures are crafted using Blender. Leveraging the power of
                            Three.js, it delivers a captivating user interface that pushes the boundaries of traditional
                            web design.
                        </p>
                    </div>
                </li>
            </ul>
        )
    },
    {
        title: (
            <>
                Any interesting <span className='text-accent'>certificates</span>?
            </>
        ),
        children: (
            <ul>
                <li className='section-list-item'>
                    <img src='images/projects/FE_exam_cert.webp' className='project-list-img' />

                    <div className='pl-4'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold'>FE Exam Certificate</h1>
                            <ul className='ml-2 flex gap-2'>
                                <li>
                                    <a href='https://itpec.org/about/itpec-common-exam.html' target='_blank'>
                                        <FaLink className='icon-link-md' />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <p className='mt-2 text-sm text-secondary-light'>
                            I traveled to the Philippines to participate in the Fundamental Information Technology
                            Engineer Examination (FE). This exam broadened my IT knowledge base significantly,
                            complementing my skills as a self-taught developer. It also earned me the qualifications
                            necessary for the Engineering Visa in Japan.
                        </p>
                    </div>
                </li>
                <li className='section-list-item'>
                    <img src='images/projects/defect_patent.webp' className='project-list-img' />
                    <div className='pl-4'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold'>System and method for detecting surface defect of object</h1>
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
                        <p className='mt-2 text-sm text-secondary-light'>
                            A short-term patent for an innovative system that utilizes a robotic arm equipped with a
                            camera to capture detailed images of an object from various angles. The system then employs
                            a sophisticated detection algorithm to meticulously analyze these images and pinpoint any
                            defects present.
                        </p>
                    </div>
                </li>
                <li className='section-list-item'>
                    <img src='images/projects/logistic_patent.webp' className='project-list-img' />
                    <div className='pl-4'>
                        <div className='flex justify-between'>
                            <h1 className='font-semibold'>
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
                        <p className='mt-2 text-sm text-secondary-light'>
                            A short-term patent of a system designed to predict bottlenecks in cargo logistics at Hong
                            Kong Airport. It harnesses the power of big data analytics by processing data gathered from
                            sensors across the transport belts. The predictive model can proactively identify potential
                            congestion points.
                        </p>
                    </div>
                </li>
            </ul>
        )
    }
]
const acknowledgementSections = [
    {
        title: (
            <>
                My co-workers's <span className='text-accent'>comments</span>?
            </>
        ),
        children: (
            <ul>
                <li className='section-list-item'>
                    <div className='pl-4'>
                        <div className='flex justify-between'>
                            <div className='flex items-center gap-4'>
                                <img src='images/acknowledgement/fran.webp' className='acknowledgement-list-img' />
                                <div>
                                    <h1 className='font-semibold'>Francesco Cursi</h1>
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
                            From my time working alongside David, he has demonstrated his remarkable ability to solve
                            problems and adapt quickly to new subjects. It's all the more impressive given that he
                            transitioned to this field from a completely different career. Any team would be lucky to
                            have him.
                        </p>
                    </div>
                </li>
            </ul>
        )
    }
]

export default function HtmlContent() {
    const contentObserverRef = useRef<IntersectionObserver | null>(null)
    const aboutSectionRef = useRef<HTMLElement>(null!)
    const skillsSectionRef = useRef<HTMLElement>(null!)
    const studySectionRef = useRef<HTMLElement>(null!)
    const lifeSectionRef = useRef<HTMLElement>(null!)
    const workSectionRef = useRef<HTMLElement>(null!)
    const acknowledgementSectionRef = useRef<HTMLElement>(null!)
    const typingTextWrapperRef = useRef<HTMLHeadingElement>(null)
    const typingTextRef = useRef<HTMLSpanElement>(null)
    const contactListRef = useRef<HTMLUListElement>(null)
    const scrollData = useScroll()

    const aboutSectionTop = perfectPageHeight * 2
    const skillsSectionTop = perfectPageHeight * 6
    const studySectionTop = perfectPageHeight * 10
    const lifeSectionTop = perfectPageHeight * 14
    const worksSectionTop = perfectPageHeight * 20
    const acknowledgementSectionTop = perfectPageHeight * 24

    const isNumberInRange = (target: number, low: number, high: number): boolean => {
        if (target >= low && target <= high) {
            return true
        }

        return false
    }

    const setHTMLSectionBorderRadius = (element: HTMLElement, width: number, position: 'left' | 'right') => {
        const elementPosition = element.getBoundingClientRect()
        const topDistanceRatioToWindowTop = elementPosition.top / window.innerHeight
        const bottomDistanceRatioToWindowTop = 1 - elementPosition.bottom / window.innerHeight

        if (position === 'left') {
            element.style.borderTopRightRadius = `${width * topDistanceRatioToWindowTop}px`
            element.style.borderBottomRightRadius = `${width * bottomDistanceRatioToWindowTop}px`
        } else if (position === 'right') {
            element.style.borderTopLeftRadius = `${width * topDistanceRatioToWindowTop}px`
            element.style.borderBottomLeftRadius = `${width * bottomDistanceRatioToWindowTop}px`
        }
    }

    const handleResizeResetBorderRadius = () => {
        const refs = [
            aboutSectionRef,
            skillsSectionRef,
            studySectionRef,
            lifeSectionRef,
            workSectionRef,
            acknowledgementSectionRef
        ]

        for (const ref of refs) {
            if (ref.current) {
                ref.current.style.borderTopRightRadius = '0px'
                ref.current.style.borderBottomRightRadius = '0px'
                ref.current.style.borderTopLeftRadius = '0px'
                ref.current.style.borderBottomLeftRadius = '0px'
            }
        }
    }

    useEffect(() => {
        let currentWord = 0
        let currentLetter = 0
        let shouldType = true

        const typingEffectInterval = setInterval(() => {
            if (typingTextRef.current) {
                typingTextRef.current.textContent = titles[currentWord].slice(0, currentLetter)

                if (currentLetter === titles[currentWord].length) {
                    if (shouldType) {
                        currentLetter += 10
                    }
                    shouldType = false
                } else if (currentLetter === 0 && !shouldType) {
                    currentWord++
                    shouldType = true
                }

                if (currentWord > titles.length - 1) {
                    currentWord = 0
                }

                if (shouldType) {
                    currentLetter++
                } else {
                    currentLetter--
                }
            }
        }, 100)

        return () => {
            clearInterval(typingEffectInterval)
        }
    }, [])

    useEffect(() => {
        const contentObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const entryName = entry.target.getAttribute('data-name')

                        switch (entryName) {
                            case 'ch':
                                entry.target.children.item(0)?.classList.replace('translate-x-[40px]', 'translate-x-0')
                                entry.target.children.item(0)?.classList.replace('opacity-0', 'opacity-100')
                                entry.target.children.item(1)?.classList.replace('w-0', 'w-40')
                                entry.target.children.item(2)?.classList.replace('hidden-content', 'revealed-content')
                                entry.target.children.item(3)?.classList.replace('hidden-content', 'revealed-content')

                                if (contactListRef.current) {
                                    for (const child of contactListRef.current.children) {
                                        child.classList.replace('hidden-content', 'revealed-content')
                                    }
                                }
                                break

                            case 'se':
                                if (entry.target.classList.contains('revealed-content')) {
                                    break
                                }

                                entry.target.classList.replace('hidden-content', 'revealed-content')

                                if (entry.target.children.item(1)?.tagName === 'UL') {
                                    // const increment = 0.2
                                    // let delay = increment
                                    for (const listItem of entry.target.children.item(1)?.children!) {
                                        // const htmlListItem = listItem as HTMLElement

                                        // htmlListItem.addEventListener(
                                        //     'transitionend',
                                        //     function handleResetDelay(e: TransitionEvent) {
                                        //         if (e.propertyName === 'opacity' || e.propertyName === 'transform') {
                                        //             htmlListItem.style.transition = `color 0.2s linear, background-color 0.2s linear, transform 0.2s linear, opacity 0.2s linear`
                                        //             htmlListItem.removeEventListener('transitionend', handleResetDelay)
                                        //         }
                                        //     }
                                        // )
                                        // htmlListItem.style.transition = `color 0.2s linear,background-color 0.2s linear,transform 0.4s ease-out ${delay}s,opacity 0.4s ease-out ${delay}s`
                                        listItem.classList.replace('hidden-content', 'revealed-content')
                                        // delay += increment
                                    }
                                }

                                break
                            default:
                                break
                        }
                    }
                })
            },
            {
                root: scrollData.el,
                rootMargin: '0px',
                threshold: 0.15
            }
        )

        contentObserverRef.current = contentObserver

        return () => {
            contentObserverRef.current?.disconnect()
        }
    }, [])

    useEffect(() => {
        if (typingTextWrapperRef.current) {
            contentObserverRef.current?.observe(typingTextWrapperRef.current)
        }

        return () => {
            if (typingTextWrapperRef.current) {
                contentObserverRef.current?.unobserve(typingTextWrapperRef.current)
            }
        }
    }, [typingTextWrapperRef.current])

    useEffect(() => {
        const handleScrollAnimation = () => {
            const scrollTop = scrollData.el.scrollTop

            const isInAboutSection = isNumberInRange(
                scrollTop,
                aboutSectionTop - perfectPageHeight - 300,
                aboutSectionTop + 2 * perfectPageHeight + 300
            )
            const isInSkillsSection = isNumberInRange(
                scrollTop,
                skillsSectionTop - perfectPageHeight - 300,
                skillsSectionTop + 2 * perfectPageHeight + 300
            )
            const isInReadingSection = isNumberInRange(
                scrollTop,
                studySectionTop - perfectPageHeight - 300,
                studySectionTop + 2 * perfectPageHeight + 300
            )
            const isInLifeSection = isNumberInRange(
                scrollTop,
                lifeSectionTop - perfectPageHeight - 300,
                lifeSectionTop + 2 * perfectPageHeight + 300
            )
            const isInWorkSection = isNumberInRange(
                scrollTop,
                worksSectionTop - perfectPageHeight - 300,
                worksSectionTop + 2 * perfectPageHeight + 300
            )
            const isInAcknowledgementSection = isNumberInRange(
                scrollTop,
                acknowledgementSectionTop - perfectPageHeight - 300,
                acknowledgementSectionTop + 2 * perfectPageHeight + 300
            )

            const width = aboutSectionRef.current?.clientWidth

            switch (true) {
                case isInAboutSection:
                    setHTMLSectionBorderRadius(aboutSectionRef.current, width, 'right')
                    break

                case isInSkillsSection:
                    setHTMLSectionBorderRadius(skillsSectionRef.current, width, 'left')
                    break

                case isInReadingSection:
                    setHTMLSectionBorderRadius(studySectionRef.current, width, 'right')
                    break

                case isInLifeSection:
                    setHTMLSectionBorderRadius(lifeSectionRef.current, width, 'left')
                    break

                case isInWorkSection:
                    setHTMLSectionBorderRadius(workSectionRef.current, width, 'right')
                    break

                case isInAcknowledgementSection:
                    setHTMLSectionBorderRadius(acknowledgementSectionRef.current, width, 'left')
                    break

                default:
                    handleResizeResetBorderRadius()
                    break
            }
        }
        scrollData.el.addEventListener('scroll', handleScrollAnimation)
        window.addEventListener('resize', handleResizeResetBorderRadius)

        return () => {
            scrollData.el.removeEventListener('scroll', handleScrollAnimation)
            window.removeEventListener('resize', handleResizeResetBorderRadius)
        }
    }, [])

    return (
        <Html
            wrapperClass='w-full'
            calculatePosition={() => {
                return [0, 0]
            }}
            className='scroll-container'
            zIndexRange={[0, 0]}
        >
            <HtmlScrollContainer
                top={aboutSectionTop}
                position='right'
                backgroundTitle='About'
                topTitle="Hello. I'm"
                bottomTitle={
                    <>
                        Ho Chi Hang, <span className='text-accent'>David</span>
                        <h1
                            ref={typingTextWrapperRef}
                            className='text-lg font-bold text-secondary [transition:color_0.2s_linear]'
                        >
                            A{' '}
                            <span
                                ref={typingTextRef}
                                className='animate-typing border-r-2 border-accent text-lg font-semibold text-accent'
                            ></span>
                        </h1>
                        <ul ref={contactListRef} className='mt-4 flex gap-4'>
                            <li className='hidden-content [transition:color_0.2s_linear,transform_0.4s_ease-out_0.4s,opacity_0.4s_ease-out_0.4s]'>
                                <a href='https://github.com/davidjpy' target='_blank'>
                                    <FaGithub className='icon-link-lg' />
                                </a>
                            </li>
                            <li className='hidden-content [transition:color_0.2s_linear,transform_0.4s_ease-out_0.45s,opacity_0.4s_ease-out_0.45s]'>
                                <a href='https://www.linkedin.com/in/davidho-web/' target='_blank'>
                                    <FaLinkedin className='icon-link-lg' />
                                </a>
                            </li>
                            <li className='hidden-content [transition:color_0.2s_linear,transform_0.4s_ease-out_0.55s,opacity_0.4s_ease-out_0.55s]'>
                                <a href='https://www.instagram.com/___realdavid/' target='_blank'>
                                    <FaInstagram strokeWidth={20} className='icon-link-lg' />
                                </a>
                            </li>
                        </ul>
                    </>
                }
                contentObserverRef={contentObserverRef}
                ref={aboutSectionRef}
            >
                {aboutSections.map((section, index) => (
                    <HtmlSection key={index} title={section.title} contentObserverRef={contentObserverRef}>
                        {section.children}
                    </HtmlSection>
                ))}
            </HtmlScrollContainer>

            <HtmlScrollContainer
                top={skillsSectionTop}
                position='left'
                backgroundTitle='Skills'
                topTitle='Cool. How about...'
                bottomTitle={
                    <>
                        My <span className='text-accent'> Expertise</span>
                    </>
                }
                contentObserverRef={contentObserverRef}
                ref={skillsSectionRef}
            >
                {skillsSections.map((section, index) => (
                    <HtmlSection key={index} title={section.title} contentObserverRef={contentObserverRef}>
                        {section.children}
                    </HtmlSection>
                ))}
            </HtmlScrollContainer>

            <HtmlScrollContainer
                top={studySectionTop}
                position='right'
                backgroundTitle='Study'
                topTitle='Where Did You Get Those...'
                bottomTitle={
                    <>
                        My <span className='text-accent'> Study</span>
                    </>
                }
                contentObserverRef={contentObserverRef}
                ref={studySectionRef}
            >
                <HtmlSection
                    title={
                        <>
                            Interesting <span className='text-accent'>Books</span> I Have Read?
                        </>
                    }
                    contentObserverRef={contentObserverRef}
                >
                    <ul>
                        {readingList.map((book, index) => (
                            <li
                                key={index}
                                className='hidden-content section-list-item mb-4'
                                style={{
                                    transition: `color 0.2s linear,background-color 0.2s linear,transform 0.4s ease-out ${
                                        (index + 1) * 0.2
                                    }s,opacity 0.4s ease-out ${(index + 1) * 0.2}s`
                                }}
                            >
                                <img src={book.source} className='book-list-img' />
                                <div className='pl-4'>
                                    <div className='flex items-center justify-between'>
                                        <h1 className='font-medium'>{book.title}</h1>
                                        {book.links}

                                    </div>
                                    <p className='mt-2 text-sm text-secondary-light'>{book.summary}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </HtmlSection>

                <HtmlSection
                    title={
                        <>
                            Useful <span className='text-accent'>Courses</span> I would suggest?
                        </>
                    }
                    contentObserverRef={contentObserverRef}
                >
                    <ul>
                        {courseList.map((course, index) => (
                            <li
                                key={index}
                                className='hidden-content section-list-item mb-4'
                                style={{
                                    transition: `color 0.2s linear,background-color 0.2s linear,transform 0.4s ease-out ${
                                        (index + 1) * 0.2
                                    }s,opacity 0.4s ease-out ${(index + 1) * 0.2}s`
                                }}
                            >
                                <figure className='project-list-img-wrapper'>
                                    <img src={course.source} className='project-list-img' />
                                </figure>
                                <div className='pl-4'>
                                    <div className='flex items-center justify-between'>
                                        <h1 className='font-semibold'>{course.title}</h1>
                                        {course.links}
                                    </div>
                                    <p className='mt-2 text-sm text-secondary-light'>{course.summary}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </HtmlSection>
            </HtmlScrollContainer>

            <HtmlScrollContainer
                top={lifeSectionTop}
                position='left'
                backgroundTitle='Life'
                topTitle='Good. More on...'
                bottomTitle={
                    <>
                        My <span className='text-accent'> Life</span>
                    </>
                }
                contentObserverRef={contentObserverRef}
                ref={lifeSectionRef}
            >
                {lifeSections.map((section, index) => (
                    <HtmlSection key={index} title={section.title} contentObserverRef={contentObserverRef}>
                        {section.children}
                    </HtmlSection>
                ))}
            </HtmlScrollContainer>

            <HtmlScrollContainer
                top={worksSectionTop}
                position='right'
                backgroundTitle='Works'
                topTitle="Sure. Here's..."
                bottomTitle={
                    <>
                        My <span className='text-accent'> Works</span>
                    </>
                }
                contentObserverRef={contentObserverRef}
                ref={workSectionRef}
            >
                {worksSections.map((section, index) => (
                    <HtmlSection key={index} title={section.title} contentObserverRef={contentObserverRef}>
                        {section.children}
                    </HtmlSection>
                ))}
            </HtmlScrollContainer>

            <HtmlScrollContainer
                top={acknowledgementSectionTop}
                position='left'
                backgroundTitle='Acknowledgement'
                topTitle="Lastly. There's..."
                bottomTitle={
                    <>
                        The <span className='text-accent'> Acknowledgement</span>
                    </>
                }
                contentObserverRef={contentObserverRef}
                ref={acknowledgementSectionRef}
            >
                {acknowledgementSections.map((section, index) => (
                    <HtmlSection key={index} title={section.title} contentObserverRef={contentObserverRef}>
                        {section.children}
                    </HtmlSection>
                ))}
            </HtmlScrollContainer>
        </Html>
    )
}

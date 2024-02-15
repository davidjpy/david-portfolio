import { useRef, useEffect } from 'react'
import { Html, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
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
    FaKeyboard
} from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiBlender } from 'react-icons/si'
import { MdOutlinePhonelink } from 'react-icons/md'
import { TbBrandThreejs } from 'react-icons/tb'

import { scrollPages } from '@/src/utilities/constants'

import 'swiper/css'
import 'swiper/css/pagination'

const wordChoices = ['Full-Stack Developer', 'Web Designer', '3D Modeler']
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
const funFacts = [
    'I believe golden retriever is the best.',
    // 'I am a concert enjoyer.',
    'I wanna reach the summit of Mount Everest.',
    "I love dark humor, because if a sad story can't be made funny, then it's simply sad.",
    'I am a gamer, and I enjoy high quality RPGs.',
    "I can't swim, just shampooing my hair makes me feel like I'm drowning."
    // 'I would love to travel the world.'
]

export default function HtmlContent() {
    const aboutSectionRef = useRef<HTMLElement>(null!)
    const skillsSectionRef = useRef<HTMLElement>(null!)
    const readingSectionRef = useRef<HTMLElement>(null!)
    const lifeSectionRef = useRef<HTMLElement>(null!)
    const workSectionRef = useRef<HTMLElement>(null!)
    const typingTextRef = useRef<HTMLSpanElement>(null)
    const scrollData = useScroll()

    useEffect(() => {
        let currentWord = 0
        let currentLetter = 0
        let shouldType = true

        const typingEffectInterval = setInterval(() => {
            if (typingTextRef.current) {
                typingTextRef.current.textContent = wordChoices[currentWord].slice(0, currentLetter)

                if (currentLetter === wordChoices[currentWord].length) {
                    if (shouldType) {
                        currentLetter += 10
                    }
                    shouldType = false
                } else if (currentLetter === 0 && !shouldType) {
                    currentWord++
                    shouldType = true
                }

                if (currentWord > wordChoices.length - 1) {
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

    useFrame(() => {
        const isInAboutSection = scrollData.visible(1 / scrollPages, 4 / scrollPages)
        const isInSkillsSection = scrollData.visible(5 / scrollPages, 4 / scrollPages)
        const isInReadingSection = scrollData.visible(9 / scrollPages, 4 / scrollPages)
        const isInLifeSection = scrollData.visible(13 / scrollPages, 4 / scrollPages)
        const isInWorkSection = scrollData.visible(19 / scrollPages, 4 / scrollPages)

        const width = aboutSectionRef.current?.clientWidth

        switch (true) {
            case isInAboutSection:
                setHTMLSectionBorderRadius(aboutSectionRef.current, width, 'right')
                break

            case isInSkillsSection:
                setHTMLSectionBorderRadius(skillsSectionRef.current, width, 'left')
                break

            case isInReadingSection:
                setHTMLSectionBorderRadius(readingSectionRef.current, width, 'right')
                break

            case isInLifeSection:
                setHTMLSectionBorderRadius(lifeSectionRef.current, width, 'left')
                break

            case isInWorkSection:
                setHTMLSectionBorderRadius(workSectionRef.current, width, 'right')
                break

            default:
                break
        }
    })

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

    return (
        <Html
            wrapperClass='w-full'
            calculatePosition={() => {
                return [0, 0]
            }}
            className='scroll-container'
        >
            <section ref={aboutSectionRef} className='scroll-text-box right-0 top-[200vh]'>
                <header>
                    <h1 className='header-bg-text'>About</h1>
                </header>
                <div className='header-wrapper'>
                    <div className='header-divider' />
                    <h1 className='text-lg font-bold text-secondary'>Hello. I'm</h1>
                    <h1 className='text-xl font-black text-secondary'>
                        Ho Chi Hang, <span className='text-accent'>David</span>
                    </h1>
                    <h1 className='text-lg font-bold text-secondary'>
                        A{' '}
                        <span
                            ref={typingTextRef}
                            className='animate-typing border-r-2 border-accent text-lg font-semibold text-accent'
                        ></span>
                    </h1>
                </div>

                <ul className='mt-4 flex gap-4'>
                    <li>
                        <a href='https://github.com/davidjpy' target='_blank'>
                            <FaGithub className='icon-link' />
                        </a>
                    </li>
                    <li>
                        <a href='https://www.linkedin.com/in/davidho-web/' target='_blank'>
                            <FaLinkedin className='icon-link' />
                        </a>
                    </li>
                    <li>
                        <a href='https://www.instagram.com/___realdavid/' target='_blank'>
                            <FaInstagram strokeWidth={20} className='icon-link' />
                        </a>
                    </li>
                </ul>

                <section className='mt-12 text-secondary'>
                    <header className='mb-2 flex items-center'>
                        <div className='mr-2 h-0.5 w-4 bg-accent' />
                        <h1 className='font-bold'>
                            <span className='text-accent'>Who</span> am I?
                        </h1>
                    </header>
                    <p>
                        I am an ambitious software engineer based in Hong Kong with over 2 years of professional
                        experience in transforming ideas from 0 to 100 and creating captivating digital experiences that
                        embody elegance, simplicity, and detail. In my full-time role as an application developer, I've
                        successfully made several significant improvements to products with over 2000 daily users while
                        laying the groundwork for a freelance career through targeted networking and skill-building. I
                        am also committed to a long-life journey of continuous growth to stay at the forefront of
                        technology and personal development.
                    </p>
                </section>

                <section className='mt-12 text-secondary'>
                    <header className='mb-2 flex items-center'>
                        <div className='mr-2 h-0.5 w-4 bg-accent' />
                        <h1 className='font-bold'>
                            How it <span className='text-accent'>started</span>?
                        </h1>
                    </header>
                    <p>
                        I'm a self-taught software engineer fueled by a deep passion for the digital world. I began my
                        career as a building surveyor, a field steeped in rigid practices that often limited my creative
                        spirit. Seeking a change, I discovered the intriguing world of programming, a place where
                        innovation thrives and creative problem-solving is encouraged. This propelled me into a mountain
                        of code, where I've found passion for crafting web applications with stunning visuals and
                        software that embrace efficiency.
                    </p>
                </section>

                {/* <section className='mt-12 text-secondary'>
                    <header className='mb-2 flex items-center'>
                        <div className='mr-2 h-0.5 w-4 bg-accent' />
                        <h1 className='font-bold'>
                            Fun <span className='text-accent'>facts</span> about me?
                        </h1>
                    </header>
                    <ul>
                        {funFacts.map((fact) => (
                            <li key={fact}>{fact}</li>
                        ))}
                    </ul>
                </section>

                <section className='mt-12 text-secondary'>
                    <header className='mb-2 flex items-center'>
                        <div className='mr-2 h-0.5 w-4 bg-accent' />
                        <h1 className='font-bold'>
                            What can I offer as a <span className='text-accent'>web developer</span>?
                        </h1>
                    </header>
                    <ul>
                        {softwareSkills.map((skill) => (
                            <li
                                key={skill}
                                className='mr-4 mt-4 inline-block rounded-md bg-[#FFC3AC] pb-2 pl-4 pr-4 pt-2 font-light'
                            >
                                {skill}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className='mt-12 text-secondary'>
                    <header className='mb-2 flex items-center'>
                        <div className='mr-2 h-0.5 w-4 bg-accent' />
                        <h1 className='font-bold'>
                            What other <span className='text-accent'>skills</span> do I have?
                        </h1>
                    </header>
                    <ul>
                        {otherSkills.map((skill) => (
                            <li
                                key={skill}
                                className='mr-4 mt-4 inline-block rounded-md bg-[#FFC3AC] pb-2 pl-4 pr-4 pt-2 font-light'
                            >
                                {skill}
                            </li>
                        ))}
                    </ul>
                </section> */}
            </section>

            <section ref={skillsSectionRef} className='scroll-text-box left-0 top-[600vh]'>
                <header>
                    <h1 className='header-bg-text'>Skills</h1>
                </header>
                <header className='header-wrapper'>
                    <div className='header-divider' />
                    <h1 className='text-lg font-bold text-secondary'>Cool. How about...</h1>
                    <h1 className='text-xl font-black text-secondary'>
                        My <span className='text-accent'> Expertise</span>
                    </h1>
                </header>

                <section className='mt-12 text-secondary'>
                    <header className='mb-2 flex items-center'>
                        <div className='mr-2 h-0.5 w-4 bg-accent' />
                        <h1 className='font-bold'>
                            What can I offer as a <span className='text-accent'>software developer</span>?
                        </h1>
                    </header>
                    <ul>
                        {softwareSkills.map((skill) => (
                            <li
                                key={skill.name}
                                className='mr-6 mt-6 inline-block rounded-md bg-primary-monochrome pb-4 pl-6 pr-6 pt-4 text-center'
                            >
                                <span>{skill.icon}</span>
                                <p className='mt-2'>{skill.name}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className='mt-12 text-secondary'>
                    <header className='mb-2 flex items-center'>
                        <div className='mr-2 h-0.5 w-4 bg-accent' />
                        <h1 className='font-bold'>
                            What other <span className='text-accent'>skills</span> do I have?
                        </h1>
                    </header>
                    <ul>
                        {otherSkills.map((skill) => (
                            <li
                                key={skill.name}
                                className='mr-6 mt-6 inline-block rounded-md bg-primary-monochrome pb-4 pl-6 pr-6 pt-4 text-center'
                            >
                                <span>{skill.icon}</span>
                                <p className='mt-2'>{skill.name}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </section>

            <section ref={readingSectionRef} className='scroll-text-box right-0 top-[1000vh]'>
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

            <section ref={lifeSectionRef} className='scroll-text-box left-0 top-[1400vh]'>
                <header>
                    <h1 className='header-bg-text'>Life</h1>
                </header>
                <header className='header-wrapper'>
                    <div className='header-divider' />
                    <h1 className='text-lg font-bold text-secondary'>Good. More on...</h1>
                    <h1 className='text-xl font-black text-secondary'>
                        My <span className='text-accent'> Life</span>
                    </h1>
                </header>

                <section className='mt-12 text-secondary'>
                    <header className='mb-2 flex items-center'>
                        <div className='mr-2 h-0.5 w-4 bg-accent' />
                        <h1 className='font-bold'>
                            My <span className='text-accent'>daily</span> life?
                        </h1>
                    </header>
                    <p>
                        My life is simple yet joyful, you'll either find me sitting in front of the computer, losing
                        myself in the latest gaming adventure or a pile of messy code, or exploring the hidden gems of
                        the city. I often find surprises and beauty in those untold places. I enjoy talking to strangers
                        and meeting new friends. I always get along with people regardless of their background, culture,
                        and language.
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
                </section>

                {/* <section className='mt-12 text-secondary'>
                    <header className='mb-2 flex items-center'>
                        <div className='mr-2 h-0.5 w-4 bg-accent' />
                        <h1 className='font-bold'>
                            Fun <span className='text-accent'>facts</span> about me?
                        </h1>
                    </header>
                    <ul className='mt-4'>
                        {funFacts.map((fact) => (
                            <li key={fact} className='mt-2'>
                                <p>{fact}</p>
                            </li>
                        ))}
                    </ul>
                </section> */}
            </section>

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
                                className='max-h-[60px] rounded-[2px] object-cover shadow-lg'
                            />
                            <div className='pl-4'>
                                <h1 className='font-bold'>WildBear Shop</h1>
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
        </Html>
    )
}

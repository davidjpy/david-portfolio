import { useRef, useEffect } from 'react'
import { Html, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
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

const wordChoices = ['Full-Stack Developer', 'Web Designer', '3D Modeler']
const funFacts = [
    'I believe life without a golden retriever is incomplete.',
    'I am a concert enjoyer.',
    'I will accomplish my lifelong goal of reaching the summit of Mount Everest.',
    "I love dark humor, because if a sad story can't be made funny, then it's simply sad.",
    'I enjoy high quality RPGs.',
    "I can't swim, just shampooing my hair makes me feel like I'm drowning. :("
]
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

export default function HtmlContent() {
    const aboutSectionRef = useRef<HTMLElement>(null!)
    const skillsSectionRef = useRef<HTMLElement>(null!)
    const readingSectionRef = useRef<HTMLElement>(null!)
    const lifeSectionRef = useRef<HTMLElement>(null!)
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
                                <h1 className='inline font-extrabold'>
                                    {book.title}
                                    <span className='font-normal text-accent'> - {book.author}</span>
                                </h1>
                                <p className='mt-2'>{book.summary}</p>
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
                                <h1 className='inline font-extrabold'>
                                    {book.title}
                                    <span className='font-normal text-accent'> - {book.author}</span>
                                </h1>
                                <p className='mt-2'>{book.summary}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </section>
        </Html>
    )
}

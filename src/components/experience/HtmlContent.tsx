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
const webDevSkills = [
    { name: 'Typescript', icon: <SiTypescript className='icon' /> },
    { name: 'Python', icon: <FaPython className='icon' /> },
    { name: 'React', icon: <FaReact strokeWidth={8} className='icon' /> },
    { name: 'Vue', icon: <FaVuejs className='icon' /> },
    { name: 'ThreeJS', icon: <TbBrandThreejs strokeWidth={1.5} className='icon' /> },
    { name: 'Node', icon: <FaNodeJs strokeWidth={8} className='icon' /> },
    { name: 'Semantic HTML', icon: <FaHtml5 className='icon' /> },
    { name: 'Responsiveness', icon: <MdOutlinePhonelink className='icon' /> },
    { name: 'Acessibility', icon: <FaKeyboard className='icon' /> },
    { name: 'CSS', icon: <FaCss3Alt className='icon' /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className='icon' /> },
    { name: 'Git', icon: <FaGitAlt className='icon' /> },
    { name: 'Docker', icon: <FaDocker className='icon' /> }
]
// const otherSkills = ['Blender', 'Stable Diffusion', 'Cantonese', 'Mandarin', 'English', 'Japanese (In Progress)']
const otherSkills = [
    { name: 'Blender', icon: <SiBlender className='icon' /> },
    { name: 'Stable Diffusion', icon: <FaImages className='icon' /> }
]

export default function HtmlContent() {
    const aboutSectionRef = useRef<HTMLElement>(null!)
    const skillsSectionRef = useRef<HTMLElement>(null!)
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
        const isInFirstHTML = scrollData.visible(1 / scrollPages, 4 / scrollPages)
        const isInSecondHTML = scrollData.visible(5 / scrollPages, 4 / scrollPages)
        const width = aboutSectionRef.current?.clientWidth

        if (isInFirstHTML) {
            setHTMLSectionBorderRadius(aboutSectionRef.current, width, 'right')
        } else if (isInSecondHTML) {
            setHTMLSectionBorderRadius(skillsSectionRef.current, width, 'left')
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
                {/* I'm a self-taught software engineer fueled by a deep fascination with the digital realm. My career began in building surveying, a field steeped in rigid practices that often stifled my creative spirit. Craving a change, I discovered the dynamic world of programming—a realm where innovation thrives and creative problem-solving is celebrated. This epiphany propelled me into the arms of code, where I've found a passion for [specific area, e.g., crafting intuitive web applications]. Each line of code is a building block in constructing something new, mirroring the surveyor's precision but with the boundless creativity that I had always yearned for. */}
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
                        {webDevSkills.map((skill) => (
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
                            What can I offer as a <span className='text-accent'>web developer</span>?
                        </h1>
                    </header>
                    <ul>
                        {webDevSkills.map((skill) => (
                            <li
                                key={skill.name}
                                className='mr-4 mt-4 inline-block rounded-md bg-primary-monochrome pb-2 pl-8 pr-8 pt-2 text-center'
                            >
                                <span className='inline-block'>{skill.icon}</span>
                                <p>{skill.name}</p>
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
                                className='mr-4 mt-4 inline-block rounded-md bg-primary-monochrome pb-2 pl-8 pr-8 pt-2 text-center'
                            >
                                <span className='inline-block'>{skill.icon}</span>
                                <p>{skill.name}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </section>
        </Html>
    )
}

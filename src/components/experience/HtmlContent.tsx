import { useRef, useEffect } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const wordChoices = ['Application Developer', 'Web Designer', '3D Modeler']
const funFacts = [
    'I believe life without a golden retriever is incomplete.',
    'I am a concert enjoyer.',
    'I will accomplish my lifelong goal of reaching the summit of Mount Everest.',
    "I love dark humor, because if a sad story can't be made funny, then it's simply sad.",
    'I enjoy high quality RPGs.',
    "I can't swim, just shampooing my hair makes me feel like I'm drowning. :("
]
const webDevSkills = [
    'Typescript',
    'Python',
    'React',
    'Vue',
    'Accessible & Responsive Design',
    'ThreeJS',
    'Node',
    'Semantic HTML',
    'CSS',
    'Tailwind CSS',
    'Git',
    'Docker'
]
const otherSkills = ['Blender', 'Stable Diffusion', 'Cantonese', 'Mandarin', 'English', 'Japanese (In Progress)']

export default function HtmlContent() {
    const aboutSectionRef = useRef<HTMLDivElement>(null)
    const typingTextRef = useRef<HTMLSpanElement>(null)

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
        if (aboutSectionRef.current) {
            const topDistanceRatioToWindowTop = aboutSectionRef.current.getBoundingClientRect().top / window.innerHeight
            const bottomDistanceRatioToWindowTop =
                1 - aboutSectionRef.current.getBoundingClientRect().bottom / window.innerHeight

            const width = aboutSectionRef.current.clientWidth
            aboutSectionRef.current.style.borderTopLeftRadius = `${width * topDistanceRatioToWindowTop}px`
            aboutSectionRef.current.style.borderBottomLeftRadius = `${width * bottomDistanceRatioToWindowTop}px`
        }
    })

    return (
        <Html
            ref={aboutSectionRef}
            wrapperClass='w-full'
            calculatePosition={() => {
                return [0, 0]
            }}
            className='scroll-content'
        >
            <section>
                <div className='mb-4 h-1 w-16 bg-accent' />
                <header>
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
                </header>
                <p className='mt-4 text-secondary'>
                    An innovator at heart, I transform ideas into captivating digital experiences that embody elegance,
                    simplicity, and details.
                </p>

                <section className='mt-12 text-secondary'>
                    <header className='mb-2 flex items-center'>
                        <div className='mr-2 h-0.5 w-4 bg-accent' />
                        <h1 className='font-bold'>Who am I?</h1>
                    </header>
                    <p>
                        I'm a passionate self-taught web developer with over 2 years of professional experience now
                        residing in Hong Kong. I once was a building surveyor before falling in love with the intriguing
                        world of programming, which not only permits but also encourages and rewards creativity in
                        problem resolution.
                    </p>
                </section>

                <section className='mt-12 text-secondary'>
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
                </section>
            </section>
        </Html>
    )
}

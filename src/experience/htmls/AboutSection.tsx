import { useRef, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

interface Props {
    aboutSectionRef: React.MutableRefObject<HTMLElement>
    top: number
}

const titles = ['Full-Stack Developer', 'Web Designer', '3D Modeler']

export default function AboutSection({ aboutSectionRef, top }: Props) {
    const typingTextRef = useRef<HTMLSpanElement>(null)

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

    return (
        <section ref={aboutSectionRef} className={`scroll-text-box right-0 top-[${top}px]`}>
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
                        <FaGithub className='icon-link-lg' />
                    </a>
                </li>
                <li>
                    <a href='https://www.linkedin.com/in/davidho-web/' target='_blank'>
                        <FaLinkedin className='icon-link-lg' />
                    </a>
                </li>
                <li>
                    <a href='https://www.instagram.com/___realdavid/' target='_blank'>
                        <FaInstagram strokeWidth={20} className='icon-link-lg' />
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
                    I am an ambitious software engineer based in Hong Kong with over 2 years of professional experience
                    in transforming ideas from 0 to 100 and creating captivating digital experiences that embody
                    elegance, simplicity, and detail. In my full-time role as an application developer, I've
                    successfully made several significant improvements to products with over 2000 daily users while
                    laying the groundwork for a freelance career through targeted networking and skill-building. I am
                    also committed to a long-life journey of continuous growth to stay at the forefront of technology
                    and personal development.
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
                    spirit. Seeking a change, I discovered the intriguing world of programming, a place where innovation
                    thrives and creative problem-solving is encouraged. This propelled me into a mountain of code, where
                    I've found passion for crafting web applications with stunning visuals and software that embrace
                    efficiency.
                </p>
            </section>
        </section>
    )
}

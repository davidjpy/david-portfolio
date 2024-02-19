import {
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
interface Props {
    skillsSectionRef: React.MutableRefObject<HTMLElement>
}

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

export default function SkillsSection({ skillsSectionRef }: Props) {
    return (
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
    )
}

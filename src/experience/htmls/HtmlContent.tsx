import { useEffect, useRef, memo, useState } from 'react'
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

import HtmlScrollContainer from '@/src/experience/htmls/HtmlScrollContainer'
import HtmlSection from '@/src/experience/htmls/HtmlSection'
import PhotoMasonry from '@/src/experience/htmls/PhotoMasonry'
import {
    perfectPageHeight,
    aboutSectionTop,
    skillsSectionTop,
    studySectionTop,
    lifeSectionTop,
    worksSectionTop,
    testimonialsSectionTop
} from '@/src/utilities/constants'

const titles = [
    'Full-Stack Developer',
    'Web Designer',
    '3D Modeler',
    '2D Animator',
    'Gamer',
    'Dog Lover',
    'Traveller',
    'Normal Person'
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
        image: 'images/study/clean_code.webp',
        alt: 'Clean Code: A Handbook of Agile Software Craftsmanship book cover',
        href: 'https://github.com/jnguyen095/clean-code/tree/master',
        ariaLabel: 'Clean Code: A Handbook of Agile Software Craftsmanship (opens in a new tab)',
        linkIcons: (
            <ul className='flex gap-2'>
                <li className='focusable-li'>
                    <a
                        href='https://github.com/jnguyen095/clean-code/tree/master'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='Clean Code: A Handbook of Agile Software Craftsmanship (opens in a new tab)'
                    >
                        <FaGithub className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary:
            'A valuable lesson on how to improve the readiablity, maintainability and extensibility of the codebase.',

        keypoints: (
            <ul>
                <li className='keypoint-list-item'>Naming Convention</li>
                <li className='keypoint-list-item'>Pure Function</li>
                <li className='keypoint-list-item'>Centralized Error Handling</li>
            </ul>
        )
    },
    {
        title: 'New FE Textbook Vol.1 IT Fundamentals',
        image: 'images/study/it_fundamentals.webp',
        alt: 'New FE Textbook Vol.1 IT Fundamentals book cover',
        href: 'https://itpec.org/news/20220921_LMS.html',
        ariaLabel: 'New FE Textbook Vol.1 IT Fundamentals (opens in a new tab)',
        linkIcons: (
            <ul className='flex gap-2'>
                <li className='focusable-li'>
                    <a
                        href='https://itpec.org/news/20220921_LMS.html'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='New FE Textbook Vol.1 IT Fundamentals (opens in a new tab)'
                    >
                        <FaLink className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary: 'The book gives a firm foundation in IT principles, which are necessary for my daily work.',
        keypoints: (
            <ul>
                <li className='keypoint-list-item'>Information Processing Systems</li>
                <li className='keypoint-list-item'>Hardwware & Software</li>
                <li className='keypoint-list-item'>Database</li>
                <li className='keypoint-list-item'>Network</li>
                <li className='keypoint-list-item'>Security</li>
                <li className='keypoint-list-item'>DSA</li>
            </ul>
        )
    },
    {
        title: 'New FE Textbook Vol.2 IT Strategy & Management',
        image: 'images/study/it_strategy_and_management.webp',
        alt: 'New FE Textbook Vol.2 IT Strategy & Management book cover',
        href: 'https://itpec.org/news/20220921_LMS.html',
        ariaLabel: 'New FE Textbook Vol.2 IT Strategy & Management (opens in a new tab)',
        linkIcons: (
            <ul className='flex gap-2'>
                <li className='focusable-li'>
                    <a
                        href='https://itpec.org/news/20220921_LMS.html'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='New FE Textbook Vol.2 IT Strategy & Management (opens in a new tab)'
                    >
                        <FaLink className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary:
            'A sophisticated discussion on aligning IT with business objectives, project management & strategic innovation.',
        keypoints: (
            <ul>
                <li className='keypoint-list-item'>SDLC Model</li>
                <li className='keypoint-list-item'>Risk Management</li>
                <li className='keypoint-list-item'>Data-Driven Decision-Making</li>
            </ul>
        )
    }
]
const courseList = [
    {
        title: 'Three.js Journey',
        author: 'Robert Cecil Martin',
        image: 'images/study/threejs_journey_cert.webp',
        alt: 'Three.js Journey certificate of completion',
        href: 'https://threejs-journey.com/',
        ariaLabel: 'Three.js Journey (opens in a new tab)',
        linkIcons: (
            <ul className='flex gap-2'>
                <li className='focusable-li'>
                    <a
                        href='https://threejs-journey.com/'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='Three.js Journey (opens in a new tab)'
                    >
                        <FaLink className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary: `An extensive 91-hour program that expanded my horizon of 3D web graphics.`,
        keypoints: (
            <ul>
                <li className='keypoint-list-item'>WebGL</li>
                <li className='keypoint-list-item'>Three.js</li>
                <li className='keypoint-list-item'>GLSL</li>
                <li className='keypoint-list-item'>React Three Fiber</li>
                <li className='keypoint-list-item'>Blender</li>
            </ul>
        )
    },
    {
        title: 'Harvard CS50: Introduction to Computer Science',
        author: 'Robert Cecil Martin',
        image: 'images/study/cs50.webp',
        alt: 'Harvard CS50: Introduction to Computer Science youtube preview',
        href: 'https://www.youtube.com/watch?v=8mAITcNt710&t=1s&ab_channel=freeCodeCamp.org',
        ariaLabel: 'Harvard CS50: Introduction to Computer Science (opens in a new tab)',
        linkIcons: (
            <ul className='flex gap-2'>
                <li className='focusable-li'>
                    <a
                        href='https://www.youtube.com/watch?v=8mAITcNt710&t=1s&ab_channel=freeCodeCamp.org'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='Harvard CS50: Introduction to Computer Science (opens in a new tab)'
                    >
                        <FaYoutube className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary:
            'An in-depth dive into the fundamentals of computer science. Additionally, it helped me learn how to think programmatically.',
        keypoints: (
            <ul>
                <li className='keypoint-list-item'>C</li>
                <li className='keypoint-list-item'>Memory Allocation</li>
                <li className='keypoint-list-item'>DSA</li>
                <li className='keypoint-list-item'>Python</li>
                <li className='keypoint-list-item'>Database</li>
            </ul>
        )
    },
    {
        title: 'MIT 6.006 Introduction to Algorithms',
        author: 'Robert Cecil Martin',
        image: 'images/study/mit6.006.webp',
        alt: 'MIT 6.006 Introduction to Algorithms youtube preview',
        href: 'https://www.youtube.com/watch?v=HtSuA80QTyo&ab_channel=MITOpenCourseWare',
        ariaLabel: 'MIT 6.006 Introduction to Algorithms (opens in a new tab)',
        linkIcons: (
            <ul className='flex gap-2'>
                <li className='focusable-li'>
                    <a
                        href='https://www.youtube.com/watch?v=HtSuA80QTyo&ab_channel=MITOpenCourseWare'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='MIT 6.006 Introduction to Algorithms (opens in a new tab)'
                    >
                        <FaYoutube className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary: 'An introduction to basic data structures and algorithmic approaches to programming problems.',
        keypoints: (
            <ul>
                <li className='keypoint-list-item'>DSA</li>
                <li className='keypoint-list-item'>Space & Time Complexity</li>
            </ul>
        )
    },
    {
        title: 'Stanford CS229: Machine Learning',
        author: 'Robert Cecil Martin',
        image: 'images/study/cs229.webp',
        alt: 'Stanford CS229: Machine Learning youtube preview',
        href: 'https://www.youtube.com/watch?v=jGwO_UgTS7I&ab_channel=StanfordOnline',
        ariaLabel: 'Stanford CS229: Machine Learning (opens in a new tab)',
        linkIcons: (
            <ul className='flex gap-2'>
                <li className='focusable-li'>
                    <a
                        href='https://www.youtube.com/watch?v=jGwO_UgTS7I&ab_channel=StanfordOnline'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='Stanford CS229: Machine Learning (opens in a new tab)'
                    >
                        <FaYoutube className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary: 'The principles of machine learning and pattern recognition are well-established by this course.',
        keypoints: (
            <ul>
                <li className='keypoint-list-item'>Algebra</li>
                <li className='keypoint-list-item'>Regression</li>
                <li className='keypoint-list-item'>Gradient Descent</li>
                <li className='keypoint-list-item'>CNN</li>
            </ul>
        )
    },
    {
        title: 'Bulletproof React',
        author: 'Robert Cecil Martin',
        image: 'images/study/bulletproof_react.webp',
        alt: 'Bulletproof React github preview',
        href: 'https://github.com/alan2207/bulletproof-react',
        ariaLabel: 'Bulletproof React (opens in a new tab)',
        linkIcons: (
            <ul className='flex gap-2'>
                <li className='focusable-li'>
                    <a
                        href='https://github.com/alan2207/bulletproof-react'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='Bulletproof React (opens in a new tab)'
                    >
                        <FaGithub className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary: 'A guide on industry best practices for React.',
        keypoints: (
            <ul>
                <li className='keypoint-list-item'>Style</li>
                <li className='keypoint-list-item'>Folder Structure</li>
                <li className='keypoint-list-item'>Testing</li>
                <li className='keypoint-list-item'>Performance</li>
                <li className='keypoint-list-item'>State Management</li>
                <li className='keypoint-list-item'> Error Handling</li>
            </ul>
        )
    }
]
const workList = [
    {
        title: 'WildBear Shop',
        image: 'images/work/wildbear.webp',
        alt: 'WildBear Shop hero section',
        href: 'https://www.wildbear-shop.com/',
        ariaLabel: 'WildBear Shop (opens in a new tab)',
        linkIcons: (
            <ul className='flex gap-2'>
                <li className='focusable-li'>
                    <a
                        href='https://github.com/davidjpy/wildbear'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='GitHub (opens in a new tab)'
                    >
                        <FaGithub className='icon-link-md' />
                    </a>
                </li>
                <li className='focusable-li'>
                    <a
                        href='https://www.wildbear-shop.com/'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='WildBear Shop (opens in a new tab)'
                    >
                        <FaLink className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary: `A demo project featuring a React frontend and a Django backend with a PostgreSQL database. They're deployed on Netlify and AWS respectively.`,
        keypoints: (
            <ul>
                <li className='keypoint-list-item'>Javascript</li>
                <li className='keypoint-list-item'>React</li>
                <li className='keypoint-list-item'>Redux</li>
                <li className='keypoint-list-item'>Python</li>
                <li className='keypoint-list-item'>Django</li>
                <li className='keypoint-list-item'>PostgreSQL</li>
                <li className='keypoint-list-item'>Netlify</li>
                <li className='keypoint-list-item'>AWS</li>
            </ul>
        )
    },
    {
        title: 'Lighthouse Portfolio',
        image: 'images/work/portfolio.webp',
        alt: 'Lighthouse Portfolio hero section',
        href: 'https://www.wildbear-shop.com/',
        ariaLabel: 'Lighthouse Portfolio (opens in a new tab)',
        linkIcons: (
            <ul className='flex gap-2'>
                <li className='focusable-li'>
                    <a
                        href='https://github.com/davidjpy/wildbear'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='GitHub (opens in a new tab)'
                    >
                        <FaGithub className='icon-link-md' />
                    </a>
                </li>
                <li className='focusable-li'>
                    <a
                        href='https://www.wildbear-shop.com/'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='Lighthouse Portfolio (opens in a new tab)'
                    >
                        <FaLink className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary: `An innovative experience by integrating 3D visuals and interactive elements into web. It delivers a captivating interface that pushes the boundaries of traditional web design.`,
        keypoints: (
            <ul>
                <li className='keypoint-list-item'>Typescript</li>
                <li className='keypoint-list-item'>React</li>
                <li className='keypoint-list-item'>R3F</li>
                <li className='keypoint-list-item'>GLSL</li>
                <li className='keypoint-list-item'>Tailwind CSS </li>
                <li className='keypoint-list-item'>Blender</li>
                <li className='keypoint-list-item'>React Spring</li>
                <li className='keypoint-list-item'>Adobe After Effects</li>
                <li className='keypoint-list-item'>Lottie</li>
            </ul>
        )
    }
]
const certificateList = [
    {
        title: 'System and method for detecting surface defect of object',
        image: 'images/work/defect_patent.webp',
        alt: 'System and method for detecting surface defect of object preview',
        ariaLabel: 'System and method for detecting surface defect of object (opens in a new tab)',
        href: 'https://esearch.ipd.gov.hk/nis-pos-view/#/pt/details/view/3281124_32023070552.9/0/1/10/0/null_null/KCFeIShhcHBsaWNOdW1iZXI6KDMyMDIzMDcwNTUyLjkpKSFeISkgQU5EIHB0UmVjb3JkU2VxOjE%3D?lang=en',
        linkIcons: (
            <ul className='flex gap-2'>
                <li className='focusable-li'>
                    <a
                        href='https://esearch.ipd.gov.hk/nis-pos-view/#/pt/details/view/3281124_32023070552.9/0/1/10/0/null_null/KCFeIShhcHBsaWNOdW1iZXI6KDMyMDIzMDcwNTUyLjkpKSFeISkgQU5EIHB0UmVjb3JkU2VxOjE%3D?lang=en'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='System and method for detecting surface defect of object (opens in a new tab)'
                    >
                        <FaLink className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary: `A short-term patent of a system that utilizes a robotic arm equipped with a camera to capture images of an object from various angles. It employs a detection algorithm to pinpoint any defects present on the images.`,
        keypoints: (
            <ul>
                <li className='keypoint-list-item'>Machine Learning</li>
                <li className='keypoint-list-item'>CNN</li>
                <li className='keypoint-list-item'>Robotics</li>
                <li className='keypoint-list-item'>Python</li>
                <li className='keypoint-list-item'>React</li>
                <li className='keypoint-list-item'>ActiveMQ</li>
            </ul>
        )
    },
    {
        title: `Method for detecting and predicting a bottleneck in a transportation process of a
        logistics center`,
        image: 'images/work/logistic_patent.webp',
        alt: 'Method for detecting and predicting a bottleneck in a transportation process of a logistics center preview',
        href: 'https://esearch.ipd.gov.hk/nis-pos-view/#/pt/details/view/3276488_32023070062.9/0/1/10/0/null_null/KCFeIShhcHBsaWNOdW1iZXI6KDMyMDIzMDcwMDYyLjkpKSFeISkgQU5EIHB0UmVjb3JkU2VxOjE%3D?lang=en',
        ariaLabel:
            'Method for detecting and predicting a bottleneck in a transportation process of a logistics center (opens in a new tab)',
        linkIcons: (
            <ul className='flex gap-2'>
                <li className='focusable-li'>
                    <a
                        href='https://esearch.ipd.gov.hk/nis-pos-view/#/pt/details/view/3276488_32023070062.9/0/1/10/0/null_null/KCFeIShhcHBsaWNOdW1iZXI6KDMyMDIzMDcwMDYyLjkpKSFeISkgQU5EIHB0UmVjb3JkU2VxOjE%3D?lang=en'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='Method for detecting and predicting a bottleneck in a transportation process of a
                        logistics center (opens in a new tab)'
                    >
                        <FaLink className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary: `A short-term patent of a system for predicting bottlenecks in cargo logistics at Hong Kong Airport. We gathered data from sensors across the transport belts and created a predictive model can proactively identify potential congestion points.`,
        keypoints: (
            <ul>
                <li className='keypoint-list-item'>IoT</li>
                <li className='keypoint-list-item'>Big Data</li>
                <li className='keypoint-list-item'>React</li>
                <li className='keypoint-list-item'>Python</li>
            </ul>
        )
    },
    {
        title: 'FE Exam Certificate',
        image: 'images/work/FE_exam_cert.webp',
        alt: 'FE Exam Certificate',
        href: 'https://itpec.org/about/itpec-common-exam.html',
        ariaLabel: 'ITPEC Common Examination (opens in a new tab)',
        linkIcons: (
            <ul className='flex gap-2'>
                <li className='focusable-li'>
                    <a
                        href='https://itpec.org/about/itpec-common-exam.html'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='ITPEC Common Examination (opens in a new tab)'
                    >
                        <FaLink className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary: `I traveled to the Philippines for the Fundamental Information Technology Engineer Examination. It earned me the qualifications for the Engineering Visa in Japan.`
    },
    {
        title: "Time's Person of the Year 2006",
        image: 'images/work/times_person_of_the_year.webp',
        alt: "Time's Person of the Year 2006 preview",
        href: 'https://en.wikipedia.org/wiki/You_(Time_Person_of_the_Year)',
        ariaLabel: "Time's Person of the Year 2006 (opens in a new tab)",
        linkIcons: (
            <ul className='flex gap-2'>
                <li className='focusable-li'>
                    <a
                        href='https://en.wikipedia.org/wiki/You_(Time_Person_of_the_Year)'
                        target='_blank'
                        aria-label="Time's Person of the Year 2006 (opens in a new tab)"
                    >
                        <FaLink className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary: `In 2006, Time named me the official nominee for Person of the Year. I'm honored to receive such a distinction.`
    }
]
const testimonialsList = [
    {
        name: 'Francesco Cursi',
        title: 'Sr. Research Engineer, Huawei',
        image: 'images/testimonials/fran.webp',
        alt: "Francesco Cursi's avatar",
        href: 'https://francescocursi.com/',
        ariaLabel: 'Francesco Cursi (opens in a new tab)',
        linkIcons: (
            <ul className='flex gap-2'>
                <li className='focusable-li'>
                    <a
                        href='https://www.linkedin.com/in/francesco-c-a94568111/'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='Linkedin (opens in a new tab)'
                    >
                        <FaLinkedin className='icon-link-md' />
                    </a>
                </li>
                <li className='focusable-li'>
                    <a
                        href='https://github.com/cursi36'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='GitHub (opens in a new tab)'
                    >
                        <FaGithub className='icon-link-md' />
                    </a>
                </li>
                <li className='focusable-li'>
                    <a
                        href='https://francescocursi.com/'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='Francesco Cursi (opens in a new tab)'
                    >
                        <FaLink className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary: `From my time working alongside David, he has demonstrated his remarkable ability to solve problems and adapt quickly to new subjects. It's all the more impressive given that he transitioned to this field from a completely different career. Any team would be lucky to have him.`
    },
    {
        name: 'Adah Hu',
        title: 'Head of Software Engineering, FLAIR',
        image: 'images/testimonials/adah.webp',
        alt: "Adah Hu's avatar",
        href: 'https://www.linkedin.com/in/adah-h-a0854554/',
        ariaLabel: 'Adah Hu (opens in a new tab)',
        linkIcons: (
            <ul className='flex gap-2'>
                <li className='focusable-li'>
                    <a
                        href='https://www.linkedin.com/in/adah-h-a0854554/'
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label='Linkedin (opens in a new tab)'
                    >
                        <FaLinkedin className='icon-link-md' />
                    </a>
                </li>
            </ul>
        ),
        summary: `From my time working alongside David, he has demonstrated his remarkable ability to solve problems and adapt quickly to new subjects. It's all the more impressive given that he transitioned to this field from a completely different career. Any team would be lucky to have him.`
    }
]

const HtmlContent = memo(function HtmlContent() {
    const [focusTitle, setFocusTitle] = useState<string>('')
    const contentObserverRef = useRef<IntersectionObserver | null>(null)
    const willChangePropObserverRef = useRef<IntersectionObserver | null>(null)
    const aboutSectionRef = useRef<HTMLElement>(null!)
    const lifeSectionRef = useRef<HTMLElement>(null!)
    const skillsSectionRef = useRef<HTMLElement>(null!)
    const studySectionRef = useRef<HTMLElement>(null!)
    const workSectionRef = useRef<HTMLElement>(null!)
    const testimonialsSectionRef = useRef<HTMLElement>(null!)
    const typingTextRef = useRef<HTMLSpanElement>(null)
    const contactListRef = useRef<HTMLUListElement>(null)
    const windowHeightRef = useRef<number>(window.innerHeight)
    const scrollData = useScroll()

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

    const resetAllContainerBorderRadius = () => {
        const refs = [
            aboutSectionRef,
            lifeSectionRef,
            skillsSectionRef,
            studySectionRef,
            workSectionRef,
            testimonialsSectionRef
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
                                if (entry.target.children.item(3)?.classList.contains('revealed-content')) {
                                    break
                                }

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
                                    const increment = 0.1
                                    let delay = 0.3
                                    for (const listItem of entry.target.children.item(1)?.children!) {
                                        const HtmlListItem = listItem as HTMLElement
                                        HtmlListItem.style.transition = `transform 0.4s ease-out ${delay}s,opacity 0.4s ease-out ${delay}s`
                                        HtmlListItem.classList.replace('hidden-content', 'revealed-content')

                                        delay += increment
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

        const willChangePropObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const entryName = entry.target.getAttribute('data-name')
                    if (entry.isIntersecting) {
                        if (entryName === 'pl') {
                            const photoGalleryList = entry.target.children
                            for (const figure of photoGalleryList) {
                                const htmlImg = figure.children.item(0)!
                                const htmlCaption = figure.children.item(2)!

                                htmlImg.classList.add('will-change-transform')
                                htmlCaption.classList.add('will-change-transform')
                            }
                        }
                    } else {
                        if (entryName === 'pl') {
                            const photoGalleryList = entry.target.children
                            for (const figure of photoGalleryList) {
                                const htmlImg = figure.children.item(0)!
                                const htmlCaption = figure.children.item(2)!

                                htmlImg.classList.remove('will-change-transform')
                                htmlCaption.classList.remove('will-change-transform')
                            }
                        }
                    }
                })
            },
            {
                root: scrollData.el,
                rootMargin: '0px',
                threshold: 0
            }
        )

        contentObserverRef.current = contentObserver
        willChangePropObserverRef.current = willChangePropObserver

        return () => {
            willChangePropObserverRef.current?.disconnect()
            contentObserverRef.current?.disconnect()
        }
    }, [])

    useEffect(() => {
        const handleScrollAnimation = () => {
            const scrollTop = scrollData.el.scrollTop

            const isInAboutSection = isNumberInRange(
                scrollTop,
                aboutSectionTop - perfectPageHeight - 300,
                aboutSectionTop + 2 * perfectPageHeight + 300
            )
            const isInLifeSection = isNumberInRange(
                scrollTop,
                lifeSectionTop - perfectPageHeight - 300,
                lifeSectionTop + 2 * perfectPageHeight + 300
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
            const isInWorkSection = isNumberInRange(
                scrollTop,
                worksSectionTop - perfectPageHeight - 300,
                worksSectionTop + 2 * perfectPageHeight + 300
            )
            const isInTestimonialsSection = isNumberInRange(
                scrollTop,
                testimonialsSectionTop - perfectPageHeight - 300,
                testimonialsSectionTop + 2 * perfectPageHeight + 300
            )

            const width = aboutSectionRef.current?.clientWidth

            switch (true) {
                case isInAboutSection:
                    setHTMLSectionBorderRadius(aboutSectionRef.current, width, 'right')
                    break

                case isInLifeSection:
                    setHTMLSectionBorderRadius(lifeSectionRef.current, width, 'left')
                    break

                case isInSkillsSection:
                    setHTMLSectionBorderRadius(skillsSectionRef.current, width, 'right')
                    break

                case isInReadingSection:
                    setHTMLSectionBorderRadius(studySectionRef.current, width, 'left')
                    break

                case isInWorkSection:
                    setHTMLSectionBorderRadius(workSectionRef.current, width, 'right')
                    break

                case isInTestimonialsSection:
                    setHTMLSectionBorderRadius(testimonialsSectionRef.current, width, 'left')
                    break

                default:
                    resetAllContainerBorderRadius()
                    break
            }
        }

        const handleResizeResetBorderRadius = () => {
            if (windowHeightRef.current !== window.innerHeight) {
                resetAllContainerBorderRadius()
                windowHeightRef.current = window.innerHeight
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
                        <h1 className='text-xl font-bold text-secondary sm:text-2xl'>
                            A{' '}
                            <span
                                ref={typingTextRef}
                                className='animate-typing border-r-2 border-accent text-xl font-semibold text-accent sm:text-2xl'
                            ></span>
                        </h1>
                        <ul ref={contactListRef} className='mt-4 flex gap-4'>
                            <li className='hidden-content focusable-li [transition:transform_0.4s_ease-out_0.4s,opacity_0.4s_ease-out_0.4s]'>
                                <a
                                    href='https://github.com/davidjpy'
                                    target='_blank'
                                    rel='noreferrer noopener'
                                    aria-label='GitHub (opens in a new tab)'
                                >
                                    <FaGithub className='icon-link-lg' />
                                </a>
                            </li>
                            <li className='hidden-content focusable-li [transition:transform_0.4s_ease-out_0.45s,opacity_0.4s_ease-out_0.45s]'>
                                <a
                                    href='https://www.linkedin.com/in/davidho-web/'
                                    target='_blank'
                                    rel='noreferrer noopener'
                                    aria-label='Linkedin (opens in a new tab)'
                                >
                                    <FaLinkedin className='icon-link-lg' />
                                </a>
                            </li>
                            <li className='hidden-content focusable-li [transition:transform_0.4s_ease-out_0.55s,opacity_0.4s_ease-out_0.55s]'>
                                <a
                                    href='https://www.instagram.com/___realdavid/'
                                    target='_blank'
                                    rel='noreferrer noopener'
                                    aria-label='Instagram (opens in a new tab)'
                                >
                                    <FaInstagram strokeWidth={20} className='icon-link-lg' />
                                </a>
                            </li>
                        </ul>
                    </>
                }
                contentObserverRef={contentObserverRef}
                ref={aboutSectionRef}
            >
                <HtmlSection
                    title={
                        <>
                            <span className='text-accent'>Who</span> am I?
                        </>
                    }
                    contentObserverRef={contentObserverRef}
                >
                    <p>
                        I'm an ambitious software engineer based in Hong Kong with over 2 years of professional
                        experience in transforming ideas from 0 to 100 and creating captivating digital experiences that
                        embody elegance, simplicity, and detail. In my full-time role as an application developer, I've
                        successfully made several significant improvements to products with over 2000 daily users while
                        laying the groundwork for a freelance career through targeted networking and skill-building. I
                        am also committed to a long-life journey of continuous growth to stay at the forefront of
                        technology and personal development.
                    </p>
                </HtmlSection>
                <HtmlSection
                    title={
                        <>
                            How it <span className='text-accent'>started</span>?
                        </>
                    }
                    contentObserverRef={contentObserverRef}
                >
                    <p>
                        I'm a self-taught software engineer fueled by a deep passion for the digital world. I began my
                        career as a building surveyor, a field steeped in rigid practices that often limited my creative
                        spirit. Seeking a change, I discovered the intriguing world of programming, a place where
                        innovation thrives and creative problem-solving is encouraged. This propelled me into a mountain
                        of code, where I've found passion for crafting web applications with stunning visuals and
                        software that embrace efficiency.
                    </p>
                </HtmlSection>
            </HtmlScrollContainer>

            <HtmlScrollContainer
                top={lifeSectionTop}
                position='left'
                backgroundTitle='Life'
                topTitle="I'm a very simple person..."
                bottomTitle={
                    <>
                        My <span className='text-accent'> Life</span>
                    </>
                }
                contentObserverRef={contentObserverRef}
                ref={lifeSectionRef}
            >
                <HtmlSection
                    title={
                        <>
                            <span className='text-accent'>Simple</span> and sometime
                            <span className='text-accent'>spontaneous</span>
                        </>
                    }
                    contentObserverRef={contentObserverRef}
                >
                    <p>
                        My life is simple yet joyful, you'll either find me sitting in front of the computer, losing
                        myself in a gaming adventure or a pile of messy code, or exploring the hidden gems of a city. I
                        often find surprises and beauty in those untold places. Every now and then, I love stepping out
                        to explore different events or dive into new experiences purely for the joy of it. I believe
                        that a dash of spontaneity and a sprinkle of randomness can refresh your mindset and illuminate
                        your life.
                    </p>
                    <PhotoMasonry willChangePropObserverRef={willChangePropObserverRef} />
                </HtmlSection>
            </HtmlScrollContainer>

            <HtmlScrollContainer
                top={skillsSectionTop}
                position='right'
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
                <HtmlSection
                    title={
                        <>
                            What can I offer as a <span className='text-accent'>software developer</span>?
                        </>
                    }
                    contentObserverRef={contentObserverRef}
                >
                    <ul>
                        {softwareSkills.map((skill, index) => (
                            <li
                                key={skill.name}
                                className='hidden-content mr-6 mt-6 inline-block rounded-md bg-primary-monochrome pb-4 pl-6 pr-6 pt-4 text-center'
                                style={{
                                    transition: `transform 0.4s ease-out ${index * 0.1}s,opacity 0.4s ease-out ${
                                        index * 0.1
                                    }s`
                                }}
                            >
                                <span>{skill.icon}</span>
                                <p className='mt-2'>{skill.name}</p>
                            </li>
                        ))}
                    </ul>
                </HtmlSection>
                <HtmlSection
                    title={
                        <>
                            What other <span className='text-accent'>skills</span> do I have?
                        </>
                    }
                    contentObserverRef={contentObserverRef}
                >
                    <ul>
                        {otherSkills.map((skill, index) => (
                            <li
                                key={skill.name}
                                className='hidden-content mr-6 mt-6 inline-block rounded-md bg-primary-monochrome pb-4 pl-6 pr-6 pt-4 text-center'
                                style={{
                                    transition: `transform 0.4s ease-out ${index * 0.1}s, opacity 0.4s ease-out ${
                                        index * 0.1
                                    }s`
                                }}
                            >
                                <span>{skill.icon}</span>
                                <p className='mt-2'>{skill.name}</p>
                            </li>
                        ))}
                    </ul>
                </HtmlSection>
            </HtmlScrollContainer>

            <HtmlScrollContainer
                top={studySectionTop}
                position='left'
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
                            Interesting <span className='text-accent'>books</span> I have read?
                        </>
                    }
                    contentObserverRef={contentObserverRef}
                >
                    <ul>
                        {readingList.map((book, index) => (
                            <li
                                key={index}
                                className='hidden-content'
                                style={{
                                    transitionDelay: focusTitle && focusTitle !== book.title ? '0s' : undefined,
                                    opacity: focusTitle && focusTitle !== book.title ? 0.3 : undefined
                                }}
                                onMouseEnter={() => setFocusTitle(book.title)}
                                onMouseLeave={() => setFocusTitle('')}
                            >
                                <a
                                    href={book.href}
                                    target='_blank'
                                    aria-label={book.ariaLabel}
                                    rel='noreferrer noopener'
                                    className='section-list-item'
                                >
                                    <figure>
                                        <img loading='lazy' alt={book.alt} src={book.image} className='book-list-img' />
                                    </figure>
                                    <div className='w-full pl-4'>
                                        <header className='w-[95%]'>
                                            <h1 className='section-list-title'>{book.title}</h1>
                                        </header>
                                        <p className='section-list-summary'>{book.summary}</p>
                                        {book.keypoints}
                                    </div>
                                </a>
                                <div className='icons-list-item'>{book.linkIcons}</div>
                            </li>
                        ))}
                    </ul>
                </HtmlSection>

                <HtmlSection
                    title={
                        <>
                            Useful <span className='text-accent'>courses</span> I have taken?
                        </>
                    }
                    contentObserverRef={contentObserverRef}
                >
                    <ul>
                        {courseList.map((course, index) => (
                            <li
                                key={index}
                                className='hidden-content'
                                style={{
                                    transitionDelay: focusTitle && focusTitle !== course.title ? '0s' : undefined,
                                    opacity: focusTitle && focusTitle !== course.title ? 0.3 : undefined
                                }}
                                onMouseEnter={() => setFocusTitle(course.title)}
                                onMouseLeave={() => setFocusTitle('')}
                            >
                                <a
                                    target='_blank'
                                    href={course.href}
                                    aria-label={course.ariaLabel}
                                    rel='noreferrer noopener'
                                    className='section-list-item'
                                >
                                    <figure className='project-list-img-wrapper'>
                                        <img
                                            loading='lazy'
                                            alt={course.alt}
                                            src={course.image}
                                            className='project-list-img'
                                        />
                                    </figure>
                                    <div className='w-full pl-4'>
                                        <header className='w-[95%]'>
                                            <h1 className='section-list-title'>{course.title}</h1>
                                        </header>
                                        <p className='section-list-summary'>{course.summary}</p>
                                        {course.keypoints}
                                    </div>
                                </a>
                                <div className='icons-list-item'>{course.linkIcons}</div>
                            </li>
                        ))}
                    </ul>
                </HtmlSection>
            </HtmlScrollContainer>

            <HtmlScrollContainer
                top={worksSectionTop}
                position='right'
                backgroundTitle='Works'
                topTitle='I Enjoy Creating Stuffs...'
                bottomTitle={
                    <>
                        My <span className='text-accent'> Works</span>
                    </>
                }
                contentObserverRef={contentObserverRef}
                ref={workSectionRef}
            >
                <HtmlSection
                    title={
                        <>
                            <span className='text-accent'>Projects</span> I have done?
                        </>
                    }
                    contentObserverRef={contentObserverRef}
                >
                    <ul>
                        {workList.map((work, index) => (
                            <li
                                key={index}
                                className='hidden-content relative'
                                style={{
                                    transitionDelay: focusTitle && focusTitle !== work.title ? '0s' : undefined,
                                    opacity: focusTitle && focusTitle !== work.title ? 0.3 : undefined
                                }}
                                onMouseEnter={() => setFocusTitle(work.title)}
                                onMouseLeave={() => setFocusTitle('')}
                            >
                                <a
                                    href={work.href}
                                    target='_blank'
                                    rel='noreferrer noopener'
                                    aria-label={work.ariaLabel}
                                    className='section-list-item'
                                >
                                    <figure className='project-list-img-wrapper'>
                                        <img
                                            alt={work.alt}
                                            loading='lazy'
                                            src={work.image}
                                            className='project-list-img'
                                        />
                                    </figure>
                                    <div className='w-full pl-4'>
                                        <header className='w-[90%]'>
                                            <h1 className='section-list-title'>{work.title}</h1>
                                        </header>
                                        <p className='section-list-summary'>{work.summary}</p>
                                        {work.keypoints}
                                    </div>
                                </a>
                                <div className='icons-list-item'>{work.linkIcons}</div>
                            </li>
                        ))}
                    </ul>
                </HtmlSection>
                <HtmlSection
                    title={
                        <>
                            Random <span className='text-accent'>certificates</span> that might helps?
                        </>
                    }
                    contentObserverRef={contentObserverRef}
                >
                    <ul>
                        {certificateList.map((certificate, index) => (
                            <li
                                key={index}
                                className='hidden-content relative'
                                style={{
                                    transitionDelay: focusTitle && focusTitle !== certificate.title ? '0s' : undefined,
                                    opacity: focusTitle && focusTitle !== certificate.title ? 0.3 : undefined
                                }}
                                onMouseEnter={() => setFocusTitle(certificate.title)}
                                onMouseLeave={() => setFocusTitle('')}
                            >
                                <a
                                    href={certificate.href}
                                    target='_blank'
                                    rel='noreferrer noopener'
                                    aria-label={certificate.ariaLabel}
                                    className='section-list-item'
                                >
                                    <figure className='project-list-img-wrapper'>
                                        <img
                                            alt={certificate.alt}
                                            loading='lazy'
                                            src={certificate.image}
                                            className='project-list-img'
                                        />
                                    </figure>
                                    <div className='w-full pl-4'>
                                        <header className='w-[95%]'>
                                            <h1 className='section-list-title'>{certificate.title}</h1>
                                        </header>
                                        <p className='section-list-summary'>{certificate.summary}</p>
                                        {certificate.keypoints}
                                    </div>
                                </a>
                                <div className='icons-list-item'>{certificate.linkIcons}</div>
                            </li>
                        ))}
                    </ul>
                </HtmlSection>
            </HtmlScrollContainer>

            <HtmlScrollContainer
                top={testimonialsSectionTop}
                position='left'
                backgroundTitle='Testimonials'
                topTitle='Some Remarks By My Coworkers...'
                bottomTitle={
                    <>
                        The <span className='text-accent'> Testimonials</span>
                    </>
                }
                contentObserverRef={contentObserverRef}
                ref={testimonialsSectionRef}
            >
                <HtmlSection
                    title={
                        <>
                            My co-workers's <span className='text-accent'>comments</span>?
                        </>
                    }
                    contentObserverRef={contentObserverRef}
                >
                    <ul>
                        {testimonialsList.map((coworker, index) => (
                            <li
                                key={index}
                                className='hidden-content relative'
                                style={{
                                    transitionDelay: focusTitle && focusTitle !== coworker.name ? '0s' : undefined,
                                    opacity: focusTitle && focusTitle !== coworker.name ? 0.3 : undefined
                                }}
                                onMouseEnter={() => setFocusTitle(coworker.name)}
                                onMouseLeave={() => setFocusTitle('')}
                            >
                                <a
                                    href={coworker.href}
                                    target='_blank'
                                    aria-label={coworker.ariaLabel}
                                    rel='noreferrer noopener'
                                    className='section-list-item'
                                >
                                    <div className='pl-4'>
                                        <div className='flex justify-between'>
                                            <figure className='flex items-center gap-4'>
                                                <img
                                                    alt={coworker.alt}
                                                    loading='lazy'
                                                    src={coworker.image}
                                                    className='testimonials-list-img'
                                                />
                                                <figcaption>
                                                    <h1 className='font-semibold'>{coworker.name}</h1>
                                                    <p className='section-list-summary mt-0'>{coworker.title}</p>
                                                </figcaption>
                                            </figure>
                                        </div>
                                        <p className='section-list-summary mt-4'>{coworker.summary}</p>
                                    </div>
                                </a>
                                <div className='icons-list-item'>{coworker.linkIcons}</div>
                            </li>
                        ))}
                    </ul>
                </HtmlSection>
            </HtmlScrollContainer>
        </Html>
    )
})

export default HtmlContent

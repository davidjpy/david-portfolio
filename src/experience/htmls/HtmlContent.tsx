import { useRef } from 'react'
import { Html, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import AboutSection from '@/src/experience/htmls/AboutSection'
import SkillsSection from '@/src/experience/htmls/SkillsSection'
import ReadsSection from '@/src/experience/htmls/ReadsSection'
import LifeSection from '@/src/experience/htmls/LifeSection'
import WorksSection from '@/src/experience/htmls/WorksSection'
import { scrollPages } from '@/src/utilities/constants'

export default function HtmlContent() {
    const aboutSectionRef = useRef<HTMLElement>(null!)
    const skillsSectionRef = useRef<HTMLElement>(null!)
    const readsSectionRef = useRef<HTMLElement>(null!)
    const lifeSectionRef = useRef<HTMLElement>(null!)
    const workSectionRef = useRef<HTMLElement>(null!)
    const scrollData = useScroll()

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
                setHTMLSectionBorderRadius(readsSectionRef.current, width, 'right')
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
            <AboutSection aboutSectionRef={aboutSectionRef} />
            <SkillsSection skillsSectionRef={skillsSectionRef} />
            <ReadsSection readsSectionRef={readsSectionRef} />
            <LifeSection lifeSectionRef={lifeSectionRef} />
            <WorksSection workSectionRef={workSectionRef} />
        </Html>
    )
}

import { useEffect, useRef } from 'react'
import { Html, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import AboutSection from '@/src/experience/htmls/AboutSection'
import SkillsSection from '@/src/experience/htmls/SkillsSection'
import ReadsSection from '@/src/experience/htmls/ReadsSection'
import LifeSection from '@/src/experience/htmls/LifeSection'
import WorksSection from '@/src/experience/htmls/WorksSection'
import AcknowledgementSection from '@/src/experience/htmls/AcknowledgementSection'
import { perfectPageHeight } from '@/src/utilities/constants'

export default function HtmlContent() {
    const aboutSectionRef = useRef<HTMLElement>(null!)
    const skillsSectionRef = useRef<HTMLElement>(null!)
    const readsSectionRef = useRef<HTMLElement>(null!)
    const lifeSectionRef = useRef<HTMLElement>(null!)
    const workSectionRef = useRef<HTMLElement>(null!)
    const acknowledgementSectionRef = useRef<HTMLElement>(null!)
    const scrollData = useScroll()

    const aboutSectionTop = perfectPageHeight * 2
    const skillsSectionTop = perfectPageHeight * 6
    const readsSectionTop = perfectPageHeight * 10
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

    useFrame(() => {
        const scrollTop = scrollData.el.scrollTop

        const isInAboutSection = isNumberInRange(
            scrollTop,
            aboutSectionTop - perfectPageHeight,
            aboutSectionTop + 2 * perfectPageHeight
        )
        const isInSkillsSection = isNumberInRange(
            scrollTop,
            skillsSectionTop - perfectPageHeight,
            skillsSectionTop + 2 * perfectPageHeight
        )
        const isInReadingSection = isNumberInRange(
            scrollTop,
            readsSectionTop - perfectPageHeight,
            readsSectionTop + 2 * perfectPageHeight
        )
        const isInLifeSection = isNumberInRange(
            scrollTop,
            lifeSectionTop - perfectPageHeight,
            lifeSectionTop + 2 * perfectPageHeight
        )
        const isInWorkSection = isNumberInRange(
            scrollTop,
            worksSectionTop - perfectPageHeight,
            worksSectionTop + 2 * perfectPageHeight
        )
        const isInAcknowledgementSection = isNumberInRange(
            scrollTop,
            acknowledgementSectionTop - perfectPageHeight,
            acknowledgementSectionTop + 2 * perfectPageHeight
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
                setHTMLSectionBorderRadius(readsSectionRef.current, width, 'right')
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
                break
        }
    })

    useEffect(() => {
        const handleResizeResetBorderRadius = () => {
            const refs = [
                aboutSectionRef,
                skillsSectionRef,
                readsSectionRef,
                lifeSectionRef,
                workSectionRef,
                acknowledgementSectionRef
            ]

            for (const ref of refs) {
                ref.current.style.borderTopRightRadius = '0px'
                ref.current.style.borderBottomRightRadius = '0px'
                ref.current.style.borderTopLeftRadius = '0px'
                ref.current.style.borderBottomLeftRadius = '0px'
            }
        }
        addEventListener('resize', handleResizeResetBorderRadius)

        return () => {
            removeEventListener('resize', handleResizeResetBorderRadius)
        }
    }, [])

    return (
        <>
            <Html
                wrapperClass='w-full'
                calculatePosition={() => {
                    return [0, 0]
                }}
                className='scroll-container'
                zIndexRange={[0, 0]}
            >
                <AboutSection aboutSectionRef={aboutSectionRef} top={aboutSectionTop} />
                <SkillsSection skillsSectionRef={skillsSectionRef} top={skillsSectionTop} />
                <ReadsSection readsSectionRef={readsSectionRef} top={readsSectionTop} />
                <LifeSection lifeSectionRef={lifeSectionRef} top={lifeSectionTop} />
                <WorksSection workSectionRef={workSectionRef} top={worksSectionTop} />
                <AcknowledgementSection
                    acknowledgementSectionRef={acknowledgementSectionRef}
                    top={acknowledgementSectionTop}
                />
            </Html>
        </>
    )
}

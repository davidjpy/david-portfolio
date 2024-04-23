import { useEffect, useRef } from 'react'

interface Props {
    willChangePropObserverRef: React.MutableRefObject<IntersectionObserver | null>
}

export default function PhotoMasonry({ willChangePropObserverRef }: Props) {
    const photoGalleryRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (photoGalleryRef.current) {
            willChangePropObserverRef.current?.observe(photoGalleryRef.current)
        }

        return () => {
            if (photoGalleryRef.current) {
                willChangePropObserverRef.current?.unobserve(photoGalleryRef.current)
            }
        }
    }, [photoGalleryRef.current])

    return (
        <div
            data-name='pl'
            className='grid-rows-12 max-mobile:h-[900px] max-mobile:grid-cols-3 mt-6 grid h-[900px] w-full grid-cols-3 gap-[12px] rounded-[4px] bg-primary-monochrome p-[12px] max-2xl:h-[1100px] max-2xl:grid-cols-2'
            ref={photoGalleryRef}
        >
            <figure className='life-list-img-wrapper col-span-1 row-span-6'>
                <img
                    alt='Overlooking the ocean on Po Toi Island'
                    loading='lazy'
                    src='images/life/painting.webp'
                    className='life-list-img peer hover:scale-105 hover:brightness-50'
                />
                <span className='life-list-img-mask peer-hover:h-[75%] peer-hover:w-[75%] peer-hover:opacity-100 peer-hover:backdrop-blur-[2px]'></span>
                <figcaption className='life-list-img-caption peer-hover:-translate-y-1/2 peer-hover:opacity-100'>
                    <h1 className='font-medium'>Hong Kong</h1>
                    <p className='text-sm'>Art Workshop</p>
                </figcaption>
            </figure>
            <figure className='life-list-img-wrapper col-span-1 row-span-3'>
                <img
                    alt='Overlooking the ocean on Po Toi Island'
                    loading='lazy'
                    src='images/life/hk_island.webp'
                    className='life-list-img peer hover:scale-105 hover:brightness-50'
                />
                <span className='life-list-img-mask peer-hover:h-[75%] peer-hover:w-[75%] peer-hover:opacity-100 peer-hover:backdrop-blur-[2px]'></span>
                <figcaption className='life-list-img-caption peer-hover:-translate-y-1/2 peer-hover:opacity-100'>
                    <h1 className='font-medium'>Hong Kong</h1>
                    <p className='text-sm'>Po Toi Island</p>
                </figcaption>
            </figure>
            <figure className='life-list-img-wrapper col-span-1 row-span-5'>
                <img
                    alt='Overlooking the ocean on Po Toi Island'
                    loading='lazy'
                    src='images/life/fire_dragon_dance.webp'
                    className='life-list-img peer hover:scale-105 hover:brightness-50'
                />
                <span className='life-list-img-mask peer-hover:h-[75%] peer-hover:w-[75%] peer-hover:opacity-100 peer-hover:backdrop-blur-[2px]'></span>
                <figcaption className='life-list-img-caption peer-hover:-translate-y-1/2 peer-hover:opacity-100'>
                    <h1 className='font-medium'>Hong Kong</h1>
                    <p className='text-sm'>Fire Dragon Dance</p>
                </figcaption>
            </figure>
            <figure className='life-list-img-wrapper row-span-6'>
                <img
                    alt='Overlooking the ocean on Po Toi Island'
                    loading='lazy'
                    src='images/life/thailand_dragon_tower.webp'
                    className='life-list-img peer hover:scale-105 hover:brightness-50'
                />
                <span className='life-list-img-mask peer-hover:h-[75%] peer-hover:w-[75%] peer-hover:opacity-100 peer-hover:backdrop-blur-[2px]'></span>
                <figcaption className='life-list-img-caption peer-hover:-translate-y-1/2 peer-hover:opacity-100'>
                    <h1 className='font-medium'>Bangkok</h1>
                    <p className='text-sm'>Dragon Tower</p>
                </figcaption>
            </figure>
            <figure className='life-list-img-wrapper row-span-7 col-span-1'>
                <img
                    alt='Overlooking the ocean on Po Toi Island'
                    loading='lazy'
                    src='images/life/kumamoto_forest.webp'
                    className='life-list-img peer hover:scale-105 hover:brightness-50'
                />
                <span className='life-list-img-mask peer-hover:h-[75%] peer-hover:w-[75%] peer-hover:opacity-100 peer-hover:backdrop-blur-[2px]'></span>
                <figcaption className='life-list-img-caption peer-hover:-translate-y-1/2 peer-hover:opacity-100'>
                    <h1 className='font-medium'>Kumamoto</h1>
                    <p className='text-sm'>Forest</p>
                </figcaption>
            </figure>
            <figure className='life-list-img-wrapper col-span-1 row-span-6'>
                <img
                    alt='Overlooking the ocean on Po Toi Island'
                    loading='lazy'
                    src='images/life/taiwan_graffiti.webp'
                    className='life-list-img peer hover:scale-105 hover:brightness-50'
                />
                <span className='life-list-img-mask peer-hover:h-[75%] peer-hover:w-[75%] peer-hover:opacity-100 peer-hover:backdrop-blur-[2px]'></span>
                <figcaption className='life-list-img-caption peer-hover:-translate-y-1/2 peer-hover:opacity-100'>
                    <h1 className='font-medium'>Taipei</h1>
                    <p className='text-sm'>Graffiti</p>
                </figcaption>
            </figure>
            <figure className='life-list-img-wrapper col-span-1 row-span-3'>
                <img
                    alt='Overlooking the ocean on Po Toi Island'
                    loading='lazy'
                    src='images/life/japan_house.webp'
                    className='life-list-img peer hover:scale-105 hover:brightness-50'
                />
                <span className='life-list-img-mask peer-hover:h-[75%] peer-hover:w-[75%] peer-hover:opacity-100 peer-hover:backdrop-blur-[2px]'></span>
                <figcaption className='life-list-img-caption peer-hover:-translate-y-1/2 peer-hover:opacity-100'>
                    <h1 className='font-medium'>Kyoto</h1>
                    <p className='text-sm'>Houses</p>
                </figcaption>
            </figure>
            {/* <img
            alt='Overlooking the ocean on Po Toi Island'
            loading='lazy'
            src='images/life/fire_dragon_dance.webp'
            className='life-list-img-wrapper col-span-1 row-span-5'
        />
        <img
            alt='Overlooking the ocean on Po Toi Island'
            loading='lazy'
            src='images/life/thailand_dragon_tower.webp'
            className='life-list-img-wrapper col-span-1 row-span-6'
        />
        <img
            alt='Overlooking the ocean on Po Toi Island'
            loading='lazy'
            src='images/life/kumamoto_forest.webp'
            className='row-span-7 life-list-img-wrapper col-span-1'
        />
        <img
            alt='Overlooking the ocean on Po Toi Island'
            loading='lazy'
            src='images/life/taiwan_graffiti.webp'
            className='life-list-img-wrapper col-span-1 row-span-6'
        />
        <img
            alt='Overlooking the ocean on Po Toi Island'
            loading='lazy'
            src='images/life/japan_house.webp'
            className='life-list-img-wrapper col-span-1 row-span-3'
        /> */}
        </div>
    )
}

{
    /* <HtmlSection contentObserverRef={contentObserverRef}>
                    <div className='flex gap-[48px]'>
                        <div className='relative h-[340px] w-[400px] flex-shrink-0'>
                            <figure className='absolute bottom-0 right-0 w-[61%] overflow-hidden rounded-[8px] shadow-2xl'>
                                <img
                                    alt='Okinawa beach horizon'
                                    loading='lazy'
                                    src='images/life/okinawa_sky.webp'
                                    className='object-cover'
                                />
                            </figure>
                            <figure className='absolute w-[77%] overflow-hidden rounded-[8px] shadow-2xl'>
                                <img
                                    alt='Overlooking the ocean on Po Toi Island'
                                    loading='lazy'
                                    src='images/life/hk_island.webp'
                                    className='object-cover'
                                />
                            </figure>
                        </div>

                        <div className='mt-8'>
                            <header className='mb-4 flex items-center font-bold'>
                                <span className='mr-2 h-1 w-4 bg-accent' />
                                <h1>
                                    My daily <span className='text-accent'>life</span>
                                </h1>
                            </header>
                            <p>
                                My life is simple yet joyful, you'll either find me sitting in front of the computer,
                                losing myself in a gaming adventure or a pile of messy code, or exploring the hidden
                                gems of a city. I often find surprises and beauty in those untold places.
                            </p>
                        </div>
                    </div>
                </HtmlSection>

                <HtmlSection contentObserverRef={contentObserverRef}>
                    <div className='flex gap-[48px]'>
                        <div className='mt-24'>
                            <header className='mb-4 flex items-center font-bold'>
                                <span className='mr-2 h-1 w-4 bg-accent' />
                                <h1>
                                    I'm sometime <span className='text-accent'>spontaneous</span>
                                </h1>
                            </header>
                            <p>
                                Every now and then, I love stepping out to explore different events or dive into new
                                experiences purely for the joy of it. I believe that a dash of spontaneity and a
                                sprinkle of randomness can refresh your mindset and illuminate your life.
                            </p>
                        </div>
                        <div className='relative h-[400px] w-[300px] flex-shrink-0'>
                            <figure className='absolute bottom-0 w-[67%] overflow-hidden rounded-[8px] shadow-2xl'>
                                <img
                                    alt='Lightbox signage of the fire dragon dance'
                                    loading='lazy'
                                    src='images/life/fire_dragon_dance.webp'
                                    className='object-cover'
                                />
                            </figure>
                            <figure className='absolute right-0 w-[61%] overflow-hidden rounded-[8px] shadow-2xl'>
                                <img
                                    alt='David painting a golden retriever on a canvas'
                                    loading='lazy'
                                    src='images/life/painting.webp'
                                    className='object-cover'
                                />
                            </figure>
                        </div>
                    </div>
                </HtmlSection>

                <HtmlSection contentObserverRef={contentObserverRef}>
                    <div className='flex gap-[48px]'>
                        <div className='relative h-[340px] w-[400px] flex-shrink-0'>
                            <figure className='absolute bottom-0 right-0 w-[71%] overflow-hidden rounded-[8px] shadow-2xl'>
                                <img
                                    alt='Traditional japanese houses'
                                    loading='lazy'
                                    src='images/life/japan_house.webp'
                                    className='object-cover'
                                />
                            </figure>
                            <figure className='absolute w-[76%] overflow-hidden rounded-[8px] shadow-2xl'>
                                <img
                                    alt='A husky sitting in front of David'
                                    loading='lazy'
                                    src='images/life/husky.webp'
                                    className='object-cover'
                                />
                            </figure>
                        </div>

                        <div className='mt-8'>
                            <header className='mb-4 flex items-center font-bold'>
                                <span className='mr-2 h-1 w-4 bg-accent' />
                                <h1>
                                    Fun <span className='text-accent'>facts</span> about me
                                </h1>
                            </header>
                            <ul className='ml-[18px] list-decimal'>
                                {funFacts.map((fact, index) => (
                                    <li key={index} className='mb-2'>
                                        {fact}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </HtmlSection> */
}

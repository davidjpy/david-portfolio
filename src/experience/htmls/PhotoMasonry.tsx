import { useEffect, useRef } from 'react'

interface Props {
    willChangePropObserverRef: React.MutableRefObject<IntersectionObserver | null>
}

export default function PhotoMasonry({ willChangePropObserverRef }: Props) {
    const photoGalleryRef = useRef<HTMLDivElement>(null)

    // useEffect(() => {
    //     if (photoGalleryRef.current) {
    //         willChangePropObserverRef.current?.observe(photoGalleryRef.current)
    //     }

    //     return () => {
    //         if (photoGalleryRef.current) {
    //             willChangePropObserverRef.current?.unobserve(photoGalleryRef.current)
    //         }
    //     }
    // }, [photoGalleryRef.current])

    return (
        <div
            data-name='pl'
            className='mt-6 grid h-[900px] w-full grid-cols-3 grid-rows-12 gap-[12px] rounded-[4px] bg-primary-monochrome p-[12px] max-2xl:h-[1100px] max-2xl:grid-cols-2 max-mobile:h-[900px] max-mobile:grid-cols-3'
            ref={photoGalleryRef}
        >
            <figure className='life-list-img-wrapper group col-span-1 row-span-6'>
                <img
                    alt='David is painting a golden retriever on canvas'
                    loading='lazy'
                    src='images/life/painting.webp'
                    className='life-list-img hover:scale-105 hover:brightness-50'
                />
                <span className='life-list-img-mask group-hover:h-[75%] group-hover:w-[75%] group-hover:opacity-100 group-hover:backdrop-blur-[2px]'></span>
                <figcaption className='life-list-img-caption group-hover:-translate-y-1/2 group-hover:opacity-100'>
                    <h1 className='font-medium'>Hong Kong</h1>
                    <p className='text-sm'>Art Workshop</p>
                </figcaption>
            </figure>
            <figure className='life-list-img-wrapper group col-span-1 row-span-3'>
                <img
                    alt='Overlooking the South China Sea from Po Toi Island'
                    loading='lazy'
                    src='images/life/hk_island.webp'
                    className='life-list-img hover:scale-105 hover:brightness-50'
                />
                <span className='life-list-img-mask group-hover:h-[75%] group-hover:w-[75%] group-hover:opacity-100 group-hover:backdrop-blur-[2px]'></span>
                <figcaption className='life-list-img-caption group-hover:-translate-y-1/2 group-hover:opacity-100'>
                    <h1 className='font-medium'>Hong Kong</h1>
                    <p className='text-sm'>Po Toi Island</p>
                </figcaption>
            </figure>
            <figure className='life-list-img-wrapper group col-span-1 row-span-5'>
                <img
                    alt='A splashy red lightbox depicting the Fire Dragon Dance '
                    loading='lazy'
                    src='images/life/fire_dragon_dance.webp'
                    className='life-list-img hover:scale-105 hover:brightness-50'
                />
                <span className='life-list-img-mask group-hover:h-[75%] group-hover:w-[75%] group-hover:opacity-100 group-hover:backdrop-blur-[2px]'></span>
                <figcaption className='life-list-img-caption group-hover:-translate-y-1/2 group-hover:opacity-100'>
                    <h1 className='font-medium'>Hong Kong</h1>
                    <p className='text-sm'>Fire Dragon Dance</p>
                </figcaption>
            </figure>
            <figure className='life-list-img-wrapper group row-span-6'>
                <img
                    alt='A high tower with a Chinese dragon twining around it'
                    loading='lazy'
                    src='images/life/thailand_dragon_tower.webp'
                    className='life-list-img hover:scale-105 hover:brightness-50'
                />
                <span className='life-list-img-mask group-hover:h-[75%] group-hover:w-[75%] group-hover:opacity-100 group-hover:backdrop-blur-[2px]'></span>
                <figcaption className='life-list-img-caption group-hover:-translate-y-1/2 group-hover:opacity-100'>
                    <h1 className='font-medium'>Bangkok</h1>
                    <p className='text-sm'>Dragon Tower</p>
                </figcaption>
            </figure>
            <figure className='life-list-img-wrapper group col-span-1 row-span-7'>
                <img
                    alt='A stone road leading into a forest'
                    loading='lazy'
                    src='images/life/kumamoto_forest.webp'
                    className='life-list-img hover:scale-105 hover:brightness-50'
                />
                <span className='life-list-img-mask group-hover:h-[75%] group-hover:w-[75%] group-hover:opacity-100 group-hover:backdrop-blur-[2px]'></span>
                <figcaption className='life-list-img-caption group-hover:-translate-y-1/2 group-hover:opacity-100'>
                    <h1 className='font-medium'>Kumamoto</h1>
                    <p className='text-sm'>Forest</p>
                </figcaption>
            </figure>
            <figure className='life-list-img-wrapper group col-span-1 row-span-6'>
                <img
                    alt='A massive graffiti artwork depicting a robot on a tall building'
                    loading='lazy'
                    src='images/life/taiwan_graffiti.webp'
                    className='life-list-img hover:scale-105 hover:brightness-50'
                />
                <span className='life-list-img-mask group-hover:h-[75%] group-hover:w-[75%] group-hover:opacity-100 group-hover:backdrop-blur-[2px]'></span>
                <figcaption className='life-list-img-caption group-hover:-translate-y-1/2 group-hover:opacity-100'>
                    <h1 className='font-medium'>Taipei</h1>
                    <p className='text-sm'>Graffiti</p>
                </figcaption>
            </figure>
            <figure className='life-list-img-wrapper group col-span-1 row-span-3'>
                <img
                    alt='A block of traditional japanese architecture'
                    loading='lazy'
                    src='images/life/japan_house.webp'
                    className='life-list-img hover:scale-105 hover:brightness-50'
                />
                <span className='life-list-img-mask group-hover:h-[75%] group-hover:w-[75%] group-hover:opacity-100 group-hover:backdrop-blur-[2px]'></span>
                <figcaption className='life-list-img-caption group-hover:-translate-y-1/2 group-hover:opacity-100'>
                    <h1 className='font-medium'>Kyoto</h1>
                    <p className='text-sm'>Houses</p>
                </figcaption>
            </figure>
        </div>
    )
}

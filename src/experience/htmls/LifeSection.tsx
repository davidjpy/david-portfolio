import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

interface Props {
    lifeSectionRef: React.MutableRefObject<HTMLElement>
    top: number
}

export default function LifeSection({ lifeSectionRef, top }: Props) {
    return (
        <section ref={lifeSectionRef} className='scroll-text-box' style={{ top: top }}>
            <header>
                <h1 className='header-bg-text'>Life</h1>
            </header>
            <header className='header-wrapper'>
                <div className='header-divider' />
                <h1 className='text-lg font-bold text-secondary'>Good. More on...</h1>
                <h1 className='text-xl font-black text-secondary'>
                    My <span className='text-accent'> Life</span>
                </h1>
            </header>

            <section className='mt-12 text-secondary'>
                <header className='mb-2 flex items-center'>
                    <div className='mr-2 h-0.5 w-4 bg-accent' />
                    <h1 className='font-bold'>
                        My <span className='text-accent'>daily</span> life?
                    </h1>
                </header>
                <p>
                    My life is simple yet joyful, you'll either find me sitting in front of the computer, losing myself
                    in the latest gaming adventure or a pile of messy code, or exploring the hidden gems of the city. I
                    often find surprises and beauty in those untold places. I enjoy talking to strangers and meeting new
                    friends. I always get along with people regardless of their background, culture, and language.
                </p>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={16}
                    loop={true}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className='mt-8 h-[700px] w-full rounded-[24px] p-[8px]'
                >
                    <SwiperSlide className='img-gallery'>
                        <figure className='group relative col-span-2 row-span-5 overflow-hidden rounded-[16px]'>
                            <img src='images/life/japan_shine.webp' className='swipe-img col-span-2 row-span-5' />
                            <figcaption className='img-layer'>
                                <h1>Shine hidden in the forest</h1>
                                <p>Kumamoto, Japan</p>
                            </figcaption>
                        </figure>
                        <figure className='group relative col-span-2 row-span-2 overflow-hidden rounded-[16px]'>
                            <img src='images/life/japan_house.webp' className='swipe-img' />
                            <figcaption className='img-layer'>
                                <h1>Japanese architecture</h1>
                                <p>Kurokawa Onsen Ryokan, Japan</p>
                            </figcaption>
                        </figure>
                        <figure className='group relative col-span-2 row-span-3 overflow-hidden rounded-[16px]'>
                            <img src='images/life/hk_island.webp' className='swipe-img' />
                            <figcaption className='img-layer'>
                                <h1>Camping on the coast</h1>
                                <p>Po Toi Islands, Hong Kong</p>
                            </figcaption>
                        </figure>
                    </SwiperSlide>
                    <SwiperSlide className='img-gallery'>
                        <figure className='group relative col-span-2 row-span-3 overflow-hidden rounded-[16px]'>
                            <img src='images/life/taiwan_shine.webp' className='swipe-img' />
                            <figcaption className='img-layer'>
                                <h1>Fancy oriental temple</h1>
                                <p>Kaohsiung, Taiwan</p>
                            </figcaption>
                        </figure>
                        <figure className='group relative col-span-2 row-span-3 overflow-hidden rounded-[16px]'>
                            <img src='images/life/painting.webp' className='swipe-img' />
                            <figcaption className='img-layer'>
                                <h1>Fake artist</h1>
                                <p>Tsim Sha Tsui, Hong Kong</p>
                            </figcaption>
                        </figure>
                        <figure className='group relative col-span-4 row-span-2 overflow-hidden rounded-[16px]'>
                            <img src='images/life/love_bridge.webp' className='swipe-img' />
                            <figcaption className='img-layer'>
                                <h1>Lover's bridge celebrating Coldplay's arrival</h1>
                                <p>Kaohsiung, Taiwan</p>
                            </figcaption>
                        </figure>
                    </SwiperSlide>
                    <SwiperSlide className='img-gallery'>
                        <figure className='group relative col-span-2 row-span-2 overflow-hidden rounded-[16px]'>
                            <img src='images/life/fire_dragon_dance.webp' className='swipe-img' />
                            <figcaption className='img-layer'>
                                <h1>Fire Dragon Dance</h1>
                                <p>Tai Hang, Hong Kong</p>
                            </figcaption>
                        </figure>
                        <figure className='group relative col-span-2 row-span-2 overflow-hidden rounded-[16px]'>
                            <img src='images/life/coldplay.webp' className='swipe-img' />
                            <figcaption className='img-layer'>
                                <h1>Coldplay: Music of the Spheres</h1>
                                <p>Kaohsiung, Taiwan</p>
                            </figcaption>
                        </figure>
                        <figure className='group relative col-span-4 row-span-3 overflow-hidden rounded-[16px]'>
                            <img src='images/life/okinawa_sky.webp' className='swipe-img' />
                            <figcaption className='img-layer'>
                                <h1>Okinawa Churaumi Aquarium</h1>
                                <p>Okinawa, Japan</p>
                            </figcaption>
                        </figure>
                    </SwiperSlide>
                </Swiper>
            </section>
        </section>
    )
}

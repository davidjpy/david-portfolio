interface Props {
    fill: string
    width: number
    height: number
}

export default function SliderMoonSvg({ fill, width, height }: Props) {
    return (
        <svg width={width} height={height} viewBox='-5 0 32 32'>
            <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g id='Icon-Set-Filled' transform='translate(-575.000000, -829.000000)' fill={fill}>
                    <path
                        d='M586.256,845 C586.256,838.1 590.735,832.236 597,829.991 C595.243,829.361 593.353,829 591.372,829 C582.33,829 575,836.164 575,845 C575,853.837 582.33,861 591.372,861 C593.353,861 595.243,860.639 597,860.009 C590.735,857.764 586.256,851.901 586.256,845'
                        id='moon'
                    ></path>
                </g>
            </g>
        </svg>
    )
}

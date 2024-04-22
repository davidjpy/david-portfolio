/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                'primary-monochrome': 'rgb(var(--color-primary-monochrome) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
                'secondary-bg': 'rgb(var(--color-secondary-bg) / <alpha-value>)',
                'secondary-light': 'rgb(var(--color-secondary-light) / <alpha-value>)',
                accent: 'rgb(var(--color-accent) / <alpha-value>)',
                'accent-bg': 'rgb(var(--color-accent-bg) / <alpha-value>)',
                'clock-element': 'rgb(var(--color-clock-blackground) / 0.2)',
                black: 'rgb(80, 80, 80)',
                white: 'rgb(245, 243, 240)',
                'focus-outline': 'rgb(var(--color-focus-outline) / <alpha-value>)'
            },
            animation: {
                typing: 'typing 0.85s step-end infinite'
            },
            keyframes: {
                dropIn: {
                    '0%': { transform: 'translateY(-100%)', opacity: 0 },
                    '100%': { transform: 'translate(0)', opacity: 1 }
                },
                typing: {
                    '0%': { 'border-color': 'transparent' },
                    '50%': { 'border-color': 'rgb(var(--color-accent) / <alpha-value>)' }
                }
            },
            fontSize: {
                sm: '0.875rem',
                base: '1rem',
                xl: '1.3rem',
                '2xl': '1.618rem',
                '3xl': '2.103rem',
                '4xl': '2.618rem'
            },
            fontFamily: {
                inter: ['Inter']
            },
            screens: {
                '3xl': '1664px'
            }
        }
    },
    plugins: []
}

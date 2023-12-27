/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
                accent: 'rgb(var(--color-accent) / <alpha-value>)',
                'clock-element': 'rgb(var(--color-clock-blackground) / 0.2)',
                black: 'rgb(80, 80, 80)'
            },
            animation: {
                dropIn: 'dropIn 1s ease-out backwards',
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
                lg: '1.618rem',
                xl: '2.618rem'
            },
            fontFamily: {
                inter: ['Inter']
            }
        }
    },
    plugins: []
}

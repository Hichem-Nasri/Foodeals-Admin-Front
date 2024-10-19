import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            screens: {
                xs: '376px',
            },
            backgroundSize: {
                'size-200': '200% 200%',
            },
            backgroundPosition: {
                'pos-0': '0% 0%',
                'pos-100': '100% 100%',
            },
            colors: {
                primary: {
                    DEFAULT: '#34D39E',
                },
                tulip: {
                    '100': '#FEF0C3',
                    '400': '#FAC215',
                    '500': '#EAB308',
                },
                coral: {
                    '50': '#FEF2F2',
                    '100': '#FEE2E2',
                    '500': '#EF4444',
                },
                scooter: {
                    '100': '#CFF7FE',
                    '500': '#06B6D4',
                },
                amethyst: {
                    '100': '#F4E8FF',
                    '500': '#A855F7',
                },
                mountain: {
                    '100': '#D1FAEC',
                    '400': '#34D39E',
                    '500': '#10B981',
                },
                lynch: {
                    '50': '#F6F7F9',
                    '100': '#ECEEF2',
                    '200': '#D5D9E2',
                    '300': '#B1BBC8',
                    '400': '#8695AA',
                    '500': '#64748B',
                    '700': '#434E61',
                    '950': '#23272E',
                },
                subtitle: '#565656',
            },
            maxHeight: {
                '2lines': '30px',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'dialog-right': {
                    '0%': {
                        transform: 'translateX(100%)',
                        // opacity: '0.3',
                    },
                    '100%': {
                        transform: 'translateX(50%)',
                        // opacity: '1',
                    },
                },
                'accordion-down': {
                    from: {
                        height: '0',
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                    to: {
                        height: '0',
                    },
                },
                'accordion-left': {
                    from: {
                        width: '0',
                    },
                    to: {
                        width: 'var(--radix-accordion-content-width)',
                    },
                },
                'accordion-right': {
                    from: {
                        width: 'var(--radix-accordion-content-width)',
                    },
                    to: {
                        width: '0',
                    },
                },
                'notification-slide-left': {
                    from: {
                        transform: 'translateX(100%)',
                    },
                    to: {
                        transform: 'translateX(0)',
                    },
                },
                'notification-slide-down': {
                    from: {
                        transform: 'translateY(-100%)',
                    },
                    to: {
                        transform: 'translateY(0)',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'accordion-left': 'accordion-left 2s ease-out',
                'accordion-right': 'accordion-right 2s ease-out',
                'dialog-right': 'dialog-right 10s ease-in-out',
                'notification-slide-left':
                    'notification-slide-left 0.5s ease-out',
                'notification-slide-down':
                    'notification-slide-down 0.5s ease-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')],
}
export default config

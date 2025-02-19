/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    darkMode: 'class',
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '65ch',
                        color: 'rgb(243 244 246)',
                        '[class~="lead"]': {
                            color: 'rgb(209 213 219)',
                        },
                        a: {
                            color: 'rgb(96 165 250)',
                            textDecoration: 'underline',
                            '&:hover': {
                                color: 'rgb(147 197 253)',
                            },
                        },
                        strong: {
                            color: 'rgb(243 244 246)',
                        },
                        'ol[type="A"]': {
                            '--list-counter-style': 'upper-alpha',
                        },
                        'ol[type="a"]': {
                            '--list-counter-style': 'lower-alpha',
                        },
                        'ol[type="A" s]': {
                            '--list-counter-style': 'upper-alpha',
                        },
                        'ol[type="a" s]': {
                            '--list-counter-style': 'lower-alpha',
                        },
                        'ol[type="I"]': {
                            '--list-counter-style': 'upper-roman',
                        },
                        'ol[type="i"]': {
                            '--list-counter-style': 'lower-roman',
                        },
                        'ol[type="I" s]': {
                            '--list-counter-style': 'upper-roman',
                        },
                        'ol[type="i" s]': {
                            '--list-counter-style': 'lower-roman',
                        },
                        'ol[type="1"]': {
                            '--list-counter-style': 'decimal',
                        },
                        'ol > li': {
                            position: 'relative',
                        },
                        'ol > li::before': {
                            content: 'counter(list-item, var(--list-counter-style, decimal)) "."',
                            position: 'absolute',
                            left: '-1.75rem',
                            color: 'rgb(156 163 175)',
                        },
                        ul: {
                            listStyleType: 'disc',
                        },
                        'ul > li': {
                            position: 'relative',
                        },
                        'ul > li::before': {
                            content: '""',
                            position: 'absolute',
                            backgroundColor: 'rgb(156 163 175)',
                            borderRadius: '50%',
                            width: '0.375em',
                            height: '0.375em',
                            top: 'calc(0.875em - 0.1875em)',
                            left: '-1.25rem',
                        },
                        hr: {
                            borderColor: 'rgb(75 85 99)',
                            borderTopWidth: 1,
                        },
                        blockquote: {
                            fontWeight: '500',
                            fontStyle: 'italic',
                            color: 'rgb(209 213 219)',
                            borderLeftWidth: '0.25rem',
                            borderLeftColor: 'rgb(75 85 99)',
                            quotes: '"\\201C""\\201D""\\2018""\\2019"',
                        },
                        'blockquote p:first-of-type::before': {
                            content: 'open-quote',
                        },
                        'blockquote p:last-of-type::after': {
                            content: 'close-quote',
                        },
                        h1: {
                            color: 'rgb(243 244 246)',
                        },
                        'h1 strong': {
                            color: 'rgb(243 244 246)',
                            fontWeight: '700',
                        },
                        h2: {
                            color: 'rgb(243 244 246)',
                        },
                        'h2 strong': {
                            color: 'rgb(243 244 246)',
                            fontWeight: '700',
                        },
                        h3: {
                            color: 'rgb(243 244 246)',
                        },
                        'h3 strong': {
                            color: 'rgb(243 244 246)',
                            fontWeight: '700',
                        },
                        h4: {
                            color: 'rgb(243 244 246)',
                        },
                        'h4 strong': {
                            color: 'rgb(243 244 246)',
                            fontWeight: '700',
                        },
                        code: {
                            color: 'rgb(243 244 246)',
                            backgroundColor: 'rgb(31 41 55)',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                            paddingTop: '0.25rem',
                            paddingBottom: '0.25rem',
                            borderRadius: '0.375rem',
                            fontWeight: '600',
                        },
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                        pre: {
                            color: 'rgb(243 244 246)',
                            backgroundColor: 'rgb(31 41 55)',
                            borderRadius: '0.375rem',
                            padding: '1rem',
                        },
                        'pre code': {
                            backgroundColor: 'transparent',
                            borderWidth: '0',
                            borderRadius: '0',
                            fontWeight: '400',
                        },
                        thead: {
                            color: 'rgb(243 244 246)',
                            borderBottomColor: 'rgb(75 85 99)',
                        },
                        'tbody tr': {
                            borderBottomColor: 'rgb(55 65 81)',
                        },
                    },
                },
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
            },
            animation: {
                'fade-in': 'fade-in 0.5s ease-out',
                'slide-up': 'slide-up 0.5s ease-out',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/container-queries'),
    ],
}; 
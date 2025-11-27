/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: ["class", "class"],
    theme: {
    	screens: {
    		mob: '375px',
    		tablet: '768px',
    		laptop: '1024px',
    		desktop: '1280px',
    		laptopl: '1440px'
    	},
    	extend: {
    		colors: {
    			'neo-yellow': 'var(--neo-yellow)',
    			'neo-pink': 'var(--neo-pink)',
    			'neo-purple': 'var(--neo-purple)',
    			'neo-green': 'var(--neo-green)',
    			'neo-black': 'var(--neo-black)',
    			'neo-white': 'var(--neo-white)',
    			'neo-bg': 'var(--neo-bg)',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		fontFamily: {
    			heading: [
    				'Lexend Mega',
    				'sans-serif'
    			],
    			body: [
    				'Space Grotesk',
    				'sans-serif'
    			]
    		},
    		boxShadow: {
    			neo: '4px 4px 0px 0px var(--neo-border)',
    			'neo-sm': '2px 2px 0px 0px var(--neo-border)',
    			'neo-lg': '8px 8px 0px 0px var(--neo-border)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
};

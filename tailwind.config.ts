import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#EFD581',
          burgundy: '#934E56',
          cream: '#F3E7D0',
          purple: '#47365B',
        },
      },
    },
  },
  plugins: [],
}

export default config 
import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        noto: [
          'var(--font-noto-sans-jp)',
          'BlinkMacSystemFont',
          'Roboto',
          'Segoe UI',
          'Helvetica Neue',
          'HelveticaNeue',
          '游ゴシック体',
          'YuGothic',
          '游ゴシック Medium',
          'Yu Gothic Medium',
          '游ゴシック',
          'Yu Gothic',
          'Verdana',
          'メイリオ',
          'Meiryo',
          'sans-serif',
        ],
        mono: ['var(--font-roboto-mono)'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
export default config

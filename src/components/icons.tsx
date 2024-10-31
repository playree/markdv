import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
}

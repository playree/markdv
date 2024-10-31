'use client'

import { ThemeSwitchList } from '@/components/theme-sw'
import { FC } from 'react'

export const Header: FC = () => {
  return (
    <nav className='sticky top-0'>
      <ThemeSwitchList size='sm' variant='light' />
    </nav>
  )
}

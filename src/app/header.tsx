'use client'

import { ThemeSwitchList } from '@/components/theme-sw'
import { Button } from '@nextui-org/react'
import { FC } from 'react'

export const Header: FC = () => {
  return (
    <nav className='sticky top-0 flex bg-gray-100 p-1 dark:bg-gray-900'>
      <div className='flex-initial'>
        <Button size='sm' variant='light'>
          Open
        </Button>
      </div>
      <div className='flex-auto'></div>
      <div className='flex-initial'>
        <ThemeSwitchList size='sm' variant='light' />
      </div>
    </nav>
  )
}

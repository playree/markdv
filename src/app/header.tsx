'use client'

import { ThemeSwitchList } from '@/components/theme-sw'
import { Button } from '@nextui-org/react'
import { open } from '@tauri-apps/plugin-dialog'
import { BaseDirectory, readTextFile } from '@tauri-apps/plugin-fs'
import { FC } from 'react'
import { useSharedUIContext } from './context'

export const Header: FC = () => {
  const { setMdContents } = useSharedUIContext()

  const openFile = async () => {
    const selected = await open({
      multiple: false,
      filters: [
        {
          name: 'Markdown',
          extensions: ['md'],
        },
        {
          name: 'All',
          extensions: ['*'],
        },
      ],
    })
    console.log(selected)

    if (!selected || Array.isArray(selected)) {
      return
    }

    const contents = await readTextFile(selected, { baseDir: BaseDirectory.AppConfig })
    setMdContents(contents)
  }

  return (
    <nav className='sticky top-0 flex bg-gray-100 p-1 dark:bg-gray-900'>
      <div className='flex-initial'>
        <Button size='sm' variant='light' onPress={openFile}>
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

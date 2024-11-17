'use client'

import { ThemeSwitchList } from '@/components/theme-sw'
import { Button } from '@nextui-org/react'
import { open } from '@tauri-apps/plugin-dialog'
import { BaseDirectory, readTextFile, watch } from '@tauri-apps/plugin-fs'
import { FC, useEffect, useState } from 'react'
import { useSharedUIContext } from './context'

export const Header: FC = () => {
  const { setMdContents } = useSharedUIContext()
  const [filePath, setFilePath] = useState<string>()

  useEffect(() => {
    if (filePath) {
      readTextFile(filePath, { baseDir: BaseDirectory.AppConfig }).then((contents) => setMdContents(contents))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath])

  useEffect(() => {
    if (filePath) {
      watch(
        filePath,
        () => {
          if (filePath) {
            readTextFile(filePath, { baseDir: BaseDirectory.AppConfig }).then((contents) => setMdContents(contents))
          }
        },
        {
          baseDir: BaseDirectory.AppConfig,
          delayMs: 1000,
        },
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath])

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

    setFilePath(selected)
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

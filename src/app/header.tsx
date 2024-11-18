'use client'

import { ThemeSwitchList } from '@/components/theme-sw'
import { Button, Switch } from '@nextui-org/react'
import { open } from '@tauri-apps/plugin-dialog'
import { BaseDirectory, readTextFile, watch } from '@tauri-apps/plugin-fs'
import { FC, useEffect, useState } from 'react'
import { useSharedUIContext } from './context'

export const Header: FC = () => {
  const { setMdContents } = useSharedUIContext()
  const [filePath, setFilePath] = useState<string>()
  const [isWatch, setWatch] = useState(false)
  const [unWatch, setUnWatch] = useState<ReturnType<typeof watch>>()

  useEffect(() => {
    if (filePath) {
      readTextFile(filePath, { baseDir: BaseDirectory.AppConfig }).then((contents) => setMdContents(contents))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath])

  useEffect(() => {
    if (filePath && isWatch) {
      setUnWatch(
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
        ),
      )
      console.debug('watch on')
    } else {
      if (unWatch) {
        unWatch.then((fn) => {
          fn()
          setUnWatch(undefined)
          console.debug('watch off')
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath, isWatch])

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
      <div className='flex flex-initial'>
        <Button size='sm' variant='light' onPress={openFile}>
          Open
        </Button>
        <Switch className='ml-2 items-center' size='sm' isSelected={isWatch} onValueChange={setWatch}>
          Watch
        </Switch>
      </div>
      <div className='flex-auto'></div>
      <div className='flex-initial'>
        <ThemeSwitchList size='sm' variant='light' />
      </div>
    </nav>
  )
}

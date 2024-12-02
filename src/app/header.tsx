'use client'

import { ThemeSwitchList } from '@/components/theme-sw'
import { Button, Switch } from '@nextui-org/react'
import { getMatches } from '@tauri-apps/plugin-cli'
import { open } from '@tauri-apps/plugin-dialog'
import { BaseDirectory, readTextFile, watch } from '@tauri-apps/plugin-fs'

import { invoke } from '@tauri-apps/api/core'
import { FC, useEffect, useState } from 'react'
import { useSharedUIContext } from './context'

export const Header: FC = () => {
  const { setMdContents, setMdFilePath, mdFilePath } = useSharedUIContext()
  const [isWatch, setWatch] = useState(false)
  const [unWatch, setUnWatch] = useState<ReturnType<typeof watch>>()

  useEffect(() => {
    getMatches().then(({ args }) => {
      console.debug('args:', args)
      if (args.source.value && typeof args.source.value === 'string') {
        setMdFilePath(args.source.value)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (mdFilePath) {
      readTextFile(mdFilePath).then((contents) => setMdContents(contents))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdFilePath])

  useEffect(() => {
    if (mdFilePath && isWatch) {
      setUnWatch(
        watch(
          mdFilePath,
          () => {
            if (mdFilePath) {
              readTextFile(mdFilePath).then((contents) => setMdContents(contents))
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
  }, [mdFilePath, isWatch])

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

    if (!selected || Array.isArray(selected)) {
      return
    }

    setMdFilePath(selected)
  }

  const edit = async () => {
    await invoke('open_edit')
  }

  return (
    <nav className='sticky top-0 z-30 flex bg-gray-100 p-1 dark:bg-gray-900'>
      <div className='flex flex-initial'>
        <Button size='sm' variant='light' onPress={openFile}>
          Open
        </Button>
        <Switch className='ml-2 items-center' size='sm' isSelected={isWatch} onValueChange={setWatch}>
          Watch
        </Switch>
        <Button size='sm' variant='light' onPress={edit}>
          Edit
        </Button>
      </div>
      <div className='flex-auto'></div>
      <div className='flex-initial'>
        <ThemeSwitchList size='sm' variant='light' />
      </div>
    </nav>
  )
}

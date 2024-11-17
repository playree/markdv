'use client'

import { useSharedUIContext } from '@/app/context'
import { FC, useEffect } from 'react'

export const MarkdownView: FC = () => {
  const { mdContents } = useSharedUIContext()

  useEffect(() => {
    console.debug('update mdContents :', mdContents)
  }, [mdContents])

  return <div>{mdContents}</div>
}
MarkdownView.displayName = 'MarkdownView'

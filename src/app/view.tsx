'use client'

import { useSharedUIContext } from '@/app/context'
import { MarkdownView } from '@/components/mdview'
import { FC, useEffect } from 'react'

export const View: FC = () => {
  const { mdContents } = useSharedUIContext()

  useEffect(() => {
    console.debug('update mdContents :', mdContents)
  }, [mdContents])

  return <MarkdownView>{mdContents}</MarkdownView>
}
View.displayName = 'View'

'use client'

import { useSharedUIContext } from '@/app/context'
import { MarkdownView } from '@/components/mdview'
import { FC } from 'react'

export const View: FC = () => {
  const { mdContents } = useSharedUIContext()
  return <MarkdownView markdown={mdContents} />
}
View.displayName = 'View'

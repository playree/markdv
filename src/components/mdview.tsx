'use client'

import { FC, ReactNode, useEffect } from 'react'

export const MarkdownView: FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    console.debug('mdview:update:', children)
  }, [children])

  return <div>{children}</div>
}
MarkdownView.displayName = 'MarkdownView'

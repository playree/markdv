'use client'

import { md2Html } from '@/utils/md-engine'
import { FC, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const MarkdownView: FC<{ markdown?: string; className?: string }> = ({ markdown, className }) => {
  const [mdHtml, setMdHtml] = useState('')

  useEffect(() => {
    console.debug('mdview:update:')
    md2Html(markdown || '').then((html) => setMdHtml(html))
  }, [markdown])

  return <div className={twMerge('markdown', className)} dangerouslySetInnerHTML={{ __html: mdHtml }} />
}
MarkdownView.displayName = 'MarkdownView'

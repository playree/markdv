'use client'

import { md2Html } from '@/utils/md-engine'
import { FC, useEffect, useState } from 'react'

export const MarkdownView: FC<{ markdown?: string }> = ({ markdown }) => {
  const [mdHtml, setMdHtml] = useState('')

  useEffect(() => {
    console.debug('mdview:update:')
    md2Html(markdown || '').then((html) => setMdHtml(html))
  }, [markdown])

  return <div className='markdown' dangerouslySetInnerHTML={{ __html: mdHtml }} />
}
MarkdownView.displayName = 'MarkdownView'

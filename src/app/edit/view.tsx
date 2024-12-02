'use client'

import 'easymde/dist/easymde.min.css'
import { FC, useCallback, useMemo, useState } from 'react'
import { SimpleMdeReact, SimpleMDEReactProps } from 'react-simplemde-editor'
import './custom.css'

export const View: FC = () => {
  const [value, setValue] = useState('Initial value')

  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      toolbar: [
        'heading',
        'bold',
        'italic',
        'strikethrough',
        'quote',
        '|',
        'code',
        'link',
        'horizontal-rule',
        '|',
        'unordered-list',
        'ordered-list',
        'table',
      ],
    } as SimpleMDEReactProps['options']
  }, [])

  const onChange = useCallback((value: string) => {
    setValue(value)
  }, [])

  return (
    <>
      <SimpleMdeReact value={value} onChange={onChange} options={options} />
    </>
  )
}
View.displayName = 'View'

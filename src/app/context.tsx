'use client'

import { createContext, FC, ReactNode, useContext, useState } from 'react'

const SharedUIContext = createContext<{
  setMdContents: (contents: string) => void
  mdContents: string | undefined
  setMdFilePath: (filepath: string) => void
  mdFilePath: string | undefined
}>({
  setMdContents: () => () => {
    throw new Error('Not set setMdContents')
  },
  mdContents: '',
  setMdFilePath: () => () => {
    throw new Error('Not set setMdFilePath')
  },
  mdFilePath: '',
})

export const useSharedUIContext = () => {
  return useContext(SharedUIContext)
}

export const SharedUIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mdContents, setMdContents] = useState<string>()
  const [mdFilePath, setMdFilePath] = useState<string>()

  return (
    <SharedUIContext.Provider
      value={{
        setMdContents,
        mdContents,
        setMdFilePath,
        mdFilePath,
      }}
    >
      {children}
    </SharedUIContext.Provider>
  )
}

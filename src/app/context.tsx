'use client'

import { createContext, FC, ReactNode, useContext, useState } from 'react'

const SharedUIContext = createContext<{
  setMdContents: (contents: string) => void
  mdContents: string | undefined
}>({
  setMdContents: () => () => {
    throw new Error('Not set setMdContents')
  },
  mdContents: '',
})

export const useSharedUIContext = () => {
  return useContext(SharedUIContext)
}

export const SharedUIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mdContents, setMdContents] = useState<string>()

  return (
    <SharedUIContext.Provider
      value={{
        setMdContents,
        mdContents,
      }}
    >
      {children}
    </SharedUIContext.Provider>
  )
}

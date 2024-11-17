'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import { SharedUIProvider } from './context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute='class'>
        <SharedUIProvider>{children}</SharedUIProvider>
      </ThemeProvider>
    </NextUIProvider>
  )
}

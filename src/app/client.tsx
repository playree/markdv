'use client'

import { Button } from '@nextui-org/react'
import { FC } from 'react'

export const TestButton: FC = () => {
  return (
    <Button
      onPress={() => {
        alert('test')
      }}
      variant='ghost'
    >
      Test
    </Button>
  )
}

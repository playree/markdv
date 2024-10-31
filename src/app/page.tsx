import { FC } from 'react'
import { TestButton } from './client'
import { Header } from './header'

const Top: FC = async () => {
  return (
    <>
      <Header />
      <h1 className='font-bold text-blue-500'>Hello, Next.js!</h1>
      <TestButton />
    </>
  )
}
export default Top

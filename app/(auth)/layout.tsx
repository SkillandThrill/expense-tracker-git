import React, { ReactNode } from 'react'
import Logo from '@/components/Logo'

const layout = ({children} :{children:ReactNode}) => {
  return (
    <div className='relative flex h-screen flex-col items-center justify-center'>
      <Logo/>
        <div className='mt-12'>
            {children}
        </div>
    </div>
  )
}

export default layout
